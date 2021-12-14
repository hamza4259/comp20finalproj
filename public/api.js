var selected; 
var equipment_directory = ["Barbell", "SZ-Bar", "Dumbbell", "Gym mat", "Swiss Ball", "Pull-up bar", "none (bodyweight exercise)", "Bench", "Incline bench", "Kettlebell"];
var muscles_directory = ["Biceps brachii", "Anterior deltoid", "Serratus anterior", "Pectoralis major", "Triceps brachii", "Rectus abdominis", "Gastrocnemius", "Gluteus maximus", "Trapezius", "Quadriceps femoris", "Biceps femoris", "Latissimus dorsi", "Brachialis", "Obliquus externus abdominis", "Soleus"]; 

// $(document).ready(function () {
    $('#workout_submit').click(async function(event){ 
    event.preventDefault();
    selected = ($('#workout :selected').attr("value"));
    // console.log(selected);

    document.getElementById("table").innerHTML = "";
    
    var temp_table = "<tr>" + "<th>" + "Workout" +  "</th>" + "<th>" + "Description" +  "</th>" + "<th>" + "Muscles" +  "</th>" + "<th>" + "Equipment" +  "</th>";
    $('#table').append(temp_table);

    var apiUrl = 'https://wger.de/api/v2/exercise/?language=2&equipment=3&category=' + selected;
    console.log(apiUrl);
    fetch(apiUrl).then(response => {
      return response.json();
    }).then(data => {
    
      // Work with JSON data here
      console.log(data);
      console.log(data.results.length);


    
      for (var i=0; i < (data.results).length; i++) {
                        var song = '';
                        // var muscle_names = []; 
                        var muscle_names_2 = ""; 
                        var equipment_names = "";

                    
                          // for (var j=0; j < data.results[i].muscles.length; j++) {
                          //   // console.log(data.results[i].muscles[j]);
                          //   var tempUrl = 'https://wger.de/api/v2/muscle/' + data.results[i].muscles[j] + "/";
                          //   // console.log(tempUrl)
                          //   fetch(tempUrl).then(response1 => {
                          //       return response1.json();
                          //     }).then(muscle_data => {
                          //       //   console.log(muscle_data);
                          //       muscle_names.push(muscle_data.name);  
                          //       //   console.log(muscle_names.length);
                          //       // muscle_names_2 += muscle_data.name; 
                          //       // var muscle_names_string = muscle_names.toString();
                          //       // console.log(muscle_names_string);
                          //     });
                          //     console.log(muscle_names.length);
                          // }
                        
                        for (var j=0; j < data.results[i].muscles.length; j++) {
                          // muscle_names.push(muscles_directory[data.results[i].muscles[j]]);
                          if (j < (data.results[i].muscles.length - 1)) {
                            muscle_names_2 += muscles_directory[(data.results[i].muscles[j]) - 1] + ", "; 
                          }
                          else {
                            muscle_names_2 += muscles_directory[(data.results[i].muscles[j]) - 1]; 
                          }
                        }

                        for (var j=0; j < data.results[i].equipment.length; j++) {
                          // muscle_names.push(muscles_directory[data.results[i].muscles[j]]);
                          if (j < (data.results[i].equipment.length - 1)) {
                            equipment_names += equipment_directory[(data.results[i].equipment[j]) - 1] + ", "; 
                          }
                          else {
                            equipment_names += equipment_directory[(data.results[i].equipment[j]) - 1]; 
                          }
                        }

                    
                          // console.log(muscle_names.length);
                            // var muscle_names_string = muscle_names.toString();
                            // console.log(muscle_names_string);
                            // console.log( muscle_names[]);
                            // iterate through json objects 
                                //construct table rows from json object data
                                song += '<tr>';
                                song += '<td>' + 
                                    (data.results[i]).name + '</td>'; // name of workout 
        
                                song += '<td>' + 
                                    (data.results[i]).description + '</td>'; // description for workout 
        
                                song += '<td>' + 
                                    muscle_names_2 + '</td>'; // muscles used in workout 
        
                                song += '<td>' + 
                                    equipment_names + '</td>'; // equipment used in workout 
        
                                song += '</tr>';
                            
                            //insert rows into table 
                            $('#table').append(song);
              

      }
    
    
                //       $(document).ready(function () {
    
                //     // fetch data from json file
                //     $.getJSON(data.results[0], 
                //             function (data) {
                //         var song = '';
    
                //         // iterate through json objects
                //         $.each(data, function (key, value) {
    
                //             //construct table rows from json object data
                //             song += '<tr>';
                //             song += '<td>' + 
                //                 value.name + '</td>';
    
                //             song += '<td>' + 
                //                 value.description + '</td>';
    
                //             song += '<td>' + 
                //                 value.category + '</td>';
    
                //             song += '<td>' + 
                //                 value.creation_date + '</td>';
    
                //             song += '</tr>';
                //         });  
                //         //insert rows into table 
                //         $('#table').append(song);
                //     });
                // });
    
    }).catch(err => {
      // Do something for an error here
    });
 
});
// });


