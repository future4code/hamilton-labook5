import { FeedDataBase } from "src/data/FeedDataBase";

export class FeedBusiness {
  
  async getFeed(userId: string, page: number) {
    const postsPerPage = 5;
    let offset = postsPerPage * (page - 1);
    const feed = await new FeedDataBase().getFeed(userId, postsPerPage, page);

    return feed;
  }

  async getFeedByType(userId: string, type: string, page: number) {
    const postsPerPage = 5;
    let offset = postsPerPage * (page - 1);
    const feed = await new FeedDataBase().getFeedbyType(
      userId,
      type,
      postsPerPage,
      page
    );

    return feed;
  }
}
