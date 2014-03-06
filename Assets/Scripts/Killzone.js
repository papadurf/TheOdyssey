

function OnTriggerEnter(other : Collider)
{
	if (other.gameObject.tag == "Player")
	{
		var playerStatus : PlayerStatus = other.GetComponent(PlayerStatus);
		playerStatus.Damage(playerStatus.GetHealth());
		Destroy(FindObjectOfType(CameraFollow));
	}
}