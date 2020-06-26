import { PostDataBase } from "src/data/PostDataBase";

export class Post {

    constructor(
        private id: number,
        private picture_url : string,
        private description : string,
        private created_on : Date,
        private type : PostType,
        private user : string
    ) {}

    static mapStringToPostType (value : string) : PostType {
            switch(value){
                case "normal":
                    return PostType.NORMAL;
                
                case "evento":
                    return PostType.EVENTO;
                
                default:
                    return PostType.NORMAL
            }
    }
}

export enum PostType {
    NORMAL = "normal",
    EVENTO = "evento"
}

export interface PostInputDTO {
    id : number,
    picture_url : string,
    description : string,
    created_on : Date,
    type : string,
    user : string
}