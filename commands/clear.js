const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('clears the queue'),
    tag: 'music',
    async execute(interaction) {
        const { player } = require('..');

        await interaction.deferReply();

        const queue = player.getQueue(interaction.guild);

        try {
            if (!queue.connection) {
                await queue.connect(interaction.member.voice.channel);
            }
            queue.clear();

            await interaction.followUp('✅ || Queue successfully cleared!');
            
        } catch {
            queue.destroy();
            return await interaction.followUp({ content: 'Could not join your voice channel', ephemeral:true });
        }
    },
};