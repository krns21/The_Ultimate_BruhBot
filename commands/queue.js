const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('returns the queue'),
    tag: 'music',
    async execute(interaction) {
        const { player } = require('..');

        await interaction.deferReply();

        const queue = player.getQueue(interaction.guild);

        try {
            if (!queue || !queue.playing ){
                await interaction.followUp('No music is being played');
            }
            await interaction.followUp({content:'Queue'});
        } catch {
            queue.destroy();
            return await interaction.followUp({ content: 'Could not join your voice channel', ephemeral:true });
        }

    },
};