var mouseTextureHandler : MouseTextureHandling;
var debug : boolean;

private var buttonClicked : boolean = false;//know if a button has been clicked
private var objAttached : boolean = false;//true when an object has been selected from the inventory

private var toggleAllBags : boolean = false;

private var inventory : InventoryGrid;
private var objectsInBag : GameObject[];//represents all the objects in the bag.
private var lastSlotUsed : int = -1;//tell us which was the las slot we clicked
private var slotMovedFlag : boolean = false;// flag to control movement inside the bag array.

private var objectEquipped : boolean;
private var objectEq : GameObject;	//represents the object actually equipped

function Start(){
	objectEq = null;
	objectEquipped = false;
	inventory = transform.FindChild("Inventory").GetComponent(InventoryGrid);
	objectsInBag = new GameObject[inventory.numSlots];
}

function Update(){
	
	if(Input.GetKey(KeyCode.F)){
		if(objectEq != null){
			objectEq.GetComponent(Equippable).UnEquipObject();	
		}
	}
		
	if(Input.GetKeyDown(KeyCode.H)){
		inventory.ToggleBag();
	}
	if(Input.GetMouseButtonUp(0) && !buttonClicked && objAttached){
		ReleaseObjectFromInventory(lastSlotUsed);
		lastSlotUsed = -1;
		objAttached = false;	
	}	
}

function SetObjectEquipped(val : boolean){
	objectEquipped = val;	
}

function GetObjectEquipped(){
	return objectEquipped;	
}

function SetObjectEq(val : GameObject){
	objectEq = val;	
}

function GetObjectEq(){
	return objectEq;	
}

function ReleaseObjectFromInventory(t : int){//releases the object at index t from the inventory.
	objectsInBag[t].SetActive(true);
	objectsInBag[t].transform.parent = null;
	mouseTextureHandler.ReleaseCursorIcon();
	objectsInBag[t] = null;
}

function SaveObjectInInventory(obj : GameObject){
	for(var i : int = 0; i < objectsInBag.length; i++){
		if(objectsInBag[i] == null){
			objectsInBag[i] = obj;
			obj.transform.localPosition = Vector3.zero;
			obj.SetActive(false);
			obj.renderer.enabled = false;
			obj.collider2D.enabled = false;
			obj.transform.parent = transform;
			return;
		}	
	}
	Debug.Log("The inventory is full");
}

function GetObjectsInBag(t : int){
	return objectsInBag[t];	
}
function SetObjectInBag(t : int, obj : GameObject){
	objectsInBag[t] = obj;	
}
function SetLastSlotUsed(t : int ){
	lastSlotUsed = t;	
}
function GetLastSlotUsed(){
	return lastSlotUsed;	
}
function SetSlotMovedFlag(val : boolean){
	slotMovedFlag = val;
}
function GetSlotMovedFlag(){
	return slotMovedFlag;	
}
function GetButtonClicked(){
	return buttonClicked;	
}
function SetButtonClicked(val : boolean){
	buttonClicked = val;	
}
function GetObjectAttached(){
	return objAttached;	
}
function SetObjAttached(val : boolean){
	objAttached = val;	
}