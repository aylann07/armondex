// ==========================================
// POKÉMON
// ==========================================

const pokemons = [
    {
        id: 1,
        nombre: "Bulbasaur",
        numero: "#001",
        tipo: "Planta - Veneno",
        descripcion: "Bulbasaur lleva una semilla en su espalda.",
        imagen: "imagenes/bulbasaur.png",
        modelo: "modelos/bulbasaur.glb"
    },

    {
        id: 4,
        nombre: "Charmander",
        numero: "#004",
        tipo: "Fuego",
        descripcion: "La llama de su cola indica su estado de salud.",
        imagen: "imagenes/charmander.png",
        modelo: "modelos/charmander.glb"
    },

    {
        id: 7,
        nombre: "Squirtle",
        numero: "#007",
        tipo: "Agua",
        descripcion: "Squirtle utiliza su caparazón para protegerse.",
        imagen: "imagenes/squirtle.png",
        modelo: "modelos/squirtle.glb"
    },

    {
        id: 25,
        nombre: "Pikachu",
        numero: "#025",
        tipo: "Eléctrico",
        descripcion: "Pikachu almacena electricidad en sus mejillas.",
        imagen: "imagenes/pikachu.png",
        modelo: "modelos/pikachu.glb"
    },

    {
        id: 443,
        nombre: "Gible",
        numero: "#443",
        tipo: "Dragón - Tierra",
        descripcion: "Tiene pequeñas extremidades y una gran aleta en la cabeza.",
        imagen: "imagenes/gible.png",
        modelo: "modelos/gible.glb"
    },

    {
        id: 444,
        nombre: "Gabite",
        numero: "#444",
        tipo: "Dragón - Tierra",
        descripcion: "Muy ocasionalmente puede mudar la piel y perder las escamas.",
        imagen: "imagenes/gabite.png",
        modelo: "modelos/gabite.glb"
    },

    {
        id: 445,
        nombre: "Garchomp",
        numero: "#445",
        tipo: "Dragón - Tierra",
        descripcion: "Vuela tan rápido como un avión a reacción.",
        imagen: "imagenes/garchomp.png",
        modelo: "modelos/garchomp.glb"
    },

    {
        id: 123,
        nombre: "Scyther",
        numero: "#123",
        tipo: "Bicho - Volador",
        descripcion: "Avanza por la hierba con sus afiladas guadañas, más rápido de lo que el ojo humano puede percibir.",
        imagen: "imagenes/scyther.png",
        modelo: "modelos/scyther.glb"
    },

    {
        id: 868,
        nombre: "Alcremie",
        numero: "#868",
        tipo: "Hada",
        descripcion: "Los dulces decorados por Alcremie hacen feliz a todo aquel que los ingiere gracias a la suma dulzura que los caracteriza.",
        imagen: "imagenes/alcremie.png",
        modelo: "modelos/alcremie.glb"
    },

    {
        id: 132,
        nombre: "Eevee",
        numero: "#132",
        tipo: "Normal",
        descripcion: "Su irregular estructura genética alberga el secreto de la capacidad que posee este Pokémon tan especial para adoptar evoluciones muy variadas.",
        imagen: "imagenes/eevee.png",
        modelo: "modelos/eevee.glb"
    }

];


// ==========================================
// ELEMENTOS DE LA PÁGINA
// ==========================================

const inicio = document.querySelector(".inicio");
const pantallaAR = document.querySelector(".pantalla-ar");
const pantallaColeccion = document.querySelector(".pantalla-coleccion");

const botonIniciar = document.querySelector(".boton-ar");
const botonColeccion = document.querySelector(".boton-coleccion");
const botonesVolver = document.querySelectorAll(".boton-volver");


// ==========================================
// POKÉMON ACTUAL
// ==========================================

let pokemonActual = null;


// ==========================================
// COLECCIÓN
// ==========================================

// Intentamos recuperar la colección guardada
// Si no existe, empezamos con una colección vacía.

let coleccion = JSON.parse(
    localStorage.getItem("coleccionPokemon")
) || [];


// ==========================================
// MOSTRAR PANTALLA DE INICIO
// ==========================================

function mostrarInicio() {

    inicio.style.display = "flex";
    pantallaAR.style.display = "none";
    pantallaColeccion.style.display = "none";

}


// ==========================================
// MOSTRAR PANTALLA AR
// ==========================================

function mostrarAR() {

    inicio.style.display = "none";
    pantallaAR.style.display = "block";
    pantallaColeccion.style.display = "none";

}


// ==========================================
// MOSTRAR COLECCIÓN
// ==========================================

function mostrarColeccion() {

    inicio.style.display = "none";
    pantallaAR.style.display = "none";
    pantallaColeccion.style.display = "block";

    cargarColeccion();

}


// ==========================================
// ELEGIR POKÉMON ALEATORIO
// ==========================================

function obtenerPokemonAleatorio() {

    const posicion = Math.floor(
        Math.random() * pokemons.length
    );

    return pokemons[posicion];

}


