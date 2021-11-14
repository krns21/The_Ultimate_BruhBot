const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('stops the music'),
    async execute(interaction) {
        const { player, playdl } = require('..');
        if (!interaction.member.voice.channelId) {
            return await interaction.reply({ content: 'You are not in a voice channel!', ephemeral: true });
        }
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return await interaction.reply({ content: 'You are not in my voice channel!', ephemeral: true });
        }

        const queue = player.createQueue(interaction.guild, {
            metadata: interaction.channel,
            async onBeforeCreateStream(track) {
                return (await playdl.stream(track.url)).stream;
            },
        });
        try {
            if (!queue.connection) {
                await queue.connect(interaction.member.voice.channel);
            }
        } catch {
            queue.destroy();
            return await interaction.reply({ content: 'Could not join your voice channel', ephemeral:true });
        }
        await interaction.deferReply();

        if (queue.playing) {
            await interaction.followUp('Stopped the music');
            return queue.setPaused(true);
        } else {
            await interaction.followUp('No music playing currently');
        }
    },
};