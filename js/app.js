var residencial = 2.25; 
var comercial = 4.5;

let usuarios = [
    {
      "nombre": "Juan Marcelo",
      "apellido": "Perez",
      "dni": 15447744,
      "tipoDomicilio": "Residencial",
      "consumoKw": 270,
      "deuda": 0,
      "totalPago": 0
    },
    {
      "nombre": "Maria Lujan",
      "apellido": "Dominguez",
      "dni": 36447744,
      "tipoDomicilio": "Comercial",
      "consumoKw": 570,
      "deuda": 2500.0,
      "totalPago": 0
    },
    {
      "nombre": "Pablo Daniel",
      "apellido": "Duval",
      "dni": 27887741,
      "tipoDomicilio": "Comercial",
      "consumoKw": 700,
      "deuda": 3000.0,
      "totalPago": 0
    },
    {
      "nombre": "Laura Martina",
      "apellido": "Janelli",
      "dni": 35448521,
      "tipoDomicilio": "Residencial",
      "consumoKw": 190,
      "deuda": 0,
      "totalPago": 0
    },
    {
      "nombre": "Heberto Juan",
      "apellido": "Romay",
      "dni": 21774856,
      "tipoDomicilio": "Comercial",
      "consumoKw": 510,
      "deuda": 5000.0,
      "totalPago": 0
    },
    {
      "nombre": "Sofia Estefania",
      "apellido": "Simon",
      "dni": 32554477,
      "tipoDomicilio": "Residencial",
      "consumoKw": 190,
      "deuda": 0,
      "totalPago": 0
    },
    {
      "nombre": "Pablo Martin",
      "apellido": "Lopez",
      "dni": 38557744,
      "tipoDomicilio": "Residencial",
      "consumoKw": 320,
      "deuda": 4000,
      "totalPago": 0
    },
]   


function calcularPago(user) {
    let totalPagar = 0;

    if(user.tipoDomicilio === "Comercial") totalPagar = user.consumoKw * comercial;
    if(user.tipoDomicilio === "Residencial") totalPagar = user.consumoKw * residencial;

    user.totalPago = totalPagar;
}


function calcularPagosUsuarios() { 
    var lista=document.getElementById("ulListado");

    usuarios.forEach(function(data) {
        calcularPago(data);
        var linew= document.createElement("li");    
        var contenido = document.createTextNode(data.nombre+" | "+data.apellido+" | "+data.dni+" | "
        +data.tipoDomicilio+" | "+data.consumoKw+" | "+data.deuda +" | "+data.totalPago);
        lista.appendChild(linew);
        linew.appendChild(contenido);
    });
}


function agregarUsuario(user) {
    usuarios.push(user);
}


function eliminarUsuario(dni) {
    const pos = usuarios.map(usuario => usuario.dni).indexOf(dni);
    usuarios.splice(pos, 1);
}


function descuento(user) {
    console.log(user.totalPago);
    if(user.deuda === 0) {
        if(user.tipoDomicilio === "Residencial") {
            if(user.consumoKw > 2000 && user.consumoKw <= 5000) user.totalPago = user.totalPago - (user.totalPago*10)/100;
            if(user.consumoKw > 5000) user.totalPago = user.totalPago - (user.totalPago*15)/100;
        }
        if(user.tipoDomicilio === "Comercial") {
            if(user.consumoKw > 5000 && user.consumoKw <= 7000) user.totalPago = user.totalPago - (user.totalPago*10)/100;
            if(user.consumoKw > 7000) user.totalPago = user.totalPago - (user.totalPago*15)/100;
        }
    }
    console.log(user.totalPago);
    
}


const user1 = {
    "nombre": "Esteban Lautaro",
    "apellido": "Lopez",
    "dni": 34775547,
    "tipoDomicilio": "Residencial",
    "consumoKw": 6000,
    "deuda": 0,
    "totalPago": 0
};
// eliminarUsuario(35448521);
agregarUsuario(user1);
calcularPagosUsuarios();
descuento(user1);
