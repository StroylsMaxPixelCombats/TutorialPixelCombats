import * as Basic from 'pixel_combats/basic';
import * as Room from 'pixel_combats/room';

// Константы:
const WaitingModeSeconts = 10;
const BuildModeSeconds = 31;
const GameModeSeconds = 120;
const EndGameSeconds = 5;
const EndOfMatchTime = 10;
const MaxScores = 6;

// Константы, имён:
const WaitingStateValue = 'Waiting';
const BuildModeStateValue = 'BuildMode';
const GameStateValue = 'Game';
const EndOfGameStateValue = 'EndOfGame';
const EndOfMatchStateValue = 'EndOfMatch';
const ScoresProp = 'Scores';

// Почтоянные - переменные:
let MaininTimer = Room.Timers.GetContext().Get('Main');
let StateProp = Room.Properties.GetContext().Get('State');
let WinTeamIdProp = Room.Properties.GetContext().Get('WinTeam');

// Параметры, создания - комнаты:
Room.Damage.GetContext().FriendlyFire.Value = Room.GameMode.Parameters.GetBool("FriendlyFire");
Room.Map.Rotation = Room.GameMode.Parameters.GetBool("MapRotation");
Room.BreackGraph.OnlyPlayerBlocksDmg = Room.GameMode.Parameters.GetBool("PartialDesruction");
Room.BreackGraph.WeakBlocks = Room.GameMode.Parameters.GetBool("LoosenBlocks");

// Блок игрока, всегда - усилен:
Room.BreackGraph.PlayerBlockBoost = true;

// Запрещаем, урон - от гранаты:
Room.Damage.GetContext().GranadeTouchExplosion.Value = false;

// Параметры, игры:
Room.Properties.GetContext().GameModeName.Value = "GameModes/Team Dead Match";
Room.TeamsBalancer.IsAutoBalance = true;  // Авто-баланс, команд всегда - истинный.
Room.Ui.GetContext().MainTimerId.Value = MainTimer.Id;
// Создаём, команды:
Room.Teams.Add("Blue", "<b><size=30><color=#0d177c>ß</color><color=#03088c>l</color><color=#0607b0>ᴜ</color><color=#1621ae>E</color></size></b>", new Basic.Color(0, 0, 1, 0));
Room.Teams.Add("Red", "<b><size=30><color=#962605>尺</color><color=#9a040c>ᴇ</color><color=#b8110b>D</color></size></b>", new Basic.Color(1, 0, 0, 0));
Room.Teams.Get("Blue").Spawns.SpawnPointsGroups.Add(1);
Room.Teams.Get("Red").Spawns.SpawnPointsGroups.Add(2);
Room.Teams.Get("Red").Build.BlocksSet.Value = Room.BuildBlocksSet.Red;
Room.Teams.Get("Blue").Build.BlocksSet.Value = Room.BuildBlocksSet.Blue;

// ЛидерБорды:
Room.LeaderBoard.PlayerLeaderBoardValues = [
	{
		Value: "Kills",
		DisplayName: "<b><size=30><color=#be5f1b>K</color><color=#b65219>i</color><color=#ae4517>l</color><color=#a63815>l</color><color=#9e2b13>s</color></size></b>",
		ShortDisplayName: "<b><size=30><color=#be5f1b>K</color><color=#b65219>i</color><color=#ae4517>l</color><color=#a63815>l</color><color=#9e2b13>s</color></size></b>"
	},
	{
		Value: "Deaths",
		DisplayName: "<b><size=30><color=#be5f1b>D</color><color=#b85519>e</color><color=#b24b17>a</color><color=#ac4115>t</color><color=#a63713>h</color><color=#a02d11>s</color></size></b>",
		ShortDisplayName: "<b><size=30><color=#be5f1b>D</color><color=#b85519>e</color><color=#b24b17>a</color><color=#ac4115>t</color><color=#a63713>h</color><color=#a02d11>s</color></size></b>"
	},
	{
		Value: "Spawns",
		DisplayName: "<b><size=30><color=#be5f1b>S</color><color=#b85519>p</color><color=#b24b17>a</color><color=#ac4115>w</color><color=#a63713>n</color><color=#a02d11>s</color></size></b>",
		ShortDisplayName: "<b><size=30><color=#be5f1b>S</color><color=#b85519>p</color><color=#b24b17>a</color><color=#ac4115>w</color><color=#a63713>n</color><color=#a02d11>s</color></size></b>"
	},
	{
		Value: "Scores",
		DisplayName: "<b><size=30><color=#be5f1b>S</color><color=#b85519>c</color><color=#b24b17>o</color><color=#ac4115>r</color><color=#a63713>e</color><color=#a02d11>s</color></size></b>",
		ShortDisplayName: "<b><size=30><color=#be5f1b>S</color><color=#b85519>c</color><color=#b24b17>o</color><color=#ac4115>r</color><color=#a63713>e</color><color=#a02d11>s</color></size></b>"
	}
];
Room.LeaderBoard.TeamLeaderBoardValue = {
	Value: "Deaths",
	DisplayName: "Statistics\Deaths",
	ShortDisplayName: "Statistics\Deaths"
};
// Вес, команды/очков - в лидерБорде:
Room.LeaderBoard.TeamWeightGetter.Set(function(Team) {
var Prop = Team.Properties.Get('ScoresProp');
  if (Prop.Value == null) return 0;
	return Prop.Value;
});
// Вес, игрока/очков - в лидерБорде:
Room.LeaderBoard.PlayersWeightGetter.Set(function(Player) {
var Orop = Player.Properties.Get('Scores');
  if (Prop.Value == null) return 0;
	return Prop.Value;
});

