#pragma strict

//editable factors
var detectionRange	: double;
var speed 			: double;
var sleepTime		: double;

//references to other objects
var sheepController : SheepController;
var firePit			: GameObject;
var boulder			: GameObject;
var sheepPen		: GameObject;
var inside 			: Transform;
var entrance		: Transform;
var outside			: Transform;
var buckets 		: GameObject[];
var consumed 		: int = 0;

//triggers tied to the thought process
var intruderAlert 	: boolean;
var sheepMilked 	: boolean;
var fireStarted 	: boolean;
var hasEaten		: boolean;
var dayTime 		: boolean;
var isInside		: boolean;
var hasDrank		: boolean;
var passedOut		: boolean;
var pause			: boolean;


@HideInInspector var inFront 		: Transform;
@HideInInspector var facingRight 	: boolean;

private var intruders		: Array = new Array();
private var chores			: Array = new Array();
private var completed 		: Array = new Array();

private var currentGoal 	: Goal;
private var enterCave 		: Goal;
private var exitCave		: Goal;
private var milkSheep		: Goal;
private var startFire		: Goal;
private var moveToMe		: Goal;
private var moveToPen		: Goal;

function Awake()
{
	enterCave = new Goal_EnterCave(boulder, gameObject, entrance, inside);
	exitCave = new Goal_ExitCave(boulder, gameObject, entrance, outside);
	milkSheep = new Goal_MilkTheSheep(gameObject, sheepController);
	startFire = new Goal_StartFire(gameObject, firePit);
	moveToMe = new Goal_MoveFlock(gameObject, sheepController);
	moveToPen = new Goal_MoveFlock(sheepPen, sheepController);

	facingRight = true;
	inFront = transform.Find("inFront");
}

function Start () 
{
	currentGoal = null;
	AddChores();
	var crew =  GameObject.Find("crewmates");
	for (var guy : Transform in crew.GetComponentsInChildren(Transform))
		if(guy != crew.transform)
			intruders.Add(guy.gameObject);
}

function FixedUpdate()
{
	if (!pause)
	{
		if (!currentGoal && chores.length > 0)
		{
			currentGoal = chores.Shift() as Goal;
		}
		else if (currentGoal)
		{
			currentGoal.Process();
			if(currentGoal.isCompleted() || currentGoal.hasFailed())
			{
				if (currentGoal.isCompleted())
					completed.Push(currentGoal);
				Debug.Log(completed);
				currentGoal = null;
			}
		}
		
		var detected = Vector3.Distance(GameObject.FindGameObjectWithTag("Player").transform.position, transform.position) < detectionRange;

		if (!hasEaten && consumed > 1)
			hasEaten = true;
		if (!sheepMilked && Contains(completed, milkSheep))
			sheepMilked = true;	
		if (!fireStarted && Contains(completed, startFire))
			fireStarted = true;
		
		
		if (!isInside && entrance.position.x > transform.position.x)
			isInside = true;
		else if (isInside && entrance.position.x < transform.position.x)
			isInside = false;

		if(currentGoal == null)
		{
			if (!intruderAlert && detected)
			{
				ConfrontPlayer();
				intruderAlert = true;
			}
			
			if (sheepMilked && fireStarted && !hasEaten)
				Eat();
			else if (hasEaten && !hasDrank)
				hasDrank = Drink();
			else if (sheepMilked && fireStarted && hasEaten && hasDrank && dayTime && !isInside)
				Sleep();
			else if (sheepMilked && fireStarted && hasEaten && hasDrank && !dayTime && isInside)
				Sleep();
			else if (sheepMilked && fireStarted && hasEaten && hasDrank && dayTime && isInside)
				chores.Add(exitCave);
		}		
	}
}

function ConfrontPlayer()
{
	pause = true;
	//cutscene sequence
	Debug.Log("Cyclops found Odysseus");
	pause = false;
}

function WineOffer() : boolean
{
	pause = true;
	//cutscene sequence
	Debug.Log("Odysseus offered wine");
	pause = false;
	return true;
}

function Eat()
{
	if (intruderAlert)
		if (intruders.length > 0)
			chores.Add(new Goal_EatIntruder(gameObject, intruders.Pop()));
		else
			chores.Add(new Goal_EatIntruder(gameObject, GameObject.FindGameObjectWithTag("Player")));
	else
		chores.Add(new Goal_EatIntruder(gameObject, sheepController.sheep.Pop()));
}

function Drink() : boolean
{
	
	// move to drinking area first if not already there
	if(Vector3.Distance(transform.position, inside.position) > GetComponent(BoxCollider2D).size.x)
		chores.Add(new Goal_MoveToPosition(inside, transform, this, 0.1));
	
	var container : Container;

	for(var bucket : GameObject in buckets)
	{
			container = bucket.GetComponent(Container);
			if(!container.isEmpty())
			{
				if (container.typeOfDrink == "Wine")
					passedOut = WineOffer();
				chores.Add(new Goal_DrinkBucket(bucket, gameObject));
				return false;
			}
	}		
	return true;
}

function Sleep()
{
	pause = true;
	for (var goal : Goal in completed)
		goal.Reset();
	completed.Clear();
	dayTime = !dayTime;
	sheepMilked = false;
	fireStarted = false;
	consumed = 0;
	hasEaten = false;
	hasDrank = false;
	yield WaitForSeconds(sleepTime);
	AddChores();
	pause = false;
}

function AddChores()
{
	if(!dayTime && !isInside) 
		chores.Add(enterCave);
		
	if(!sheepMilked && !dayTime)
	{
		chores.Add(new Goal_MoveToPosition(inside, transform, this, 0.1));
	 	chores.Add(milkSheep);
	 	chores.Add(moveToPen);
 	}
 	
 	else if (!sheepMilked && dayTime)
 	{
 		chores.Add(moveToMe);
 		chores.Add(milkSheep);
 	}
 	
	if(!fireStarted)
		chores.Add(startFire);
}

function IncreaseDetection(inc : float)
{
	detectionRange *= inc;
}

function Flip()
{
	facingRight = !facingRight;

	var theScale : Vector3 = transform.localScale;
	theScale.x *= -1;
	transform.localScale = theScale;
}

function IsInFront(object : GameObject) : boolean
{
	var height = gameObject.GetComponent(BoxCollider2D).size.y;
	
	var areaInFrontTop : Vector2;
	areaInFrontTop.x = gameObject.transform.position.x;
	areaInFrontTop.y = height/2 + gameObject.transform.position.y;
	
	var areaInFrontBot : Vector2;
	areaInFrontBot.x = inFront.position.x;
	areaInFrontBot.y = gameObject.transform.position.y - height/2;
	 	
	var currentCollisions = Physics2D.OverlapAreaAll(areaInFrontBot, areaInFrontTop);
	Debug.DrawLine(areaInFrontTop, areaInFrontBot);
	
	for (var i = 0; i < currentCollisions.Length; i++) //look for object collider
		if(currentCollisions[i].collider2D == object.GetComponent(BoxCollider2D))
			return true;
	
	return false;
}

function Contains(arr : Array, target : Object)
{
	for (var i in arr)
		if (i == target) return true;
	
	return false;
}

