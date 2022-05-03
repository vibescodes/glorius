const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "kick",
  description: "transfer the channel access",
};

module.exports.limits = {
  rateLimit: 1,
  cooldown: 2000,
  case: "Command has limit ratea",
};

module.exports.run = async (client, message, args) => {
  let channel = message.member.voice.channel;
  if (!channel) return message.reply(":x: Setting channel on your own channel");
  try {
    if (!message.member.permissionsIn(channel).has("PRIORITY_SPEAKER"))
      return message.reply(":x: Channel is owned");

    if (!message.guild.me.permissionsIn(channel).has("MANAGE_CHANNELS"))
      return message.reply(":x: I dont have authority to manage");

    let user = message.mentions.members.first();
    if (!user) return message.reply(":x: You should mention(**User**)");

    if (user.user.bot) return message.reply(":x: User detected as (**bot**)");

    if (
      user.voice.channel === null ||
      user.voice.channel === undefined ||
      user.voice.channel !== channel
    )
      return message.reply(`:x: user is not defined`);

    await user.voice.disconnect();

    let ikan = new MessageEmbed()
      .setTitle("User Remove")
      .setDescription(`**${user.user.username}** kick from ${channel.name}`)
      .setFooter({ text: "GLORIUS AREA" })
      .setColor("GREEN");
    await message.reply({
      embeds: [ikan],
    });
  } catch (err) {
    console.log(err);
  }
};
