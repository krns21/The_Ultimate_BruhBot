// Run dotenv
require('dotenv').config();


// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const { Player } = require('discord-player');
const playdl = require('play-dl');


// Create bot token const
const token = process.env.DISCORD_TOKEN;
const cookie = process.env.COOKIE;

// Saves cookie as part of playdl settings
playdl.setToken({
    youtube : {
        cookie : cookie,
    },
});

// Create a new client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS] });

// Create a new Player
const player = new Player(client, {
	ytdlOptions:{
		quality:'highestaudio',
		filter:'audioonly',
		highWaterMark: 1 << 25,
	},
});


client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the collection using name as key and value as the module
	client.commands.set(command.data.name, command);
}

client.buttons = new Collection();
const buttonFiles = fs.readdirSync('./buttons').filter(file => file.endsWith('.js'));

for (const file of buttonFiles) {
	const button = require(`./buttons/${file}`);

	client.buttons.set(button.data.customId,button);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.tag === 'client'){
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	} else {
		if (event.once) {
			player.once(event.name, (...args) => event.execute(...args));
		} else {
			player.on(event.name, (...args) => event.execute(...args));
		}
	}
	
}

// Login to discord
client.login(token);

module.exports = {
	player,
	playdl,
	client,
};