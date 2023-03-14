const chatListObserver = new MutationObserver(() => {
    const chatInstances = document.querySelectorAll(".chat-instance");
  
    chatInstances.forEach(chat => {
      if (!chat.querySelector(".chat-checkbox")) {
        const chatCheckbox = document.createElement("input");
        chatCheckbox.type = "radio";
        chatCheckbox.name = "chat-instance";
        chatCheckbox.className = "chat-checkbox";
        chat.insertBefore(chatCheckbox, chat.firstChild);
      }
    });
  
    const deleteButton = document.querySelector(".chat-delete");
    if (!deleteButton) {
      const newDeleteButton = document.createElement("button");
      newDeleteButton.innerText = "Delete Selected Chats";
      newDeleteButton.className = "chat-delete";
      newDeleteButton.style.display = "none";
      newDeleteButton.addEventListener("click", () => {
        const selectedChat = document.querySelector(".chat-checkbox:checked");
        if (!selectedChat) {
          alert("No chat selected.");
          return;
        }
        if (!confirm(`Are you sure you want to delete this chat?`)) {
          return;
        }
        selectedChat.closest(".chat-instance").remove();
        newDeleteButton.style.display = "none";
        alert(`Chat deleted.`);
      });
      document.querySelector(".chat-header").appendChild(newDeleteButton);
    }
  
    const chatCheckboxes = document.querySelectorAll(".chat-checkbox");
    chatCheckboxes.forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        const selectedChat = document.querySelector(".chat-checkbox:checked");
        if (selectedChat) {
          deleteButton.style.display = "block";
        } else {
          deleteButton.style.display = "none";
        }
      });
    });
  });
  
  chatListObserver.observe(document.querySelector(".chat-list"), { childList: true });
  