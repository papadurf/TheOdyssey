var priority : int;

function GetPosition() : Vector3
{
	return transform.position;
}

function Complete()
{
	Destroy(this);
}