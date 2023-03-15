class PopupController {
  constructor() {
    this.toggleChatSelectionBtn = document.getElementById('toggleChatSelection');
    this.deleteSelectedChatsBtn = document.getElementById('deleteSelectedChats');
    this.chatSelectionEnabled = false;

    this.init();
  }

  init() {
    this.loadChatSelectionState();
    this.addEventListeners();
  }

  loadChatSelectionState() {
    chrome.storage.local.get('chatSelectionEnabled', (data) => {
      this.chatSelectionEnabled = data.chatSelectionEnabled || false;
      this.updateToggleChatSelectionBtnText();
      if (this.chatSelectionEnabled) this.sendMessage('toggleChatSelection');
    });
  }

  addEventListeners() {
    this.toggleChatSelectionBtn.addEventListener('click', () => this.toggleChatSelection());
    this.deleteSelectedChatsBtn.addEventListener('click', () => this.sendMessage('deleteSelectedChats'));
  }

  toggleChatSelection() {
    this.chatSelectionEnabled = !this.chatSelectionEnabled;
    this.updateToggleChatSelectionBtnText();
    this.sendMessage('toggleChatSelection');
    chrome.storage.local.set({ chatSelectionEnabled: this.chatSelectionEnabled });
  }

  updateToggleChatSelectionBtnText() {
    this.toggleChatSelectionBtn.textContent = this.chatSelectionEnabled ? 'Disable Chat Selection' : 'Enable Chat Selection';
  }

  sendMessage(action) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action, chatSelectionEnabled: this.chatSelectionEnabled });
    });
  }
}

new PopupController();
