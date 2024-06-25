window.onload = function () {
  console.log("INIT JS");
  // console.log(navigator.getUserMedia())
  // if (navigator.getUserMedia) {
    navigator.getUserMedia({ video: true, audio: false },succes,error);
  // }
  function succes(){

  }
  function error(){

  }
  var form = document.getElementById("DataToIA");
  var response = document.getElementById("response");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const model = document.getElementById("model").value;
    const image = document.getElementById("camera").files[0];
    let params = new URLSearchParams(window.location.search);
    const reader = new FileReader();

    try {
      const imagenBase64 = await new Promise((resolve, reject) => {
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(image);
      });

      const urlAPI = "https://testing-camera.free.beeceptor.com/data"; // Reemplaza con la URL real de tu API

      const respuesta = await fetch(urlAPI, {
        method: "POST",
        body: {
          model,
          image,
          useragent,
          mac: params.get("mac"),
        },
      });

      const datosRespuesta = await respuesta.json();

      response.innerHTML = `<span>${datosRespuesta}</span>`;
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  });
};
