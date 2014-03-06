#pragma strict

/* 	This script is a atomic goal in which the cyclops 
*	interacts with a firepit in the scene to activate
*	a "Lit" state
*/
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
		
		// linecollision check extending from the direction the cyclops is looking
		var currentCollisions = Physics2D.LinecastAll(controller.thisTransform.position,
														controller.inFront.position);
		for (var i = 0; i < currentCollisions.Length; i++) //look for firepit collider
			if(currentCollisions[i].collider == firePit.GetComponent(BoxCollider2D))
				canLight = true;
				
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