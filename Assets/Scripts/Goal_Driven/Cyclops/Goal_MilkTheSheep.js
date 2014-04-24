#pragma strict

public class Goal_MilkTheSheep extends Goal_Composite
{
	public var cyclops : GameObject;
	public var flock : SheepController;
	public var controller : CyclopsAI;
	
	public function Goal_MilkTheSheep (cyc : GameObject, sheep : SheepController)
	{
		flock = sheep;
		cyclops = cyc;
		controller = cyclops.GetComponent(CyclopsAI);
	}

	public function Activate()
	{
		RemoveAllSubgoals();
		
		for (var sheep : GameObject in flock.sheep)
		{
			AddSubgoal(new Goal_PutDownGameObject(sheep,cyclops));
			AddSubgoal(new Goal_MilkASheep(cyclops, sheep));
			AddSubgoal(new Goal_PickUpGameObject(sheep, cyclops, controller.inFront));
			AddSubgoal(new Goal_MoveToPosition(sheep.transform, cyclops.transform, controller, 1));
		}
		
		status = Status.active;
	}
	
	public function Process() : Status
	{
		ActivateIfInactive();
		// The flock must be around the cyclops in order to milk them
		if(Vector3.Distance(flock.flockCenter, cyclops.transform.position) < cyclops.GetComponent(BoxCollider2D).size.x/1.5)
			status = ProcessSubgoals();
		
		return status;
	}
	
	public function Terminate()
	{
		status = Status.completed;
	}

}
