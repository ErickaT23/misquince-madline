import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js';
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyD7A0E0VEKlwvVB5_OsgxQEdwctNEclQPw",
  authDomain: "misquince-madeline.firebaseapp.com",
  projectId: "misquince-madeline",
  storageBucket: "misquince-madeline.firebasestorage.app",
  messagingSenderId: "733083300382",
  appId: "1:733083300382:web:34771a626a8a4f0c71f40f"
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Definir funciones globales
window.guardarDeseo = function(nombre, mensaje) {
  return push(ref(db, 'buenos-deseos/'), {
    nombre,
    mensaje,
    timestamp: new Date().toISOString()
  });
};

window.toggleWishes = function () {
  const wishesDiv = document.getElementById('wishes-container');
  const dbRef = ref(db, 'buenos-deseos/');

  // Si ya está visible, lo ocultamos
  if (wishesDiv.classList.contains('visible')) {
    wishesDiv.classList.remove('visible');
    wishesDiv.classList.add('hidden');
    return;
  }

  // Si ya fue cargado, solo mostrar
  if (wishesDiv.dataset.loaded === 'true') {
    wishesDiv.classList.remove('hidden');
    wishesDiv.classList.add('visible');
    return;
  }

  // Cargar desde Firebase
  onValue(dbRef, (snapshot) => {
    wishesDiv.innerHTML = ''; // Limpiar antes de agregar
    let count = 0;

    snapshot.forEach((childSnapshot) => {
      const wish = childSnapshot.val();
      if (!wish.nombre || !wish.mensaje) return;

      const p = document.createElement('p');
      p.innerHTML = `<strong>${wish.nombre}:</strong> ${wish.mensaje}`;
      wishesDiv.appendChild(p);
      count++;
    });

    if (count === 0) {
      wishesDiv.innerHTML = '<p style="text-align:center;">Aún no hay deseos enviados 💌</p>';
    }

    wishesDiv.dataset.loaded = 'true';
    wishesDiv.classList.remove('hidden');
    wishesDiv.classList.add('visible');
  }, { onlyOnce: true });
};
