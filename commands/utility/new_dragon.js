const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('new_dragon')
		.setDescription('Not yet functional!'),
	async execute(interaction) {
		await interaction.deferReply();

		const canvas = Canvas.createCanvas(500, 500);
		const context = canvas.getContext('2d');

		const overlay = await Canvas.loadImage('./overlay.png');

		// Background color
		const backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        context.fillStyle = backgroundColor;
		context.fillRect(0, 0, canvas.width, canvas.height);

		// draw the overlay
		context.drawImage(overlay, 0, 0, canvas.width, canvas.height);

		// PROCESS FILE
		const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });

		interaction.editReply({ files: [attachment] });
	},
};

