// src/api/openai.js

export async function callChatGPT(messages) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  console.log("✅ API Key:", apiKey); // ← 追加してブラウザのDevToolsで確認


  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages,
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
