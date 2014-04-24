#pragma strict

public class Goal_ExitCave extends Goal_Composite
{
	var boulder : GameObject;
	var cyclops : GameObject;
	var controller : CyclopsAI;
	var entrance : Transform;
	var outside : Transform;
	var sheep : SheepController;
	
	private var moveOutside : Goal;
	
	public function Goal_ExitCave(boul : GameObject, cyc : GameObject, ent : Transform, outs : Transform)
	{
		boulder = boul;
		cyclops = cyc;
		controller = cyclops.GetComponent(CyclopsAI);
		entrance = ent;
		outside = outs;
		sheep = controller.sheepController;
	}
	
	public function Activate()
	{
		RemoveAllSubgoals();

		// setup calculations
		var cyclopsWidth = cyclops.GetComponent(BoxCollider2D).size.x;
		var boulderWidth = boulder.GetComponent(BoxCollider2D).size.x;
		var inFrontDistance = Vector3.Distance(cyclops.transform.position, controller.inFront.position);
		inFrontDistance = Mathf.Abs(inFrontDistance	- cyclopsWidth/2);
	
	
		moveOutside = new Goal_MoveToPosition(outside, cyclops.transform, controller, inFrontDistance);
		
		// add the goals onto the stack
		// put down the boulder
		AddSubgoal(new Goal_PutDownGameObject(boulder, cyclops));	
		
		// move to the entrance
		AddSubgoal(new Goal_MoveToPosition(entrance, cyclops.transform, controller, 
											boulderWidth/2 + cyclopsWidth/2 + inFrontDistance));
		
		// move to the outside of the cave									
		AddSubgoal(moveOutside);
																							
		// pick up the boulder		
		AddSubgoal(new Goal_PickUpGameObject(boulder, cyclops, controller.inFront));
	
		// move to the boulder
		AddSubgoal(new Goal_MoveToPosition(boulder.transform, cyclops.transform, controller,
											boulderWidth/2 + cyclopsWidth/2 + inFrontDistance));
		
		AddSubgoal(new Goal_MoveFlock(outside.gameObject, sheep));
																				
		status = Status.active;
	}
	
	public function Process() : Status
	{
		ActivateIfInactive();
		
		if (subgoals.Peek() != moveOutside)
			status = ProcessSubgoals();
		else if (subgoals.Peek() == moveOutside && sheep.flockCenter.x > (entrance.position.x + boulder.GetComponent(BoxCollider2D).size.x/2))
			status = ProcessSubgoals();
		
		return status;
	}
	
	public function Terminate()
	{
		status = Status.completed;
	}
}