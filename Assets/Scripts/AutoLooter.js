var inventory : PositionController;

function OnTriggerEnter2D(other : Collider2D){
	if(other.transform.GetComponent(ObjectInfo) != null){
		if(!other.transform.GetComponent(Equippable).isEquipped()){
			inventory.SaveObjectInInventory(other.transform.gameObject);
		}	
	}
}