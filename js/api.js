/* const url = "js/tratamientos_data.json" */
const obtenerTratamientosDesdeBD = () => {
    return fetch('js/tratamientos_data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  
  export { obtenerTratamientosDesdeBD };