export interface course{
    _id:object,
    courseId:string,
    title:string,
    description: string,
    category: string,
    difficultyLevel: string,
    createdBy: string,
    createdAt: Date

}
export interface users{
    _id:object,
    id:string,
    name:string,
    age:number,
    courses:course[]

}