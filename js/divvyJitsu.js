$('document').ready(function(){
	//api key : 22458d368bc748b899eaa829e55849e0
	//divvy json : http://www.divvybikes.com/stations/json

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
			self.map = L.map('map').setView([41.8819, -87.6278], 15);

			L.tileLayer('http://b.tile.cloudmade.com/22458d368bc748b899eaa829e55849e0/1913/256//{z}/{x}/{y}.png', {
				attribution: '',
				maxZoom: 18
			}).addTo(self.map);

			self.addStationMarkers(self, divvyJSON);

		},

		addStationMarkers : function(self, divvyJSON){
			$.each(divvyJSON, function(i){
				var lat = divvyJSON[i].latitude,
					longit = divvyJSON[i].longitude,
					stationName = divvyJSON[i].stationName;
				var marker = L.marker([lat, longit]).addTo(self.map);
				// add the on click station names
				self.addMarkerPopups(self, marker, stationName);
			});
		},

		addMarkerPopups : function(self, marker, stationName){
			//bind pop up
			marker.bindPopup(stationName);
			// add event handler
			marker.on('click', function(e){
				marker.openPopup();
			});
		}
	};

	jitsu.init();

});