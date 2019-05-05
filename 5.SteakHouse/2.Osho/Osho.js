var nr_click_search_icon = 0;

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
					window.open("2.Osho/"+res+"", "_self");
			
				if(val == "Vibes19")
					window.open("../1.Vibes19/"+res+"", "_self");
			}
	}
}