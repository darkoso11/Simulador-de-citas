import { obtenerTratamientosDesdeBD } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const tratamientoSeleccionadoContainer = document.getElementById('tratamiento-seleccionado');
  const tratamientosContainer = document.getElementById('tratamientos-container');

  const armarCardDinamica = (tratamiento) => {
    return `
      <div class="tarjeta">
        <div class="titulo">${tratamiento.nombre}</div>
        <div class="doctor">${tratamiento.doctor}</div>
        <div class="cuerpo">
          <img src="${tratamiento.img}" alt="${tratamiento.nombre}" class="imagencard">
        </div>
        <div class="pie">
        <h4>seleccionar</h4>
          <div class="card-button">
          <button class="button button-outline button-add" data-tratamiento-id="${tratamiento.id}" title="Clic para agregar a favoritos" id="diente">🦷</button>
          </div>                   
        </div>
      </div>
    `;
  };

  const agregarClickEnBotonesFav = () => {
    const buttons = document.querySelectorAll('button.button-add');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const tratamientoId = button.dataset.tratamientoId;
        const tratamientoSeleccionadoContainer = document.getElementById('tratamiento-seleccionado');

        if (button.classList.contains('selected')) {
          console.log(`Tratamiento deseleccionado: ${tratamientoId}`);
          if (tratamientoSeleccionadoContainer) {
            tratamientoSeleccionadoContainer.textContent = '';
            tratamientoSeleccionadoContainer.classList.remove('tratamiento-seleccionado');
          }
          localStorage.removeItem('selectedTreatment');
          button.classList.remove('selected');
        } else {
          obtenerTratamientosDesdeBD()
            .then(tratamientos => {
              const tratamiento = tratamientos.find(t => t.id === parseInt(tratamientoId));
              if (tratamiento) {
                console.log(`Tratamiento seleccionado: ${tratamiento.nombre}`);
                if (tratamientoSeleccionadoContainer) {
                  tratamientoSeleccionadoContainer.textContent = `Tratamiento seleccionado: ${tratamiento.nombre}`;
                  tratamientoSeleccionadoContainer.classList.add('tratamiento-seleccionado');
                }
                localStorage.setItem('selectedTreatment', tratamiento.nombre); // Almacenar solo el nombre del tratamiento en el LocalStorage
                button.classList.add('selected');
              } else {
                console.error(`Tratamiento no encontrado con el id ${tratamientoId}`);
              }
            })
            .catch(error => {
              console.error('Error loading treatments:', error);
            });
        }
      });
    });
  };

  const cargarTratamientos = () => {
    obtenerTratamientosDesdeBD()
      .then(tratamientos => {
        tratamientosContainer.innerHTML = '';
        if (tratamientos.length > 0) {
          tratamientos.forEach((tratamiento) => {
            tratamientosContainer.innerHTML += armarCardDinamica(tratamiento);
          });
          agregarClickEnBotonesFav();
        }
      })
      .catch(error => {
        console.error('Error loading treatments:', error);
      });
  };

  cargarTratamientos();
});



