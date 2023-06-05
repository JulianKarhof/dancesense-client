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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var serialport_1 = require("serialport");
var parser_readline_1 = require("@serialport/parser-readline");
var nut_js_1 = require("@nut-tree/nut-js");
function main() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        function handleKeys(data) {
            return __awaiter(this, void 0, void 0, function () {
                var values;
                return __generator(this, function (_a) {
                    values = data.split(" ").map(function (d) { return d === '1'; });
                    if (values[0])
                        nut_js_1.keyboard.pressKey(nut_js_1.Key.Left);
                    else
                        nut_js_1.keyboard.releaseKey(nut_js_1.Key.Left);
                    if (values[1])
                        nut_js_1.keyboard.pressKey(nut_js_1.Key.Up);
                    else
                        nut_js_1.keyboard.releaseKey(nut_js_1.Key.Up);
                    if (values[2])
                        nut_js_1.keyboard.pressKey(nut_js_1.Key.Right);
                    else
                        nut_js_1.keyboard.releaseKey(nut_js_1.Key.Right);
                    if (values[3])
                        nut_js_1.keyboard.pressKey(nut_js_1.Key.Down);
                    else
                        nut_js_1.keyboard.releaseKey(nut_js_1.Key.Down);
                    return [2 /*return*/];
                });
            });
        }
        var ports, port, parser;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    nut_js_1.keyboard.config.autoDelayMs = 0;
                    return [4 /*yield*/, serialport_1.SerialPort.list()];
                case 1:
                    ports = _c.sent();
                    port = new serialport_1.SerialPort({
                        path: (_b = (_a = ports.find(function (port) { return port.productId === 'ea60'; })) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : '',
                        baudRate: 115200,
                    }, function (err) {
                        if (err) {
                            return console.log('Error: ', err.message);
                        }
                    });
                    parser = port.pipe(new parser_readline_1.ReadlineParser({ delimiter: '\r\n' }));
                    port.on("open", function () {
                        console.log("-- Connection opened --");
                        parser.on("data", function (data) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    console.log(data);
                                    handleKeys(data);
                                    return [2 /*return*/];
                                });
                            });
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
main();
