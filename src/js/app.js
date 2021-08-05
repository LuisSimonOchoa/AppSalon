let pagina = 1;

const cita = {
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    mostrarServicios();

    // Resalta el Div actual segun el tab que se presiona
    mostrarSeccion();

    // Oculta o muestra una seccion segun el tab al que se presiona
    cambiarSeccion();

    // Paginacion siguiente y anterior
    paginaSiguiente();
    paginaAnterior();

    // Comprueba la pagina actual para ocultar o mostrar la paginacion
    botonesPaginador();

    // Muestra el resumen de la cita ( o mensaje de error en caso de no pasar la validacion)
    mostrarResumen();

    // Almacena el nombre de la cita en el objeto
    nombreCita();

    // Almacena la fecha de la cita en el objeto
    fechaCita();

    // Almacena la hora de la cita en el objeto
    horaCita();

    // deshabilitar dias pasados
    deshabilitarFechaAnterior();
}

function mostrarSeccion() {
    const seccionActual = document.querySelector(`#paso-${pagina}`);
    seccionActual.classList.add('mostrar-seccion');

    // Resalta el tab actual
    const tab = document.querySelector(`[data-paso="${pagina}"]`);
    tab.classList.add('actual');
}

function eliminarClases() {
    document.querySelector('.mostrar-seccion').classList.remove('mostrar-seccion');
    document.querySelector('.tabs .actual').classList.remove('actual');
}

function cambiarSeccion() {
    const enlaces = document.querySelectorAll('.tabs button');
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', event => {
            event.preventDefault;
            pagina = parseInt(event.target.dataset.paso);

            // Eliminar mostrar-seccion de la seccion anterior
            document.querySelector('.mostrar-seccion').classList.remove('mostrar-seccion');

            // Agrega mostrar-seccion donde dimos click
            const seccion = document.querySelector(`#paso-${pagina}`);
            seccion.classList.add('mostrar-seccion');

            // Eliminar la clase de actual en el tab anterior
            document.querySelector('.tabs .actual').classList.remove('actual');

            // Agregar la clase de actual en el nuevo tab
            const tab = document.querySelector(`[data-paso="${pagina}"]`);
            tab.classList.add('actual');
            botonesPaginador();
            // console.log(pagina);
        });
    } );
}

const data = {
    "servicios": [
        {
            "id": 1,
            "nombre": "Corte de Cabello Adulto",
            "precio": 80
        },
        {
            "id": 2,
            "nombre": "Corte de Cabello Niño",
            "precio": 60
        },
        {
            "id": 3,
            "nombre": "Corte de Cabello Mujer",
            "precio": 100
        },
        {
            "id": 4,
            "nombre": "Corte de Barba",
            "precio": 100
        },
        {
            "id": 5,
            "nombre": "Peinado Hombre",
            "precio": 60
        },
        {
            "id": 6,
            "nombre": "Peinado Mujer",
            "precio": 100
        },
        {
            "id": 7,
            "nombre": "Tinte",
            "precio": 300
        },
        {
            "id": 8,
            "nombre": "Uñas",
            "precio": 400
        },
        {
            "id": 9,
            "nombre": "Lavado de Cabello",
            "precio": 50
        },
        {
            "id": 10,
            "nombre" : "Tratamiento Capilar",
            "precio": 150
        }
    ]
}

// async function mostrarServicios() {
//     try {
//         const resultado = await fetch('./servicios.json');
//         const db = await resultado.json();
//         const { servicios } = db;
//         // Generar el HTML
//         servicios.forEach(servicio => {
//             const { id, nombre, precio } = servicio;

//             // DOM Scripting
//             // Generar nombre de servicio
//             const nombreServicio = document.createElement('P');
//             nombreServicio.textContent = nombre;
//             nombreServicio.classList.add('nombre-servicio');
            
//             // Generar precio del servicio
//             const precioServicio = document.createElement('P');
//             precioServicio.textContent = `$ ${precio}`;
//             precioServicio.classList.add('precio-servicio');
            
