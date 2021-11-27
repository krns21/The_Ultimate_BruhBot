const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('returns the queue'),
    async execute(interaction) {
        const { player } = require('..');
        if (!interaction.member.voice.channelId) {
            return await interaction.reply({ content: 'You are not in a voice channel!', ephemeral: true });
        }
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return await interaction.reply({ content: 'You are not in my voice channel!', ephemeral: true });
        }
        await interaction.deferReply();

        const queue = player.getQueue(interaction.guild);
        
        if (!queue || !queue.playing ) await interaction.followUp('No music is being played');

        await interaction.followUp({
        });
    },
};