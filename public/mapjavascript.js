function initialize() {

	var mapOptions, map, marker, searchBox, city,
		infoWindow = '',
		addressEl = document.querySelector( '#map-search' ),
		latEl = document.querySelector( '.latitude' ),
		longEl = document.querySelector( '.longitude' ),
		element = document.getElementById( 'map-canvas' );

	//enable/disable certain things on the map that is going to be displayed
	mapOptions = {
		zoom: 15,
		center: new google.maps.LatLng( 42.4085, 288.879),

		disableDefaultUI: false,
		scrollWheel: true,
		draggable: true,

	};

	//create the map using the Google API and the given inputs 
	map = new google.maps.Map( element, mapOptions );

	marker = new google.maps.Marker({
		position: mapOptions.center,
		map: map,
		// icon: 'http://pngimages.net/sites/default/files/google-maps-png-image-70164.png',
		draggable: false
	});

	//search box for user to input location
	searchBox = new google.maps.places.SearchBox( addressEl );
	//find the place the user inputted 
	google.maps.event.addListener( searchBox, 'places_changed', function () {
		var places = searchBox.getPlaces(),
			bounds = new google.maps.LatLngBounds(),
			i, place, lat, long, resultArray,
			addresss = places[0].formatted_address;

		for( i = 0; place = places[i]; i++ ) {
			bounds.extend( place.geometry.location );
			marker.setPosition( place.geometry.location );  // Set marker position new.
		}

		map.fitBounds( bounds );
		map.setZoom( 15 );

		lat = marker.getPosition().lat();
		long = marker.getPosition().lng();
		latEl.value = lat;
		longEl.value = long;

		resultArray =  places[0].address_components;

		// Get the city and set the city input value to the one selected
		for( var i = 0; i < resultArray.length; i++ ) {
			if ( resultArray[ i ].types[0] && 'administrative_area_level_2' === resultArray[ i ].types[0] ) {
				citi = resultArray[ i ].long_name;
				city.value = citi;
			}
		}
		if ( infoWindow ) {
			infoWindow.close();
		}
		infoWindow = new google.maps.InfoWindow({
			content: addresss
		});

		infoWindow.open( map, marker );
	} );
}