#pragma strict

public class FlyAwayFromGoal_Evaluator extends Goal_Evaluator
{
	public function CalculateDesirability(siren : SirenAI) : double
	{
		var percent : double;
		
		var dist = Mathf.Abs(siren.thisTransform.position.x - siren.target.transform.position.x);
		
		percent = -(dist)/(siren.swoopLength * 0.35) + 1;
		
		if (percent < 0)
			return 0;
		else
			return percent;
	}
	
	public function SetGoal(siren : SirenAI)
	{
		siren.GetBrain().AddGoal_FlyAwayFrom();
	}
}