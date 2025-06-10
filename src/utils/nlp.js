let city, category, time;

try {
  const llmResponse = await getStructuredMessage(messageText); // your LLM call
  city = llmResponse.city || '';
  category = llmResponse.category || '';
  time = llmResponse.time || '';
  
  if (!city || !time) {
    throw new Error("LLM missing required fields, falling back to local NLP.");
  }
} catch (err) {
  console.error("❌ LLM response parsing error:", err.message);
  const nlp = parseUserMessage(messageText);
  city = nlp.city;
  category = nlp.category;
  time = nlp.time;
}
