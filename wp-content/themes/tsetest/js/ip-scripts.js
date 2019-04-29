console.log("Success!");
let toggled_box = 0;
let selected_user = null;
function ipResetUserType() {
	document.getElementById("user-type-display").innerHTML = "";
	document.getElementById("ip-student-type").classList.remove("selected");
	document.getElementById("ip-faculty-type").classList.remove("selected");
	document.getElementById("ip-alumni-type").classList.remove("selected");

	let topics = document.getElementsByClassName("ip-cat-boxes");
	let i;
	//hide all check box lists
	for (i = 0; i < topics.length; i++) {
		topics[i].classList.add("ip-hidden");
	}

	//for "what are you looking for"
	let UX_elements = document.getElementsByClassName("ident-topic");
	for (i = 0; i < UX_elements.length; i++) {
		UX_elements[i].classList.remove("ip-hidden");
	}

  //uncheck all boxes
	let boxes = document.getElementsByClassName("ip-cat-box");
	for (i = 0; i < boxes.length; i++) {
		boxes[i].checked = false;
	}

	//hide all tiles
	let tiles = document.getElementsByClassName("ip-resource-tiles");
	for (i=0; i< tiles.length;i++){
		tiles[i].classList.add("ip-hidden");
	}

}

function ipUpdateUserType(type, currentId) {
	//if this persona has already been checked
	if (document.getElementById(currentId).classList.contains("selected")) {
		return;
	}

	//reset all before displaying
	ipResetUserType();
	document.getElementById("user-type-display").innerHTML = type;
	document.getElementById(currentId).classList.add("selected");

	let typeDiv;
	let typeBox;
	let all_tiles = "ip-allresources-div";
	if (type == "Students") {
		typeDiv = "ip-students-div";
		typeBox= "student_boxes";
	} else if (type == "Faculty & Staff") {
		typeDiv = "ip-faculty-div";
		typeBox = "faculty_boxes";
	} else {
		typeDiv = "ip-alumni-div";
		typeBox = "alumni_boxes";
	}

	selected_user = typeDiv;

	//hide all tiles
  document.getElementById(all_tiles).classList.add("ip-hidden");
	//show only boxes related to selected persona
	document.getElementById(typeBox).classList.remove("ip-hidden");
	//show all tiles related to selected persona
	document.getElementById(typeDiv).classList.remove("ip-hidden");

	//ipShowAllCategories();
}

/*function ipShowAllCategories() {
	let cats = document.getElementsByClassName("ip-resource-cat");
	let i;
	for (i = 0; i < cats.length; i++) {
		cats[i].classList.remove("ip-hidden");
	}
	document.getElementById("ip-resource-div").classList.add("ip-all-shown");
}*/

function ipHideAllCategories() {
	let cats = document.getElementsByClassName("ip-resource-cat");
	let boxes = document.getElementsByClassName("ip-cat-box");
	let i;
	for (i = 0; i < cats.length; i++) {
		cats[i].classList.add("ip-hidden");
	}
	document.getElementById("ip-resource-div").classList.remove("ip-all-shown")
}

function ipAllCatsShown() {
	let cats = document.getElementsByClassName("ip-resource-cat");
	let i;
	for (i = 0; i < cats.length; i++) {
		if (cats[i].classList.contains("ip-hidden") == true) {
			return false;
		}
	}
	return true;
}

function ipAllCatsHidden() {
	let cats = document.getElementsByClassName("ip-resource-tiles");
	let i;
	for (i = 0; i < cats.length; i++) {
		if (cats[i].classList.contains("ip-hidden") == false) {
			return false;
		}
	}
	return true;
}

function ipToggleCategory(category) {
	/*if (document.getElementById("ip-resource-div").classList.contains("ip-all-shown")) {
		ipHideAllCategories();
	}*/
 console.log(category);
	//fix hardcode TODO
	if (document.getElementById("ip-" + category + "-box").checked == true) {
		document.getElementById("ip-stud-" + category  ).classList.remove("ip-hidden");
		toggled_box += 1;
	} else {
		document.getElementById("ip-stud-" + category ).classList.add("ip-hidden");
		toggled_box -=1;
	}
	if(toggled_box > 0){
			document.getElementById(selected_user).classList.add("ip-hidden");
	}else{
		document.getElementById(selected_user).classList.remove("ip-hidden");
	}
	/*if (ipAllCatsHidden() == true) {
		ipShowAllCategories();
	}*/
}
