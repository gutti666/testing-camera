window.onload = function () {
  console.log("INIT JS");

  var urlIMage = "";

  var form = document.getElementById("DataToIA");
  var response = document.getElementById("response");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    // if (navigator.getUserMedia && navigator.platform == "Win32") {
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
    // } else {
    // }
    const model = document.getElementById("model").value;
    const image = document.getElementById("camera").files[0];

    let params = new URLSearchParams(window.location.search);
    const reader = new FileReader();

    try {
      const imagenBase64 = await new Promise((resolve, reject) => {
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(image);
      });

      const urlAPI = "https://back-image.datawifi.co/analyze"; // Reemplaza con la URL real de tu API
  
      const respuesta = await fetch(urlAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indica que el body es JSON
        },
        body: JSON.stringify({
          model,
          base64_image: imagenBase64,
          useragent: navigator.userAgent,
          mac: params.get("mac"),
        }),
      });

      const datosRespuesta = await respuesta.json();

      response.innerHTML = `<span>${datosRespuesta.description}</span>`;
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  });
};
