#pragma strict
var debug_text : GameObject;
function Start () {

}

function Update () {

}
function OnTriggerEnter2D (coll : Collider2D) {
	if(coll.tag == "food"){
		Debug.Log(coll.name.ToString());
		debug_text.SendMessage("ChioseFood",coll.name.ToString());
	}
}