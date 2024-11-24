"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = exports.AppService = void 0;
let AppService = class AppService {
    getHello() {
        return 'Hello, MongoDB is connected!';
    }
};
exports.AppService = AppService;
exports.AppService = app_service_1.AppService = __decorate([
    Injectable()
], app_service_1.AppService);
class AppController {
    getHello() {
        throw new Error('Method not implemented.');
    }
}
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map