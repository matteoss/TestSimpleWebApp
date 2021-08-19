using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestSimpleWebApp.Security
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly SecuritySettings _securitySettings;

        public JwtMiddleware(RequestDelegate next, IOptions<SecuritySettings> securitySettings)
        {
            _next = next;
            _securitySettings = securitySettings.Value;
        }
        public async Task Invoke(HttpContext context, IKorisnikService userService)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
                attachUserToContext(context, userService, token);

            await _next(context);
        }
        private void attachUserToContext(HttpContext context, IKorisnikService userService, string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_securitySettings.Secret);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);

                var userRole = jwtToken.Claims.First(x => x.Type == "role").Value;

                // attach user to context on successful jwt validation
                context.Items["User"] = userService.GetById(userId);
                context.Items["userRole"] = userRole;
            }
            catch
            {
                // do nothing if jwt validation fails
                // user is not attached to context so request won't have access to secure routes
            }
        }
    }
}
