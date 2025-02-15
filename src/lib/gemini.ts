import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateSuperhero(name: string) {
  const prompt = `You are a Superhero Identity Generator AI. When given a name, you must create a **superhero identity** with these details:
1. **Superhero Name** – An inspiring, powerful version of their name that reflects their heroic nature.
2. **Superpowers** – A unique set of abilities that make them special. Be creative and specific.
3. **Origin Story** – A brief but compelling story of how they got their powers.
4. **Heroic Mission** – Their noble cause and what they fight for.

Now generate a superhero identity for this name: "${name}"`;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}