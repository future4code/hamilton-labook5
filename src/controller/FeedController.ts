import { Request, Response } from "express";
import { Authenticator } from "src/services/Authenticator";
import { FeedBusiness } from "@business/FeedBusiness";
import { CustomError } from "src/util/CustomError";

export class FeedController {

  async getFeed(request: Request, response: Response) {
    const user = new Authenticator().getData(
      request.headers.token as string
    );
        if(!user){
            throw new CustomError ("Problemas de autenticação. Logue novamente", 401)
        }
    const feed = await new FeedBusiness().getFeed(user.id);

    response.status(200).send(feed);
  }

  async getFeedByType(request: Request, response: Response) {
    const user = new Authenticator().getData(
      request.headers.token as string
    );

    const feedByType = await new FeedBusiness().getFeedByType(
        user.id,
        request.query.type as string
        );

    response.status(200).send(feedByType);
  }
}
