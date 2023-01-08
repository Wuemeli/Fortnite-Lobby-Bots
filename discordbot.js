const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const config = require("./config.json");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (message.content === '!check') {
    // Read the list of users from the `users.txt` file
    fs.readFile('users.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      // Split the file contents into an array of usernames
      const users = data.split('\n');

      // Check the status of each user using the API
      users.forEach(user => {
        checkUserStatus(user).then(status => {
          message.channel.send(`${user}: ${status}`);
          if (status === 'Offline') {
            // Send a message to the "offline-notifications" channel if the user is offline
            client.channels.cache.get('offline-notifications').send(`${user} is now offline!`);
          }
        });
      });
    });
  }
});

async function checkUserStatus(user) {
  // Call the API to check the user's status
  const response = await fetch(`https://api.example.com/status/${user}`);
  const data = await response.json();
  return data.online ? 'Online' : 'Offline';
}

client.login('config.discordtoken');