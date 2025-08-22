const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const tomarFotoBtn = document.getElementById('tomarFoto');
const previewImg = document.getElementById('previewImg');
const guardarBtn = document.getElementById('guardar');
const registrosDiv = document.getElementById('registros');
const lugarSelect = document.getElementById('lugar');


navigator.mediaDevices.getUserMedia({
  video: { facingMode: { exact: "environment" } }
})
.then(stream => {
  video.srcObject = stream;
})
.catch(() => {

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(err => console.error("Error al acceder a la cámara:", err));
});

tomarFotoBtn.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = canvas.toDataURL('image/png');
  previewImg.src = imageData;
});

guardarBtn.addEventListener('click', () => {
  const lugar = lugarSelect.value;
  const imagen = previewImg.src;

  if (!imagen) {
    alert("Primero toma una foto.");
    return;
  }

  const registro = document.createElement('div');
  registro.classList.add('registro');
  registro.innerHTML = `
    <p><strong>Lugar:</strong> ${lugar}</p>
    <img src="${imagen}" alt="Foto de aseo">
    <hr>
  `;

  registrosDiv.appendChild(registro);

  previewImg.src = "";
});
