// Goal_MoveFlock is an atomic goal which just changes
// which game object the flock chases

#pragma strict

public class Goal_MoveFlock extends Goal
{
	public var target : GameObject;
	public var sheepController : SheepController;

	public function Goal_MoveFlock (tar : GameObject, contr : SheepController)
	{
		target = tar;
		sheepController = contr;
	}

	public function Activate()
	{
		status = Status.active;
		
		sheepController.SetChasee(target);
		
		Terminate();
	}
		
	public function Process() : Status
	{
		ActivateIfInactive();
		
		return status;
	}
	
	public function Terminate()
	{
		status = Status.completed;
	}
}

