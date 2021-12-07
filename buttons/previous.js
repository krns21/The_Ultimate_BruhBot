const { MessageButton } = require('discord.js');

module.exports = {
    data: new MessageButton()
        .setCustomId('previous')
        .setLabel('⏮️')
        .setStyle('SECONDARY')
        .setDisabled(true),
    tag: 'music',
    async execute(interaction) {
        const { player } = require('..');
        
        await interaction.deferUpdate();
        
        const queue = player.getQueue(interaction.guild);
        if (queue) {
            queue.back();
            await interaction.editReply({content:'', components: []});
        }
    }
}