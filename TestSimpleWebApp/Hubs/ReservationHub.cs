using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestSimpleWebApp.Hubs
{
    public class ReservationHub : Hub
    {
        public async Task SendNotification()
        {
            await Clients.All.SendAsync("ReceiveNotification");
        }
    }
}
