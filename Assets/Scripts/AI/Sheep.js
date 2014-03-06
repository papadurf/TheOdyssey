#pragma strict

@HideInInspector
var anim : Animator;

@HideInInspector
var facingRight : boolean = true;

function Start () 
{
	anim = gameObject.GetComponent(Animator);
}

function FixedUpdate()
{
	if (rigidbody2D.velocity.x > 0.25 && !facingRight)
		Flip();
	else if (rigidbody2D.velocity.x < -0.25 && facingRight)
		Flip();
}

function Flip()
{
	facingRight = !facingRight;
	
	var theScale : Vector3 = transform.localScale;
	theScale.x *= -1;
	transform.localScale = theScale;
}