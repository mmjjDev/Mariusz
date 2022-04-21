const { Player } = require('discord-player');
const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { readdirSync } = require('fs');

let client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});

client.config = require('./config');
client.player = new Player(client, client.config.opt.discordPlayer);
client.commands = new Collection();
const player = client.player

const events = readdirSync('./events/').filter(file => file.endsWith('.js'));
for (const file of events) {
    const event = require(`./events/${file}`);
    console.log(`-> Loaded event ${file.split('.')[0]}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
};
console.log(`-> Loaded commands...`);
readdirSync('./commands/').forEach(dirs => {
    const commands = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`${command.name.toLowerCase()} Load Command!`);
        client.commands.set(command.name.toLowerCase(), command);
        delete require.cache[require.resolve(`./commands/${dirs}/${file}`)];
    };
});


player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    queue.metadata.send({ content: `🎵 Tytuł piosenki: **${track.title}** -> Kanał: **${queue.connection.channel.name}** 🎧` });
});

player.on('trackAdd', (queue, track) => {
    queue.metadata.send({ content: `Dodano **${track.title}** do kolejki.` });
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send({ content: 'Zostałem wyjebany z kanału :c!' });
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send({ content: 'Wszyscy wyszli to ja też i chuj mnie to obchodzi.' });
});

player.on('queueEnd', (queue) => {
    const puszczanieEmbed = new MessageEmbed()
        puszczanieEmbed.setColor('RED');
        puszczanieEmbed.setTitle('ERROR')
        puszczanieEmbed.setDescription('Wszystkie piosenki z listy zostały puszczone teraz puszcza się tylko twoja mama.')

        const saveButton = new MessageButton();

        saveButton.setLabel('Spierdalaj');
        saveButton.setCustomId('twojaStara');
        saveButton.setStyle('SUCCESS');

        const queueRow = new MessageActionRow().addComponents(saveButton);
        queue.metadata.send({ embeds: [puszczanieEmbed], components: [queueRow] });
});


client.login(`${process.env.BOT_TOKEN}`).catch(e => {
console.log(e)
})

