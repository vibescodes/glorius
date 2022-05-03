const { readdirSync } = require("fs");

const { join } = require("path");

const filePath = join(__dirname, "..", "commands");

module.exports.run = (client) => {
  for (const cmd of readdirSync(filePath).filter((cmd) =>
    cmd.endsWith(".js")
  )) {
    const prop = require(`${filePath}/${cmd}`);
    client.commands.set(prop.help.name, prop);
  }
  console.log(
    "\x1b[36m%s\x1b[0m",
    `[ ✅ Load ${client.commands.size} commands! ]`
  );
};
