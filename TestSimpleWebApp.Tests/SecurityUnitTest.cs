using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;
using TestSimpleWebApp.Models;
using TestSimpleWebApp.Security;
using Xunit;

namespace TestSimpleWebApp.Tests
{
    public class SecurityUnitTest
    {

        [Fact]
        public void Test1()
        {
            UserService korisnikService = new UserService(Options.Create<SecuritySettings>(new SecuritySettings() { Secret = "xecretKeywqejane" }) );
            string password = "password123";
            string passwordHash = korisnikService.HashPassword(password);
            Console.WriteLine(passwordHash);
            var hashedPasswordBytes = Convert.FromBase64String(passwordHash);
            Assert.Equal((byte)0x01, hashedPasswordBytes[0]);
            //10000 -> 10 0111 0001 0000
            Assert.Equal((byte)0x00, hashedPasswordBytes[1]);
            Assert.Equal((byte)0x00, hashedPasswordBytes[2]);
            Assert.Equal((byte)0x27, hashedPasswordBytes[3]);
            Assert.Equal((byte)0x10, hashedPasswordBytes[4]);
            // 16 -> 0001 0000
            Assert.Equal((byte)0x00, hashedPasswordBytes[5]);
            Assert.Equal((byte)0x00, hashedPasswordBytes[6]);
            Assert.Equal((byte)0x00, hashedPasswordBytes[7]);
            Assert.Equal((byte)0x10, hashedPasswordBytes[8]);
        }

        [Fact]
        public void Test2()
        {
            UserService korisnikService = new UserService(Options.Create<SecuritySettings>(new SecuritySettings() { Secret = "secret" }));
            string password = "password123";
            string passwordHash = korisnikService.HashPassword(password);
            string newPassword = "password123";
            var hashedPasswordBytes = Convert.FromBase64String(passwordHash);
            var passwordIterCount = (int)(
                (((uint)hashedPasswordBytes[1]) << 24)
                | (((uint)hashedPasswordBytes[2]) << 16)
                | (((uint)hashedPasswordBytes[3]) << 8)
                | (((uint)hashedPasswordBytes[4]))
                );
            Assert.Equal(10000, passwordIterCount);
            var passwordSaltSize = (int)(
                (((uint)hashedPasswordBytes[5]) << 24)
                | (((uint)hashedPasswordBytes[6]) << 16)
                | (((uint)hashedPasswordBytes[7]) << 8)
                | (((uint)hashedPasswordBytes[8]))
                );
            Assert.Equal(16, passwordSaltSize);
            Assert.True(korisnikService.VerifyPassword(passwordHash, newPassword));
        } 
        
        [Fact]
        public void Test3()
        {
            UserService korisnikService = new UserService(Options.Create<SecuritySettings>(new SecuritySettings() { Secret = "xecretKeywqejane" }));
            AuthResponse response = korisnikService.Authenticate(new AuthRequest() { Username = "mateo", Password = "lozinka"});
            Assert.NotNull(response);
        }
    }
}
