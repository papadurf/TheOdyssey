// Goal_Eat is an atomic goal which requires that the cyclops
// is holding something edible and then applies damage to the
// held object till it is dead or destroyed.

#pragma strict

public class Goal_Eat extends Goal
{
	public var cyclops : GameObject;
	public var food : GameObject;
	public var controller : CyclopsAI;
	
	private var DMG : double = 25;
	private var chewTime : int = 1;
	
	public function Goal_Eat(cyc : GameObject, fd : GameObject)
	{
		cyclops = cyc;
		controller = cyclops.GetComponent(CyclopsAI);
		food = fd;
	}
	
	public function Activate()
	{
		if (food.transform.parent == cyclops.transform)
			status = Status.active;		
		else
			status = Status.failed;
	}
	
	public function Process() : Status
	{
		ActivateIfInactive();
		
		if (food && Time.timeSinceLevelLoad % chewTime == 0)
		{
			food.SendMessage("Damage", DMG);		
		}			
		else if (food == null)
		{
			controller.consumed++;
			Terminate();
		}
			
		return status;
	}
	
	public function Terminate()
	{
		status = Status.completed;
	}

}
