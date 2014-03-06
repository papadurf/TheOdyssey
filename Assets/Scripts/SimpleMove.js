#pragma strict

var speed : float = 6.0;
var jumpSpeed : float = 8.0;
var gravity : float = 20.0;

private var moveDirection : Vector2 = Vector2.zero;

function Update() {
	var controller : CharacterController = GetComponent(CharacterController);
	if (controller.isGrounded) {
		// We are grounded, so recalculate
		// move direction directly from axes
		moveDirection = Vector3(Input.GetAxis("Horizontal"), 0);
		moveDirection = transform.TransformDirection(moveDirection);
		moveDirection *= speed;
		
		if (Input.GetButton ("Jump")) {
			moveDirection.y = jumpSpeed;
		}
	}

	// Apply gravity
	moveDirection.y -= gravity * Time.deltaTime;
	
	// Move the controller
	controller.Move(moveDirection * Time.deltaTime);
}
