"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
//dotenv configuration
dotenv_1.default.config();
exports.default = {
    PORT: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : "",
    MONGODB_ATLAS: (_b = process.env.MONGODB_ATLAS) !== null && _b !== void 0 ? _b : "",
};
//# sourceMappingURL=env.config.js.map