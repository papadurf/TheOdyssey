#pragma strict

public class SingGoal_Evaluator extends Goal_Evaluator
{
    var lastTimeUsed : double;

    public function SingGoal_Evaluator()
    {
		lastTimeUsed = Time.time;
    }
    
	public function CalculateDesirability(siren : SirenAI) : double
	{
		var percent : double = 0;
	    var dist = Mathf.Abs(siren.thisTransform.position.x - siren.target.transform.position.x) - siren.safeDistance;

	    // cooldown requirement
	    if (lastTimeUsed + siren.singCooldown < Time.time)
	    	percent = 0.85;
		if (dist >= siren.safeDistance)
	    	percent += Mathf.Exp(siren.safeDistance-dist) * 0.15;
		
			return percent;	
	}
	
	public function SetGoal(siren : SirenAI)
	{
		siren.GetBrain().AddGoal_Sing();
	}
}

