const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('play a song in the channel')
        .addStringOption(option =>
            option.setName('song')
                .setDescription('The song you want to play')
                .setRequired(true)),
    async execute(interaction) {
        const { player, playdl } = require('..');
        if (!interaction.member.voice.channelId) {
            return await interaction.reply({ content: 'You are not in a voice channel!', ephemeral: true });
        }
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return await interaction.reply({ content: 'You are not in my voice channel!', ephemeral: true });
        }
        
        await interaction.deferReply({ephemeral:true});
        
        const search = interaction.options.get('song').value;
        const queue = player.createQueue(interaction.guild, {
            metadata: interaction.channel,
            async onBeforeCreateStream(track) {
                return (await playdl.stream(track.url)).stream;
            },
        });
        try {
            if (!queue.connection) {
                await queue.connect(interaction.member.voice.channel);
            }
        } catch {
            queue.destroy();
            return await interaction.followUp({ content: 'Could not join your voice channel', ephemeral:true });
        }
        
        const track = await player.search(search, {
            requestedBy: interaction.user,
        }).then(x => x.tracks[0]);
        if (!track) {
            return await interaction.followUp(`Track${search} not found`);
        }
        queue.clear();
        queue.play(track);
        return await interaction.followUp('Request received');
    },
};