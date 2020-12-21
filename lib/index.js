"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const tslib_1 = require("tslib");
const functions = tslib_1.__importStar(require("firebase-functions"));
const telegraf_1 = tslib_1.__importDefault(require("telegraf"));
const articles_1 = require("./articles");
const members_1 = require("./members");
const utility_1 = require("./utility");
const PROD_ENV = ((_a = functions.config().telegram) === null || _a === void 0 ? void 0 : _a.node_env) === "production";
exports.bot = new telegraf_1.default((_b = functions.config().telegram) === null || _b === void 0 ? void 0 : _b.bot_token);
exports.bot.use(telegraf_1.default.log());
exports.bot.use(utility_1.logger);
exports.bot.on("left_chat_member", members_1.leftMember);
exports.bot.on("new_chat_members", members_1.newMemberGreetings);
exports.bot.command("test", utility_1.testCommand);
if (!PROD_ENV) {
    exports.bot.launch();
}
exports.jarvis11 = functions.https.onRequest((req, resp) => {
    if (req.method === "POST")
        exports.bot.handleUpdate(req.body, resp);
    else
        resp.status(200).send("Use POST to use Telegram bot!");
});
process.on("unhandledRejection", (err) => console.log(err));
exports.article = articles_1.article;
//# sourceMappingURL=index.js.map