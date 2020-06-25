import { FeedDataBase } from "src/data/FeedDataBase";


export class FeedBusiness {

    async getFeed ( friendsList : any[] ){
        let feed : any[] = [];
        let friend

        for ( friend of friendsList ){
            const post : any = await new FeedDataBase().getFeed( friend )
            feed.push(post)
        }
    }
}