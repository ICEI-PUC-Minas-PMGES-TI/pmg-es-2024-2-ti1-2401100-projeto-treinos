mapboxgl.accessToken = 'pk.eyJ1IjoicmFmYWVsMTgxMCIsImEiOiJjbTJzMmMwcHcxbnpqMmtvZzdhOGY0ZzVoIn0.UCOS31bgypEm3zCvHziJUw';

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            // Obter a localização atual
            const userLongitude = position.coords.longitude;
            const userLatitude = position.coords.latitude;

            // Inicializar o mapa com a localização atual
            const map = new mapboxgl.Map({
                container: 'map', // ID da div
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [userLongitude, userLatitude], // Localização inicial
                zoom: 15 // Nível de zoom inicial
            });

            // Adicionar controles de navegação (zoom e rotação)
            const nav = new mapboxgl.NavigationControl();
            map.addControl(nav, 'top-right');

            // Criar o marcador inicial com a localização atual
            const marker = new mapboxgl.Marker({
                color: "blue",
                draggable: true // Permite mover o marcador
            })
                .setLngLat([userLongitude, userLatitude])
                .addTo(map);

            // Mover marcador
            marker.on('dragend', () => {
                const newCoords = marker.getLngLat();
                map.flyTo({
                    center: [newCoords.lng, newCoords.lat], // Centraliza o mapa na nova localização
                    zoom: 15,
                    essential: true // Animação
                });
            });

            // Marcadores fictícios de academias próximas
            const academias = [
                { name: "Academia Smartfit", coords: [userLongitude + 0.002, userLatitude + 0.002] },
                { name: "Academia Pratique", coords: [userLongitude - 0.002, userLatitude + 0.003] },
                { name: "Academia Life", coords: [userLongitude + 0.001, userLatitude - 0.002] }
            ];

            academias.forEach(academia => {
                new mapboxgl.Marker({ color: "red" }) // Marcador vermelho para as academias
                    .setLngLat(academia.coords)
                    .setPopup(new mapboxgl.Popup().setText(academia.name))
                    .addTo(map);
            });
        },
        (error) => {
            console.error('Erro ao obter localização:', error);
            alert('Não foi possível obter sua localização.');
        },
        {
            enableHighAccuracy: true, // Solicita maior precisão
            timeout: 10000, // Tempo máximo para obter a posição (10s)
            maximumAge: 0 // Não usa uma localização armazenada em cache
        }
    );
} else {
    alert('Geolocalização não é suportada pelo seu navegador.');
}