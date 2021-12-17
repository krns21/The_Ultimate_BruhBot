const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('clears the queue'),
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

        queue.clear();

        return await interaction.followUp(`✅ || Queue successfully cleared by ${interaction.user.tag}!`);
    },
};