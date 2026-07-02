/* =========================================================================
   Field-radio chatbot — CLIENT-SAFE config only.
   This module ships to the browser. It must never contain the system prompt,
   the knowledge base, or any key. Those live in src/lib/chat-knowledge.ts,
   imported only by the server route src/pages/api/chat.ts.
   ========================================================================= */

export const fieldRadio = {
  panelTitle: 'Field radio',
  placeholder: 'Ask about the rover, ViViT, edge ML…',
  greeting:
    "Soham here. Ask me about my work — computer vision, robotics, the murals I helped restore. A model answers for me, from my notes.",
  suggestedQuestions: [
    'What do you do at Clutterbot?',
    'How did you speed up edge inference?',
    'Tell me about the Mars rover project.',
    "What do you do when you're not coding?",
  ],
  fallbackMessage:
    "Something broke on my end. Email me at sohams.web@gmail.com and I'll answer properly.",
  endpoint: '/api/chat',
  maxChars: 500,
  maxHistory: 8,
} as const;
