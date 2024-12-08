"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const courses_schema_1 = require("./schemas/courses.schema");
let CoursesService = class CoursesService {
    constructor(courseModel) {
        this.courseModel = courseModel;
    }
    async createCourse(createCourseDto) {
        const course = new this.courseModel(createCourseDto);
        return course.save();
    }
    async getAllCourses(category) {
        if (category) {
            return this.courseModel.find({ category }).exec();
        }
        return this.courseModel.find().exec();
    }
    async getCourseById(id) {
        return this.courseModel.findById(id).exec();
    }
    async updateCourse(id, updateCourseDto) {
        return this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true }).exec();
    }
    async searchCourses(topic, instructor) {
        const filter = {};
        if (topic) {
            filter.title = { $regex: topic, $options: 'i' };
        }
        if (instructor) {
            filter.createdBy = { $regex: instructor, $options: 'i' };
        }
        return this.courseModel.find(filter).exec();
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(courses_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CoursesService);
//# sourceMappingURL=courses.service.js.map