/**
 * A integer number
 * @type {number}
 * @default 2.25
 */
var residencial = 2.25;

/**
 * A integer number
 * @type {number}
 * @default 4.5
 */
var comercial = 4.5;

/**
 * Arreglo de usuarios
 * @type {Array<Object>}
 */
let usuarios = [
  {
    "nombre": "Juan Marcelo",
    "apellido": "Perez",
    "dni": 15447744,
    "tipoDomicilio": "Residencial",
    "consumoKw": 3000,
    "deuda": 0,
    "totalPago": 0
  },
  {
    "nombre": "Maria Lujan",
    "apellido": "Dominguez",
    "dni": 36447744,
    "tipoDomicilio": "Comercial",
    "consumoKw": 5960,
    "deuda": 2500.0,
    "totalPago": 0
  },
  {
    "nombre": "Pablo Daniel",
    "apellido": "Duval",
    "dni": 27887741,
    "tipoDomicilio": "Comercial",
    "consumoKw": 9420,
    "deuda": 3000.0,
    "totalPago": 0
  },
  {
    "nombre": "Laura Martina",
    "apellido": "Janelli",
    "dni": 35448521,
    "tipoDomicilio": "Residencial",
    "consumoKw": 6500,
    "deuda": 0,
    "totalPago": 0
  },
  {
    "nombre": "Heberto Juan",
    "apellido": "Romay",
    "dni": 21774856,
    "tipoDomicilio": "Comercial",
    "consumoKw": 4430,
    "deuda": 5000.0,
    "totalPago": 0
  },
  {
    "nombre": "Sofia Estefania",
    "apellido": "Simon",
    "dni": 32554477,
    "tipoDomicilio": "Residencial",
    "consumoKw": 1900,
    "deuda": 0,
    "totalPago": 0
  },
  {
    "nombre": "Pablo Martin",
    "apellido": "Lopez",
    "dni": 38557744,
    "tipoDomicilio": "Residencial",
    "consumoKw": 1990,
    "deuda": 2850,
    "totalPago": 0
  },
]

/**
 * Arreglo de una copia del arreglo de usuarios
 * @type {Array<Object>}
 */
let auxUsuarios = usuarios;


/**
 * Calcula el total a pagar del usuario.
 *
 * @param Object usuario.
 * @return void modificacion del campo totalPago del usuario.
 */
function calcularPago(user) {

  if (user.tipoDomicilio === "Comercial") user.totalPago = user.consumoKw * comercial;
  if (user.tipoDomicilio === "Residencial") user.totalPago = user.consumoKw * residencial;

  if (user.deuda === 0) {
    if (user.tipoDomicilio === "Residencial") {
      if (user.consumoKw > 2000 && user.consumoKw <= 5000) user.totalPago = user.totalPago - (user.totalPago * 10) / 100;
      if (user.consumoKw > 5000) user.totalPago = user.totalPago - (user.totalPago * 15) / 100;
    }
    if (user.tipoDomicilio === "Comercial") {
      if (user.consumoKw > 5000 && user.consumoKw <= 7000) user.totalPago = user.totalPago - (user.totalPago * 10) / 100;
      if (user.consumoKw > 7000) user.totalPago = user.totalPago - (user.totalPago * 15) / 100;
    }
  } else {
    user.totalPago = user.totalPago + user.deuda;
  }
}


/**
 * Muestra en la interfaz de usuario una tabla del arreglo de auxUsuarios, con el boton eliminar usuario.
 *
 * @return void - Lista de usuarios.
 */
function mostrarUsuarios() {

  var tablaUsuarios = '<table id="usuarios" class="table table-dark table-hover shadow-lg">';
  tablaUsuarios = tablaUsuarios + '<tr> <th>Nombre</th> <th>Apellido</th> <th>DNI</th> <th>Tipo domicilio</th> <th>Consumo KW</th> <th>Deuda</th> <th>Total a pagar</th> <th>-</th></tr>';
  auxUsuarios.forEach(user => {
    calcularPago(user);
    tablaUsuarios = tablaUsuarios + '<tr>';
    tablaUsuarios = tablaUsuarios + '<td>' + user.nombre + '</td>';
    tablaUsuarios = tablaUsuarios + '<td>' + user.apellido + '</td>';
    tablaUsuarios = tablaUsuarios + '<td>' + user.dni + '</td>';
    tablaUsuarios = tablaUsuarios + '<td>' + user.tipoDomicilio + '</td>';
    tablaUsuarios = tablaUsuarios + '<td>' + user.consumoKw + '</td>';
    tablaUsuarios = tablaUsuarios + '<td>$' + user.deuda + '</td>';
    tablaUsuarios = tablaUsuarios + '<td>$' + user.totalPago + '</td>';
    tablaUsuarios = tablaUsuarios + '<td><button type="button" class="btn bg-red-500 btn-danger" onclick="eliminarUsuario(' + user.dni + ')">Eliminar</button></td>';
    tablaUsuarios = tablaUsuarios + '</tr>';

  });
  tablaUsuarios = tablaUsuarios + '</table>';

  document.getElementById('lista').innerHTML = tablaUsuarios;
}


