document.addEventListener('DOMContentLoaded', function() {
  const apiSelect = document.getElementById('api-select');
  const chatGPTMessages = document.getElementById('chatgpt-messages');
  const geminiMessages = document.getElementById('gemini-messages');
  const addButton = document.getElementById('add-message');
  const generateButton = document.getElementById('generate-request');
  const copyButton = document.getElementById('copy-request');
  const requestBody = document.getElementById('request-body');

  apiSelect.addEventListener('change', function() {
    const selectedAPI = apiSelect.value;
    if (selectedAPI === 'chatgpt') {
      chatGPTMessages.style.display = 'block';
      geminiMessages.style.display = 'none';
    } else if (selectedAPI === 'gemini') {
      chatGPTMessages.style.display = 'none';
      geminiMessages.style.display = 'block';
    }
  });

  addButton.addEventListener('click', function() {
    const selectedAPI = apiSelect.value;
    if (selectedAPI === 'chatgpt') {
      const newMessageDiv = document.createElement('div');
      newMessageDiv.classList.add('message');
      newMessageDiv.innerHTML = `
        <input type="text" class="role" placeholder="Role (e.g., system, user, assistant)">
        <input type="text" class="content" placeholder="Content">
      `;
      chatGPTMessages.appendChild(newMessageDiv);
    } else if (selectedAPI === 'gemini') {
      const newGeminiContentDiv = document.createElement('div');
      newGeminiContentDiv.classList.add('gemini-content');
      newGeminiContentDiv.innerHTML = `
        <input type="text" class="prompt" placeholder="Prompt">
      `;
      geminiMessages.appendChild(newGeminiContentDiv);
    }
  });

  generateButton.addEventListener('click', function() {
    const selectedAPI = apiSelect.value;
    if (selectedAPI === 'chatgpt') {
      const messages = document.querySelectorAll('.message');
      const requestData = {
        model: "gpt-3.5-turbo",
        messages: []
      };
      messages.forEach(message => {
        const role = message.querySelector('.role').value;
        const content = message.querySelector('.content').value;
        if (role && content) {
          requestData.messages.push({ role, content });
        }
      });
      requestBody.value = JSON.stringify(requestData, null, 2);
      copyButton.classList.add('ready-to-copy');
    } else if (selectedAPI === 'gemini') {
      const contents = document.querySelectorAll('.gemini-content');
      const requestData = {
        contents: []
      };
      contents.forEach(content => {
        const prompt = content.querySelector('.prompt').value;
        if (prompt) {
          requestData.contents.push({
            parts: [{ text: prompt }]
          });
        }
      });
      requestBody.value = JSON.stringify(requestData, null, 2);
      copyButton.classList.add('ready-to-copy');
    }
  });

  copyButton.addEventListener('click', function() {
    requestBody.select();
    document.execCommand('copy');
    alert('Request copied to clipboard!');
  });
});
