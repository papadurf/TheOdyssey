var equipPosition : Vector3 = Vector3.zero;
var equipScale 	  : Vector3 = Vector3.one;
var equipRotation : Vector3 = Vector3.zero;

private var inv : PositionController;
private var equipped : boolean;


function Start(){
	equipped = false;
	inv = transform.GetComponent(ObjectInfo).inventory.transform.GetComponent(PositionController);
}

function UnEquipObject(){
	equipped = false;
	inv.SetObjectEquipped(false);
	inv.SetObjectEq(null);
	inv.SaveObjectInInventory(transform.gameObject);
}

function EquipObject(){
	equipped = true;
	inv.SetObjectEq(transform.gameObject);
	inv.SetObjectEquipped(true);
	transform.renderer.enabled = true;
	transform.position = transform.GetComponent(ObjectInfo).inventory.transform.position;
	transform.parent = transform.GetComponent(ObjectInfo).inventory.transform.parent;
	transform.localPosition = equipPosition;
	transform.localScale = equipScale;
	transform.localEulerAngles = equipRotation;
}

function isEquipped(){
	return equipped;	
}
function SetIsEquipped(val : boolean){
	equipped = val;
}