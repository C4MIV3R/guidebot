/*
* Commander Cody...
* The time has come...
*  ---- joke command ----
*/

exports.run = async (client, message, args, level) => {
    await message.channel.send(`Did Ruq give you permission?`);
}

exports.conf = {
    enabled: false,
    guildOnly: true,
    aliases: [],
    permLevel: "Bot Owner"
};

exports.help = {
    name: "thetimehascome",
    category: "Scorched Discord",
    description: "Commander Cody... The time has come. Execute Order 66.",
    usage: "I'm sorry Dave. I can't do that."
};
