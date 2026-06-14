const workflowSteps = [
  {
    kicker: "PASO 01 · DOCUMENTACIÓN",
    title: "Todo comienza con las fuentes.",
    text: "Se incorporan al proyecto los documentos disponibles del expediente: póliza, recibos, datos catastrales, fotografías, vídeos, notas de visita y relaciones de daños.",
    noteLabel: "Regla esencial",
    note: "La IA debe leer toda la documentación antes de responder.",
    visual: `
      <div class="document-stack">
        <div class="doc doc-back"><span>RECIBO</span></div>
        <div class="doc doc-middle"><span>FOTOS</span></div>
        <div class="doc doc-front">
          <div class="doc-icon">PDF</div>
          <strong>Condiciones de póliza</strong>
          <i></i><i></i><i></i><i class="short"></i>
        </div>
      </div>`
  },
  {
    kicker: "PASO 02 · ORDEN",
    title: "Una petición corta activa el proceso.",
    text: "Marta indica la tarea con lenguaje natural: “Descripción del riesgo”, “Correo acuerdo amistoso” o “Lista de daños”. No necesita volver a copiar las instrucciones.",
    noteLabel: "Ejemplo de orden",
    note: "“Correo solicitud de documentación inicial para el expediente 00000.”",
    visual: `
      <div class="visual-prompt">
        <span>MARTA</span>
        <p>Correo acuerdo amistoso.</p>
        <i></i>
        <small>ENVIADO AL ASISTENTE</small>
      </div>`
  },
  {
    kicker: "PASO 03 · ENRUTADO",
    title: "El manual maestro decide la ruta.",
    text: "El sistema distingue entre un apartado técnico y una comunicación. Después localiza el prompt o la plantilla específica y respeta la jerarquía de instrucciones.",
    noteLabel: "Dos bibliotecas",
    note: "PROMPTS para el informe · CORREOS para el asegurado.",
    visual: `
      <div class="route-diagram">
        <div class="route-source">ORDEN</div>
        <span class="route-stem"></span>
        <div class="route-options">
          <div><b>A</b><strong>INFORME</strong><small>Prompts técnicos</small></div>
          <div><b>B</b><strong>CORREO</strong><small>Plantillas</small></div>
        </div>
      </div>`
  },
  {
    kicker: "PASO 04 · RESULTADO",
    title: "La salida llega en el formato útil.",
    text: "La IA extrae, organiza o redacta según la tarea: texto pericial conciso, tablas tabuladas para Excel o correos adaptados a la situación concreta.",
    noteLabel: "El formato importa",
    note: "Orden, campos, tono y límites de extensión ya están definidos.",
    visual: `
      <div class="result-preview">
        <span>RESULTADO</span>
        <div><i></i><i></i><i></i></div>
        <div><i></i><i></i><i></i></div>
        <div><i></i><i></i><i></i></div>
        <strong>LISTO PARA REVISIÓN <b>✓</b></strong>
      </div>`
  },
  {
    kicker: "PASO 05 · VALIDACIÓN",
    title: "La profesional conserva el control.",
    text: "Marta contrasta el borrador con el expediente, corrige o completa cuando procede y decide qué se incorpora al informe o qué comunicación se envía.",
    noteLabel: "Responsabilidad",
    note: "La IA asiste. La revisión, el criterio y la decisión final son humanos.",
    visual: `
      <div class="review-stamp">
        <div>✓</div>
        <strong>REVISADO</strong>
        <span>CRITERIO PROFESIONAL</span>
      </div>`
  }
];

const routeContent = {
  technical: {
    index: "A",
    eyebrow: "BIBLIOTECA DE PROMPTS",
    title: "Estructura técnica para cada apartado.",
    description: "Instrucciones precisas controlan qué buscar, cómo redactar y en qué formato devolver cada resultado.",
    command: "“Datos póliza Excel”",
    cards: [
      ["▦", "Datos de póliza", "Extrae campos objetivos y genera una tabla lista para Excel.", "TABULADO"],
      ["⌂", "Descripción del riesgo", "Redacción técnica del inmueble, localización y características.", "≤ 1.999 CAR."],
      ["≋", "Causa del siniestro", "Contextualiza la inundación y concreta la afección observada.", "TEXTO PERICIAL"],
      ["◫", "Descripción de daños", "Ordena continente, contenido y gastos complementarios.", "3 APARTADOS"],
      ["€", "Preexistencia", "Identifica y valora el contenido visible por estancias a VRN.", "TABLAS VRN"],
      ["☷", "Lista de daños", "Convierte relaciones de objetos en cinco columnas operativas.", "EXCEL"]
    ]
  },
  email: {
    index: "B",
    eyebrow: "BIBLIOTECA DE CORREOS",
    title: "Comunicación clara en cada momento.",
    description: "Plantillas profesionales se adaptan al expediente, manteniendo la información necesaria y un tono cercano con el asegurado.",
    command: "“Correo acuerdo amistoso”",
    cards: [
      ["✉", "Solicitud inicial", "Presentación, documentación necesaria y propuesta de visita.", "INICIO"],
      ["↻", "Reclamar documentos", "Recordatorio para continuar y cerrar la tramitación.", "SEGUIMIENTO"],
      ["✓", "Acuerdo amistoso", "Solicita la firma de la valoración previa a la indemnización.", "FIRMA"],
      ["⌂", "Acuerdo de trastero", "Añade la justificación documental de vinculación a la vivienda.", "CASO ESPECIAL"],
      ["→", "Cierre del expediente", "Confirma el envío del informe y explica el siguiente paso.", "DESPEDIDA"],
      ["i", "Consultas posteriores", "Deriva pagos y datos al canal correspondiente del Consorcio.", "ORIENTACIÓN"]
    ]
  }
};

