module.exports = {
    name: 'trackStart',
    tag: 'player',
    async execute(queue, track) {
        queue.metadata.send(`Started playing ${track.title}`)
    },
};