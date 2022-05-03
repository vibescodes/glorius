const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "transfer",
  description: "transfer the channel access",
};

module.exports.limits = {
  rateLimit: 3,
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
      return message.reply(
        `:x: That person should join to your channel/ not in your vc`
      );

    // async () => await channel.permissionOverwrites.delete(message.member.id);

    await channel.lockPermissions().then((add) =>
      add.permissionOverwrites.edit(user.id, {
        PRIORITY_SPEAKER: true,
      })
    );

    let ikan = new MessageEmbed()
      .setTitle("Authority Update")
      .setDescription(
        "**Note** : Hey author, i just reset the channel configuration, because channel transfer method"
      )
      .addField(
        "Transfer Rights",
        `
:x: Previous Owner : <@${message.member.id}>
<:True:826475694661042206> Current Author : <@${user.id}>
  `
      )
      .setFooter({ text: "GLORIUS AREA" })
      .setColor("GREEN");
    throw message.reply({
      embeds: [ikan],
    });
  } catch (err) {
    console.log(err);
  }
};
