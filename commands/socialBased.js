/*
* Social Based Guild
*/

exports.run = async (client, message, args, level) => {
    await message.channel.send(`As a member of core i have not felt like there was any way to progress within the guild. Things appear to just be social based and not merit based. The majority of leaders are not approcahable and do not appear to take anything seriously. Some of the people that squirrel during raids are leaders and there have been a number of occassions where I myself have had questions ignored by the leaders that were online at the time. This just is not a guild environment i can be in.`);
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "socialbased",
    category: "Miscellaneous",
    description: "DIS is an 18+ ERP Guild.",
    usage: "socialbased"
};