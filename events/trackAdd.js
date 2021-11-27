module.exports = {
    name: 'trackAdd',
    tag: 'player',
    async execute(queue, track) {
        queue.metadata.send(`Added playing ${track.title}`)
    },
};