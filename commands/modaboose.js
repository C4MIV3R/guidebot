/*
* Mod aboose
*/

exports.run = async (client, message, args, level) => {
    await message.channel.send(`Mod Abooose!`);
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "modaboose",
    category: "Miscellaneous",
    description: "Screams about mod abuse.",
    usage: "modaboose"
};