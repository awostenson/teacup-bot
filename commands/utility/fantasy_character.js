const CharacterCreator = require('../../service/FantasyCharacterCreationService.js');
const CharacterDisplay = require('../../service/FantasyCharacterDisplayService.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fantasy_character')
		.setDescription('Generates a fantasy character, their backstory, and the world they live in.'),
	async execute(interaction) {
		try {
			var character = CharacterCreator.createCharacter();

			var output = '';
			
			output += CharacterDisplay.displayWorld(character);
			output += CharacterDisplay.displayBackstory(character);
			output += CharacterDisplay.displayCharacter(character);
			
			await interaction.reply(output);
		} catch(err) {
            interaction.reply("Tell Khepri something went wrong.");
        }
	},
};
