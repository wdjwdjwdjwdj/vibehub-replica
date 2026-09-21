// Newer VibeHub sitemap entries that are not present in the historical catalog snapshot.
// Kept as ordinary editable data so direct links remain usable without a backend.
export const termExtras = [
  ['Backend', 'HTTP Status Code', 'http-status-code', 'The page opens to a 404 error. Did I write the wrong link, or was the deployment incomplete?'],
  ['Backend', 'Stack Trace', 'stack-trace', 'The terminal printed a long error. Which line should I send to the AI?'],
  ['Backend', 'Timeout', 'timeout', 'I clicked save and it spins forever, then says the request timed out. Is it the network or the server?'],
  ['Backend', 'Object Storage', 'object-storage', 'Where do user-uploaded profile pictures actually go?'],
  ['Backend', 'Primary Key', 'primary-key', 'AI said to update this record by id. Where does that id come from?'],
  ['Backend', 'Session', 'session', 'After signing in, why does the page stay signed in after refresh?'],
  ['Backend', 'OAuth', 'oauth', 'How do I add a sign in with WeChat button to the page?'],
  ['Backend', 'Webhook', 'webhook', 'How do I unlock membership automatically after a successful payment?'],
  ['Backend', 'HTTP Methods', 'http-methods', 'AI said to use POST instead of GET here. What does that mean?'],
  ['Backend', 'IP Address', 'ip-address', 'Why can I open the page on my computer but others cannot?'],
  ['Backend', 'WebSocket', 'websocket', 'How does a chat room receive new messages in real time?'],
  ['Git', 'Merge Conflict', 'merge-conflict', 'After pulling, Git stopped with a conflict. Which file do I open, and which section do I change?'],
  ['Git', 'Remote Repository', 'remote-repository', 'My commits only exist on my computer. How can others see them?'],
  ['Git', 'Reset & Revert', 'reset-revert', 'I just committed the wrong thing. How do I undo it?'],
  ['Tech Stack', 'Node.js', 'node-js', 'The terminal says command not found: node. Why cannot my project run?'],
  ['Tech Stack', 'Dependency', 'dependency', 'I just downloaded the project and it reports a missing module. Is the code broken?'],
  ['Tech Stack', 'Semantic Versioning', 'semantic-versioning', 'AI asks me to upgrade a dependency from 18 to 19. Should I just do it?'],
  ['AI', 'RAG', 'rag', 'I want AI to answer only from our company docs. How do I set that up?'],
  ['AI', 'Prompt Injection', 'prompt-injection', 'Even just asking AI to read a page can create a security problem?'],
  ['AI', 'Temperature', 'temperature', 'Why does AI answer the same question differently every time?'],
  ['AI', 'Fine-tuning', 'fine-tuning', 'Can I train a model that only knows my product?'],
  ['AI', 'Reasoning Model', 'reasoning-model', 'AI has been thinking for so long—is it stuck?'],
  ['AI', 'Agent Memory', 'agent-memory', 'I have to restate my requirements in every new conversation. So annoying.'],
  ['Product', 'Scope Creep', 'scope-creep', 'I asked for one button change and AI touched five files. Is that normal?'],
  ['Product', 'Technical Debt', 'technical-debt', 'AI said to implement it this way for now and refactor later. What does that mean?'],
  ['Product', 'Persona', 'persona', 'Who is this page actually written for?'],
  ['Product', 'Prototype', 'prototype', 'Make a clickable prototype to confirm the flow before writing code.'],
  ['Product', 'Event Tracking', 'event-tracking', 'I want to know whether anyone actually clicks this button.'],
  ['Product', 'Regex', 'regex', 'AI gave me a regex I cannot read. Should I use it?'],
  ['Frontend', 'Keyframe', 'keyframe', 'Make the logo rotate continuously. AI says to use keyframes?'],
  ['Frontend', 'Prefers Reduced Motion', 'prefers-reduced-motion', "Someone has the system's reduce motion setting on and my page animations still run. Should I handle it?"],
  ['Frontend', 'Semantic HTML', 'semantic-html', 'The SEO check says my page is missing an H1. What does that mean?'],
];

export const extraItemsByTopic = termExtras.reduce((groups, [topic, name, id, description]) => {
  (groups[topic] ||= []).push([id, name, description, 'card-demo']);
  return groups;
}, {});
