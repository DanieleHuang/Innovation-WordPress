console.log("JS file has been loaded!");

//Global variables
let toggled_box = 0;
let selected_user = null;
let allCat = {
	0: "uncat",
	12: "accelerator-incubator",
	11: "education-and-handson-learning",
  13: "funding-and-competitions",
	14: "maker-and-collaborative-spaces",
	15: "mentors-and-advisors",
	16: "networking-and-events",
	1: "professional-development",
	17: "projects-and-career",
	10: "students"

}
let allCatList =[12,11,13,14,15,16,17,1,19];
//
let studentCat = [12,11,13,14,15,16,17,19];
let facultyCat = [];
let alumniCat = [];
let personaDict = {
	0: studentCat,
	1: facultyCat,
	2: alumniCat
}
let currentPersona = -1;
let displayedCategories =  allCatList;
//end of globals


//function called every time user clicks on a persona card
function ipResetUserType() {
	document.getElementById("user-type-display").innerHTML = "";
	document.getElementById("student-card").classList.remove("selected");
	document.getElementById("faculty-card").classList.remove("selected");
	document.getElementById("alumni-card").classList.remove("selected");

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

	//display all resources
	displayedCategories = allCatList;
}

//called when a persona card is clicked, calls ipResetUserType to uncheck
//all boxes
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
	let all_tiles = "ip-allresources-div";
	if (type == "Students") {
		typeDiv = "ip-students-div";
		currentPersona= 0;
		document.getElementById("student_boxes").classList.remove("ip-hidden");
	} else if (type == "Faculty & Staff") {
		typeDiv = "ip-faculty-div";
		currentPersona = 1;
		document.getElementById("faculty_boxes").classList.remove("ip-hidden");

	} else {
		typeDiv = "ip-alumni-div";
		currentPersona = 2;
		document.getElementById("alumni_boxes").classList.remove("ip-hidden");
	}

	selected_user = typeDiv;
  displayedCategories = personaDict[currentPersona];
  console.log(displayedCategories);
	apiTest();
	//ipShowAllCategories();
}


//might not be needed
function ipHideAllCategories() {
	displayedCategories = [];
}

function ipShowAllCategories(){
	console.log(`current persona ${currentPersona}`);
	displayedCategories = personaDict[currentPersona];
}

//need further investigation
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

// check if any cats are hidden, maybe check if any box has been checked
function ipAllCatsHidden() {
	if (displayedCategories == null)
		return true;
	return displayedCategories.length ==0 ;
}

function ipToggleCategory(category) {
	/*if (document.getElementById("ip-resource-div").classList.contains("ip-all-shown")) {
		ipHideAllCategories();
	}*/
 console.log(category);

	if ( ! document.getElementById("ip-" + allCat[category] + "-box").checked) {
		displayedCategories = displayedCategories.filter(function remCat(cat) {
			//remove from list
			return cat != category;
		});
		toggled_box -=1;
	} else {
		toggled_box+=1;
	}

	if (toggled_box == 0){
		ipShowAllCategories();
		console.log(`length ${displayedCategories.length} `);
	}
	else if ( toggled_box == 1){
		displayedCategories = [category];
	}
	else{
		displayedCategories.push(category);

	}

	apiTest();

}

function apiTest(){
	//if (ipAllCatsHidden()){

		//cleanup everytime it's called
		let resources = document.getElementsByClassName("resource_tile");
		let tot = resources.length;
		for(i=0;i<tot;i++){
			resources[0].remove()
		}

	//}
	let categories = displayedCategories[0];
	for (i = 1; i< displayedCategories.length; i++)
		categories = categories + "," + displayedCategories[i];
  console.log(`displayedCat ${displayedCategories.length}: ${categories}`);
		let request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			console.log(request.statusText);
	    	if (this.readyState == 4 && this.status == 200) {
	       		// Typical action to be performed when the document is ready:
	       		console.log(categories);
				let posts = JSON.parse(request.responseText);
				console.log(posts);

				let div = document.getElementById("ip-allresources-div");

				for(i=0; i<posts.length; i++){
					let tile = document.createElement("div");
					let tile_img = document.createElement("img");
					//doesn't work for some reason
					//tile_img.src = posts[i]._links['wp:featuredmedia']["0"]["href"];
					tile_img.src = posts[i].better_featured_image.source_url;
					console.log(posts[i]._links['wp:featuredmedia']["0"]["href"]);
					let p = document.createTextNode(posts[i].title.rendered);
					tile.appendChild(tile_img);
					tile.appendChild(p);
					tile.classList+="resource_tile";
					div.appendChild(tile);
				}
				
			}else{
				console.log("Bad request!")
			}
		};
		//TODO change this
		let content =  "/Innovation-WordPress/wp-json/wp/v2/posts?categories=" + categories + "&per_page=50&_embed";
		console.log(`Content: ${content}`);
		request.open("GET",content);
		request.send();
	}
