/*
* Charr car
*/

exports.run = async (client, message, args, level) => {
    const msg = message.channel.send(`Soon my cat of war... just you wait.`);
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "charrcar",
    category: "Miscellaneous",
    description: "Prints out a charr car.",
    usage: "charrcar"
};