const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Displays and explains some of this bot\'s commands.'),
	async execute(interaction) {
		await interaction.reply(
            'Welcome! I offer all sorts of functions; ' + 
            'feel free to bother Khepri if you\'d like something new to be added. ' +
            'Here\'s a quick overview of what you should expect from me currently --' +
            ' aside from some occasional mischief in chat, which I can neither confirm nor deny I am capable of.\n' +
            '\n**Random Generators:**\n' +
            '> - `/pigeon` -- Generates a random pigeon! Art by TJ. *(This option is currently Discord-only.)*\n' +
            '> - `/personality` -- Generates a nine-trait personality summary for a character.\n' +
            '> - `/names` -- Generates Crestlands-compliant names, as many as you specify.\n' +
            '> - `/fantasy_character` -- Generates a fantasy character, including world and backstory prompts.\n' +
            
            '\n**For fun:**\n' +
            '> - `/profile` -- A profile card! Special for you! *(This option is currently Discord-only.)*\n' +
            '> - `/wisdom` -- Words of wisdom straight from the horse\'s mouth. The horse cat, that is.\n' +
            '> - `/typo` -- Quickdraw on the \'typo in the group chat\' meme. Get Khep\'s ass!\n\n' +

            '```[ If you\'re trying to use the bot through Guilded and you\'re having trouble, ' +
            'simply replace the \'/\' in the command with a \'!\'. If that doesn\'t work, you know who to yell at. ]```'
            );
	},
};
