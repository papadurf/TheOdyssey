#pragma strict
import System.Collections.Generic;

var debug : boolean;

public class Goal_Composite extends Goal
{
	private var subgoals : Stack.<Goal> = new Stack.<Goal>();
	
	public function AddSubgoal(g : Goal) 
	{
//		Debug.Log("Adding Goal: " + g);
		subgoals.Push(g);
//		Debug.Log(subgoals);
	}
	
	public function ProcessSubgoals() : Status
	{
//		Debug.Log("Processing Subgoals");
		
		// while their are subgoals and the front process has either completed or failed
		while(subgoals.Count > 0 && (subgoals.Peek().isCompleted() || subgoals.Peek().hasFailed()))
		{
			subgoals.Peek().Terminate();
			subgoals.Pop();
		}
		
//		Debug.Log("Goals Remaining: " + subgoals.Count);
		
		if(subgoals.Count > 0)
		{
//			Debug.Log("Current Goal" + subgoals.Peek());
			
			var subgoalStatus : Status = subgoals.Peek().Process();
			
			if (subgoalStatus == Status.completed && subgoals.Count > 1)
				return Status.active;
			
			return subgoalStatus;
		}
		else
			return Status.completed;
	}
	
	public function RemoveAllSubgoals()
	{
		for(var g : Goal in subgoals)
			g.Terminate();
			
		subgoals.Clear();
	}
}

