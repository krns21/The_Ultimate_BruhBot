const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('stop the song currently playing'),
    async execute(interaction) {
        try {
            await interaction.reply('Stopped the music');
        } catch (error) {
            console.log(error);
            interaction.followUp({ content:'There was an error trying to execute that command.' });
        }
    },
};