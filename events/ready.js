module.exports = async (client) => {
  console.log(
    `el bot ha sido iniciado para ${client.guilds.size} servidores y ${client.users.size} usuarios`
  );
    let actividades = [
    ["mi MD", "WATCHING"],
    ["tus dudas y preguntas", "LISTENING"]
  ];

  let status = Math.floor(Math.random() * actividades.length);
  client.user.setPresence({
    status: "online",
    game: {
      name: actividades[status][0],
      type: actividades[status][1]
    }
  });
}
