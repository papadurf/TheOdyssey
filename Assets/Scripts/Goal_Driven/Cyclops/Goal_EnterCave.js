// Goal_EnterCave is a composite goal which follows the routine
// of which the Cyclops follows when he gets home to his cave
// this goal is NOT generic and can involve cyclops specific calls

#pragma strict

public class Goal_EnterCave extends Goal_Composite
{
	// Instances
	private var boulder : GameObject;
	private var cyclops : GameObject;
	private var controller : CyclopsAI; 
	private var entrance : Transform;
	private var inside : Transform;
	private var sheep : SheepController;
	private var moveInside : Goal;
	
	/**
	 * Constructor
	 */
	public function Goal_EnterCave(bol : GameObject, cyc : GameObject, ent : Transform , ins : Transform)
	{
		boulder = bol;
		cyclops = cyc;
		controller = cyclops.GetComponent(CyclopsAI);
		sheep = controller.sheepController;
		entrance = ent;
		inside = ins;
	}
	
	public function Activate()
	{
		RemoveAllSubgoals();

		// setup calculations
		var cyclopsWidth = cyclops.GetComponent(BoxCollider2D).size.x;
		var boulderWidth = boulder.GetComponent(BoxCollider2D).size.x;
//		var inFrontDistance = Vector3.Distance(cyclops.transform.position, controller.inFront.position);
//		inFrontDistance = Mathf.Abs(inFrontDistance	- cyclopsWidth/2);

		var dist = Vector3.Distance(inside.position, entrance.position) - (boulderWidth/2 + cyclopsWidth/2); 	
	
		moveInside = new Goal_MoveToPosition(inside, cyclops.transform, controller, dist);
		
		// add the goals onto the stack
		// put down the boulder
		AddSubgoal(new Goal_PutDownGameObject(boulder, cyclops));	
		
		// move to the entrance
		AddSubgoal(new Goal_MoveToPosition(entrance, cyclops.transform, controller, 
											boulderWidth/2 + cyclopsWidth/2));
		
		// move to the inside of the cave									
		AddSubgoal(moveInside);
													
		// pick up the boulder		
		AddSubgoal(new Goal_PickUpGameObject(boulder, cyclops, controller.inFront));
	
		// move to the boulder
		AddSubgoal(new Goal_MoveToPosition(boulder.transform, cyclops.transform, controller, boulderWidth/2 + cyclopsWidth/2));
		
		AddSubgoal(new Goal_MoveFlock(inside.gameObject, sheep));
														
		status = Status.active;
	}
	
	public function Process() : Status
	{
		ActivateIfInactive();
		
		if (subgoals.Peek() != moveInside)
			status = ProcessSubgoals();
		else if (subgoals.Peek() == moveInside && sheep.flockCenter.x < (entrance.position.x - boulder.GetComponent(BoxCollider2D).size.x/2))
			status = ProcessSubgoals();
		
		return status;
	}
	
	public function Terminate()
	{
		status = Status.completed;
	}
}

