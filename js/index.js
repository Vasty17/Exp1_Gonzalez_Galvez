const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const campos = {
  usuario: false,
  password: false,
  correo: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "usuario":
      validarCampo(expresiones.usuario, e.target, "usuario");
      break;
    case "password":
      validarCampo(expresiones.password, e.target, "password");
      validarPassword2();
      break;
    case "password2":
      validarPassword2();
      break;
    case "correo":
      validarCampo(expresiones.correo, e.target, "correo");
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos[campo] = false;
  }
};

const validarPassword2 = () => {
  const inputPassword1 = document.getElementById("password");
  const inputPassword2 = document.getElementById("password2");

  if (inputPassword1.value !== inputPassword2.value) {
    document
      .getElementById(`grupo__password2`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__password2`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo__password2 .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos["password"] = false;
  } else {
    document
      .getElementById(`grupo__password2`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__password2`)
      .classList.add("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo__password2 .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos["password"] = true;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (campos.usuario && campos.password && campos.correo ) {
    formulario.reset();
    document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
    
    setTimeout(() => {
      document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo");
      window.location.href = "login.html"; // Redirección a login.html
  }, 5000);
    document
      .getElementById("formulario__mensaje-exito")
      .classList.add("formulario__mensaje-exito-activo");

    setTimeout(() => {
      document
        .getElementById("formulario__mensaje-exito")
        .classList.remove("formulario__mensaje-exito-activo");
    }, 5000);

    document
      .querySelectorAll(".formulario__grupo-correcto")
      .forEach((icono) => {
        icono.classList.remove("formulario__grupo-correcto");
      });
  } else {
    document
      .getElementById("formulario__mensaje")
      .classList.add("formulario__mensaje-activo");
  }
});

document.getElementById('showPassword').addEventListener('change', function() {
  const passwordField = document.getElementById('password');
  if (this.checked) {
      passwordField.type = 'text'; 
  } else {
      passwordField.type = 'password'; 
  }
});

// api del tiempo http://worldtimeapi.org/api/timezone/America/Santiago

async function obtenerHora() {
  try {
      const respuesta = await fetch('http://worldtimeapi.org/api/timezone/America/Santiago');
      if (!respuesta.ok) {
          throw new Error('Error en la red');
      }
      const datos = await respuesta.json();
      const fechaHora = new Date(datos.datetime);
      
      // Formatear la hora
      const horas = fechaHora.getHours();
      const minutos = fechaHora.getMinutes();
      const segundos = fechaHora.getSeconds();
      const am_pm = horas >= 12 ? 'PM' : 'AM';

      // Ajustar horas para formato de 12 horas
      const horasFormateadas = horas % 12 || 12; // La hora '0' debe ser '12'
      const minutosFormateados = minutos < 10 ? '0' + minutos : minutos;
      const segundosFormateados = segundos < 10 ? '0' + segundos : segundos;

      const tiempo = `${horasFormateadas}:${minutosFormateados}:${segundosFormateados} ${am_pm}`;

      // Mostrar la hora en el div
      document.getElementById('reloj').innerText = tiempo;
  } catch (error) {
      console.error('Error al obtener la hora:', error);
      document.getElementById('reloj').innerText = 'No se pudo obtener la hora.';
  }
}

// Llamar a la función cada segundo
setInterval(obtenerHora, 1000);

// Llamar a la función una vez al cargar la página
obtenerHora();