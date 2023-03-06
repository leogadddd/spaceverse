import { widgetsMiddleware } from "./widgetsMiddleware";
import { settingsMiddleware } from "./settingsMiddleware";
import { notificationsMiddleware} from "./notificationsMiddleware";

export const middlewares = [widgetsMiddleware, settingsMiddleware, notificationsMiddleware];