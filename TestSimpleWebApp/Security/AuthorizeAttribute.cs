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
        public string[] role;

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var korisnik = (User)context.HttpContext.Items["User"];
            if (korisnik == null || (role != null && !isRoleInList( korisnik.Role )))
            {
                // not logged in
                context.Result = new JsonResult(
                    new { message = "Unauthorized User: "+ (korisnik == null ? "-" : korisnik.Username) }
                ) { StatusCode = StatusCodes.Status401Unauthorized };
            }
        }

        private Boolean isRoleInList(String role)
        {
            Boolean ret = false;
            for(int i = 0; i<this.role.Length; i++)
            {
                if (role.Equals(this.role[i]))
                {
                    ret = true;
                    break;
                }
            }
            return ret;
        }


        public virtual string[] Role
        {
            get { return role; }
            set { role = value; }
        }

    }
}
