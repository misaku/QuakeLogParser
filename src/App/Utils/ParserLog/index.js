class Index {
  constructor(file) {
    this.file = file;
    this.output =  this.separateByRound().reduce((accum, { round, ...data }) => {
      accum[`game_${round}`] = data;
      return accum;
    }, {});
  }

  // METODO QUE MONTA ARRAY POR PARTIDA
  separateByRound() {
    let lines = this.file.split('------------------------------------------------------------\n');
    // REMOVENDO LINHAS DESNECESSÁRIAS
    lines = lines.filter(line => line.length > 7);
    lines = lines.map((line, game) => {
      let data = line
        .trim()
        .split('\n')
        .map(ln => ln.trim());
      const players = this.findPlayers(data);
      data = this.findLineHasKill(data);
      const { total_kills, kills } = this.makeKills(data, players);
      return { round: game + 1, total_kills, players, kills };
    });
    return lines;
  }

  // RETORNA PLAYER DO JOGO
  findPlayers(data) {
    const hasPlayer = line => /n\\.+\\t\\/.test(line);
    const playersData = data.filter(hasPlayer);
    let players = [];
    playersData.forEach(line => {
      const player = line
        .split('n\\')[1]
        .trim()
        .split('\\t')[0]
        .trim();
      if (!players.includes(player)) players = [...players, player];
    });

    return players;
  }

  // RENORTA ARRAY QUE TENHA KILLS
  findLineHasKill(data) {
    const hasKill = line => line.includes('Kill:');
    return data.filter(hasKill);
  }

  // CONTA QUANTAS VEZES A PESSOA MORREU
  countDie(person, data) {
    const hasWorld = line => line.includes('<world>') && line.includes(person);
    return data.filter(hasWorld).length;
  }

  // CONTA QUANTAS VEZES A PESSOA MATOU
  killsBy(person, data) {
    const hasWorld = line => !line.includes('<world>') && line.includes(person);
    const killsData = data.filter(line => {
      if (hasWorld(line)) {
        return line.split('killed')[0].includes(person);
      }
      return false;
    });

    return killsData.length;
  }

  // PREPARA OBJETO DE MORTES
  makeKills(data, players) {
    const kills = {};
    data = this.findLineHasKill(data);
    const total_kills = data.length;
    players.forEach(name => {
      kills[name] = this.killsBy(name, data) - this.countDie(name, data);
    });
    return {
      total_kills,
      kills,
    };
  }
}

export default Index;
