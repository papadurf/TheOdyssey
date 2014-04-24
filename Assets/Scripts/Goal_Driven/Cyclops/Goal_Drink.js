#pragma strict

public class Goal_Drink extends Goal
{
    var bucket : GameObject;
    var container : Container;
    var cyclops : GameObject;

	private var drinkTime : int = 1;

    public function Goal_Drink(drink : GameObject, cyc : GameObject)
    {
		bucket = drink;
		container = drink.GetComponent(Container);
		cyclops = cyc;
    }

    public function Activate()
    {
		if (bucket.transform.parent == cyclops.transform)
		    status = Status.active;
		else
		    status = Status.failed;
    }

    public function Process() : Status
    {
		ActivateIfInactive();
		
		if(!container.isEmpty())
		    container.Drink();
		else
		    Terminate();

		return status;
    }
    

    public function Terminate()
    {
		status = Status.completed;
    }
    
}
