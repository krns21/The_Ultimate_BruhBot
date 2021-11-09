// Run dotenv
require('dotenv').config();

//Import Libraries
const Discord = require('discord.js');
const client = new Discord.Client();

// Initialize bot by connecting to the server
client.login(process.env.DISCORD_TOKEN);

// Event listener when a user connected to the server
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong')
    }
})