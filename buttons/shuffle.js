const { MessageButton } = require('discord.js');

module.exports = {
    data: new MessageButton()
        .setCustomId('shuffle')
        .setLabel('🔀')
        .setStyle('SECONDARY'),
    async execute(interaction) {
        if (!interaction.member.voice.channelId) {
            return await interaction.reply({ content: 'You are not in a voice channel!', ephemeral: true });
        }
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return await interaction.reply({ content: 'You are not in my voice channel!', ephemeral: true });
        }
    }
}