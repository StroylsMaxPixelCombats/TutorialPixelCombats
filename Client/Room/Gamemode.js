// Импорты:
 import { DisplayValueHeader, Color } from 'pixel_combats/basic';.
 import { Inventory, Players, LeaderBoard, Properties, Spawns, Game, GameMode, Ui, Teams, AreaPlayerTriggerService, AreaViewService, BuildBlocksSet, BreackGraph, Timers, Damage } from 'pixel_combats/room';

// Разрешения:
 BreackGraph.OnlyPlayerBlocksDmg = true;
 Damage.GetContext().FriendlyFire.Value = false;
 Damage.GetContext().DamageOut.Value = false;
 BreackGraph.PlayerBlockBoost.Value = true;

// Константы, таймера:
 const CONETS_Time = 11;
 const GAME_Time = 221;

// Константы, имён:
 const EndAreasPoints = 1000;
 const MAXSPAWNS_ByArea = 25;
 const CONETS_StateValue = 'CONETS';
 const GAME_StateValue = 'GAME';
 const ENd_AreaTag = 'TutorialParcourTag';
 const SPAWNS_AreasTag = 'TutorialSpawn';
 const CURSPAWN_PropName = 'TutorialSlCurSpawn';
 const VIEWEND_ParameterNAME = 'TutorialViewEnd';
 const LEADERBOARD_Prop = 'TutorialLeader';

// Постоянные, переменные:
 let STATE_Prop = Properties.GetContext().Get('State');
 let MAIN_Timer = Timers.GetContext().Get('Main');
 let CONTEXT_Inventory = Inventory.GetContext();
 let SPAWNS_Areas = AreaService.GetByTag('SpawnsAreasTag');
 let END_Areas = AreaService.GetByTag('EndAreaTag');
 let END_Color = new Color(0, 0, 1, 0);
 let SPAWNS_Color = new Color(1, 1, 1, 0);
 let SLEGUY_SaZonayColor = new Color(1, 1, 0, 0);

// Параметры, создания - игрового режима:
 Properties.GetContext().GameModeName.Value = 'GameModes/TutorialParcour';
 Spawns.GetContext().RespawnTime.Value = 0;
if (GameMode.Parameters.GetBool('BlockPlayer')) {
 CONTEXT_Inventory.Build.Value = true;
}

// Контекст - инвентаря, игрока:
 CONTEXT_Inventory.Main.Value = false;
 CONTEXT_Inventory.Secondary.Value = false;
 CONTEXT_Inventory.Melee.Value = false;
 CONTEXT_Inventory.Explosive.Value = false;
 CONTEXT_Inventory.Build.Value = false;

// Создаём, команду:
 const BlueTeam = CreateNewTeam('Blue', '<b>ИГРОКИ</b>', new Color(0, 0, 1, 0));
 BlueTeam.Build.BlocksSet.Value = BuildBlocksSet.Blue;

// Вывод, подсказки - игроку:
 BlueTeam.Ui.Hint.Value = '!Зайди, на жёлтую - зону!';

// Н











