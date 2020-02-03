import GitResponse from "../../utils/GitResponse";
import {Request, Response} from "express"

export const checkHeader = (req: any, res: any, next: any) => {
    if (req.headers.accept && req.headers.accept === "application/json") {
        next();
    } else {
        return new GitResponse(res)
            .invalidAcceptHeader()
    }
}

export const buildNextLinkBaseUrl = (req: any, res: Response, next: Function) => {
    const username = req.params.username;
    req.nextLinkBaseUrl = `${req.headers.host}${req.baseUrl}/${username}`;
    next();
}