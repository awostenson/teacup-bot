const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('typo')
		.setDescription('Now you went and fucked up.'),
	async execute(interaction) {
		await interaction.reply('https://pbs.twimg.com/media/Fw4AYibaUAEYGyt.jpg:large');
	},
};
