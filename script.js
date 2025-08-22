const fotoInput = document.getElementById('foto');
const previewImg = document.getElementById('preview');
const historial = document.getElementById('historial');

fotoInput.addEventListener('change', () => {
  const file = fotoInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      previewImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

function guardarAseo() {
  const lugar = document.getElementById('lugar').value;
  const imagen = previewImg.src;

  if (!imagen) {
    alert("Por favor, toma una foto antes de guardar.");
    return;
  }

  const li = document.createElement('li');
  li.textContent = `Aseo en ${lugar} registrado.`;
  historial.appendChild(li);

  // Limpieza después de guardar
  previewImg.src = "";
  fotoInput.value = "";
}
