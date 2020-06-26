import { Request, Response } from "express";
import { Authenticator } from "src/services/Authenticator";
import { FeedBusiness } from "@business/FeedBusiness";
import { CustomError } from "src/util/CustomError";

export class FeedController {

  async getFeed(request: Request, response: Response) {
    const page: number =
      Number(request.query.page) >= 1 ? Number(request.query.page) : 1;

    const user = new Authenticator().getData(request.headers.token as string);
    if (!user) {
      throw new CustomError("Problemas de autenticação. Logue novamente", 401);
    }
    const feed = await new FeedBusiness().getFeed(user.id, page);

    response.status(200).send(feed);
  }

  async getFeedByType(request: Request, response: Response) {
    const user = new Authenticator().getData(request.headers.token as string);
    
    const page: number =
      Number(request.query.page) >= 1 ? Number(request.query.page) : 1;
      
    const feedByType = await new FeedBusiness().getFeedByType(
      user.id,
      request.query.type as string,
      page
    );

    response.status(200).send(feedByType);
  }
}
