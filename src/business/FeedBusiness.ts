import { FeedDataBase } from "src/data/FeedDataBase";

export class FeedBusiness {

  async getFeed(userId: string) {
    const feed = await new FeedDataBase().getFeed(userId);
    return feed;
  }

  async getFeedByType(userId: string, type : string) {
    const feed = await new FeedDataBase().getFeedbyType(userId, type);
    return feed;
  }
}
