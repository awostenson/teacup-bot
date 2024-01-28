const { SlashCommandBuilder, AttachmentBuilder, Client, Events, GatewayIntentBits } = require('discord.js');
const Canvas = require('@napi-rs/canvas');
const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Displays a user\'s profile.'),
	async execute(interaction) {
		try {
			if (!interaction.deferReply) { 
				interaction.reply("This operation is only supported through slash commands on Discord. " + 
				"Try again on the home server!");
				return;        }
			await interaction.deferReply();

			const canvas = Canvas.createCanvas(1075, 555);
			const context = canvas.getContext('2d');

			const bufferWidth = 25;
			const iconRadius = 100;

			const background = await Canvas.loadImage('./background.jpg');

			// This uses the canvas dimensions to stretch the image onto the entire canvas
			context.drawImage(background, 0, 0, canvas.width, canvas.height);

			// RECTANGLE STYLING
			context.strokeStyle = '#fff';
			context.strokeRect(bufferWidth, bufferWidth, canvas.width - 2*bufferWidth, canvas.height - 2*bufferWidth);
			context.strokeRect(bufferWidth-1, bufferWidth-1, canvas.width - 2*bufferWidth+2, canvas.height - 2*bufferWidth+2);

			context.strokeRect(bufferWidth + 10, bufferWidth + 10, canvas.width - 2*bufferWidth - 20, canvas.height - 2*bufferWidth - 20);

			// vertical divider line
			context.strokeRect(6*bufferWidth + 2*iconRadius - 10, 4*bufferWidth, 1, canvas.height - 8*bufferWidth);

			// transparent backing
			context.fillStyle = '#ffffff59';
			context.fillRect(0, 0, canvas.width, canvas.height);
			context.fillRect(bufferWidth, bufferWidth, canvas.width - 2*bufferWidth, canvas.height - 2*bufferWidth);

			// TEXT
			context.font = '35px Trebuchet MS, sans-serif';
			context.fillStyle = '#000';
			const displayNameCut = interaction.member.displayName.includes(' ') ?
				interaction.member.displayName.substring(0, interaction.member.displayName.indexOf(' ')) :
				interaction.member.displayName;
			context.fillText('USER:   ' + displayNameCut, 7*bufferWidth + 2*iconRadius, 3.5*bufferWidth);

			// ICON
			// draw a circle behind the icon
			this.drawCircle(3*bufferWidth + iconRadius, canvas.height/2, iconRadius + 2, context);

			// outline the icon
			context.beginPath();
			context.arc(3*bufferWidth + iconRadius, canvas.height/2, iconRadius, 0, Math.PI * 2, true);
			context.closePath();
			context.clip();

			// Using undici to make HTTP requests for better performance
			const { body } = await request(interaction.user.displayAvatarURL({ extension: 'jpg' }));
			const avatar = await Canvas.loadImage(await body.arrayBuffer());

			// Draw a shape onto the main canvas
			context.drawImage(avatar, 3*bufferWidth, canvas.height/2 - iconRadius, 2*iconRadius, 2*iconRadius);

			// PROCESS FILE
			const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });

			interaction.editReply({ files: [attachment] });
		} catch(err) {
			console.log(err);
            interaction.reply("Tell Khepri something went wrong.");
        }
	},
	
	// draw a circle (note that this results in the working space being clipped)
	drawCircle(x, y, r, context) {
		context.beginPath();
		context.arc(x, y, r, 0, Math.PI * 2, true);
		context.closePath();
		context.clip();

		context.fillStyle = '#fff';
		context.fill();
	}
};

