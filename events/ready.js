module.exports = (client, message) => {
  try {
    console.log(
      "\x1b[32m%s\x1b[0m",
      `[ ✅ Connected as ${client.user.username} ]`
    );
  } catch (err) {
    console.log(err);
  }
  const cstatuslist = [`Fan#9024`];
  setInterval(() => {
    const index = Math.floor(Math.random() * cstatuslist.length);
    client.user.setActivity(cstatuslist[index], { type: "COMPETING" });
  }, 5000);
};
