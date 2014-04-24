// 	Goal_LightFire is an atomic goal in which the cyclops 
//	interacts with a firepit in the scene to activate
//	a "Lit" state by sending a message to the game object

#pragma strict

public class Goal_LightFire extends Goal
{
	public var controller : CyclopsAI;
	public var firePit : GameObject;
	
	private var canLight : boolean;

	public function Goal_LightFire (contr : CyclopsAI, fp : GameObject)
	{
		controller = contr;
		firePit = fp;
	}

	public function Activate()
	{
		status = Status.active;
		canLight = false;
	}
	
	public function Process() : Status
	{
		ActivateIfInactive();
		
		canLight = controller.IsInFront(firePit);
				
		if (canLight)
		{
			// interact with the firepit
			firePit.SendMessage("Light");
			Terminate();
		}
		else
			status = Status.failed;
		
		return status;
	}
	
	public function Terminate()
	{
		status = Status.completed;
	}
}