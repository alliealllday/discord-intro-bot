const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// YOUR REAL IDS
const INTRO_CHANNEL_ID = process.env.INTRO_CHANNEL_ID;
const MEMBER_ROLE_ID = process.env.MEMBER_ROLE_ID;

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // only run in #introductions
  if (message.channel.id !== INTRO_CHANNEL_ID) return;

  try {
    const member = await message.guild.members.fetch(message.author.id);

    // if they already have the role, do nothing
    if (member.roles.cache.has(MEMBER_ROLE_ID)) return;

    await member.roles.add(MEMBER_ROLE_ID);

    console.log(`Gave member role to ${message.author.tag}`);
  } catch (err) {
    console.error("Error assigning role:", err);
  }
});

client.login(process.env.TOKEN);
