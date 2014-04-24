#pragma strict

public class Goal_Land extends Goal
{

	var siren 		: GameObject;
	var sirenAI		: SirenAI;
	
	public function Goal_Land(siren : GameObject)
	{
		this.siren = siren;
		sirenAI = siren.GetComponent(SirenAI);
	}

	public function Activate()
	{
		status = Status.active;
	}
	
	public function Process() : Status
	{
		ActivateIfInactive();
		
		
		if (!sirenAI.landed)
		{
			siren.transform.position = Vector3.Lerp(siren.transform.position, Vector3.down * sirenAI.speed + siren.transform.position, Time.deltaTime);
		}
		else
			Terminate();
			
		return status;
	}
	
	public function Terminate()
	{
		status = Status.completed;
	}
}