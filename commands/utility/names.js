const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('names')
		.setDescription('Generates Crestlands-compliant names.')
		.addIntegerOption(option =>
			option.setName('number')
				.setDescription('How many names to generate')),
	async execute(interaction, args = false) {
		const filePath = "./randomizer_files/names/";

		const prefixes = fs.readFileSync(filePath + 'prefixes.txt').toString().split('\n');
		const suffixes = fs.readFileSync(filePath + 'suffixes.txt').toString().split('\n');
		const adjectives = fs.readFileSync(filePath + 'adjectives.txt').toString().split('\n');
		const virtues = fs.readFileSync(filePath + 'virtues.txt').toString().split('\n');

		try {
			var output = '';
			var n = args || interaction.options.getInteger('number') || 1;
			// cut off names at a certain mark
			const max = 100;
			n = (n < max) ? n : max;
			for (let i = 0; i < n; i++) {
				newName = generateName();
				output += newName + ((i == n - 1) ? '' : ', ');
			}
			await interaction.reply(output);
		} catch(err) {
			interaction.reply("Tell Khepri something went wrong.");
		}

		// generate a name compliant with crestlands naming conventions
		function generateName() {
			switch (Math.floor(Math.random() * 9)) {
				case 0:
					return choose(prefixes);
				case 1:
					return choose(virtues);
				case 2: 
					return choose(suffixes);
				case 3:
					return choose(virtues) + ' ' + choose(suffixes);
				case 4: 
					return choose(prefixes) + ' ' + choose(suffixes);
				case 5:
					return choose(adjectives) + ' ' + choose(suffixes);
				case 6:
					return choose(adjectives) + ' ' + choose(prefixes);
				case 7:
					return choose(virtues) + ' ' + choose(prefixes);
				default:
					return choose(adjectives) + ' ' + choose(virtues);
			}
		}

		// selects a random item from a list
		function choose(list) {
			return list[Math.floor(Math.random() * list.length)].replace(/(\r\n|\n|\r| )/gm, "");
		}
	},
};
