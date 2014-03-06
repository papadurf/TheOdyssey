private var gravity : Vector2 = Vector2.up * -9.81;
private var moving : boolean;

function Start()
{
	moving = true;
	Destroy(gameObject, 5);
}

function FixedUpdate()
{
	if(moving)
	{
		if (transform.rigidbody2D.velocity.x < 0)
			transform.right = Vector3.Slerp(transform.right, rigidbody2D.velocity.normalized, Time.deltaTime);
		else
			transform.up = Vector3.Slerp(transform.up, rigidbody2D.velocity.normalized, Time.deltaTime);
	}
}

function OnCollision2D(col : Collision2D)
{
	if(col.gameObject.tag != "Projectile")
	{
		moving = false;
		transform.gameObject.collider2D.enabled = false;
	}
//	if(col.collisionObject.tag == "Hostile") {}	// TODO: apply damage to hostiles
}
