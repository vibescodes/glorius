const { MessageEmbed } = require("discord.js");

//! CONVERT MS TO S JAVASCRIPT
const msToTime = (ms) => {
  let seconds = (ms / 1000).toFixed(1);
  let minutes = (ms / (1000 * 60)).toFixed(1);
  let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);

  if (seconds < 60) {
    return seconds + " Sec";
  } else if (minutes < 60) {
    return minutes + " Min";
  } else if (hours < 24) {
    return hours + " Hrs";
  } else {
    return days + " Days";
  }
};

module.exports = (client, message) => {
  // const [attachments] = message.attachments.values();
  // const url = attachments ? attachments.url : null;
  // const channel = message.guild.channels.cache.get("957563200281411614");
  // if (message.channel.id === "942238398700216381") {
  //   if (message.author.bot) return;
  //   channel.send({
  //     content: attachments
  //       ? `**${message.author.tag}** - ${url}`
  //       : `**${message.author.tag}** - ${message.content}`,
  //   });
  // }

  if (message.author.bot) return;

  const args = message.content.split(/ +/g);

  const command = args.shift().slice(client.prefix.length).toLowerCase();

  const cmd = client.commands.get(command);

  if (!message.content.toLowerCase().startsWith(client.prefix)) return;

  if (!cmd) return;

  if (cmd.limits) {
    const rateLimitMessage = new MessageEmbed()
      .setColor("RED")
      .addField("Command Limitation", cmd.limits.case)
      .addField(
        "Estimation",
        `
\`\`\`sql
Limits   : ${cmd.limits.rateLimit}
Cooldown : ${msToTime(cmd.limits.cooldown)}
\`\`\`
`
      );

    const current = client.limits.get(`${command}-${message.author.id}`);

    if (!current) {
      client.limits.set(`${command}-${message.author.id}`, 1);
    } else {
      if (current >= cmd.limits.rateLimit)
        return message.reply({ embeds: [rateLimitMessage] });
      client.limits.set(`${command}-${message.author.id}`, current + 1);
    }

    setTimeout(() => {
      client.limits.delete(`${command}-${message.author.id}`);
    }, cmd.limits.cooldown);
  }

  cmd.run(client, message, args);
};
