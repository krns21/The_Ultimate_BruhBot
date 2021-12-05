const { MessageButton } = require('discord.js');

module.exports = {
    data: new MessageButton()
        .setCustomId('resume')
        .setLabel('▶')
        .setStyle('PRIMARY'),
    async execute(interaction) {
        const { player } = require('..');
        if (!interaction.member.voice.channelId) {
            return await interaction.reply({ content: 'You are not in a voice channel!', ephemeral: true });
        }
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return await interaction.reply({ content: 'You are not in my voice channel!', ephemeral: true });
        }
        
        await interaction.deferUpdate();
        
        const queue = player.getQueue(interaction.guild);
        if (queue) {
            queue.setPaused(false);
            await interaction.editReply({content:'', components: []});
        }

    }
}