const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const axios = require("axios");
module.exports.help = {
  name: "name",
  description: "change channel name",
};

module.exports.limits = {
  rateLimit: 2,
  cooldown: 600000,
  case: "You've reach rate limit",
};

module.exports.run = async (client, message, args) => {
  try {
    const badword = [
      "kontol",
      "ngentod",
      "ngocok",
      "pepek",
      "memek",
      "ngewe",
      "memeq",
    ];
    let name = args.join(" ");
    let channel = message.member.voice.channel;
    if (
      badword.some(() =>
        message.toString().toLowerCase().toUpperCase().includes(name)
      )
    ) {
      return message.channel.send({ content: "Ga bagus namanya" });
    }
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
    if (!name)
      return message.reply(
        "<:False:823030995053576232> Please type new channel name"
      );
    if (message.member.voice.channel) {
      let ngentot = new MessageEmbed()
        .setTitle("Channel Edited")
        .setDescription(
          `Channel Name edited by **${message.author.username}** into **${name}**`
        )
        .setFooter({ text: "GLORIUS AREA" })
        .setColor("GREEN");
      await channel.setName(name);
      await message.reply({
        embeds: [ngentot],
      });
    }
  } catch (err) {
    console.log(err);
  }
};
