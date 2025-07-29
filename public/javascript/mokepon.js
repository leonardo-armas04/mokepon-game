alert("Hola mundo :D")

const seccionReiniciar=document.getElementById("Reiniciar")
const seccionSeleccionarAtaque=document.getElementById("Seleccionar-ataque")
const boton_mascota=document.getElementById("Botón-Mascota")
const boton_reiniciar=document.getElementById("Botón-reiniciar")

const seccionSeleccionarMascota=document.getElementById("Seleccionar-mascota")
const spanMascotaJugador=document.getElementById("Mascota-jugador")

const spanMascotaEnemigo=document.getElementById("Mascota-enemigo")

const spanVidasJugador=document.getElementById("Vidas-jugador")
const spanVidasEnemigo=document.getElementById("Vidas-enemigo")

const seccionMensajes=document.getElementById("Resultado")

const ataques_del_jugador=document.getElementById("Ataque-jugador")
const ataques_del_enemigo=document.getElementById("Ataque-enemigo")

const contenedor_tarjetas=document.getElementById("Contenedor-tarjetas")
const contenedor_ataques=document.getElementById("Contenedor-ataques")

const seccionVerMapa=document.getElementById("Ver-mapa")
const mapa=document.getElementById("Mapa")

let jugadorId = null
let enemigoId = null 
let mokepones = []
let mokepones_enemigos = []
let inputHipodoge //Estas variables que tenían asignado un ID aún no existen
let inputCapipepo //porque los estamos inyectando al HTML con 
let inputRatigueya //Template literario
let inputLangostelvis
let inputPydos
let inputTucapalma
let mascota_jugador
let ataques_mokepon
let ataques_mokepon_sel
let ataques_mokepon_enemigo
let boton_fuego
let boton_awa
let boton_tierra
let botones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcion_de_mokepones
let index_ataque_jugador
let index_ataque_enemigo
let victorias_jugador = 0
let victorias_enemigo = 0
let lienzo = mapa.getContext("2d")
let miMokepon
let intervalo
let intervalo2
let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap.png"

let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350
if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, id = null) {
        this.nombre = nombre
        this.foto = foto 
        this.vidas = vida 
        this.id = id
        this.ataques = []
        this.ancho = 45
        this.alto = 45
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon() {
       lienzo.drawImage(
        this.mapaFoto,
        this.x,
        this.y,
        this.ancho,
        this.alto) 
    }
}

let Hipodoge = new Mokepon("Hipodoge","./assets/mokepons_mokepon_hipodoge_attack.png",5)
let Capipepo = new Mokepon("Capipepo","./assets/mokepons_mokepon_capipepo_attack.png",5)
let Ratigueya = new Mokepon("Ratigueya","./assets/mokepons_mokepon_ratigueya_attack.png",5)
let Langostelvis = new Mokepon("Langostelvis","./assets/mokepons_mokepon_langostelvis_attack.png",5)
let Pydos = new Mokepon("Pydos","./assets/mokepons_mokepon_pydos_attack.png",5)
let Tucapalma = new Mokepon("Tucapalma","./assets/mokepons_mokepon_tucapalma_attack.png",5)

Hipodoge.ataques.push(
    {nombre:"Fuego🔥", id:"Botón-Fuego"},
    {nombre:"Awa💧", id:"Botón-Awa"},
    {nombre:"Awa💧", id:"Botón-Awa"},
    {nombre:"Awa💧", id:"Botón-Awa"},
    {nombre:"Tierra🌱", id:"Botón-Tierra"},
)
Capipepo.ataques.push(
    {nombre:"Fuego🔥", id:"Botón-Fuego"},
    {nombre:"Awa💧", id:"Botón-Awa"},
    {nombre:"Tierra🌱", id:"Botón-Tierra"},
    {nombre:"Tierra🌱", id:"Botón-Tierra"},
    {nombre:"Tierra🌱", id:"Botón-Tierra"},
)
Ratigueya.ataques.push(
    {nombre:"Fuego🔥", id:"Botón-Fuego"},
    {nombre:"Fuego🔥", id:"Botón-Fuego"},
    {nombre:"Fuego🔥", id:"Botón-Fuego"},
    {nombre:"Awa💧", id:"Botón-Awa"},
    {nombre:"Tierra🌱", id:"Botón-Tierra"},
)
Langostelvis.ataques.push(
    {nombre:"Fuego🔥", id:"Botón-Fuego"},
    {nombre:"Fuego🔥", id:"Botón-Fuego"},
    {nombre:"Fuego🔥", id:"Botón-Fuego"},
    {nombre:"Awa💧", id:"Botón-Awa"},
    {nombre:"Tierra🌱", id:"Botón-Tierra"},
)
Pydos.ataques.push(
    {nombre:"Fuego🔥", id:"Botón-Fuego"},
    {nombre:"Awa💧", id:"Botón-Awa"},
    {nombre:"Awa💧", id:"Botón-Awa"},
    {nombre:"Awa💧", id:"Botón-Awa"},
    {nombre:"Tierra🌱", id:"Botón-Tierra"},
)
Tucapalma.ataques.push(
    {nombre:"Fuego🔥", id:"Botón-Fuego"},
    {nombre:"Awa💧", id:"Botón-Awa"},
    {nombre:"Tierra🌱", id:"Botón-Tierra"},
    {nombre:"Tierra🌱", id:"Botón-Tierra"},
    {nombre:"Tierra🌱", id:"Botón-Tierra"},
)
mokepones.push(Hipodoge,Capipepo,Ratigueya,Langostelvis,Pydos,Tucapalma)

