const entregadas = [false, false, false, false];
let ganadorAsignado = false;

function entregarInsignia(index) {
  const card = document.querySelectorAll('.insignia-card')[index];
  const input = card.querySelector('input');
  const grupo = input.value.trim();
  const img = card.querySelector('img');

  if (!grupo) {
    Swal.fire("⚠️ Escribe el nombre del grupo", "", "warning");
    return;
  }

  img.classList.add("insignia-entregada");
  entregadas[index] = true;

  Swal.fire({
    title: '🎉 ¡Insignia entregada!',
    html: `<strong>${img.alt}</strong><br>El grupo <strong>${grupo}</strong> ha recibido su insignia.`,
    imageUrl: img.src,
    imageWidth: 120,
    background: '#3c096c',
    color: '#fff',
    confirmButtonColor: '#ffbe0b'
  });

  verificarGranInsignia();
}

function verificarGranInsignia() {
  if (entregadas.every(e => e === true) && !ganadorAsignado) {
    setTimeout(() => {
      Swal.fire({
        title: "🏆 ¡Selecciona el grupo ganador!",
        input: "text",
        inputLabel: "Nombre del grupo que recibirá la Gran Insignia",
        inputPlaceholder: "Escribe el nombre aquí",
        confirmButtonText: "Otorgar Gran Insignia",
        background: '#3c096c',
        color: '#fff',
        inputValidator: (value) => {
          if (!value) {
            return "Por favor escribe el nombre del grupo";
          }
        }
      }).then(result => {
        if (result.isConfirmed) {
          mostrarGranInsignia(result.value);
          ganadorAsignado = true;
        }
      });
    }, 500);
  }
}

function mostrarGranInsignia(nombre) {
  document.getElementById("gran-insignia").style.display = "block";
  document.getElementById("mensaje-ganador").innerHTML = `🎉 Felicitaciones al grupo <strong>${nombre}</strong> por obtener la Gran Insignia`;

  // efecto confeti
  confetti({
    particleCount: 300,
    spread: 120,
    origin: { y: 0.6 }
  });
}

// Confetti script
function confetti(params) {
  const js = document.createElement('script');
  js.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
  js.onload = () => {
    window.confetti(params);
  };
  document.body.appendChild(js);
}
