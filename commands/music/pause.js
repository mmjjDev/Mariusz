module.exports = {
    name: 'pause',
    aliases: [],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

       if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Aktualnie nic nie jest odtwarzane!` });

        const success = queue.setPaused(true);

        return message.channel.send({ content: success ? `Utwór **${queue.current.title}** został zatrzymany!` : `${message.author}, Coś poszło nie tak.` });
    },
};
