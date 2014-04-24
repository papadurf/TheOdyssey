#pragma strict

public class Goal_FlyAwayFrom extends Goal
{
	var siren		: GameObject;
	var sirenAI 	: SirenAI;
	var target 		: GameObject;
	
	private var direction : Vector3;
	private var startPosition : Vector3;
	
	public function Goal_FlyAwayFrom(siren : GameObject)
	{
		this.siren = siren;
		sirenAI = siren.GetComponent(SirenAI);
		target = sirenAI.target;
	}
	
	public function Activate()
	{
		direction = siren.transform.position - target.transform.position;
		direction.y = 0;
		direction.z = 0;
		direction.Normalize();
		
		startPosition = siren.transform.position;
		
		status = Status.active;
	}
	
	public function Process() : Status
	{
		ActivateIfInactive();
		
		var distance = 1;
		
		if(Mathf.Abs(siren.transform.position.x - startPosition.x) < distance)
			siren.transform.position = Vector3.Lerp(siren.transform.position, direction * sirenAI.speed + siren.transform.position, Time.deltaTime);
		else
			Terminate();
		
		return status;
	}
	
	public function Terminate()
	{
		status = Status.completed;
	}
}