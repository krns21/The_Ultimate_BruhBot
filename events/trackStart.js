const { MessageActionRow } = require('discord.js');
const { previous, pause, next } = require('../buttons');

module.exports = {
    name: 'trackStart',
    tag: 'player',
    async execute(queue, track) {
        const row = new MessageActionRow()
            .addComponents(previous, pause, next);
        await queue.metadata.send({content:`Playing ${track.title}`, components: [row]});
    },
};