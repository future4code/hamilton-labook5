import { Request, Response } from "express";
import { Authenticator } from "src/services/Authenticator";
import { FeedBusiness } from "@business/FeedBusiness";

export class FeedController {
  async getFeed(request: Request, response: Response) {
    const user = new Authenticator().getData(
      request.headers.authorization as string
    );

    const feed = await new FeedBusiness().getFeed(user.id);

    response.status(200).send(feed);
  }
}
