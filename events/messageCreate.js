module.exports = (client, message) => {
    if (message.content.startsWith(client.config.px)) {
        setTimeout(() => message.delete(), 10000)
    }

    if (message.author.id == client.user.id) {
        if (!message.content.includes(`Tytuł piosenki:`) || !message.content.includes(`Pominięto`)) {
            setTimeout(() => message.delete(), 60000)
        } else {
            return;
        }
    }

    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = client.config.px;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    const DJ = client.config.opt.DJ;

    if (cmd && DJ.enabled && DJ.commands.includes(cmd.name)) {
        const roleDJ = message.guild.roles.cache.find(x => x.name === DJ.roleName);

        if (!message.member.roles.cache.has(roleDJ.id)) {
            return message.channel.send({ content: `${message.author}, Ta komenda jest tylko dla roli ${DJ.roleName}.` });
        }
    }

    if (cmd && cmd.voiceChannel) {
        if (!message.member.voice.channel) return message.channel.send({ content: `${message.author}, Nie jesteś połączony z żadnym czatem głosowym.` });
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({ content: `${message.author}, Nie jesteś na tym samym kanale głosowym co bot.` });
    }

    if (cmd) cmd.execute(client, message, args);
};
