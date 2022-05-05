const Discord = require("discord.js");

module.exports = client => {
  client.user.setStatus("online");
  client.user.setPresence({ activity: { name: "Senorita is here?" }, status: "dnd" });

  //Botun Durumu
  //online=Çevrimiçi
  //idle=Boşta
  //dnd=Rahatsız Etmeyin
  //invisible=Görünmez
};
