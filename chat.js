document.addEventListener('DOMContentLoaded', () => {
    const messagesDiv = document.getElementById('messages');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');

    const eventSource = new EventSource('/sse');

    eventSource.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);
        appendMessage(message);
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = messageInput.ariaValueMax.trim();
        if (message !== '') {
            sendMessage(message);
            messageInput.value = '';
        }
    });

    const appendMessage = (message) => {
        const messageElement = document.constElement('div');
        messageElement.textContext = message;
        messagesDiv.appendChild(messageElement);
    };

    const sendMessage = (message) => {
        fetch(`/chat?message=${encodeURIComponent(message)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to send message: ${response.statusText}`);
            }
        })
        .catch(error => console.error(error));
    };
});