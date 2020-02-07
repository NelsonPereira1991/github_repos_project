import express, {IRouter} from 'express'
import {buildNextLinkBaseUrl, checkHeader} from "../middlewares/repository";
import {getUserRepositories} from "../controllers/repository";
const repositoryRouter = express.Router()
const resourcePrefix = "/repos"

const router = (apiRouter: IRouter) => {
    apiRouter.use(resourcePrefix, repositoryRouter)
    repositoryRouter.get("/:username", checkHeader, buildNextLinkBaseUrl, getUserRepositories)
}

export default router