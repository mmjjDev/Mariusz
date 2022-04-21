const maxVol = require("../../config.js").opt.maxVol;

module.exports = {
    name: 'volume',
    aliases: ['vol'],
    utilisation: `{prefix}volume [1-${maxVol}]`,
    voiceChannel: true,

    execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

       if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Aktualnie nic nie jest odtwarzane!` });

        const vol = parseInt(args[0]);

        if (!vol) return message.channel.send({ content: `Current volume: **${queue.volume}** 🔊\n**Żeby zmienić głośność, napisz liczbę od \`1\` do \`${maxVol}\`**` });

        if (queue.volume === vol) return message.channel.send({ content: `${message.author}, Głośność, którą wybrałeś jest aktualnie ustawiona.` });

        if (vol < 0 || vol > maxVol) return message.channel.send({ content: `${message.author}, **Podaj liczbę od \`1\` do \`${maxVol}\`, żeby zmienić głośność odtwarzania.**` });

        const success = queue.setVolume(vol);

        return message.channel.send({ content: success ? `Aktualna głośność: **%${vol}**/**${maxVol}** 🔊` : `${message.author}, Coś poszło nie tak.` }) ;
    },
};
