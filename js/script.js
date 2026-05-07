// ==========================
// CONFIG MQTT (HIVEMQ)
// ==========================
const client = mqtt.connect(
  "wss://5f440b38e4174293bcaaa906d2d13a14.s1.eu.hivemq.cloud:8884/mqtt",
  {
    username: "expedito",
    password: "!Sd36316176",
  },
);

// ==========================
// GRAFICO
// ==========================
let chart;
let labels = [];
let tempData = [];
let humData = [];

const TEMP_ALERTA = 29;

function iniciarGrafico() {
  const ctx = document.getElementById("grafico").getContext("2d");

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Temperatura",
          borderColor: "red",
          data: tempData,
          fill: false,
        },
        {
          label: "Umidade",
          borderColor: "blue",
          data: humData,
          fill: false,
        },
      ],
    },
  });
}

// ==========================
// MQTT CONNECT
// ==========================
client.on("connect", () => {
  document.getElementById("status").innerText = "ONLINE";
  document.getElementById("status").style.color = "lime";

  client.subscribe("casa/temperatura");
  client.subscribe("casa/umidade");
  client.subscribe("casa/status");
});

// ==========================
// MQTT MESSAGE
// ==========================
client.on("message", (topic, message) => {
  const value = message.toString();
  let agora = new Date().toLocaleTimeString();

  // TEMPERATURA
  if (topic === "casa/temperatura") {
    let temp = parseFloat(value);

    document.getElementById("temp").innerText = temp.toFixed(1) + " °C";

    tempData.push(temp);
    labels.push(agora);

    if (temp >= TEMP_ALERTA) {
      document.getElementById("alerta").style.display = "block";
      document.body.style.background = "#7f1d1d";
    } else {
      document.getElementById("alerta").style.display = "none";
      document.body.style.background = "#0f172a";
    }
  }

  // UMIDADE
  if (topic === "casa/umidade") {
    let hum = parseFloat(value);

    document.getElementById("hum").innerText = hum.toFixed(1) + " %";

    humData.push(hum);
  }

  // LIMITE
  if (labels.length > 60) {
    labels.shift();
    tempData.shift();
    humData.shift();
  }

  if (chart) chart.update();
});

// ==========================
// INIT
// ==========================
window.onload = function () {
  iniciarGrafico();
};
