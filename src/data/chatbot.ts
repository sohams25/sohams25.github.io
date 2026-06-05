/* =========================================================================
   Field-radio chatbot — CLIENT-SAFE config only.
   This module ships to the browser. It must never contain the system prompt,
   the knowledge base, or any key. Those live in src/lib/chat-knowledge.ts,
   imported only by the server route src/pages/api/chat.ts.
   ========================================================================= */

export const fieldRadio = {
  panelTitle: 'Field radio',
  introLine:
    'Ask it anything. It answers in my voice, about the work, the papers, and how each one got built.',
  placeholder: 'Ask about the rover, ViViT, edge ML…',
  greeting:
    "Soham here. Ask me about my work in computer vision, robotics, or the murals I helped restore, and I'll answer from the field notes.",
  suggestedQuestions: [
    'What do you do at Clutterbot?',
    'How did you speed up edge inference?',
    'Tell me about the Mars rover project.',
    "What do you do when you're not coding?",
  ],
  fallbackMessage:
    'The radio dropped out on my end. Email me at sohams.web@gmail.com or look through my CV, and I will pick up the thread.',
  endpoint: '/api/chat',
  maxChars: 500,
  maxHistory: 8,
} as const;
