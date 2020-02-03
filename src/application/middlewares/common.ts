import GitResponse from "../../utils/GitResponse";
import GitError from "../../utils/GitError";

export const notFoundHandler = (req: any, res: any, next: Function) => {
    //const error = new Error("The page you are looking for does not exist :(");
    //error.statusCode = 404;
    const error = new GitError(404, 'The page you are looking for does not exist :(')
    next(error);
}


export const errorHandler = (err: Error | GitError, req: any, res: any, next: Function) => {
    if (err instanceof GitError) {
        return new GitResponse(res)
            .genericError(err.statusCode, err.message)
    }
    return new GitResponse(res)
        .internalServerError('Oops, an unexpected error happened, don\'t worry we are looking into it')
}