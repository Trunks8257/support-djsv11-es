const Discord = require('discord.js')
module.exports = {
	name: 'reply',
	description: 'Responde al usuario que abrió el ticket del canal actual.',
	execute(client, message, args) {
    var Attachment = (message.attachments).array();
  let user = client.users.get(message.channel.topic)
  let uembed = new Discord.RichEmbed()
       .setAuthor(message.author.tag, message.author.displayAvatarURL)
       .setDescription(args.join(' '))
       .setTimestamp(message.createdAt)
       .setColor('GREEN')
       if(Attachment[0]) uembed.setImage(Attachment[0].url)
  user.send(uembed).then(() => {
    message.delete(3000)
       let embed = new Discord.RichEmbed()
       .setAuthor(message.author.tag, message.author.displayAvatarURL)
       .setDescription(args.join(' '))
       .setTimestamp(message.createdAt)
       .setColor('#e79a7c')
       if(Attachment[0]) embed.setImage(Attachment[0].url)
    message.channel.send(embed)
  }).catch((error) => {
         message.channel.send('No he podido decirlo al usuario que el ticket ha sido cerrado. Error => ' + error)
       })
	}
};