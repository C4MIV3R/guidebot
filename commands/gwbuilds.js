/*
* Run our goddamn builds bitch.
* What about making this link to our preferred builds when a class is given as an argument
*/

exports.run = async (client, message, args, level) => {
    // get the user who sent the command
    const msgAuthor = message.author;
    // @ that user with a link to our build section
    await message.channel.send(`idk`);
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["gwb"],
    permLevel: "User"
};

exports.help = {
    name: "gwbuilds",
    category: "Guild Wars 2",
    description: " - UNDER CONSTRUCTION -",
    usage: "gwbuilds"
};