#pragma strict

public class SwoopGoal_Evaluator extends Goal_Evaluator
{
	var lastTimeUsed : double;

	public function SwoopGoal_Evaluator()
	{
		lastTimeUsed = Time.time;
	}

	public function CalculateDesirability(siren : SirenAI) : double
	{
		var percent : double = 0;
		var radius = 2f;
		var dist = siren.thisTransform.localScale.x * siren.swoopLength/2 * Vector3.right;
		dist = dist + siren.thisTransform.position - siren.target.transform.position;
		
		if (lastTimeUsed + siren.swoopCooldown < Time.time)
			percent += 0.5;
		if (dist.x > radius && dist.x < -radius)
			percent += (-(dist.x * dist.x) / (radius * radius) + 1) * 0.5;
			
		return percent;
	}
	
	public function SetGoal(siren : SirenAI)
	{
		siren.GetBrain().AddGoal_Swoop();
	}
}