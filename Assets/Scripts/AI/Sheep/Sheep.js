#pragma strict

var hp : float;
var milkPrefab : GameObject;
var bucket : Container;

@HideInInspector var anim : Animator;
@HideInInspector var dead : boolean = false;
@HideInInspector var facingRight : boolean = true;

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

function Damage(damage : double)
{
	hp -= damage;
	if (hp <= 0)
		Kill();
}

function Flip()
{
	facingRight = !facingRight;
	
	var theScale : Vector3 = transform.localScale;
	theScale.x *= -1;
	transform.localScale = theScale;
}

function Milk()
{
	if (bucket)
		bucket.Fill("Milk");
	else
		Instantiate(milkPrefab, transform.position, transform.rotation);
}

function Kill()
{
	Destroy(gameObject);
}

