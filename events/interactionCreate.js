module.exports = async (client, message) => {
  if (message.isSelectMenu()) {
    await message.deferUpdate();
    message.reply({ content: `You choose ${message.values[0]}` });
  }
};
