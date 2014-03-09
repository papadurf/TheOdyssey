#pragma strict

public class Goal_MilkASheep extends Goal
{
	public var sheep : GameObject;
	public var cyclops : GameObject;
	
	public function Goal_MilkASheep(cyc : GameObject, shp : GameObject)
	{
		sheep = shp;
		cyclops = cyc;
	}
	
	public function Activate()
	{
		status = Status.active;
	}
	
	public function Process() : Status
	{
		ActivateIfInactive();
	
		if (sheep.transform.parent === cyclops.transform)
		{
			sheep.SendMessage("Milk");
			Terminate();
		}
		else
		{
			status = Status.failed;
		}
		
		return status;
	}
	
	public function Terminate()
	{
		status = Status.completed;
	}
}