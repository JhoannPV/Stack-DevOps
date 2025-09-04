import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { EventsRoutes } from "./events/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        // Definir todas mis rutas principales
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/events', EventsRoutes.routes);

        return router;
    }
}