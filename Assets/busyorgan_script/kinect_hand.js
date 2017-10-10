
var KinectHand : GameObject;
var KinectBody : GameObject;
var GetMouse : boolean;
var Hand_Sprite : Sprite[];
var Hand_SpriteRenderer : SpriteRenderer;
var debug_text : GameObject;

private var X : float = 8;
private var Y : float = 6;
private var Kinect : boolean = true;
private var Kinect_Z : boolean = false;
private var Hand_Catched : boolean = false;
private var Hand_Catched_one : boolean = false;
private var Food_Obj_Name = "no_food";



function Start () {
	Hand_SpriteRenderer.sprite = Hand_Sprite[0];
}

function FixedUpdate () {	
	var CameraX : float = GameObject.Find("Camera_Main").transform.position.x;
	var CameraY : float = GameObject.Find("Camera_Main").transform.position.y;
	var Kinect_Z_des = KinectHand.gameObject.transform.position.z-KinectBody.gameObject.transform.position.z;
	debug_text.SendMessage("DebugText",Food_Obj_Name+"\n"+"DebugText"+"hand:"+KinectHand.gameObject.transform.position.z.ToString()+"\n"+"Body:"+KinectBody.gameObject.transform.position.z.ToString());

	if( Kinect ) {
		gameObject.transform.position.x = KinectHand.gameObject.transform.position.x;
		gameObject.transform.position.y = KinectHand.gameObject.transform.position.y;
		if(Kinect_Z_des>4){
			Kinect_Z = true;
			Hand_SpriteRenderer.sprite = Hand_Sprite[1];
		}else{
			Kinect_Z = false;
			Hand_SpriteRenderer.sprite = Hand_Sprite[0];
		}
	}
	
	if( !Kinect && GetMouse ) {
		gameObject.transform.position.x = CameraX + ( Input.mousePosition.x - Screen.width*0.5 ) * ( 1000000 / Screen.width * 0.000001 * X*2 );
		gameObject.transform.position.y = CameraY + ( Input.mousePosition.y - Screen.height*0.5 ) * ( 1000000 / Screen.height * 0.000001 * Y*2 );
	}
}

function OnMouseDown () {
	Hand_Catched = true;
	if(Hand_Catched) {
		Hand_SpriteRenderer.sprite = Hand_Sprite[1];
	}
}

function OnMouseUp () {
	Hand_Catched = false;
	if(!Hand_Catched) {
		Hand_SpriteRenderer.sprite = Hand_Sprite[0];
		Food_Obj_Name = "no_food";
	}
}

function OnTriggerEnter2D (coll : Collider2D) {
	if(!Kinect && coll.gameObject.tag == "food" && !Hand_Catched){
		Food_Obj_Name = coll.gameObject.name;
	}
	if(Kinect && coll.gameObject.tag == "food" && !Kinect_Z){
		Food_Obj_Name = coll.gameObject.name;
	}
}

function OnTriggerStay2D (coll : Collider2D) {
	if(coll.gameObject.name == Food_Obj_Name && Hand_Catched){
		coll.gameObject.transform.position.x = gameObject.transform.position.x;
		coll.gameObject.transform.position.y = gameObject.transform.position.y;
	}
	if(coll.gameObject.name == Food_Obj_Name && Kinect_Z){
		coll.gameObject.transform.position.x = gameObject.transform.position.x;
		coll.gameObject.transform.position.y = gameObject.transform.position.y;
	}
}

//function OnTriggerExit2D (coll : Collider2D){
//	if(coll.gameObject.name != "no_food" && Kinect_Z){
//		Food_Obj_Name = "no_food";
//	}
//}


function OnGUI () {
	if( GetMouse )
		Kinect = GUI.Toggle( Rect( 50, Screen.height-30, 100, 30 ), Kinect, "Kinect" );
}