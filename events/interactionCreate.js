module.exports = {
    name: 'interactionCreate',
    tag: 'client',
    async execute(interaction) {
        const { client } = require('..');

        if (!interaction.isButton()) {
            if (!interaction.isCommand()) return;

            console.log(`${interaction.user.tag} triggered command: ${interaction.commandName}.`);
            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
            }
        } else {

            console.log(`${interaction.user.tag} triggered button: ${interaction.customId}.`);
            const button = client.buttons.get(interaction.customId);

            if (!button) return;

            try {
                await button.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content:'There was an error while executing this command', ephemeral: true });
            }
        }
    },
};