import * as functions from "firebase-functions";
import { Response, Request } from "firebase-functions";
import Telegraf from "telegraf";
import { article } from "./articles";

import { newMemberGreetings, leftMember } from "./members";
import { logger, testCommand } from "./utility";

const PROD_ENV = functions.config().telegram?.node_env === "production";
export const bot = new Telegraf(functions.config().telegram?.bot_token);

bot.use(Telegraf.log());
bot.use(logger);

bot.on("left_chat_member", leftMember);
bot.on("new_chat_members", newMemberGreetings);
bot.command("test", testCommand);

if (!PROD_ENV) {
  bot.launch();
}

exports.jarvis11 = functions.https.onRequest((req: Request, resp: Response) => {
  if (req.method === "POST") bot.handleUpdate(req.body, resp);
  else resp.status(200).send("Use POST to use Telegram bot!");
});

process.on("unhandledRejection", (err) => console.log(err));

exports.article = article;
