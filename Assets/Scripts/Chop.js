var chopDmg : int;

private var object : GameObject;

function Start()
{
	object = null;
}

function OnTriggerEnter2D(col : Collider2D)
{
	if(col && col.gameObject.tag == "Destructible")
		object = col.gameObject;	
}

function OnTriggerExit2D(col : Collider2D)
{
	if(col.gameObject.tag == "Destructible")
		object = null;
}

function Update () {
	if(transform.GetComponent(Equippable).isEquipped())
	{
		transform.gameObject.collider2D.enabled = true;
		if(object && Input.GetKeyDown(KeyCode.X))
		{
			if(object.GetComponent(TreeCol))
			{
				object.GetComponent(TreeCol).Damage(chopDmg);
			}
		}
	}
}