// Esperar a que todo el contenido HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const contenedorEquipos = document.getElementById('contenedor-equipos');
    const btnGenerar = document.getElementById('btn-generar-equipos');
    const btnGuardar = document.getElementById('btn-guardar-equipos');
    const rankingSection = document.getElementById('ranking');
    const rankingVisual = document.getElementById('ranking-visual');
  
    // Aquí se almacenarán los datos de cada equipo
    const equipos = [];
  
    // Al hacer clic en "Generar Equipos"
    btnGenerar.addEventListener('click', () => {
      contenedorEquipos.innerHTML = ''; // Limpiar contenido anterior
  
      for (let i = 1; i <= 8; i++) {
        const equipoDiv = document.createElement('div');
        equipoDiv.classList.add('equipo');
  
        equipoDiv.innerHTML = `
          <fieldset>
            <legend>Equipo ${i}</legend>
            <label>Nombre del Equipo:</label>
            <input type="text" name="equipo${i}" required><br><br>
            ${[1, 2, 3, 4, 5].map(num => `
              <label>Integrante ${num}:</label>
              <input type="text" name="eq${i}_int${num}" required><br><br>
            `).join('')}
          </fieldset>
        `;
  
        contenedorEquipos.appendChild(equipoDiv);
      }
  
      btnGenerar.style.display = 'none';
      btnGuardar.style.display = 'inline-block';
    });
  
    // Al hacer clic en "Guardar Equipos"
    btnGuardar.addEventListener('click', () => {
      equipos.length = 0; // Limpiar datos si ya habían sido generados
  
      const fieldsets = document.querySelectorAll('#contenedor-equipos fieldset');
  
      fieldsets.forEach((fieldset, i) => {
        const nombreEquipo = fieldset.querySelector(`input[name="equipo${i + 1}"]`).value.trim();
        const integrantes = Array.from(fieldset.querySelectorAll(`input[name^="eq${i + 1}_int"]`))
                                 .map(input => input.value.trim());
  
        // Crear objeto para cada equipo y guardarlo en el array
        equipos.push({
          nombre: nombreEquipo,
          integrantes: integrantes,
          puntos: 0
        });
      });
  
      // Mostrar ranking con los datos capturados
      mostrarRanking();
    });
  
    // Función para mostrar el ranking y permitir sumar puntos
    function mostrarRanking() {
      rankingVisual.innerHTML = ''; // Limpiar contenido anterior
      rankingSection.style.display = 'block'; // Mostrar sección de ranking
  
      equipos.forEach((equipo, index) => {
        const div = document.createElement('div');
        div.classList.add('barra');
        div.innerHTML = `
          <strong>${equipo.nombre}</strong> - Puntos: 
          <span id="puntos-${index}">${equipo.puntos}</span><br>
          <button onclick="sumarPuntos(${index}, 1)">+1</button>
          <button onclick="sumarPuntos(${index}, 3)">+3</button>
          <button onclick="sumarPuntos(${index}, 5)">+5</button>
          <hr>
        `;
        rankingVisual.appendChild(div);
      });
    }
  
    // Esta función permite sumar puntos desde botones del ranking
    window.sumarPuntos = (index, cantidad) => {
      equipos[index].puntos += cantidad;
      document.getElementById(`puntos-${index}`).innerText = equipos[index].puntos;
    };
  });
  