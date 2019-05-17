console.log("JS file has been loaded!");

//Global variables
let toggled_box = 0;
let selected_user = null;
let allCat = {
	10: "students",
	11: "education-and-handson-learning-st",
	12: "accelerator-st",
  13: "funding-and-competitions",
	14: "maker-and-collaborative-spaces",
	15: "mentors-and-advisors",
	16: "networking-and-events-st",
	17: "projects-and-career",


	//faculty
	20: "faculty",
	21: "funding-and-competitions-fc",
	23: "consulting",
	24: "technology",
	26: "clinical-trial-resources-fc",
	35: "networking-and-events-fc",
	36: "education-and-handson-learning-fc",
	37: "accelerator-fc",
	//alumni
	27: "alumni",
	28: "start-business",
	30: "mentor-volunteer",
	31: "showcases-competition",
	32: "recruit",
	33: "investor",
	34: "networking-and-events-al"
	//15: "investor-opportunities",
	//16: "mentor-and-volunteer",
	//17: "recruit-for-your-company",
	//18: "start-a-business",
	//19: "showcases-competitions",

}
let allCatList =[10,11,12,13,14,15,16,17,20,21,23,24,26,36,37,27,28,30,31,32,33,34];
//
let studentCat = [11,12,13,14,15,16,17]
let facultyCat = [21,23,24,26,36,37];
let alumniCat = [28,30,31,32,33,34];
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
	toggled_box = 0;
  console.log(displayedCategories);
	apiTest();
	//ipShowAllCategories();
}




//handles check boxes toggling
function ipToggleCategory(category) {

	let add = 0;
	if ( ! document.getElementById("ip-" + allCat[category] + "-box").checked) {
    add=0;
		toggled_box -=1;

	} else {
		add=1
		toggled_box+=1;
		displayedCategories.push(category);

	}
	console.log(`Adding? ${add}`)
  ipShowResources(category, add);


}
//display all resources under one persona
function ipShowResources(category, add){
	//console.log(`box: ${toggled_box}`);
	//if all boxes unchecked
	if(!add){
		if (toggled_box == 0){
			//console.log(`current persona ${currentPersona}`);
			let resources = document.getElementsByClassName('resource_tile');
			for(i=0; i< resources.length; i++){
				resources[i].classList.remove("ip-hidden");
			}

			displayedCategories = personaDict[currentPersona];
			//console.log(`length ${displayedCategories.length} `);
		}
		//if more are showing
		else{
			//remove from list and hide

			displayedCategories = displayedCategories.filter(cat=> cat!=category);
      let hideResource = document.getElementsByClassName('cat-'+category);
			//console.log(`categories shown: ${displayedCategories.length}`)
			for(i=0; i<hideResource.length;i++)
					hideResource[i].classList.add("ip-hidden");


		}
	}
	//if we checked a box
	else{
		//special case when only one category is selected
		if( toggled_box==1){
			//hide all
			ipHideAllCategories();
			//display only one
			displayedCategories = [category];
		}



	//	console.log(`categories shown: ${displayedCategories.length}`)
		for(i=0; i<displayedCategories.length;i++){
			let resources = document.getElementsByClassName('cat-'+displayedCategories[i]);
	//		console.log(`cat: ${displayedCategories[i]} has: ${resources.length}`);
			for( j =0;j< resources.length; j++){
				resources[j].classList.remove("ip-hidden");
			}
		}
	}



}

//hide everything
function ipHideAllCategories() {
	displayedCategories = [];
	let resources = document.getElementsByClassName('resource_tile');
	for(i=0; i< resources.length; i++){
		resources[i].classList.add("ip-hidden");
	}
}
// check if any cats are hidden, maybe check if any box has been checked
function ipAllCatsHidden() {
	if (displayedCategories == null)
		return true;
	return displayedCategories.length ==0 ;
}



function apiTest(){
    //if (ipAllCatsHidden()){

        //cleanup everytime it’s called
        let resources = document.getElementsByClassName('resource_tile');
        let tot = resources.length;
        for(i=0;i<tot;i++){
            resources[0].remove()
        }

    //}
    let categories = displayedCategories[0];

    for (i = 1; i< displayedCategories.length; i++)
        categories = categories + ',' + displayedCategories[i];
 		//console.log(`displayedCat ${displayedCategories.length}: ${categories}`);
        let request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            console.log(request.statusText);
            if (this.readyState == 4 && this.status == 200) {
				// Typical action to be performed when the document is ready:
				console.log(categories);
                let posts = JSON.parse(request.responseText);
                //console.log(posts);

                let div = document.getElementById('ip-allresources-div');

                for(i=0; i<posts.length; i++){
                    let a = document.createElement('a');
                    let p = document.createElement('p');
                    let d = document.createElement('div');
                    let tile_img = document.createElement('img');
										//add category class id to each tile
										for(j =0; j<posts[i].categories.length; j++){
											a.classList.add('cat-'+posts[i].categories[j]);
										}
                    //doesn’t work for some reason
                    //tile_img.src = posts[i]._links[‘wp:featuredmedia’][“0”][“href”];
                    tile_img.src = posts[i].better_featured_image.source_url;
                    p.innerHTML = posts[i].title.rendered;
                    a.appendChild(tile_img);
                    a.appendChild(d);
                    d.appendChild(p);
                    a.classList.add('resource_tile');
                    a.classList.add('resource');
                    tile_img.classList.add("resource-img");
                    d.classList.add('overlay');
                    a.href= posts[i].link;
                    div.appendChild(a);
                }

            }
        };
        //TODO change this
        let content =  '/Innovation-WordPress/wp-json/wp/v2/posts?categories=' + categories + '&per_page=100&_embed';
        request.open('GET',content);
        request.send();

}