const stepStyles = document.createElement("style");
stepStyles.textContent = `
  .visual-prompt { width:min(370px,80%); padding:28px; color:#17231f; background:#fffdf8; border-radius:16px; box-shadow:0 22px 50px rgba(0,0,0,.25) }
  .visual-prompt span { font-size:8px; font-weight:700; letter-spacing:.14em; color:#77817d }
  .visual-prompt p { margin:13px 0 24px; font:600 21px/1.35 "Manrope",sans-serif }
  .visual-prompt i { display:block; width:48px; height:3px; margin-bottom:10px; background:#c8f36b }
  .visual-prompt small { color:#718079; font-size:8px; letter-spacing:.12em }
  .route-diagram { width:min(420px,85%); text-align:center }
  .route-source { width:100px; margin:auto; padding:16px; color:#113f35; background:#c8f36b; border-radius:9px; font-size:9px; font-weight:700 }
  .route-stem { display:block; width:1px; height:65px; margin:auto; background:rgba(255,255,255,.35); position:relative }
  .route-stem:after { content:""; position:absolute; left:-130px; bottom:0; width:260px; height:1px; background:rgba(255,255,255,.35) }
  .route-options { display:grid; grid-template-columns:1fr 1fr; gap:28px }
  .route-options div { padding:25px 15px; background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.18); border-radius:13px }
  .route-options b { display:grid; place-items:center; width:28px; height:28px; margin:-40px auto 20px; color:#113f35; background:#fff; border-radius:50%; font-size:10px }
  .route-options strong,.route-options small { display:block }
  .route-options strong { font-size:13px; letter-spacing:.08em }
  .route-options small { margin-top:6px; color:rgba(255,255,255,.5); font-size:9px }
  .result-preview { width:min(380px,82%); padding:27px; color:#17231f; background:#f8f8f4; border-radius:16px }
  .result-preview > span { font-size:8px; font-weight:700; letter-spacing:.13em }
  .result-preview > div { display:grid; grid-template-columns:.8fr 1.3fr .6fr; gap:8px; margin-top:17px }
  .result-preview i { height:7px; background:#d9dfdb; border-radius:4px }
  .result-preview strong { display:flex; justify-content:space-between; margin-top:28px; padding-top:18px; border-top:1px solid #d8ded9; color:#66736d; font-size:8px; letter-spacing:.1em }
  .result-preview strong b { color:#113f35; font-size:14px }
  .review-stamp { width:255px; height:255px; display:flex; flex-direction:column; align-items:center; justify-content:center; border:3px double #c8f36b; border-radius:50%; transform:rotate(-7deg) }
  .review-stamp div { width:48px; height:48px; display:grid; place-items:center; margin-bottom:12px; color:#113f35; background:#c8f36b; border-radius:50%; font-size:24px }
  .review-stamp strong { color:#c8f36b; font-size:25px; letter-spacing:.08em }
  .review-stamp span { margin-top:6px; color:rgba(255,255,255,.55); font-size:8px; letter-spacing:.15em }
`;
document.head.appendChild(stepStyles);

const workflowTabs = document.querySelectorAll(".workflow-tab");
const stepKicker = document.querySelector("#step-kicker");
const stepTitle = document.querySelector("#step-title");
const stepText = document.querySelector("#step-text");
const stepNote = document.querySelector("#step-note");
const stepVisual = document.querySelector("#step-visual");

workflowTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const step = workflowSteps[Number(tab.dataset.step)];
    workflowTabs.forEach((item) => {
      item.classList.toggle("active", item === tab);
      item.setAttribute("aria-selected", item === tab ? "true" : "false");
    });
    stepKicker.textContent = step.kicker;
    stepTitle.textContent = step.title;
    stepText.textContent = step.text;
    stepNote.innerHTML = `<span>${step.noteLabel}</span>${step.note}`;
    stepVisual.innerHTML = step.visual;
  });
});

const routeButtons = document.querySelectorAll(".route-button");
const grid = document.querySelector("#capability-grid");

function renderRoute(routeName) {
  const route = routeContent[routeName];
  document.querySelector("#route-index").textContent = route.index;
  document.querySelector("#route-eyebrow").textContent = route.eyebrow;
  document.querySelector("#route-title").textContent = route.title;
  document.querySelector("#route-description").textContent = route.description;
  document.querySelector("#route-command").textContent = route.command;
  grid.innerHTML = route.cards.map((card, index) => `
    <article class="capability-card${index === 0 ? " featured" : ""}">
      <span class="card-code">${String(index + 1).padStart(2, "0")}</span>
      <div class="capability-icon">${card[0]}</div>
      <h4>${card[1]}</h4>
      <p>${card[2]}</p>
      <span class="format-pill">${card[3]}</span>
    </article>
  `).join("");
}

routeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    routeButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-selected", item === button ? "true" : "false");
    });
    renderRoute(button.dataset.route);
  });
});

const menuButton = document.querySelector(".menu-toggle");
menuButton.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
