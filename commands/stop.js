const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('stops the music'),
    tag: 'music',
    async execute(interaction) {
        const { player } = require('..');

        const queue = player.createQueue(interaction.guild, {
            metadata: interaction.user
        });

        try {
            if (!queue.connection) {
                await queue.connect(interaction.member.voice.channel);
            }
        } catch {
            queue.destroy();
            return await interaction.followUp({ content: 'Could not join your voice channel', ephemeral:true });
        }

        if (queue.playing) {
            await interaction.followUp('Stopped the music');
            return queue.destroy(true);
        } else {
            await interaction.followUp('No music playing currently');
        }
    },
};