/**
 * Agrega un usuario a la lista de auxUsuarios y lo muestra en pantalla.
 *
 * @return void modificacion del arreglo auxUsuarios al ingresar un nuevo Objeto.
 */
function agregarUsuario() {

  var nombre = document.getElementById('inputNombre').value;
  var apellido = document.getElementById('inputApellido').value;
  var dni = parseFloat(document.getElementById('inputDni').value);
  var tipoDom = document.getElementById('inputTdom').value;
  var consumo = parseFloat(document.getElementById('inputConKw').value);
  var deuda = parseFloat(document.getElementById('inputDeuda').value);

  if (nombre === '' || apellido === '' || Number.isNaN(dni) || tipoDom === ''
    || Number.isNaN(consumo) || Number.isNaN(deuda)) {
    return;
  }

  const user = {
    "nombre": nombre,
    "apellido": apellido,
    "dni": dni,
    "tipoDomicilio": tipoDom,
    "consumoKw": consumo,
    "deuda": deuda,
    "totalPago": 0
  };

  ocultarMostrar()
  calcularPago(user);
  auxUsuarios.push(user);
  localStorage.setItem("usuarios", JSON.stringify(auxUsuarios));
  mostrarUsuarios();
}


/**
 * Busca un usuario por DNI y lo elimina de la lista de auxUsuarios.
 *
 * @param Integer dni.
 * @return void modificacion del arreglo auxUsuarios al eliminar un Objeto.
 */
function eliminarUsuario(dni) {
  const pos = auxUsuarios.map(usuario => usuario.dni).indexOf(dni);
  auxUsuarios.splice(pos, 1);
  localStorage.setItem("usuarios", JSON.stringify(auxUsuarios));
  mostrarUsuarios();
}


/**
 * Filtra la lista de auxUsuarios cuando la deuda del usuario sea mayor a  0.
 *
 * @return void modificacion del arreglo auxUsuarios al mostrar los usuarios filtrados.
 */
function filtrarDeudores() {
  auxUsuarios = auxUsuarios.filter(usuario => usuario.deuda > 0);
  mostrarUsuarios();
}


/**
 * Ordena alfabeticament la lista de usuario por nombre de usuario.
 *
 * @return void modificacion del arreglo auxUsuarios en orden alfabetico.
 */
function ordAlfabNombre() {
  auxUsuarios = auxUsuarios.sort((a, b) => a.nombre.localeCompare(b.nombre));
  mostrarUsuarios();
}


/**
 * Busca un usuario por DNI y lo muestra por pantalla como unico resultado.
 *
 * @return void modificacion del arreglo con un unico resultado.
 */
function buscarPorDni() {
  var dni = parseFloat(document.getElementById('buscar').value);
  if (dni) {
    const pos = auxUsuarios.map(usuario => usuario.dni).indexOf(dni);
    console.log(auxUsuarios[pos]);
    let usuarioUnico = [];
    usuarioUnico.push(auxUsuarios[pos])
    auxUsuarios = usuarioUnico;
    mostrarUsuarios();
  }
}


/**
 * Resetea el arreglo auxUsuarios y lo igual al arreglo usuarios, si hay usuarios en el localStorage los toma de ahi.
 *
 * @return void modificacion del arreglo auxUsuarios.
 */
function resetearUsuarios() {
  if (JSON.parse(localStorage.getItem("usuarios"))) {
    auxUsuarios = JSON.parse(localStorage.getItem("usuarios"));
  } else {
    auxUsuarios = usuarios;
  }
  mostrarUsuarios();
}


/**
 * Muestro y oculta el div de agregar cliente.
 *
 * @return void muestra o oculta div id=agregarUser.
 */
function ocultarMostrar() {
  auxUsuarios = JSON.parse(localStorage.getItem("usuarios"));
  console.log(auxUsuarios)
  if (document.getElementById('agregarUser').style.display === "none") {
    document.getElementById('agregarUser').style.display = "block";
  } else {
    document.getElementById('agregarUser').style.display = "none";
  }
}


/**
 * Oculta y carga nuevamente la lista de clientes.
 *
 * @return void oculta el div id=agregarUser.
 */
function cancelar() {
  auxUsuarios = JSON.parse(localStorage.getItem("usuarios"));
  document.getElementById('agregarUser').style.display = "none";
}


/**
 * Carga el localStorage la lista de clientes si es que hay una.
 *
 * @return void oculta el div id=agregarUser.
 */
function almacenamiento() {
  if (JSON.parse(localStorage.getItem("usuarios"))) {
    auxUsuarios = JSON.parse(localStorage.getItem("usuarios"));
  } else {
    localStorage.setItem("usuarios", JSON.stringify(auxUsuarios));
  }
  mostrarUsuarios();
}


almacenamiento();
ocultarMostrar();
