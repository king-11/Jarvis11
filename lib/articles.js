"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.article = exports.markdownArticles = exports.fetchArticles = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const telegraf_1 = require("telegraf");
const functions = tslib_1.__importStar(require("firebase-functions"));
const index_1 = require("./index");
const groupId = (_a = functions.config().telegram) === null || _a === void 0 ? void 0 : _a.chatid;
exports.fetchArticles = async () => {
    const response = await axios_1.default.get("https://dev.to/api/articles", {
        params: {
            top: 7,
            per_page: 7,
        },
    });
    const data = [];
    response.data.forEach((element) => {
        data.push({
            title: element.title,
            url: element.url,
            description: element.description,
            user: element.user.name,
            userId: `https://github.com/${element.user.github_username}` ||
                `https://twitter.com/${element.user.twitter_username}`,
        });
    });
    return data;
};
exports.markdownArticles = (artices) => {
    return artices.map((e) => `[${e.title}](${e.url}) by [${e.user}](${e.userId})\n${e.description}`);
};
exports.article = functions.https.onRequest(async (req, res) => {
    var _a;
    const password = req.headers.authorization;
    if (password === ((_a = functions.config().telegram) === null || _a === void 0 ? void 0 : _a.password)) {
        const replyList = await exports.fetchArticles().then(exports.markdownArticles);
        await index_1.bot.telegram
            .sendMessage(groupId, `Hey Devs here are week's top blogs :)\n\n${replyList.join("\n\n")}`, telegraf_1.Extra.markdown().webPreview(false))
            .catch((e) => console.error(e));
        res.status(200).send("Article Sent");
    }
    res.status(200).send("Invalid password!");
});
//# sourceMappingURL=articles.js.map