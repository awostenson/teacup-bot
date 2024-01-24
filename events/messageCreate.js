const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		if (message.author.bot) return false;

        const shrikeTriggerWords = ['shrike', 'whistle', 'whistlefox', 'piper'];

        shrikeTriggerWords.forEach((word) => {
            if (message.content.toLowerCase().includes(word)) {
                message.react('🎵');
            }
        });

        const chinTriggerWords = ['chin', 'white chin', 'whitechin'];

        chinTriggerWords.forEach((word) => {
            if (message.content.toLowerCase().includes(word)) {
                message.react('👑');
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

        const explosionTriggerWords = ['uwu', 'owo'];

        explosionTriggerWords.forEach((word) => {
            if (message.content.toLowerCase().includes(word)) {
                message.reply({ content: 'https://tenor.com/view/spraying-disinfect-lilo-and-stitch-lilo-stitch-gif-16694753', ephemeral: true});
            }
        });
	},
};  