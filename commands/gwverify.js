/*
* Verify users by guild according to the api key they send the bot
*/

exports.run = async (client, message, args, level) => {
    if(!args[0]) {
        // get the user who sent the command
        const msgAuthor = message.author;
        // @ that user with a link to our build section
        await msgAuthor.send(`Hi there! I'm here to help you get verified on the ${message.guild.name} Discord server!`);
        
    }
    // 2 - if(args[0]) then run verification with argument as an API key

    // 3 - Use API key to loop thru user's guilds and check if DIS is one of them

    // 4 - if(DIS) then give them DIS role in discord, if(!DIS) then do not give them DIS role in discord
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["gwv"],
    permLevel: "User"
};

exports.help = {
    name: "gwverify",
    category: "Guild Wars 2",
    description: " - UNDER CONSTRUCTION - ",
    usage: "gwverify"
};