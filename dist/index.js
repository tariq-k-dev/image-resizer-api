"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var index_1 = __importDefault(require("./routes/index"));
var app = express_1.default();
var PORT = process.env.PORT || 3000;
var HOST = 'http://localhost:';
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'dist')));
app.use(index_1.default);
app.listen(PORT, function () {
    console.log("Listening at " + (HOST + PORT));
});
exports.default = app;
