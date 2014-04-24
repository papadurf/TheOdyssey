#pragma strict

/*This script controls the behavior of the flock of sheep
* by defining the parameters of
* 	- target of which to flock around
* 	- prefab of the sheep
* 	- min/max velocity for each sheep
* 	- size of the flock
*/

/* following adapted from flocking asset at wiki.unity3d.com */
var minVelocity : float;
var maxVelocity : float;
var randomness : float;
var flockSize : int;
var prefab : GameObject; 
var chasee : GameObject;

var flockCenter : Vector3;
var flockVelocity : Vector3;

var bucket : Container;

@HideInInspector
var sheep : Array;

function Awake()
{
	sheep = new Array();
	for (var i=0; i<flockSize; i++) 
	{
		var position = transform.position;
		var newSheep = Instantiate(prefab, transform.position, transform.rotation) as GameObject;
		newSheep.transform.parent = transform;
		newSheep.transform.localPosition = position;
		var flocking = newSheep.GetComponent(SheepFlocking);
		var script = newSheep.GetComponent(Sheep);
		script.bucket = bucket;
		flocking.setController(gameObject);
		sheep.Add(newSheep);
	} 
}

function Update()
{
	var theCenter = Vector3.zero;
   	var theVelocity = Vector3.zero;
   	for (var s : GameObject in sheep) {
		theCenter       = theCenter + s.transform.localPosition;
		theVelocity     = theVelocity + s.rigidbody2D.velocity;
   	}
	flockCenter = theCenter/(flockSize);	
	flockVelocity = theVelocity/(flockSize);
}

function SetChasee(tar : GameObject)
{
	for (var s : GameObject in sheep)
	{
		var flocking : SheepFlocking = s.GetComponent(SheepFlocking);
		flocking.chasee = tar;
	}
}

