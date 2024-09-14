function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 25.033964, lng: 121.564468},
        zoom: 15
    });

    var service = new google.maps.places.PlacesService(map);
    var request = {
        query: 'Taipei 101', // 查詢的地點名稱
        fields: ['place_id']
    };
    
    service.textSearch(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var placeId = results[0].place_id; // 獲取第一個結果的 place_id
            console.log(placeId);
        }
    });
};
