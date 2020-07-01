const Discord = require('discord.js')
const db = require('megadb')
const blockdb = new db.crearDB('blocks')
module.exports = {
	name: 'unblock',
	description: 'Desbloquea a un usuario para que pueda volver a enviar mensajes al bot.',
	execute(client, message, args) {
    let user = client.users.get(args[0]) || client.users.get(message.channel.topic)
    blockdb.eliminar(user.id)
    message.channel.send(`El usuario ${user.tag} ha sido desbloqueado.`)
	}
};