let chatCounter = 0;

function createChat() {
  const chatName = `Chat ${++chatCounter}`;
  const chatInstance = document.createElement("div");
  chatInstance.className = "chat-instance";
  chatInstance.innerHTML = `
    <input type="checkbox" class="chat-checkbox">
    <div class="chat-info">
      <div class="chat-name">${chatName}</div>
      <div class="chat-preview">No messages yet.</div>
    </div>
    <div class="chat-close">x</div>
  `;
  document.querySelector(".chat-sidebar").appendChild(chatInstance);
  updateChatList();
}

function updateChatList() {
  chrome.runtime.sendMessage({ type: "updateChatList" });
}

function deleteChatInstances() {
  const chatInstances = Array.from(document.querySelectorAll(".chat-instance"));
  if (chatInstances.length === 0) {
    console.log("No chat instances found.");
    return;
  }
  chatInstances.forEach(chat => {
    chat.remove();
  });
  console.log(`${chatInstances.length} chat instances deleted.`);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "deleteAllChats") {
    deleteChatInstances();
  }
});

document.querySelector(".chat-create").addEventListener("click", createChat);
updateChatList();
