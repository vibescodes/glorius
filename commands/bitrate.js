const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports.help = {
  name: "bitrate",
  description: "setting up channel bitrate",
};

module.exports.limits = {
  rateLimit: 3,
  cooldown: 2000,
  case: "Command has limit rate",
};

module.exports.run = async (client, message, args) => {
  let channel = message.member.voice.channel;
  if (!channel) return message.reply(":x: Setting channel on your own channel");
  if (!message.guild.me.permissionsIn(channel).has("MANAGE_CHANNELS"))
    return message.reply(":x: I dont have authority to manage");

  if (!message.member.permissionsIn(channel).has("PRIORITY_SPEAKER"))
    return message.reply(":x: Channel is owned");

  if (!args.length || isNaN(args[0]))
    return message.reply(":x: Please input the bitrate number");

  const guildLevel = message.guild.premiumTier;
  let bitrate = args.join(" ") || isNaN(args[0]);
  if (!bitrate) return message.reply("Input bitrate value");

  if (message.member.voice.channel) {
    if (bitrate < 8)
      return message.reply(
        ":x: You cant set bitrate under 8Kbps, because the lower is 8Kbps"
      );
    if (guildLevel === "NONE") {
      if (bitrate > 96)
        return message.reply(
          ":x: You cant set the bitrate higher than 96Kbps, because the server has lvl 0 boost"
        );
    }
    if (guildLevel === "TIER_1") {
      if (bitrate > 128)
        return message.reply(
          ":x: You cant set the bitrate higher than 128Kbps, because the server has lvl 1 boost"
        );
    }
    if (guildLevel === "TIER_2") {
      if (bitrate > 256)
        return message.reply(
          ":x: You cant set the bitrate higher than 256Kbps, because the server has lvl 2 boost"
        );
    }

    if (guildLevel === "TIER_3") {
      if (bitrate > 384)
        return message.reply(
          ":x: You cant set the bitrate higher than 384Kbps, because that was the mas bit"
        );
    }
  }

  await message.member.voice.channel.setBitrate(bitrate + "000");
  await message.react("<:True:826475694661042206>");
};
