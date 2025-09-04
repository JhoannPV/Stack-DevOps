import { Router } from "express";
import { EventsController } from "./controller";
import { EventsDatasourceImpl, EventsRepositoryImpl } from "../../insfrastructure";
import { AuthMiddleware, ResErrorsMiddleware, ValidatorFieldsMiddleware } from "..";

export class EventsRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new EventsDatasourceImpl();
        const eventsRepository = new EventsRepositoryImpl(datasource);
        const controller = new EventsController(eventsRepository);

        router.get('/get-events',
            [
                AuthMiddleware.validateJWT
            ], controller.getEvents);

        router.post('/create-event',
            [
                AuthMiddleware.validateJWT,
                ValidatorFieldsMiddleware.validateFieldsCreateUpdateEvent,
                ResErrorsMiddleware.resErrors,
            ], controller.createEvent);

        router.put('/update-event/:id',
            [
                AuthMiddleware.validateJWT,
                ValidatorFieldsMiddleware.validateFieldsCreateUpdateEvent,
                ResErrorsMiddleware.resErrors,
            ], controller.updateEvent);

        router.delete('/delete-event/:id',
            [
                AuthMiddleware.validateJWT,
            ], controller.deleteEvent);

        return router;
    }
}