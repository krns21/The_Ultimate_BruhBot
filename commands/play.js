const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('play a song in your channel')
        .addStringOption(option =>
            option.setName('song')
                .setDescription('The song you want to play')
                .setRequired(true)),
    async execute(interaction) {
        try {
            const search = interaction.options.get('song').value;
            await interaction.reply(`Playing ${search}`);
        } catch (error) {
            console.log(error);
            interaction.followUp({ content:'There was an error trying to execute that command.' });
        }
    },
};