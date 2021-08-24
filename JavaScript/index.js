
let lugaresInfo = []

//FUNCION QUE PERMITE CONSEGUIR LOS LUGARES DEL JSON
const ulugares = () =>{
    fetch('cct20.json')
    .then(response => response.json())
    .then(lugares =>{
        console.log(lugares)

        //POR CADA LUGAR SE CREA UN OBJETO DONDE SE GUARDA LA LATITUD Y LONGITUD
        lugares.forEach(lugar =>{
            let lugarInfo = {
                posicion:{ lat:lugar.INMUEBLE_LATITUD,lng:lugar.INMUEBLE_LONGITUD}
            }
            lugaresInfo.push(lugarInfo) //ARRAY PARA QUE SE GUARDEN TODOS LOS LUGARES
        })

        //UBICACION GEOGRAFICA DEL USUARIO
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(usuarioUbicacion =>{
                let ubicacion = { //OBJETO PARA GUARDAR LA LATITUD Y LONGITUD DEL USUARIO
                    lat:usuarioUbicacion.coords.latitude,
                    lng:usuarioUbicacion.coords.longitude
                }
                dibujarMapa(ubicacion)
            } )
        }
    })
}

//FUNCOION PARA DIBUAR EL MAPA
const dibujarMapa = (obj) =>{
    let mapa = new google.maps.Map(document.getElementById('map'),{
        center:obj,
        zoom:4
    })
    //MARCADOR CON LA UBICACION DEL USUARIO
    let marcadorUsuario = new google.maps.Marker({
        position: obj,
        title: 'Mi ubicacion'
    })
    //MARCADORES CON TODAS LAS UBICACIONES ESTABLECIDAS DENTRO DEL JSON
    marcadorUsuario.setMap(mapa)
    let marcadores = lugaresInfo.map(lugar =>{
        return new google.maps.Marker({
            position:lugar.posicion,
            map:mapa
        })
    })
}

ulugares()

