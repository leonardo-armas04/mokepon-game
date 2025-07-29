const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.static("public"))
app.use(cors())
app.use(express.json())

const jugadores = []
class Jugador {
    constructor(id) {
        this.id=id
    }
    asignarMokepon(mokepon) {
        this.mokepon=mokepon
    }
    actualizarPosicion(x,y) {
        this.x=x
        this.y=y
    }
    asignarAtaques(ataques) {
        this.ataques=ataques
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre=nombre 
    }
}

app.get("/unirse", (req,res) => {
    const id = `${Math.round(10000*Math.random())}`
    const jugador = new Jugador(id)
    jugadores.push(jugador) 
    res.send(id)
})

app.post("/mokepon/:jugadorId", (req,res) => {
    //Los dos puntos es la forma de pedir variables en express
    const jugadorId = req.params.jugadorId || ""
    //El segundo jugadorId que está después del params accedes a la variable que se envió en la URL
    const nombreMokepon = req.body.mokepon || ""
    const mokepon = new Mokepon(nombreMokepon)

    const jugador_index = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    //La función findIndex valida si existe un elemento en el arreglo y devuelve -1 si no existe. Le asigna el valor que sí existe dependiento de su posición en el arreglo
    if (jugador_index>=0) {
        jugadores[jugador_index].asignarMokepon(mokepon)
    }

    console.log(jugadores)
    console.log(jugadorId)
    res.end() //Con esto termina la petición 
})

app.post("/mokepon/:jugadorId/posicion", (req,res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugador_index = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if (jugador_index>=0) {
        jugadores[jugador_index].actualizarPosicion(x,y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({enemigos})
})

app.post("/mokepon/:jugadorId/ataques",(req,res)=> {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []

    const jugador_index = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if (jugador_index>=0) {
        jugadores[jugador_index].asignarAtaques(ataques)
    }
    console.log(jugadores[jugador_index].ataques)
    res.end()
})

app.get("/mokepon/:jugadorId/ataques",(req,res)=> {
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) => jugadorId === jugador.id)
    res.send({
        ataques: jugador.ataques || []
    })
})

app.listen(8080, ()=> {
    console.log("Servidor funcionado :)")
})