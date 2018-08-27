/*
* Mod aboose
*/

exports.run = async (client, message, args, level) => {
    await message.channel.send(`Leaving has been on my mind lately and todays demonstration of disrespect was what finalized the decision. As the guild leader, I felt you should know my reasons. As a member of core, I have not felt like there was any way to progress within the guild. Things appear to just be social based and not merit based. The majority of leaders are not approachable and do not appear to take anything seriously. Some of the people that squirrel during raids are leaders and there have been a numbrer of reasons where I myself have had questions ignored by the leaders that were online on the time. I do appreciate your commanding and thank you for the raids, but this is not a guild environment I can be in.`);
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "socialBased",
    category: "Miscellaneous",
    description: "[DIS] is an ERP Social Progression Guild looking for 18+ brothel members.",
    usage: "socialBased"
};