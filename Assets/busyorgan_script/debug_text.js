#pragma strict
DontDestroyOnLoad (gameObject);

var debug_text : TextMesh;
var food_name = "no_food";

function Start () {

}

function Update () {

}

function DebugText(text : String){
	debug_text.text = text;
}

function ChioseFood (obj_name : String){
	food_name = obj_name;
	yield WaitForSeconds(1);
	Application.LoadLevel("main");
}