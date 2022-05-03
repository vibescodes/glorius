const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");

module.exports.help = {
  name: "region",
  description: "regions",
};

module.exports.limits = {
  rateLimit: 1,
  cooldown: 2000,
  case: "Command has limit rate",
};

module.exports.run = async (client, message, args) => {
  let channel = message.member.voice.channel;
  if (!channel) return message.reply(":x: Setting channel on your own channel");

  const row = new MessageActionRow().addComponents(
    new MessageSelectMenu()
      .setCustomId("region")
      .setPlaceholder("Choose Region")
      .setDisabled(!message.author.id)
      .addOptions([
        {
          label: "Brazil",
          value: "brazil",
          description: "TOD",
          emoji: "🍟",
        },
        {
          label: "Rotterdam",
          value: "rotterdam",
          description: "TOD",
          emoji: "🍟",
        },
        {
          label: "Hongkong",
          value: "hongkong",
          description: "TOD",
          emoji: "🍟",
        },
        {
          label: "India",
          value: "india",
          description: "TOD",
          emoji: "🍟",
        },
        {
          label: "Japan",
          value: "japan",
          description: "TOD",
          emoji: "🍟",
        },
        {
          label: "Russia",
          value: "russia",
          description: "TOD",
          emoji: "🍟",
        },
        {
          label: "Singapore",
          value: "singapore",
          description: "TOD",
          emoji: "🍟",
        },
        {
          label: "South Africa",
          value: "southafrica",
          description: "TOD",
          emoji: "🍟",
        },
        {
          label: "Sydney",
          value: "sydney",
          description: "TOD",
          emoji: "🍟",
        },
        {
          label: "US Central",
          value: "us-central",
          description: "TOD",
          emoji: "🍟",
        },
        {
          label: "US East",
          value: "us-east",
          description: "TOD",
          emoji: "🍟",
        },
        {
          label: "US West",
          value: "us-west",
          description: "TOD",
          emoji: "🍟",
        },
        {
          label: "US South",
          value: "us-south",
          description: "TOD",
          emoji: "🍟",
        },
      ])
  );

  const filter = (interaction) =>
    interaction.isSelectMenu() && interaction.user.id === message.author.id;
  const collector = message.channel.createMessageComponentCollector({
    filter,
    max: 1,
  });

  collector.on("collect", async (collected) => {
    const value = collected.values[0];
    collected.deferUpdate();
    collected.deleteReply();

    const embed = new MessageEmbed()
      .setAuthor({
        name: "Channel Edited",
        iconURL: message.guild.iconURL,
      })
      .setDescription(
        `Channel Region edited by **${message.author.username}** into **${value}**`
      )
      .setFooter({ text: "GLORIUS AREA" })
      .setColor("GREEN");

    if (collected.customId === "region") {
      if (message.author.id === collected.user.id) {
        collected.member.voice.channel.setRTCRegion(value);
        await collected.channel.send({ embeds: [embed], ephemeral: true });
      } else {
        await collected.reply({
          content: "Lu bukan authornya",
          ephemeral: true,
        });
      }
    }
  });

  await message.channel.send({
    content: "Select the available voice region",
    components: [row],
  });
};
