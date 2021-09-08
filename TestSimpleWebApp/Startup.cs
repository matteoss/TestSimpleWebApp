using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using TestSimpleWebApp.Data;
using TestSimpleWebApp.Hubs;
using TestSimpleWebApp.Models;
using TestSimpleWebApp.Security;

namespace TestSimpleWebApp
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<PropertyManagementSystemDbContext>(options => { 
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")); 
            });
            services.AddControllers()
                    .AddOData(opt => {
                        opt.AddRouteComponents("odata", GetEdmModel());
                        opt.Select().Count().Filter().OrderBy().SetMaxTop(100);
                    });

            services.Configure<SecuritySettings>(Configuration.GetSection("SecuritySettings"));
            services.AddScoped<IUserService, UserService>();
            services.AddLogging();
            services.AddSignalR();
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseStaticFiles();

            app.UseMiddleware<JwtMiddleware>();
           
            app.UseEndpoints(endpoints =>
            {
                /*endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("Hello World!");
                });*/
                
                endpoints.MapControllers(); 
                endpoints.MapHub<NotificationHub>("/notifications/sync");
                
            });
        }

        private IEdmModel GetEdmModel()
        {
            var odataBuilder = new ODataConventionModelBuilder();
            //odataBuilder.EntitySet<Oglas>("Oglasi").EntityType.HasKey(x => x.ID);
            odataBuilder.EntitySet<Guest>("Guests").EntityType.HasKey(x => x.Id);
            odataBuilder.EntitySet<Reservation>("Reservations").EntityType.HasKey(x => x.Id);
            odataBuilder.EntitySet<Property>("Properties").EntityType.HasKey(x => x.Id);
            odataBuilder.EntitySet<Room>("Rooms").EntityType.HasKey(x => new { x.PropertyId, x.RoomNumber });
            odataBuilder.EntitySet<RoomType>("RoomTypes").EntityType.HasKey(x => x.Id);
            return odataBuilder.GetEdmModel();
        }
    }
}
