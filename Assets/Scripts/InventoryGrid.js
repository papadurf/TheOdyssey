var width : float = 185;
var height : float = 200;
var numSlots : int = 12;
var rows : int = 2;
var cols : int;

var bagName : String = "Set a name for the bag";
var bagBtnName : String = "Bag button name here";
var posBagBtn : Vector2 = Vector2(50,50);//position of the bag button.

var slotSize : float = 40;
var spacingBetweenSlots : float = 5;
var defaultTextureSlot : Texture;
var bagNumber : int;//tell which bag is attached to this transform.

var debug : boolean;
//var bagBtn : GUIStyle;
//var bagSlotBtn : GUIStyle;
//var boxStyle : GUIStyle;

private var offsetBag : int; //this is how much are we going to move the index in the parent's bag array
private var showBag : boolean = false; //shows or not this bag
private var bagPos : Vector2;
private var indexOnController : int;//represents an index for positioning the bag.

private var tmpTexture : Texture;

private var ctrl : PositionController;

function Start(){
	if (numSlots % rows != 0)
	{
		Debug.Log("Error: numSlots must be divisible by rows equally");
		return;
	}
	cols = numSlots / rows;
	ctrl = transform.parent.GetComponent(PositionController);
	bagPos = Vector2((Screen.width + width)/2, (Screen.height + height)/2);
	indexOnController = 0;
}

function OnGUI(){
	if(GUI.Button(Rect(Screen.width	- posBagBtn.x, Screen.height - posBagBtn.y,slotSize,slotSize),bagBtnName)){
		ToggleBag();
	}
	
	if(showBag){
		Bag(bagPos.x, bagPos.y, width, height); 	
	}
}

function ToggleBag(){
	if(showBag){
		HideBag();
	} else {
		ShowBag();
	}
}

function HideBag(){
	showBag = false;
}

function ShowBag(){
	showBag = true;
}

function BagIsBeingDisplayed(){
	return showBag;
}

function Bag(posX : float, posY : float, sX : float, sY : float){
	GUI.BeginGroup(Rect(Screen.width - posX, Screen.height - posY, sX, sY));
	GUI.Box(Rect(0,0,sX,sY), bagName);
	
	for(var i = 0; i < rows; i++){
		for(var j = 0; j < cols; j++){
			if(ctrl.GetObjectsInBag((cols*i)+j) == null){//there's no object in this slot, set the default texture
				tmpTexture = defaultTextureSlot;
			} else {
				tmpTexture = ctrl.GetObjectsInBag(offsetBag+(cols*i)+j).GetComponent(ObjectInfo).iconTexture;//set the object's texture	
			}
			if(Input.GetMouseButtonDown(0)){
				ctrl.SetButtonClicked(false);	
			}
			if(GUI.Button(Rect(10 + slotSize*j + spacingBetweenSlots*(j+1),slotSize*i + spacingBetweenSlots*(i+1) + 30, slotSize, slotSize), tmpTexture))
			{
				if (debug)
					Debug.Log(cols + " * " + i + " + " + j + " = " + ((cols*i)+j));
				if(Event.current.button == 1){//we want to equip the selected slot
					if(ctrl.GetObjectsInBag((cols*i)+j) != null){//the position is not empty
						if(ctrl.GetObjectsInBag((cols*i)+j).GetComponent(Equippable) != null){//the object that is inside the slot is equippable
							if(ctrl.GetObjectEquipped())//if we have an object equipped already
								ctrl.GetObjectEq().GetComponent(Equippable).UnEquipObject();//un equip the object that was equipped.
							ctrl.GetObjectsInBag((cols*i)+j).SetActive(true);
							ctrl.GetObjectsInBag((cols*i)+j).GetComponent(Equippable).EquipObject();
							ReleaseSlot((cols*i)+j);
						}
					}
				} 
//				else {				
//					ctrl.SetButtonClicked(true);
//					if(ctrl.GetObjectsInBag((cols*i)+j) != null){//set a texture to our mouse cursor if we clicked a non-empty slot
//						ctrl.mouseTextureHandler.SetCursor(ctrl.GetObjectsInBag((cols*i)+j).GetComponent(ObjectInfo).iconTexture);
//						ctrl.SetObjAttached(true);
//					} 
//					MoveSlot((cols*i)+j);
//				}
			}
		}
	}
	GUI.EndGroup();
}

function MoveSlot(indSlot : int){
	
	if(ctrl.GetObjectsInBag(indSlot) == null && !ctrl.GetSlotMovedFlag()){//case when we click in a new empty space (we are moving our item to a new one)
		ctrl.SetObjectInBag(indSlot, ctrl.GetObjectsInBag(ctrl.GetLastSlotUsed()));//assign the object to a new slot.
		ReleaseSlot(ctrl.GetLastSlotUsed());
		ctrl.SetSlotMovedFlag(true);
		ctrl.mouseTextureHandler.ReleaseCursorIcon();
		ctrl.SetObjAttached(false);
	} else if(ctrl.GetObjectsInBag(indSlot) != null && ctrl.GetObjectsInBag(ctrl.GetLastSlotUsed()) != null && !ctrl.GetSlotMovedFlag()){//swap two non-empty slots.
		var tmpObj : GameObject = ctrl.GetObjectsInBag(indSlot);
		ctrl.SetObjectInBag(indSlot, ctrl.GetObjectsInBag(ctrl.GetLastSlotUsed()));
		ctrl.SetObjectInBag(ctrl.GetLastSlotUsed(),tmpObj);
		ctrl.SetSlotMovedFlag(true);
		ctrl.mouseTextureHandler.ReleaseCursorIcon();
		ctrl.SetObjAttached(false);
	} else {
		ctrl.SetSlotMovedFlag(false);
	}
	ctrl.SetLastSlotUsed(indSlot);
}

function ReleaseSlot(index : int){
	ctrl.SetObjectInBag(index, null);	
}