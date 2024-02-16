const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {

        const triggerWords = {
            '👑': [
                'white chin',
                'whitechin'
            ],
            '🎵': [
                ' shrike', 
                'whistlefox', 
                'piper'
            ],
            '✨': [
                'mx problem', 
                'molly', 
                'harley'
            ],
            '😉': [
                'teacup', 
                'ahab', 
                'area 51'
            ],
            '🐉': [ 
                'dragon' 
            ],
            '😳': [ 
                'good bot' 
            ],
            '👎': [ 
                'bad bot' 
            ],
            '🦖': [
                'trex', 
                't rex', 
                't-rex'
            ],
            '❌': [ 
                'rat'
            ],
            '👄': [ 
                'ghost',
                'the pit',
                'the hole'
            ]
        };

        for (emoji in triggerWords) {
            for (i in triggerWords[emoji]) {
                if (message.content.toLowerCase().includes(triggerWords[emoji][i])) {
                    message.react(emoji);
                }
            }
        }

        const stonksTriggerWords = ['stonks'];

        stonksTriggerWords.forEach((word) => {
            if (message.content.toLowerCase().includes(word)) {
                message.react('🔥');
                message.react('📈');
                message.react('😤');
                message.react('🙏');
            }
        });

        if (!message.author.bot && message.content.toLowerCase().includes('michael')) {
            message.reply(
                { content: 'https://tenor.com/view/michael-btb-michael-gif-13025635' }
                );
        }

        const explosionTriggerWords = ['uwu', 'owo', ':3', 'nyah', '>.<'];

        explosionTriggerWords.forEach((word) => {
            if (message.content.toLowerCase().includes(word)) {
                message.reply({ content: 'https://tenor.com/view/spraying-disinfect-lilo-and-stitch-lilo-stitch-gif-16694753' });
            }
        });
	},
};  