#pragma strict

public class Goal_MoveToPosition extends Goal
{
	public var bufferRange : double; 	
	public var currentTransform : Transform;
	public var toPosition : Vector3;
	public var controller : CyclopsAI;
		
	private var moveDirection : Vector3;	
		
	// Constructor
	public function Goal_MoveToPosition(pos : Vector3, cur : Transform, contr : CyclopsAI, r : double)
	{
		toPosition = pos;
		currentTransform = cur;	
		controller = contr;
		bufferRange = r;
	}
	
	public function Activate()
	{
		moveDirection = toPosition - currentTransform.position;
		moveDirection.z = 0;
		moveDirection.Normalize();
		
		if (moveDirection.x > 0f && !controller.facingRight)
			controller.Flip();
		else if (moveDirection.x < 0f && controller.facingRight)
			controller.Flip();
			 
		status = Status.active;
	}	 
	
	public function Process() : Status
	{
		ActivateIfInactive();
		
		if (Mathf.Abs(currentTransform.position.x - toPosition.x) < bufferRange)
		{
			Terminate();
			return status;
		}
			 
		var currentPosition : Vector3 = currentTransform.position;
		moveDirection = toPosition - currentPosition;
		moveDirection.z = 0;
		moveDirection.Normalize();
			
		var target : Vector3 = moveDirection * controller.speed + currentPosition;
		currentTransform.position = Vector3.Lerp(currentPosition, target, Time.deltaTime);
		Debug.DrawLine(currentPosition, toPosition, Color.green);
		
		return status;
	}	 	
	
	public function Terminate()
	{
		status = Status.completed;
	}
}