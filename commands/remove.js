const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('remove a song from the queue')
        .addStringOption(option =>
            option.setName('song')
                .setDescription('The song you want to remove from the queue')
                .setRequired(true)),
    async execute(interaction) {
        try {
            const search = interaction.options.get('song').value;
            await interaction.reply(`Removed ${search} from the queue`);
        } catch (error) {
            console.log(error);
            interaction.followUp({ content:'There was an error trying to execute that command.' });
        }
    },
};