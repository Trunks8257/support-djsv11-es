const Discord = require('discord.js')
const db = require('megadb')
const blockdb = new db.crearDB('blocks')
module.exports = {
	name: 'block',
	description: 'Bloquea a un usuario para que no pueda enviar mensajes al bot.',
	execute(client, message, args) {
    let user = client.users.get(args[0]) || client.users.get(message.channel.topic)
    blockdb.set(user.id, true)
    message.channel.send(`El usuario ${user.tag} ha sido bloqueado.`)
	}
};