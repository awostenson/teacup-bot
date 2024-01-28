const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
        const shrikeTriggerWords = ['shrike', 'whistlefox', 'piper'];

        shrikeTriggerWords.forEach((word) => {
            if (message.content.toLowerCase().includes(word)) {
                message.react('🎵');
            }
        });

        const chinTriggerWords = ['white chin', 'whitechin'];

        chinTriggerWords.forEach((word) => {
            if (message.content.toLowerCase().includes(word) && !Math.floor(Math.random()*4)) {
                message.react('👑');
            }
        });

        const mollyTriggerWords = ['mx problem', 'molly', 'harley'];

        mollyTriggerWords.forEach((word) => {
            if (message.content.toLowerCase().includes(word)) {
                message.react('✨');
            }
        });

        const ahabTriggerWords = ['teacup', 'ahab', 'area 51'];

        ahabTriggerWords.forEach((word) => {
            if (message.content.toLowerCase().includes(word)) {
                message.react('😉');
            }
        });

        const dragonTriggerWords = ['dragon'];

        dragonTriggerWords.forEach((word) => {
            if (message.content.toLowerCase().includes(word)) {
                message.react('🐉');
            }
        });

        const blushTriggerWords = ['good bot'];

        blushTriggerWords.forEach((word) => {
            if (message.content.toLowerCase().includes(word)) {
                message.react('😳');
            }
        });

        const booTriggerWords = ['bad bot'];

        booTriggerWords.forEach((word) => {
            if (message.content.toLowerCase().includes(word)) {
                message.react('👎');
            }
        });

        if (!message.author.bot && message.content.toLowerCase().includes('michael')) {
            message.reply(
                { content: 'https://tenor.com/view/michael-btb-michael-gif-13025635' }
                );
        }

        const explosionTriggerWords = ['uwu', 'owo'];

        explosionTriggerWords.forEach((word) => {
            if (message.content.toLowerCase().includes(word)) {
                message.reply({ content: 'https://tenor.com/view/spraying-disinfect-lilo-and-stitch-lilo-stitch-gif-16694753' });
            }
        });
	},
};  