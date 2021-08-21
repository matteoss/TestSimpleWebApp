using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using TestSimpleWebApp.Models;

namespace TestSimpleWebApp.Security
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public string role;

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var korisnik = (Korisnik)context.HttpContext.Items["User"];
            var korisnikRole = (string)context.HttpContext.Items["userRole"];
            if (korisnik == null || role == null || korisnikRole != role)
            {
                // not logged in
                context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
        }

        public virtual string Role
        {
            get { return role; }
            set { role = value; }
        }

    }
}
