document.addEventListener('DOMContentLoaded', () => {
    const messagesDiv = document.getElementById('messages');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
  
    const sse = new EventSource('/sse');
    
  
    sse.onmessage = (event) => {
      const message = event.data;
      messagesDiv.innerHTML += `<p>${message}</p>`;
    };

    
      messageForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = messageInput.value.trim();
  
      if (message) {
        fetch(`/chat?message=${encodeURIComponent(message)}`)
          .then(response => response.text())
          .then(data => {
            console.log(data); 
          })
          .catch(error => {
            console.error('Error:', error);
          });
          messageInput.value = '';
      }
    });
  });
  