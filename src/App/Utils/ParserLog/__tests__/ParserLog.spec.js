import fs from 'fs';
import util from 'util';
import ParserLog from '../index';

describe('Unit Test of ParserLog', () => {
  let file = '';
  beforeAll(async () => {
    const read = util.promisify(fs.readFile);
    file = await read('src/games.log', 'utf8');
  });
  it('chek if set file', async () => {
    const Parser = new ParserLog(file);
    expect(Parser.file).toBe(file);
  });
  it('chek if separate by round', async () => {
    const Parser = new ParserLog(file);
    const ByRound = Parser.separateByRound();
    expect(ByRound.length).toBeGreaterThan(1);
    expect(ByRound[0]).toHaveProperty('round');
    expect(ByRound[0]).toHaveProperty('kills');
    expect(ByRound[0]).toHaveProperty('total_kills');
    expect(ByRound[0]).toHaveProperty('players');
  });
  it('chek if get Players', async () => {
    const data = [
      '\\sv_floodProtect\\1\\sv_maxPing\\0\\sv_minPing\\0\\sv_maxRate\\10000\\sv_minRate\\0\\sv_hostname\\Code Miner Server\\g_gametype\\0\\sv_privateClients\\2\\sv_maxclients\\16\\sv_allowDownload\\0\\bot_minplayers\\0\\dmflags\\0\\fraglimit\\20\\timelimit\\15\\g_maxGameClients\\0\\capturelimit\\8\\version\\ioq3 1.36 linux-x86_64 Apr 12 2009\\protocol\\68\\mapname\\q3dm17\\gamename\\baseq3\\g_needpass\\0',
      '20:38 ClientConnect: 2',
      '20:38 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\uriel/zael\\hmodel\\uriel/zael\\g_redteam\\\\g_blueteam\\\\c1\\5\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0',
      '20:38 ClientBegin: 2',
      '20:40 Item: 2 weapon_rocketlauncher',
      '20:40 Item: 2 ammo_rockets',
      '20:42 Item: 2 item_armor_body',
      '20:54 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT',
      '20:59 Item: 2 weapon_rocketlauncher',
      '21:04 Item: 2 ammo_shells',
      '21:07 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT',
      '21:10 ClientDisconnect: 2',
      '21:15 ClientConnect: 2',
      '21:15 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\uriel/zael\\hmodel\\uriel/zael\\g_redteam\\\\g_blueteam\\\\c1\\5\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0',
      '21:17 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\uriel/zael\\hmodel\\uriel/zael\\g_redteam\\\\g_blueteam\\\\c1\\5\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0',
      '21:17 ClientBegin: 2',
      '21:18 Item: 2 weapon_rocketlauncher',
      '21:21 Item: 2 item_armor_body',
      '21:32 Item: 2 item_health_large',
      '21:33 Item: 2 weapon_rocketlauncher',
      '21:34 Item: 2 ammo_rockets',
      '21:42 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT',
      '21:49 Item: 2 weapon_rocketlauncher',
      '21:51 ClientConnect: 3',
      '21:51 ClientUserinfoChanged: 3 n\\Dono da Bola\\t\\0\\model\\sarge/krusade\\hmodel\\sarge/krusade\\g_redteam\\\\g_blueteam\\\\c1\\5\\c2\\5\\hc\\95\\w\\0\\l\\0\\tt\\0\\tl\\0',
      '21:53 ClientUserinfoChanged: 3 n\\Mocinha\\t\\0\\model\\sarge\\hmodel\\sarge\\g_redteam\\\\g_blueteam\\\\c1\\4\\c2\\5\\hc\\95\\w\\0\\l\\0\\tt\\0\\tl\\0',
      '21:53 ClientBegin: 3',
      '22:04 Item: 2 weapon_rocketlauncher',
      '22:04 Item: 2 ammo_rockets',
      '22:06 Kill: 2 3 7: Isgalamido killed Mocinha by MOD_ROCKET_SPLASH',
      '22:11 Item: 2 item_quad',
      '22:11 ClientDisconnect: 3',
      '22:18 Kill: 2 2 7: Isgalamido killed Isgalamido by MOD_ROCKET_SPLASH',
      '22:26 Item: 2 weapon_rocketlauncher',
      '22:27 Item: 2 ammo_rockets',
      '22:40 Kill: 2 2 7: Isgalamido killed Isgalamido by MOD_ROCKET_SPLASH',
      '22:43 Item: 2 weapon_rocketlauncher',
      '22:45 Item: 2 item_armor_body',
      '23:06 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT',
      '23:09 Item: 2 weapon_rocketlauncher',
      '23:10 Item: 2 ammo_rockets',
      '23:25 Item: 2 item_health_large',
      '23:30 Item: 2 item_health_large',
      '23:32 Item: 2 weapon_rocketlauncher',
      '23:35 Item: 2 item_armor_body',
      '23:36 Item: 2 ammo_rockets',
      '23:37 Item: 2 weapon_rocketlauncher',
      '23:40 Item: 2 item_armor_shard',
      '23:40 Item: 2 item_armor_shard',
      '23:40 Item: 2 item_armor_shard',
      '23:40 Item: 2 item_armor_combat',
      '23:43 Item: 2 weapon_rocketlauncher',
      '23:57 Item: 2 weapon_shotgun',
      '23:58 Item: 2 ammo_shells',
      '24:13 Item: 2 item_armor_shard',
      '24:13 Item: 2 item_armor_shard',
      '24:13 Item: 2 item_armor_shard',
      '24:13 Item: 2 item_armor_combat',
      '24:16 Item: 2 item_health_large',
      '24:18 Item: 2 ammo_rockets',
      '24:19 Item: 2 weapon_rocketlauncher',
      '24:22 Item: 2 item_armor_body',
      '24:24 Item: 2 ammo_rockets',
      '24:24 Item: 2 weapon_rocketlauncher',
      '24:36 Item: 2 item_health_large',
      '24:43 Item: 2 item_health_mega',
      '25:05 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT',
      '25:09 Item: 2 weapon_rocketlauncher',
      '25:09 Item: 2 ammo_rockets',
      '25:11 Item: 2 item_armor_body',
      '25:18 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT',
      '25:21 Item: 2 weapon_rocketlauncher',
      '25:22 Item: 2 ammo_rockets',
      '25:34 Item: 2 weapon_rocketlauncher',
      '25:41 Kill: 1022 2 19: <world> killed Isgalamido by MOD_FALLING',
      '25:50 Item: 2 item_armor_combat',
      '25:52 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT',
      '25:54 Item: 2 ammo_rockets',
      '25:55 Item: 2 weapon_rocketlauncher',
      '25:55 Item: 2 weapon_rocketlauncher',
      '25:59 Item: 2 item_armor_shard',
      '25:59 Item: 2 item_armor_shard',
      '26:05 Item: 2 item_armor_shard',
      '26:05 Item: 2 item_armor_shard',
      '26:05 Item: 2 item_armor_shard',
      '26:09 Item: 2 weapon_rocketlauncher',
      '26  0:00',
    ];
    const Parser = new ParserLog(file);
    const Players = Parser.findPlayers(data);
    expect(Players).toHaveLength(3);
    expect(Players[0]).toBe('Isgalamido');
    expect(Players[1]).toBe('Dono da Bola');
    expect(Players[2]).toBe('Mocinha');
  });
  it('get line has kill', () => {
    const data = [
      '\\sv_floodProtect\\1\\sv_maxPing\\0\\sv_minPing\\0\\sv_maxRate\\10000\\sv_minRate\\0\\sv_hostname\\Code Miner Server\\g_gametype\\0\\sv_privateClients\\2\\sv_maxclients\\16\\sv_allowDownload\\0\\bot_minplayers\\0\\dmflags\\0\\fraglimit\\20\\timelimit\\15\\g_maxGameClients\\0\\capturelimit\\8\\version\\ioq3 1.36 linux-x86_64 Apr 12 2009\\protocol\\68\\mapname\\q3dm17\\gamename\\baseq3\\g_needpass\\0',
      '20:38 ClientConnect: 2',
      '20:38 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\uriel/zael\\hmodel\\uriel/zael\\g_redteam\\\\g_blueteam\\\\c1\\5\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0',
      '20:38 ClientBegin: 2',
      '20:40 Item: 2 weapon_rocketlauncher',
      '20:40 Item: 2 ammo_rockets',
      '20:42 Item: 2 item_armor_body',
      '20:54 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT',
      '20:59 Item: 2 weapon_rocketlauncher',
      '21:04 Item: 2 ammo_shells',
      '21:07 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT',
      '21:10 ClientDisconnect: 2',
      '21:15 ClientConnect: 2',
      '21:15 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\uriel/zael\\hmodel\\uriel/zael\\g_redteam\\\\g_blueteam\\\\c1\\5\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0',
      '21:17 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\uriel/zael\\hmodel\\uriel/zael\\g_redteam\\\\g_blueteam\\\\c1\\5\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0',
      '21:17 ClientBegin: 2',
      '21:18 Item: 2 weapon_rocketlauncher',
      '21:21 Item: 2 item_armor_body',
      '21:32 Item: 2 item_health_large',
      '21:33 Item: 2 weapon_rocketlauncher',
      '21:34 Item: 2 ammo_rockets',
      '21:42 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT',
      '21:49 Item: 2 weapon_rocketlauncher',
      '21:51 ClientConnect: 3',
      '21:51 ClientUserinfoChanged: 3 n\\Dono da Bola\\t\\0\\model\\sarge/krusade\\hmodel\\sarge/krusade\\g_redteam\\\\g_blueteam\\\\c1\\5\\c2\\5\\hc\\95\\w\\0\\l\\0\\tt\\0\\tl\\0',
      '21:53 ClientUserinfoChanged: 3 n\\Mocinha\\t\\0\\model\\sarge\\hmodel\\sarge\\g_redteam\\\\g_blueteam\\\\c1\\4\\c2\\5\\hc\\95\\w\\0\\l\\0\\tt\\0\\tl\\0',
      '21:53 ClientBegin: 3',
      '22:04 Item: 2 weapon_rocketlauncher',
      '22:04 Item: 2 ammo_rockets',
      '22:06 Kill: 2 3 7: Isgalamido killed Mocinha by MOD_ROCKET_SPLASH',
      '22:11 Item: 2 item_quad',
      '22:11 ClientDisconnect: 3',
      '22:18 Kill: 2 2 7: Isgalamido killed Isgalamido by MOD_ROCKET_SPLASH',
      '22:26 Item: 2 weapon_rocketlauncher',
      '22:27 Item: 2 ammo_rockets',
      '22:40 Kill: 2 2 7: Isgalamido killed Isgalamido by MOD_ROCKET_SPLASH',
      '22:43 Item: 2 weapon_rocketlauncher',
      '22:45 Item: 2 item_armor_body',
      '23:06 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT',
      '23:09 Item: 2 weapon_rocketlauncher',
      '23:10 Item: 2 ammo_rockets',
      '23:25 Item: 2 item_health_large',
      '23:30 Item: 2 item_health_large',
      '23:32 Item: 2 weapon_rocketlauncher',
      '23:35 Item: 2 item_armor_body',
      '23:36 Item: 2 ammo_rockets',
      '23:37 Item: 2 weapon_rocketlauncher',
      '23:40 Item: 2 item_armor_shard',
      '23:40 Item: 2 item_armor_shard',
      '23:40 Item: 2 item_armor_shard',
      '23:40 Item: 2 item_armor_combat',
      '23:43 Item: 2 weapon_rocketlauncher',
      '23:57 Item: 2 weapon_shotgun',
      '23:58 Item: 2 ammo_shells',
      '24:13 Item: 2 item_armor_shard',
      '24:13 Item: 2 item_armor_shard',
      '24:13 Item: 2 item_armor_shard',
      '24:13 Item: 2 item_armor_combat',
      '24:16 Item: 2 item_health_large',
      '24:18 Item: 2 ammo_rockets',
      '24:19 Item: 2 weapon_rocketlauncher',
      '24:22 Item: 2 item_armor_body',
      '24:24 Item: 2 ammo_rockets',
      '24:24 Item: 2 weapon_rocketlauncher',
      '24:36 Item: 2 item_health_large',
      '24:43 Item: 2 item_health_mega',
      '25:05 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT',
      '25:09 Item: 2 weapon_rocketlauncher',
      '25:09 Item: 2 ammo_rockets',
      '25:11 Item: 2 item_armor_body',
      '25:18 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT',
      '25:21 Item: 2 weapon_rocketlauncher',
      '25:22 Item: 2 ammo_rockets',
      '25:34 Item: 2 weapon_rocketlauncher',
      '25:41 Kill: 1022 2 19: <world> killed Isgalamido by MOD_FALLING',
      '25:50 Item: 2 item_armor_combat',
      '25:52 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT',
      '25:54 Item: 2 ammo_rockets',
      '25:55 Item: 2 weapon_rocketlauncher',
      '25:55 Item: 2 weapon_rocketlauncher',
      '25:59 Item: 2 item_armor_shard',
      '25:59 Item: 2 item_armor_shard',
      '26:05 Item: 2 item_armor_shard',
      '26:05 Item: 2 item_armor_shard',
      '26:05 Item: 2 item_armor_shard',
      '26:09 Item: 2 weapon_rocketlauncher',
      '26  0:00',
    ];
    const Parser = new ParserLog(file);
    const Kills = Parser.findLineHasKill(data);
    expect(Kills).toHaveLength(11);
  });
  it('counts Die', () => {
    const data = [
      '1:08 Kill: 3 2 6: Isgalamido killed Mocinha by MOD_ROCKET',
      '1:26 Kill: 1022 4 22: <world> killed Zeh by MOD_TRIGGER_HURT',
      '1:32 Kill: 1022 4 22: <world> killed Zeh by MOD_TRIGGER_HURT',
      '1:41 Kill: 1022 2 19: <world> killed Dono da Bola by MOD_FALLING',
    ];
    const Parser = new ParserLog(file);
    const total = Parser.countDie('Zeh', data);
    expect(total).toEqual(2);
  });
  it('count kills', () => {
    const data = [
      '1:08 Kill: 3 2 6: Isgalamido killed Mocinha by MOD_ROCKET',
      '1:26 Kill: 1022 4 22: <world> killed Zeh by MOD_TRIGGER_HURT',
      '1:32 Kill: 1022 4 22: <world> killed Zeh by MOD_TRIGGER_HURT',
      '1:41 Kill: 1022 2 19: <world> killed Dono da Bola by MOD_FALLING',
    ];
    const Parser = new ParserLog(file);
    const total = Parser.killsBy('Isgalamido', data);
    expect(total).toEqual(1);
  });
  it('make kills', () => {
    const data = [
      '1:08 Kill: 3 2 6: Isgalamido killed Mocinha by MOD_ROCKET',
      '1:26 Kill: 1022 4 22: <world> killed Zeh by MOD_TRIGGER_HURT',
      '1:32 Kill: 1022 4 22: <world> killed Zeh by MOD_TRIGGER_HURT',
      '1:41 Kill: 1022 2 19: <world> killed Dono da Bola by MOD_FALLING',
    ];
    const players = ['Dono da Bola', 'Mocinha', 'Isgalamido', 'Zeh'];
    const Parser = new ParserLog(file);
    const Kills = Parser.makeKills(data, players);
    expect(Kills).toHaveProperty('total_kills', 4);
    expect(Kills.kills).toEqual({
      'Dono da Bola': -1,
      Mocinha: 0,
      Isgalamido: 1,
      Zeh: -2,
    });
  });
});
