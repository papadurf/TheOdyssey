#pragma strict

public class Goal_Think extends Goal_Composite
{
	var siren	: GameObject;
	var sirenAI : SirenAI;
	var evaluators : Array;
	
	var singEvaluator : SingGoal_Evaluator;
	var swoopEvaluator : SwoopGoal_Evaluator;
	
	public function Goal_Think(siren : GameObject)
	{
		this.siren = siren;
		sirenAI = siren.GetComponent(SirenAI);
		singEvaluator = new SingGoal_Evaluator();
		swoopEvaluator = new SwoopGoal_Evaluator();
		evaluators = [singEvaluator,swoopEvaluator,new FlyAwayFromGoal_Evaluator(),new FlyTowardsGoal_Evaluator()];
	}
	
	public function Activate()
	{
		Arbitrate();
		
		status = Status.active;
	}
	
	public function Process() : Status
	{
		ActivateIfInactive();
		
		status = ProcessSubgoals();
		
		if (isCompleted() || hasFailed())
		{
			if (subgoals.Count > 0)
			{
				if (subgoals.Peek().GetType() == Goal_Swoop)
				{
					swoopEvaluator.lastTimeUsed = Time.time;
					Debug.Log("Swoop Attack on Cooldown");
				}
				else if (subgoals.Peek().GetType() == Goal_Sing)
				{
					singEvaluator.lastTimeUsed = Time.time;
					Debug.Log("Sing Attack on Cooldown");
				}
			}
			status = Status.inactive;	
		}
		
		return status;	
	}
	
	public function Arbitrate()
	{
		var	best = 0.2;
		var mostDesirable : Goal_Evaluator = null;
		for (var evaluator : Goal_Evaluator in evaluators)
		{
			var desirability = evaluator.CalculateDesirability(sirenAI);
			
			if (desirability >= best)
			{
				best = desirability;
				mostDesirable = evaluator;
			}
		}
		
		if (mostDesirable)
			Debug.Log(mostDesirable + " with " + best);
		
		if (mostDesirable)
			mostDesirable.SetGoal(sirenAI);
	}
	
	public function AddGoal_Sing()
	{
		AddSubgoal(new Goal_Sing(siren, sirenAI.target));
	}
	
	public function AddGoal_Swoop()
	{
		AddSubgoal(new Goal_Swoop(siren));
	}
	
	public function AddGoal_FlyAwayFrom()
	{
		AddSubgoal(new Goal_FlyAwayFrom(siren));
	}
	
	public function AddGoal_FlyTowards()
	{
		AddSubgoal(new Goal_FlyTowards(siren));
	}
}