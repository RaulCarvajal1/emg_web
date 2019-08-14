export interface servicios {
    '_id' : String,
    'type' : String,
    'desc' : String,
    'date' : String,
    'start' : Date,
    'finish' : Date,
    'status' : number,
    'client' : String,
    'tecnico' : String,
    'emg' : String,
    'observ' : obs,
    'signature' : String,
    'score' : number
}

interface obs { 
    'trabajo_realizado' : String,
    'comentarios' : String,
    'recomendaciones' : String
}