const { MessageButton } = require('discord.js');

module.exports = {
    data: new MessageButton()
        .setCustomId('shuffle')
        .setLabel('🔀')
        .setStyle('SECONDARY'),
    tag: 'music',
    async execute(interaction) {
        const { player } = require('..');
    }
}