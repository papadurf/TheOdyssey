#pragma strict

public class Goal_Attract extends Goal
{
	var siren 			: GameObject;
	var sirenAI 		: SirenAI;
	var player			: GameObject;
	var playerControl	: PlayerControl;


	public function Goal_Attract(siren : GameObject, player : GameObject)
	{
		this.siren = siren;
		sirenAI = siren.GetComponent(SirenAI);
		this.player = player;
		playerControl = player.GetComponent(PlayerControl);
	}
	
	public function Activate()
	{
		playerControl.Pause();
		sirenAI.charming = true;
		if (player.transform.localScale.x / siren.transform.localScale.x > 0)
			playerControl.Flip();
		status = Status.active;
	}
	
	public function Process() : Status
	{
		ActivateIfInactive();
		
		if(sirenAI.isInfront(player) || !sirenAI.charming)
			Terminate();
		else
			player.transform.position = Vector3.MoveTowards(player.transform.position, siren.transform.position, sirenAI.attractSpeed * Time.deltaTime);
			
		return status;
	}
	
	public function Terminate()
	{
		playerControl.Unpause();
		status = Status.completed;
	}
}
