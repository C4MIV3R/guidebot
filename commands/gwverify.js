/*
* Verify users by guild according to the api key they send the bot
*/

exports.run = async (client, message, args, level) => {
    // require request-promise
    var rp = require('request-promise');
    // declare and set variables to check world and guilds
    var onOurServer = false;
    var inOurGuild = false;
    // declare and set msgAuthor
    const msgAuthor = message.author;
    // setting privateSetting variable up
    const privateSettingsObject = client.config.privateSettings;
    // setting apiKeyLength for sanitization checks
    // const apiKeyLength = privateSettingsObject.gw2VerifyApiKeyLength;
    if(!args[0]) {
        // if no arguments after command - respond to user in channel with instructions
        message.channel.send(`Hi there! I'm here to help you get verified on the ${message.guild.name} server!\nPlease follow the directions outlined in this document to verify on the Discord server: https://docs.google.com/document/d/1uzYWUq3cQh0S1HuvxKItdfbQNHDPzAR5CLjJ-nJ2AHM/edit?usp=sharing`);
        client.logger.log(`Sent User ${msgAuthor.username} instructions on verification.`);
    } else {
        // if argument exists:
        // if message is in verify channel
        if(message.channel.name === client.config.privateSettings.gw2VerifyChannelName) {
            // allow a-z, A-Z, 0-9, - (dashes), but reject any other special characters 
            if(/^[a-zA-Z0-9-]*$/.test(args[0]) == true) {
                // set apiAccessToken = to argument index 0
                var apiAccessToken = args[0];
                // immediately delete message containing APIKey
                message.delete();
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
                        client.logger.error(err);
                        message.channel.send(`User: ${msgAuthor.username} - ${err.toString()}`);
                    });

                // a string of the account's name
                var accountName = apiResponse.name;
                // an array of the guilds the account is a member of
                var apiGuildsArray = apiResponse.guilds; 
                // an integer of the worldId the account is a member of
                var apiGwServer = apiResponse.world;
                // check to see if guild where message was sent is up and available && GW2 api has returned a non-null response
                if(message.guild.available && apiResponse) {
                    client.logger.log('Server available. Continuing.');
                    client.logger.log(message.member.displayName);
                    // set nickname as their previous nickname + GW2 accountName
                    var memberNewDisplayName = message.member.displayName + ` (${accountName})`;
                    message.member.setNickname(memberNewDisplayName);
                    client.logger.log(memberNewDisplayName);
                    // ----- guild verification -----
                    for(var i=0; i < apiGuildsArray.length; i++) {
                        if(apiGuildsArray[i] === privateSettingsObject.gw2VerifyGuildId) {
                            inOurGuild = true;
                            client.logger.log(`User: ${msgAuthor.username}, Discord ID: ${msgAuthor.id}, GW2 Account: ${accountName} - Verification successful. Granting ${privateSettingsObject.memberRoleName} role to user.`);
                            // exit loop
                            return;
                        } else {
                            // send failure to user
                            inOurGuild = false;
                            client.logger.log(`Guild ${i+1} is not DIS`);
                        }   
                    }
                    // message.channel.send('Dissentient membership verification failed.\nIf you believe this was an error, please try again.\n\nIf the error persists, contact Kamm in DIS discord.');
                    client.logger.log(`User ${msgAuthor.username} - guild verification failed. Moving to world verification.`);
                    // ----- world verification -----
                    // check that the account's worldId matches the worldId in config.privatesettings.gw2VerifyServerId
                    // check 
                    if(inOurGuild === false) {
                        if(apiGwServer === privateSettingsObject.gw2VerifyServerId) {
                            onOurServer = true;
                            client.logger.log(`User: ${msgAuthor.username}, Discord ID: ${msgAuthor.id}, GW2 Account: ${accountName} - Server verification successful. Granting ${privateSettingsObject.basicRoleName} role to user.`);
                        } else {
                            // user is NOT on our server - do not verify for basicRole
                            onOurServer = false;
                            client.logger.log(`User: ${msgAuthor.username}, Discord ID: ${msgAuthor.id}, GW2 Account: ${accountName} - Server verification failed.`);
                        }
                    } else {
                        // if in our guild, don't give TC WvW role
                        return;
                    }
                } else {
                    message.delete();
                    message.channel.send('GW2 API did not respond. Please try again later.');
                    client.logger.log(`User ${msgAuthor.username} - GW2 api responded null.`);
                }
            } else {
                message.delete();
                message.channel.send('Invalid characters detected. Please check your API Key and try again.');
                client.logger.log(`User ${msgAuthor.username} - invalid characters detected.`);
            }
        } else {
            message.delete();
            message.channel.send(`Invalid channel. Please use the '${privateSettingsObject.gw2VerifyChannelName}' to verify your account`);
            client.logger.log(`User ${msgAuthor.username} attempted to verify in an invalid channel: ${message.channel}.`);
        }
    }
}
    // more placeholder 
                            // message.channel.send('Server membership verification failed.\nIf you believe this was an error, please try again.\n\nIf the error persists, contact Kamm in DIS discord.');


    // more placeholder

                            // get guild ID -> find role within said guild with name equal to config.privatesettings.basicRoleName
                            // var basicRole = message.guild.roles.find("name", privateSettingsObject.basicRoleName);
                            // get guild ID -> find user within guild with id equal to msgAuthor.id -> add basicRole
                            // message.guild.members.get(msgAuthor.id).addRole(basicRole);
                            // send confirm to user
                            // message.channel.send(`Server membership confirmed.\nYou have been successfully verified.\nEditing permissions.\n\nIf for some reason, you do not receive the ${privateSettingsObject.basicRoleName} role, contact Kamm in DIS discord.`);




    // placeholder for now
                            // get guild ID -> find role within said guild with name equal to config.privatesettings.memberRoleName
                            // var memberRole = message.guild.roles.find("name", privateSettingsObject.memberRoleName);
                            // get guild ID -> find user within guild with id equal to msgAuthor.id -> add memberRole
                            // message.guild.members.get(msgAuthor.id).addRole(memberRole);
                            // send confirm to user
                            // message.channel.send(`Dissentient membership confirmed.\nYou have been successfully verified.\nEditing permissions.\n\nIf for some reason, you do not receive the ${privateSettingsObject.memberRoleName} role, contact Kamm in DIS discord.`);

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["gwv"],
    permLevel: "User"
};

exports.help = {
    name: "gwverify",
    category: "Guild Wars 2",
    description: "Verification for DIS discord through GW2 API.\nChecks for both world and guild.",
    usage: "gwverify [APIKey]"
};