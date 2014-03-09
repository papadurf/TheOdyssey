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
	private var gObject : GameObject;
	private var parent : GameObject;

	/**
	 *	Constructor
	 */
	public function Goal_PutDownGameObject(obj : GameObject, par : GameObject)
	{
		gObject = obj;
		parent = par;
	}
	
	public function Activate()
	{
		status = Status.active;
	}
	
	public function Terminate()
	{
		status = Status.completed;
	}
	
	public function Process() : Status
	{
		ActivateIfInactive();
	
		// if the cyclops isnt the parent of the boulder
		if (!gObject.transform.IsChildOf(parent.transform))
		{
			Debug.Log("Boulder is not a child");
			status = Status.failed;
		}
		else
		{
			//opposite procedure of picking up the boulder
			gObject.transform.localPosition = Vector3.zero;
			
			var gameObjectWidth = gObject.GetComponent(BoxCollider2D).size.x;
			var parentWidth = parent.GetComponent(BoxCollider2D).size.x;
			gObject.transform.localPosition.x = gameObjectWidth/2 + parentWidth/2;
												
			gObject.transform.parent = null; 			//unchild the boulder
			gObject.transform.localScale = Vector3.one; //reset scale of boulder
			gObject.collider2D.isTrigger = false;
			
			Terminate();
		}		
			
		return status;
	}
}

