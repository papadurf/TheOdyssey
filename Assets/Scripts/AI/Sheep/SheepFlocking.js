#pragma strict

/* following adapted from flocking asset at wiki.unity3d.com */
var Controller : SheepController;

private var inited = false;
private var minVelocity : float;
private var maxVelocity : float;
private var randomness : float;

var pause : boolean = false;

@HideInInspector var chasee : GameObject;

private var clumping : float;

function Start () 
{
	sheepSteering();	
}

function sheepSteering () 
{
	while(true) {
		if (inited && !rigidbody2D.isKinematic) {
			rigidbody2D.velocity = rigidbody2D.velocity + calc() * Time.deltaTime;
			
			// enforce minimum and maximum speeds for the sheep
			var speed = rigidbody2D.velocity.magnitude;
			if (speed > maxVelocity) {
				rigidbody2D.velocity = rigidbody2D.velocity.normalized * maxVelocity;
			} else if (speed < minVelocity) {
				rigidbody2D.velocity = rigidbody2D.velocity.normalized * minVelocity;
			}
		}
	var waitTime = Random.Range(0.3	, 0.5);
	yield WaitForSeconds(waitTime);
	}
}

function calc () 
{
	var randomize 	= Vector3((Random.value *2) -1, 0, 0);
	
	randomize.Normalize();
	randomize *= randomness;
		
	var flockCenter = Controller.flockCenter; 
	var flockVelocity = Controller.flockVelocity;
	var follow = chasee.transform.localPosition;
	
	flockCenter = flockCenter - transform.localPosition;
	flockVelocity = flockVelocity - rigidbody2D.velocity;
	follow = follow - transform.localPosition;
		
	return (flockCenter+flockVelocity+follow*2+randomize);
}

function setController (theController : GameObject) {
		Controller = theController.GetComponent(SheepController);
		minVelocity = Controller.minVelocity;
		maxVelocity = Controller.maxVelocity;
		randomness 	= Controller.randomness;
		chasee 		= Controller.chasee;
		inited 		= true;
}
