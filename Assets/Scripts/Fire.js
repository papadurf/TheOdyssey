var speed : int;
var angleScale : float;
var angle : Vector3;

var rateOfFire : float = 1.5f;
var pullTime : float = 0.5f;
var maxStrengthPullTime : float = 1.5f;

var arrow : Rigidbody2D;

private var falsePull : boolean = false;
private var maxAngle : float = 90;
private var offset : Vector3 = new Vector3(0,0,90);
private var nextFire : float = 0.0f;
private var pullStartTime : float = 0.0f;

function Start()
{
	angle = Vector3.zero;
}

function Update()
{
	if (transform.GetComponent(Equippable).isEquipped())
	{ 
		if (Input.GetKey(KeyCode.X))
		{
//			if (Time.time > nextFire)
//			{
//				nextFire = Time.time + rateOfFire;
//				pullStartTime = Time.time;
//			}
//			else
//				falsePull = true;
		
			if (angle.z < maxAngle);
				if (angle.z + angleScale > maxAngle)
					angle.z = maxAngle;
				else
					angle.z += angleScale;
		}
	    if (Input.GetKeyUp(KeyCode.X))
	    {	
//	    	if (!falsePull)
//			{
//	    		nextTime = Time.time + pullTime;
//	    		
//	    		var timePulledBack = Time.time - pullStartTime;
//	    		if (timePulledBack > maxStrengthPullTime)
//	    			timePulledBack = maxStrengthPullTime;
//	    			
				var theta = Mathf.Deg2Rad * angle.z;
		    	var nArrow : Rigidbody2D = Instantiate(arrow, transform.position, arrow.transform.rotation);
		    	if (transform.parent.gameObject.GetComponent(PlayerControl).facingRight)
		    	{
		    		angle = angle + offset + transform.eulerAngles;
		    		nArrow.transform.localEulerAngles = angle;
		    		nArrow.velocity = Vector2(Mathf.Cos(theta) * speed, Mathf.Sin(theta) * speed);
	    		}
	    		else
	    		{
	    			angle = transform.eulerAngles - angle - offset;
	    			nArrow.transform.localEulerAngles = angle;
	    			nArrow.velocity = Vector2(Mathf.Cos(theta) * -speed, Mathf.Sin(theta) * speed);
				}	
		    	angle = Vector3.zero;
//			}
//			else
//				falsePull = false;
	    }
    }
}
