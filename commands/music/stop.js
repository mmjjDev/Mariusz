module.exports = {
    name: 'stop',
    aliases: ['pause'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Aktualnie nie leci żadna muzyka!` });

        queue.destroy();

        message.channel.send({ content: `Zatrzymano aktualnie lecącą muzykę` });
    },
};
