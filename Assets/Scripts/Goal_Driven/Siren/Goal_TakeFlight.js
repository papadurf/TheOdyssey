#pragma strict

public class Goal_TakeFlight extends Goal
{
	var siren 		: GameObject;
	var sirenAI		: SirenAI;
	var altitude	: double;
	
	public function Goal_TakeFlight(siren : GameObject, newAltitude : double)
	{
		this.siren = siren;
		sirenAI = siren.GetComponent(SirenAI);
		altitude = newAltitude;
	}
	
	public function Activate()
	{
		status = Status.active;
	}
	
	public function Process() : Status
	{
		ActivateIfInactive();
		
		if (siren.transform.position.y < altitude)
			siren.transform.position = Vector3.Lerp(siren.transform.position, Vector3.up * sirenAI.speed + siren.transform.position, Time.deltaTime);
		else
		{
			siren.transform.position.y = altitude;
			Terminate();
		}
				
		return status;
	}
	
	public function Terminate()
	{
		status = Status.completed;
	}
}