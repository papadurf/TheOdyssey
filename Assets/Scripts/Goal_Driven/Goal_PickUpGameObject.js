//	Goal_PickUpBoulder is a atomic goal which a boulder in the scene
// is repositioned on top of the goal fullfiller's head through making
// it a child and setting the position above the cyclops head	

/**	Change Log:
 *	 2/16 - method of detecting the boulder infront changed to linecast	
 *			as opposed to checking for colliding areas
 *	 3/06 - Goal changed to PickUpGameObject to create a more generic goal
 *			allowing recycling of this goal on other various objects
 */

#pragma strict

public class Goal_PickUpGameObject extends Goal
{
	private var gObject : GameObject;
	private var parent : GameObject;
	private var detectionPoint : Transform;
	
	/**
	 *	Constructor
	 */
	public function Goal_PickUpGameObject(obj : GameObject, par : GameObject, det : Transform)
	{
		gObject = obj;
		parent = par;
		detectionPoint = det;
	}
	
	public function Process() : Status
	{
		ActivateIfInactive();
		
		var canPickUp = false; //flag for ability to pick up the game object
		
		//manual collision check required because the script is unattached to a gameobject		
		var currentCollisions = Physics2D.LinecastAll(parent.transform.position, detectionPoint.position);
		Debug.DrawLine(parent.transform.position, detectionPoint.position);
		
		for (var i = 0; i < currentCollisions.Length; i++) //look for boulder collider
			if(currentCollisions[i].collider == gObject.GetComponent(BoxCollider2D))
				canPickUp = true;
		
		if(canPickUp)
		{
			gObject.transform.parent = parent.transform;//child game object
			gObject.collider2D.isTrigger = true;		//make it un-collidable
			
			var parentHeight = parent.GetComponent(BoxCollider2D).size.y;
			var gameObjectHeight = gObject.GetComponent(BoxCollider2D).size.y;
			
			gObject.transform.localPosition	= Vector3.zero;
			gObject.transform.localScale = Vector3.one;
			gObject.transform.localPosition.y = parentHeight/2 + gameObjectHeight/2;
												
			Terminate();
		}
		else
			status = Status.failed;
		
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
