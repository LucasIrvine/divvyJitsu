$('document').ready(function(){
	//api key  -->   22458d368bc748b899eaa829e55849e0

	jitsu = {
		init : function(){
			var self = this;
			
			this.getDivvyJSON(self);
		},

		getDivvyJSON : function(self){
			$.getJSON('js/divvy.json', function(data){
				//save to new var to pass on
				var divvyJSON = data.stationBeanList;
				//draw map
				self.drawMap(self, divvyJSON);
			});
		},

		drawMap : function(self, divvyJSON){
			var map = L.map('map').setView([41.8819, -87.6278], 15);

			L.tileLayer('http://b.tile.cloudmade.com/22458d368bc748b899eaa829e55849e0/1913/256//{z}/{x}/{y}.png', {
				attribution: '',
				maxZoom: 18
			}).addTo(map);

			$.each(divvyJSON, function(i){
				var lat = divvyJSON[i].latitude,
					longit = divvyJSON[i].longitude,
					stationName = divvyJSON[i].stationName;
				
				var marker = L.marker([lat, longit]).addTo(map);

				marker.bindPopup(stationName);

				marker.on('click', function(e){
					marker.openPopup();
				});

				

				
			});

		},

		addStationMarkers : function(self, divvyJSON){
			$.each(divvyJSON, function(i){
				var lat = divvyJSON[i].latitude,
					longit = divvyJSON[i].longitude,
					stationName = divvyJSON[i].stationName;
				
				var marker = L.marker([lat, longit]).addTo(map);
			});
		}

	};

	jitsu.init();


/*

	var divvyJSON;

	var map = L.map('map').setView([41.8819, -87.6278], 15);

	L.tileLayer('http://b.tile.cloudmade.com/22458d368bc748b899eaa829e55849e0/1913/256//{z}/{x}/{y}.png', {
		attribution: '',
		maxZoom: 18
	}).addTo(map);

	map.on('click', function(e){
		console.log(e.latlng);
	});

	var marker = L.marker([41.8817, -87.6279]).addTo(map);

	$.getJSON('js/divvy.json', function(data){
		divvyJSON = data.stationBeanList;
	});

	console.log(divvyJSON);
*/

});