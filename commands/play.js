const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('plays the song')
        .addStringOption(option =>
            option.setName('songname')
                .setDescription('The song you want to play')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.reply({ content:'playing' });
    },
};