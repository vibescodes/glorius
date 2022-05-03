const { Collection } = require("discord.js");
const config = require("./config.json");
const { client, Login } = require("./structure/funcList");
client.prefix = config.PREFIX;
client.commands = new Collection();
client.limits = new Map();
client.on("warn", (error) => console.log(error));
client.on("error", (error) => console.log(error));
client.setMaxListeners(0);
Login();
const command = require("./structure/commandHandler");
command.run(client);

const events = require("./structure/event");
events.run(client);

// !ANTI CRASH
process.on("unhandledRejection", (reason, p) => {
  console.log(
    "\x1b[31m%s\x1b[0m",
    " [Anti - Crash] :: Unhandled Rejection/Catch"
  );
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(
    "\x1b[31m%s\x1b[0m",
    " [Anti - Crash] :: Uncaught Exception/Catch"
  );
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(
    "\x1b[31m%s\x1b[0m",
    " [Anti - Crash] :: Uncaught Exception/Catch (MONITOR)"
  );
  console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
  console.log("\x1b[31m%s\x1b[0m", " [Anti - Crash] :: Multiple Resolves");
});

client.on("voiceStateUpdate", async (oldState, newState) => {
  const data = {
    channelID: "899064885806268476",
    categoryID: "899065570236964954",
  };
  const user = await client.users.fetch(newState.id);
  if (newState.channel === newState.guild.channels.cache.get(data.channelID)) {
    newState.guild.channels
      .create(`${user.username}`, {
        type: "GUILD_VOICE",
        parent: data.categoryID,
      })
      .then(async (set) => {
        await newState.setChannel(newState.guild.channels.cache.get(set.id));
        await set.lockPermissions().then((add) =>
          add.permissionOverwrites.edit(newState.id, {
            PRIORITY_SPEAKER: true,
          })
        );
      });
  }
  if (oldState.channel) {
    let filtered = (ch) =>
      ch.parent === newState.guild.channels.cache.get(data.categoryID) &&
      ch.id !== data.channelID &&
      oldState.channel.id === ch.id &&
      oldState.channel.members.filter((m) => !m.user.bot).size < 1;
    return oldState.guild.channels.cache
      .filter(filtered)
      .forEach(async (ch) => await ch.delete());
  } else if (oldState.id !== newState.id) {
    console.log("Info : user moves");
  }
});