//             // Generar div contenedor de servicio
//             const servicioDiv = document.createElement('DIV');
//             servicioDiv.classList.add('servicio');
//             servicioDiv.dataset.idServicio = id;

//             // Selecciona un servicio para la cita
//             servicioDiv.onclick = seleccionarServicio;

//             // Inyectar precio y nombre al div de servicio
//             servicioDiv.appendChild(nombreServicio);
//             servicioDiv.appendChild(precioServicio);
            
//             //Inyectar en el HTML
//             document.querySelector('#servicios').appendChild(servicioDiv);
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }

function mostrarServicios() {
    const { servicios } = data;
    // Generar el HTML
    servicios.forEach(servicio => {
        const { id, nombre, precio } = servicio;

        // DOM Scripting
        // Generar nombre de servicio
        const nombreServicio = document.createElement('P');
        nombreServicio.textContent = nombre;
        nombreServicio.classList.add('nombre-servicio');
            
        // Generar precio del servicio
        const precioServicio = document.createElement('P');
        precioServicio.textContent = `$ ${precio}`;
        precioServicio.classList.add('precio-servicio');
            
        // Generar div contenedor de servicio
        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;

        // Selecciona un servicio para la cita
        servicioDiv.onclick = seleccionarServicio;

        // Inyectar precio y nombre al div de servicio
        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);
            
        //Inyectar en el HTML
        document.querySelector('#servicios').appendChild(servicioDiv);
    });
}

function seleccionarServicio(event) {
    let elemento;
    // Forzar que el elemento al cual le damos click sea el DIV
    if(event.target.tagName === 'P') {
        elemento = event.target.parentElement;
    } else {
        elemento = event.target;
    }
    
    if(elemento.classList.contains('seleccionado')) { // Verifica si existe la clase
        elemento.classList.remove('seleccionado'); // Elimina una clase
        const id = parseInt(elemento.dataset.idServicio);
        eliminarServicio(id);
    } else {
        elemento.classList.add('seleccionado'); // Agrega una clase
        const servicioObj = {
            id: parseInt(elemento.dataset.idServicio),
            nombre: elemento.firstElementChild.textContent,
            precio: elemento.firstElementChild.nextElementSibling.textContent
        }
        agregarServicio(servicioObj);
    }
}

function eliminarServicio(id) {
    const { servicios } = cita;
    cita.servicios = servicios.filter( servicio => servicio.id !== id);
}

function agregarServicio(objeto) {
    const { servicios } = cita;
    cita.servicios = [...servicios, objeto];
}

function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', () => {
        pagina++;
        botonesPaginador();
    })
}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', () => {
        pagina--;
        botonesPaginador();
    })
}

