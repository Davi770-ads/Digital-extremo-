let map;
let marcadorSelecionado = null;
let marcadorUsuario = null;

let localSelecionado = {
    latitude: null,
    longitude: null
};


// ==============================
// INICIAR MAPA
// ==============================

async function initMap() {

    const { AdvancedMarkerElement } =
        await google.maps.importLibrary("marker");

    // Centro inicial do mapa
    const centro = {
        lat: -3.71722,
        lng: -38.5434
    };

    map = new google.maps.Map(
        document.getElementById("map"),
        {
            center: centro,
            zoom: 13,
            mapId: "DEMO_MAP_ID"
        }
    );


    // ==============================
    // CLIQUE NO MAPA
    // ==============================

    map.addListener("click", function(event) {

        const latitude = event.latLng.lat();
        const longitude = event.latLng.lng();

        selecionarLocal(
            latitude,
            longitude,
            AdvancedMarkerElement
        );

    });

}


// ==============================
// SELECIONAR LOCAL
// ==============================

function selecionarLocal(
    latitude,
    longitude,
    AdvancedMarkerElement
) {

    // Salvar localização
    localSelecionado.latitude = latitude;
    localSelecionado.longitude = longitude;


    // Remover marcador anterior
    if (marcadorSelecionado) {

        marcadorSelecionado.map = null;

    }


    // Criar novo marcador
    marcadorSelecionado =
        new AdvancedMarkerElement({

            map: map,

            position: {
                lat: latitude,
                lng: longitude
            },

            title: "Local selecionado"

        });


    // Mostrar no painel
    document.getElementById("localTexto").innerText =
        `Latitude: ${latitude.toFixed(6)}
Longitude: ${longitude.toFixed(6)}`;


    // Centralizar mapa
    map.panTo({
        lat: latitude,
        lng: longitude
    });

}


// ==============================
// USAR MINHA LOCALIZAÇÃO
// ==============================

async function usarMinhaLocalizacao() {

    if (!navigator.geolocation) {

        alert(
            "Seu navegador não suporta localização."
        );

        return;

    }


    navigator.geolocation.getCurrentPosition(

        async function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            const posicao = {
                lat: latitude,
                lng: longitude
            };


            // Mover mapa
            map.setCenter(posicao);

            map.setZoom(16);


            // Carregar marcador
            const { AdvancedMarkerElement } =
                await google.maps.importLibrary("marker");


            // Remover marcador anterior
            if (marcadorUsuario) {

                marcadorUsuario.map = null;

            }


            // Criar marcador do usuário
            marcadorUsuario =
                new AdvancedMarkerElement({

                    map: map,

                    position: posicao,

                    title: "Você está aqui"

                });


            // Também selecionar essa localização
            selecionarLocal(
                latitude,
                longitude,
                AdvancedMarkerElement
            );

        },


        function(error) {

            switch (error.code) {

                case error.PERMISSION_DENIED:

                    alert(
                        "Você não permitiu o acesso à localização."
                    );

                    break;


                case error.POSITION_UNAVAILABLE:

                    alert(
                        "Não foi possível encontrar sua localização."
                    );

                    break;


                case error.TIMEOUT:

                    alert(
                        "A localização demorou muito para responder."
                    );

                    break;


                default:

                    alert(
                        "Não foi possível obter sua localização."
                    );

            }

        }

    );

}


// ==============================
// CRIAR EMBATE
// ==============================

function criarEmbate() {

    const nome =
        document.getElementById("nome").value;

    const esporte =
        document.getElementById("esporte").value;

    const data =
        document.getElementById("data").value;

    const horario =
        document.getElementById("horario").value;

    const vagas =
        document.getElementById("vagas").value;


    // Verificar nome
    if (!nome) {

        alert("Digite o nome do embate.");

        return;

    }


    // Verificar localização
    if (
        localSelecionado.latitude === null ||
        localSelecionado.longitude === null
    ) {

        alert(
            "Escolha um local no mapa primeiro."
        );

        return;

    }


    console.log("NOVO EMBATE");

    console.log({

        nome: nome,

        esporte: esporte,

        data: data,

        horario: horario,

        vagas: vagas,

        latitude:
            localSelecionado.latitude,

        longitude:
            localSelecionado.longitude

    });


    alert(
        "🔥 Embate criado com sucesso!"
    );

}import java.security.SecureRandom;
import java.util.Base64;


   
