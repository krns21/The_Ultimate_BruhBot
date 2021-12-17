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
                if (command.tag === 'music') {
                    if (!interaction.member.voice.channelId) {
                        return await interaction.reply({ content: 'You are not in a voice channel!', ephemeral: true });
                    }
                    if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
                        return await interaction.reply({ content: 'You are not in my voice channel!', ephemeral: true });
                    }

                    await interaction.deferReply();
                }

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
                if (button.tag === 'music') {
                    if (!interaction.member.voice.channelId) {
                        return await interaction.reply({ content: 'You are not in a voice channel!', ephemeral: true });
                    }
                    if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
                        return await interaction.reply({ content: 'You are not in my voice channel!', ephemeral: true });
                    }
                }
                await button.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content:'There was an error while executing this button', ephemeral: true });
            }
        }
    },
};