let mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicmlkd2FuemFsIiwiYSI6ImNrNm40eWI0eTA3MG8zcHFiODZsdDV1aHMifQ.HBLx-EceW5xn0z5XhR-5PQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 9,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoicmlkd2FuemFsIiwiYSI6ImNrNm40eWI0eTA3MG8zcHFiODZsdDV1aHMifQ.HBLx-EceW5xn0z5XhR-5PQ'
}).addTo(mymap);

L.marker([51.5, -0.09]).addTo(mymap)
    .bindPopup("<b>Batu Bolong!</b><br />I am a popup.").openPopup();

L.marker([51.5, -0.085]).addTo(mymap)
    .bindPopup("<b>Batu Bolong!</b><br />I am a popup.").openPopup();

L.marker([51.52, -0.092]).addTo(mymap)
    .bindPopup("<b>Batu Bolong!</b><br />I am a popup.").openPopup();

tippy('.mybadge4', {
    content: 'Score Rating',
    animation: 'scale-subtle'
});