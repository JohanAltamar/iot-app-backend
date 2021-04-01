"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("../routes/users"));
const config_1 = __importDefault(require("../database/config"));
const env_config_1 = __importDefault(require("../env.config"));
class Server {
    constructor() {
        this.apiRoutes = {
            users: "/api/users",
        };
        this.app = express_1.default();
        this.port = env_config_1.default.PORT || "3000";
        // Start database connection
        this.connectDatabase();
        // Middlewares
        this.middlewares();
        // Routes Definition
        this.routes();
    }
    connectDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_1.default();
        });
    }
    middlewares() {
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.apiRoutes.users, users_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on htpp://localhost:${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map