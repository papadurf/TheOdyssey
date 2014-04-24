#pragma strict

public class FlyTowardsGoal_Evaluator extends Goal_Evaluator
{
	public function CalculateDesirability(siren : SirenAI) : double
	{
		var percent : double;
		
		var dist = Mathf.Abs(siren.thisTransform.position.x - siren.target.transform.position.x);
		
		percent = (dist-siren.swoopLength)/(siren.swoopLength * 0.35) + 1;
		
		if (dist > siren.swoopLength)
			return 1;
		else
			return percent;
	}
	
	public function SetGoal(siren : SirenAI)
	{
		siren.GetBrain().AddGoal_FlyTowards();
	}
}