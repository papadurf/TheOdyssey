#pragma strict

var health : int = 100;
var trees : int = 0;

private var respawnPoint : Vector3;

function Start ()
{
    respawnPoint = transform.position;
}

function SetRespawn (newPoint: Vector2)
{
    respawnPoint = Vector3(newPoint.x, newPoint.y, 0);
}

function GetHealth()
{
	return health;
}

function GetTrees()
{
	return trees;
}

function AddTree()
{	
	trees = trees + 1;
}

function Damage(dmg : int)
{
	health = health - dmg;
}
