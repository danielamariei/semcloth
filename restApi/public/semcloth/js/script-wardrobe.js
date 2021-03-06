jQuery(document).ready(function(){
	/*Your wardrobe ---------------------------------------------------------------------------*/
	 

	$('button').on('click',function(e) {
		if ($(this).hasClass('grid')) {
			$('#container ul').removeClass('list').addClass('grid');
		}
		else if($(this).hasClass('list')) {
			$('#container ul').removeClass('grid').addClass('list');
		}
	});

	var user_name_from_chookie = $.cookie('email');
	//console.log(user_name_from_chookie);
	var usr = user_name_from_chookie.split("@");

	$('#get_user_name').text(usr[0]);


	


	//Sample XML    
	//var xml = "<?xml version='1.0' ?><warderobe><item><name>T-shirt1</name><events>Funeral</events></item><item><name>T-shirt2</name><events>Interview</events></item><item><name>T-shirt3</name><events>Funeral|Interview</events></item><item><name>T-shirt4</name><events>Funeral|Interview</events></item><item><name>T-shirt5</name><events>Funeral|Interview</events></item><item><name>T-shirt6</name><events>Funeral|Interview</events></item><item><name>T-shirt7</name><events>Funeral|Interview</events></item><item><name>T-shirt8</name><events>Funeral|Interview</events></item><item><name>T-shirt9</name><events>Funeral|Interview</events></item><item><name>T-shirt10</name><events>Funeral|Interview</events></item></warderobe>";
 
	//wardrobe
	$.ajax({
			type: "GET",
			url: "http://localhost/wade-ui/restEndpoint.php?method=GET&endpoint=wardrobe&userId="+usr[0],//"http://riquack-n61vn:9000/events",
			dataType: "text",
			success: function(data){
				//	console.log(data);
				var jresult = $.parseJSON(data);

				//console.log(jresult);
				// console.log(jresult.toSource());
				//console.log("before for");
				$.each(jresult.results.bindings, function(i, value) {
					
					//console.log(this);
					var id_item = this.subject.value.split("#");
					//console.log(id_item[1]);
					//console.log("before get item details");
 
					$.ajax({
						type: "GET",
						url: "http://localhost/wade-ui/restEndpoint.php?method=GET&endpoint=wardrobeItem&userId="+usr[0] + "&clothingId="+id_item[1],//"http://riquack-n61vn:9000/events",
						dataType: "text",
						success: function(data){

								//console.log(data);
								var jresult_item = $.parseJSON(data);

							var values = ["http://www.semanticweb.org/ontologies/2015/02/semcloth.owl#isSuitableToBeDressedByGenre", 
							"http://rdfs.org/sioc/ns#note", 
							"http://www.semanticweb.org/ontologies/2015/02/semcloth.owl#hasTextileComposition", 
							"http://semanticweb.org/ontologies/2015/02/semcloth.owl#hasColour", 
							"http://www.semanticweb.org/ontologies/2015/02/semcloth.owl#hasSize", 
							"http://www.semanticweb.org/ontologies/2015/02/semcloth.owl#hasTexture", 
							"http://dbpedia.org/ontology/thumbnail"]; 
							var data = {};
							$.each(jresult_item.results.bindings, function(index, value1) {
									
									var prop = this.property.value;
									data[prop] = this.object.value;	

									//console.log(prop + " " + this.object.value );


							});
							//console.log(data[values[3]] + " " + index);

		var aux = '<li id="item-'+i+'"><div class="t-item"><h3>' +'</h3>'
		   			 	+ '<div class="r-80">'//<p class="item-events"><b>Events:</b> '+ events +'</p>'
	    				//+ '<p class="item-season"><b>Season:</b> '+ season +'</p>'
	    				//+ '<p class="item-styles"><b>Styles:</b> '+ styles +'</p>' 
	    				+ '<p class="item-material"><b>Material:</b> '+ data[values[2]].split("/")[data[values[2]].split("/").length-1].replace("_", " " ) +'</p>'
	    				+ '<p class="item-material"><b>Note:</b> '+ data[values[1]]+'</p>'
	    				+ '<p class="item-material"><b>Texture:</b> '+ data[values[5]]+'</p>'
	    				+ '<p class="item-material"><b>Size:</b> '+ data[values[4]].split("#")[1].replace(">", "")+'</p>'
	    				+ '<p class="item-material"><b>Colors:</b> '+ data[values[3]]+'</p>'
	    				+ '<button id="iditem-'+i+'" class="delete-item-list"><i class="fa fa-trash-o"></i>Delete Item</button> </div>' 
	    				+ '<div class="r-20"><img src="'+ data[values[6]]+'"></div>'
	    				+ '</div>'
		   				//+'<div class="e-item"> <button id="item-e-'+i+'" class="options edit-item">Edit</button> '
		   				//+'<button id="item-d-'+i+'" class="options delete-item">Delete</button> </div>';
		   				+ '</li>';
			$( ".list-w" ).append( aux);
		
							


						},
						 error: function(error, ob, message) {
								alert("[Get props each item]: " + message.toString());
						 }
					});

			
				});

			},
			 error: function(error, ob, message) {
					alert("[Get items]: " + message.toString());
			 }
	});



	/* 
	var xml =  	"<?xml version='1.0' ?> " 
					+ "<warderobe> <item> <name>T-shirt0</name> <events> <event>Funneral</event>  	<event>Date</event> <event>Romantic Date</event> </events> <styles> <style>Rock</style> <style>Sport</style></styles> <materials><material>cotton</material></materials></item>"
					+ "				<item> <name>T-shirt1</name> <events> <event>Funneral</event>  	<event>Date</event> <event>Romantic Date</event> </events> <styles> <style>Rock</style> </styles></item>"
					+ " 			<item> <name>T-shirt2</name> <events> <event>Business Meeting</event>  	<event>Interview</event> </events> <styles> <style>Rock</style> <style>Conservative</style></styles></item>"
					+ " 			<item> <name>T-shirt3</name> <events> <event>Club</event>  	<event>Pyjama Party</event> </events>  <styles> <style>Casual</style> <style>Conservative</style></styles> </item>"
					+ " 			<item> <name>T-shirt4</name> <events> <event>Funneral</event>  	<event>Interview</event> </events> <seasons><season>Autumn</season><season>Summer</season></seasons> <materials><material>cotton</material><material>wool</material></materials> </item>"
					+ " 			<item> <name>T-shirt5</name> <events> <event>Wedding</event>  	<event>Interview</event> </events> <styles> <style>Rock</style> <style>Conservative</style></styles> </item>"
					+ " 			<item> <name>T-shirt6</name> <events> <event>Funneral</event>  	<event>Interview</event> </events> <styles> <style>Casual</style> <style>Conservative</style></styles> <materials><material>wool</material></materials></item>"
					+ " 			<item> <name>T-shirt7</name> <events> <event>Funneral</event>  	<event>Pyjama Party</event> </events> <styles> <style>Casual</style> <style>Conservative</style></styles></item>"
					+ " 			<item> <name>T-shirt8</name> <events> <event>Club</event>  	<event>Interview</event> </events> <materials><material>cotton</material><material>wool</material></materials> </item>"
					+ " 			<item> <name>T-shirt9</name> <events> <event>Funneral</event>  	<event>Interview</event> </events>  <seasons><season>Winter</season></seasons></item>"
					+ " 			<item> <name>T-shirt10</name> <events> <event>Funneral</event>  <event>Interview</event> </events> <styles> <style>Casual</style> <style>Conservative</style></styles> </item>"
					+ " 			<item> <name>T-shirt10</name> <events> <event>Date</event>  <event>Interview</event> </events> <seasons><season>Winter</season></seasons></item>"
				+"</warderobe>";

	//Parse the givn XML
	var xmlDoc = $.parseXML( xml ); 
	    
	var $xml = $(xmlDoc);

	  // Find Person Tag
	var $item = $xml.find("item");
	var i=0;
	$item.each(function(){
	  
	  	/*Parsez events ---------------------------- */
	/*    var name = $(this).find('name').text();
		var events = "";
	    $(this).find('events>event').each(function(){
	    	events +=  $(this).text() + "<br/>";
		});

	    events = events.replace(/\|/g, ', ');

	    /*Parsez sezoane --------------------------- */
	 /*   var season = ""; 
		$(this).find('seasons>season').each(function(){
	    	season +=  $(this).text() + "<br/>";
		});
	    if(season==="")
	    	season = '-';

	    /*Parsez styles ----------------------------- */
	 /*   var styles = ""; 
		$(this).find('styles>style').each(function(){
	    	styles +=  $(this).text() + "<br/>";
		});
	    if(styles==="")
	    	styles = '-';


	    /*Parsez materials*/
/*var material = ""; 
		$(this).find('materials>material').each(function(){
	    	material +=  $(this).text() + "<br/>";
		});
	    if(material==="")
	    	material = '-';

	   // $("#ProfileList" ).append('<li>' +name+ ' - ' +events+ '</li>');
	    var aux = '<li id="item-'+i+'"><div class="t-item"><h3>'+ name +'</h3>'
	   			 	+ '<div class="r-80"><p class="item-events"><b>Events:</b> '+ events +'</p>'
    				+ '<p class="item-season"><b>Season:</b> '+ season +'</p>'
    				+ '<p class="item-styles"><b>Styles:</b> '+ styles +'</p>' 
    				+ '<p class="item-material"><b>Material:</b> '+ material +'</p>'
    				+ '<p class="item-material"><b>Note:</b> .... </p>'
    				+ '<button id="iditem-'+i+'" class="delete-item-list"><i class="fa fa-trash-o"></i>Delete Item</button> </div>' 
    				+ '<div class="r-20"><img src="http://localhost/wade-ui/images/dress.png"></div>'
    				+ '</div>'
	   				//+'<div class="e-item"> <button id="item-e-'+i+'" class="options edit-item">Edit</button> '
	   				//+'<button id="item-d-'+i+'" class="options delete-item">Delete</button> </div>';
	   				+ '</li>';
		$( ".list-w" ).append( aux);
		  i++;
	});*/
    

 
	/*Delete item from list*/
	/*-------------------------------------------------------*/
	/* Delete, Edit */ 
	$('.delete-item-list').on('click',function(e) {
			var contentPanelId = jQuery(this).attr("id");
   			var div = document.getElementById(contentPanelId);
			var sub_str = contentPanelId.split('-');;
			var name_remove = '#item-' + sub_str[1];
			console.log(name_remove);
			$(name_remove).fadeOut();
			/*sterge si din ...................

			...*/
	});


	/* Add new item ----------------------------------------------------------------- */
	$('#add-item').on('click',function(e) {	



		var type_type_vec = $('#item-options-type').find(":selected").val().split("|");
		var type_type = accLink(type_type_vec[0]);
		var type_type1 = type_type_vec[1];

		//var new_type_type   = [];
		//new_type_type.push(type_type);
		//new_type_type.push(type_type1);
		//va

		var type_gender = $('#item-options-gender').find(":selected").val();



		//var type_material = $('#item-options-material').find(":selected").text();
		//var type_color = $('#item-options-color').find(":selected").text(); // de modificat!!!!! 
		var type_size = $('#item-options-size').find(":selected").val();
		var type_texture = $('#item-options-texture').find(":selected").text();
		var type_note = $("#item-note").val();

		var ok=0;
		if(type_type === "none"){
			ok=1;
		}

		/*if(type_gender === "none"){
			ok=1;
		}*/
		var count_gender =0 ;
		var type_gender = [];
		$('.item-gender input:checked').each(function() {
			    type_gender.push(accLink($(this).attr('value')));
			    count_gender++;
		});


		if(type_size === "none"){
			ok=1;
		}

		if(type_texture === "none"){
			ok=1;
		}
		
		if(type_note === ""){ /*Pentru textarea*/
			ok=1;
		}

		var count_mat = 0; 
		var type_material = [];
		$('#add-imaterial input:checked').each(function() {
			    type_material.push(accLink($(this).attr('value')));
			    count_mat++;
		});

		if(count_mat==0){
			ok=1;
		}

		var count_color = 0; 
		var type_color = [];
		$('#add-icolor input:checked').each(function() {
			    type_color.push(accLink($(this).attr('value')));
			    count_color++;
		});

		if(count_color==0){
			ok=1;
		}


		if( ok != 1)
		{
			 
			var new_item = {};
			new_item.clothingType = type_type; //JSON.stringify(new_type_type);
			new_item.thumbnail = type_type1;

			new_item.fabrics = type_material;
			new_item.colors = type_color;
			new_item.size = accLink(type_size);
			new_item.texture = type_texture;
			new_item.note = type_note; /*e vorva despre text area*/
			new_item.genres = type_gender;

			console.log(new_item);

			var usr = user_name_from_chookie.split("@");

			//$('#get_user_name').text(usr[0]);

				$.ajax({
				    type: "POST",
				    url: "http://localhost/wade-ui/createItem.php?userId="+usr[0],//"http://riquack-n61vn:9000/events",
				   	dateType: "json",
				   	data: new_item,
				    success: function(data){
						//... ]
						alert("succes add");

				  	},
					  error: function(error, ob, message) {
					    alert("[Create new item]: " + message.toString());
					  }
				});

				 location.reload(true);


				$("#success-error").fadeIn(5000);
				$("#success-error").removeClass().addClass('alert alert-success').html("Success");
				$("#success-error").fadeOut(5000);

				/*reset fields*/
				/*$('#item-options-type').find(":selected").text();
				$('#item-options-gender').find(":selected").text();
				//var type_material = $('#item-options-material').find(":selected").text();
				//var type_color = $('#item-options-color').find(":selected").text(); // de modificat!!!!! 
				$('#item-options-size').find(":selected").text();
				$('#item-options-texture').find(":selected").text();
				$("#item-note").val();*/

		} else {
				$("#success-error").fadeIn(5000);
				$("#success-error").removeClass().addClass('alert alert-error').html("Check all the fileds");
				$("#success-error").fadeOut(5000);
		}


		

	});


	/*Popup add new item ------------------------------------------------------  */

	$("#add-items-db").on('click',function() {	
	 	$(".box-custom").slideToggle(500);//.css("display","block"); 
	});



	$(".close-button").click(function() {
		$("#register-box").fadeOut(500);//.css("display","none"); 
	});	


	/*Populare garderoba ----   clothingMaterials */
	$.ajax({
	    type: "GET",
	    // url: "http://localhost/wade-ui/clothingMaterials.json",
	    url: "http://localhost/wade-ui/restEndpoint.php?endpoint=clothingMaterials&method=GET",//"http://riquack-n61vn:9000/events",
	   	dateType: "json",
	    success: function(data){
		var datAsString = JSON.stringify(data); 
		var clmatc =0; 
		 $.each(data.results.bindings,  function(index) {
		 	//console.log(this.label.value);
		 	//$("#grand-list-clothingMaterials").append("<input type='radio' name='clothingMaterials' value="+ this.clothingMaterial.value+">" + this.clothingMaterial.value + "<br/>" );
			$('#add-imaterial').append("<div class='item-mat'><input type='checkbox' name='material' id='clmatc-"+clmatc+"' value='"+this.clothingMaterial.value+"' > <label for='clmatc-"+clmatc+"'>"  + labelLink(this.label.value) + "</label></div>" );
			clmatc++; 

		 });
	  },
	  error: function(error) {
	    alert("An error occurred while processing XML file." + error);
	  }
	});


	/*Populare garderoba ----   colors */
	$.ajax({
	    type: "GET",
	   // url: "http://localhost/wade-ui/restEndpoint.php?endpoint=colors&method=GET",//"http://riquack-n61vn:9000/events",
	   	url:  "http://localhost/wade-ui/colors.json",
	   	dateType: "json",
	    success: function(data){ 

		var datAsString = JSON.stringify(data); 
		var idcol=0;


		$.each(data.results.bindings,  function(index) {
		 	
			$('#add-icolor').append('<div class="item-col">'+ 
											'<input type="checkbox" name="color" value="'+ this.color.value+'" id="'+idcol+'">'+
											'<label for="'+idcol+'" title="'+this.comment.value+'"><span class="rectangle" style="background-color:#'+this.colourHexCode.value+'">'+
											'</span>'+this.label.value+'</label>'
									+'</div>');
			idcol++; 
		 });
	  },
	  error: function(error) {
	    alert("An error occurred while processing XML file." + error);
	  }
	});


	/*Populare graderoba -------- sizes - */
	$.ajax({
	    type: "GET",
	    // url: "http://localhost/wade-ui/clothingSizes.json",
	    url: "http://localhost/wade-ui/restEndpoint.php?endpoint=clothingSizes&method=GET",//"http://riquack-n61vn:9000/events",
	   	dateType: "json",
	    success: function(data){ 
		var datAsString = JSON.stringify(data);//(new XMLSerializer()).serializeToString(json);
		$.each(data.results.bindings,  function(index) {
		 	
			$('#item-options-size').append(' <option value="'+ this.size.value+'">'+this.label.value+'</option>');
		 });
	  },
	  error: function(error) {
	    alert("An error occurred while processing XML file." + error);
	  }
	});


	/*Populare graderoba -------- clothingTypes - */
	$.ajax({
	    type: "GET",
	    // url: "http://localhost/wade-ui/clothingTypes.json", 
	    url: "http://localhost/wade-ui/restEndpoint.php?endpoint=clothingTypes&method=GET",//"http://riquack-n61vn:9000/events",
	   	dateType: "json",
	    success: function(data){ 
		var datAsString = JSON.stringify(data);//(new XMLSerializer()).serializeToString(json);
		$.each(data.results.bindings,  function(index) {
		 	
			$('#item-options-type').append(' <option value="'+ this.clothing.value + "|" + this.thumbnail.value+'">'+this.label.value+'</option>');
		 });
	  },
	  error: function(error) {
	    alert("An error occurred while processing XML file." + error);
	  }
	});


	/*Populare graderoba -------- texture - */
	$.ajax({
	    type: "GET",
	    url: "http://localhost/wade-ui/restEndpoint.php?endpoint=clothingTextures&method=GET",//"http://riquack-n61vn:9000/events",
	   	dateType: "json",
	    success: function(data){ 
		var datAsString = JSON.stringify(data);
		$.each(data.results.bindings,  function(index) {
		 	//....
			$('#item-options-texture').append(' <option value="'+ this.texture.value +'">'+this.label.value+'</option>');
		 });
	  },
	  error: function(error) {
	    alert("An error occurred while processing XML file." + error);
	  }
	});




});


function labelLink(link){
	var string_link = link;
	var arr_str = string_link.split("/");
	return arr_str[arr_str.length-1];
}

function accLink(link){
	var string_link = "<" +  link + ">";
	return  string_link; 
} 
