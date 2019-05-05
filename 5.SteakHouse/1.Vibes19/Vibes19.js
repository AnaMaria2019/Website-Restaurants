var nr_click_search_icon = 0;
let slideIndex = 0;
var afisare = [];

var timer = 0;
var delay = 200;	
var prevent = false;

var types = [];

var patrickIsMoving = false;

window.onload = function (){
	slide_show();
	setInterval(slide_show, 3000);

	var div = document.getElementsByClassName("flex");

	for(var i = 0; i < div.length; i++)
	{
		for(var j = 0; j < div[i].childNodes.length; j++)
			if(div[i].childNodes[j].tagName == "DIV")
			{
				afisare.push(div[i].childNodes[j]); //in afisare se regasesc toate elementele cu clasa .afisare din fiecare div cu clasa .flex
				afisare.push(div[i].parentNode.childNodes[0].nextSibling);
			}
	}

//input-range
	var range = document.getElementById("input_range");
	range.addEventListener("change", sort);

	var div_range = document.getElementById("range");
	var span = document.createElement("span");
	span.id = "nr_range";
	span.style.fontSize = "1.3rem";
	span.style.fontFamily = "'Playfair Display', serif";
	span.innerHTML = "Price: 150";
	div_range.insertBefore(span, div_range.childNodes[0]);

	var header = document.getElementById("myheader");
	var sticky = header.offsetTop;

	window.onscroll = function(){
		if (window.pageYOffset > sticky){
		   	header.classList.add("sticky");
		}
		else{
		    header.classList.remove("sticky");
		}

		mymove();
	}
//input-range
	
	var name_restaurant = document.getElementsByTagName("H1");
	name_restaurant[0].addEventListener("click", show_link);
	name_restaurant[0].addEventListener("dblclick", hide_link);

	radio_input();
	checkbox_input();
	select_input();
	//textarea_input();

	var divuri_types = document.querySelectorAll("#types > div");

	for(var i = 0; i < divuri_types.length; i++)
		types.push(divuri_types[i]);
}

