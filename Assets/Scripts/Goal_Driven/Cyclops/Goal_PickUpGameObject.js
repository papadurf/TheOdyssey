//	Goal_PickUpBoulder is a atomic goal which a boulder in the scene
// is repositioned on top of the goal fullfiller's head through making
// it a child and setting the position above the cyclops head	

/**	Change Log:
 *	 2/16 - method of detecting the boulder infront changed to linecast	
 *			as opposed to checking for colliding areas
 *	 3/06 - Goal changed to PickUpGameObject to create a more generic goal
 *			allowing recycling of this goal on other various objects
 *	 3/09 - line cast method created difficulty for short objects being
 *			being picked up and was changed back to area overlap
 */

#pragma strict

public class Goal_PickUpGameObject extends Goal
{
	private var object : GameObject;
	private var parent : GameObject;
	private var detectionPoint : Transform;
	private var controller : CyclopsAI;
	
	/**
	 *	Constructor
	 */
	public function Goal_PickUpGameObject(obj : GameObject, par : GameObject, det : Transform)
	{
		object = obj;
		parent = par;
		detectionPoint = det;
		controller = parent.GetComponent(CyclopsAI);
	}
	
	public function Process() : Status
	{
		ActivateIfInactive();
		
		//flag for ability to pick up the game object
		var canPickUp = controller.IsInFront(object);
		
		if(canPickUp)
		{
			var originalScale = object.transform.localScale;
			var gameObjectHeight = object.GetComponent(BoxCollider2D).size.y;
			
			if (object.collider2D) object.collider2D.enabled = false;
			if (object.rigidbody2D) 
			{
				object.rigidbody2D.isKinematic = true;
				object.rigidbody2D.velocity = Vector2.zero;
			}
			
			object.transform.parent = parent.transform;//child game object
			object.transform.localPosition	= Vector3.zero;
			object.transform.localScale = originalScale;
			object.transform.localPosition.y = parent.GetComponent(BoxCollider2D).size.y/2 + 
												gameObjectHeight/2;
												
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
