import express from 'express'
const router = express.Router
import repositoryRoutes from './repository'

export default () => {
    const apiRouter = router();
    repositoryRoutes(apiRouter);//routes for the repos resource
    return apiRouter;
}