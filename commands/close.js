const Discord = require('discord.js')
module.exports = {
	name: 'close',
	description: 'Cierra el ticket y borra el canal actual.',
	execute(client, message, args) {
   message.channel.setName(message.channel.name + '-archived').then(() => {
     let embed = new Discord.RichEmbed()
     .setTitle('Ticket Cerrado')
     .setDescription('El ticket ha sido cerrado y el canal será borrado en 30 segundos.')
     .setColor('RED')
     .setTimestamp(message.createdAt)
     message.channel.send(embed).then(() => {
       let uembed = new Discord.RichEmbed()
     .setTitle('Ticket Cerrado')
     .setDescription('El ticket ha sido cerrado, gracias por usar el sistema de soporte. No respondas si no necesitas nada más.')
     .setColor('RED')
     .setTimestamp(message.createdAt)
       client.users.get(message.channel.topic).send(uembed).catch((error) => {
         message.channel.send('No he podido decirlo al usuario que el ticket ha sido cerrado, aún así el canal será borrado en 30 segundos.')
       })
     })
     
     setTimeout(() => {
      message.channel.delete()
     }, 30000)
   })
    
	}
};