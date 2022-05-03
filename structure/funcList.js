const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
  intents: [
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_WEBHOOKS,
  ],
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  http: {
    agent: {},
    version: 9,
    api: "https://discord.com/api",
    cdn: "https://cdn.discordapp.com",
    invite: "https://discord.gg",
    template: "https://discord.new",
    scheduledEvent: "https://discord.com/events",
  },
  allowedMentions: {
    parse: ["everyone", "roles", "users"],
    repliedUser: true,
  },
});

function Login() {
  const config = require("../config.json");
  try {
    client.login(config.TOKEN);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  client,
  Login,
};
