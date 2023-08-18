document.addEventListener('DOMContentLoaded', () => {
  const diasMesContainer = document.getElementById("dias-mes");
  const diaSeleccionadoContainer = document.getElementById("dia-seleccionado");

  const primerDiaSemana = 5;
  
  for (let i = 0; i < primerDiaSemana; i++) {
    const diaVacio = document.createElement("div");
    diaVacio.classList.add("dia");
    diasMesContainer.appendChild(diaVacio);
  }
  
  const diasMes = 31;
  for (let i = 1; i <= diasMes; i++) {
    const dia = document.createElement("div");
    dia.textContent = i;
    dia.classList.add("dia");
    dia.addEventListener("click", () => {
      const diaSeleccionado = document.querySelector(".dia-seleccionado");
      if (diaSeleccionado) {
        diaSeleccionado.classList.remove("dia-seleccionado");
      }
      dia.classList.add("dia-seleccionado");
      if (diaSeleccionadoContainer) { // Verificar si el elemento existe antes de asignar contenido
        diaSeleccionadoContainer.textContent = `${i}`;
      }
      localStorage.setItem("selectedDay", i);
    });
    diasMesContainer.appendChild(dia);
  }
  
  const storedDay = localStorage.getItem("selectedDay");
  if (storedDay) {
    const diaSeleccionado = document.querySelector(
      `.dia:nth-child(${parseInt(storedDay) + primerDiaSemana})`
    );
    diaSeleccionado.classList.add("dia-seleccionado");
    diaSeleccionadoContainer.textContent = `${storedDay}`;
  }
});

