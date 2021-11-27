module.exports = {
    name: 'interactionCreate',
    tag: 'client',
    async execute(interaction) {
        console.log(`${interaction.user.tag} triggered an interaction.`);
        // Returns nothing if interaction is not part of commands
        if (!interaction.isCommand()) return;

        const { client } = require('..');
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
        }
    },
};