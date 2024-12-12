using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalR_Udemy.Hubs
{
    public class ChatHub : Hub
    {
        private static Dictionary<string, string> usuarios = new Dictionary<string, string>();

        public async Task SendMessage(string userFrom, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", userFrom, message);
        }

        public async Task SendMessageToRoom(string userFrom, string message, string room)
        {
            await Clients.Group(room).SendAsync("ReceiveMessage", userFrom, message);
        }

        public async Task JoiningRoom(string roomName)
        {
            await Groups.AddToGroupAsync(this.Context.ConnectionId, roomName);
        }

        public async Task LeavingRoom(string roomName)
        {
            await Groups.RemoveFromGroupAsync(this.Context.ConnectionId, roomName);
        }

        public void JoiningUserToPrivateChat(string username)
        {
            usuarios[username] = this.Context.ConnectionId;
        }

        public async Task SendMessageToUser(string userFrom, string message, string userTo)
        {
            if (usuarios.ContainsKey(userTo))
            {
                await Clients.Client(usuarios[userTo]).SendAsync("ReceiveMessage", userFrom, message);
            }
        }

    }
}
