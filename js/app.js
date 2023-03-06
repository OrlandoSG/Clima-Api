import { API } from "./api.js";

const botonBuscar = document.querySelector("input[type='submit']");
// console.log(botonBuscar);
botonBuscar.addEventListener('click', (e)=>{
  e.preventDefault();

  const ubicacion = document.querySelector('.ubicacion');
  const temperatura = document.querySelector('.info');
  const fecha = document.querySelector('.fecha');
  const imagenS = document.querySelector('.imagen');
  ubicacion.innerHTML = '';
  temperatura.innerHTML = '';
  fecha.innerHTML = '';
  imagenS.innerHTML = '';


// Selectores
const pais = document.getElementById('pais').value;
const departamento = document.getElementById('departamento').value;
const ciudad = document.getElementById('ciudad').value;
const spinner = document.querySelector('.spinner');
spinner.style.display = 'block';

setTimeout(() => {
    spinner.style.display = 'none';

    if(pais.trim().length > 0 &&  departamento.trim().length > 0 && ciudad.trim().length > 0 ){

        const api = new API(pais,departamento,ciudad);
        api.ObtenerApi()
          .then((data)=>{
    
               mostrarClima(data);
    
    
          }).catch((errores)=>{
    
            let error = document.querySelector('.error');
            error.innerHTML = '<h3> No se encontro pruebe ingresando otros sitios</h3>'
            setTimeout(() => {
                error.innerHTML = '';
            }, 3000);
          });
    
    
    }else{
        let error = document.querySelector('.error');
        error.innerHTML = '<h3> por favor, rellena todos los campos son obligatorios</h3>'
    
        setTimeout(() => {
            error.innerHTML = '';
        }, 3000);
        
    }


    
}, 3000); 
// fin del setTimeout





});



function mostrarClima(data){
    let error = document.querySelector('.error');
    error.innerHTML = '';

    const ubicacion = document.querySelector('.ubicacion');
    const temperatura = document.querySelector('.info');
    const fecha = document.querySelector('.fecha');
    // console.log(data);
    let grados =  Math.round(data.data.values.temperature);

    ubicacion.innerHTML = `<h3> ${data.location.name}</h3>`;
    temperatura.innerHTML = `<h4> Temperatura : ${grados}  °C </h4>`;
    let fechas = new Date();
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    fecha.innerHTML = `<h3> Fecha: ${ fechas.toLocaleDateString("es-ES", options)}</h3>`;
    
    // evaluamos de acuerdo a la temperatura y hora insertamos la imagen 
  
    insertamosImagen(grados)


}


function insertamosImagen(grados){
    //  grados = 16;
    let hora = new Date().getHours();
//    hora = 12;
    const imagenS = document.querySelector('.imagen');

    // evaluamos 
    // evaluamos si es de dia o noche
    if(hora >= 7 && hora <=  18 ){
        // dia
        // console.log('dia');

      if(grados <= 15 ){
        // solo nubes
        // console.log('solo nubes si son de 15 hacia abajo');
        imagenS.innerHTML = `<img src='img/clima/nubes.png' alta="nubes">`;
       

      } else if(grados >= 16 && grados <= 26){
        // nubes con sol 
        // console.log(' nubes con sol sin son 16 entre 26 grados');
        imagenS.innerHTML = `<img src='img/clima/nubesSol.png' alta="nubes y Sol">`;

      } else {
        //   sol 
        // console.log(' mayores a 26 solo sol');
        imagenS.innerHTML = `<img src='img/clima/sol.png' alta="Sol">`;
      }

    }else{
        // noche
        // console.log('noche')
        if(grados <= 10){
            // solo nubes
            // console.log('menores de 10 solo nubes');
            imagenS.innerHTML = `<img src='img/clima/nubes.png' alta="nubes">`;

        } else if( grados >= 11 && grados <= 18){
            // nubes con luna
            // console.log(' mayores de 10 y menores de 19 nubes con luna');
            imagenS.innerHTML = `<img src='img/clima/lunaNubes.png' alta="nubes y Sol">`;
        }else{
            // luna
            // console.log(' mayores de 18, luna');
            imagenS.innerHTML = `<img src='img/clima/luna.png' alta="nubes y Sol">`;
        }

    }


}





// Clima cambiar fondo de pantalla

setInterval(() => {

    let hora = new Date().getHours();
    // let hora = 3;

    const body = document.querySelector('body');

    if(hora >= 7 && hora  <= 10){
        // console.log('mañana');

        body.style.backgroundImage = "url('/img/fondo1.jpg')";

    }else if(hora >= 11 && hora  <= 16){
  
        body.style.backgroundImage = "url('/img/fondo2.jpg')";

    }else if(hora >= 17 && hora  <= 19){
        
        body.style.backgroundImage = "url('/img/fondo3.jpg')";

    }else{

        body.style.backgroundImage = "url('/img/fondo4.jpg')";

    }

    
}, 1000);