const { MessageButton } = require('discord.js');

module.exports = {
    data: new MessageButton()
        .setCustomId('pause')
        .setLabel('⏸️')
        .setStyle('PRIMARY'),
    async execute(interaction) {
        const { player } = require('../bot');
        if (!interaction.member.voice.channelId) {
            return await interaction.reply({ content: 'You are not in a voice channel!', ephemeral: true });
        }
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return await interaction.reply({ content: 'You are not in my voice channel!', ephemeral: true });
        }
        
        /* await interaction.deferUpdate(); */
        const queue = player.getQueue(interaction.guild);
        queue.setPaused(true);
        await interaction.update({content:'Paused', components: []});
    }
}