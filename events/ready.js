module.exports = async (client) => {
    console.log(`Zalogowano jako: ${client.user.username}!`);

    client.user.setActivity(client.config.playing);
};