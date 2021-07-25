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
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const modelToString_1 = require("./lib/modelToString");
let User = class User {
};
__decorate([
    _1.Property(),
    _1.ID(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    _1.Property({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    _1.Relation({ fields: ["profileId"], references: ["id"] }),
    _1.Property(() => Profile),
    __metadata("design:type", Object)
], User.prototype, "profile", void 0);
User = __decorate([
    _1.Model()
], User);
let Profile = class Profile {
};
__decorate([
    _1.Property(),
    _1.ID(),
    __metadata("design:type", String)
], Profile.prototype, "id", void 0);
__decorate([
    _1.Property(() => User, { nullable: true }),
    __metadata("design:type", User)
], Profile.prototype, "user", void 0);
__decorate([
    _1.Property(),
    __metadata("design:type", String)
], Profile.prototype, "username", void 0);
Profile = __decorate([
    _1.Model()
], Profile);
it("generates model string", () => {
    const str = modelToString_1.modelToString(User) + "\n\n" + modelToString_1.modelToString(Profile);
    console.log(str);
    expect(str).toBeTruthy();
});