// ==========================================
// INICIAR EXPERIENCIA
// ==========================================

function iniciarExperiencia() {

    // Elegimos un Pokémon aleatorio
    pokemonActual = obtenerPokemonAleatorio();

    // Mostramos sus datos
    mostrarPokemon(pokemonActual);

    // Cambiamos a la pantalla AR
    mostrarAR();

}


// ==========================================
// MOSTRAR INFORMACIÓN DEL POKÉMON
// ==========================================

function mostrarPokemon(pokemon) {

    document.querySelector(".pokemon-info img").src =
        pokemon.imagen;

    document.querySelector(".pokemon-info img").alt =
        pokemon.nombre;

    document.querySelector(".numero").textContent =
        pokemon.numero;

    document.querySelector(".pokemon-datos h2").textContent =
        pokemon.nombre;

    document.querySelector(".tipo").textContent =
        pokemon.tipo;

    document.querySelector(".pokemon-datos p").textContent =
        pokemon.descripcion;

    // Cargamos el modelo 3D
    cargarModelo(pokemon.modelo);

}


// ==========================================
// CARGAR MODELO 3D
// ==========================================

function cargarModelo(modelo) {

    const visor = document.querySelector(".visor-ar");

    visor.innerHTML = `
        
        <model-viewer
            src="${modelo}"
            alt="Modelo 3D del Pokémon"
            camera-controls
            auto-rotate
            ar
            ar-modes="webxr scene-viewer quick-look"
            shadow-intensity="1">

            <button
                slot="ar-button"
                class="boton boton-ar">

                📷 Ver en AR

            </button>

        </model-viewer>

    `;

}


// ==========================================
// GUARDAR POKÉMON
// ==========================================

function guardarPokemon() {

    // Comprobamos que haya un Pokémon seleccionado

    if (!pokemonActual) {
        return;
    }


    // Comprobamos si ya está guardado

    const existe = coleccion.some(
        pokemon => pokemon.id === pokemonActual.id
    );


    if (existe) {

        alert(
            pokemonActual.nombre +
            " ya está en tu colección."
        );

        return;
    }


    // Añadimos el Pokémon

    coleccion.push(pokemonActual);


    // Guardamos la colección en el navegador

    localStorage.setItem(
        "coleccionPokemon",
        JSON.stringify(coleccion)
    );


    alert(
        pokemonActual.nombre +
        " se ha añadido a tu colección ⭐"
    );

}


// ==========================================
// CARGAR COLECCIÓN
// ==========================================

function cargarColeccion() {

    const contenedor =
        document.querySelector(".coleccion");


    // Limpiamos la colección antes de cargarla

    contenedor.innerHTML = "";


    // Si no hay Pokémon guardados

    if (coleccion.length === 0) {

        contenedor.innerHTML = `

            <div class="coleccion-vacia">

                <h3>No tienes Pokémon todavía</h3>

                <p>
                    Inicia la experiencia AR
                    para encontrar Pokémon.
                </p>

            </div>

        `;

        return;
    }


    // Creamos una tarjeta para cada Pokémon

    coleccion.forEach(pokemon => {

        const tarjeta =
            document.createElement("article");


        tarjeta.className = "pokemon-card";


        tarjeta.innerHTML = `

            <div class="card-imagen">

                <img
                    src="${pokemon.imagen}"
                    alt="${pokemon.nombre}"
                >

            </div>


            <div class="card-info">

                <span>
                    ${pokemon.numero}
                </span>

                <h3>
                    ${pokemon.nombre}
                </h3>

                <p>
                    ${pokemon.tipo}
                </p>

                <button
                    onclick="verInformacion(${pokemon.id})">

                    Ver información

                </button>

            </div>

        `;


        contenedor.appendChild(tarjeta);

    });

}


// ==========================================
// VER INFORMACIÓN
// ==========================================

function verInformacion(id) {

    const pokemon = pokemons.find(
        pokemon => pokemon.id === id
    );


    if (!pokemon) {
        return;
    }


    alert(
        pokemon.nombre +
        "\n\n" +
        pokemon.tipo +
        "\n\n" +
        pokemon.descripcion
    );

}


// ==========================================
// BOTÓN INICIAR
// ==========================================

botonIniciar.addEventListener(
    "click",
    iniciarExperiencia
);


// ==========================================
// BOTÓN COLECCIÓN
// ==========================================

botonColeccion.addEventListener(
    "click",
    mostrarColeccion
);


// ==========================================
// BOTONES VOLVER
// ==========================================

botonesVolver.forEach(boton => {

    boton.addEventListener(
        "click",
        mostrarInicio
    );

});


// ==========================================
// BOTÓN GUARDAR
// ==========================================

const botonGuardar =
    document.querySelector(".boton-guardar");


botonGuardar.addEventListener(
    "click",
    guardarPokemon
);


// ==========================================
// INICIAR WEB
// ==========================================

mostrarInicio();