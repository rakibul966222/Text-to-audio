const express = require('express');
const Bytez = require('bytez.js');
const path = require('path');

const app = express();
const port = 3000;

const key = "af5786876015b79c3ca9497ffb2c7232";
const sdk = new Bytez(key);

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/tts', async (req, res) => {
  const { text } = req.body;
  const model = sdk.model("openai/tts-1-hd");
  const { error, output } = await model.run(text);
  res.json({ error, output });
});

app.post('/text-model', async (req, res) => {
  const { text } = req.body;
  const model = sdk.model("openai/gpt-5");
  const { error, output } = await model.run([{ role: "user", content: text }]);
  res.json({ error, output });
});

app.post('/image-model', async (req, res) => {
  const { text } = req.body;
  const model = sdk.model("google/imagen-4.0-ultra-generate-001");
  const { error, output } = await model.run(text);
  res.json({ error, output });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
