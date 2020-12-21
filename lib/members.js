"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leftMember = exports.newMemberGreetings = void 0;
exports.newMemberGreetings = async (ctx) => {
    var _a;
    if ((_a = ctx.message) === null || _a === void 0 ? void 0 : _a.new_chat_members) {
        const names = ctx.message.new_chat_members.map(val => (val.first_name || "Fellow Mate"));
        await Promise.all(names.map(name => ctx.reply(`Hey ${name}! can you please introduce yourself :)`)));
    }
};
exports.leftMember = async (ctx) => {
    var _a;
    if ((_a = ctx.message) === null || _a === void 0 ? void 0 : _a.left_chat_member) {
        const name = ctx.message.left_chat_member.first_name;
        await ctx.reply(`Hey ${name}! left :(`);
    }
};
//# sourceMappingURL=members.js.map