import express            from 'express';
import usersControllers   from './controllers/userController';
import authControllers    from './controllers/authController';
import servicesController from './controllers/servicesController';
import customerServicesController from './controllers/customerServiceController';
const routes = express.Router();

routes.post("/authenticate", authControllers.show);

//User
routes.get("/users", usersControllers.index);
routes.post("/users", usersControllers.create);
routes.put("/users/:id", usersControllers.update);

//Services
routes.get("/services", servicesController.index);
routes.get("/servicesCustomer", servicesController.findServiceCustomer);
routes.post("/services", servicesController.create);
routes.put("/services/:id", servicesController.update);

//Associate Service
routes.post("/associateUser", servicesController.associatePerson);
//routes.delete("/associateUser/:idUser", servicesController.removeAssociatePerson);

//CustomerService
routes.put("/customerService", customerServicesController.update);
routes.post("/customerService", customerServicesController.create);

export default routes;