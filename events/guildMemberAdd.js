// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.getGuildSettings(member.guild);
  const privateSettings = client.config.privateSettings;
  // No matter what - assign user privateSettings.basicRoleName
  const roleId = client.guild.roles.find("name", privateSettings.basicRoleName);
  member.addRole(roleId, 'Joined server').catch(error);
 
  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  member.guild.channels.find("name", settings.welcomeChannel).send(welcomeMessage).catch(console.error);
};