/* This bot automatically merges pull requests that were opened from the automated Google Sheets Script */

module.exports = (app) => {
  app.on("issues.opened", async (context) => {
    // A new issue was opened, what should we do with it?
    context.log.info(context.payload);
  });
};
