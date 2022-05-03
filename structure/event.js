const { readdirSync } = require("fs");
const { join } = require("path");
const filePath = join(__dirname, "..", "events");

module.exports.run = (client) => {
  const eventFiles = readdirSync(filePath);
  for (const eventFile of readdirSync(filePath)) {
    const event = require(`${filePath}/${eventFile}`);
    const eventName = eventFile.split(".").shift();
    client.on(eventName, event.bind(null, client));
  }
  console.log("\x1b[33m%s\x1b[0m", `[ ✅ Load ${eventFiles.length} event! ]`);
};
