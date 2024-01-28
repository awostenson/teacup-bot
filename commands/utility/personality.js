const personalityTraits = require("../../randomizer_files/fantasy_character_traits/personalityTraits.json");
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('personality')
		.setDescription('Generates a personality summary.'),
	async execute(interaction) {
        try {
            var output = 
                '[ + ] ' + generateThree() + '\n' +
                '[ = ] ' + generateThree() + '\n' + 
                '[ – ] ' + generateThree();
            
            await interaction.reply(output);

            function generateThree() {
                return generateOne() + ', ' + generateOne() + ', ' + generateOne();
            }

            function generateOne() {
                return personalityTraits.traits[Math.floor(Math.random()*personalityTraits.traits.length)];
            }
        } catch(err) {
            console.log(err);
            interaction.reply("Tell Khepri something went wrong.");
        }
	},
};
