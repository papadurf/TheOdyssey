#pragma strict

public class Goal_StartFire extends Goal_Composite
{
	public var controller : CyclopsAI;
	public var firePit : GameObject;
	
	public function Goal_StartFire(contr : CyclopsAI, fp : GameObject)
	{
		controller = contr;
		firePit = fp;
	}

	public function Activate()
	{
		RemoveAllSubgoals();
		
		AddSubgoal(new Goal_LightFire(controller, firePit));
		
		AddSubgoal(new Goal_MoveToPosition(firePit.transform.position, controller.thisTransform,
											controller, controller.thisCollider.size.x/2));
		
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

