export interface Plant{
    "name" : string,
    "code" :  string,
    "client" : string,
    "boss" : Boss,
    "lines" : Lines[],
    "active" : boolean,
    "meta" : Meta
}

export interface Boss{
    "name" : string,
    "email" : string,
    "phone" : string
}

export interface Lines {
    "line_id" : string,
    "number" : number,
    "desc" : string
}

export interface Meta{
    "registred_by" : string,
    "registred_date" : string
}