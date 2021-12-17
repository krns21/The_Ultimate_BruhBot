const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('play a song in the channel')
        .addStringOption(option =>
            option.setName('song')
                .setDescription('The song you want to play')
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

        await interaction.followUp({content:`✅ || Request by ${interaction.user.tag} received! `, ephemeral: true});

        if (!track) {
            return await interaction.followUp({content:`⛔ || Track : ${search}  not found`, ephemeral: true});
        } else {
            queue.setPaused(false);
            queue.play(track);
        }
    },
};