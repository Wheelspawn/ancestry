
function initMap() {
    fetch('ancestry.json')
    .then(response => response.json())
    .then(data => {
        var location = {lat: 41.66598, lng: -91.49008};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: location
        });
        
        data.forEach(function(person) {
            var marker = new google.maps.Marker({
                position: person.birth_loc,
                map: map
            });
            
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
