const Discord = require("discord.js");
const db = require("megadb");
const blockdb = new db.crearDB("blocks");
module.exports = async (client, message) => {
  if (message.author.bot) return;
  let prefix = client.config.prefix;
  if (message.channel.type === "dm") {
    if (blockdb.has(message.author.id)) return;
    let guild = client.guilds.get(client.config.guild);
    let rolsoporte = guild.roles.get(client.config.role);
    let roleveryone = guild.roles.find(r => r.name === "@everyone");
    let canal = guild.channels.find(
      ch =>
        ch.name ===
        `${message.author.username.toLowerCase().replace(/\W/ig, "")}-${
          message.author.discriminator
        }`
    );
    if (canal) {
      var Attachment = message.attachments.array();
      let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setDescription(message.content)
        .setTimestamp(message.createdAt)
        .setColor("GREEN");
      if (Attachment[0]) embed.setImage(Attachment[0].url);
      canal.send(embed).then(() => {
        message.react("✅");
      });
    } else {
      guild
        .createChannel(
          `${message.author.username.replace(/\W/ig,"")}-${message.author.discriminator}`,
          { parent: client.config.parent, type: "text" }
        )
        .then(channel => {
          channel.setTopic(message.author.id);
          channel.overwritePermissions(roleveryone, {
            READ_MESSAGES: false,
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
          channel.overwritePermissions(rolsoporte, {
            READ_MESSAGES: true,
            SEND_MESSAGES: true,
            ADD_REACTIONS: true
          });
          var Attachment = message.attachments.array();
          let embed = new Discord.RichEmbed()
            .setTitle("Ticket Creado")
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setDescription(message.content)
            .setTimestamp(message.createdAt)
            .setColor("#ffeb00");
          if (Attachment[0]) embed.setImage(Attachment[0].url);
          channel.send(`<@&${client.config.role}>`, embed).then(() => {
            let autembed = new Discord.RichEmbed()
              .setTitle("¡Recibido!")
              .setDescription(
                "El staff contactará contingo lo antes posible, sé paciente. Puedes añadir imágenes (de una en una) si necesitas enviar pruebas sobre algo."
              )
              .setTimestamp(message.createdAt)
              .setColor("BLUE");
            message.author.send(autembed);
          });
        });
    }
  } else {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    let rol = message.guild.roles.get(client.config.role);
    if (!message.member.roles.has(rol.id)) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (commandName === "help") {
      let comandos = client.commands.map(c => c.name + ": " + c.description);
      let embed = new Discord.RichEmbed()
        .setTitle("Lista de comandos")
        .setColor("RANDOM")
        .setDescription(comandos.join("\n"));
      message.channel.send(embed);
    }
    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        cmd => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) return;
    try {
      command.execute(client, message, args);
    } catch (error) {
      console.log(error);
    }
  }
};
