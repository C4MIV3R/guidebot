/*
The PANCAKE command is used to display a random pancake image.
*/

exports.run = async (client, message, args, level) => {

    //require Discord library
    const Discord = require("discord.js");
    // make a call to an api to search for images

    // save image URL as variable
    var pancakeImage = 'some image url';

    const embed = new Discord.RichEmbed()
    .setColor("#00AE86")
    .setImage(`${pancakeImage}`);
    
    message.delete()
    .catch(console.error);
    message.channel.send({embed});
 
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["p"],
    permLevel: "User"
};

exports.help = {
    name: "pancake",
    category: "Miscellaneous",
    description: " - UNDER CONSTRUCTION - ",
    usage: "pancake"
};