// Задаём, что выводить - в табе:
Room.Ui.GetContext().TeamProp1.Value = { Team: 'Blue', Prop: 'ScoresProp' };
Room.Ui.GetContext().TeamProp2.Value = { Team: 'Red', Prop: 'ScoresProp' };

// Задаём, всем игрокам - 0 очков:
for (Err = Room.Teams.All.forEach(Err => { 
	Room.Err.Properties.Get('ScoresProp').Value = 0;                                 
});

// Вход, в команды - по запросу:
Room.Teams.OnRequestJoinTeam.Add(function(Player, Team){Team.Add(Player);});
// Спавн, по входу в команду - по запросу: 
Room.Teams.OnPlayerChangeTeam.Add(function(Player) {Player.Spawns.Spawn(); });
 if (StateProp.Value === 'GameStateValue') { return;
}

// Счётчик, смертей:
Damage.OnDeath.Add(function(Player) {
	++Player.Properties.Deaths.Value;
});
// Счётчик, киллов: 
Room.Damage.OnKill.Add(function(Player, Killed) {
 if (Killed.Team != null && Killed.Team != Player.Team) {
		++Player.Properties.Kills.Value;
		Player.Properties.Scores.Value += 100;
	}
});

// 
function GetWinTeam(){
	winTeam = null;
	wins = 0;
	noAlife = true;
	for (e = Teams.GetEnumerator(); e.MoveNext();) {
		if (e.Current.GetAlivePlayersCount() > 0) {
			++wins;
			winTeam = e.Current;
		}
	}
	if (wins === 1) return winTeam;
	else return null;
}
function TrySwitchGameState() // ������� ������������ �� ����������
{
	if (stateProp.value !== GameStateValue) 
		return;

	// ������ ������
	winTeam = null;
	wins = 0;
	alifeCount = 0;
	hasEmptyTeam = false;
	for (e = Teams.GetEnumerator(); e.MoveNext();) {
		var alife = e.Current.GetAlivePlayersCount();
		alifeCount += alife;
		if (alife > 0) {
			++wins;
			winTeam = e.Current;
		}
		if (e.Current.Count == 0) hasEmptyTeam = true;
	}

	// ���� ���������� �������
	if (!hasEmptyTeam && alifeCount > 0 && wins === 1) {
		log.debug("hasEmptyTeam=" + hasEmptyTeam);
		log.debug("alifeCount=" + alifeCount);
		log.debug("wins=" + wins);
		winTeamIdProp.Value = winTeam.Id;
		StartEndOfGame(winTeam);
		return;
	}

	// ���������� ��� � ����� �� �������� - �����
	if (alifeCount == 0) {
		log.debug("���������� ��� � ����� �� �������� - �����");
		winTeamIdProp.Value = null;
		StartEndOfGame(null);
	}

	// ���������� ��� � �������� ������ �������� - �����
	if (!mainTimer.IsStarted) {
		log.debug("���������� ��� � ������ �� ������� - �����");
		winTeamIdProp.Value = null;
		StartEndOfGame(null);
	}
}
function OnGameStateTimer() // �������� �������� �����
{
	TrySwitchGameState();
}
Damage.OnDeath.Add(TrySwitchGameState);
Players.OnPlayerDisconnected.Add(TrySwitchGameState);

// ��������� ������������ �������
mainTimer.OnTimer.Add(function() {
	switch (stateProp.value) {
	case WaitingStateValue:
		SetBuildMode();
		break;
	case BuildModeStateValue:
		SetGameMode();
		break;
	case GameStateValue:
		OnGameStateTimer();
		break;
	case EndOfGameStateValue:
		EndEndOfGame();
		break;
	case EndOfMatchStateValue:
		RestartGame();
		break;
	}
});

// ������ ������ ������� ���������
SetWaitingMode();

// ��������� ����
function SetWaitingMode() { // ��������� �������� ������ �������
	stateProp.value = WaitingStateValue;
	Ui.GetContext().Hint.Value = "Hint/WaitingPlayers";
	Spawns.GetContext().enable = false;
	TeamsBalancer.IsAutoBalance = true;
	mainTimer.Restart(WaitingModeSeconts);
}

function SetBuildMode() 
{
	stateProp.value = BuildModeStateValue;
	Ui.GetContext().Hint.Value = "Hint/BuildBase";

	var inventory = Inventory.GetContext();
	inventory.Main.Value = false;
	inventory.Secondary.Value = false;
	inventory.Melee.Value = true;
	inventory.Explosive.Value = false;
	inventory.Build.Value = true;

	mainTimer.Restart(BuildModeSeconds);
	Spawns.GetContext().enable = true;
	TeamsBalancer.IsAutoBalance = true; // ��� ���������� �� ������ �����
	SpawnTeams();
}
function SetGameMode() 
{
	stateProp.value = GameStateValue;
	Ui.GetContext().Hint.Value = "Hint/AttackEnemies";
	winTeamIdProp.Value = null; // ����� �� �������

	var inventory = Inventory.GetContext();
	if (GameMode.Parameters.GetBool("OnlyKnives")) {
		inventory.Main.Value = false;
		inventory.Secondary.Value = false;
		inventory.Melee.Value = true;
		inventory.Explosive.Value = false;
		inventory.Build.Value = true;
	} else {
		inventory.Main.Value = true;
		inventory.Secondary.Value = true;
		inventory.Melee.Value = true;
		inventory.Explosive.Value = true;
		inventory.Build.Value = true;
	}

	mainTimer.Restart(GameModeSeconds);
	Spawns.GetContext().Despawn();
	Spawns.GetContext().RespawnEnable = false;
	TeamsBalancer.IsAutoBalance = false;
	TeamsBalancer.BalanceTeams();
	SpawnTeams();
}

function StartEndOfGame(team) { // team=null �� �����
	log.debug("win team="+team);
	stateProp.value = EndOfGameStateValue;
	if (team !== null) {
		log.debug(1);
		Ui.GetContext().Hint.Value = team + " wins!";
		 var prop = team.Properties.Get(scoresProp);
		 if (prop.Value == null) prop.Value = 1;
		 else prop.Value = prop.Value + 1;
	}
	else Ui.GetContext().Hint.Value = "Hint/Draw";

	mainTimer.Restart(EndGameSeconds);
}
function EndEndOfGame(){// ����� ����� �����
	if (winTeamIdProp.Value !== null) {
		var team = Teams.Get(winTeamIdProp.Value);
		var prop = team.Properties.Get(scoresProp);
		if (prop.Value >= MaxScores) SetEndOfMatchMode();
		else SetGameMode();
	}
	else SetGameMode();
}

function SetEndOfMatchMode() {
	stateProp.value = EndOfMatchStateValue;
	Ui.GetContext().Hint.Value = "Hint/EndOfMatch";

	var context = Spawns.GetContext();
	context.enable = false;
	context.Despawn();
	Game.GameOver(LeaderBoard.GetTeams());
	mainTimer.Restart(EndOfMatchTime);
}
function RestartGame() {
	Game.RestartGame();
}

function SpawnTeams() {
	var e = Teams.GetEnumerator();
	while (e.moveNext()) {
		Spawns.GetContext(e.Current).Spawn();
	}
}
