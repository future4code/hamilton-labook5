import { Request, Response } from "express";
import { Friendship } from "src/data/FriendshipDataBase";
import { Authenticator } from "src/services/Authenticator";
import { FeedBusiness } from "@business/FeedBusiness";
import { FeedDataBase } from "src/data/FeedDataBase";



export class FeedController {

    async getFeed ( request : Request, response : Response){

        const user = new Authenticator().getData( 
            request.headers.authorization as string
         )

        const friendsList = await new FeedDataBase().getAllFriends( user.id )

        const feed = await new FeedBusiness().getFeed( 
            friendsList
        )

        response.status(200).send( feed )

    }
}