module.exports = {
    name: 'resume',
    aliases: [],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue) return message.channel.send({ content:`${message.author}, Aktualnie nic nie jest odtwarzane!` });

        const success = queue.setPaused(false);

        return message.channel.send({ content: success ? `Utwór **${queue.current.title}** został wznowiony.` : `${message.author}, Coś poszło nie tak.` });
    },
};
