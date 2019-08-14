export interface Contrato{
    "_id" : String,
    "client" : string,
    "clientName" : string,
    "period" : period,
    "description" : string,
    "emgs" : string[],
    "emgsNames" : string[],
    "name" : string,
    "status" : boolean
}

interface period { 
    "start" : string,
    "end" : string,
    "single" : boolean
}