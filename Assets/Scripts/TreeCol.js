var health 	: int = 100;

private var dead 			: boolean;
private var playerStatus 	: PlayerStatus;

function Start(){
	dead = false;
	playerStatus = GameObject.FindGameObjectWithTag("Player").GetComponent(PlayerStatus);
}

function Update()
{
	if (dead)
	{
		playerStatus.AddTree();
		Destroy(gameObject);
	}	
	if (health <= 75){
	}
	if (health <= 50){
	}
	if (health <= 25){
	}	
	if (health <= 0){
		dead = true;
	}
}

function Damage(dmg : int)
{
	if(health > 0)
	{
		health = health - dmg;
	}
}