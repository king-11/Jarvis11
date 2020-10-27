import { NowRequest, NowResponse } from "@vercel/node";
import Telegraf from "telegraf";

import {newMemberGreetings, leftMember} from "./members";
import {logger, testCommand} from "./utility";

const PROD_ENV = process.env.NODE_ENV === "production";

const bot = new Telegraf(process.env.TOKEN || "");

bot.use(Telegraf.log());
bot.use(logger);

bot.on("left_chat_member",leftMember);
bot.on("new_chat_members", newMemberGreetings);
bot.command("test", testCommand);

if (!PROD_ENV) {
	bot.launch();
}

module.exports = (req: NowRequest, resp: NowResponse) => {
	if (req.method === "POST") bot.handleUpdate(req.body, resp);
	else resp.status(200).send("Use POST to use Telegram bot!");
};
