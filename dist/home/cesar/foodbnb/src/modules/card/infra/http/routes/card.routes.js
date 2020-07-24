"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CardsController_1 = __importDefault(require("../controllers/CardsController"));
var cardsRouter = express_1.Router();
var cardsController = new CardsController_1.default();
cardsRouter.post('/', cardsController.create);
exports.default = cardsRouter;
