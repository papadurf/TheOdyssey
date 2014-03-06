#pragma strict

public class Goal_EnterCave extends Goal_Composite
{
	private var boulder : GameObject;
	private var cyclops : GameObject;
	private var cyclopsController : CyclopsAI; 
	private var entrance : Vector3;
	private var inside : Vector3;

	public function Goal_EnterCave(bol : GameObject, cyc : GameObject, ent : Vector3 , ins : Vector3)
	{
		boulder = bol;
		cyclops = cyc;
		cyclopsController = cyclops.GetComponent(CyclopsAI);
		entrance = ent;
		inside = ins;
	}
	
	public function Activate()
	{
		RemoveAllSubgoals();
	
		var cyclopsWidth = cyclops.GetComponent(BoxCollider2D).size.x;
		var boulderWidth = boulder.GetComponent(BoxCollider2D).size.x;
		
		var inFrontDistance = Vector3.Distance(cyclops.transform.position, cyclopsController.inFront.position);
		inFrontDistance = Mathf.Abs(inFrontDistance	- cyclopsWidth/2);
	
		AddSubgoal(new Goal_PutDownBoulder(boulder, cyclops));	
		
		AddSubgoal(new Goal_MoveToPosition(entrance, cyclops.transform, cyclopsController, 
											boulderWidth/2 + cyclopsWidth/2 + inFrontDistance));
											
		AddSubgoal(new Goal_MoveToPosition(inside, cyclops.transform, cyclopsController,
											inFrontDistance));
											
		AddSubgoal(new Goal_PickUpBoulder(boulder, cyclops, cyclopsController.inFront));
	
		AddSubgoal(new Goal_MoveToPosition(boulder.transform.position, cyclops.transform, cyclopsController,
											boulderWidth/2 + cyclopsWidth/2 + inFrontDistance));
											
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

