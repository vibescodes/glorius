const { MessageEmbed } = require("discord.js");
module.exports.help = {
  name: "claim",
  description: "claim the channel",
};

module.exports.limits = {
  rateLimit: 3,
  cooldown: 2000,
  case: "Command has limit rate",
};

// const oldState = require("../index");
// const newState = require("../index");
// const AUTO_VOICE_CHANNEL = require("../index");

module.exports.run = async (client, message, args) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.reply(
      "<:Locked:878090820912295967> Setting channel on your own channel"
    );

  const channelOwner = channel.permissionOverwrites.cache.map(
    (x) => message.guild.members.resolve(x.id)?.user.id
  );

  ikan = channelOwner.filter(function (element) {
    return element !== undefined || null;
  });

  // console.log(ikan.toString());
  // const ownership = await client.users.fetch(ikan.toString());
  const member = await message.guild.members.fetch(ikan.toString());
  // console.log(ownership);

  let channelSebelumnnya = member.voice.channel?.id;
  // console.log(sebelum);
  if (!message.guild.me.permissionsIn(channel).has("MANAGE_CHANNELS"))
    return message.reply(
      "<:Locked:878090820912295967> I dont have authority to manage"
    );

  const yourChannelAuthor = new MessageEmbed()
    .setDescription(`Hey <@${member.id}>, you are still the channel author`)
    .setColor("BLUE");
  const ownerConnect = new MessageEmbed()
    .setDescription(`Currently the channel author is <@${member.id}>`)
    .setColor("RED");
  const ownerLeave = new MessageEmbed()
    .setDescription(
      `Yazz <@${message.author.id}>, now you are the channel master!`
    )
    .setColor("GREEN");

  if (member.voice.channel && message.member.id === ikan.toString()) {
    return message.channel.send({
      embeds: [yourChannelAuthor],
    });
  } else if (channel.id !== channelSebelumnnya) {
    await channel.permissionOverwrites.delete(member.id);
    await channel.lockPermissions().then((add) =>
      add.permissionOverwrites.edit(message.member, {
        PRIORITY_SPEAKER: true,
      })
    );

    return message.channel.send({
      embeds: [ownerLeave],
    });
  } else if (member.voice.channel) {
    return message.channel.send({
      embeds: [ownerConnect],
    });
  }
};

// ${channelr.permissionOverwrites.cache.map((x) => x.type === "role" ? message.guild.roles.resolve(x.id)?.name : message.guild.members.resolve(x.id)?.user.username
