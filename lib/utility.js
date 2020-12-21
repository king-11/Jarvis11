"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testCommand = exports.logger = void 0;
exports.logger = async (ctx, next) => {
    const start = new Date();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await next();
    const ms = new Date().getTime() - start.getTime();
    console.log("Response time: %sms", ms);
};
exports.testCommand = async (ctx) => {
    ctx.reply("Har Har Mahadev");
};
//# sourceMappingURL=utility.js.map