// $(document).ready(function() {
//     $("#workout").change(function(){
//         $.ajax({
//             type: 'POST',
//             data1:  {keyname:$('#workout option:selected').val()},

// 			success: function (data1) {
// 				console.log(data1);	
// 				// $('.description').append('<span>' + response.flavor_text_entries[3].flavor_text + '</span>');
                
// 			},
//         });
//     });
// });



// var apiUrl = 'https://wger.de/api/v2/exercise/?language=2&muscles=1&equipment=3';
// fetch(apiUrl).then(response => {
//   return response.json();
// }).then(data => {

//   // Work with JSON data here
//   console.log(data);

//   console.log(data.results[0])

//   for (var i=0; i < (data.results).length; i++) {
//                     var song = '';

//                     // iterate through json objects 
//                         //construct table rows from json object data
//                         song += '<tr>';
//                         song += '<td>' + 
//                             (data.results[i]).name + '</td>';

//                         song += '<td>' + 
//                             (data.results[i]).description + '</td>';

//                         song += '<td>' + 
//                             (data.results[i]).muscles + '</td>';

//                         song += '<td>' + 
//                             (data.results[i]).equipment + '</td>';

//                         song += '</tr>';
                     
//                     //insert rows into table 
//                     $('#table').append(song);
//   }


//             //       $(document).ready(function () {

//             //     // fetch data from json file
//             //     $.getJSON(data.results[0], 
//             //             function (data) {
//             //         var song = '';

//             //         // iterate through json objects
//             //         $.each(data, function (key, value) {

//             //             //construct table rows from json object data
//             //             song += '<tr>';
//             //             song += '<td>' + 
//             //                 value.name + '</td>';

//             //             song += '<td>' + 
//             //                 value.description + '</td>';

//             //             song += '<td>' + 
//             //                 value.category + '</td>';

//             //             song += '<td>' + 
//             //                 value.creation_date + '</td>';

//             //             song += '</tr>';
//             //         });  
//             //         //insert rows into table 
//             //         $('#table').append(song);
//             //     });
//             // });

// }).catch(err => {
//   // Do something for an error here
// });




// $('.submit').click( function searchPokemon (event){
// 	event.preventDefault();
// 	$('.name').empty();
// 	$('.type').empty();
// 	$('.description').empty();

// 	var pokemon = $('input').val();

// 		$.ajax({
			
// 			type: 'GET',
// 			url: 'https://pokeapi.co/api/v2/pokemon/' + pokemon,
			
// 			success: function (response) {
// 				console.log(response);
				
// 				$('.name').append('<span>' + response.name + '</span>');
// 				// $('.description').text(response.name);
				
// 				response.types.forEach(function (types) {
// 					var pokemonType = types.type.name
// 					$('.type').append('<span>' + pokemonType + '  </span>');		
// 					}
// 			)},
// 			error: error()
			
// 		}) //ajax request 1	end

// 		$.ajax({
			
// 			type: 'GET',
// 			url: 'https://pokeapi.co/api/v2/pokemon-species/' + pokemon,
			
// 			success: function (response) {
// 				console.log(response);	
// 				$('.description').append('<span>' + response.flavor_text_entries[3].flavor_text + '</span>');
// 			},

// 			error: error()
			
// 		}) //ajax request 2 end

// }) // end submit searchPokemon

// function error () {
// 	console.log('Oops! This is an error');
// }




