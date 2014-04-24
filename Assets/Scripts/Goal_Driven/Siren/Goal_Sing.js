#pragma strict

public class Goal_Sing extends Goal_Composite
{
	var siren			: GameObject;
	var sirenAI			: SirenAI;
	var player			: GameObject;
	var playerControl	: PlayerControl;
	
	public function Goal_Sing(siren : GameObject, player : GameObject)
	{
		this.siren = siren;
		sirenAI = siren.GetComponent(SirenAI);
		this.player = player;
		playerControl = player.GetComponent(PlayerControl);
	}
	
	public function Activate()
	{
		RemoveAllSubgoals();
		
		AddSubgoal(new Goal_TakeFlight(siren, siren.transform.position.y));
		
		AddSubgoal(new Goal_Drain(siren,player));
		
		AddSubgoal(new Goal_Attract(siren, player));
		
		AddSubgoal(new Goal_Land(siren));
		
		status = Status.active;
	}
	
	public function Process() : Status
	{
		ActivateIfInactive();
		
		status = ProcessSubgoals();
		
		return status;
	}	
}