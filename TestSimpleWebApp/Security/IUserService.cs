using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using TestSimpleWebApp.Models;

namespace TestSimpleWebApp.Security
{
    public interface IUserService
    {
        AuthResponse Authenticate(AuthRequest model);
        string HashPassword(string password);
        User GetById(int id);
    }
     
    public class UserService : IUserService
    {
        private static readonly int saltSize = 128 / 8;
        private static readonly int iterationCount = 10000;
        private static readonly int requestedBytes = 256 / 8;
        private static readonly byte versionMark = 0x01;
        private static readonly int mask = 0xFF;


        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private readonly List<User> _users;

        private readonly SecuritySettings _securitySettings;

        public UserService(IOptions<SecuritySettings> securitySettings)
        {
            _securitySettings = securitySettings.Value;

            _users = new List<User>
            {
                new User("mateo", "", HashPassword("lozinka"), "Admin") { Id = 1  }
            };
        }

        public string HashPassword(string password)
        {
            var salt = new byte[saltSize];
            RandomNumberGenerator.Create().GetBytes(salt);
            var subkey = KeyDerivation.Pbkdf2(password, salt, KeyDerivationPrf.HMACSHA256, iterationCount, requestedBytes);
            var result = new byte[1 + 4 + 4 + saltSize + requestedBytes];
            result[0] = versionMark;
            result[1] = (byte)((iterationCount >> 24) & mask);
            result[2] = (byte)((iterationCount >> 16) & mask);
            result[3] = (byte)((iterationCount >> 8) & mask);
            result[4] = (byte)((iterationCount) & mask);
            result[5] = (byte)((saltSize >> 24) & mask);
            result[6] = (byte)((saltSize >> 16) & mask);
            result[7] = (byte)((saltSize >> 8) & mask);
            result[8] = (byte)((saltSize) & mask); 
            Array.Copy(salt, 0, result, 9, saltSize);
            Array.Copy(subkey, 0, result, 9 + saltSize, requestedBytes);

            return Convert.ToBase64String(result);
        }


        public bool VerifyPassword(string hashedPassword, string password)
        {
            var hashedPasswordBytes = Convert.FromBase64String(hashedPassword);
            if (hashedPasswordBytes[0] != versionMark)
            {
                return false;
            }
            var passwordIterCount = (int)(
                (((uint)hashedPasswordBytes[1]) << 24)
                | (((uint)hashedPasswordBytes[2]) << 16)
                | (((uint)hashedPasswordBytes[3]) << 8)
                | (((uint)hashedPasswordBytes[4]))
                );
            var passwordSaltSize = (int)(
                (((uint)hashedPasswordBytes[5]) << 24)
                | (((uint)hashedPasswordBytes[6]) << 16)
                | (((uint)hashedPasswordBytes[7]) << 8)
                | (((uint)hashedPasswordBytes[8]))
                );
            var salt = new byte[passwordSaltSize];
            Array.Copy(hashedPasswordBytes, 9, salt, 0, passwordSaltSize);
            var expectedSubkey = new byte[hashedPasswordBytes.Length - 9 - passwordSaltSize];
            Array.Copy(hashedPasswordBytes, 9 + passwordSaltSize, expectedSubkey, 0, hashedPasswordBytes.Length - 9 - passwordSaltSize);

            var subkey = KeyDerivation.Pbkdf2(password, salt, KeyDerivationPrf.HMACSHA256, passwordIterCount, expectedSubkey.Length);
            return subkey.SequenceEqual(expectedSubkey);
        }

        public AuthResponse Authenticate(AuthRequest model)
        {

            var user = _users.SingleOrDefault(x => x.Username == model.Username);

            if (user == null || !VerifyPassword(user.Password, model.Password))
            {
                return null;
            }

            var token = GenerateJwtToken(user);

            return new AuthResponse(token, DateTime.Now.AddHours(_securitySettings.TokenDurationHours).ToUniversalTime(), user.Role);
        }

        public User GetById(int id)
        {
            return _users.FirstOrDefault(x => x.Id == id);
        }

        // helper methods

        private string GenerateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_securitySettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
