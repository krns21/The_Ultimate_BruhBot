const { MessageButton } = require('discord.js');

module.exports = {
    data: new MessageButton()
        .setCustomId('repeat')
        .setLabel('🔁')
        .setStyle('SECONDARY'),
    tag:'music',
    async execute(interaction) {
        const { player } = require('..');
    }
}