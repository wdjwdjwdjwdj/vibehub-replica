export const sourceFocusedDetails = {
  api: {
    en: {
      note: 'An HTTP 200 only means the request received a normal response. Business success still depends on the API contract and response data.',
      next: [],
    },
    zh: {
      note: 'HTTP 200 只表示请求得到了正常响应；业务是否成功，还要看 API 契约和返回数据。',
      next: [],
    },
  },
  'ai-agent': {
    en: {
      sections: [
        { title: 'What makes an agent more than a chat reply', items: [
          ['Set a goal and constraints', 'The product gives the agent a task, protected scope, and the information it needs.'],
          ['Use permitted tools', 'The model can request reads, edits, or checks, but the runtime controls what it may do.'],
          ['Report from evidence', 'Real tool results, file changes, and tests determine whether the task is actually complete.'],
        ] },
      ],
      noteTitle: 'What people often confuse',
      note: 'An agent is not automatically authorized or correct. Its permissions, tool results, and verification still determine what it can safely claim.',
      decision: {
        title: 'AI agent vs chatbot: what is the difference?',
        intro: 'A chatbot describes the conversational interface; an AI agent describes a goal-directed workflow that uses results to decide the next step. One product can be both.',
        rows: [
          ['What it describes', 'A workflow that takes actions, observes results, and continues toward a goal.', 'An interface where people and an AI exchange messages.'],
          ['How work continues', 'Uses tool output or other observations to choose another action or stop.', 'Organizes interaction as turns; it may answer directly or provide access to an agent workflow.'],
          ['Typical workflow', 'Inspects repository files, edits code, runs tests, and verifies fixes before concluding.', 'Explains an error from text pasted into the chat prompt.'],
        ],
        sceneTitle: 'Investigating an application bug',
        scene: 'A chatbot can explain an error from the details you provide. An AI agent can take on the goal of fixing it: read files, edit code, run tests, and use the results to decide whether more work is needed. A chat interface may be how you control that agent.',
      },
      next: ['Tool Calling', 'Agent Loop', 'Sub-agent'],
    },
    zh: {
      sections: [
        { title: 'AI Agent 为什么不只是聊天回复', items: [
          ['设定目标和约束', '产品给 Agent 一个任务、受保护的范围，以及完成任务所需的信息。'],
          ['使用被允许的工具', '模型可以请求读取、修改或检查，但运行时决定它真正能做什么。'],
          ['根据证据报告', '真实工具结果、文件变化和测试结果，决定任务是否真的完成。'],
        ] },
      ],
      noteTitle: '人们经常混淆的地方',
      note: 'Agent 并不会自动获得权限，也不会自动正确。它的权限、工具结果和验证过程，决定了它能安全声称什么。',
      decision: {
        title: 'AI Agent 和聊天机器人有什么区别？',
        intro: '聊天机器人描述的是对话界面；AI Agent 描述的是一个会根据结果决定下一步、朝目标推进的工作流。一个产品可以同时具备两者。',
        rows: [
          ['它描述什么', '会执行动作、观察结果，并继续朝目标推进的工作流。', '人与 AI 交换消息的交互界面。'],
          ['工作如何继续', '根据工具输出或观察结果选择下一步，或者决定停止。', '以多轮对话组织交互，也可以直接回答或接入 Agent 工作流。'],
          ['典型流程', '读取项目文件、修改代码、运行测试，并在结束前验证修复。', '根据聊天提示里粘贴的文字解释错误原因。'],
        ],
        sceneTitle: '排查应用 Bug',
        scene: '聊天机器人可以根据你提供的细节解释错误；AI Agent 可以接下修复它的目标：读取文件、修改代码、运行测试，并根据结果决定是否还要继续。聊天界面可能只是控制 Agent 的方式。',
      },
      next: ['Tool Calling', 'Agent Loop', 'Sub-agent'],
    },
  },
  'project-rules': {
    en: {
      sections: [
        { title: 'What do project rules control?', items: [
          ['Rules files contain conventions and constraints', 'A typical AGENTS.md or .cursorrules includes the project stack, code conventions, forbidden actions, and verification steps. Starting with 5–10 high-value rules works best.'],
          ['Become part of the multi-turn context', 'Tools read project rules and pass them to the model automatically, reducing repetitive prompting.'],
          ['Share rules with the repo, but never secrets', 'Team rules are committed to Git; real API keys and local paths belong in environment variables, not rules files.'],
        ] },
      ],
      noteTitle: 'Project rules do not replace hard checks',
      note: 'Project rules guide the agent; they are not a client permission policy and do not prove correctness like a compiler, linter, or test. Keep sensitive actions inside permission boundaries, then verify changes with the project checks and human judgment.',
      next: ['Configuration File', 'Skill', 'Permission Mode'],
    },
    zh: {
      sections: [
        { title: '项目规则控制什么？', items: [
          ['规则文件包含约定和约束', '典型的 AGENTS.md 或 .cursorrules 会写项目技术栈、代码规范、禁止动作和验证步骤。先写 5–10 条高价值规则最有效。'],
          ['成为多轮上下文的一部分', '工具会自动读取项目规则并传给模型，减少重复提示。'],
          ['与仓库共享规则，但绝不共享密钥', '团队规则可以提交到 Git；真实 API Key 和本地路径应放进环境变量，而不是规则文件。'],
        ] },
      ],
      noteTitle: '项目规则不能替代硬校验',
      note: '项目规则只能指导 Agent，不是客户端权限策略，也不能像编译器、Lint 或测试那样证明正确性。敏感操作仍要放在权限边界内，并用项目检查和人工判断验证结果。',
      next: ['Configuration File', 'Skill', 'Permission Mode'],
    },
  },
};
