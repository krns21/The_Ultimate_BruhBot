module.exports = {
	name: 'ready',
	tag: 'client',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};