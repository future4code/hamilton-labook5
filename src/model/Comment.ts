
export class Comment {

    constructor(
        private comment : string,
        private post_id : string,
    ) {}
}


export interface CommentDTO {
    id : number,
    comment : string,
    post_id : string,
    user : string,
    created_on : Date,
}