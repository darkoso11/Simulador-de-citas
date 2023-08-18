document.addEventListener("DOMContentLoaded", () => {
  const diaSeleccionadoContainer = document.getElementById("dia-seleccionado");
  const tratamientoSeleccionadoContainer = document.getElementById("tratamiento-seleccionado");

  const storedDay = localStorage.getItem("selectedDay");
  const storedTreatment = localStorage.getItem("selectedTreatment");

  if (storedDay && storedTreatment) {
    diaSeleccionadoContainer.textContent = `Día seleccionado: ${storedDay}`;
    tratamientoSeleccionadoContainer.textContent = `Tratamiento seleccionado: ${storedTreatment}`;
  } else {
    // Si no se encuentran datos almacenados, muestra un mensaje de error
    diaSeleccionadoContainer.textContent = "No hay día seleccionado.";
    tratamientoSeleccionadoContainer.textContent = "No hay tratamiento seleccionado.";
  }

  const agendarCitaBtn = document.getElementById("agendar-cita");
  agendarCitaBtn.addEventListener("click", () => {
    if (storedDay && storedTreatment) {
      // Agregar la alerta de SweetAlert
      Swal.fire({
        icon: "success",
        title: "Cita Agendada Exitosamente",
        text: `La cita para el día ${storedDay} con el tratamiento "${storedTreatment}" ha sido agendada exitosamente.`,
      }).then(() => {
        // Vaciar el LocalStorage
        localStorage.removeItem("selectedDay");
        localStorage.removeItem("selectedTreatment");
        // Actualizar los contenedores para mostrar que no hay datos seleccionados
        diaSeleccionadoContainer.textContent = "No hay día seleccionado.";
        tratamientoSeleccionadoContainer.textContent = "No hay tratamiento seleccionado.";
      });
    } else {
      // Si no hay datos seleccionados, mostrar una alerta de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se han seleccionado día y tratamiento. Por favor, seleccione un día y un tratamiento antes de agendar la cita.",
      });
    }
  });
});





