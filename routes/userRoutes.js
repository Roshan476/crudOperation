import express from  "express"
import { fetch,create,update, deleteUser, fetchById} from "../controller/userController.js";
const route = express.Router();

route.post("/create",create);
route.get("/getAllUsers",fetch);
route.get('/users/:id', fetchById);
route.put("/update/:id", update);
route.delete("/delete/:id",deleteUser);

export default route;