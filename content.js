class ContentController {
  constructor() {
    this.chatInstances = document.querySelectorAll('.chat-instance');
  }

  toggleChatSelection(chatSelectionEnabled) {
    if (chatSelectionEnabled) {
      this.addCheckboxes();
    } else {
      this.chatInstances.forEach((instance) => {
        const checkbox = instance.querySelector('input[type="checkbox"]');
        if (checkbox) {
          checkbox.remove();
        }
      });
    }
  }

  addCheckboxes() {
    this.chatInstances.forEach((chatInstance) => {
      if (!chatInstance.querySelector('.chat-select-checkbox')) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'chat-select-checkbox';
        chatInstance.insertBefore(checkbox, chatInstance.firstChild);
      }
    });
  }

  deleteSelectedChats() {
    const selectedChats = document.querySelectorAll('.chat-instance input:checked');
    selectedChats.forEach((checkbox) => {
      const chatInstance = checkbox.closest('.chat-instance');
      chatInstance.remove();
    });
  }
}

const contentController = new ContentController();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleChatSelection') {
    contentController.toggleChatSelection(request.chatSelectionEnabled);
  } else if (request.action === 'deleteSelectedChats') {
    contentController.deleteSelectedChats();
  }
});
