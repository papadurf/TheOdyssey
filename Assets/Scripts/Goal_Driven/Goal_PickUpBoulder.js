#pragma strict

public class Goal_PickUpBoulder extends Goal
{
	private var boulder : GameObject;
	private var parent : GameObject;
	private var detectionPoint : Transform;
	
	public function Goal_PickUpBoulder(b : GameObject, p : GameObject, d : Transform)
	{
		boulder = b;
		parent = p;
		detectionPoint = d;
	}
	
	public function Process() : Status
	{
		ActivateIfInactive();
		
		var canPickUp = false; //flag for ability to pick up the boulder 
		
		//Old method of detecting boulder		
//		var parentCollider : BoxCollider2D = parent.GetComponent(BoxCollider2D);
//		var currentCollisions = Physics2D.OverlapAreaAll(parentCollider.center - parentCollider.size/2, //Vector2
//												parentCollider.center + parentCollider.size/2);			//calculations

		//manual collision check required because the script is unattached to a gameobject		
		var currentCollisions = Physics2D.LinecastAll(parent.transform.position, detectionPoint.position);
		Debug.DrawLine(parent.transform.position, detectionPoint.position);
		
		for (var i = 0; i < currentCollisions.Length; i++) //look for boulder collider
			if(currentCollisions[i].collider == boulder.GetComponent(BoxCollider2D))
				canPickUp = true;
		
		if(canPickUp)
		{
			boulder.transform.parent = parent.transform;//child boulder
			boulder.collider2D.isTrigger = true;		//make it un-collidable
			
			boulder.transform.localPosition	= Vector3.zero;
			boulder.transform.localScale = Vector3.one;
			boulder.transform.localPosition.y = parent.GetComponent(BoxCollider2D).size.y/2 + 
												boulder.GetComponent(BoxCollider2D).size.y/2;
												//arbitrary formula to position above cyclops
			Terminate();
		}
		else
		{
			status = Status.failed;
		}
		
		return status;
	}
	
	public function Activate()
	{
		status = Status.active;
	}
	
	public function Terminate()
	{
		status = Status.completed;
	}
}
