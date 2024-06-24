window.onload = function () {
  console.log("INIT JS");
  var form = document.getElementById("DataToIA");
  var response = document.getElementById("response");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = document.getElementById("model").value;
    const image = document.getElementById("camera").files[0];
    const reader = new FileReader();

    try {
      const imagenBase64 = await new Promise((resolve, reject) => {
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(image);
      });

      const datos = new FormData();
      datos.append("model", nombre);
      datos.append("imagesBase64", imagenBase64);
      datos.append("image", image);

      // Procesar los datos del formulario (por ejemplo, enviarlos a un servidor)
      console.log(datos);
      const urlAPI = "https://testing-camera.free.beeceptor.com/data"; // Reemplaza con la URL real de tu API

      const respuesta = await fetch(urlAPI, {
        method: "POST",
        body: datos,
      });

      const datosRespuesta = await respuesta.json();
      console.log("Datos enviados correctamente:", datosRespuesta);
      console.log(imagenBase64);
      response.innerHTML = `<span>${imagenBase64}</span>`;
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  });
};
