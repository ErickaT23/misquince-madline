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

window.toggleWishes = function() {
  const wishesDiv = document.getElementById('wishes-container');

  if (wishesDiv.classList.contains('visible')) {
    wishesDiv.classList.remove('visible');
    wishesDiv.classList.add('hidden');
    return;
  }

  if (wishesDiv.dataset.loaded === 'true') {
    wishesDiv.classList.remove('hidden');
    wishesDiv.classList.add('visible');
    return;
  }

  onValue(ref(db, 'buenos-deseos/'), (snapshot) => {
    requestIdleCallback(() => {
      wishesDiv.innerHTML = '';

      snapshot.forEach((childSnapshot) => {
        const wish = childSnapshot.val();
        const wishElement = document.createElement('p');
        wishElement.innerHTML = `<strong>${wish.nombre}:</strong> ${wish.mensaje}`;
        wishesDiv.appendChild(wishElement);
      });

      wishesDiv.dataset.loaded = 'true';
      wishesDiv.classList.remove('hidden');
      wishesDiv.classList.add('visible');
    });
  });
};
