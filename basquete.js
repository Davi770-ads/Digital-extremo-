/* =====================================
   DADOS DO PERFIL
===================================== */

let profile = {

    name: "João do Rachão",

    level: 12,

    xp: 650,

    maxXp: 1000,

    points: 2450,

    achievements: 12,

    activities: 38

};


/* =====================================
   ELEMENTOS
===================================== */

const modal =
    document.getElementById("modal");

const nameInput =
    document.getElementById("nameInput");

const levelInput =
    document.getElementById("levelInput");

const xpInput =
    document.getElementById("xpInput");


/* =====================================
   ATUALIZAR PERFIL
===================================== */

function updateProfile() {

    document.getElementById("userName")
        .textContent = profile.name;

    document.getElementById("userLevel")
        .textContent = profile.level;

    document.getElementById("xpCurrent")
        .textContent = profile.xp;

    document.getElementById("xpMax")
        .textContent = profile.maxXp;


    const percentage =
        (profile.xp / profile.maxXp) * 100;


    document.getElementById("xpProgress")
        .style.width =
        `${Math.min(percentage, 100)}%`;


    document.getElementById("points")
        .textContent =
        profile.points.toLocaleString("pt-BR");


    document.getElementById("achievementsCount")
        .textContent =
        profile.achievements;


    document.getElementById("activitiesCount")
        .textContent =
        profile.activities;


    document.getElementById("statActivities")
        .textContent =
        profile.activities;


    document.getElementById("statPoints")
        .textContent =
        profile.points.toLocaleString("pt-BR");

}


/* =====================================
   ABRIR MODAL
===================================== */

document
    .getElementById("editProfile")
    .addEventListener("click", function () {

        nameInput.value =
            profile.name;

        levelInput.value =
            profile.level;

        xpInput.value =
            profile.xp;

        modal.classList.add("show");

    });


/* =====================================
   FECHAR MODAL
===================================== */

document
    .getElementById("cancelModal")
    .addEventListener("click", function () {

        modal.classList.remove("show");

    });


/* =====================================
   SALVAR PERFIL
===================================== */

document
    .getElementById("saveProfile")
    .addEventListener("click", function () {

        profile.name =
            nameInput.value.trim() ||
            "Usuário";


        profile.level =
            Number(levelInput.value);


        profile.xp =
            Number(xpInput.value);


        updateProfile();


        modal.classList.remove("show");


        showToast(
            "Perfil atualizado com sucesso!"
        );

    });


/* =====================================
   FECHAR MODAL CLICANDO FORA
===================================== */

modal.addEventListener("click", function (event) {

    if (event.target === modal) {

        modal.classList.remove("show");

    }

});


/* =====================================
   MENU LATERAL
===================================== */

document
    .querySelectorAll(".menu button")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            document
                .querySelectorAll(".menu button")
                .forEach(function (item) {

                    item.classList.remove("active");

                });


            button.classList.add("active");


            const page =
                button.dataset.page;


            showToast(
                `Você selecionou: ${page}`
            );

        });

    });


/* =====================================
   CONQUISTAS
===================================== */

document
    .querySelectorAll(".achievement")
    .forEach(function (achievement) {

        achievement.addEventListener(
            "click",
            function () {

                const name =
                    achievement.dataset.achievement;


                showToast(
                    `Conquista: ${name}`
                );

            }
        );

    });


/* =====================================
   VER TODAS AS CONQUISTAS
===================================== */

document
    .getElementById("showAchievements")
    .addEventListener("click", function () {

        showToast(
            "Você possui 12 conquistas."
        );

    });


/* =====================================
   VER ESTATÍSTICAS
===================================== */

document
    .getElementById("showStats")
    .addEventListener("click", function () {

        showToast(
            "Todas as estatísticas estão disponíveis."
        );

    });


/* =====================================
   HISTÓRICO
===================================== */

document
    .getElementById("historyButton")
    .addEventListener("click", function () {

        showToast(
            "Histórico de pontos selecionado."
        );

    });


/* =====================================
   TOAST
===================================== */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent =
        message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(function () {

            toast.classList.remove("show");

        }, 2500);

}


/* =====================================
   GRÁFICO
===================================== */

const canvas =
    document.getElementById("chart");

const ctx =
    canvas.getContext("2d");


