function Start(){
	transform.GetComponent(GUITexture).enabled = false;	
}

function Update(){
	transform.position = Vector3(Input.mousePosition.x/Screen.width, Input.mousePosition.y/Screen.height,0);	
}

function ReleaseCursorIcon(){//empties the cursor icon and shows the mouse icon
	transform.GetComponent(GUITexture).enabled = false;
	Screen.showCursor = true;
}

function SetCursor(t : Texture){
	transform.GetComponent(GUITexture).texture = t;
	transform.GetComponent(GUITexture).enabled = true;
	Screen.showCursor = false;	
}