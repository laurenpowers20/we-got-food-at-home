import { Configuration, OpenAIApi } from 'openai';
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
require('dotenv').config();

const configuration = new Configuration({
	apiKey: process.env.OPEN_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
app.use(json());
app.use(cors());

// Set up the ChatGPT endpoint
app.post('/chat', async (req, res) => {
	// Get the prompt from the request
	const { prompt } = req.body;

	// Generate a response with ChatGPT
	const completion = await openai.createCompletion({
		model: 'text-davinci-002',
		prompt: prompt,
		max_tokens: 2048,
	});

	res.send(completion.data.choices[0].text);
});

// Start the server
const port = 8080;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
