import { Context } from "telegraf";

export const newMemberGreetings = async (ctx: Context): Promise<void> => {
	if (ctx.message?.new_chat_members) {
		const names = ctx.message.new_chat_members.map(val => (val.first_name || "New Entrant"));
		await Promise.all(names.map(name => ctx.reply(`Hey ${name}! can you please introduce yourself :)`)));
	}
};

export const leftMember = async (ctx: Context): Promise<void> => {
	if (ctx.message?.left_chat_member) {
		const name = ctx.message.left_chat_member.first_name;
		await ctx.reply(`Hey ${name}! left :(`);
	}
};
