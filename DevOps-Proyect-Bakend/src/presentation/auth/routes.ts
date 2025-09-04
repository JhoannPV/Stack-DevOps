import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../insfrastructure";
import { AuthMiddleware, ResErrorsMiddleware, ValidatorFieldsMiddleware } from '..';

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(datasource);
        const controller = new AuthController(authRepository);

        router.post('/login',
            [
                ValidatorFieldsMiddleware.validateFieldsLogin,
                ResErrorsMiddleware.resErrors
            ], controller.loginUser);

        router.post('/register',
            [
                ValidatorFieldsMiddleware.validateFieldsRegister,
                ResErrorsMiddleware.resErrors
            ], controller.registerUser);

        router.get('/renew-token', [AuthMiddleware.validateJWT], controller.renewUser);

        return router;
    }
}