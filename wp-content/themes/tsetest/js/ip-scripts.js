console.log("Success!");

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

	let typeClass;
	let typeBox;
	if (type == "Students") {
		typeClass = "ip-st-cat";
		typeBox= "student_boxes";
	} else if (type == "Faculty & Staff") {
		typeClass = "ip-fc-cat";
		typeBox = "faculty_boxes";
	} else {
		typeClass = "ip-al-cat";
		typeBox = "alumni_boxes";
	}
	console.log(typeBox);
	document.getElementById(typeBox).classList.remove("ip-hidden");
	let catStuff = document.getElementsByClassName(typeClass);
	let i;
	for (i = 0; i < catStuff.length; i++) {
		catStuff[i].classList.remove("ip-hidden");
	}

	ipShowAllCategories();
}

function ipShowAllCategories() {
	let cats = document.getElementsByClassName("ip-resource-cat");
	let i;
	for (i = 0; i < cats.length; i++) {
		cats[i].classList.remove("ip-hidden");
	}
	document.getElementById("ip-resource-div").classList.add("ip-all-shown");
}

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
	let cats = document.getElementsByClassName("ip-resource-cat");
	let i;
	for (i = 0; i < cats.length; i++) {
		if (cats[i].classList.contains("ip-hidden") == false) {
			return false;
		}
	}
	return true;
}

function ipToggleCategory(category) {
	if (document.getElementById("ip-resource-div").classList.contains("ip-all-shown")) {
		ipHideAllCategories();
	}

	if (document.getElementById("ip-" + category + "-box").checked == true) {
		document.getElementById("ip-" + category + "-div").classList.remove("ip-hidden");
	} else {
		document.getElementById("ip-" + category + "-div").classList.add("ip-hidden");
	}

	if (ipAllCatsHidden() == true) {
		ipShowAllCategories();
	}
}
