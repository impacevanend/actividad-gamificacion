const escenas = [
    "Jueves Santo: Jesús lava los pies",
    "Jueves Santo: La Última Cena",
    "Viernes Santo: Jesús ora en el huerto",
    "Viernes Santo: Jesús carga la cruz",
    "Viernes Santo: Jesús entrega a María",
    "Viernes Santo: El perdón en la cruz",
    "Sábado Santo: Esperanza en el silencio",
    "Domingo de Resurrección: Jesús vive"
  ];
  
  const cuerpoTabla = document.getElementById("cuerpo-tabla");
  
  escenas.forEach((escena, index) => {
    const fila = document.createElement("tr");
  
    const celdaEscena = document.createElement("td");
    celdaEscena.textContent = escena;
    celdaEscena.style.cursor = "pointer";
    celdaEscena.addEventListener("mouseover", () => {
      celdaEscena.style.backgroundColor = "#ffbe0b";
      celdaEscena.style.color = "#240046";
    });
    celdaEscena.addEventListener("mouseout", () => {
      celdaEscena.style.backgroundColor = "";
      celdaEscena.style.color = "";
    });
  
    const celdaInput = document.createElement("td");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Nombre del grupo";
    celdaInput.appendChild(input);
  
    const celdaBoton = document.createElement("td");
    const boton = document.createElement("button");
    boton.textContent = "Registrar";
    let registrado = false;
  
    boton.addEventListener("click", () => {
      if (!registrado) {
        if (input.value.trim() !== "") {
          Swal.fire({
            title: '✅ ¡Registrado!',
            text: `El grupo "${input.value}" representará: ${escena}`,
            icon: 'success',
            background: '#3c096c',
            color: '#fff',
            confirmButtonColor: '#ffbe0b'
          });
          boton.textContent = "Editar";
          registrado = true;
          input.disabled = true;
        } else {
          Swal.fire({
            title: '⚠️ Campo vacío',
            text: 'Por favor, ingresa el nombre del grupo.',
            icon: 'warning',
            background: '#3c096c',
            color: '#fff',
            confirmButtonColor: '#ff006e'
          });
        }
      } else {
        // Permitir edición nuevamente
        input.disabled = false;
        boton.textContent = "Registrar";
        registrado = false;
      }
    });
  
    celdaBoton.appendChild(boton);
  
    fila.appendChild(celdaEscena);
    fila.appendChild(celdaInput);
    fila.appendChild(celdaBoton);
  
    cuerpoTabla.appendChild(fila);
  });
  