function slide_show(){
	const s = document.getElementsByClassName("myslides");
	const dots = document.getElementsByClassName("dot");

	for(let i = 0; i < s.length; i++){
		s[i].style.display = "none";
	}

	slideIndex++;

	if(slideIndex > s.length){
		slideIndex = 1;
	}

	for(let j = 0; j < dots.length; j++)
		dots[j].className = dots[j].className.replace(" active", "");

	s[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " active";
}

function GoBack(){
	window.history.back();
}

function SearchBar(){

	if(nr_click_search_icon == 0){
		var input = document.createElement("input");
		input.type = "text";
		input.placeholder = "Search the restaurant";
		input.id = "myInput";
		input.style.float = "right";
		input.style.border = "0";
		input.style.outline = "0";
		input.style.opacity = "0.7";
		
		var div = document.getElementById("search");
		div.style.borderBottom = "1px solid gray";
		div.style.borderBottomLeftRadius = "50px 20px";
		div.appendChild(input);
		input.addEventListener("keypress", searchRestaurant);
		nr_click_search_icon = 1;
	}
	else
	{
		var inp = document.getElementById("myInput");
		inp.parentNode.removeChild(inp);

		var div = document.getElementById("search");
		div.style.borderBottom = "0";
		div.style.borderBottomLeftRadius = "0";
		nr_click_search_icon = 0;
	}
}

function searchRestaurant(e){
	var cod_tasta = e.charCode?e.charCode:e.keyCode;

	if(cod_tasta == 13){
		var val = document.getElementById("myInput").value;
		var restaurante = ["Vibes19", "Osho", "Vacamuuu", "Barbizon", "Antricot", "Beef Room", "Prime Steak&Seafood", "Red Angus"];

		for(var i = 0; i < restaurante.length; i++)
			if(restaurante[i] == val)
			{

				var res = restaurante[i] + ".html";

				if(val == "Osho")
					window.open("../2.Osho/"+res+"", "_self");
			
				if(val == "Vibes19")
					window.open(""+res+"", "_self");
			}
	}
}

function sort(){
	var span = document.getElementById("nr_range");
	span.innerHTML = "Price: "+this.value+"";

	var div_checkbox = document.getElementById("checkbox");
	var Children = div_checkbox.children;

	var div_tata = document.getElementsByClassName("flex");

	for(var i = 0; i < div_tata.length; i++){
		var child = div_tata[i].childNodes;
		var lungime = child.length;

		for(var j = 0; j < lungime; j++)
			div_tata[i].removeChild(div_tata[i].childNodes[0]);
	}

	for(var i = 1; i < 6; i++){
		var ok = 0;
		var div = document.getElementById(""+i+"");

		if(Children[i-1].checked == true || Children[5].checked == true){
			ok = 1;
			var h = div.parentNode.childNodes[0].nextSibling;
		}


		if(ok == 1){
			for(var j = 0; j < afisare.length; j+=2){
					var p = afisare[j].getElementsByClassName("price");
					var price = p[0].innerHTML.split(" ");
					var pp = parseInt(price[0]);

					if(pp <= this.value && h.innerHTML == afisare[j+1].innerHTML)
						div.appendChild(afisare[j]);
			}
		}
	}
}

function checkbox_input(){
	var parent = document.getElementById("myheader");
	var div_checkbox = document.createElement("div");
	div_checkbox.style.marginLeft = "50px";
	div_checkbox.style.fontFamily = "'Playfair Display', serif";
	div_checkbox.id = "checkbox";

	for(var i = 0; i < 6; i++){
		var c_input = document.createElement("input");
		c_input.type = "checkbox";
		c_input.style.marginLeft = "6%";
		var text;

		if(i == 5)
			c_input.checked = true;

		if(i == 0){
			c_input.value = "starters";
			text = document.createTextNode("Starters");
		}

		if(i == 1){
			c_input.value = "salads";
			text = document.createTextNode("Salads");
		}

		if(i == 2){
			c_input.value = "soups";
			text = document.createTextNode("Soups");
		}

		if(i == 3){
			c_input.value = "burgers";
			text = document.createTextNode("Burgers");
		}

		if(i == 4){
			c_input.value = "grill";
			text = document.createTextNode("Grill");
		}

		if(i == 5){
			c_input.value = "all";
			text = document.createTextNode("All");
		}

		div_checkbox.appendChild(c_input);
		c_input.addEventListener("change", Types);
		div_checkbox.appendChild(text);
	}

	parent.appendChild(div_checkbox);
}

function Types(){
	var parent = document.getElementById("checkbox");
	var Children = parent.children; //iau inputurile

	var content = document.getElementById("types");
	var types_children = document.querySelectorAll("#types > div");
	var l = types_children.length;

	for(var i = 0; i < l; i++)
		content.removeChild(types_children[i]);

	for(var i = 0; i < Children.length; i++){
		if(Children[i].checked == true){

			if(Children[i].value != "all"){
				for(var j = 0; j < types.length; j++)
					if(types[j].id == Children[i].value)
						content.appendChild(types[j]);
			}
			else{
				for(var j = 0; j < types.length; j++)
					content.appendChild(types[j]);
			}
		
		}
	}
}

function show_link(event){

	var div = this;

	timer = setTimeout(function(){
		if(!prevent){
			var a = document.createElement("a");
			a.target = "_blank";
			a.href = "http://www.vibes19.com/";
			a.style.position = "absolute";
			a.style.left = event.clientX + "px";
			a.style.top = event.clientY + "px";
			a.style.background = "white";
			a.style.width = "15%";
			a.style.fontSize = "20px";
			a.style.textAlign = "center";
			a.style.borderRadius = "15px";
		

			var text = document.createTextNode("Visit their page!");
			a.appendChild(text);

			div.parentNode.appendChild(a);
		}
		prevent = false;
	}, delay);
}

function hide_link(event){
	clearTimeout(timer);
	prevent = true;
	var parinte = this.parentNode;
	var link = parinte.getElementsByTagName("A");

	parinte.removeChild(link[0]);
}

function radio_input(){

	let div = document.createElement("div");
	div.id = "artcileContainer";

	for(var i = 0; i < 2; i++){
		var radio = document.createElement("input");
		radio.type = "radio";
		radio.name = "article";

		var label = document.createElement("label");
		label.style.marginRight = "10px";

		if(i == 0){
			radio.value = "OldTown";
			label.htmlFor = "OldTown";
			label.innerHTML ="Old Town";
		}
		else{
			radio.value = "DetailsAboutVibes19";
			label.htmlFor = "DetailsAboutVibes19";
			label.innerHTML = "Details about Vibes19";
		}

		div.appendChild(radio);
		div.appendChild(label);
		radio.addEventListener("change", show_article);
	}

	var parent = document.getElementsByClassName("slideShow")[0];
	parent.appendChild(div);
}

function show_article(){
	var radio_inputs = document.getElementsByName("article");
	var div = document.getElementById("artcileContainer");

	var article = document.getElementById("articol");

	if(!article){
		article = document.createElement("article");
		article.style.fontFamily = "'Playfair Display', serif";
		article.style.margin = "10px 40px 10px 40px";
		article.style.textAlign = "justify";
		article.id = "articol";
		div.appendChild(article);
	}

	for(var i = 0; i < radio_inputs.length; i++){
		if(radio_inputs[i].checked == true){
			if(radio_inputs[i].value == "OldTown")
				article.innerHTML = "Known to most locals as Centru Vechi (the Old Centre), Bucharest's Old Town is defined by the area bordered by the Dambovita river to the south, Calea Victoriei to the west, Bulevardul Brătianu to the east and Regina Elisabeta to the north. The area is more or less all that’s left of pre-World War II Bucharest. What the war didn’t destroy communism did, most notably in the form of the grandiose Civic Centre project that saw almost a fifth of the total area of the city flattened to make way for Bulevardul Unirii and Casa Poporului. Indeed, that anything survives at all is little short of a miracle.";
			else
				article.innerHTML = "Vibes 19 is a newly opened restaurant in the beginning of August, on Calea Victoriei in the Old Center, opposite the Great CEC and on the right of the grand building of the National History Museum of Romania. It is on the ground floor, well arranged, a unitary concept, modern design, as almost all restaurants and offices are now doing. They have two communicating salons, medium to small, semi-open kitchen, well-equipped. They have a pretty big outside terrace. The French street, where the entrance is, actually, is quite wide in that area, it's pedestrian, paved with cubic stone, it's very nice. Vibes 19 has an American menu at the bottom of America: grills, hamburgers, Mexican specialties."
		}
	}
}

function select_input(){

	var div_select = document.createElement("div");
	div_select.id = "div_select";
	var p = document.createElement("p");
	p.style.fontFamily = "'Playfair Display', serif";
	p.style.textAlign = "center";
	p.style.borderTop = "3px solid grey";
	p.style.marginTop = "50px";
	p.style.marginBottom = "50px";
	p.innerHTML = "Select the day to see the restaurant's timetable";

	var parent = document.getElementsByClassName("slideShow")[0];
	var select = document.createElement("select");
	select.style.marginLeft = "90px";
	select.style.width = "100px";
	select.style.fontSize = "20px";
	select.style.fontFamily = "'Playfair Display', serif";

	for(var i = 0; i < 7; i++){
		var option = document.createElement("option");

		if(i == 0){
			option.value = "1";
			var text = document.createTextNode("Luni");
		}

		if(i == 1){
			option.value = "2";
			var text = document.createTextNode("Marti");
		}

		if(i == 2){
			option.value = "3";
			var text = document.createTextNode("Miercuri");
		}

		if(i == 3){
			option.value = "4";
			var text = document.createTextNode("Joi");
		}

		if(i == 4){
			option.value = "5";
			var text = document.createTextNode("Vineri");
		}

		if(i == 5){
			option.value = "6";
			var text = document.createTextNode("Sambata");
		}

		if(i == 6){
			option.value = "7";
			var text = document.createTextNode("Duminica");
		}

		option.appendChild(text);
		select.appendChild(option);
	}

	div_select.appendChild(p);
	div_select.appendChild(select);
	parent.appendChild(div_select);

	select.addEventListener("change", show_timetable);
}

function show_timetable(){
	var parent = document.getElementById("div_select");
	var p = document.getElementById("timetable");

	if(this.value <= 5){

		if(p)
			p.innerHTML = "10:30AM - 11:00PM";
		else{
			p = document.createElement("p");
			p.innerHTML = "10:30AM - 11:00PM";
			p.id = "timetable";
			p.style.textAlign = "center";
			p.style.textDecoration = "underline";
			p.style.fontSize = "20px";
			p.style.marginTop = "20px";
			parent.appendChild(p);
		}
	}
	else{
			if(p)
				p.innerHTML = "Closed";
			else{
				p = document.createElement("p");
				p.innerHTML = "Closed";
				p.id = "timetable";
				p.style.textAlign = "center";
				p.style.textDecoration = "underline";
				p.style.fontSize = "20px";
				p.style.marginTop = "20px";
				parent.appendChild(p);
			}
	}
}

/*function textarea_input(){
	var parent = document.getElementsByClassName("slideShow")[0];
	var div_textArea = document.createElement("div");
	div_textArea.id = "section_comments";
	div_textArea.style.marginTop = "150px";

	var p = document.createElement("p");
	p.style.textAlign = "center";
	p.style.fontSize = "20px";
	p.style.fontFamily = "'Playfair Display', serif";
	p.style.textDecoration = "underline";
	p.innerHTML = "Comments Section";
	div_textArea.appendChild(p);

	var textArea = document.createElement("textarea");
	textArea.rows = "6";
	textArea.cols = "30";
	textArea.style.marginTop = "20px";
	textArea.style.marginLeft = "50px";
	textArea.defaultValue = "Add a comment";

	div_textArea.appendChild(textArea);

	var button = document.createElement("button");
	button.innerHTML = "Submit";
	button.style.marginLeft = "50px";
	button.style.display = "block";
	div_textArea.appendChild(button);

	parent.appendChild(div_textArea);

	button.onclick = function(){
		var comment = document.createElement("p");
		comment.style.marginTop = "50px";
		comment.style.marginLeft = "30px";
		comment.style.border = "1px solid gray";
		comment.innerHTML = textArea.value;

		parent.appendChild(comment);
	}
	
}*/

function mymove(){
	var patrick = document.getElementById("Patrick");
	var pos = 0;

	if(window.pageYOffset >= 2300 && !patrickIsMoving){
		patrickIsMoving = true;
		var id = setInterval(frame, 80);

		function frame(){
			if(pos == 100){
				clearInterval(id);
				//patrickIsMoving = false;
			}
			else{
				pos++;

				if((pos >= 1 && pos <= 3) || (pos >= 7 && pos <= 8)){
					patrick.style.left = pos + "%";
					patrick.style.top = pos + 1 + "%";
				}
				else
					if(pos >=4 && pos <= 6){
						patrick.style.left = pos + "%";
						patrick.style.top = pos + 2 + "%";
					}
					else
						if(pos >= 9 && pos <= 11){
							patrick.style.left = pos + "%";
							patrick.style.top = pos + "%";
						}
						else
							if(pos >= 12 && pos <= 14){
								patrick.style.left = pos + "%";
								patrick.style.top = pos - 1 + "%";
							}
							else
								if(pos == 15){
									patrick.style.left = pos + "%";
									patrick.style.top = pos - 2 + "%";
								}
								else
									if(pos >= 16 && pos <= 17){
										patrick.style.left = pos + "%";
										patrick.style.top = pos - 3 + "%";
									}
									else
										if((pos >= 18 && pos <= 23) || (pos >= 77 && pos <= 79)){
											patrick.style.left = pos + "%";
											patrick.style.top = "14%";
										}
										else
											if((pos >= 24 && pos <= 29) || (pos >= 73 && pos <= 76)){
												patrick.style.left = pos + "%";
												patrick.style.top = "15%";
											}
											else
												if((pos >= 30 && pos <= 37) || (pos >= 67 && pos <= 72)){
													patrick.style.left = pos + "%";
													patrick.style.top = "16%";
												}
												else
													if(pos >= 38 && pos <= 66){
														patrick.style.left = pos + "%";
														patrick.style.top = "17%";
													}
													else
														if(pos >= 80 && pos <= 84){
															patrick.style.left = pos + "%";
															patrick.style.top = "13%";
														}
														else
															if(pos >= 85 && pos <= 89){
																patrick.style.left = pos + "%";
																patrick.style.top = "11%";
															}
															else
																if(pos >= 90 && pos <= 94){
																	patrick.style.left = pos + "%";
																	patrick.style.top = "7%";
																}
																else
																	if(pos >= 94){
																		patrick.style.left = pos + "%";
																		patrick.style.top = "3%";
																	}
			}
		}
	}
	else
		pos = 0;
}