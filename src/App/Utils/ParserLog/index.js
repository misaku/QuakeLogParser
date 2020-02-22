class Index {
  constructor(file) {
    this.file = file;
    const round = this.separateByRound();

  }

  separateByRound() {
    let lines = this.file.split('------------------------------------------------------------\n');
    lines = lines.filter(line => line.length > 7);
    lines = lines.map(line => line.trim());
    lines = lines.map((line, game) => {
      let data = line.split('InitGame:');
      data = data[1].trim().split('\n').map(ln => ln.trim());
      const players = this.findPlayers(data);
      const kills = {}
      players.forEach(name=>{
        kills[name]=0;
      })
      data = this.findLineHasKill(data);
      return { round: ++game, players, kills, data };
    });
    return lines;
  }
  findPlayers(data){
    const hasPlayer = line => /n\\.+\\t\\/.test(line);
    const playersData = data.filter(hasPlayer);
    let players = [];
    playersData.forEach(line=>{
      const player = line.split('n\\')[1].trim().split('\\t')[0].trim();
      if(!players.includes(player))
        players = [...players, player];
    });

    return players;
  }
  findLineHasKill(data){
    const hasKill = line => /Kill:/.test(line);
    const killsData = data.filter(hasKill);
    return killsData;
  }
}

export default Index;
