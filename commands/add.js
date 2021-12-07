const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('add a song to the queue')
        .addStringOption(option =>
            option.setName('song')
                .setDescription('The song you want to add to the queue')
                .setRequired(true)),
    tag: 'music',
    async execute(interaction) {
        const { player } = require('..');

        await interaction.deferReply({ephemeral:true});

        const search = interaction.options.get('song').value;

        const queue = player.createQueue(interaction.guild, {
            metadata: interaction.channel,
        });

        try {
            if (!queue.connection) {
                await queue.connect(interaction.member.voice.channel);
            }
            const track = await player.search(search, {
                requestedBy: interaction.user,
            }).then(x => x.tracks[0]);

            await interaction.followUp({content:`✅ || Request by ${interaction.user.tag} received! `, ephemeral: true});
        
            if (!track) {
                return await interaction.followUp(`Track${search} not found`);
            } else {
                if (!queue.playing) {
                    return await queue.play(track);
                } else {
                    queue.addTrack(track);
                }
            }
        } catch {
            queue.destroy();
            return await interaction.followUp({ content: 'Could not join your voice channel', ephemeral:true });
        }
    },
};