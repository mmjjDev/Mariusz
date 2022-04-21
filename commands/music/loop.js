const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loop',
    aliases: ['lp'],
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

 
if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Aktualnie nic nie jest odtwarzane!` });

        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return message.channel.send({ content: `${message.author}, Musisz najpierw wyłączyć loop na poprzedni utwór **(${client.config.px}loop)**` });

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.channel.send({ content: success ? `Loop: **${queue.repeatMode === 0 ? 'Nieaktywny' : 'Aktywny'}**, cała kolejka będzie powtarzana ` : `${message.author}, Coś poszło nie tak.` });
        } else {
            if (queue.repeatMode === 2) return message.channel.send({ content: `${message.author}, Musisz najpierw wyłączyć loop kolejki **(${client.config.px}loop queue)**` });

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.channel.send({ content: success ? `Loop: **${queue.repeatMode === 0 ? 'Nieaktywny' : 'Aktywny'}**, ten utwór będzie powtarzany (**${client.config.px}loop queue** aby zapętlić całą kolejkę)` : `${message.author}, Coś poszło nie tak.` });
};
    },
};
