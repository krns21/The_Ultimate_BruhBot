const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('stops the music'),
    tag: 'music',
    async execute(interaction) {
        const { player } = require('..');

        const queue = player.getQueue(interaction.guild);

        await interaction.deferReply();

        try {
            if (!queue.connection) {
                await queue.connect(interaction.member.voice.channel);
            }

            if (queue.playing) {
                await interaction.followUp('Stopped the music');
                return queue.destroy(true);
            } else {
                await interaction.followUp('No music playing currently');
            }

        } catch {
            queue.destroy();
            return await interaction.followUp({ content: 'Could not join your voice channel', ephemeral:true });
        }
    },
};