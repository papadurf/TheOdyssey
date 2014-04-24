#pragma strict

public class Goal_Swoop extends Goal
{
	var siren 		: GameObject;
	var sirenAI		: SirenAI;
	
	private var curve 		: Vector4;
	private var toPosition 	: Vector3;
	private var vertex		: Vector3;
	private var originalY	: double;
	
	public function Goal_Swoop(siren : GameObject)
	{
		this.siren = siren;
		sirenAI = siren.GetComponent(SirenAI);
	}
	
	public function Activate()
	{
		originalY = siren.transform.position.y;
		var position = siren.transform.position;
		toPosition = position + siren.transform.localScale.x * Vector3(sirenAI.swoopLength,0,0);
		vertex = Vector3((position.x + toPosition.x)/2, position.y - sirenAI.diveAltitude,0);
	
		var threePoints = Matrix4x4();
		
		threePoints.SetRow(0, Vector3(Mathf.Pow(position.x,2),position.x, 1));
		threePoints.SetRow(1, Vector3(Mathf.Pow(toPosition.x,2),toPosition.x, 1));
		threePoints.SetRow(2, Vector3(Mathf.Pow(vertex.x,2),vertex.x, 1));
		threePoints.SetRow(3, Vector4(0,0,0,1));
		
		curve = threePoints.inverse * Vector4(position.y,toPosition.y,vertex.y,0);
	
		status = Status.active;
	}
	
	public function Process() : Status
	{
		ActivateIfInactive();
		
		var tolerance = 0.2;
		
		if (Vector3.Distance(siren.transform.position, toPosition) < tolerance)
			Terminate();
		else
		{
			var moveDirection = toPosition - siren.transform.position;
			moveDirection.z = 0;
			moveDirection.y = 0;
			moveDirection.Normalize();
		
			var target : Vector3 = moveDirection * sirenAI.diveSpeed + siren.transform.position;
			siren.transform.position = Vector3.Lerp(siren.transform.position, target, Time.deltaTime);
			siren.transform.position.y = curve.x * Mathf.Pow(siren.transform.position.x,2) 
											+ curve.y * siren.transform.position.x + curve.z;	
		}
		
		Debug.DrawRay(vertex, Vector3.up,Color.red);
		Debug.DrawLine(siren.transform.position,toPosition, Color.green);
		
		return status;
	}
	
	public function Terminate()
	{
		siren.transform.position.y = originalY;
		curve = Vector4.zero;
		status = Status.completed;
	}
}