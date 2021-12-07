const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('remove a song from the queue')
        .addStringOption(option =>
            option.setName('song')
                .setDescription('The song you want to remove from the queue')
                .setRequired(true)),
    tag: 'music',
    async execute(interaction) {
        const { player } = require('..');

        const search = interaction.options.get('song').value;

        const queue = player.getQueue(interaction.guild);

        await interaction.deferReply();

        try {
            if (!queue.connection) {
                await queue.connect(interaction.member.voice.channel);
            }
            const track = await player.search(search, {
                requestedBy: interaction.user,
            }).then(x => x.tracks[0]);
            if (!track) {
                return await interaction.followUp(`Track${search} not found`);
            } else {
                const pos = queue.tracks.indexOf(track);
                switch (pos) {
                    case -1:
                        await interaction.followUp(`${track.title} not in queue`)
                        break;            
                    default:
                        queue.remove(pos);
                        await interaction.followUp(`Removed track ${track.title}`); 
                        break;
                }
            }
        } catch {
            queue.destroy();
            return await interaction.followUp({ content: 'Could not join your voice channel', ephemeral:true });
        }
    },
};