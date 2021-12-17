const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('skips the music'),
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
            await interaction.followUp(`${queue.nowPlaying().title} skipped`);
            return queue.skip();
        } else {
            return await interaction.followUp('No music playing currently');
        }
    },
};