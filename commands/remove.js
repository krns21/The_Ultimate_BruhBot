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

        const queue = player.createQueue(interaction.guild, {
            metadata: interaction.user
        });

        try {
            if (!queue.connection) {
                await queue.connect(interaction.member.voice.channel);
            }
        } catch {
            queue.destroy();
            return await interaction.followUp({ content: 'Could not join your voice channel', ephemeral:true });
        }

        const search = interaction.options.get('song').value;

        const track = await player.search(search, {
            requestedBy: interaction.user,
        }).then(x => x.tracks[0]);

        if (!track) {
            return await interaction.followUp({content:`⛔ || Track : ${search}  not found`, ephemeral: true});
        } else {
            async (track) => {
                try {
                    for (const i of queue.tracks) {
                        if (track.title === i.title) {
                            const pos = queue.tracks.indexOf(i);
                            queue.remove(pos);
                            return await interaction.followUp(`Removed track ${track.title}`); 
                        }
                    }
                } catch {
                    return await interaction.followUp(`${track.title} not in queue`)
                }
            }
        }
    },
};