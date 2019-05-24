export interface User{
    "info" : {
        "name" : string,
        "email" : string
    },
    "permissions" : {
        "emg" :  boolean,
        "tecnicos" : boolean,
        "clientes" : boolean
    },
    "meta" : {
        "registred_date" : string,
        "registred_by" : string
    },
    "active" :boolean,
    "_id" : string,
    "username" : string,
    "password" : string,
    "role" : number
}