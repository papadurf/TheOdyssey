// Goal_EatIntruder is a composite goal in which the cyclops moves
// to an intruder and "eats them" by a means of applying damage once
// the intruder is held

#pragma strict

public class Goal_EatIntruder extends Goal_Composite
{
	var victim : GameObject;
	var cyclops : GameObject;
	var controller : CyclopsAI;
	
	public function Goal_EatIntruder (cyc : GameObject, vic : GameObject)
	{
		victim = vic;
		cyclops = cyc;
		controller = cyclops.GetComponent(CyclopsAI);
	}
	
	public function Activate()
	{
		RemoveAllSubgoals();
		
		var victimWidth = victim.GetComponent(BoxCollider2D).size.x;
		var cyclopsWidth = cyclops.GetComponent(BoxCollider2D).size.x;
		
		AddSubgoal(new Goal_Eat(cyclops, victim));
		
		AddSubgoal(new Goal_PickUpGameObject(victim, cyclops, controller.inFront));
		
		AddSubgoal(new Goal_MoveToPosition(victim.transform, cyclops.transform, 
											controller, victimWidth/2 + cyclopsWidth/2));
											
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