function iniciarJuego() {
    seccionSeleccionarAtaque.style.display="none"
    seccionVerMapa.style.display="none"
    seccionReiniciar.style.display="none"

    //Inyectar valores (objetos) en una variable para que aparezcan en HTML: 
    //Template literario 
    mokepones.forEach((mokepon)=>{
        opcion_de_mokepones=`
        <input type="radio" name="Mascota" id=${mokepon.nombre}>
        <label class="Tarjeta-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedor_tarjetas.innerHTML += opcion_de_mokepones

        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
        inputLangostelvis = document.getElementById("Langostelvis")
        inputPydos = document.getElementById("Pydos")
        inputTucapalma = document.getElementById("Tucapalma")
    })

    boton_mascota.addEventListener("click",SeleccionarMascota)
    boton_reiniciar.addEventListener("click",reiniciarJuego)
    window.addEventListener("keypress",keyHold)

    unirseAlJuego()
}
function unirseAlJuego() {
    fetch("http://192.168.100.120:8080/unirse")
        .then(function(res) {
            if (res.ok) {
                res.text()
                    .then(function(respuesta) {
                        console.log(respuesta)
                        jugadorId=respuesta
                    })
            }
        })
}
function SeleccionarMascota() {

    if(inputHipodoge.checked) {
        spanMascotaJugador.innerHTML=inputHipodoge.id
        mascota_jugador = inputHipodoge.id
        alert("Seleccionaste a " + mascota_jugador +" :D")
    } else if(inputCapipepo.checked) {
        spanMascotaJugador.innerHTML=inputCapipepo.id
        mascota_jugador = inputCapipepo.id
        alert("Seleccionaste a " + mascota_jugador +" :D")
    } else if(inputRatigueya.checked) {
        spanMascotaJugador.innerHTML=inputRatigueya.id
        mascota_jugador = inputRatigueya.id
        alert("Seleccionaste a " + mascota_jugador +" :D")
    } else if(inputLangostelvis.checked) {
        spanMascotaJugador.innerHTML=inputLangostelvis.id
        mascota_jugador = inputLangostelvis.id
        alert("Seleccionaste a " + mascota_jugador +" :D")
    } else if(inputPydos.checked) {
        spanMascotaJugador.innerHTML=inputPydos.id
        mascota_jugador = inputPydos.id
        alert("Seleccionaste a " + mascota_jugador +" :D")
    } else if(inputTucapalma.checked) {
        spanMascotaJugador.innerHTML=inputTucapalma.id
        mascota_jugador = inputTucapalma.id
        alert("Seleccionaste a " + mascota_jugador +" :D")
    } else {
        alert("Selecciona a una mascota")
        return
    }
    seccionSeleccionarMascota.style.display="none"
    seleccionarMokepon(mascota_jugador) 
    //Esta función envía el Mokepon seleccionado al BackEnd

    extraerAtaques(mascota_jugador)
    iniciarMapa()
}
function extraerAtaques(mascota_jugadorx) {
    mascota_jugadorx=mascota_jugador
    for (let i = 0; i < mokepones.length; i++) {
        if (mascota_jugadorx===mokepones[i].nombre) {
            ataques_mokepon=mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques_mokepon)
}
function mostrarAtaques(ataquesx) {
    ataquesx=ataques_mokepon
    ataquesx.forEach((ataques)=> {
        ataques_mokepon_sel=`
        <button id=${ataques.id} class="Botón-ataque">${ataques.nombre}</button>
        `
        contenedor_ataques.innerHTML+=ataques_mokepon_sel
    })
    boton_fuego=document.getElementById("Botón-Fuego")
    boton_awa=document.getElementById("Botón-Awa")
    boton_tierra=document.getElementById("Botón-Tierra")

    botones=document.querySelectorAll(".Botón-ataque")
}
function secuenciaAtaque() {
    botones.forEach((boton)=> {
        boton.addEventListener("click", (e)=> {
            if (e.target.textContent === "Fuego🔥") {
                ataqueJugador.push("Fuego🔥")
                boton.style.background="#112F58"
                boton.style.color="White"
                boton.disabled=true
                console.log(ataqueJugador)
            } else if(e.target.textContent === "Awa💧") {
                ataqueJugador.push("Awa💧")
                boton.style.background="#112F58"
                boton.style.color="White"
                boton.disabled=true
                console.log(ataqueJugador)
            } else if(e.target.textContent === "Tierra🌱") {
                ataqueJugador.push("Tierra🌱")
                boton.style.background="#112F58"
                boton.style.color="White"
                boton.disabled=true
                console.log(ataqueJugador)
            }
            if (ataqueJugador.length===botones.length) {
                enviarAtaques()
            }
        })
    })
}
function enviarAtaques() {
    fetch(`http://192.168.100.120:8080/mokepon/${jugadorId}/ataques`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo2 = setInterval(obtenerAtaques,50)
}
function obtenerAtaques() {
    fetch(`http://192.168.100.120:8080/mokepon/${enemigoId}/ataques`)
    .then(function(res) {
        if (res.ok) {
            res.json()
            .then(function({ataques}) {
                if (ataques.length===botones.length) {
                    ataqueEnemigo = ataques
                    combate()
                }
            })
        }
    })
}
function mascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML=enemigo.nombre
    //Al span se le va a asignar el elemento ubicado en la posición del número que te dió, luego imprime su nombre en HTML
    ataques_mokepon_enemigo=enemigo.ataques
    secuenciaAtaque()
}
function indexAmbosOponentes(jugador, enemigo) {
    index_ataque_jugador=ataqueJugador[jugador]
    index_ataque_enemigo=ataqueEnemigo[enemigo]
}
function combate() {
    clearInterval(intervalo2)
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index]===ataqueEnemigo[index]) {
            indexAmbosOponentes(index,index)
            crearMensaje()
        } else if (ataqueJugador[index]==="Fuego🔥" && ataqueEnemigo[index]==="Tierra🌱") {
            victorias_jugador=victorias_jugador+1
            indexAmbosOponentes(index,index)
            crearMensaje()
        } else if(ataqueJugador[index] === "Awa💧" && ataqueEnemigo[index] === "Fuego🔥") {
            victorias_jugador=victorias_jugador+1
            indexAmbosOponentes(index,index)
            crearMensaje()
        } else if(ataqueJugador[index] === "Tierra🌱" && ataqueEnemigo[index] === "Awa💧") {
            victorias_jugador=victorias_jugador+1
            indexAmbosOponentes(index,index)
            crearMensaje() 
        } else {
            victorias_enemigo=victorias_enemigo+1
            indexAmbosOponentes(index,index)
            crearMensaje()
        }
    }
    spanVidasJugador.innerHTML=victorias_jugador
    spanVidasEnemigo.innerHTML=victorias_enemigo
    revisarVidas()
}
function revisarVidas() {
    if(victorias_jugador===victorias_enemigo) {
        mensajeFinal("¡EMPATE!😐")
    } else if(victorias_jugador>victorias_enemigo) {
        mensajeFinal("¡FELICIDADES! GANASTE 🎉🎂")
    } else {
        mensajeFinal("YA PERDISTE :(")
    }
}
function mensajeFinal(resultadoFinal) {
    seccionMensajes.innerHTML=resultadoFinal
    boton_fuego.disabled=true
    boton_awa.disabled=true
    boton_tierra.disabled=true
    seccionReiniciar.style.display="block"
}
function crearMensaje() {
    let nuevo_ataque_jugador=document.createElement("p")
    let nuevo_ataque_enemigo=document.createElement("p")

    /*seccionMensajes.innerHTML=resultado*/
    nuevo_ataque_jugador.innerHTML=index_ataque_jugador
    nuevo_ataque_enemigo.innerHTML=index_ataque_enemigo

    ataques_del_jugador.appendChild(nuevo_ataque_jugador)
    ataques_del_enemigo.appendChild(nuevo_ataque_enemigo)

}
function reiniciarJuego() {
    location.reload()
    //Esto lo que hace es recargar la página donde estás
}
function aleatorio(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min)
}
function iniciarMapa() {
    seccionVerMapa.style.display="flex"
    miMokepon=obtenerObjetoMascota()
    /* mapa.width=500
    mapa.height=375 */
    intervalo=setInterval(pintarCanvas,50)
    window.addEventListener("keydown",keyHold)
    window.addEventListener("keyup",detenerMovimiento)
}
function pintarCanvas() {
    miMokepon.x=miMokepon.x+miMokepon.velocidadX
    miMokepon.y=miMokepon.y+miMokepon.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(mapaBackground,0,0,mapa.width,mapa.height)

    enviarPosicion(miMokepon.x, miMokepon.y)

    mokepones_enemigos.forEach(function(mokepon){
        if (mokepon != undefined) {
            mokepon.pintarMokepon()
            revisarColision(mokepon)
        }
    })

    miMokepon.pintarMokepon()
}
function moverArriba() {
    miMokepon.velocidadY = -5
}
function moverAbajo() {
    miMokepon.velocidadY = 5
}
function moverIzquierda() {
    miMokepon.velocidadX = -5
}
function moverDerecha() {
    miMokepon.velocidadX = 5
}
function detenerMovimiento() {
    miMokepon.velocidadX = 0
    miMokepon.velocidadY = 0
}
function keyHold(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break;
        case "ArrowDown":
            moverAbajo()
            break;
        case "ArrowLeft":
            moverIzquierda()
            break;
        case "ArrowRight":
            moverDerecha()
            break;
        case "w":
            moverArriba()
            break; 
        case "s":
            moverAbajo()
            break;
        case "a":
            moverIzquierda()
            break;
        case "d":
            moverDerecha()
            break;
        case "Enter":
            if (seccionReiniciar.style.display==="block") {
                reiniciarJuego()
            } else if (seccionSeleccionarAtaque.style.display==="flex" || seccionVerMapa.style.display==="flex") {
                return
            }
            else if (seccionReiniciar.style.display==="none") {
                SeleccionarMascota()
            }
            break;                   
        default:
            break;
    }
}
function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascota_jugador===mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}
function revisarColision(enemigo) {
    const margen = 8
    let arribaMascota=miMokepon.y
    let abajoMascosa=miMokepon.y+miMokepon.alto
    let izquierdaMascota=miMokepon.x
    let derechaMascota=miMokepon.x+miMokepon.ancho

    const arribaEnemigo=enemigo.y
    const abajoEnemigo=enemigo.y+enemigo.alto
    const izquierdaEnemigo=enemigo.x
    const derechaEnemigo=enemigo.x+enemigo.ancho

    if (
        (arribaMascota+margen) < (abajoEnemigo-margen) &&
        (abajoMascosa-margen) > (arribaEnemigo+margen) &&
        (izquierdaMascota+margen) < (derechaEnemigo-margen) &&
        (derechaMascota-margen) > (izquierdaEnemigo+margen)
    ) {
        // ¡Hay colisión!
        detenerMovimiento()
        clearInterval(intervalo)
        alert("¡Chocaste con " + enemigo.nombre + "!😱")
        enemigoId=enemigo.id
        seccionVerMapa.style.display="none"
        seccionSeleccionarAtaque.style.display="flex"
        mascotaEnemigo(enemigo)
    }
}
function seleccionarMokepon(mascota_jugador) {
    fetch(`http://192.168.100.120:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascota_jugador
        })
    })
}
function enviarPosicion(x,y) {
    fetch(`http://192.168.100.120:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res) {
        if (res.ok) {
            res.json()
                .then(function({enemigos}) {
                    mokepones_enemigos = enemigos.map(function(enemigo){
                        let mokepon_enemigo = null
                        if (enemigo.mokepon!=undefined) {
                            const mokepon_nombre=enemigo.mokepon.nombre
                            switch (mokepon_nombre) {
                                case "Hipodoge":
                                    mokepon_enemigo = new Mokepon("Hipodoge","./assets/mokepons_mokepon_hipodoge_attack.png",5,enemigo.id)
                                    break;
                                case "Capipepo":
                                    mokepon_enemigo = new Mokepon("Capipepo","./assets/mokepons_mokepon_capipepo_attack.png",5,enemigo.id)
                                    break;
                                case "Ratigueya":
                                    mokepon_enemigo = new Mokepon("Ratigueya","./assets/mokepons_mokepon_ratigueya_attack.png",5,enemigo.id)
                                    break;
                                case "Langostelvis":
                                    mokepon_enemigo = new Mokepon("Langostelvis","./assets/mokepons_mokepon_langostelvis_attack.png",5,enemigo.id)
                                    break;
                                case "Pydos":
                                    mokepon_enemigo = new Mokepon("Pydos","./assets/mokepons_mokepon_pydos_attack.png",5,enemigo.id)
                                    break;
                                case "Tucapalma":
                                    mokepon_enemigo = new Mokepon("Tucapalma","./assets/mokepons_mokepon_tucapalma_attack.png",5,enemigo.id)
                                    break;    
                                default:
                                    break;
                            }
                            mokepon_enemigo.x=enemigo.x
                            mokepon_enemigo.y=enemigo.y
                        }
                        return mokepon_enemigo
                    })  
                })
        }
    })
}
window.addEventListener("load",iniciarJuego)