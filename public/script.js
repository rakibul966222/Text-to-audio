document.addEventListener('DOMContentLoaded', () => {
  const modelSelect = document.getElementById('model-select');
  const inputText = document.getElementById('input-text');
  const submitBtn = document.getElementById('submit-btn');
  const outputContainer = document.getElementById('output-container');

  submitBtn.addEventListener('click', async () => {
    const model = modelSelect.value;
    const text = inputText.value;

    if (!text) {
      alert('Please enter some text');
      return;
    }

    try {
      const response = await fetch(`/${model}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (data.error) {
        outputContainer.innerHTML = `<p class="error">Error: ${data.error}</p>`;
      } else {
        if (model === 'tts') {
          outputContainer.innerHTML = `<audio controls src="${data.output}"></audio>`;
        } else if (model === 'text-model') {
          outputContainer.innerHTML = `<p>${data.output}</p>`;
        } else if (model === 'image-model') {
          outputContainer.innerHTML = `<img src="${data.output}" alt="Generated image">`;
        }
      }
    } catch (error) {
      outputContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
  });
});
