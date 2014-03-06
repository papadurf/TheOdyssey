#pragma strict

var detectionBuffer : double;
var currentGoal : Goal;
var speed : double;

@HideInInspector
var inFront : Transform;
@HideInInspector
var facingRight : boolean;
@HideInInspector
var thisTransform : Transform;
@HideInInspector
var thisCollider : BoxCollider2D;
@HideInInspector
var intruderAlert : boolean = false;

function Awake()
{
	facingRight = true;
	inFront = transform.Find("inFront");
 	thisTransform = transform;
 	thisCollider = GetComponent(BoxCollider2D);
}

function Start () 
{
/* EnterCave Test */	
	currentGoal = new Goal_EnterCave(GameObject.Find("boulder"), gameObject,
									 GameObject.Find("entrance").transform.position,
									 GameObject.Find("inside").transform.position);

/* StartFire Test */									 
//	currentGoal = new Goal_StartFire(this,GameObject.Find("firepit"));

}

function Update () 
{
	if (currentGoal)
	{
		if (!currentGoal.isCompleted())
			currentGoal.Process();
		else
			currentGoal = null;
	}
}

function IncreaseDetection(inc : float)
{
	detectionBuffer += inc;
}

function Flip()
{
	facingRight = !facingRight;
	
	var theScale : Vector3 = transform.localScale;
	theScale.x *= -1;
	transform.localScale = theScale;
}