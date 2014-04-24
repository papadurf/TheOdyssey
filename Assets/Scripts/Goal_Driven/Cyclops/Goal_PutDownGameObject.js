//	Goal_PutDownBoulder is a atomic goal which a boulder in the scene
// must already be a child in order to set the position and is repo-
// sitioned in front of the cyclops
  
/**	Change Log:
 *	 3/06 - Goal changed to PutDownGameObject to create a more generic goal
 *			allow recycling of this goal on other various objects
 */

#pragma strict

public class Goal_PutDownGameObject extends Goal
{
	private var object : GameObject;
	private var parent : GameObject;

	/**
	 *	Constructor
	 */
	public function Goal_PutDownGameObject(obj : GameObject, par : GameObject)
	{
		object = obj;
		parent = par;
	}
	
	public function Activate()
	{
		status = Status.active;
	}
	
	public function Process() : Status
	{
		ActivateIfInactive();
	
		// if the cyclops isnt the parent of the boulder
		if (!object.transform.IsChildOf(parent.transform))
		{
			Debug.Log("Boulder is not a child");
			status = Status.failed;
		}
		else
		{
			var originalScale = object.transform.localScale;
			//opposite procedure of picking up the boulder
			object.transform.localPosition = Vector3.zero;
			
			var gameObjectWidth = object.GetComponent(BoxCollider2D).size.x;
			var parentWidth = parent.GetComponent(BoxCollider2D).size.x;
			object.transform.localPosition.x = gameObjectWidth/2 + parentWidth/2;
			
			if (object.collider2D) object.collider2D.enabled = true;	
			if (object.rigidbody2D) object.rigidbody2D.isKinematic = false;																									
																																																																														
			object.transform.parent = null; 			//unchild the boulder
			object.transform.localScale = originalScale; //reset scale of boulder	
			
			Terminate();
		}		
			
		return status;
	}
	
	public function Terminate()
	{
		status = Status.completed;
	}
}

