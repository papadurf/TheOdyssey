#pragma strict

public class Goal_MilkTheSheep extends Goal_Composite
{
	public var cyclops : GameObject;
	public var flock : GameObject;

	public function Goal_MilkTheSheep (cyc : GameObject, sheep : GameObject)
	{
		cyclops = cyc;
		flock = sheep;
	}

	public function Activate()
	{
		RemoveAllSubgoals();
		
		var sheep = GameObject.Find("sheep");
		var cyclopsController : CyclopsAI = cyclops.GetComponent("CyclopsAI");
		
		AddSubgoal(new Goal_MilkASheep(cyclops, sheep));
		
		AddSubgoal(new Goal_PickUpGameObject(sheep, cyclops, cyclopsController.inFront));
		
		AddSubgoal(new Goal_MoveToPosition(sheep.transform.position, cyclops.transform, cyclopsController, 1));
		
		status = Status.active;
	}
	
	public function Process() : Status
	{
		ActivateIfInactive();
		
		status = ProcessSubgoals();
		
		return status;
	}
	
	public function Terminate()
	{
		status = Status.completed;
	}

}
