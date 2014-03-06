#pragma strict

var lit : boolean; // only state variable for this object
var detectionIncreaseAmount : float;

@HideInInspector
var anim : Animator;

function Start () {
	lit = false;
	anim = gameObject.GetComponent(Animator);
}

function Update () {
	//TODO either decay over time or create a function to put out fireplace
}

function Light()
{
	lit = true;
	var cyclops = GameObject.Find("Cyclops");
	cyclops.SendMessage("IncreaseDetection", detectionIncreaseAmount);
	anim.SetBool("lit", lit); //activate animation
}