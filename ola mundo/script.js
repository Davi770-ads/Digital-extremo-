let mapa;

let marcador;

let localSelecionado = null;


// Embates de exemplo
let embates = [

    {
        nome: "Futebol sábado",
        esporte: "Futebol",
        data: "30/08/2026",
        horario: "16:00",
        vagas: 10,

        lat: -5.7945,
        lng: -35.2110
    },

    {
        nome: "Basquete ENERGYM",
        esporte: "Basquete",
        data: "31/08/2026",
        horario: "18:30",
        vagas: 8,

        lat: -5.8000,
        lng: -35.2050
    }

];


// Inicializar mapa
function iniciarMapa() {

    const centro = {
        lat: -5.7945,
        lng: -35.2110
    };


    mapa = new google.maps.Map(
        document.getElementById("map"),
        {
            center: centro,
            zoom: 13
        }
    );


    // Clicar no mapa
    mapa.addListener("click", function(event) {

        selecionarLocal(
            event.latLng.lat(),
            event.latLng.lng()
        );

    });


    // Mostrar embates
    mostrarEmbatesNoMapa();

    mostrarListaEmbates();
}


// Selecionar local
function selecionarLocal(lat, lng) {

    localSelecionado = {
        lat: lat,
        lng: lng
    };


    // Remover marcador antigo
    if (marcador) {

        marcador.setMap(null);

    }


    // Criar marcador
    marcador = new google.maps.Marker({

        position: {
            lat: lat,
            lng: lng
        },

        map: mapa,

        animation:
            google.maps.Animation.DROP
    });


    mapa.setCenter({
        lat: lat,
        lng: lng
    });


    document.getElementById(
        "localTexto"
    ).innerText =

        `Latitude: ${lat.toFixed(5)}
        | Longitude: ${lng.toFixed(5)}`;
}


// Usar localização do usuário
function usarMinhaLocalizacao() {

    if (!navigator.geolocation) {

        alert(
            "Seu navegador não suporta localização."
        );

        return;
    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const lat =
                position.coords.latitude;

            const lng =
                position.coords.longitude;


            selecionarLocal(lat, lng);


            mapa.setZoom(16);

        },


        function() {

            alert(
                "Não foi possível acessar sua localização."
            );

        }

    );
}


// Criar embate
function criarEmbate() {

    if (!localSelecionado) {

        alert(
            "📍 Escolha um local no mapa primeiro."
        );

        return;
    }


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


    if (
        !nome ||
        !data ||
        !horario
    ) {

        alert(
            "Preencha todos os campos."
        );

        return;
    }


    const novoEmbate = {

        nome: nome,

        esporte: esporte,

        data: data,

        horario: horario,

        vagas: vagas,

        lat: localSelecionado.lat,

        lng: localSelecionado.lng

    };


    embates.push(novoEmbate);


    mostrarEmbatesNoMapa();

    mostrarListaEmbates();


    alert(
        "🔥 Embate criado com sucesso!"
    );


    document.getElementById("nome").value = "";

}


// Mostrar marcadores
function mostrarEmbatesNoMapa() {

    embates.forEach(function(embate) {

        const marcadorEmbate =
            new google.maps.Marker({

                position: {
                    lat: embate.lat,
                    lng: embate.lng
                },

                map: mapa,

                title: embate.nome

            });


        const janela =
            new google.maps.InfoWindow({

                content: `

                    <div>

                        <h3>
                            ${embate.nome}
                        </h3>

                        <p>
                            ${embate.esporte}
                        </p>

                        <p>
                            📅 ${embate.data}
                        </p>

                        <p>
                            ⏰ ${embate.horario}
                        </p>

                        <p>
                            👥 ${embate.vagas} vagas
                        </p>

                    </div>

                `
            });


        marcadorEmbate.addListener(
            "click",
            function() {

                janela.open(
                    mapa,
                    marcadorEmbate
                );

            }
        );

    });

}


// Lista de embates
function mostrarListaEmbates() {

    const lista =
        document.getElementById(
            "listaEmbates"
        );


    lista.innerHTML = "";


    embates.forEach(function(embate) {

        lista.innerHTML += `

            <div class="card-embate">

                <div>

                    <h3>
                        ${embate.nome}
                    </h3>

                    <p>
                        ${embate.esporte}
                    </p>

                    <p>
                        📅 ${embate.data}
                        •
                        ⏰ ${embate.horario}
                    </p>

                    <p>
                        👥 ${embate.vagas} vagas
                    </p>

                </div>


                <button
                    class="entrar"
                    onclick="entrarEmbate('${embate.nome}')">

                    Participar

                </button>

            </div>

        `;

    });

}


// Participar
function entrarEmbate(nome) {

    alert(
        `Você entrou no embate: ${nome}`
    );

}