function botonesPaginador() {
    const paginaSiguiente = document.querySelector('#siguiente');
    const paginaAnterior = document.querySelector('#anterior');
    if(pagina === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if(pagina === 2) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if(pagina === 3) {
        paginaSiguiente.classList.add('ocultar');
        paginaAnterior.classList.remove('ocultar');
        mostrarResumen();
        // console.log(cita);
    }
    eliminarClases();
    mostrarSeccion();
}

function mostrarResumen() {
    // Destructuring
    const { nombre, fecha, hora, servicios } = cita;

    // Seleccionar el resumen
    const resumenDiv = document.querySelector('.contenido-resumen');

    // Limpia el HTML previo
    while(resumenDiv.firstChild) {
        resumenDiv.removeChild(resumenDiv.firstChild);
    }

    // Validacion de objeto
    if(Object.values(cita).includes('')) {
        const noServicios = document.createElement('P');
        noServicios.textContent = 'Faltan datos de Servicios, hora, fecha o nombre';
        noServicios.classList.add('invalidar-cita');

        // Agregar a resumenDiv
        resumenDiv.appendChild(noServicios);
        return;
    }

    // Mostrar el resumen
    const headingCita = document.createElement('H3');
    headingCita.textContent = 'Resumen de Cita';

    const nombreCita = document.createElement('P');
    nombreCita.innerHTML = `<span>Nombre:</span> ${nombre}`;

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fecha}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora}`;

    const serviciosCita = document.createElement('DIV');
    serviciosCita.classList.add('resumen-servicios');

    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de Servicios';

    serviciosCita.appendChild(headingServicios);

    let cantidad = 0;

    // Iterar sobre el arreglo de servicios
    servicios.forEach( servicio => {
        const { nombre, precio } = servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');
        
        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.textContent = precio;
        precioServicio.classList.add('precio');

        const totalServicio = precio.split('$');
        cantidad += parseInt(totalServicio[1].trim());

        // Colocar texto y precio en el div
        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);
        serviciosCita.appendChild(contenedorServicio);
    } );
    
    resumenDiv.appendChild(headingCita);
    resumenDiv.appendChild(nombreCita);
    resumenDiv.appendChild(fechaCita);
    resumenDiv.appendChild(horaCita);
    resumenDiv.appendChild(serviciosCita);

    const cantidadPagar = document.createElement('P');
    cantidadPagar.classList.add('total');
    cantidadPagar.innerHTML = `<span>Total a Pagar: </span> $ ${cantidad}`;
    resumenDiv.appendChild(cantidadPagar);
}

function nombreCita() {
    const nombreInput = document.querySelector('#nombre');
    nombreInput.addEventListener('input', event => {
        const nombreTexto = event.target.value.trim(); // trim: elimina el espacio en blanco al inicio y al final
        
        // Validacion de que nombreTexto debe tener algo
        if(nombreTexto === '' || nombreTexto.length < 3) {
            mostrarAlerta('Nombre no valido', 'error');
        } else {
            cita.nombre = nombreTexto;
            const alerta = document.querySelector('.alerta');
            if(alerta) {
                alerta.remove();
            }
        }
    });
}

function mostrarAlerta(mensaje, tipo) {
    // Si hay una alerta previa, entonces no se crea otra
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia) {
        return; // Detiene la ejecucion del codigo
    }

    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    if(tipo === 'error') {
        alerta.classList.add('error');
    }
    // Insertar en el HTML
    const formulario = document.querySelector('.formulario');
    formulario.appendChild(alerta);
    // Eliminar la alerta después de 3 segundos
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

function fechaCita() {
    const fechaInput = document.querySelector('#fecha');
    fechaInput.addEventListener('input', event => {
        const dia = new Date(event.target.value).getUTCDay();
        if([0, 6].includes(dia)) {
            event.preventDefault();
            fechaInput.value = '';
            mostrarAlerta('No atendemos los fines de semana', 'error');
        } else {
            cita.fecha = fechaInput.value;
        }
    });
}

function horaCita() {
    const horaInput = document.querySelector('#hora');
    horaInput.addEventListener('input', event => {
        const horaCita = event.target.value;
        const hora = horaCita.split(':');
        if(hora[0] < 10 || hora[0] > 18) {
            mostrarAlerta('Hora no válida', 'error');
            setTimeout(() => {
                horaInput.value = '';
            }, 3000);
        } else {
            cita.hora = horaCita;
        }
    });
}

function deshabilitarFechaAnterior() {
    const inputFecha = document.querySelector('#fecha');
    const fechaAhora = new Date();
    const year = fechaAhora.getFullYear();
    let month = (fechaAhora.getMonth() + 1).toString();
    let day = fechaAhora.getDate().toString();
    if(month.length < 2) {
        month = `0${month}`;
    }
    if(day.length < 2) {
        day = `0${day}`;
    }
    // Formato deseado: AAAA-MM-DD
    const fechaDeshabilitar = `${year}-${month}-${day}`;
    inputFecha.min = fechaDeshabilitar;
}