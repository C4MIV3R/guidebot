/*
* Verify users by guild according to the api key they send the bot
*/

exports.run = async (client, message, args, level) => {
    // require request-promise
    var rp = require('request-promise');
    // declare and set msgAuthor
    const msgAuthor = message.author;
    // just saving some typing
    const privateSettingsObject = client.config.privateSettings;
    if(!args[0]) {
        // if no arguments after command - DM user with instructions
        message.chanel.send(`Hi there! I'm here to help you get verified on the Dissentient [DIS] Discord server!\nPlease follow the directions outlined in this document to verify on the Discord server: `);
        client.logger.log(`Sent user ${msgAuthor.username} a DM about verification.`);
    } else {
        // if argument exists:
        // if message exists in a guild - delete message and notify user that verification can only happen in DMs
        if(message.guild) {
            // delete message
            message.delete();
            // send message in channel to notify user to only send arguments in DM
            message.channel.send(`${msgAuthor} - Please attempt to verify via DM. I have deleted your message and am exiting the process.`);
            client.logger.log(`User ${msgAuthor.username} attempted to verify in an open channel. Deleting message and exiting process.`);
            return;
        } else {
            var apiAccessToken = args[0];
            client.logger.log(`User ${msgAuthor.username} attempting to verify using API_Key: ${apiAccessToken}`);
            // set options for api call
            var options = {
                uri: `https://api.guildwars2.com/v2/account`,
                qs: {
                    access_token: apiAccessToken
                },
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            };
            
            var apiResponse;
            await rp(options)
                .then(function(data) {
                    apiResponse = data;
                    console.log(data);
                })
                .catch(function(err) {
                    console.error(err);
                });
            
            // an array of the guilds the account is a member of
            var apiGuildsArray = apiResponse.guilds;
            // an integer of the worldId the account is a member of
            var apiGwServer = apiResponse.world;
            // a string of the account name 
            var accountName = apiResponse.name;
            // check to see if guild with ID set in config.privatesettings.discordServerId is up and available
            if(client.guilds.get(privateSettingsObject.discordServerId).available) {
                // client.logger.log('Server available. Continuing.');
                // check that the account's worldId matches the worldId in config.privatesettings.gw2VerifyServerId
                if(apiGwServer === privateSettingsObject.gw2VerifyServerId) {
                    // find guild by config.privateSettings.discordServerId -> find role within said guild with name equal to config.privatesettings.mainRoleName
                    var basicRole = client.guilds.get(privateSettingsObject.discordServerId).roles.find("name", privateSettingsObject.basicRoleName);
                    // find guild by config.privateSettings.discordServerId -> find user within guild with id equal to msgAuthor.id -> add basicRole
                    client.guilds.get(privateSettingsObject.discordServerId).members.get(msgAuthor.id).addRole(basicRole);
                    
                    msgAuthor.send('Server membership confirmed.\nYou have been successfully verified.\nEditing permissions.\n\nIf for some reason, you do not receive the TC WvW role, contact Kamm in DIS discord.');
                    client.logger.log(`User ${msgAuthor.username} - Server verification successful. Granting TC WvW role to user.`);
                } else {
                    // user is NOT on our server - do not verify for basicRole
                    msgAuthor.send('Server membership verification failed.\nIf you believe this was an error, please try again.\n\nIf the error persists, contact Kamm in DIS discord.');
                    client.logger.log(`User ${msgAuthor.username} - Server verification failed.`);
                }
                for(var i=0; i < apiGuildsArray.length ; i++) {
                    if(apiGuildsArray[i] === privateSettingsObject.gw2VerifyGuildId) {
                        // find guild by config.privateSettings.discordServerId -> find role within said guild with name equal to config.privatesettings.mainRoleName
                        var mainRole = client.guilds.get(privateSettingsObject.discordServerId).roles.find("name", privateSettingsObject.mainRoleName);
                        // find guild by config.privateSettings.discordServerId -> find user within guild with id equal to msgAuthor.id -> add mainRole
                        client.guilds.get(privateSettingsObject.discordServerId).members.get(msgAuthor.id).addRole(mainRole);
                        // send confirm to user
                        msgAuthor.send('Dissentient membership confirmed.\nYou have been successfully verified.\nEditing permissions.\n\nIf for some reason, you do not receive the DIS role, contact Kamm in DIS discord.');
                        client.logger.log(`User ${msgAuthor.username} - Verification successful. Granting DIS role to user.`);
                        // exit loop
                        return;
                    } else {
                        // send failure to user
                        client.logger.log(`Guild ${i+1} is not DIS`);
                    }
                }
                msgAuthor.send('Dissentient membership verification failed.\nIf you believe this was an error, please try again.\n\nIf the error persists, contact Kamm in DIS discord.');
                client.logger.log(`User ${msgAuthor.username} - guild verification failed.`);
            } else {
                msgAuthor.send('Discord server is currently down. Cannot apply changes. Exiting process.');
                client.logger.log(`Discord server is currently down. Exiting process.`);
                return;
            }
        }
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["disv"],
    permLevel: "User"
};

exports.help = {
    name: "disverify",
    category: "Guild Wars 2",
    description: "Verification for DIS discord through GW2 API.\n Checks for both world and guild.",
    usage: "disverify"
};