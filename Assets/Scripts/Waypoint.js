var respawnPoint : Vector2;

function OnCollisionEnter2D(coll: Collision2D)
{
    if(coll.gameObject.tag == "Player")
    {
	coll.gameObject.SendMessage("SetRespawn",respawnPoint);
	Destroy(this);
    }
}
