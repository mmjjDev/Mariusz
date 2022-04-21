module.exports = {
    name: 'skip',
    aliases: ["s"],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);
 
        if (!queue || !queue.playing) return message.channel.send({ content: `${message.author}, Żadna muzyka teraz nie leci!` });

        const success = queue.skip();

        return message.channel.send({ content: success ? `Pominięto **${queue.current.title}** ✅` : `${message.author}, Coś poszło nie tak!` });
    },
};
