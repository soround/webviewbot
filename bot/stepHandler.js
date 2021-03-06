import { Composer } from "telegraf";
import { Helpers } from "../helpers.js";
import { printPageToPDF } from "../webapi/cases/printPageToPDF.js";
import { takeScreenshot } from "../webapi/cases/takeScreenshot.js";
import { takeFullScreenshot } from "../webapi/cases/takeScreenshot.js";

export const stepHandler = new Composer();
stepHandler.action("pdf", async (ctx) => {
    try {
        await ctx.deleteMessage();
        await ctx.replyWithChatAction("upload_document");
        await ctx.replyWithDocument({
            source: await printPageToPDF(ctx.wizard.state.url),
            filename: `Page at ${new Helpers().formatDate()}.pdf`,
        });
    } catch (error) {
        ctx.replyWithMarkdown("Произошла ошибка: `" + error + "`");
    } finally {
        return ctx.scene.leave();
    }
});

stepHandler.action("exit", async (ctx) => {
    await ctx.deleteMessage();
    return ctx.scene.leave();
});

stepHandler.action("png", async (ctx) => {
    try {
        await ctx.deleteMessage();
        await ctx.replyWithChatAction("upload_document");
        await ctx.replyWithDocument(
            {
                source: await takeScreenshot(ctx.wizard.state.url),
                filename: `Screenshot at ${new Helpers().formatDate()}.png`,
            },
            {
                caption: `datetime: ${new Date().toJSON()}`,
            },
        );
    } catch (error) {
        ctx.replyWithMarkdown("Произошла ошибка: `" + error + "`");
    } finally {
        return ctx.scene.leave();
    }
});

stepHandler.action("pngFullPage", async (ctx) => {
    try {
        await ctx.deleteMessage();
        await ctx.replyWithChatAction("upload_document");
        await ctx.replyWithDocument(
            {
                source: await takeFullScreenshot(ctx.wizard.state.url),
                filename: `Screenshot page at ${new Helpers().formatDate()}.png`,
            },
            { caption: `datetime: ${new Date().toJSON()}` },
        );
    } catch (error) {
        ctx.replyWithMarkdown("Произошла ошибка: `" + error + "`");
    } finally {
        return ctx.scene.leave();
    }
});

stepHandler.use(async (ctx) => {
    await ctx.reply("Необходимо выбрать тип экспорта");
    return ctx.scene.leave();
});
