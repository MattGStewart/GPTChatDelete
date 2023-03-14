let chatInstances = [];

function updateChatList() {
  const searchBox = document.getElementById("searchBox");
  const searchTerm = searchBox.value.trim().toLowerCase();

  chatInstances = Array.from(document.querySelectorAll(".chat-instance"));

  chatInstances.forEach(chat => {
    const chatName = chat.querySelector(".chat-name").innerText.toLowerCase();
    const chatPreview = chat.querySelector(".chat-preview").innerText.toLowerCase();

    if (chatName.includes(searchTerm) || chatPreview.includes(searchTerm)) {
      chat.style.display = "flex";
    } else {
      chat.style.display = "none";
    }
  });
}

function deleteChats() {
  const selectedChats = chatInstances.filter(chat => chat.querySelector(".chat-checkbox").checked);
  if (selectedChats.length === 0) {
    alert("No chats selected.");
    return;
  }
  if (!confirm(`Are you sure you want to delete ${selectedChats.length} chats?`)) {
    return;
  }
  selectedChats.forEach(chat => chat.remove());
  alert(`${selectedChats.length} chats deleted.`);
}

function saveSelection() {
  const selectedChats = chatInstances.filter(chat => chat.querySelector(".chat-checkbox").checked).map(chat => chat.querySelector(".chat-name").innerText);
  chrome.storage.local.set({ selectedChats });
  alert(`${selectedChats.length} chats saved.`);
}

function loadSelection() {
  chrome.storage.local.get("selectedChats", ({ selectedChats }) => {
    if (!selectedChats || selectedChats.length === 0) {
      alert("No saved chats found.");
      return;
    }
    for (let chat of chatInstances) {
      const chatName = chat.querySelector(".chat-name").innerText;
      if (selectedChats.includes(chatName)) {
        chat.querySelector(".chat-checkbox").checked = true;
      }
    }
    alert(`${selectedChats.length} chats loaded.`);
  });
}

document.getElementById("searchBox").addEventListener("input", updateChatList);
document.getElementById("deleteButton").addEventListener("click", deleteChats);
document.getElementById("saveButton").addEventListener("click", saveSelection);
document.getElementById("loadButton").addEventListener("click", loadSelection);

updateChatList();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "delete") {
    deleteChats();
  }
});

