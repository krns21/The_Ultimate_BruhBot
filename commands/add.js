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
        const { player } = require('..');
        if (!interaction.member.voice.channelId) {
            return await interaction.reply({ content: 'You are not in a voice channel!', ephemeral: true });
        }
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return await interaction.reply({ content: 'You are not in my voice channel!', ephemeral: true });
        }


        const search = interaction.options.get('song').value;
        const queue = player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel,
            },
            ytdlOptions: {
                quality: 'lowest',
                filter: 'audioonly',
                highWaterMark: 1 << 25,
                dlChunkSize: 0,
            },
        });
        try {
            if (!queue.connection) {
                await queue.connect(interaction.member.voice.channel);
            }
        } catch {
            queue.destroy();
            return await interaction.reply({ content: 'Could not join your voice channel', ephemeral:true });
        }
        await interaction.deferReply();
        const track = await player.search(search, {
            requestedBy: interaction.user,
        }).then(x => x.tracks[0]);
        if (!track) {
            return await interaction.followUp(`Track${search} not found`);
        }
        queue.addTrack(track);
        console.log(queue.tracks.length);

        await interaction.followUp(`Adding track ${track.title}`);

        if (!queue.playing) {
            await queue.play();
            return await interaction.followUp(`Playing track ${track.title}`);
        }
    },
};