#pragma strict

public class Goal
{
	enum Status {inactive, active, completed, failed};

	protected var status : Status = Status.inactive;		
	
	public function Activate()
	{
		// Abstract function
	}
	
	public function Process() : Status
	{
		//Abstract function
	}
	
	public function Terminate()
	{
		// Abstract function
	}
	
	public function isActive() : boolean
	{
		return status == Status.active;
	}
	
	public function isInactive() : boolean
	{
		return status == Status.inactive;
	}
	
	public function isCompleted() : boolean
	{
		return status == Status.completed;
	}
	
	public function hasFailed() : boolean
	{
		return status == Status.failed;
	}
	
	public function ActivateIfInactive()
	{
		if(isInactive())
			Activate();
	}
}

