export const getProperties = () => {
  const scriptProperties = PropertiesService.getScriptProperties();
  return scriptProperties.getProperties();
};

export function openSettings() {
  const template = HtmlService.createTemplateFromFile("settings");
  template.settings = getProperties();
  const html = template.evaluate().setWidth(500).setHeight(400);
  SpreadsheetApp.getUi().showModalDialog(html, "Settings");
}

export function saveProperties(formObj: Record<"slackWebhook" | "twitterToken", string>) {
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperties({
    ...formObj,
  });
}

export function registerMenu() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("🎈 Menu").addItem("Settings", "openSettings").addToUi();
}
