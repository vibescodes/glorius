const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "limit",
  description: "setup the voice channel limit",
};

module.exports.limits = {
  rateLimit: 3,
  cooldown: 2000,
  case: "Command has limit rate",
};

module.exports.run = async (client, message, args) => {
  if (message.member.voice.channel) {
    let channel = message.member.voice.channel;
    if (!channel)
      return message.reply(
        "<:Locked:878090820912295967> Setting channel on your own channel"
      );

    if (!message.guild.me.permissionsIn(channel).has("MANAGE_CHANNELS"))
      return message.reply(
        "<:Locked:878090820912295967> I dont have authority to manage"
      );
    if (!message.member.permissionsIn(channel).has("PRIORITY_SPEAKER"))
      return message.reply("<:Locked:878090820912295967> Channel is owned");

    if (!args.length || isNaN(args[0]))
      return message.reply(
        "<:False:823030995053576232> Please input the limit number"
      );

    let limit = args.join(" ") || isNaN(args[0]);
    if (limit > 99)
      return message.reply(
        "<:False:823030995053576232> Please input the valid limit number 1 - 99 are available"
      );
    if (limit < 0)
      return message.reply(
        "<:False:823030995053576232> Please input the valid limit number 1 - 99 are available"
      );

    channel.setUserLimit(limit);
    return message.react("<:True:826475694661042206>");
  }
};
