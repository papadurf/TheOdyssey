var target 		: GameObject;

var drainDMG 	: double;
var drainWait	: int;

var speed 			: double;
var swoopLength 	: double;
var diveAltitude 	: double;
var diveSpeed 		: double;
var attractSpeed 	: float;
var safeDistance 	: double;

var draining 	: boolean;
var charming 	: boolean;
var landed 		: boolean;

var singCooldown 	: int = 10;
var swoopCooldown 	: int = 5;

@HideInInspector var playerTransform 	: Transform;
@HideInInspector var anim 				: Animator;
@HideInInspector var inFront 			: Transform;
@HideInInspector var pickUp				: Transform;
@HideInInspector var landedCheck 		: Transform;
@HideInInspector var facingRight		: boolean;
@HideInInspector var thisTransform 		: Transform;

private var Brain : Goal;
private var Body : GameObject;
// Use this for initialization
function Start() 
{
	Body = gameObject;
	Brain = new Goal_Think(gameObject);
	playerTransform = GameObject.FindGameObjectWithTag("Player").transform;
	facingRight = true;
	inFront = transform.Find("inFront");
	pickUp = transform.Find("pickUpSpot");
	landedCheck = transform.Find("landedCheck");
	anim = GetComponent(Animator);
	thisTransform = GetComponent(Transform);
	toPosition = transform.position + Vector3(swoopLength,0,0);
}

// This function applies a certain amount of damage 
function Drain(player : GameObject)
{
	draining = true;
//	anim.SetTrigger("Drain", true);
//	yield WaitForSeconds(anim.GetCurrentAnimatorStateInfo.length);
	player.SendMessage("Damage", drainDMG);
	draining = false;
}
function FixedUpdate()
{
	Brain.Process();
	
	if (playerTransform.position.x < transform.position.x && facingRight)
		Flip();
	else if (playerTransform.position.x > transform.position.x && !facingRight)
		Flip();	
}


// Update is called once per frame
function Update () 
{

	landed = Physics2D.Linecast(transform.position, landedCheck.position, 1 << LayerMask.NameToLayer("Ground"));  
}

function GetBody() : GameObject {return Body;}

function GetBrain() : Goal_Think {return Brain;}

function Flip()
{
	facingRight = !facingRight;

	var theScale : Vector3 = transform.localScale;
	theScale.x *= -1;
	transform.localScale = theScale;
}

function isInfront(object : GameObject) : boolean
{
	if(inFront)
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
	}
	return false;
}
