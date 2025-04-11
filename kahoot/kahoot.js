const preguntas = [
    {
      texto: "¿Qué celebra la Iglesia el Jueves Santo?",
      opciones: ["La resurrección de Jesús", "La Última Cena", "La venida del Espíritu Santo", "El nacimiento de Jesús"],
      correcta: 1
    },
    {
      texto: "¿Qué gesto hizo Jesús con sus discípulos en la Última Cena?",
      opciones: ["Les dio vino", "Les lavó los pies", "Los envió a predicar", "Les dio monedas"],
      correcta: 1
    },
    {
      texto: "¿Qué pasó el Viernes Santo?",
      opciones: ["Jesús nació", "Jesús murió en la cruz", "Jesús alimentó a la multitud", "Jesús sanó a un ciego"],
      correcta: 1
    },
    {
      texto: "¿Qué sucede el Domingo de Resurrección?",
      opciones: ["Jesús regresa a la cruz", "Jesús resucita", "Jesús va al desierto", "Jesús lava los pies"],
      correcta: 1
    },
    {
      texto: "¿Qué representa el pan en la Última Cena?",
      opciones: ["El cuerpo de Jesús", "El alma", "La fe", "La amistad"],
      correcta: 0
    },
    {
      texto: "¿Qué pidió Jesús en el huerto de Getsemaní?",
      opciones: ["Que se hiciera su voluntad", "Más pan", "Un ejército", "Una corona"],
      correcta: 0
    },
    {
      texto: "¿Quién entregó a Jesús?",
      opciones: ["Pedro", "Juan", "Judas", "Tomás"],
      correcta: 2
    },
    {
      texto: "¿Qué dijo Jesús desde la cruz?",
      opciones: ["Estoy cansado", "Tengo miedo", "Padre, perdónalos", "Salven mi vida"],
      correcta: 2
    },
    {
      texto: "¿A quién entregó Jesús como madre desde la cruz?",
      opciones: ["A María Magdalena", "A María, su madre", "A Marta", "A la Iglesia"],
      correcta: 1
    },
    {
      texto: "¿Cuál es el mensaje central del Triduo?",
      opciones: ["Obediencia", "Sacrificio", "Amor", "Castigo"],
      correcta: 2
    }
  ];
  
  let indiceActual = 0;
  let tiempoRestante = 10;
  let temporizador;
  
  const preguntaElem = document.getElementById("pregunta");
  const opcionesElem = document.getElementById("opciones");
  const tiempoElem = document.getElementById("tiempo");
  const btnSiguiente = document.getElementById("btn-siguiente");
  
  function mostrarPregunta() {
    const pregunta = preguntas[indiceActual];
    preguntaElem.innerText = pregunta.texto;
    opcionesElem.innerHTML = "";
  
    pregunta.opciones.forEach((opcion, index) => {
      const btn = document.createElement("button");
      btn.innerText = `${String.fromCharCode(65 + index)}. ${opcion}`;
      btn.onclick = () => verificarRespuesta(index);
      opcionesElem.appendChild(btn);
    });
  
    btnSiguiente.style.display = "none";
    tiempoRestante = 10;
    tiempoElem.innerText = tiempoRestante;
    temporizador = setInterval(actualizarTemporizador, 1000);
  }
  
  function actualizarTemporizador() {
    tiempoRestante--;
    tiempoElem.innerText = tiempoRestante;
    if (tiempoRestante === 0) {
      clearInterval(temporizador);
      verificarRespuesta(-1); // No respondió
    }
  }
  
  function verificarRespuesta(respuesta) {
    clearInterval(temporizador);
    const esCorrecta = respuesta === preguntas[indiceActual].correcta;
  
    Swal.fire({
      title: esCorrecta ? "✅ ¡Correcto!" : "❌ Incorrecto",
      text: esCorrecta ? "¡Muy bien! Has respondido correctamente." : `La respuesta correcta era: ${String.fromCharCode(65 + preguntas[indiceActual].correcta)}. ${preguntas[indiceActual].opciones[preguntas[indiceActual].correcta]}`,
      icon: esCorrecta ? "success" : "error",
      confirmButtonColor: esCorrecta ? "#06d6a0" : "#ef476f",
      background: "#3c096c",
      color: "#fff"
    });
  
    btnSiguiente.style.display = "inline-block";
  }
  
  btnSiguiente.addEventListener("click", () => {
    indiceActual++;
    if (indiceActual < preguntas.length) {
      mostrarPregunta();
    } else {
      Swal.fire({
        title: "🎉 ¡Juego finalizado!",
        text: "Gracias por participar en el Kahoot del Triduo.",
        icon: "info",
        confirmButtonColor: "#ffbe0b",
        background: "#3c096c",
        color: "#fff"
      });
      preguntaElem.innerText = "Juego terminado";
      opcionesElem.innerHTML = "";
      btnSiguiente.style.display = "none";
      document.getElementById("temporizador").style.display = "none";
    }
  });
  
  // Iniciar el juego
  mostrarPregunta();
  