export interface emgs{
    "qr" : string,
    "info" : Info,
    "client" : string,
    "plant" : string,
    "line" : string,
    "status" : number,
    "active" : boolean,
    "meta" : Meta
}
export interface Meta{
    "registred_by" : string,
    "registred_date" : string
}
export interface Info{
    "type" :string,
    "model" : string,
    "description" : string,
    "serial" : string
}