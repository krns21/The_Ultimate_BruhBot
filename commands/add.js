const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('add a song to the queue')
        .addStringOption(option =>
            option.setName('song')
                .setDescription('The song you want to add to the queue')
                .setRequired(true)),
    async execute(interaction) {
        try {
            const search = interaction.options.get('song').value;
            await interaction.reply(`Added ${search} to the queue`);
        } catch (error) {
            console.log(error);
            interaction.followUp({ content:'There was an error trying to execute that command.' });
        }
    },
};