const chartData = {

    week: [
        20,
        45,
        60,
        40,
        75,
        90,
        110
    ],

    month: [
        15,
        55,
        55,
        100,
        65,
        62,
        98,
        85,
        108,
        87,
        65,
        94
    ],

    year: [
        25,
        48,
        60,
        80,
        72,
        95,
        105,
        90,
        120,
        100,
        115,
        135
    ]

};


/* =====================================
   DESENHAR GRÁFICO
===================================== */

function drawChart(period = "month") {

    const data =
        chartData[period];


    const width =
        canvas.clientWidth;

    const height =
        canvas.clientHeight;


    const ratio =
        window.devicePixelRatio || 1;


    canvas.width =
        width * ratio;

    canvas.height =
        height * ratio;


    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    const padding = 30;

    const chartWidth =
        width - padding * 2;

    const chartHeight =
        height - padding * 2;

    const max = 150;


    /* LINHAS DO GRÁFICO */

    ctx.strokeStyle =
        "#e5e8e7";

    ctx.lineWidth = 1;


    for (
        let value = 0;
        value <= max;
        value += 50
    ) {

        const y =
            height -
            padding -
            (value / max) *
            chartHeight;


        ctx.beginPath();

        ctx.moveTo(
            padding,
            y
        );

        ctx.lineTo(
            width - padding,
            y
        );

        ctx.stroke();


        ctx.fillStyle =
            "#777";

        ctx.font =
            "10px Arial";


        ctx.fillText(
            value,
            5,
            y + 4
        );

    }


    /* PONTOS */

    const points =
        data.map(function (value, index) {

            const x =
                padding +
                index *
                (
                    chartWidth /
                    (data.length - 1)
                );


            const y =
                height -
                padding -
                (value / max) *
                chartHeight;


            return {
                x: x,
                y: y,
                value: value
            };

        });


    /* ÁREA VERDE */

    ctx.beginPath();


    ctx.moveTo(
        points[0].x,
        height - padding
    );


    points.forEach(function (point) {

        ctx.lineTo(
            point.x,
            point.y
        );

    });


    ctx.lineTo(
        points[points.length - 1].x,
        height - padding
    );


    ctx.closePath();


    ctx.fillStyle =
        "rgba(7, 134, 95, .10)";


    ctx.fill();


    /* LINHA */

    ctx.beginPath();


    points.forEach(function (point, index) {

        if (index === 0) {

            ctx.moveTo(
                point.x,
                point.y
            );

        } else {

            ctx.lineTo(
                point.x,
                point.y
            );

        }

    });


    ctx.strokeStyle =
        "#07865f";

    ctx.lineWidth = 3;

    ctx.stroke();


    /* CÍRCULOS */

    points.forEach(function (point) {

        ctx.beginPath();


        ctx.arc(
            point.x,
            point.y,
            4,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            "#07865f";

        ctx.fill();


        ctx.strokeStyle =
            "white";

        ctx.lineWidth = 2;

        ctx.stroke();

    });

}


/* =====================================
   TROCAR PERÍODO
===================================== */

document
    .getElementById("period")
    .addEventListener("change", function (event) {

        drawChart(
            event.target.value
        );

    });


/* =====================================
   REDIMENSIONAR GRÁFICO
===================================== */

window.addEventListener(
    "resize",
    function () {

        const period =
            document.getElementById("period").value;


        drawChart(period);

    }
);


/* =====================================
   ANIMAÇÃO DOS NÚMEROS
===================================== */

function animateNumber(
    element,
    finalValue,
    duration = 1000
) {

    const start = 0;

    const startTime =
        performance.now();


    function update(currentTime) {

        const progress =
            Math.min(
                (currentTime - startTime) /
                duration,
                1
            );


        const value =
            Math.floor(
                start +
                (finalValue - start) *
                progress
            );


        element.textContent =
            value.toLocaleString("pt-BR");


        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }


    requestAnimationFrame(update);

}


/* =====================================
   INICIALIZAÇÃO
===================================== */

updateProfile();

drawChart("month");


animateNumber(
    document.getElementById("points"),
    2450
);


animateNumber(
    document.getElementById("activitiesCount"),
    38
);


animateNumber(
    document.getElementById("achievementsCount"),
    12
);
