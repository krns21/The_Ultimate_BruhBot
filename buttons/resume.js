const { MessageButton } = require('discord.js');

module.exports = {
    data: new MessageButton()
        .setCustomId('resume')
        .setLabel('▶')
        .setStyle('PRIMARY'),
    tag: 'music',
    async execute(interaction) {
        const { player } = require('..');
        
        await interaction.deferUpdate();
        
        const queue = player.getQueue(interaction.guild);
        if (queue) {
            queue.setPaused(false);
            await interaction.editReply({content:'', components: []});
        }

    }
}