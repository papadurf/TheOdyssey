#pragma strict

public class Goal_PutDownBoulder extends Goal
{
	private var boulder : GameObject;
	private var cyclops : GameObject;

	public function Goal_PutDownBoulder(b : GameObject, c : GameObject)
	{
		boulder = b;
		cyclops = c;
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
		if (!boulder.transform.IsChildOf(cyclops.transform))
		{
			Debug.Log("Boulder is not a child");
			status = Status.failed;
		}
		else
		{
			//opposite procedure of picking up the boulder
			boulder.transform.localPosition = Vector3.zero;
			boulder.transform.localPosition.x = boulder.GetComponent(BoxCollider2D).size.x/2 +
												cyclops.GetComponent(BoxCollider2D).size.x/2;
												
			boulder.transform.parent = null; 			//unchild the boulder
			boulder.transform.localScale = Vector3.one; //reset scale of boulder
			boulder.collider2D.isTrigger = false;
			
			Terminate();
		}		
			
		return status;
	}
}

