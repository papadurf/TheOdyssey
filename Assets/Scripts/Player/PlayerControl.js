@HideInInspector
var facingRight : boolean = true;			// For determining which way the player is currently facing.
@HideInInspector
var jump : boolean = false;				// Condition for whether the player should jump.

var moveForce : float = 365f;			// Amount of force added to move the player left and right.
var maxSpeed : float = 5f;				// The fastest the player can travel in the x axis.

var jumpForce : float = 1000f;			// Amount of force added when the player jumps.

private var groundCheck : Transform;			// A position marking where to check if the player is grounded.
private var grounded : boolean = false;			// Whether or not the player is grounded.
private var anim : Animator;					// Reference to the player's animator component.


function Awake()
{
	// Setting up references.
	groundCheck = transform.Find("groundCheck");
	anim = GetComponent(Animator);
}


function Update()
{
	// The player is grounded if a linecast to the groundcheck position hits anything on the ground layer.
	grounded = Physics2D.Linecast(transform.position, groundCheck.position, 1 << LayerMask.NameToLayer("Ground"));  

	// If the jump button is pressed and the player is grounded then the player should jump.
	if(Input.GetButtonDown("Jump") && grounded)
		jump = true;
}


function FixedUpdate ()
{
	// Cache the horizontal input.
	var h : float = Input.GetAxis("Horizontal");

	// The Speed animator parameter is set to the absolute value of the horizontal input.
	anim.SetFloat("Speed", Mathf.Abs(h));

	// If the player is changing direction (h has a different sign to velocity.x) or hasn't reached maxSpeed yet...
	if(h * rigidbody2D.velocity.x < maxSpeed)
		// ... add a force to the player.
		rigidbody2D.AddForce(Vector2.right * h * moveForce);

	// If the player's horizontal velocity is greater than the maxSpeed...
	if(Mathf.Abs(rigidbody2D.velocity.x) > maxSpeed)
		// ... set the player's velocity to the maxSpeed in the x axis.
		rigidbody2D.velocity = new Vector2(Mathf.Sign(rigidbody2D.velocity.x) * maxSpeed, rigidbody2D.velocity.y);

	// If the input is moving the player right and the player is facing left...
	if(h > 0 && !facingRight)
		// ... flip the player.
		Flip();
	// Otherwise if the input is moving the player left and the player is facing right...
	else if(h < 0 && facingRight)
		// ... flip the player.
		Flip();

	// If the player should jump...
	if(jump)
	{
		// Set the Jump animator trigger parameter.
		anim.SetTrigger("Jump");

		// Add a vertical force to the player.
		rigidbody2D.AddForce(new Vector2(0f, jumpForce));

		// Make sure the player can't jump again until the jump conditions from Update are satisfied.
		jump = false;
	}
}


function Flip ()
{
	// Switch the way the player is labelled as facing.
	facingRight = !facingRight;

	// Multiply the player's x local scale by -1.
	var theScale : Vector3 = transform.localScale;
	theScale.x *= -1;
	transform.localScale = theScale;
}