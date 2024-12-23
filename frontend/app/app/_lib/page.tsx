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

export interface responses {
    _id: any;
    response_id: string;
    userId: string;
    quizId: string;
    answers: { question_id: string; answer: string }[];
    score: number;
    submitted_at: Date;
  }

  export interface note{
    noteId: string; 
    userId: string;
    courseId: string;
    content: string;
    createdAt: Date;
    lastUpdated: Date;
}