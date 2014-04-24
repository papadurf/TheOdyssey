#pragma strict

public class Goal_StartFire extends Goal_Composite
{
	var cyclops : GameObject;
	var controller : CyclopsAI;
	var firePit : GameObject;
	
	public function Goal_StartFire(cyc : GameObject, fp : GameObject)
	{
		cyclops = cyc;
		controller = cyclops.GetComponent(CyclopsAI);
		firePit = fp;
	}

	public function Activate()
	{
		RemoveAllSubgoals();
		
		AddSubgoal(new Goal_LightFire(controller, firePit));
		
		AddSubgoal(new Goal_MoveToPosition(firePit.transform, cyclops.transform,
											controller, cyclops.GetComponent(BoxCollider2D).size.x/2));
		
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

