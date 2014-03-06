#pragma strict
@script ExecuteInEditMode()
var healthPos = Vector2(0,0);
var pointsPos = Vector2(0,0);
var guiSkin : GUISkin;
private var playerStatus : PlayerStatus;

function Update () { }

function Awake () {
	playerStatus = FindObjectOfType(PlayerStatus);
}

function OnGUI() {
	var points = playerStatus.GetTrees();
	var health = playerStatus.GetHealth();
	GUI.skin = guiSkin;
	GUI.Label(Rect(pointsPos.x,pointsPos.y,100,100),"Trees: " + points.ToString() );
	GUI.Label(Rect(healthPos.x,healthPos.y,100,100),"HP: " + health.ToString() );
}