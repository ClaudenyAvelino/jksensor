# 📊 IoT Dashboard JkSensor

> **Status do Projeto:** Concluído ✅  
> **Acesse agora:** [🌐 Clique aqui para ver o Dashboard Online](https://jksensor.vercel.app/)

![Preview da Aplicação](/img/aplicacao.png) 
*Legenda: Interface responsiva exibindo dados em tempo real e gráfico de tendências.*

## 🌟 Destaques do Projeto
- **Arquitetura Descentralizada**: Separação clara entre a lógica do dispositivo (C++), estilo (CSS) e comportamento da interface (JavaScript).
- **Comunicação em Tempo Real**: Uso de **MQTT.js** com WebSockets para atualizações instantâneas.
- **Visualização de Dados**: Gráficos dinâmicos e responsivos utilizando **Chart.js**.
- **UX/UI Moderna**: Interface com modo escuro (Dark Mode), layout responsivo (Mobile First) e alertas visuais de temperatura crítica.

## 🛠️ Tecnologias Utilizadas

### **Hardware & Firmware (Embedded)**
- **ESP8266 (NodeMCU)**: Microcontrolador principal.
- **DHT22**: Sensor de temperatura e umidade.
- **C++ / Arduino SDK**: Lógica de leitura e publicação MQTT.

### **Frontend (Dashboard)**
- **HTML5 & CSS3**: Estrutura e layout responsivo (Flexbox).
- **JavaScript (ES6+)**: Manipulação de DOM e lógica de dados.
- **MQTT.js**: Cliente para comunicação via WebSockets.
- **Chart.js**: Renderização de gráficos em tempo real.

## 📋 Funcionalidades
1.  **Monitoramento Instantâneo**: Exibição de temperatura e umidade em cards.
2.  **Status de Conexão**: Indicador visual do Broker MQTT (Online/Offline).
3.  **Gráfico de Histórico**: Exibe as últimas 30 leituras para análise de tendência.
4.  **Sistema de Alerta**: Alerta visual quando a temperatura ultrapassa **29°C**.

## 🔧 Como Rodar o Projeto

1. **Firmware:** Configure as credenciais de Wi-Fi e MQTT no código `.ino` e faça o upload para o ESP8266.
2. **Web:** Para rodar localmente, abra o `index.html`. Para rodar online, utilize o link disponibilizado no topo deste documento.

---

### **Como configurar a imagem no GitHub:**

Para que a imagem apareça no seu README, faça o seguinte:
1. Tire um print da tela do seu Dashboard (pode ser o site aberto no navegador).
2. Salve a imagem com o nome `screenshot.png`.
3. Suba essa imagem para a **pasta principal** do seu repositório no GitHub.
4. No código acima, o trecho `![Preview da Aplicação](screenshot.png)` puxará essa imagem automaticamente.

### **Dica Extra para o Link:**
Se você ainda não hospedou o site, recomendo usar o **GitHub Pages** (é gratuito):
1. Vá nas **Settings** (Configurações) do seu repositório no GitHub.
2. Clique em **Pages** no menu lateral.
3. Em "Branch", selecione `main` e clique em **Save**.
4. O link será gerado em poucos minutos. Aí é só colar esse link no seu README!
