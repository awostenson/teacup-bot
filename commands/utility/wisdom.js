const wiseWords = require("../../randomizer_files/wiseWords.json");
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wisdom')
		.setDescription('Words of wisdom from Teacup.')
        .addStringOption(option =>
			option.setName('type')
				.setDescription('The kind of wisdom')
				.setRequired(false)
				.addChoices(
					{ name: 'characters', value: 'ch1' },
				)),
	async execute(interaction) {
        // if the user asks for just lines with characters, filter accordingly
        const lineOptions = interaction.options.getString('type') ?
            wiseWords.lines.filter((entry) => entry.includes(interaction.options.getString('type'))) :
            wiseWords.lines;
        
        const line = lineOptions[Math.floor(Math.random()*lineOptions.length)];

        var n1 = Math.floor(Math.random()*wiseWords.characters.length);
        var n2 = Math.floor(Math.random()*wiseWords.characters.length);

        var n0 = Math.floor(Math.random()*2) ? n1 : n2;

        if (n1 == n2) {
            // if the same character is generated, tweak the generation without 
            // ending up with an index of -1
            n2 = n2 != 0 ? n2 - 1 : 1;
        }

		var output = line
            .replace('ch1', wiseWords.characters[n1])
            .replace('ch2', wiseWords.characters[n2])
            .replace('ch0', wiseWords.characters[n0]);
        
		await interaction.reply(output);
	},
};
