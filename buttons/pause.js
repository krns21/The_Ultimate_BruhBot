const { MessageButton } = require('discord.js');

module.exports = {
    data: new MessageButton()
        .setCustomId('pause')
        .setLabel('⏸️')
        .setStyle('PRIMARY'),
    tag: 'music',
    async execute(interaction) {
        const { player } = require('..');
        
        await interaction.deferUpdate();
        const queue = player.getQueue(interaction.guild);
        queue.setPaused(true);
        await interaction.update({content:'Paused', components: []});
    }
}