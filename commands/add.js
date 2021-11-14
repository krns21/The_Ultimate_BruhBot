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
        const { player, playdl } = require('..');

        // Check voice channel status

        if (!interaction.member.voice.channelId) {
            return await interaction.reply({ content: 'You are not in a voice channel!', ephemeral: true });
        }
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return await interaction.reply({ content: 'You are not in my voice channel!', ephemeral: true });
        }

        // Gets song search from query and create/get queue

        const search = interaction.options.get('song').value;
        const queue = player.createQueue(interaction.guild, {
            metadata: interaction.channel,
            async onBeforeCreateStream(track) {
                return (await playdl.stream(track.url)).stream;
            },
        });

        // Tries to connect to voice channel

        try {
            if (!queue.connection) {
                await queue.connect(interaction.member.voice.channel);
            }
        } catch {
            queue.destroy();
            return await interaction.reply({ content: 'Could not join your voice channel', ephemeral:true });
        }

        // Searches song and adds to queue if search exists

        await interaction.deferReply();
        const track = await player.search(search, {
            requestedBy: interaction.user,
        }).then(x => x.tracks[0]);
        if (!track) {
            return await interaction.followUp(`Track${search} not found`);
        }
        queue.addTrack(track);

        // Plays the queue if this no song is playing

        if (!queue.playing) {
            await interaction.followUp(`Playing track ${track.title}`);
            return await queue.play();
        } else {
            await interaction.followUp(`Adding track ${track.title}`);
        }
    },
};