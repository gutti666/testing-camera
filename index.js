window.onload = function () {
  console.log("INIT JS");
  console.log(window.navigator.platform)
  var response = document.getElementById("response");

  response.innerHTML = `<span>${window.navigator.platform}</span>`;

  var urlIMage = "";
  // if (navigator.getUserMedia && navigator.o) {
  //   navigator.getUserMedia({ video: true, audio: false }, succes, error);

  //   function succes() {
  //     const player = document.getElementById("player");
  //     const canvas = document.getElementById("canvas");
  //     const context = canvas.getContext("2d");
  //     const captureButton = document.getElementById("capture");
  //     const constraints = {
  //       video: true,
  //     };

  //     captureButton.addEventListener("click", async (e) => {
  //       context.drawImage(player, 0, 0, canvas.width, canvas.height);
  //       urlIMage = canvas.toDataURL();
  //       player.srcObject.getVideoTracks().forEach((track) => track.stop());
  //     });

  //     // Attach the video stream to the video element and autoplay.
  //     navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
  //       player.srcObject = stream;
  //     });
  //   }
  //   function error() {}
  // }
  var form = document.getElementById("DataToIA");
  var response = document.getElementById("response");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const model = document.getElementById("model").value;
    if (navigator.getUserMedia) {
    } else {
      const image = document.getElementById("camera").files[0];
    }
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
