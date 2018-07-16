// Evie's version of the HELP command for reference if needed
//
// exports.run = (client, message, args, level) => {
//   // If no specific command is called, show all filtered commands.
//   if (!args[0]) {
//     // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
//     const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);

//     // Here we have to get the command names only, and we use that array to get the longest name.
//     // This make the help commands "aligned" in the output.
//     const commandNames = myCommands.keyArray();
//     const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

//     let currentCategory = "";
//     let output = `= Command List =\n\n[Use ${message.settings.prefix}help <commandname> for details]\n`;
//     const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
//     sorted.forEach( c => {
//       const cat = c.help.category.toProperCase();
//       if (currentCategory !== cat) {
//         output += `\u200b\n== ${cat} ==\n`;
//         currentCategory = cat;
//       }
//       output += `${message.settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
//     });
//     message.channel.send(output, {code: "asciidoc", split: { char: "\u200b" }});
//   } else {
//     // Show individual command's help.
//     let command = args[0];
//     if (client.commands.has(command)) {
//       command = client.commands.get(command);
//       if (level < client.levelCache[command.conf.permLevel]) return;
//       message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\naliases:: ${command.conf.aliases.join(", ")}\n= ${command.help.name} =`, {code:"asciidoc"});
//     }
//   }
// };

/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.
*/

// ---------- TO DO: ----------
// extend HELP command to take args and check if it is a category - then display help for the commands within that category 
// expand embedded help message to include category of each command or change it to work more like FredBoat?
// QA testing on current iteration
// Rewrite to list all commands no matter access level and just include access levels in specific help command?

exports.run = (client, message, args, level) => {
  //require Discord library
  const Discord = require("discord.js");
  // If no specific command is called, show all filtered commands.
  if (!args[0]) {
    // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
    const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);
    // get command names from myCommands object
    const commandNames = myCommands.keyArray();
    // create array for pushing commandsObject into
    var fieldsVar = [];

    // loop through commandNames and push the commands into fieldsVar as objects
    for(var i=0; i < commandNames.length; i++) {
      // works for getting command names, but I still need to get the command descriptions and add them in.
      var commandsObject = {};
      commandsObject['name'] = commandNames[i];
      command = client.commands.get(commandNames[i]);
      commandsObject['value'] = command.help.description;
      fieldsVar.push(commandsObject);
    }

    message.channel.send({embed: {
        color: 3447003,
        title: `Command List`,
        description: `Use ${message.settings.prefix}help <commandname> for details.`,
        fields: fieldsVar
      }
    });
  } else {
    // display a specific command's help text
    let command = args[0];
    if(client.commands.has(command)){
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return;
      message.channel.send({embed: {
        color: 3447003,
        title: `${command.help.name} Help`,
        description: `${command.help.description}`
      }
    });
    }
  }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["h", "halp"],
    permLevel: "User"
};

exports.help = {
  name: "help",
  category: "System",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};