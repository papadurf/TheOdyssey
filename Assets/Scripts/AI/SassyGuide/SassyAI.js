var objective : Objective;
var player : Transform;
var moveSpeed : float;

// Distance Guidelines
var guideDist 	: float = 5.0;
var closeDist 	: float = 8.0;
var farDist 	: float = 12.0;
var followDist 	: float = 15.0;
var objRadius	: float = 2.0;

enum AIState {Guide, Close, Idle, Far, Follow}
private var state : AIState = AIState.Idle;
private var objectives;
private var facingRight = true;

function Start()
{
	var gos : GameObject[] = FindObjectsOfType(GameObject) as GameObject[];
    objectives = new Array();
    for (var obj : GameObject in gos) 
    	if (obj.GetComponent("Objective"))
    		objectives.push(obj.GetComponent("Objective"));
    		
    objective = FindNextObjective();
}

function Update()
{
    CheckState(); // Check State Diagram Conditions
    
    if (!objective)
    	objective = FindNextObjective();
    
    if (state == AIState.Guide)
		Guide();
//    else if (state == AIState.Close)
//    else if (state == AIState.Far)
    else if (state == AIState.Follow)
    	Follow();
    else
		Idle();
}

function FindNextObjective() : Objective
{
    if (!objective)
    {
    	var next : Objective;
		var distance = Mathf.Infinity;
		var priority = Mathf.Infinity;
		for(var obj : Objective in objectives)
		{
		    var diff = (obj.GetPosition() - transform.position);
		    var curDistance = diff.sqrMagnitude;
		    var curPriority = obj.priority;
		    if (curPriority < priority)
		    {
				if (curDistance < distance)
				{
				    next = obj;
				    distance = curDistance;
				    priority = curPriority;
				}
		    }
		}
		return next;
    }
    return null;
}

function CheckState()
{
	var dist = (player.position - transform.position).sqrMagnitude;
	// from Idle state
	if (state == AIState.Idle)
	{
		if (dist < closeDist)
			state = AIState.Close;
		if (dist > farDist)
			state = AIState.Far;
	}
	// from Close state
	else if (state == AIState.Close)
	{
		if (dist < guideDist && objective)
		{
			if(objective.GetPosition().x < transform.position.x) 	// objective is behind
				state = AIState.Idle;
			else						// objective is ahead
				state = AIState.Guide;
		}
	}
	// from Guide state
	else if (state == AIState.Guide)
		if (dist >= guideDist) state = AIState.Close;
	// from Far state
	else if (state == AIState.Far)
		if (dist > followDist) state = AIState.Follow;
	// from Follow State
	else if (state == AIState.Follow)
		if (dist <= followDist) state = AIState.Far;
}

function MoveTowards(target : Vector3)
{
	var direction : Vector3 = target - transform.position;
	direction.z = 0;
	direction.Normalize();
		
	if (direction.x < transform.position.x && facingRight)
		Flip();
	else if (direction.x > transform.position.x && !facingRight)
		Flip();		
		
	target = target * moveSpeed + transform.position;
	transform.position = Vector3.Lerp(transform.position, target, Time.deltaTime);
}

function Flip()
{
	facingRight = !facingRight;
	
	// Multiply the x component of localScale by -1.
	var aiScale : Vector3 = transform.localScale;
	aiScale.x *= -1;
	transform.localScale = aiScale;
}

function Idle()
{
	
}

function Guide()
{
	if (objective)
	{
		var dist = Vector3.Distance(objective.GetPosition(),transform.position);
		if (dist.x > objRadius)
			MoveTowards(objective.GetPosition());				
		else		
			Flip();
	}
}

function Follow()
{
	MoveTowards(player.position);
}
