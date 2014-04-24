#pragma strict

public class Goal_FlyTowards extends Goal
{
	var siren		: GameObject;
	var sirenAI 	: SirenAI;
	var target 		: GameObject;
	
	private var direction : Vector3;
	private var startPosition : Vector3;
	
	public function Goal_FlyTowards(siren : GameObject)
	{
		this.siren = siren;
		sirenAI = siren.GetComponent(SirenAI);
		target = sirenAI.target;
	}
	
	public function Activate()
	{
		direction = target.transform.position - siren.transform.position;
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