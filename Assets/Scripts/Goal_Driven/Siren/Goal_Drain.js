#pragma strict

public class Goal_Drain extends Goal
{
	var siren			: GameObject;
	var sirenAI			: SirenAI;
	var player			: GameObject;
	var playerControl 	: PlayerControl;
	var playerStatus	: PlayerStatus;
	
	private var messageSent = false;
	
	public function Goal_Drain(siren : GameObject, player : GameObject)
	{
		this.siren = siren;
		sirenAI = siren.GetComponent(SirenAI);
		this.player = player;
		playerControl = player.GetComponent(PlayerControl);
		playerStatus = player.GetComponent(PlayerStatus);
	}
	
	public function Activate()
	{
		if (sirenAI.isInfront(player))
		{
			playerControl.Pause();	
			player.transform.parent = siren.transform;
			player.transform.localPosition = sirenAI.pickUp.localPosition;
			
			status = Status.active;
		}
		else
			status = Status.failed;
	}
	
	public function Process() : Status
	{
		ActivateIfInactive();
		
		if(!messageSent)
		{
			messageSent = true;
			sirenAI.Drain(player);
		}
		else if(playerStatus.dead || !sirenAI.draining)
			Terminate();
			
		return status;
	}
	
	public function Terminate()
	{
		player.transform.parent = null;
		playerControl.Unpause();
		status = Status.completed;
	}

}