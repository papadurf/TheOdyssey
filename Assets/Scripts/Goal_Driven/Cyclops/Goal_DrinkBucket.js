#pragma strict

public class Goal_DrinkBucket extends Goal_Composite
{
    var bucket : GameObject;
    var container : Container;
    var cyclops : GameObject;
    var controller : CyclopsAI;

    public function Goal_DrinkBucket(drink : GameObject, cyc : GameObject)
    {
		bucket = drink;
		container = drink.GetComponent(Container);
		cyclops = cyc;
		controller = cyc.GetComponent(CyclopsAI);
    }

    public function Activate()
    {
		RemoveAllSubgoals();

		AddSubgoal(new Goal_PutDownGameObject(bucket, cyclops));

		AddSubgoal(new Goal_Drink(bucket, cyclops));

		AddSubgoal(new Goal_PickUpGameObject(bucket, cyclops, controller.inFront));

		AddSubgoal(new Goal_MoveToPosition(bucket.transform, cyclops.transform, controller, 2.5));

		status = Status.active;
    }

    public function Process() : Status
    {
		ActivateIfInactive();
		
		status = ProcessSubgoals();
		
		return status;
    }

    
    public function Terminate()
    {
		status = Status.completed;
    }

}
