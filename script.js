// Función para abrir la invitación (sobre) y reproducir la música
function abrirInvitacion() {
  // Obtener el sobre y la invitación
  const envelope = document.getElementById('envelope');
  const invitacion = document.getElementById('invitacion');
  
  // Añadir clase para animar la apertura del sobre
  envelope.classList.add('open');

  // Mostrar la invitación después de la animación
  setTimeout(() => {
      envelope.style.display = 'none';
      invitacion.style.display = 'block';
      
      // Reproducir la música solo después de abrir el sobre
      const musica = document.getElementById('musica');
      if (musica) {
          musica.play();
      }
  }, 1000); // Ajustar tiempo para esperar la animación de apertura del sobre
}
// Asignar el evento de clic al sello para abrir el sobre
document.addEventListener('DOMContentLoaded', function() {
    const seal = document.getElementById('seal');
    if (seal) {
        seal.addEventListener('click', abrirInvitacion);
    }

    // Iniciar el contador y cargar los datos del invitado al cargar la página
    iniciarContador();
    cargarDatosInvitado();
});

// Función para obtener datos de invitados (sin inputs)
// Carga datos de invitado desde invitados.json según ?id=123
async function cargarDatosInvitado() {
  const params = new URLSearchParams(window.location.search);
  const invitadoId = params.get('id');
  if (!invitadoId) {
    console.warn('ID de invitado no encontrado en el enlace.');
    return;
  }

  try {
    const res = await fetch('invitados.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);

    const invitados = await res.json();
    const invitado = invitados[invitadoId] || null;

    const nombreEl = document.getElementById('nombreInvitado');
    const pasesEl  = document.getElementById('cantidadPases');

    // Nombre con adjetivo (ocultar si no hay)
    if (invitado?.nombre && invitado.nombre.toLowerCase() !== 'sin nombre') {
      const adjetivo = invitado?.adjetivo ? invitado.adjetivo + " " : "";
      nombreEl.innerText = adjetivo + invitado.nombre;
      nombreEl.style.display = '';
    } else {
      nombreEl.style.display = 'none';
    }

    // Pases (ocultar si no hay número)
    if (Number.isFinite(invitado?.pases)) {
      pasesEl.innerText = `Pases: ${invitado.pases}`;
      pasesEl.style.display = '';
    } else {
      pasesEl.style.display = 'none';
    }

    // Guarda en memoria por si lo necesitas en otras funciones
    window.__invitadoActual = invitado;
  } catch (e) {
    console.error('No se pudo cargar invitados.json', e);
  }
}

  

// Función para iniciar el contador de la fecha del evento
function iniciarContador() {
    const eventoFecha = new Date("November, 8, 2025 20:00:00").getTime();

    setInterval(() => {
        const ahora = new Date().getTime();
        const diferencia = eventoFecha - ahora;

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        document.getElementById("dias").innerText = dias;
        document.getElementById("horas").innerText = horas;
        document.getElementById("minutos").innerText = minutos;
        document.getElementById("segundos").innerText = segundos;
    }, 1000);
}

// Función para abrir el lightbox solo al hacer clic en una imagen de la galería
function changePhoto(element) {
    const mainPhotoModal = document.getElementById('main-photo-modal');

    // Establecer la imagen del modal como la imagen seleccionada
    mainPhotoModal.src = element.src;

    // Mostrar el modal
    openModal();
}

// Función para mostrar el modal
function openModal() {
    const modal = document.getElementById('photo-modal');
    modal.style.display = 'flex'; // Usar 'flex' para centrar la imagen en pantalla
}

// Función para cerrar el modal
function closeModal(event) {
    // Cerrar el modal solo si el clic no fue en la imagen
    if (event.target.id === 'photo-modal' || event.target.className === 'close') {
        const modal = document.getElementById('photo-modal');
        modal.style.display = 'none';
    }
}

    // Fade-in effect cuando los elementos se hacen visibles al hacer scroll
    document.addEventListener("DOMContentLoaded", function() {
        const elementsToFade = document.querySelectorAll('.fade-in-element');

        const observerOptions = {
            threshold: 0.5, // El porcentaje del elemento que debe ser visible antes de activar la animación
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Deja de observar una vez que la animación se activa
                }
            });
        }, observerOptions);

        elementsToFade.forEach(element => {
            observer.observe(element);
        });
    });

// Link directo (puede ser el corto o el largo)
const GF_BASE = "https://forms.gle/Yv2J5HgAFUi495dW6";

// Confirmación → abre el formulario en nueva pestaña
function confirmarAsistencia() {
  window.open(GF_BASE, '_blank');
}

//Funcion para abrir Maps o maps
//iglesia
// Iglesia
function elegirAplicacion() {
  const enlaceMaps = 'https://maps.app.goo.gl/Kz4ssVx6yP6AEW1H6';
  window.open(enlaceMaps, '_blank');
}

// Fiesta
function elegirAplicacionOtraDireccion() {
  const enlaceMaps = 'https://maps.app.goo.gl/2weAdNve1fqtiadz5';
  window.open(enlaceMaps, '_blank');
}

document.addEventListener('DOMContentLoaded', function () {
  // --- Listener para enviar deseo ---
  document.getElementById('submit-wish').addEventListener('click', function () {
    const nombre = document.getElementById('wish-name').value.trim();
    const mensaje = document.getElementById('wish-message').value.trim();

    if (!nombre || !mensaje) {
      alert('Por favor, completa ambos campos.');
      return;
    }

    window.guardarDeseo(nombre, mensaje)
      .then(() => {
        alert('¡Gracias por enviar tu deseo a Daniela! 💖');
        document.getElementById('wish-name').value = '';
        document.getElementById('wish-message').value = '';
      })
      .catch((error) => {
        console.error('Error al guardar el deseo:', error);
        alert('Hubo un problema al enviar tu mensaje.');
      });
  });

  // --- Listener para mostrar/ocultar deseos ---
  document.getElementById('toggle-wishes-btn').addEventListener('click', function () {
    const btn = this;
    const wishesDiv = document.getElementById('wishes-container');

    if (wishesDiv.classList.contains('visible')) {
      wishesDiv.classList.remove('visible');
      wishesDiv.classList.add('hidden');
      btn.textContent = 'Leer los deseos';
      return;
    }

    if (wishesDiv.dataset.loaded === 'true') {
      wishesDiv.classList.remove('hidden');
      wishesDiv.classList.add('visible');
      btn.textContent = 'Ocultar deseos';
      return;
    }

    // Si aún no ha cargado, traer los datos desde Firebase
    btn.disabled = true;
    btn.textContent = 'Cargando...';

    window.toggleWishes();

    setTimeout(() => {
      btn.textContent = 'Ocultar deseos';
      btn.disabled = false;
    }, 500);
  });
});

  
const twinlkes = document.getElementById("twinles");

for (let i = 0; i < 25; i++) { // 25 destellos
  let s = document.createElement("div");
  s.classList.add("sparkle");
  s.style.top = Math.random() * 100 + "vh";
  s.style.left = Math.random() * 100 + "vw";
  s.style.animationDelay = Math.random() * 5 + "s";
  twinkles.appendChild(s);
}

