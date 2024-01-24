const fs = require('node:fs');
const path = require('node:path');
const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pigeon')
		.setDescription('Randomly generates the image of a pigeon!'),
	async execute(interaction) {
		await interaction.deferReply();

		const canvas = Canvas.createCanvas(500, 500);
		const context = canvas.getContext('2d');

        // pigeon base
        await drawRandomFile('Base');

        // barring
        await drawRandomFile('WT');

        // dilute and red
        await !Math.floor(Math.random() * 5) && drawRandomFile('Dilute', randomDecimal());
        await !Math.floor(Math.random() * 15) && drawRandomFile('Red');

        // iridescence
        await !Math.floor(Math.random() * 4) && drawRandomFile('Iridescent', randomDecimal());

        // piebaldism etc
        for (let i = 0; i < 3; i++) {
            await !Math.floor(Math.random()*5) && drawRandomFile('Piebald');
        }
        await !Math.floor(Math.random()*20) && drawRandomFile('Grizzle');
        await !Math.floor(Math.random()*10) && drawRandomFile('Stipper');
        await !Math.floor(Math.random()*50) && drawRandomFile('Milky');

        // shadow
        const shadow = await Canvas.loadImage('./randomizer_files/pigeon/0-Shadow.png');
        context.drawImage(shadow, 0, 0, canvas.width, canvas.height);

        // skin, beak, and cere
        await drawRandomFile('SkinBeak');
        await !Math.floor(Math.random() * 2) && drawRandomFile('BeakMark', randomDecimal());

        // eye color and pupil
        await drawRandomFile('Eyes_');
        await Math.floor(Math.random()*2) && drawRandomFile('EyesAdd_Bright', randomDecimal());
        await Math.floor(Math.random()*2) && drawRandomFile('EyesAdd_Pearl', randomDecimal());
        await Math.floor(Math.random()*2) && drawRandomFile('EyesAdd_Yellow', randomDecimal());

        await drawRandomFile('Pupil');

		// PROCESS FILE
		const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'pigeon.png' });

		interaction.editReply({ files: [attachment] });

        // from files whose names begin with the same category, choose a random one and render it.
        async function drawRandomFile(category, alpha = 1.0) {
            const filePath = './randomizer_files/pigeon/';
            const foldersPath = path.join(__dirname, '../../' + filePath);
            const pigeonFiles = fs.readdirSync(foldersPath).filter(file => file.startsWith(category));
    
            chosenFile = pigeonFiles[Math.floor(Math.random() * pigeonFiles.length)];
            console.log(category + ' ' + alpha);
    
            context.globalAlpha = alpha;
            const layer = await Canvas.loadImage(filePath + chosenFile);
            await context.drawImage(layer, 0, 0, canvas.width, canvas.height);
            context.globalAlpha = 1.0;
        }

        // returns a decimal from 0.1 to 1.0, rounded to the tens place
        function randomDecimal() {
            return 0.1 * Math.ceil((Math.random())*10);
        }
	},

};

