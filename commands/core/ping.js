const Discord = require('discord.js');
module.exports = {
    name: 'ping',
    aliases: [],
    utilisation: '{prefix}ping',

    execute(client, message) {
        const start = Date.now();
        message.channel.send('Pong!').then(m => {
            const embed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle(client.user.username + " - Pong!")
                .setThumbnail(client.user.displayAvatarURL())
                .addField(`Ping wiadomości`, `\`${Date.now() - start}ms\` 🛰️`)
                .addField(`Opóźnienie wiadomości`, `\`${m.createdTimestamp - start}ms\` 🛰️`)
                .addField(`Opóźnienie Discord API`, `\`${Math.round(client.ws.ping)}ms\` 🛰️`)
                .setTimestamp()
                .setFooter({ text: 'bot by mmjj', iconURL: message.author.avatarURL({ dynamic: true }) });
            m.edit({ embeds: [embed] });
        })
    },
};
