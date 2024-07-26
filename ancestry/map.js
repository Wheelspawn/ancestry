const markers = [];
var m = null;

function initMap() {
    fetch('ancestry.json')
    .then(response => response.json())
    .then(data => {
        var location = {lat: 41.66598, lng: -91.49008};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: location
        });
        m = map;
        
        data.forEach(function(person) {
            var marker = new google.maps.Marker({
                position: person.birth_loc,
                map: map
            });
            
            markers.push([marker,person.birth_date,person.death_date]);
            
            var fullName = person.name.join(" ")
            var infoWindow = new google.maps.InfoWindow({
                content: ('<div><strong>' +
                          fullName + 
                          '</strong>' +
                          '<br>Born: ' + person.birth_addr +
                          '<br>' + person.birth_date +
                          '<br>Died: ' + person.death_addr +
                          '<br>' + person.death_date +
                          '</div>')
            });
            
            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });
            
        });
        
    }).catch(error => console.error('Error loading JSON:', error));
}

function updateMap() {
    var year_min = Date.parse(document.getElementById("year_min").value);
    var year_max = Date.parse(document.getElementById("year_max").value);
    
    markers.forEach(function(marker) {
    
        var birth_date = Date.parse(marker[1].split(/-| /).pop());
        var death_date = Date.parse(marker[2].split(/-| /).pop());
        
        if (birth_date > year_max || death_date < year_min) {
            marker[0].setMap(null);
        }
        else {
            console.log("Birth date: ", birth_date);
            console.log("Death date: ", death_date);
            console.log("Year min: ", year_min);
            console.log("Year max: ", year_max);
            marker[0].setMap(m);
        }
    });
}
