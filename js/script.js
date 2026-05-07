// ==========================
// CONFIG MQTT
// ==========================

const client = mqtt.connect(
  "wss://5f440b38e4174293bcaaa906d2d13a14.s1.eu.hivemq.cloud:8884/mqtt",
  {
    username: "expedito",
    password: "!Sd36316176",
  },
);

// ==========================
// ELEMENTOS HTML
// ==========================

const statusEl = document.getElementById("status");

const tempEl = document.getElementById("temp");

const humEl = document.getElementById("hum");

const alertaEl = document.getElementById("alerta");

// ==========================
// CONFIG
// ==========================

const TEMP_ALERTA = 29;

const MAX_DADOS = 30;

// ==========================
// DADOS GRAFICO
// ==========================

let labels = [];

let tempData = [];

let humData = [];

let grafico;

// ==========================
// INICIAR GRAFICO
// ==========================

function iniciarGrafico() {
  const ctx = document.getElementById("grafico").getContext("2d");

  grafico = new Chart(ctx, {
    type: "line",

    data: {
      labels: labels,

      datasets: [
        {
          label: "Temperatura °C",

          data: tempData,

          borderColor: "#ef4444",

          backgroundColor: "rgba(239,68,68,0.15)",

          borderWidth: 3,

          tension: 0.4,

          fill: true,
        },

        {
          label: "Umidade %",

          data: humData,

          borderColor: "#3b82f6",

          backgroundColor: "rgba(59,130,246,0.15)",

          borderWidth: 3,

          tension: 0.4,

          fill: true,
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      interaction: {
        mode: "index",
        intersect: false,
      },

      plugins: {
        legend: {
          labels: {
            color: "white",

            font: {
              size: 14,
            },
          },
        },
      },

      scales: {
        x: {
          ticks: {
            color: "white",
          },

          grid: {
            color: "rgba(255,255,255,0.08)",
          },
        },

        y: {
          ticks: {
            color: "white",
          },

          grid: {
            color: "rgba(255,255,255,0.08)",
          },
        },
      },
    },
  });
}

// ==========================
// MQTT CONNECT
// ==========================

client.on("connect", () => {
  console.log("MQTT conectado");

  statusEl.innerText = "ONLINE";

  statusEl.style.color = "#22c55e";

  client.subscribe("casa/temperatura");

  client.subscribe("casa/umidade");

  client.subscribe("casa/status");
});

// ==========================
// MQTT ERROR
// ==========================

client.on("error", (erro) => {
  console.error("Erro MQTT:", erro);

  statusEl.innerText = "ERRO";

  statusEl.style.color = "#ef4444";
});

// ==========================
// MQTT CLOSE
// ==========================

client.on("close", () => {
  statusEl.innerText = "DESCONECTADO";

  statusEl.style.color = "#f59e0b";
});

// ==========================
// RECEBER MENSAGENS
// ==========================

client.on("message", (topic, message) => {
  const valor = message.toString();

  const agora = new Date().toLocaleTimeString("pt-BR");

  // ======================
  // TEMPERATURA
  // ======================

  if (topic === "casa/temperatura") {
    const temp = parseFloat(valor);

    tempEl.innerText = `${temp.toFixed(1)} °C`;

    labels.push(agora);

    tempData.push(temp);

    // ALERTA

    if (temp >= TEMP_ALERTA) {
      alertaEl.style.display = "block";

      document.body.style.background = "#450a0a";
    } else {
      alertaEl.style.display = "none";

      document.body.style.background = "#0f172a";
    }
  }

  // ======================
  // UMIDADE
  // ======================

  if (topic === "casa/umidade") {
    const hum = parseFloat(valor);

    humEl.innerText = `${hum.toFixed(1)} %`;

    humData.push(hum);
  }

  // ======================
  // LIMITAR GRAFICO
  // ======================

  if (labels.length > MAX_DADOS) {
    labels.shift();

    tempData.shift();

    humData.shift();
  }

  // ======================
  // ATUALIZAR GRAFICO
  // ======================

  if (grafico) {
    grafico.update();
  }
});

// ==========================
// INIT
// ==========================

window.onload = () => {
  iniciarGrafico();
};
