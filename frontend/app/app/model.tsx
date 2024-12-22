export interface course{
    _id:object,
    id:string,
    name:string,
}
export interface student{
    _id:object,
    id:string,
    name:string,
    age:number,
    courses:course[]

}
