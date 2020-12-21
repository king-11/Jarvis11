import { Context } from "telegraf";

export const logger = async (ctx: Context, next):Promise<void> => {
	const start = new Date();
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	await next();
	const ms = new Date().getTime() - start.getTime();
	console.log("Response time: %sms", ms);
};

export const testCommand = async (ctx: Context):Promise<void> => {
	ctx.reply("Har Har Mahadev");
};
