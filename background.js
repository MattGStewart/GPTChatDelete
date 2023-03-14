chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "deleteAllChats",
      title: "Delete All Chats",
      contexts: ["browser_action"],
    });
  });
  
  chrome.contextMenus.onClicked.addListener(info => {
    if (info.menuItemId === "deleteAllChats") {
      chrome.tabs.query({ url: "https://chatgpt.com/*" }, tabs => {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, "deleteAllChats");
        });
      });
    }
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "updateChatList") {
      chrome.browserAction.setBadgeText({ text: "!" });
      chrome.browserAction.setBadgeBackgroundColor({ color: "#FF0000" });
    }
  });
  