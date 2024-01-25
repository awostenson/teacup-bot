const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('A cheeky game.'),
	async execute(interaction) {
		await interaction.reply('peekaboo');
		await wait(4_000);
		await interaction.deleteReply();
	},
};
