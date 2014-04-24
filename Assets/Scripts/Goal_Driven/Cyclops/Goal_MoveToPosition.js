#pragma strict

public class Goal_MoveToPosition extends Goal
{
	public var bufferRange : double; 	
	public var currentTransform : Transform;
	public var toPosition : Transform;
	public var controller : CyclopsAI;
		
	private var moveDirection : Vector3;	
		
	// Constructor
	public function Goal_MoveToPosition(pos : Transform, cur : Transform, contr : CyclopsAI, r : double)
	{
		toPosition = pos;
		currentTransform = cur;	
		controller = contr;
		bufferRange = r;
	}
	
	public function Activate()
	{
		moveDirection = toPosition.position - currentTransform.position;
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
		
		if (Mathf.Abs(currentTransform.position.x - toPosition.position.x) < bufferRange)
		{
			Terminate();
			return status;
		}
			 
		var currentPosition : Vector3 = currentTransform.position;
		moveDirection = toPosition.position - currentPosition;
		moveDirection.z = 0;
		moveDirection.Normalize();
			
		var target : Vector3 = moveDirection * controller.speed + currentPosition;
		currentTransform.position = Vector3.Lerp(currentPosition, target, Time.deltaTime);
		Debug.DrawLine(currentPosition, toPosition.position, Color.green);
		
		return status;
	}	 	
	
	public function Terminate()
	{
		status = Status.completed;
	}
}