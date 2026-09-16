export const practiceData = [
  {
    "termId": "component",
    "zh": {
      "title": "三个页面都要显示同一种“活动卡片”，以后还会一起修改。怎样组织才能统一维护？",
      "options": [
        {
          "id": "shared-card",
          "label": "做成一个可复用的活动卡片，由各页面传入内容",
          "feedback": "对。卡片的共同责任集中在一起，改卡片样式或行为后，三个页面会得到同一套结果。",
          "correct": true
        },
        {
          "id": "copy-markup",
          "label": "在三个页面各复制一份卡片，再用全局 CSS 保持外观一致",
          "feedback": "复制可以暂时显示内容，但共同规则会分散，后续容易漏改或出现不一致。",
          "correct": false
        },
        {
          "id": "whole-site",
          "label": "做成一个高度可配置的通用卡片，把三个页面的差异都变成参数",
          "feedback": "参数越多不代表复用越好。组件应集中稳定的共同责任；把所有差异都塞成开关，会让调用和维护同样复杂。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The event page, homepage, and search page all need cards with the same rules. Which approach makes later changes consistent?",
      "options": [
        {
          "id": "shared-card",
          "label": "Put the image, title, state, and click behavior in one event-card component, with each page passing its own data",
          "feedback": "Correct. The card's shared responsibility lives in one place, so a style or behavior change reaches all three pages.",
          "correct": true
        },
        {
          "id": "copy-markup",
          "label": "Copy the card code into every page, then edit titles and buttons separately",
          "feedback": "It can show content initially, but shared rules become scattered and will drift or be missed later.",
          "correct": false
        },
        {
          "id": "whole-site",
          "label": "Put every page and feature into one component named Website",
          "feedback": "That does not separate responsibilities. A component should make one reasonably independent part of the interface easier to understand and maintain.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "state",
    "zh": {
      "title": "用户点击保存后，页面立刻显示“已保存”，但请求随后失败。应该怎样修改？",
      "options": [
        {
          "id": "pending-result",
          "label": "先显示“保存中”，成功后显示“已保存”，失败时提供重试",
          "feedback": "对。等待、成功和失败是不同状态，页面要根据真实请求结果切换。",
          "correct": true
        },
        {
          "id": "success-first",
          "label": "先乐观显示“已保存”，失败时只记到控制台，不回滚界面",
          "feedback": "这会把界面文案当成证据，用户会以为数据已经成功保存。",
          "correct": false
        },
        {
          "id": "no-feedback",
          "label": "提交期间禁用按钮，结束后无论成功失败都恢复成初始状态",
          "feedback": "禁用按钮只能防止重复提交，不能告诉用户结果。成功和失败必须进入不同的可见状态。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A page shows “Saved” immediately after a click, but the network request then fails. What change fits best?",
      "options": [
        {
          "id": "pending-result",
          "label": "Enter a Saving state first, show Saved only after success, and show a retryable error on failure",
          "feedback": "Correct. Pending, success, and failure are different states, and the interface should change from the actual request result.",
          "correct": true
        },
        {
          "id": "success-first",
          "label": "Keep showing Saved immediately because users dislike waiting",
          "feedback": "That treats interface text as proof and makes users think data was stored when it was not.",
          "correct": false
        },
        {
          "id": "no-feedback",
          "label": "Remove every status message so no error text appears",
          "feedback": "People still need to know whether an action is pending, succeeded, or failed. Removing feedback does not make state accurate.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "markdown",
    "zh": {
      "title": "团队要用 Git 共同维护一份包含操作步骤和命令的 README。哪种交付方式最合适？",
      "options": [
        {
          "id": "structured-markdown",
          "label": "用 Markdown 写标题、列表和代码块，提交前检查预览",
          "feedback": "Markdown 同时保留可读结构和纯文本内容，命令能复制，修改也能在 Git 中逐行审查。",
          "correct": true
        },
        {
          "id": "document-screenshot",
          "label": "在文档软件里排版，再把每一页导出成图片提交",
          "feedback": "图片能保留外观，但文字难以复制、搜索和逐行比较，不适合持续协作的 README。",
          "correct": false
        },
        {
          "id": "spaced-plain-text",
          "label": "使用纯文本并靠连续空格、空行把内容推到目标位置",
          "feedback": "不同编辑器会用不同字体和换行宽度，空格排版无法稳定表达标题、列表和代码边界。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A team will maintain a README with procedures and commands through Git. Which delivery format fits best?",
      "options": [
        {
          "id": "structured-markdown",
          "label": "Use Markdown headings, lists, and code blocks, then check the rendered preview",
          "feedback": "Markdown keeps readable structure in plain text, so commands remain copyable and changes can be reviewed line by line.",
          "correct": true
        },
        {
          "id": "document-screenshot",
          "label": "Lay it out in a document editor and commit an image of every page",
          "feedback": "Images preserve appearance, but their text is difficult to copy, search, and compare line by line.",
          "correct": false
        },
        {
          "id": "spaced-plain-text",
          "label": "Use plain text and align sections with repeated spaces and blank lines",
          "feedback": "Editors use different fonts and wrapping widths, so spacing cannot reliably express headings, lists, or code boundaries.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "html",
    "zh": {
      "title": "文章页的大标题只是放大的普通文字，“查看原文”也是可点击的普通容器。应该怎样修改？",
      "options": [
        {
          "id": "semantic-elements",
          "label": "用合适的 HTML 标题和链接元素表达结构与跳转",
          "feedback": "HTML 元素会把标题层级和链接角色交给浏览器识别，页面外观仍可继续由 CSS 控制。",
          "correct": true
        },
        {
          "id": "visual-styling-only",
          "label": "保留现有容器，只继续加大字号并换成更醒目的颜色",
          "feedback": "视觉样式能改变外观，却不会让浏览器、键盘和辅助技术识别标题结构或链接角色。",
          "correct": false
        },
        {
          "id": "flatten-to-image",
          "label": "把标题和原文入口做进一张图片，再给整张图绑定点击",
          "feedback": "图片会丢失可选择文字和清楚的内容结构，入口范围与含义也难以被正确识别。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An article's main heading is only enlarged generic text, and View source is a clickable generic container. How should this be fixed?",
      "options": [
        {
          "id": "semantic-elements",
          "label": "Use appropriate HTML heading and link elements for the structure and navigation",
          "feedback": "HTML elements expose heading hierarchy and link behavior to the browser while CSS can still control appearance.",
          "correct": true
        },
        {
          "id": "visual-styling-only",
          "label": "Keep the generic containers and only increase the size and color contrast",
          "feedback": "Visual styling changes appearance but does not give browsers, keyboards, or assistive tools the missing roles.",
          "correct": false
        },
        {
          "id": "flatten-to-image",
          "label": "Put the heading and source action into one image and make the whole image clickable",
          "feedback": "An image removes selectable text and clear document structure, and its single click target obscures the action's meaning.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "css",
    "zh": {
      "title": "主按钮可以点击，但页面上仍显示灰色。下一步最应该检查什么？",
      "options": [
        {
          "id": "computed-style",
          "label": "检查按钮命中的 CSS 规则和 Computed 最终颜色，找出覆盖来源",
          "feedback": "对。按钮行为已经存在，先看匹配和覆盖后的最终值，才能知道主题色在哪一步被替换。",
          "correct": true
        },
        {
          "id": "rewrite-click",
          "label": "重写按钮的点击事件，让点击动作顺便设置主题色",
          "feedback": "点击逻辑和静态颜色是两件事；改事件可能掩盖 CSS 覆盖问题，还会让颜色依赖一次点击。",
          "correct": false
        },
        {
          "id": "replace-element",
          "label": "把按钮换成另一个 HTML 元素，期待浏览器自动使用主题色",
          "feedback": "更换元素不会自动解决样式规则冲突；应先确认选择器是否命中以及哪条声明胜出。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The primary button is clickable, but it still appears gray. What should you inspect first?",
      "options": [
        {
          "id": "computed-style",
          "label": "Inspect the button's matched CSS rules and computed color to find the override",
          "feedback": "Correct. The button behavior already exists, so inspect matching and the final value to find where the theme color was replaced.",
          "correct": true
        },
        {
          "id": "rewrite-click",
          "label": "Rewrite the click handler so the click also sets the theme color",
          "feedback": "Click behavior and a static color are separate. This can hide the CSS conflict and make the color depend on one click.",
          "correct": false
        },
        {
          "id": "replace-element",
          "label": "Replace the button with another HTML element and expect the theme color automatically",
          "feedback": "Changing the element does not resolve a stylesheet conflict. Check selector matching and which declaration wins first.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "dom",
    "zh": {
      "title": "点击“新增”后页面多出任务，但查看源代码时没有这条任务。下一步应怎样判断？",
      "options": [
        {
          "id": "inspect-runtime-dom",
          "label": "检查运行时 DOM 和脚本，确认新节点是怎样被创建并插入页面的",
          "feedback": "对。查看源代码反映初始文档，Elements 面板里的运行时 DOM 才能显示点击后的节点变化。",
          "correct": true
        },
        {
          "id": "edit-source-html",
          "label": "直接把这条任务写进初始 HTML，保证页面一开始就能看到",
          "feedback": "这会把一次点击产生的动态内容变成固定内容，仍然没有解释脚本怎样更新当前页面。",
          "correct": false
        },
        {
          "id": "assume-database",
          "label": "把页面多出的任务当成已保存数据，直接检查数据库记录",
          "feedback": "DOM 更新只证明当前页面有了节点，不证明数据已写入数据库；刷新后是否保留还要单独验证。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A task appears after clicking Add, but it is missing from View Source. What should you determine next?",
      "options": [
        {
          "id": "inspect-runtime-dom",
          "label": "Inspect the runtime DOM and script to see how the new node was created and inserted",
          "feedback": "Correct. View Source shows the initial document; the runtime DOM in Elements shows the node change after the click.",
          "correct": true
        },
        {
          "id": "edit-source-html",
          "label": "Write the task into the initial HTML so it is visible from the start",
          "feedback": "That turns click-generated content into fixed content and still does not explain how the script updates the current page.",
          "correct": false
        },
        {
          "id": "assume-database",
          "label": "Treat the new task as saved data and inspect the database record directly",
          "feedback": "A DOM update proves only that the current page has a node. It does not prove a database write; refresh persistence needs a separate check.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "title-tag",
    "zh": {
      "title": "两个商品详情页共用“商品详情”这个标签标题，用户切换页面时分不清。浏览器标签页标题应该怎么写？",
      "options": [
        {
          "id": "unique-page-title",
          "label": "让每个页面的 title 包含对应商品名，并保留页面里的 H1",
          "feedback": "对。title 负责浏览器文档标识，商品名能帮助区分页面；H1 仍负责页面正文层级。",
          "correct": true
        },
        {
          "id": "change-only-h1",
          "label": "只把页面 H1 改成商品名，不修改 head 里的 title",
          "feedback": "H1 的变化不会自动证明浏览器标签页的 title 已经按页面更新。",
          "correct": false
        },
        {
          "id": "promise-search-copy",
          "label": "只调整 title 的关键词，保证搜索结果一定原样显示",
          "feedback": "搜索系统可能参考 title，但不保证原样采用；当前页面首先要解决标签页识别问题。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Two product pages share the tab title Product details, so people cannot tell them apart. How should it change?",
      "options": [
        {
          "id": "unique-page-title",
          "label": "Include the matching product name in each page's title and keep the page H1",
          "feedback": "Correct. The title identifies the document in the browser, while the product name distinguishes pages and the H1 keeps its content hierarchy.",
          "correct": true
        },
        {
          "id": "change-only-h1",
          "label": "Change only the page H1 and leave the title in the head unchanged",
          "feedback": "Changing the H1 does not prove that the browser tab title updates per page.",
          "correct": false
        },
        {
          "id": "promise-search-copy",
          "label": "Only tune title keywords and promise that search will always copy them exactly",
          "feedback": "Search systems may use the title but are not required to copy it exactly; first solve page identification in the tab.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "page-metadata",
    "zh": {
      "title": "页面在浏览器标签里标题正常，但分享卡没有图片，应该先修哪里？",
      "options": [
        {
          "id": "inspect-sharing-metadata",
          "label": "检查分享平台读取的元数据，补齐对应的分享图片并用真实预览复测",
          "feedback": "对。不同消费方读取不同字段，标签页正常不能证明分享卡的图片字段存在或可访问。",
          "correct": true
        },
        {
          "id": "rewrite-page-body",
          "label": "重写正文第一段，让分享平台从页面正文里自动找一张图片",
          "feedback": "正文内容不等于分享元数据，不能替代对分享卡输入字段的检查。",
          "correct": false
        },
        {
          "id": "change-favicon",
          "label": "更换 Favicon，因为所有页面图像都由它决定",
          "feedback": "Favicon 主要服务浏览器识别站点，不是分享卡的主图字段。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The browser tab title is correct, but a shared link has no image. Where should you look first?",
      "options": [
        {
          "id": "inspect-sharing-metadata",
          "label": "Inspect metadata read by sharing platforms, add the matching image, and retest with a real preview",
          "feedback": "Correct. Consumers read different fields, so a correct tab title does not prove that the share image exists or is reachable.",
          "correct": true
        },
        {
          "id": "rewrite-page-body",
          "label": "Rewrite the first paragraph so the platform can automatically find an image in the body",
          "feedback": "Page content is not the same as sharing metadata and cannot replace checking the fields that feed the preview card.",
          "correct": false
        },
        {
          "id": "change-favicon",
          "label": "Change the Favicon because every page image comes from it",
          "feedback": "A Favicon mainly identifies the site in browser surfaces; it is not the main image field for a share card.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "favicon",
    "zh": {
      "title": "换了页头 Logo 后，浏览器标签页仍显示旧图标，应该先检查什么？",
      "options": [
        {
          "id": "check-favicon-resource",
          "label": "检查 Favicon 资源和 rel=icon 配置，再清楚说明可能存在的缓存",
          "feedback": "对。页头 Logo 和浏览器 Favicon 是两条使用路径，应检查图标资源、关联配置和浏览器缓存。",
          "correct": true
        },
        {
          "id": "replace-header-logo-again",
          "label": "继续调整 Header 里的 Logo，直到标签页自动变化",
          "feedback": "Header 只负责页面中的品牌入口，不会自动替换浏览器标签页图标。",
          "correct": false
        },
        {
          "id": "change-ui-icon",
          "label": "把工具栏里的功能图标改成新品牌图形",
          "feedback": "界面功能图标服务于操作含义，与浏览器识别站点的 Favicon 不是同一个对象。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "After the header Logo changes, the browser tab still shows the old icon. What should you check first?",
      "options": [
        {
          "id": "check-favicon-resource",
          "label": "Check the Favicon asset and rel=icon configuration, then account for possible caching",
          "feedback": "Correct. The header Logo and browser Favicon are separate paths, so inspect the asset, relation, and browser cache.",
          "correct": true
        },
        {
          "id": "replace-header-logo-again",
          "label": "Keep adjusting the Header Logo until the tab changes by itself",
          "feedback": "The Header owns the brand entry in the page; it does not automatically replace the browser tab icon.",
          "correct": false
        },
        {
          "id": "change-ui-icon",
          "label": "Replace a toolbar action icon with the new brand shape",
          "feedback": "A UI action icon communicates an operation and is separate from the Favicon that identifies the site in the browser.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "open-graph",
    "zh": {
      "title": "文章页的 Hero 图在网页中正常，但分享卡没有图片，应该修什么？",
      "options": [
        {
          "id": "fix-og-image",
          "label": "补或修正 og:image，使用外部可访问的绝对地址，再重新抓取预览",
          "feedback": "对。网页中的 Hero 图和分享卡输入是不同路径，必须检查 og:image 的值与外部可访问性。",
          "correct": true
        },
        {
          "id": "crop-hero-image",
          "label": "继续裁切网页 Hero 图，直到分享平台自动发现它",
          "feedback": "裁切页面图片不会自动写入 Open Graph 元数据，也不能保证外部平台读取到它。",
          "correct": false
        },
        {
          "id": "change-seo-keywords",
          "label": "只增加正文关键词，因为 Open Graph 只负责搜索排名",
          "feedback": "Open Graph 主要描述链接分享预览，不是搜索排名配置；正文关键词不能替代 og:image。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The article Hero image works on the page, but the shared card has no image. What should be fixed?",
      "options": [
        {
          "id": "fix-og-image",
          "label": "Add or fix og:image with an externally reachable absolute URL, then refresh the preview fetch",
          "feedback": "Correct. The page Hero image and share-card input are separate paths, so inspect the og:image value and reachability.",
          "correct": true
        },
        {
          "id": "crop-hero-image",
          "label": "Keep cropping the page Hero image until the sharing platform discovers it automatically",
          "feedback": "Cropping the page image does not write Open Graph metadata or guarantee that the external platform reads it.",
          "correct": false
        },
        {
          "id": "change-seo-keywords",
          "label": "Only add body keywords because Open Graph is for search ranking",
          "feedback": "Open Graph primarily describes shared-link previews, not search ranking; body keywords cannot replace og:image.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "web-app-manifest",
    "zh": {
      "title": "网站安装后总是从错误路径打开，应该先检查什么？",
      "options": [
        {
          "id": "check-start-url",
          "label": "检查 Manifest 的 start_url，并重新安装后验证启动地址",
          "feedback": "对。安装后的默认启动地址由 Manifest 等安装配置决定，不能靠更换 Favicon 修复。",
          "correct": true
        },
        {
          "id": "change-favicon",
          "label": "更换 Favicon，因为浏览器会从它推断启动路径",
          "feedback": "Favicon 负责浏览器站点识别，不负责安装后的默认启动 URL。",
          "correct": false
        },
        {
          "id": "add-service-worker-only",
          "label": "只添加 Service Worker，并假设启动地址会自动变正确",
          "feedback": "Service Worker 与缓存或离线行为有关，不能替代检查 Manifest 的 start_url。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An installed site always opens at the wrong path. What should you check first?",
      "options": [
        {
          "id": "check-start-url",
          "label": "Check the Manifest start_url and verify the launch address after reinstalling",
          "feedback": "Correct. The default installed launch address comes from install configuration such as the Manifest, not from changing the Favicon.",
          "correct": true
        },
        {
          "id": "change-favicon",
          "label": "Change the Favicon because the browser infers the launch path from it",
          "feedback": "A Favicon identifies a site in browser surfaces; it does not define the installed default URL.",
          "correct": false
        },
        {
          "id": "add-service-worker-only",
          "label": "Only add a Service Worker and assume the launch address will become correct",
          "feedback": "A Service Worker relates to caching or offline behavior and cannot replace checking the Manifest start_url.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "undo",
    "zh": {
      "title": "表格里删错了一条报价记录，下面哪个做法找回它最快、最不容易出错？",
      "options": [
        {
          "id": "ctrl-z",
          "label": "立刻按 Ctrl+Z 撤销删除",
          "feedback": "对。撤销把刚发生的一步原样退回，删掉的记录按原来的样子回来——比重打快，也不会引入新错误。",
          "correct": true
        },
        {
          "id": "retype",
          "label": "凭记忆重新新建一条一样的",
          "feedback": "重打是新建一条，金额和日期可能记错；撤销恢复的才是原来那条。",
          "correct": false
        },
        {
          "id": "refresh",
          "label": "刷新页面让删除失效",
          "feedback": "刷新不会撤销操作，反而可能把撤销历史清掉——这一步做完就真的退不回了。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "You deleted the wrong quote row. Which way recovers it fastest and most safely?",
      "options": [
        {
          "id": "ctrl-z",
          "label": "Press Ctrl+Z right away to undo the delete",
          "feedback": "Correct. Undo rolls back the last step exactly as it was—faster than retyping and free of new mistakes.",
          "correct": true
        },
        {
          "id": "retype",
          "label": "Recreate an identical record from memory",
          "feedback": "Retyping creates a new record and risks misremembering; undo restores the original one.",
          "correct": false
        },
        {
          "id": "refresh",
          "label": "Refresh the page to cancel the delete",
          "feedback": "Refreshing does not undo anything and may wipe the undo history—after that there is no way back.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "accessibility",
    "zh": {
      "title": "AI 交付了页面，你想快速验证无障碍的底线。下面哪个组合覆盖了最常见的问题？",
      "options": [
        {
          "id": "three-checks",
          "label": "图片有文字说明、按钮能用 Tab 到达、文字对比度足够",
          "feedback": "对。这三项分别覆盖看不见图的人、不用鼠标的人和看不清字的人——这三项各管一件事，一起查一遍就能挡住最常见的问题。",
          "correct": true
        },
        {
          "id": "only-contrast",
          "label": "对比度查过了，页面应该就没问题了",
          "feedback": "对比度只照顾「看不清」一种情况；不用鼠标的和用读屏的访客照样可能被挡在门外。",
          "correct": false
        },
        {
          "id": "only-desktop",
          "label": "只在自己电脑的 Chrome 里点一遍",
          "feedback": "同一台设备同一浏览器正是「我这里能用」的陷阱；无障碍要换输入方式和场景测。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The AI delivered the page and you want to verify the accessibility floor. Which combination covers the most common problems?",
      "options": [
        {
          "id": "three-checks",
          "label": "Images have text alternatives, buttons reachable by Tab, text contrast sufficient",
          "feedback": "Correct. Each of the three blocks one common barrier, and together they are together they catch the most common problems in one pass.",
          "correct": true
        },
        {
          "id": "only-contrast",
          "label": "Contrast is checked, so the page should be fine",
          "feedback": "Contrast covers only \"hard to see\"; keyboard and screen-reader users may still be locked out.",
          "correct": false
        },
        {
          "id": "only-desktop",
          "label": "Just click through it in Chrome on your own computer",
          "feedback": "Same device, same browser is exactly the \"works for me\" trap; accessibility needs different inputs and contexts.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "button",
    "zh": {
      "title": "设置页里有“保存”“取消修改”“删除账号”和“重设密码”。哪些应该做成按钮？",
      "options": [
        {
          "id": "clear-actions",
          "label": "保存、取消修改、删除用按钮；重设密码用链接",
          "feedback": "对。前三项会直接改变或放弃当前状态，应该触发动作；重设密码会前往另一页，适合用链接。删除还要在执行前确认。",
          "correct": true
        },
        {
          "id": "all-primary",
          "label": "保存和删除用按钮；取消修改和重设密码都用链接",
          "feedback": "“取消修改”会直接放弃当前编辑，也是在执行动作；如果它不是离开页面，就不该用链接表达。",
          "correct": false
        },
        {
          "id": "swap-button-link",
          "label": "四项都做成相同样式的按钮，并排放在一起",
          "feedback": "都使用按钮不代表层级相同。删除账号需要降低视觉优先级并单独确认，不能和保存并列成同一种操作。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An account settings page has save profile, discard edits, delete account, and reset password. What is the clearest arrangement?",
      "options": [
        {
          "id": "clear-actions",
          "label": "Use buttons for save, discard, and delete; keep reset password as a link and confirm deletion",
          "feedback": "Correct. The first three change or discard current state, while reset password navigates to another page. Deletion also needs confirmation.",
          "correct": true
        },
        {
          "id": "all-primary",
          "label": "Make save, discard, delete, and reset password all navigation links",
          "feedback": "Save, discard, and delete act on the current page; links do not express that behavior or handle submission state well.",
          "correct": false
        },
        {
          "id": "swap-button-link",
          "label": "Use one Confirm button for every operation and infer the intent afterward",
          "feedback": "Each action needs an explicit target; destructive account deletion cannot be mixed with routine saving.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "link",
    "zh": {
      "title": "订单号点开后要进入独立详情页，网址可复制，也能用浏览器返回。怎样实现最合适？",
      "options": [
        {
          "id": "real-link",
          "label": "把订单号做成指向详情地址的链接",
          "feedback": "链接会表达明确目的地，同时保留复制地址、浏览器返回和键盘访问能力。",
          "correct": true
        },
        {
          "id": "inline-button",
          "label": "用按钮在当前列表下方展开详情",
          "feedback": "按钮适合执行当前页动作，但展开内容不会形成可复制的独立详情地址。",
          "correct": false
        },
        {
          "id": "clickable-text",
          "label": "给普通文字绑定点击并替换当前内容",
          "feedback": "普通文字缺少链接语义，也容易丢失地址、焦点和浏览器导航能力。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Clicking an order number should open its own detail page with a copyable URL and browser Back support. What fits best?",
      "options": [
        {
          "id": "real-link",
          "label": "Make the order number a link to the detail URL",
          "feedback": "A link provides a real destination plus URL copying, browser history, and keyboard access.",
          "correct": true
        },
        {
          "id": "inline-button",
          "label": "Use a button to expand details below the current list",
          "feedback": "A button can reveal content, but it does not provide the independent, copyable destination requested.",
          "correct": false
        },
        {
          "id": "clickable-text",
          "label": "Attach a click handler to plain text and replace the page content",
          "feedback": "Plain clickable text lacks link semantics and can lose URL, focus, and browser navigation behavior.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "input",
    "zh": {
      "title": "结算页要填写收件人姓名，内容通常很短，也不是从固定名单里选。哪种输入方式最合适？",
      "options": [
        {
          "id": "single-line-input",
          "label": "带常驻“收件人姓名”标签的单行输入框",
          "feedback": "姓名是自由填写的短文本，单行输入框既直接，也能清楚关联字段标签。",
          "correct": true
        },
        {
          "id": "textarea-field",
          "label": "可拉高的多行文本框，方便输入完整信息",
          "feedback": "多行文本框适合评论或描述；用来填姓名会放大控件却没有增加有效能力。",
          "correct": false
        },
        {
          "id": "preset-select",
          "label": "只提供预设姓名的下拉选择器",
          "feedback": "用户需要自由填写姓名，固定选项会阻止名单之外的有效输入。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Checkout needs a recipient name. It is usually short and is not chosen from a fixed list. What should the form use?",
      "options": [
        {
          "id": "single-line-input",
          "label": "A single-line input with a persistent Recipient name label",
          "feedback": "A name is short free-form text, so a labeled single-line input matches both the value and the task.",
          "correct": true
        },
        {
          "id": "textarea-field",
          "label": "A resizable textarea with room for complete information",
          "feedback": "A textarea suits comments or descriptions; its extra height adds no useful capability for a name.",
          "correct": false
        },
        {
          "id": "preset-select",
          "label": "A dropdown containing only a list of preset names",
          "feedback": "The value must be freely entered, so fixed options would block valid names outside the list.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "textarea",
    "zh": {
      "title": "客服表单要让用户描述故障经过，可能会写几段话，还要显示 500 字上限。哪种输入方式更合适？",
      "options": [
        {
          "id": "textarea-counter",
          "label": "使用多行文本框，并在旁边显示剩余字数",
          "feedback": "故障描述是较长的自由文本，多行空间和可见字数限制都直接服务这项任务。",
          "correct": true
        },
        {
          "id": "growing-input",
          "label": "使用单行输入框，内容过长时左右滚动",
          "feedback": "单行输入框会隐藏上下文，让用户难以检查和修改多段描述。",
          "correct": false
        },
        {
          "id": "rich-editor",
          "label": "使用带图片、字号和排版工具的富文本编辑器",
          "feedback": "题目只需要纯文本描述，完整富文本工具会增加无关操作和界面负担。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A support form asks people to describe a failure in several paragraphs with a 500-character limit. How should it work?",
      "options": [
        {
          "id": "textarea-counter",
          "label": "Use a textarea and show the remaining character count nearby",
          "feedback": "The task needs longer free-form text, so multiline space and a visible limit directly support it.",
          "correct": true
        },
        {
          "id": "growing-input",
          "label": "Use a single-line input that scrolls sideways as text grows",
          "feedback": "A single line hides context and makes several paragraphs difficult to review and edit.",
          "correct": false
        },
        {
          "id": "rich-editor",
          "label": "Use a rich editor with images, font sizes, and layout controls",
          "feedback": "The task only needs plain text, so rich formatting tools add unrelated choices and interface weight.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "input-number",
    "zh": {
      "title": "购物车数量必须是 1–20 的整数，用户常用加减调整，但实际库存可能随时变化。怎样实现更完整？",
      "options": [
        {
          "id": "number-and-business-check",
          "label": "提供可输入和步进的数字控件，限制范围，并在提交时再校验库存",
          "feedback": "控件负责数值格式和基本范围，提交校验负责判断当时是否还有足够库存。",
          "correct": true
        },
        {
          "id": "slider-for-quantity",
          "label": "使用带 20 个刻度的滑块，让用户拖到需要购买的数量",
          "feedback": "滑块适合近似或连续调节，精确选择购物数量时输入和加减通常更直接。",
          "correct": false
        },
        {
          "id": "range-only-check",
          "label": "把最大值设置为 20，只要控件没有超出范围就直接创建订单",
          "feedback": "1–20 只是允许填写的范围，并不能证明提交时仍有对应库存，订单仍可能超卖。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Cart quantity must be an integer from 1 to 20 and users often adjust it by one, but live stock can change. What is the complete approach?",
      "options": [
        {
          "id": "number-and-business-check",
          "label": "Allow typing and step controls, constrain the range, and verify stock again on submit",
          "feedback": "The control handles numeric format and basic range, while submission checks whether enough stock exists at that moment.",
          "correct": true
        },
        {
          "id": "slider-for-quantity",
          "label": "Use a slider with 20 marks and let users drag to the quantity they want",
          "feedback": "Sliders fit approximate or continuous adjustment. Typing and step buttons are clearer for exact purchase quantities.",
          "correct": false
        },
        {
          "id": "range-only-check",
          "label": "Set the maximum to 20 and create the order whenever the control stays in range",
          "feedback": "The allowed input range does not prove that the requested stock still exists when the order is submitted.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "radio",
    "zh": {
      "title": "预约取货时有 4 个时间段，只能选一个，并希望用户一眼看全后比较。怎样展示这些选项最合适？",
      "options": [
        {
          "id": "radio-group",
          "label": "并排展示一组单选项，选新项会取消旧项",
          "feedback": "少量互斥选项适合直接展示为单选组，用户能同时比较所有时间段。",
          "correct": true
        },
        {
          "id": "checkbox-group",
          "label": "展示一组复选项，提交时再检查是否只选一个",
          "feedback": "复选项表达可以多选，等提交时才纠错会让控件语义和真实规则冲突。",
          "correct": false
        },
        {
          "id": "compact-select",
          "label": "收进下拉选择器，每次展开后查看一个列表",
          "feedback": "下拉可以节省空间，但题目强调少量选项要一眼看全并直接比较。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Pickup offers four time slots. People must choose one and should compare every option at a glance. What fits best?",
      "options": [
        {
          "id": "radio-group",
          "label": "Show a radio group where a new choice clears the previous one",
          "feedback": "A small mutually exclusive set fits a visible radio group, letting people compare every slot.",
          "correct": true
        },
        {
          "id": "checkbox-group",
          "label": "Show checkboxes and reject multiple choices only on submit",
          "feedback": "Checkboxes communicate multiple selection, so their meaning would conflict with the actual rule.",
          "correct": false
        },
        {
          "id": "compact-select",
          "label": "Put the slots in a dropdown that opens into a list",
          "feedback": "A dropdown saves space, but it works against the stated need to see and compare all four options.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "checkbox",
    "zh": {
      "title": "订阅表单允许用户选择邮件、短信和应用通知，可以选多个，也可以一个不选，提交后才生效。怎样设计？",
      "options": [
        {
          "id": "checkbox-list",
          "label": "每个通知渠道放一个独立复选框",
          "feedback": "三个渠道彼此独立，复选框能准确表达可选一个、多个或完全不选。",
          "correct": true
        },
        {
          "id": "radio-list",
          "label": "把三个渠道放进同一个单选组",
          "feedback": "单选组只允许保留一个选项，会错误限制用户同时订阅多个渠道。",
          "correct": false
        },
        {
          "id": "instant-switches",
          "label": "放三个立即生效的开关，再保留提交按钮",
          "feedback": "开关通常表示操作后立即改变状态，与题目中统一提交后生效的流程不一致。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A subscription form offers email, SMS, and app notifications. People may choose several or none, and changes apply on submit. What fits?",
      "options": [
        {
          "id": "checkbox-list",
          "label": "Give each notification channel its own checkbox",
          "feedback": "The channels are independent, and checkboxes express choosing one, several, or none accurately.",
          "correct": true
        },
        {
          "id": "radio-list",
          "label": "Put all three channels in one radio group",
          "feedback": "A radio group keeps only one choice, incorrectly preventing people from selecting several channels.",
          "correct": false
        },
        {
          "id": "instant-switches",
          "label": "Use three immediate switches and still keep a Submit button",
          "feedback": "Switches normally signal immediate change, which conflicts with the form's apply-on-submit behavior.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "switch",
    "zh": {
      "title": "设置页有“新消息声音”，用户切换后应立刻开启或关闭，不需要再点保存。应该用什么？",
      "options": [
        {
          "id": "instant-switch",
          "label": "使用开关，并让状态在切换后立即生效",
          "feedback": "这是一个明确的开关状态，而且操作后立即生效，符合开关的行为预期。",
          "correct": true
        },
        {
          "id": "saved-checkbox",
          "label": "使用复选框，修改后统一点击保存设置",
          "feedback": "复选框配合提交可以成立，但不符合题目要求的即时反馈和即时生效。",
          "correct": false
        },
        {
          "id": "toggle-button",
          "label": "使用“开启声音”按钮，点击后把按钮隐藏",
          "feedback": "一次性按钮不能持续显示当前是开还是关，也难以让用户随时反向切换。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Settings includes New message sounds. Toggling it should take effect immediately with no Save step. What should it use?",
      "options": [
        {
          "id": "instant-switch",
          "label": "Use a switch and apply its state immediately after toggling",
          "feedback": "This is a persistent on-off setting with an immediate effect, which matches switch behavior.",
          "correct": true
        },
        {
          "id": "saved-checkbox",
          "label": "Use a checkbox and apply all setting changes with Save",
          "feedback": "A submitted checkbox can work elsewhere, but it does not meet the requested immediate behavior.",
          "correct": false
        },
        {
          "id": "toggle-button",
          "label": "Use an Enable sounds button and hide it after clicking",
          "feedback": "A one-time button does not keep the current state visible or make reversing the choice clear.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "slider",
    "zh": {
      "title": "播放器音量需要从 0 到 100 连续调整，拖动时立即听到变化，键盘用户也要能操作。怎样设计？",
      "options": [
        {
          "id": "accessible-live-slider",
          "label": "使用显示当前值的滑块，拖动时预览，并支持方向键调整",
          "feedback": "音量是连续范围；当前值、实时反馈和键盘操作共同覆盖了判断与操作需要。",
          "correct": true
        },
        {
          "id": "number-field-only",
          "label": "只放一个数字输入框，输入完成并失去焦点后才更新音量",
          "feedback": "数字输入能精确填写，却削弱了连续调节和即时试听，不能满足当前任务的主要操作方式。",
          "correct": false
        },
        {
          "id": "hundred-option-select",
          "label": "把 0 到 100 的每个整数放进下拉选择，选中后更新音量",
          "feedback": "大量固定选项会增加查找成本，也无法提供拖动过程中的连续反馈。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Player volume runs continuously from 0 to 100, must update while dragging, and must work from a keyboard. How should it be designed?",
      "options": [
        {
          "id": "accessible-live-slider",
          "label": "Use a slider that shows its value, previews changes live, and responds to arrow keys",
          "feedback": "Volume is a continuous range. A visible value, live feedback, and keyboard controls cover both understanding and operation.",
          "correct": true
        },
        {
          "id": "number-field-only",
          "label": "Provide only a number field and update volume after entry loses focus",
          "feedback": "A number field supports precision but removes the continuous adjustment and immediate listening required here.",
          "correct": false
        },
        {
          "id": "hundred-option-select",
          "label": "Put every integer from 0 to 100 in a dropdown and update after selection",
          "feedback": "A long fixed list increases search effort and cannot provide feedback throughout a continuous drag.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "rate",
    "zh": {
      "title": "订单完成后要收集 1–5 分的满意程度，用户还要看懂自己当前选了几分。怎样设计？",
      "options": [
        {
          "id": "ordered-rate-with-text",
          "label": "使用五级评分控件，并同步显示“已选 4 分”等可读文字",
          "feedback": "评分控件表达有顺序的等级，文字分值让当前选择不只依赖星星数量或颜色。",
          "correct": true
        },
        {
          "id": "binary-like-buttons",
          "label": "改成“满意”和“不满意”两个按钮，省去中间等级",
          "feedback": "二选一只能收集正负态度，无法保留当前任务要求的五级满意程度。",
          "correct": false
        },
        {
          "id": "free-number-input",
          "label": "提供普通数字输入框，允许填写 1–5 之间的任意小数",
          "feedback": "自由数字会超出评价规则，也缺少评分控件提供的固定等级和直观反馈。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "After an order, the product collects satisfaction from 1 to 5 and users must understand their current selection. How should it work?",
      "options": [
        {
          "id": "ordered-rate-with-text",
          "label": "Use a five-level rating control and also show readable text such as Selected 4 of 5",
          "feedback": "The control expresses ordered levels, while text makes the current value available without relying only on stars or color.",
          "correct": true
        },
        {
          "id": "binary-like-buttons",
          "label": "Replace it with Satisfied and Dissatisfied buttons and remove the middle levels",
          "feedback": "A binary choice captures positive or negative sentiment but loses the five degrees required by this task.",
          "correct": false
        },
        {
          "id": "free-number-input",
          "label": "Use a regular number field and allow any decimal value from 1 to 5",
          "feedback": "Free numbers can exceed the rating rules and do not provide the fixed levels and immediate feedback of a rating control.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "select",
    "zh": {
      "title": "用户需要从 4 个固定时区中选择一个。哪种选择方式最合适？",
      "options": [
        {
          "id": "select",
          "label": "放进下拉选择框，并显示当前选中的时区",
          "feedback": "对。固定选项里只选一个时，选择器能节省空间并清楚表达当前值。",
          "correct": true
        },
        {
          "id": "free-text",
          "label": "使用带格式提示的输入框，让用户填写 UTC+8 之类的值",
          "feedback": "自由文本容易产生无效或不一致的值。",
          "correct": false
        },
        {
          "id": "four-buttons",
          "label": "使用可搜索的下拉框，并允许创建列表外的新时区",
          "feedback": "只有四个固定值时，不需要搜索和创建新值；额外能力会让用户误以为可以保存系统不支持的时区。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A form lets people choose one of four fixed, exclusive time zones. Which control fits?",
      "options": [
        {
          "id": "select",
          "label": "Use a Select and show the current time zone",
          "feedback": "Correct. A selector saves space and clearly represents the current value for one option from a fixed set.",
          "correct": true
        },
        {
          "id": "free-text",
          "label": "Use unrestricted text so people type a time zone",
          "feedback": "Free text easily creates invalid or inconsistent values.",
          "correct": false
        },
        {
          "id": "four-buttons",
          "label": "Make the four peer values submit buttons",
          "feedback": "These are mutually exclusive values for one field, not four immediate actions.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "auto-complete",
    "zh": {
      "title": "公司有几千名员工。邀请“王小明”时，怎样帮助用户找对人？",
      "options": [
        {
          "id": "autocomplete",
          "label": "输入名字后显示匹配的人，选中一位再邀请",
          "feedback": "对。候选集很大且已有规范数据时，自动完成能帮助搜索并避免拼错。",
          "correct": true
        },
        {
          "id": "long-select",
          "label": "打开普通下拉框，再按姓名首字母缩小几千人的列表",
          "feedback": "大量选项难以浏览，也不适合按名字快速缩小范围。",
          "correct": false
        },
        {
          "id": "new-text",
          "label": "输入完整姓名后，直接邀请搜索结果里的第一位同名员工",
          "feedback": "同名员工可能不止一位。系统应展示部门、邮箱等可区分信息，让用户明确选中目标，而不是替用户猜。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "To invite Wang Xiaoming among thousands of employees, which interaction fits?",
      "options": [
        {
          "id": "autocomplete",
          "label": "Offer matching suggestions after typing, then select an existing employee",
          "feedback": "Correct. With a large, standardized candidate set, autocomplete supports search and avoids misspelling.",
          "correct": true
        },
        {
          "id": "long-select",
          "label": "Put every employee in one long Select",
          "feedback": "Large option sets are hard to browse and not fast to narrow by name.",
          "correct": false
        },
        {
          "id": "new-text",
          "label": "Accept arbitrary text and create a new employee with that name",
          "feedback": "The invitee must match an existing account; arbitrary creation makes duplicates or wrong targets.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "cascader",
    "zh": {
      "title": "收货地址必须从省、市、区中选择一个最终地区，并让用户确认整条路径。哪种方案更合适？",
      "options": [
        {
          "id": "single-path-cascader",
          "label": "使用级联选择器逐级选择一条路径，关闭后显示完整路径，提交末级地区 ID",
          "feedback": "对。任务只需要一条父子路径，级联选择能保留选择顺序和最终结果。",
          "correct": true
        },
        {
          "id": "multi-branch-tree",
          "label": "使用多选树，同时勾选多个省市区，并把父级半选状态作为地址结果",
          "feedback": "多选树适合跨分支选择多个范围，不适合只能提交一个最终收货地区的任务。",
          "correct": false
        },
        {
          "id": "three-independent-selects",
          "label": "使用三个互不关联的下拉框，让用户自由组合任意省、市和区",
          "feedback": "三个独立选项无法保证父子关系正确，可能提交并不存在的省市区组合。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A shipping address must choose one final region through state, city, and district and let the user confirm the full path. Which approach fits?",
      "options": [
        {
          "id": "single-path-cascader",
          "label": "Use a cascader to choose one path level by level, show the full path afterward, and submit the leaf-region ID",
          "feedback": "Correct. The task needs one parent-child path, and a cascader preserves both the sequence and final result.",
          "correct": true
        },
        {
          "id": "multi-branch-tree",
          "label": "Use a multi-select tree, choose several states and cities, and treat a partial parent as the address result",
          "feedback": "A multi-select tree fits several scopes across branches, not one final shipping region.",
          "correct": false
        },
        {
          "id": "three-independent-selects",
          "label": "Use three unrelated dropdowns and let people combine any state, city, and district",
          "feedback": "Independent choices cannot preserve the hierarchy and may submit a region combination that does not exist.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "tree-select",
    "zh": {
      "title": "权限范围需要跨不同部门勾选多个小组，并显示父级半选状态。哪种控件更合适？",
      "options": [
        {
          "id": "multi-tree-select",
          "label": "使用多选树选择器，明确父子联动规则，并让标签、半选状态和提交节点保持一致",
          "feedback": "对。任务需要看见层级并跨分支多选，树选择器能同时表达父子关系和选择状态。",
          "correct": true
        },
        {
          "id": "single-cascader-path",
          "label": "使用级联选择器，每次只保留从公司到一个小组的一条路径",
          "feedback": "级联选择适合一条路径，无法同时保留多个部门下的小组范围。",
          "correct": false
        },
        {
          "id": "flat-options",
          "label": "把所有小组放进一个无层级的普通下拉框，父级范围由后端自行猜测",
          "feedback": "扁平列表隐藏了部门关系，后端也不能从未表达的选择规则中可靠推断父级范围。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An access scope must select several groups across departments and show partially selected parents. Which control fits?",
      "options": [
        {
          "id": "multi-tree-select",
          "label": "Use a multi-select tree, define parent-child selection rules, and keep labels, partial states, and submitted nodes consistent",
          "feedback": "Correct. The task needs visible hierarchy and cross-branch selection, which a tree selector can express together.",
          "correct": true
        },
        {
          "id": "single-cascader-path",
          "label": "Use a cascader that keeps only one path from the company to a single group",
          "feedback": "A cascader fits one path and cannot preserve groups selected under several departments.",
          "correct": false
        },
        {
          "id": "flat-options",
          "label": "Put every group in one flat dropdown and let the backend infer parent scopes",
          "feedback": "A flat list hides department relationships, and the backend cannot reliably infer rules the interface never expressed.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "date-picker",
    "zh": {
      "title": "酒店预订要选择入住和离店日期，已满日期不能选，离店还必须晚于入住。怎样组织输入？",
      "options": [
        {
          "id": "constrained-date-range",
          "label": "使用日期区间选择器，禁用不可订日期，并即时检查起止顺序",
          "feedback": "同一个区间控件能统一格式、显示可选范围，并在选择过程中维护两个日期的关系。",
          "correct": true
        },
        {
          "id": "two-free-text-fields",
          "label": "提供两个自由文本框，提交后再判断日期格式和先后关系",
          "feedback": "自由文本会引入格式歧义，用户也会在完成提交前看不到哪些日期不可订。",
          "correct": false
        },
        {
          "id": "independent-calendars",
          "label": "提供两个互不关联的日历，只分别检查每个日期是否可订",
          "feedback": "单个日期都可订不代表区间有效；若不联动检查，离店可能早于入住。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A hotel booking needs check-in and check-out dates. Sold-out dates are unavailable and check-out must be later. How should input work?",
      "options": [
        {
          "id": "constrained-date-range",
          "label": "Use a date-range picker, disable unavailable dates, and validate the order as users select",
          "feedback": "One range control keeps the format consistent, exposes availability, and maintains the relationship between both dates.",
          "correct": true
        },
        {
          "id": "two-free-text-fields",
          "label": "Use two free-text fields and validate formats and order only after submission",
          "feedback": "Free text introduces format ambiguity and hides unavailable dates until after the user finishes the form.",
          "correct": false
        },
        {
          "id": "independent-calendars",
          "label": "Use two unrelated calendars and only check whether each date is available",
          "feedback": "Two individually available dates do not guarantee a valid range; check-out could still precede check-in.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "time-picker",
    "zh": {
      "title": "用户要预约纽约团队的会议，时段按 30 分钟开放，部分时间已满。怎样让时间选择不产生歧义？",
      "options": [
        {
          "id": "structured-zoned-slots",
          "label": "提供半小时步长的时间选择器，禁用已满时段，并明确显示纽约时区",
          "feedback": "结构化时段控制格式和可用范围，时区说明让不同地区用户理解选择对应的真实时刻。",
          "correct": true
        },
        {
          "id": "free-language-time",
          "label": "提供文本框，让用户输入“明早”或“下午三点左右”",
          "feedback": "自然语言无法稳定对应半小时预约位，不同地区对“明早”的理解也可能不同。",
          "correct": false
        },
        {
          "id": "local-time-without-zone",
          "label": "只显示 09:00、09:30 等时间，不说明它属于哪个地区",
          "feedback": "选项看似精确，但跨地区用户可能按自己的本地时间理解，最终预约到错误时刻。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A user books a meeting with a New York team. Slots are every 30 minutes and some are full. How can time selection avoid ambiguity?",
      "options": [
        {
          "id": "structured-zoned-slots",
          "label": "Use a 30-minute time picker, disable full slots, and explicitly show the New York time zone",
          "feedback": "Structured slots control format and availability, while the zone tells users in other regions what instant they selected.",
          "correct": true
        },
        {
          "id": "free-language-time",
          "label": "Use a text field and accept phrases such as tomorrow morning or around three",
          "feedback": "Natural language cannot map reliably to 30-minute inventory, and tomorrow morning differs across regions.",
          "correct": false
        },
        {
          "id": "local-time-without-zone",
          "label": "Show 09:00 and 09:30 options without saying which region they belong to",
          "feedback": "The values look precise, but remote users may interpret them in their own local time and book the wrong instant.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "upload",
    "zh": {
      "title": "用户要上传最大 20 MB 的头像，网络中断后还要能重试。哪套方案更完整？",
      "options": [
        {
          "id": "browser-check-only",
          "label": "浏览器检查格式后直接当作安全文件保存",
          "feedback": "浏览器检查能提前反馈，但请求可以被绕过；服务器仍要检查文件类型、大小和权限。",
          "correct": false
        },
        {
          "id": "limits-progress-retry",
          "label": "选择前说明限制，上传时显示进度，失败后可重试",
          "feedback": "用户能提前判断文件是否合适，并看见传输状态；服务器还可以在保存前再次校验。",
          "correct": true
        },
        {
          "id": "check-after-transfer",
          "label": "先接收所有文件，传完以后再提示大小不符合",
          "feedback": "最终校验仍需要，但已知限制应提前说明；传完才拒绝会浪费时间和流量。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "People can upload avatars up to 20 MB, and a network interruption must be recoverable. Which flow is most complete?",
      "options": [
        {
          "id": "browser-check-only",
          "label": "Check the format in the browser and then treat the file as safe",
          "feedback": "Browser checks improve feedback but can be bypassed. The server must still verify type, size, and permission.",
          "correct": false
        },
        {
          "id": "limits-progress-retry",
          "label": "Explain limits before selection, show progress, and allow retry after failure",
          "feedback": "People can choose an eligible file, see the transfer state, and recover from failure while the server validates it again.",
          "correct": true
        },
        {
          "id": "check-after-transfer",
          "label": "Accept every file first and report an invalid size only after transfer",
          "feedback": "Final server validation is still required, but known limits should be visible before a long transfer begins.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "form",
    "zh": {
      "title": "注册页要收集邮箱、验证码和密码，并一次创建账号。怎样组织这个表单更合适？",
      "options": [
        {
          "id": "save-each-field",
          "label": "每个输入框旁放一个保存按钮，三个字段分别提交",
          "feedback": "三个字段共同完成注册，分开提交会产生不完整状态，用户也无法确认账号何时真正创建。",
          "correct": false
        },
        {
          "id": "submit-one-task",
          "label": "把字段放进一个表单，就近提示错误，并统一提交",
          "feedback": "这些字段属于同一项注册任务；统一提交能一起校验，并明确显示创建成功或失败。",
          "correct": true
        },
        {
          "id": "show-summary-only",
          "label": "统一提交，但只在页面顶部显示“信息有误”",
          "feedback": "统一提交是对的，但笼统提示没有指出哪个字段需要修改，用户仍要逐项猜测。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A sign-up page collects an email, verification code, and password to create one account. How should the form be organized?",
      "options": [
        {
          "id": "save-each-field",
          "label": "Put a Save button beside each field and submit all three separately",
          "feedback": "The fields belong to one sign-up task. Separate submissions create incomplete states and make it unclear when the account exists.",
          "correct": false
        },
        {
          "id": "submit-one-task",
          "label": "Group the fields in one form, show errors nearby, and submit them together",
          "feedback": "The fields complete one task, so one submission can validate them together and report whether account creation succeeded.",
          "correct": true
        },
        {
          "id": "show-summary-only",
          "label": "Submit them together but only show an 'Invalid information' message at the top",
          "feedback": "One submission is appropriate, but a generic message does not identify which field needs correction.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "color-picker",
    "zh": {
      "title": "主题设置允许用户自由选择品牌主色，还要能把准确颜色交给同事，并保证按钮文字可读。怎样设计？",
      "options": [
        {
          "id": "picker-value-contrast",
          "label": "同时提供色盘、可复制色值和实时预览，并检查文字对比度",
          "feedback": "色盘用于探索，精确色值用于复现，对比度检查则确保选择后的界面仍能阅读。",
          "correct": true
        },
        {
          "id": "swatch-only",
          "label": "只显示一块当前颜色，不展示任何色值或输入方式",
          "feedback": "用户能看到结果，却无法精确修改、复制或向他人复现同一个颜色。",
          "correct": false
        },
        {
          "id": "unrestricted-visual-choice",
          "label": "接受色盘中的任意颜色，只要用户觉得好看就直接应用",
          "feedback": "视觉偏好不能保证文字与背景可读，过浅或过近的颜色可能让关键按钮失去对比。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Theme settings allow a freely chosen brand color that must be shared precisely and keep button text readable. How should this work?",
      "options": [
        {
          "id": "picker-value-contrast",
          "label": "Provide a color field, copyable value, live preview, and text-contrast check together",
          "feedback": "The field supports exploration, the exact value supports reproduction, and contrast validation preserves readability.",
          "correct": true
        },
        {
          "id": "swatch-only",
          "label": "Show only one current-color swatch with no value or input method",
          "feedback": "Users can see the result but cannot adjust it precisely, copy it, or reproduce the same color elsewhere.",
          "correct": false
        },
        {
          "id": "unrestricted-visual-choice",
          "label": "Accept any color from the field and apply it whenever it looks good to the user",
          "feedback": "Visual preference does not guarantee readable foreground contrast, so pale or similar colors may hide key actions.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "label",
    "zh": {
      "title": "注册表单只用“请输入内容”作占位文字，用户输入后就分不清邮箱和用户名。应该怎样修改？",
      "options": [
        {
          "id": "persistent-associated-labels",
          "label": "为每个输入框保留可见标签，并让点击标签聚焦对应字段",
          "feedback": "可见且关联的标签会在输入前后持续说明字段用途，也扩大了聚焦控件的入口。",
          "correct": true
        },
        {
          "id": "specific-placeholders",
          "label": "把占位文字改成“邮箱”和“用户名”，继续在输入后隐藏",
          "feedback": "文案更具体仍未解决输入后消失的问题，用户检查已填内容时依然缺少字段名称。",
          "correct": false
        },
        {
          "id": "icon-tooltips",
          "label": "在输入框前放邮箱和用户图标，悬停时显示字段说明",
          "feedback": "图标可能有歧义，悬停说明在触屏和键盘场景也不稳定，不能替代持续可见的标签。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A registration form only uses Enter a value as placeholder text, so users cannot tell email from username after typing. What should change?",
      "options": [
        {
          "id": "persistent-associated-labels",
          "label": "Keep a visible label for each field and make label clicks focus the associated input",
          "feedback": "A visible, associated label explains the field before and after entry and provides another way to focus it.",
          "correct": true
        },
        {
          "id": "specific-placeholders",
          "label": "Change the placeholders to Email and Username but still hide them after entry",
          "feedback": "More specific placeholders still disappear, leaving users without field names when reviewing completed values.",
          "correct": false
        },
        {
          "id": "icon-tooltips",
          "label": "Add mail and user icons and reveal each field description on hover",
          "feedback": "Icons can be ambiguous and hover explanations are unreliable on touch and keyboard, so they cannot replace labels.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "placeholder",
    "zh": {
      "title": "用户开始在输入框里打字，下面哪个会消失？",
      "options": [
        {
          "id": "placeholder-gone",
          "label": "框里的灰色示例文字",
          "feedback": "对。占位文字只是开场的示范，输入一开始就让位。所以它不能代替标签——不然输入之后用户就不知道框里该是什么了。",
          "correct": true
        },
        {
          "id": "label-gone",
          "label": "输入框旁边的「邮箱」标签",
          "feedback": "标签一直显示在框旁边，不随输入消失——这正是它和占位文字的分工。",
          "correct": false
        },
        {
          "id": "nothing-gone",
          "label": "两个都不消失",
          "feedback": "占位文字会在输入开始时消失；如果它没消失，反而是实现有问题的信号。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "When the user starts typing, which of these disappears?",
      "options": [
        {
          "id": "placeholder-gone",
          "label": "The gray example text inside the box",
          "feedback": "Correct. The placeholder yields the moment typing starts—which is why it cannot replace the label.",
          "correct": true
        },
        {
          "id": "label-gone",
          "label": "The \"Email\" label beside the box",
          "feedback": "The label stays beside the box through typing—that is exactly its job.",
          "correct": false
        },
        {
          "id": "nothing-gone",
          "label": "Neither disappears",
          "feedback": "The placeholder does disappear once typing begins; if it stays, the implementation is off.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "table",
    "zh": {
      "title": "客服要比较 50 笔订单的编号、金额、状态和下单时间。哪种展示最合适？",
      "options": [
        {
          "id": "order-cards",
          "label": "每笔订单做成一张卡片，把四个字段上下排列",
          "feedback": "卡片适合浏览单条丰富内容，但字段上下分散后，很难沿同一列快速比较订单。",
          "correct": false
        },
        {
          "id": "comparison-table",
          "label": "一行一笔订单，四个字段按固定列对齐",
          "feedback": "记录结构相同，而且任务是跨记录比较；固定列能让金额、状态和时间快速对齐。",
          "correct": true
        },
        {
          "id": "detail-description",
          "label": "一次只展示一笔订单，用字段名和内容列出详情",
          "feedback": "描述列表适合阅读一条记录；逐笔切换会失去同时比较 50 笔订单的能力。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Support staff need to compare the ID, amount, status, and date of 50 orders. Which presentation fits best?",
      "options": [
        {
          "id": "order-cards",
          "label": "Use one card per order and stack the four fields vertically",
          "feedback": "Cards help browse rich individual items, but vertically scattered fields make cross-order comparison slow.",
          "correct": false
        },
        {
          "id": "comparison-table",
          "label": "Use one order per row and align the four fields in fixed columns",
          "feedback": "Every record shares the same fields, and fixed columns make amounts, statuses, and dates easy to compare.",
          "correct": true
        },
        {
          "id": "detail-description",
          "label": "Show one order at a time as a list of field names and values",
          "feedback": "A description list is useful for one record, but switching records removes the side-by-side comparison the task needs.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "list",
    "zh": {
      "title": "通知中心要按时间展示几十条消息，每条只有标题、摘要、时间和一个查看入口，不需要逐列比较。怎样组织？",
      "options": [
        {
          "id": "scannable-list",
          "label": "使用纵向列表，让每条消息保持相同结构并按时间排列",
          "feedback": "这些记录结构一致、以顺序浏览为主，列表能让用户连续扫读并进入单条详情。",
          "correct": true
        },
        {
          "id": "comparison-table",
          "label": "使用四列表格，把标题、摘要、时间和操作分别对齐",
          "feedback": "表格更适合跨行比较固定字段；摘要长短不一时拆列会压缩内容并增加横向阅读。",
          "correct": false
        },
        {
          "id": "visual-card-grid",
          "label": "使用多列卡片网格，为每条通知增加封面图和大号图标",
          "feedback": "通知的主体不是图片，多列卡片会打断时间顺序，还引入当前任务不需要的视觉信息。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A notification center shows dozens of messages by time. Each has a title, summary, timestamp, and View action, with no need for column comparison. How should it be organized?",
      "options": [
        {
          "id": "scannable-list",
          "label": "Use a vertical list with a consistent message structure ordered by time",
          "feedback": "The records share a structure and are read in sequence, so a list supports scanning and opening individual details.",
          "correct": true
        },
        {
          "id": "comparison-table",
          "label": "Use four table columns for title, summary, time, and action",
          "feedback": "Tables suit comparison across fixed fields. Variable summaries become compressed and force horizontal reading.",
          "correct": false
        },
        {
          "id": "visual-card-grid",
          "label": "Use a multi-column card grid and add a cover image and large icon to every message",
          "feedback": "Images are not the main content here. A grid interrupts chronological reading and adds irrelevant visual information.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "card",
    "zh": {
      "title": "模板市场要以网格展示模板，每项都有封面、名称、作者和价格，点击后进入模板详情页。怎样组织这些内容？",
      "options": [
        {
          "id": "item-cards",
          "label": "每个模板做成一张信息边界清楚的卡片",
          "feedback": "每个模板都是可独立浏览和进入详情的对象，卡片能把它的关键信息组合在一起。",
          "correct": true
        },
        {
          "id": "single-panel",
          "label": "把所有模板放进一张覆盖整页的大卡片",
          "feedback": "一张大容器无法表达每个模板的独立边界，也会让点击目标和信息归属变模糊。",
          "correct": false
        },
        {
          "id": "dense-table",
          "label": "使用只有文字列的紧凑数据表格",
          "feedback": "数据表适合密集比较字段，但题目要求突出封面并以视觉方式浏览模板。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A template marketplace shows a grid where each item has a cover, name, author, price, and its own detail page. How should it be organized?",
      "options": [
        {
          "id": "item-cards",
          "label": "Give each template its own card with a clear information boundary",
          "feedback": "Each template is an independent browsable object, so a card can group its key information and destination.",
          "correct": true
        },
        {
          "id": "single-panel",
          "label": "Put every template inside one large card covering the page",
          "feedback": "One large container hides item boundaries and makes click targets and information ownership unclear.",
          "correct": false
        },
        {
          "id": "dense-table",
          "label": "Use a compact text-only data table for all templates",
          "feedback": "A table suits dense field comparison, but the task calls for visual browsing led by template covers.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "tag",
    "zh": {
      "title": "订单列表要显示“已付款”等状态，筛选区还要展示当前选择的“北京”和“本月”。怎样使用标签更清楚？",
      "options": [
        {
          "id": "status-and-filter-tags",
          "label": "状态标签只负责标记，已选筛选标签提供明确的移除入口",
          "feedback": "两者都用短文字帮助扫读，但只有可取消的筛选条件需要关闭操作，状态本身不是按钮。",
          "correct": true
        },
        {
          "id": "all-tags-buttons",
          "label": "把状态和筛选标签都做成按钮，点击任意标签都切换订单状态",
          "feedback": "状态标签描述现有结果，不应暗示用户能直接改动；把标记和操作混在一起会造成误触。",
          "correct": false
        },
        {
          "id": "count-badges",
          "label": "把状态和筛选条件都改成彩色圆点，只在旁边显示匹配数量",
          "feedback": "数量徽标不能代替“已付款”“北京”等具体含义，颜色和圆点也不足以让用户识别条件。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An order list shows statuses such as Paid, while the filter area shows active choices Beijing and This month. How should tags work?",
      "options": [
        {
          "id": "status-and-filter-tags",
          "label": "Keep status tags informational and give selected filter tags an explicit remove action",
          "feedback": "Both use short text for scanning, but only removable filter conditions need a close action. Status is not a button.",
          "correct": true
        },
        {
          "id": "all-tags-buttons",
          "label": "Make every status and filter tag a button that changes order status when clicked",
          "feedback": "A status tag describes an existing result and should not imply direct editing. Mixing labels and actions invites mistakes.",
          "correct": false
        },
        {
          "id": "count-badges",
          "label": "Replace every status and filter with colored dots and only show the matching count",
          "feedback": "Counts cannot replace meanings such as Paid or Beijing, and color dots alone do not identify the active condition.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "badge",
    "zh": {
      "title": "顶部消息入口有 3 条未读消息，既要节省空间，也要让读屏用户知道完整状态。怎样呈现？",
      "options": [
        {
          "id": "attached-accessible-badge",
          "label": "在消息入口旁附加数字徽标，并提供“3 条未读消息”的可访问说明",
          "feedback": "徽标补充入口的数量状态，可访问说明则让不依赖视觉的人获得同样信息。",
          "correct": true
        },
        {
          "id": "standalone-statistic",
          "label": "在导航栏中加入一张统计卡，显示“未读消息总数：3”",
          "feedback": "统计卡会占用远多于状态提示所需的空间，也割裂了数量与消息入口的关系。",
          "correct": false
        },
        {
          "id": "color-dot-only",
          "label": "只在消息图标右上角放一个红点，不提供数字或文字",
          "feedback": "红点能提示发生了变化，却不能表达数量，依赖颜色的用户也可能无法获得完整状态。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The top message entry has three unread messages. It must stay compact and expose the full state to screen-reader users. How should it appear?",
      "options": [
        {
          "id": "attached-accessible-badge",
          "label": "Attach a numeric badge to the message entry and expose 3 unread messages accessibly",
          "feedback": "The badge supplements the entry with a compact count, while the accessible description provides the same information nonvisually.",
          "correct": true
        },
        {
          "id": "standalone-statistic",
          "label": "Add a navigation statistic card that reads Total unread messages: 3",
          "feedback": "A statistic card consumes much more space than this status needs and separates the count from the message entry.",
          "correct": false
        },
        {
          "id": "color-dot-only",
          "label": "Show only a red dot on the message icon with no number or text",
          "feedback": "A dot signals change but cannot communicate quantity, and color alone does not provide the complete state.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "avatar",
    "zh": {
      "title": "评论区里多人头像相似，还有用户没有上传照片。怎样让每条评论的作者仍然容易识别？",
      "options": [
        {
          "id": "avatar-name-fallback",
          "label": "头像旁持续显示姓名，缺少图片时用姓名首字作兜底",
          "feedback": "头像帮助快速扫读，姓名负责明确身份，稳定的首字兜底还能覆盖图片缺失情况。",
          "correct": true
        },
        {
          "id": "photo-only",
          "label": "只显示圆形照片，把完整姓名放进鼠标悬停提示",
          "feedback": "相似照片难以区分，触屏和键盘用户也不能稳定依赖悬停提示确认身份。",
          "correct": false
        },
        {
          "id": "initials-only",
          "label": "所有人统一显示姓名首字，评论区域不再重复显示姓名",
          "feedback": "首字可能重复，只适合作为缺图兜底；没有姓名时仍无法确认具体作者。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Several commenters have similar profile photos and some uploaded no photo. How can each author remain easy to identify?",
      "options": [
        {
          "id": "avatar-name-fallback",
          "label": "Keep the name beside the avatar and fall back to name initials when the image is missing",
          "feedback": "The avatar speeds scanning, the name confirms identity, and a stable initials fallback covers missing images.",
          "correct": true
        },
        {
          "id": "photo-only",
          "label": "Show only circular photos and put the full name in a hover tooltip",
          "feedback": "Similar photos are hard to distinguish, and touch or keyboard users cannot reliably depend on hover for identity.",
          "correct": false
        },
        {
          "id": "initials-only",
          "label": "Use initials for everyone and remove repeated names from the comment area",
          "feedback": "Initials can collide and work only as an image fallback. Without names, the specific author remains unclear.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "descriptions",
    "zh": {
      "title": "订单详情页要展示一笔订单的收货人、金额、状态等 8 个只读字段，不允许在这里修改。怎样组织最合适？",
      "options": [
        {
          "id": "read-only-descriptions",
          "label": "按“字段名 + 内容”组成描述列表，并根据宽度调整列数",
          "feedback": "这是单条记录的只读属性，字段名与内容配对能让用户快速确认信息。",
          "correct": true
        },
        {
          "id": "disabled-form",
          "label": "把 8 个字段都放进禁用输入框，保留类似编辑页的外观",
          "feedback": "禁用控件暗示这里本可编辑，还会增加视觉噪声；当前页面只需要清楚阅读。",
          "correct": false
        },
        {
          "id": "single-row-table",
          "label": "建立 8 列表格并只放这一笔订单，让字段都在同一行",
          "feedback": "表格适合多条记录按列比较，单行八列在窄屏上会明显压缩内容。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An order detail page shows eight read-only fields such as recipient, amount, and status, with no editing here. How should it be organized?",
      "options": [
        {
          "id": "read-only-descriptions",
          "label": "Use label-and-value descriptions and adjust the number of columns for available width",
          "feedback": "These are read-only properties of one record, so paired labels and values make them easy to verify.",
          "correct": true
        },
        {
          "id": "disabled-form",
          "label": "Put all eight values in disabled inputs to preserve the appearance of an edit page",
          "feedback": "Disabled controls imply potential editing and add visual noise when the task only requires reading.",
          "correct": false
        },
        {
          "id": "single-row-table",
          "label": "Create an eight-column table with the single order in one row",
          "feedback": "Tables suit comparing many records by column. One row across eight columns compresses badly on narrow screens.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "statistic",
    "zh": {
      "title": "运营看板要说明本周订单表现，数据是 486 笔，比上周增加 12%。怎样展示才能让人看懂这个变化？",
      "options": [
        {
          "id": "value-with-benchmark",
          "label": "突出“本周订单 486 笔”，并注明“较上周增加 12%”",
          "feedback": "指标名称、当前值、单位和比较基准都明确，用户才能理解数字代表什么变化。",
          "correct": true
        },
        {
          "id": "trend-only",
          "label": "只放醒目的“↑12%”，把订单数量和比较对象省略",
          "feedback": "涨幅没有说明是什么指标、相对哪个时期，无法支持业务判断。",
          "correct": false
        },
        {
          "id": "progress-for-count",
          "label": "改用 12% 进度条表示本周订单，让用户从长度判断表现",
          "feedback": "进度条需要明确目标总量；当前数据描述的是订单数量和环比，不是完成进度。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An operations dashboard reports 486 orders this week, up 12% from last week. How should it show the number and comparison clearly?",
      "options": [
        {
          "id": "value-with-benchmark",
          "label": "Emphasize 486 orders this week and add Up 12% from last week",
          "feedback": "Metric name, current value, unit, and benchmark are all explicit, so the change can be understood.",
          "correct": true
        },
        {
          "id": "trend-only",
          "label": "Show only a large ↑12% and omit the order count and comparison period",
          "feedback": "A percentage without the metric or comparison period cannot support a business judgment.",
          "correct": false
        },
        {
          "id": "progress-for-count",
          "label": "Use a 12% progress bar for weekly orders and let its length communicate performance",
          "feedback": "Progress needs a defined target. This data describes a count and period-over-period change, not completion.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "tabs",
    "zh": {
      "title": "项目详情页要在“概览、成员、日志”之间切换，三个区域都属于当前项目。怎样组织最合适？",
      "options": [
        {
          "id": "peer-tabs",
          "label": "使用页签切换三个同级内容区，并标出当前项",
          "feedback": "三个区域共享同一个项目上下文且层级平行，页签能保持当前位置并切换内容。",
          "correct": true
        },
        {
          "id": "site-navbar",
          "label": "把三个入口加入全站顶部导航栏",
          "feedback": "顶部导航服务跨页面的核心目的地，不适合承载某个项目内部的局部内容。",
          "correct": false
        },
        {
          "id": "ordered-steps",
          "label": "做成必须依次完成的三个步骤",
          "feedback": "概览、成员和日志没有完成顺序，用步骤条会制造不存在的流程约束。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A project detail page switches among Overview, Members, and Logs, all within the current project. How should it be organized?",
      "options": [
        {
          "id": "peer-tabs",
          "label": "Use tabs for the three peer sections and mark the active one",
          "feedback": "The sections share one project context and the same level, so tabs preserve context while switching content.",
          "correct": true
        },
        {
          "id": "site-navbar",
          "label": "Add all three destinations to the global top navigation",
          "feedback": "Global navigation serves major destinations across the site, not sections inside one project.",
          "correct": false
        },
        {
          "id": "ordered-steps",
          "label": "Turn them into three steps that must be completed in order",
          "feedback": "Overview, Members, and Logs have no completion order, so steps would invent a false workflow.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "segmented",
    "zh": {
      "title": "文件列表要在“列表视图”和“网格视图”间即时切换，控件放在工具栏里。哪种控件最合适？",
      "options": [
        {
          "id": "view-segmented",
          "label": "使用两段式选择器，并持续高亮当前视图",
          "feedback": "两个选项短、互斥且切换同一份内容的显示方式，适合紧凑的分段选择器。",
          "correct": true
        },
        {
          "id": "content-tabs",
          "label": "使用页签，把两种视图当成两个内容页面",
          "feedback": "这里没有两个独立内容区，只是在改变同一批文件的显示模式。",
          "correct": false
        },
        {
          "id": "view-switch",
          "label": "使用一个开关，用开启和关闭代表两种视图",
          "feedback": "列表和网格是并列命名的模式，不是某个功能的开启与关闭状态。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A file toolbar needs an immediate choice between List view and Grid view. What control fits best?",
      "options": [
        {
          "id": "view-segmented",
          "label": "Use a two-part segmented control that keeps the current view highlighted",
          "feedback": "The choices are short, mutually exclusive display modes for the same content, which fits a segmented control.",
          "correct": true
        },
        {
          "id": "content-tabs",
          "label": "Use tabs and treat the views as two content pages",
          "feedback": "There are no separate content sections here; only the presentation of the same files changes.",
          "correct": false
        },
        {
          "id": "view-switch",
          "label": "Use one switch where on and off stand for the two views",
          "feedback": "List and Grid are named peer modes, not the enabled and disabled states of one setting.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "collapse",
    "zh": {
      "title": "购买页有 20 个常见问题，但“退款申请须在 7 天内提交”会直接影响购买决定。怎样安排？",
      "options": [
        {
          "id": "collapse-with-visible-rule",
          "label": "问题答案按需折叠，但把 7 天退款条件放在购买入口附近持续显示",
          "feedback": "折叠能降低次要内容的浏览负担，影响决定的关键条件则不应等待用户主动发现。",
          "correct": true
        },
        {
          "id": "hide-all-details",
          "label": "把所有答案和退款条件都默认收起，只保留 20 个问题标题",
          "feedback": "结构更短却隐藏了关键购买条件，用户可能在没有看到限制时作出决定。",
          "correct": false
        },
        {
          "id": "question-tabs",
          "label": "把 20 个问题做成一排标签页，每次切换后只显示一个答案",
          "feedback": "大量标签难以扫描和换行，也没有解决退款条件需要持续可见的问题。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A purchase page has 20 common questions, but Refund requests must be submitted within 7 days directly affects the decision. How should it be arranged?",
      "options": [
        {
          "id": "collapse-with-visible-rule",
          "label": "Collapse answers on demand but keep the seven-day rule visible near the purchase action",
          "feedback": "Collapsing reduces the cost of secondary content, while a decision-critical condition should not depend on discovery.",
          "correct": true
        },
        {
          "id": "hide-all-details",
          "label": "Collapse every answer and refund condition by default and show only the 20 questions",
          "feedback": "The page becomes shorter but hides a key purchase condition, so users may decide without seeing the limit.",
          "correct": false
        },
        {
          "id": "question-tabs",
          "label": "Turn all 20 questions into one row of tabs and show one answer at a time",
          "feedback": "Many tabs are difficult to scan and wrap, and they still fail to keep the refund condition visible.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "timeline",
    "zh": {
      "title": "工单详情要记录“谁在什么时候创建、转交和关闭了工单”，这些事情都已经发生。怎样展示更合适？",
      "options": [
        {
          "id": "ordered-event-timeline",
          "label": "用时间轴按统一方向排列事件，并写清人物、时间和动作",
          "feedback": "这些是带时间先后的历史事件，时间轴能同时表达顺序和每次变化的具体内容。",
          "correct": true
        },
        {
          "id": "completion-steps",
          "label": "用步骤条显示“创建、转交、关闭”，让用户逐步点亮每个阶段",
          "feedback": "步骤条通常引导待完成流程，而这里需要还原已经发生的记录和责任人。",
          "correct": false
        },
        {
          "id": "unordered-activity-list",
          "label": "用普通列表展示三条动作，并按动作名称排序方便查找",
          "feedback": "按名称排序会丢失事件先后，用户无法判断工单状态是怎样变化的。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A ticket detail page records who created, transferred, and closed the ticket and when. All events already happened. How should they appear?",
      "options": [
        {
          "id": "ordered-event-timeline",
          "label": "Use a timeline with one direction and show the person, time, and action for each event",
          "feedback": "These are historical events with temporal order, so a timeline expresses both sequence and each specific change.",
          "correct": true
        },
        {
          "id": "completion-steps",
          "label": "Use a stepper for Create, Transfer, and Close and let users mark each stage complete",
          "feedback": "A stepper usually guides work still to be completed, while this page must reconstruct past records and responsibility.",
          "correct": false
        },
        {
          "id": "unordered-activity-list",
          "label": "Use a regular list and sort the actions alphabetically for easier lookup",
          "feedback": "Alphabetical ordering removes event sequence, so users cannot see how the ticket state changed.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "tree",
    "zh": {
      "title": "项目文件浏览器要展示文件夹、子文件夹和文件，用户主要是逐层查看位置，不需要提交选择结果。怎样组织？",
      "options": [
        {
          "id": "expandable-hierarchy-tree",
          "label": "使用可展开的树形控件，保留父子缩进和每层展开状态",
          "feedback": "文件本身具有多层父子关系，树能在同一区域里逐级浏览并保持当前位置。",
          "correct": true
        },
        {
          "id": "flat-file-list",
          "label": "把所有文件和文件夹放进一个列表，只按名称排序",
          "feedback": "扁平排序会丢失文件属于哪个目录，重名文件和深层位置都难以判断。",
          "correct": false
        },
        {
          "id": "submit-cascader",
          "label": "每次用级联选择器选中一条路径，然后提交后才能查看内容",
          "feedback": "级联选择适合沿单一路径选值，当前任务需要持续展开和比较同级节点，而不是提交选择。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A project browser shows folders, nested folders, and files. Users mainly browse location by level and do not submit a selection. How should it be organized?",
      "options": [
        {
          "id": "expandable-hierarchy-tree",
          "label": "Use an expandable tree with parent-child indentation and persistent expansion state",
          "feedback": "Files naturally form a multi-level hierarchy, and a tree supports gradual browsing while preserving location.",
          "correct": true
        },
        {
          "id": "flat-file-list",
          "label": "Put every file and folder in one list sorted only by name",
          "feedback": "Flattening removes directory membership, making duplicate names and deep locations difficult to understand.",
          "correct": false
        },
        {
          "id": "submit-cascader",
          "label": "Choose one path in a cascader and submit before its contents can be viewed",
          "feedback": "A cascader fits selecting one path. This task needs persistent expansion and sibling comparison rather than submission.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "carousel",
    "zh": {
      "title": "手机商品详情要在一个主图区域查看 5 个角度，用户需要知道当前是第几张并能自己切换。怎样实现？",
      "options": [
        {
          "id": "controlled-image-carousel",
          "label": "使用走马灯，提供前后切换、当前位置和可选择的缩略图",
          "feedback": "同一区域轮换相关图片节省窄屏空间，明确位置和入口让浏览过程由用户掌控。",
          "correct": true
        },
        {
          "id": "autoplay-without-controls",
          "label": "自动每两秒切换图片，不提供暂停、箭头或当前位置",
          "feedback": "用户无法停留查看细节，也不知道还有多少图片或怎样返回上一张。",
          "correct": false
        },
        {
          "id": "stack-full-images",
          "label": "把 5 张大图按原尺寸纵向排列，让用户一直滚动查看",
          "feedback": "内容都能看到，但在手机上占用过长页面，失去单个主图区域的浏览目标。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A mobile product page shows five angles in one main-image area. Users need their current position and manual control. How should it work?",
      "options": [
        {
          "id": "controlled-image-carousel",
          "label": "Use a carousel with previous and next controls, position, and selectable thumbnails",
          "feedback": "Rotating related images in one area saves narrow-screen space, while position and controls keep users in charge.",
          "correct": true
        },
        {
          "id": "autoplay-without-controls",
          "label": "Change images every two seconds with no pause, arrows, or position",
          "feedback": "Users cannot hold an image for inspection, know how many remain, or return to the previous one.",
          "correct": false
        },
        {
          "id": "stack-full-images",
          "label": "Stack all five full-size images vertically and require scrolling through them",
          "feedback": "Every image is visible, but the mobile page becomes unnecessarily long and loses the intended single-image area.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "empty",
    "zh": {
      "title": "新团队第一次打开项目列表，请求已成功，但还没有任何项目。页面应该显示什么？",
      "options": [
        {
          "id": "keep-loading",
          "label": "继续显示骨架屏，等用户自己判断列表为空",
          "feedback": "请求已经完成，继续显示加载状态会让用户误以为内容仍在路上，而不是当前确实没有项目。",
          "correct": false
        },
        {
          "id": "empty-next-step",
          "label": "说明“还没有项目”，并提供“新建项目”入口",
          "feedback": "页面应说明本来会出现什么、为什么现在为空，并给出创建第一条数据的可执行下一步。",
          "correct": true
        },
        {
          "id": "show-error",
          "label": "显示“加载失败”，并要求用户刷新页面重试",
          "feedback": "请求已经成功，空数据不是错误；错误提示会让用户重复请求，却仍然得不到项目。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A new team opens the project list for the first time. The request succeeded, but there are no projects. What should appear?",
      "options": [
        {
          "id": "keep-loading",
          "label": "Keep the skeleton visible and let people infer that the list is empty",
          "feedback": "The request is finished, so a loading state incorrectly suggests that content is still on its way.",
          "correct": false
        },
        {
          "id": "empty-next-step",
          "label": "Say there are no projects yet and provide a Create project action",
          "feedback": "The page explains what belongs here, why it is empty now, and the useful next step for creating the first item.",
          "correct": true
        },
        {
          "id": "show-error",
          "label": "Show a loading error and ask people to refresh the page",
          "feedback": "An empty successful response is not a failure. Refreshing repeats the request without solving the absence of data.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "image",
    "zh": {
      "title": "商品卡片的原图比例不同，图片加载后卡片会突然变高，部分图片还被拉伸。应该怎样处理？",
      "options": [
        {
          "id": "reserved-ratio-image",
          "label": "先预留统一比例的图片区域，再按比例裁切，并为内容图提供文字说明",
          "feedback": "预留尺寸能减少加载跳动，按比例裁切避免变形，文字说明覆盖加载失败和非视觉阅读。",
          "correct": true
        },
        {
          "id": "forced-width-height",
          "label": "给所有原图写相同宽度和高度，让浏览器直接拉伸填满区域",
          "feedback": "尺寸统一了，但强制改变长宽比会让商品外观失真，影响用户判断。",
          "correct": false
        },
        {
          "id": "natural-size-late",
          "label": "不预留图片空间，等每张原图加载完成后按自然尺寸撑开卡片",
          "feedback": "保留原比例却会在加载过程中不断改变卡片高度，导致内容位置跳动。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Product card images have different source ratios. Cards jump taller after loading and some images stretch. How should this be handled?",
      "options": [
        {
          "id": "reserved-ratio-image",
          "label": "Reserve a consistent ratio, crop proportionally, and provide text alternatives for content images",
          "feedback": "Reserved dimensions reduce layout shift, proportional cropping avoids distortion, and text covers failures and nonvisual reading.",
          "correct": true
        },
        {
          "id": "forced-width-height",
          "label": "Give every source the same width and height and let the browser stretch it to fill",
          "feedback": "The boxes become consistent, but changing aspect ratio distorts products and can mislead visual judgment.",
          "correct": false
        },
        {
          "id": "natural-size-late",
          "label": "Reserve no image space and let each natural image size expand its card after loading",
          "feedback": "Original ratios remain intact, but card heights change during loading and make surrounding content jump.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "file",
    "zh": {
      "title": "用户已经选择三份附件，其中一份正在上传、一份失败、一份已完成。上传区域接下来应该显示什么？",
      "options": [
        {
          "id": "file-items-with-status",
          "label": "逐项显示文件名、大小、处理状态，以及适用的重试或删除操作",
          "feedback": "文件项让用户确认具体对象和当前结果，操作也能准确作用在对应附件上。",
          "correct": true
        },
        {
          "id": "paperclip-count",
          "label": "收起文件信息，只显示回形针图标和“已选择 3 个文件”",
          "feedback": "总数不能说明哪个文件失败或正在处理，用户也无法确认是否选对文件。",
          "correct": false
        },
        {
          "id": "upload-entry-again",
          "label": "继续只显示“选择文件”按钮，全部完成后再一次性列出附件",
          "feedback": "传输过程中没有单项状态，用户无法发现失败、取消错误文件或判断是否需要等待。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A user selected three attachments: one is uploading, one failed, and one completed. What should the upload area show next?",
      "options": [
        {
          "id": "file-items-with-status",
          "label": "Show each file's name, size, state, and the relevant retry or remove action",
          "feedback": "File items let users confirm each object and its result, while actions target the correct attachment.",
          "correct": true
        },
        {
          "id": "paperclip-count",
          "label": "Hide file details and show only a paperclip with 3 files selected",
          "feedback": "A total count cannot identify the failed or active file, and users cannot verify what they selected.",
          "correct": false
        },
        {
          "id": "upload-entry-again",
          "label": "Keep only the Choose files button and list attachments after every upload finishes",
          "feedback": "Without per-file progress, users cannot notice failure, remove a mistaken file, or know whether to wait.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "icon",
    "zh": {
      "title": "紧凑工具栏里有一个不可撤销的“永久删除项目”操作，新用户不一定认识当前图标。怎样表达更稳妥？",
      "options": [
        {
          "id": "icon-with-clear-label",
          "label": "把统一图标放进操作按钮，并同时显示“永久删除”文字",
          "feedback": "图标帮助扫读，文字消除陌生和高风险操作的歧义，按钮则负责真实交互。",
          "correct": true
        },
        {
          "id": "trash-icon-only",
          "label": "只保留垃圾桶图标，在鼠标悬停时显示“永久删除”说明",
          "feedback": "悬停说明在触屏上不可用，用户也必须先猜测图标；高风险操作应在点击前持续说明。",
          "correct": false
        },
        {
          "id": "late-confirmation",
          "label": "只显示垃圾桶图标，点击以后再在确认弹窗里解释不可撤销",
          "feedback": "确认弹窗能防止误提交，却不能解决入口本身含义不清；用户不应先触发才知道后果。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A compact toolbar contains an irreversible Permanently delete project action, and new users may not know its icon. How should it be expressed?",
      "options": [
        {
          "id": "icon-with-clear-label",
          "label": "Put a consistent icon in the action button and also show the text Permanently delete",
          "feedback": "The icon aids scanning, the text removes ambiguity for an unfamiliar high-risk action, and the button owns interaction.",
          "correct": true
        },
        {
          "id": "trash-icon-only",
          "label": "Keep only a trash icon and reveal Permanently delete on mouse hover",
          "feedback": "Hover help is unavailable on touch and still requires users to guess the icon. High-risk actions need persistent meaning before activation.",
          "correct": false
        },
        {
          "id": "late-confirmation",
          "label": "Show only the trash icon and explain irreversibility in a confirmation dialog after click",
          "feedback": "Confirmation can prevent final mistakes but does not make the entry understandable before users activate it.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "quote",
    "zh": {
      "title": "文章要突出一句客户原话，用来说明实际使用经历。怎样处理才不会把它变成装饰或虚构背书？",
      "options": [
        {
          "id": "sourced-contextual-quote",
          "label": "保留原话，并标明经授权的说话者、来源和必要背景",
          "feedback": "引用块负责区分原话与作者观点，来源和上下文让读者能够判断这句话代表什么。",
          "correct": true
        },
        {
          "id": "anonymous-decoration",
          "label": "挑一句听起来有力量的话加引号，不说明是谁或来自哪里",
          "feedback": "排版上像引用不代表内容可核实，缺少来源时读者无法判断是否为真实原话。",
          "correct": false
        },
        {
          "id": "rewritten-endorsement",
          "label": "把客户意思改写得更有说服力，再配一个通用头像和职位",
          "feedback": "改写和虚构身份改变了证据本身，不能继续当作客户原话呈现。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An article highlights a customer's exact words about their experience. How can it avoid becoming decoration or fabricated endorsement?",
      "options": [
        {
          "id": "sourced-contextual-quote",
          "label": "Keep the original words and identify the authorized speaker, source, and necessary context",
          "feedback": "A quote separates original speech from the author's view, while source and context let readers judge what it represents.",
          "correct": true
        },
        {
          "id": "anonymous-decoration",
          "label": "Choose a powerful sentence, add quotation marks, and omit who said it or where",
          "feedback": "Quotation styling does not make content verifiable. Without a source, readers cannot know whether the words are real.",
          "correct": false
        },
        {
          "id": "rewritten-endorsement",
          "label": "Rewrite the idea to sound stronger and add a generic avatar and job title",
          "feedback": "Rewriting and inventing identity changes the evidence, so it can no longer be presented as the customer's exact words.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "video",
    "zh": {
      "title": "帮助页用两分钟视频演示创建项目，步骤是完成任务所必需的信息。怎样提供更完整？",
      "options": [
        {
          "id": "controlled-captioned-video",
          "label": "提供封面、时长、播放控制、字幕和文字步骤，并处理加载失败",
          "feedback": "视频展示动态过程，字幕和文字步骤确保静音、无法播放或需要快速查阅时仍能完成任务。",
          "correct": true
        },
        {
          "id": "autoplay-with-sound",
          "label": "页面打开后自动有声播放，并把暂停和字幕入口收到设置里",
          "feedback": "自动声音会打断用户并消耗资源，也没有解决字幕和替代说明的需要。",
          "correct": false
        },
        {
          "id": "video-only-instructions",
          "label": "只放视频播放器，把所有关键步骤从页面文字中删除",
          "feedback": "无法播放、听不清或只想定位一步的用户会失去完成任务所需的信息。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A help page uses a two-minute video to demonstrate project creation, and the steps are necessary to complete the task. What is a complete delivery?",
      "options": [
        {
          "id": "controlled-captioned-video",
          "label": "Provide a poster, duration, controls, captions, written steps, and a load-failure state",
          "feedback": "Video shows motion, while captions and written steps preserve the task for muted playback, failure, and quick reference.",
          "correct": true
        },
        {
          "id": "autoplay-with-sound",
          "label": "Autoplay with sound on page open and place pause and captions inside settings",
          "feedback": "Automatic sound interrupts users and consumes resources, while still failing to provide captions or alternatives.",
          "correct": false
        },
        {
          "id": "video-only-instructions",
          "label": "Keep only the player and remove every required step from the surrounding page",
          "feedback": "Users who cannot play or hear it, or who need one step quickly, lose the information required to complete the task.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "chat-ui",
    "zh": {
      "title": "用户发送消息后断网了。聊天界面应该怎样反馈？",
      "options": [
        {
          "id": "keep-retry",
          "label": "保留消息，显示发送失败，并提供重试或编辑",
          "feedback": "对。用户既知道发生了什么，也不会丢掉刚写的内容，还能完成下一步。",
          "correct": true
        },
        {
          "id": "vanish",
          "label": "保留消息但不标失败，等联网后在后台静默重发",
          "feedback": "静默重发保住了内容，却让用户不知道消息是否送达、何时会发送，也无法决定修改或取消。",
          "correct": false
        },
        {
          "id": "fake-reply",
          "label": "先把消息标成已发送，再在后台持续重试直到成功",
          "feedback": "这制造了错误状态，不能让界面文案代替真实传输结果。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A user sends a message and the network disconnects. What chat-interface feedback fits best?",
      "options": [
        {
          "id": "keep-retry",
          "label": "Keep the unsent message, clearly show sending failed, and offer retry or edit-and-send-again",
          "feedback": "Correct. The person knows what happened, does not lose the text, and has a usable next step.",
          "correct": true
        },
        {
          "id": "vanish",
          "label": "Delete the message so the chat list looks cleaner",
          "feedback": "The person cannot know whether it was delivered and may lose text that is hard to recreate.",
          "correct": false
        },
        {
          "id": "fake-reply",
          "label": "Show a successful reply first and handle it when the network returns",
          "feedback": "That fabricates state; interface wording cannot replace an actual delivery result.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "filter",
    "zh": {
      "title": "用户只想看“本周到期，而且还没完成”的任务。怎样处理最准确？",
      "options": [
        {
          "id": "combined-filter",
          "label": "同时选择“本周到期”和“未完成”，并显示这两个条件",
          "feedback": "对。两个已知字段共同缩小任务集合，用户也能看见为什么有些任务没有出现。",
          "correct": true
        },
        {
          "id": "keyword-only",
          "label": "输入整句话，只按任务标题匹配",
          "feedback": "标题未必包含“本周到期”或“未完成”，这会把结构化条件误当关键词。",
          "correct": false
        },
        {
          "id": "sort-only",
          "label": "先按截止日期排序，再把已完成任务折叠到列表底部",
          "feedback": "排序不会排除不符合条件的任务，只会改变它们出现的顺序。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A person wants only tasks due this week and not completed. Which design is most accurate?",
      "options": [
        {
          "id": "combined-filter",
          "label": "Use two filters—due date is this week and status is incomplete—and show both as active above the list",
          "feedback": "Correct. Two known fields narrow the task set, and people can see why some tasks are absent.",
          "correct": true
        },
        {
          "id": "keyword-only",
          "label": "Have the person type the full sentence and match only title text",
          "feedback": "Titles may not contain “due this week” or “incomplete”; that mistakes structured conditions for keywords.",
          "correct": false
        },
        {
          "id": "sort-only",
          "label": "Sort by due date so other tasks naturally disappear",
          "feedback": "Sorting does not remove items that fail a condition; it only changes their order.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "chart",
    "zh": {
      "title": "需要比较 4 个渠道本月分别带来了多少订单。怎样展示更容易比较？",
      "options": [
        {
          "id": "bar-comparison",
          "label": "使用柱状图，并标清渠道名称、单位和数值",
          "feedback": "对。柱的长度让类别数量容易比较，标签和数值让结果可核对。",
          "correct": true
        },
        {
          "id": "decorative-pie",
          "label": "使用饼图显示四个渠道的占比，只在悬停时查看具体订单数",
          "feedback": "饼图能看构成，但相近扇区不容易精确比较；题目要比较四个独立类别的数量，柱长更直接。",
          "correct": false
        },
        {
          "id": "causal-claim",
          "label": "使用折线图，把四个渠道当成四个连续点连接起来",
          "feedback": "四个渠道不是连续时间点，连线会暗示不存在的顺序和趋势，无法准确表达类别比较。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Operations wants to compare this month's order counts from four channels. Which display fits best?",
      "options": [
        {
          "id": "bar-comparison",
          "label": "Use a bar chart with clear channel names, units, and values to compare the four channels, adding a data table when needed",
          "feedback": "Correct. Bar length makes category counts easy to compare, while labels and values keep the result checkable.",
          "correct": true
        },
        {
          "id": "decorative-pie",
          "label": "Use only a colorful ring with no legend or values and rely on color to feel the difference",
          "feedback": "People cannot reliably tell what each color means or the precise difference.",
          "correct": false
        },
        {
          "id": "causal-claim",
          "label": "Draw a trend line then state that ads caused orders to grow without other evidence",
          "feedback": "A chart can show changes happening together; it cannot prove causation on its own.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "app-icon",
    "zh": {
      "title": "主屏幕图标里的品牌文字被系统裁掉了，应该怎样处理？",
      "options": [
        {
          "id": "simplify-safe-icon",
          "label": "重做安全区域内的简化方形图标，检查主屏幕、搜索和设置中的识别结果",
          "feedback": "对。系统会缩放或套用形状，图标应保留清楚的识别中心，不能直接把横向 Logo 当成最终图标。",
          "correct": true
        },
        {
          "id": "shrink-toolbar-icon",
          "label": "把应用内工具栏图标缩小后直接当作 App Icon",
          "feedback": "工具栏图标表达单个功能，应用图标负责识别整个应用，尺寸、语义和展示位置都不同。",
          "correct": false
        },
        {
          "id": "remove-brand-everywhere",
          "label": "删除图标里的品牌形状，让系统自己生成一个默认图标",
          "feedback": "默认图标会失去应用识别；应调整品牌图形的简化程度和安全区域，而不是放弃身份。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The system crops the brand text inside the Home Screen icon. What should you do?",
      "options": [
        {
          "id": "simplify-safe-icon",
          "label": "Redesign a simplified square icon within a safe area and check Home Screen, search, and Settings",
          "feedback": "Correct. The system scales or masks the icon, so its recognition center must remain clear instead of using a horizontal Logo unchanged.",
          "correct": true
        },
        {
          "id": "shrink-toolbar-icon",
          "label": "Shrink an in-app toolbar icon and use it directly as the App Icon",
          "feedback": "A toolbar icon communicates one function; an App Icon identifies the whole app, so their meanings and surfaces differ.",
          "correct": false
        },
        {
          "id": "remove-brand-everywhere",
          "label": "Remove the brand shape and let the system generate a default icon",
          "feedback": "A default icon loses the app's identity. Adjust the brand shape and safe area instead of abandoning recognition.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "sort",
    "zh": {
      "title": "想看「金额最大的几条报价」，下面哪种操作不会减少列表里的记录数？",
      "options": [
        {
          "id": "sort-desc",
          "label": "按金额从大到小排序",
          "feedback": "对。排序只调整先后，所有记录都还在，金额最大的排到最上面；想看前几条看前几行。",
          "correct": true
        },
        {
          "id": "filter-range",
          "label": "筛选金额大于 10,000 的记录",
          "feedback": "筛选会把不符合条件的记录藏起来，列表变短——数量变了，这是筛选不是排序。",
          "correct": false
        },
        {
          "id": "delete-small",
          "label": "把金额小的记录删掉",
          "feedback": "删除直接减少数据本身，代价是记录没了；看排序不该用删除实现。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "To see \"the largest quotes,\" which operation does NOT reduce the number of records in the list?",
      "options": [
        {
          "id": "sort-desc",
          "label": "Sort by amount, largest first",
          "feedback": "Correct. Sorting only reorders—every record stays, the largest ones move to the top.",
          "correct": true
        },
        {
          "id": "filter-range",
          "label": "Filter to records above 10,000",
          "feedback": "Filtering hides non-matching records and shortens the list—the count changes. That is filtering, not sorting.",
          "correct": false
        },
        {
          "id": "delete-small",
          "label": "Delete the small-amount records",
          "feedback": "Deleting removes the data itself. Viewing order should never be built on deletion.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "alert",
    "zh": {
      "title": "账号将在 7 天后到期，用户仍可继续编辑设置，但需要持续看到续费提醒。怎样呈现？",
      "options": [
        {
          "id": "persistent-alert",
          "label": "在设置内容附近保留一条说明影响和续费入口的警告",
          "feedback": "这条信息需要持续可见，但不必阻断编辑；就近警告能同时说明风险和下一步。",
          "correct": true
        },
        {
          "id": "brief-toast",
          "label": "进入页面时弹出两秒轻提示，然后自动消失",
          "feedback": "到期提醒需要用户记住并可能稍后处理，短暂消失的轻提示很容易被错过。",
          "correct": false
        },
        {
          "id": "blocking-modal",
          "label": "每次进入设置都弹窗，续费前不允许关闭",
          "feedback": "用户仍可继续使用和编辑，强制阻断超过了当前风险；持续但不阻断的提醒更合适。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An account expires in seven days. People may keep editing settings, but the renewal reminder must remain visible. How should it appear?",
      "options": [
        {
          "id": "persistent-alert",
          "label": "Keep an alert near the settings with the impact and a renewal action",
          "feedback": "The message remains visible without blocking editing and gives both the risk and a clear next step.",
          "correct": true
        },
        {
          "id": "brief-toast",
          "label": "Show a two-second toast when the page opens and then dismiss it",
          "feedback": "An expiry reminder may require later action, so a brief disappearing message is too easy to miss.",
          "correct": false
        },
        {
          "id": "blocking-modal",
          "label": "Open a modal on every visit and prevent closing it until renewal",
          "feedback": "The account still works, so blocking the entire settings task overstates the current restriction.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "toast",
    "zh": {
      "title": "用户点击“复制邀请链接”，复制已经成功，也不需要继续处理。最合适的反馈是什么？",
      "options": [
        {
          "id": "brief-result",
          "label": "短暂显示“邀请链接已复制”，随后自动消失",
          "feedback": "复制是已经完成的小操作，简短确认能说明结果，又不会打断用户接下来的工作。",
          "correct": true
        },
        {
          "id": "persistent-alert",
          "label": "在页面顶部保留“已复制”警告，直到用户关闭",
          "feedback": "结果不需要长期记住或处理，持续占据页面会把一次轻量反馈误写成重要状态。",
          "correct": false
        },
        {
          "id": "confirmation-modal",
          "label": "打开确认弹窗，要求用户点击“知道了”才能继续",
          "feedback": "复制已经完成且没有后续选择，弹窗增加了无意义的操作并打断当前流程。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Someone clicks Copy invite link. The copy succeeded and no further action is required. What feedback fits best?",
      "options": [
        {
          "id": "brief-result",
          "label": "Briefly show 'Invite link copied' and dismiss it automatically",
          "feedback": "Copying is a completed lightweight action, so a brief confirmation reports the result without interrupting the next task.",
          "correct": true
        },
        {
          "id": "persistent-alert",
          "label": "Keep a 'Copied' alert at the top until the person closes it",
          "feedback": "The result requires no later action or memory, so a persistent alert gives it unnecessary importance.",
          "correct": false
        },
        {
          "id": "confirmation-modal",
          "label": "Open a modal and require an OK click before continuing",
          "feedback": "The action is already complete and needs no decision, so a modal adds an unnecessary interruption.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "notification",
    "zh": {
      "title": "用户启动报表导出后离开了原页面，文件五分钟后才生成。完成结果应该怎样告知？",
      "options": [
        {
          "id": "persistent-download-notification",
          "label": "写入可稍后查看的通知，并在其中提供文件名称和下载入口",
          "feedback": "结果发生在原操作之后且需要后续处理，保留通知能让用户回来找到具体文件。",
          "correct": true
        },
        {
          "id": "origin-page-toast",
          "label": "在原页面显示两秒“导出完成”，时间到后自动消失",
          "feedback": "用户已经离开原页面，短暂反馈很可能完全看不到，也无法稍后找到下载入口。",
          "correct": false
        },
        {
          "id": "blocking-global-modal",
          "label": "文件完成时在用户当前页面弹出不可关闭窗口，要求立即下载",
          "feedback": "导出结果不需要打断当前任务；强制立即处理会让后台任务反过来阻塞用户。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A user starts a report export and leaves the page. The file becomes ready five minutes later. How should completion be communicated?",
      "options": [
        {
          "id": "persistent-download-notification",
          "label": "Create a notification that can be revisited, with the file name and download action",
          "feedback": "The result occurs after the original action and needs follow-up, so a retained notification lets users find the exact file later.",
          "correct": true
        },
        {
          "id": "origin-page-toast",
          "label": "Show Export complete for two seconds on the original page and then dismiss it",
          "feedback": "The user already left that page, so brief feedback may never be seen and provides no later download path.",
          "correct": false
        },
        {
          "id": "blocking-global-modal",
          "label": "Open a non-dismissible modal on the user's current page and require an immediate download",
          "feedback": "Export completion does not block the current task. Forced handling turns a background task into an interruption.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "modal",
    "zh": {
      "title": "用户要修改账单地址，完成后还要回到订单原位置。怎样安排这段编辑？",
      "options": [
        {
          "id": "contained-task",
          "label": "打开居中的编辑弹窗，保存或取消后回到订单原位置",
          "feedback": "对。独立、短暂且需要专注的任务适合弹窗；内容很长或多步时应进入完整页面。",
          "correct": true
        },
        {
          "id": "every-tip",
          "label": "在页面顶部展开地址表单，保存后再让用户滚回订单",
          "feedback": "内联编辑并非不能用，但把表单插到页面顶部会打断当前位置；这项短任务更适合在原页面上方集中完成。",
          "correct": false
        },
        {
          "id": "navigation",
          "label": "进入独立的地址管理页，保存后再重新找到这张订单",
          "feedback": "独立页面适合更长、更复杂的地址管理；这里只修改当前订单地址，跳走会增加返回和重新定位成本。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Editing a billing address has several fields but should not leave the order page. When does a Modal fit?",
      "options": [
        {
          "id": "contained-task",
          "label": "Use a Modal for this short, focused edit with clear save and close",
          "feedback": "Correct. A separate, brief task needing focus fits a modal; long or multi-step work belongs on a full page.",
          "correct": true
        },
        {
          "id": "every-tip",
          "label": "Put every explanatory line in a Modal so it is always seen",
          "feedback": "Frequent interruption adds burden; simple guidance does not need a modal layer.",
          "correct": false
        },
        {
          "id": "navigation",
          "label": "Put primary site navigation in a Modal",
          "feedback": "Navigation should remain predictable and returnable, not trap site paths in a dialog.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "drawer",
    "zh": {
      "title": "用户要在订单列表旁修改较完整的收货地址，编辑时仍需看见订单内容，完成后回到原位置。怎样安排？",
      "options": [
        {
          "id": "context-drawer",
          "label": "从右侧打开可关闭的编辑抽屉，保留列表背景",
          "feedback": "抽屉能容纳较完整的表单，同时保留订单上下文和关闭后的列表位置。",
          "correct": true
        },
        {
          "id": "small-modal",
          "label": "在页面中央打开尺寸固定的小确认弹窗",
          "feedback": "确认弹窗适合短而聚焦的决定，完整地址表单会显得拥挤并遮住更多上下文。",
          "correct": false
        },
        {
          "id": "separate-page",
          "label": "跳转到独立地址页，保存后回到列表顶部",
          "feedback": "独立页面能完成编辑，但会丢失题目要求保留的订单内容和原列表位置。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "From an order list, someone edits a full shipping address while keeping the order visible, then returns to the same position. What fits?",
      "options": [
        {
          "id": "context-drawer",
          "label": "Open a closable editing drawer from the right and keep the list behind it",
          "feedback": "A drawer has room for the form while preserving order context and the list position after closing.",
          "correct": true
        },
        {
          "id": "small-modal",
          "label": "Open a fixed-size confirmation modal in the center",
          "feedback": "A confirmation modal suits a short decision; a full address form becomes cramped and hides more context.",
          "correct": false
        },
        {
          "id": "separate-page",
          "label": "Navigate to an address page and return to the top after saving",
          "feedback": "A separate page can edit the address, but it loses the requested order context and list position.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "popconfirm",
    "zh": {
      "title": "项目归档后会立刻从团队视图消失，恢复还要进入归档列表。怎样确认更合适？",
      "options": [
        {
          "id": "nearby-confirm",
          "label": "在“归档”旁边就近说明影响，并提供确认和取消",
          "feedback": "对。单个、可逆但有后果的即时动作适合就近确认。",
          "correct": true
        },
        {
          "id": "full-modal",
          "label": "打开完整弹窗，重新展示项目详情和所有归档设置",
          "feedback": "完整弹窗会让一个简单的就近判断变得过重。",
          "correct": false
        },
        {
          "id": "no-confirm",
          "label": "第一次点击就直接归档，只显示“操作成功”",
          "feedback": "可恢复不等于没有影响；用户仍需要在执行前确认对象和结果。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Archiving a project removes it from the team view immediately, and restoring it requires the archive list. What confirmation fits?",
      "options": [
        {
          "id": "nearby-confirm",
          "label": "Use a Popconfirm near the trigger, explaining impact with Archive and Cancel",
          "feedback": "Correct. A single, reversible but consequential immediate action fits nearby confirmation.",
          "correct": true
        },
        {
          "id": "full-modal",
          "label": "Open a full Modal with many settings for every archive",
          "feedback": "A full dialog makes a simple nearby decision unnecessarily heavy.",
          "correct": false
        },
        {
          "id": "no-confirm",
          "label": "Skip confirmation because it can be restored",
          "feedback": "Reversible does not mean consequence-free; people still need to confirm the target and result.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "popover",
    "zh": {
      "title": "成员列表中，点击头像要就地查看部门、邮箱和两个快捷操作，手机端也要能打开。用什么方式更合适？",
      "options": [
        {
          "id": "interactive-profile-popover",
          "label": "使用点击或聚焦打开的气泡卡片，贴近头像并支持内部操作",
          "feedback": "内容比一句提示丰富但仍很轻量，Popover 能保持触发关系，也能覆盖键盘和触屏。",
          "correct": true
        },
        {
          "id": "hover-tooltip",
          "label": "使用只在鼠标悬停时出现的文字提示，把两个操作写成链接",
          "feedback": "Tooltip 不适合承载多项资料和交互，触屏设备也没有稳定的悬停入口。",
          "correct": false
        },
        {
          "id": "full-profile-modal",
          "label": "每次点击头像都打开占据大半屏的个人资料弹窗",
          "feedback": "弹窗能放下内容，但对少量资料和两个快捷操作来说层级过重，打断当前列表浏览。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "In a member list, clicking an avatar should reveal department, email, and two quick actions in place, including on mobile. What fits best?",
      "options": [
        {
          "id": "interactive-profile-popover",
          "label": "Use a popover opened by click or focus, anchored to the avatar with working actions inside",
          "feedback": "The content is richer than a hint but still lightweight. A popover preserves context and supports keyboard and touch.",
          "correct": true
        },
        {
          "id": "hover-tooltip",
          "label": "Use a text tooltip that appears only on hover and put the two actions inside it",
          "feedback": "Tooltips do not suit multiple details and interactive actions, and touch devices have no reliable hover entry.",
          "correct": false
        },
        {
          "id": "full-profile-modal",
          "label": "Open a profile modal that occupies most of the screen whenever the avatar is clicked",
          "feedback": "A modal can hold the content but is too heavy for a few details and two shortcuts, interrupting list browsing.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "tooltip",
    "zh": {
      "title": "工具栏只有一个下载图标，需要在鼠标悬停或键盘聚焦时补一句“下载报告”。怎样补充这句说明？",
      "options": [
        {
          "id": "short-tooltip",
          "label": "给图标关联一个可悬停和聚焦触发的文字提示",
          "feedback": "短说明用于补充图标含义，且鼠标与键盘都能触发，符合文字提示的用途。",
          "correct": true
        },
        {
          "id": "action-popover",
          "label": "打开带下载格式选择和确认按钮的气泡卡片",
          "feedback": "题目只需要解释图标，不需要包含选择和操作的交互式浮层。",
          "correct": false
        },
        {
          "id": "after-click-toast",
          "label": "点击下载后再用消息提示说明这个图标",
          "feedback": "用户需要在操作前识别按钮，点击后的消息无法帮助他提前理解图标。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An icon-only toolbar button needs the label Download report on mouse hover or keyboard focus. What should be used?",
      "options": [
        {
          "id": "short-tooltip",
          "label": "Attach a text tooltip that opens on both hover and focus",
          "feedback": "A short label explains the icon, and supporting both mouse and keyboard makes the hint reachable.",
          "correct": true
        },
        {
          "id": "action-popover",
          "label": "Open a card with format choices and a confirmation button",
          "feedback": "The task only needs to explain the icon, not an interactive layer with choices and actions.",
          "correct": false
        },
        {
          "id": "after-click-toast",
          "label": "Explain the icon in a message only after download is clicked",
          "feedback": "People need to understand the control before acting, so a message after the click arrives too late.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "progress",
    "zh": {
      "title": "上传一个 200 MB 文件，而且系统知道已经传了多少。页面应该显示什么？",
      "options": [
        {
          "id": "progress",
          "label": "显示真实百分比或已上传大小，失败时提供重试",
          "feedback": "对。任务总量和已完成量可测时，进度条能让用户判断还要等多久。",
          "correct": true
        },
        {
          "id": "spinner",
          "label": "显示“正在上传”和转圈动画，但不展示已经上传多少",
          "feedback": "已有真实完成量时，Spinner 丢掉了用户可以利用的信息。",
          "correct": false
        },
        {
          "id": "instant",
          "label": "根据网速估算一个倒计时，用倒计时替代真实上传进度",
          "feedback": "既然系统知道真实上传量，就应优先展示真实进度；网速变化会让估算倒计时反复跳动或提前结束。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A 200MB upload reports uploaded bytes. What feedback should be used?",
      "options": [
        {
          "id": "progress",
          "label": "Show real Progress percentage or uploaded size, with retry on failure",
          "feedback": "Correct. When total and completed work are measurable, progress lets people judge the wait.",
          "correct": true
        },
        {
          "id": "spinner",
          "label": "Show only a continuously spinning Spinner",
          "feedback": "When real completion exists, a Spinner loses useful information.",
          "correct": false
        },
        {
          "id": "instant",
          "label": "Immediately show upload complete while it continues in the background",
          "feedback": "It presents incomplete transfer as success and can lead to data-loss assumptions.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "skeleton",
    "zh": {
      "title": "文章列表结构固定，数据通常要等一两秒才返回。加载期间怎样减少页面跳动？",
      "options": [
        {
          "id": "matching-skeleton",
          "label": "先显示接近图片和标题形状的骨架，数据到达后替换",
          "feedback": "骨架提前占住真实内容的位置，结构相近时能减少内容出现后的布局变化。",
          "correct": true
        },
        {
          "id": "empty-message",
          "label": "先显示“还没有文章”，数据回来后再改成列表",
          "feedback": "请求尚未结束，空状态会错误地告诉用户没有数据，并在结果到达时改变含义。",
          "correct": false
        },
        {
          "id": "fake-progress",
          "label": "显示从 0% 自动增长的进度条，不读取真实进度",
          "feedback": "系统不知道完成比例，伪造百分比可能提前走完，也无法稳定文章列表的布局。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An article list has a known layout, but its data usually takes one or two seconds to arrive. How can loading reduce layout movement?",
      "options": [
        {
          "id": "matching-skeleton",
          "label": "Reserve image and title shapes with a skeleton, then replace it with data",
          "feedback": "A skeleton that resembles the incoming structure reserves space and reduces movement when real content appears.",
          "correct": true
        },
        {
          "id": "empty-message",
          "label": "Show 'No articles yet' first and replace it when data arrives",
          "feedback": "The request is still pending, so an empty state incorrectly claims that no data exists.",
          "correct": false
        },
        {
          "id": "fake-progress",
          "label": "Animate a progress bar from 0% without reading actual progress",
          "feedback": "The system does not know completion percentage, and fake progress does not reserve the article layout.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "result",
    "zh": {
      "title": "支付请求已经结束并生成订单，用户需要确认是否成功、订单编号以及接下来能做什么。页面应该怎样呈现？",
      "options": [
        {
          "id": "complete-result-state",
          "label": "显示明确的结果页，包含状态、订单信息和最相关的下一步",
          "feedback": "支付是完整流程终点，集中展示结果和后续入口能让用户确认任务是否真正完成。",
          "correct": true
        },
        {
          "id": "brief-success-toast",
          "label": "显示两秒“操作成功”提示，然后自动跳回商品首页",
          "feedback": "短暂提示没有订单依据和后续入口，用户也可能来不及确认支付对应哪笔订单。",
          "correct": false
        },
        {
          "id": "empty-cart-state",
          "label": "清空购物车并显示“暂无商品”，让用户据此推断支付成功",
          "feedback": "空购物车只说明当前没有商品，不能证明支付结果，也无法解释失败或处理中状态。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A payment request has finished and produced an order. The user needs the outcome, order number, and available next step. How should the page respond?",
      "options": [
        {
          "id": "complete-result-state",
          "label": "Show a clear result page with status, order information, and the most relevant next action",
          "feedback": "Payment ends a complete flow, so one result state lets users verify completion and find the next path.",
          "correct": true
        },
        {
          "id": "brief-success-toast",
          "label": "Show Operation successful for two seconds and automatically return to the store home",
          "feedback": "Brief feedback provides no order evidence or follow-up and may disappear before users know which payment it refers to.",
          "correct": false
        },
        {
          "id": "empty-cart-state",
          "label": "Clear the cart and show No products, leaving users to infer that payment succeeded",
          "feedback": "An empty cart only describes current contents. It does not prove payment outcome or explain failure and processing states.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "spinner",
    "zh": {
      "title": "点击保存后通常要等两秒，但系统不知道还剩多久。页面应该显示什么？",
      "options": [
        {
          "id": "spinner",
          "label": "按钮显示“保存中”和转圈图标，并防止重复提交",
          "feedback": "对。短暂且无法估算完成度的等待适合 Spinner，并要说明正在做什么。",
          "correct": true
        },
        {
          "id": "fake-progress",
          "label": "按照两秒平均耗时，让进度条自动从 0% 走到 100%",
          "feedback": "没有真实完成度时，虚假进度会误导用户。",
          "correct": false
        },
        {
          "id": "nothing",
          "label": "保持保存按钮可点击，只在页面角落显示统一加载提示",
          "feedback": "加载提示离触发位置太远，而且按钮仍能重复点击。短暂保存应在按钮附近明确状态并暂时阻止重复提交。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Saving usually finishes in two seconds, but remaining work is unknown. What should appear?",
      "options": [
        {
          "id": "spinner",
          "label": "Show a Spinner and Saving in the button, disabling duplicate submission",
          "feedback": "Correct. A brief wait with unknown completion suits a Spinner and should say what is happening.",
          "correct": true
        },
        {
          "id": "fake-progress",
          "label": "Show Progress slowly moving from 0% to 100%",
          "feedback": "Without real completion, fake progress misleads people.",
          "correct": false
        },
        {
          "id": "nothing",
          "label": "Show no state and update suddenly on success",
          "feedback": "People cannot tell whether the click worked and may submit again.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "menu",
    "zh": {
      "title": "后台有项目、成员、账单和设置等 8 个独立页面。怎样帮助用户持续找到入口和当前位置？",
      "options": [
        {
          "id": "grouped-menu",
          "label": "用分组导航菜单列出页面，并高亮当前页面",
          "feedback": "这些项目会带用户前往不同页面；分组和当前态能同时解决查找入口与确认位置。",
          "correct": true
        },
        {
          "id": "content-tabs",
          "label": "把 8 个页面做成一排标签页，在同一区域切换",
          "feedback": "标签页适合同一对象的少量并列内容；用它承载整套后台页面会让层级和地址变得模糊。",
          "correct": false
        },
        {
          "id": "more-dropdown",
          "label": "把所有页面入口收进一个常驻的“更多”下拉菜单",
          "feedback": "下拉菜单节省空间，却隐藏了主要页面和当前位置；8 个稳定入口更适合分组持续展示。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An admin product has eight separate pages, including Projects, Members, Billing, and Settings. How should people find pages and their current location?",
      "options": [
        {
          "id": "grouped-menu",
          "label": "List the pages in a grouped navigation menu and highlight the current page",
          "feedback": "These items navigate to separate pages, and grouping plus a current state supports both discovery and orientation.",
          "correct": true
        },
        {
          "id": "content-tabs",
          "label": "Turn all eight pages into one row of tabs that swaps the content area",
          "feedback": "Tabs fit a small set of peer views for one object, not the primary hierarchy of an entire admin product.",
          "correct": false
        },
        {
          "id": "more-dropdown",
          "label": "Hide every page destination inside one persistent More dropdown",
          "feedback": "A dropdown saves space but hides the main destinations and current location that should remain visible.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "breadcrumb",
    "zh": {
      "title": "用户正在“项目 / 夏季活动 / 数据报告”页面，需要看懂它属于哪一层并返回项目。怎样展示？",
      "options": [
        {
          "id": "hierarchy-path",
          "label": "显示“项目 / 夏季活动 / 数据报告”，上级可点击",
          "feedback": "这条路径表达页面在内容层级中的位置，并让用户直接返回任一上级。",
          "correct": true
        },
        {
          "id": "visit-history",
          "label": "显示用户刚才访问过的三个页面，按时间倒序排列",
          "feedback": "访问历史会随进入方式变化，不能稳定说明当前页面属于哪个项目和层级。",
          "correct": false
        },
        {
          "id": "task-steps",
          "label": "显示“第 3 步”，并把前两个页面标记为已完成",
          "feedback": "这些页面是层级位置，不是必须按顺序完成的流程；步骤状态会暗示不存在的任务进度。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Someone is on Projects / Summer campaign / Data report and needs to understand the hierarchy and return to Projects. What should be shown?",
      "options": [
        {
          "id": "hierarchy-path",
          "label": "Show 'Projects / Summer campaign / Data report' with linked parent levels",
          "feedback": "The path communicates the page's stable place in the hierarchy and provides direct navigation to each parent.",
          "correct": true
        },
        {
          "id": "visit-history",
          "label": "List the last three visited pages in reverse chronological order",
          "feedback": "Visit history changes with the route taken and does not reliably explain where the current page belongs.",
          "correct": false
        },
        {
          "id": "task-steps",
          "label": "Show 'Step 3' and mark the previous two pages as completed",
          "feedback": "These are locations in a hierarchy, not stages of a required process, so completion states are misleading.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "pagination",
    "zh": {
      "title": "审计日志有几万条，用户需要分享“错误日志第 4 页”，回来后还要保持筛选条件。怎样浏览更合适？",
      "options": [
        {
          "id": "stable-pages",
          "label": "使用分页，并把页码和筛选条件同步到网址",
          "feedback": "稳定页码适合定位和返回大量记录；写入网址后，同一筛选结果还能分享和复现。",
          "correct": true
        },
        {
          "id": "endless-feed",
          "label": "持续自动加载更多，不记录用户已经滚到的位置",
          "feedback": "连续加载适合随意浏览，但很难准确分享第 4 页，也不利于返回原来的日志位置。",
          "correct": false
        },
        {
          "id": "category-tabs",
          "label": "把每 20 条日志做成一个标签页，并按数字命名",
          "feedback": "标签页用于少量并列类别，不是大量结果的页码；数量增长后会迅速挤满导航。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An audit log has tens of thousands of entries. People must share 'error logs, page 4' and return with filters preserved. Which browsing pattern fits?",
      "options": [
        {
          "id": "stable-pages",
          "label": "Use pagination and keep the page number and filters in the URL",
          "feedback": "Stable pages support precise return and sharing, while URL parameters reproduce the same filtered result.",
          "correct": true
        },
        {
          "id": "endless-feed",
          "label": "Load entries continuously without recording the current position",
          "feedback": "Continuous loading supports casual browsing but makes page 4 difficult to share or revisit precisely.",
          "correct": false
        },
        {
          "id": "category-tabs",
          "label": "Turn each group of 20 logs into a numerically named tab",
          "feedback": "Tabs represent a small set of peer categories, not thousands of sequential result pages.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "steps",
    "zh": {
      "title": "结账分为地址、配送、付款和确认四步。怎样让用户知道自己走到哪一步？",
      "options": [
        {
          "id": "steps",
          "label": "显示四个步骤，标出当前和已经完成的步骤",
          "feedback": "对。步骤条表达多步流程的位置和进展，不替代每步自己的表单校验。",
          "correct": true
        },
        {
          "id": "tabs",
          "label": "把四步做成可以随意跳转的标签页",
          "feedback": "结账步骤有顺序和完成条件，任意跳过会破坏流程。",
          "correct": false
        },
        {
          "id": "spinner",
          "label": "只在标题里写“第 2/4 步”，不展示各步骤名称和完成情况",
          "feedback": "“第 2/4 步”只能说明数量，用户仍不知道前后分别是什么，也无法快速确认哪些步骤已经完成。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Checkout has Address, Delivery, Payment, and Confirm, and people may return to an earlier step. How should current position be shown?",
      "options": [
        {
          "id": "steps",
          "label": "Use Steps to mark current and completed stages, allowing return to completed stages",
          "feedback": "Correct. Steps express position and progress in a multi-step flow; they do not replace validation inside each form.",
          "correct": true
        },
        {
          "id": "tabs",
          "label": "Use freely jumpable Tabs as if the stages were unrelated pages",
          "feedback": "Checkout stages have order and completion conditions; arbitrary skipping breaks the flow.",
          "correct": false
        },
        {
          "id": "spinner",
          "label": "Show only a Spinner between stages without showing total stages",
          "feedback": "A waiting state does not communicate flow position or remaining stages.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "dropdown",
    "zh": {
      "title": "每一行项目都有“重命名、复制、归档”。怎样避免列表里挤满按钮？",
      "options": [
        {
          "id": "dropdown",
          "label": "把三个次要操作收进同一个菜单，并保留文字",
          "feedback": "对。与同一对象相关的次要动作可以放进菜单，但不能只靠图标让人猜。",
          "correct": true
        },
        {
          "id": "three-icons",
          "label": "每行保留三个图标按钮，只在鼠标悬停时显示名称",
          "feedback": "图标含义常有歧义，尤其是低频或有风险的动作。",
          "correct": false
        },
        {
          "id": "select-value",
          "label": "把三个操作都放进右键菜单，行内不再保留任何入口",
          "feedback": "右键菜单可以作为补充，但不能作为唯一入口；触屏和不熟悉右键的用户很难发现这些操作。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Each project row has Rename, Duplicate, and Archive. How do you avoid a row full of buttons?",
      "options": [
        {
          "id": "dropdown",
          "label": "Use an inline Dropdown for these related secondary actions, with clear text when opened",
          "feedback": "Correct. Related secondary commands can share a menu, but should not rely on guessed icons.",
          "correct": true
        },
        {
          "id": "three-icons",
          "label": "Use three unlabeled icons per row; people will learn them",
          "feedback": "Icons are often ambiguous, especially for infrequent or risky actions.",
          "correct": false
        },
        {
          "id": "select-value",
          "label": "Treat an action as a form value and save it through a Select",
          "feedback": "These are immediate commands on the current row, not a persistent field value.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "anchor",
    "zh": {
      "title": "安装文档很长，包含“准备环境、安装、配置、排错”四个章节，用户要快速跳转并知道当前读到哪里。怎样导航？",
      "options": [
        {
          "id": "section-anchor-nav",
          "label": "建立页内章节目录，链接到对应锚点，并随滚动高亮当前章节",
          "feedback": "锚点直接定位同一页面的内容，高亮还能保持目录与阅读位置同步。",
          "correct": true
        },
        {
          "id": "content-tabs",
          "label": "把四个章节做成标签页，切换时卸载其他章节内容",
          "feedback": "标签会把连续文档拆成互斥状态，用户无法自然滚动阅读全文或使用页内地址定位。",
          "correct": false
        },
        {
          "id": "back-to-top-only",
          "label": "只在每章末尾提供“回到顶部”，再让用户从头寻找下一章",
          "feedback": "回到顶部不能直接到达目标章节，也没有说明当前阅读位置，长文档查找仍然费力。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A long installation guide has Environment, Install, Configure, and Troubleshoot sections. Users need fast jumps and awareness of the current section. How should it navigate?",
      "options": [
        {
          "id": "section-anchor-nav",
          "label": "Create an in-page table of contents linked to anchors and highlight the current section on scroll",
          "feedback": "Anchors locate content within the same page, while highlighting keeps the directory synchronized with reading position.",
          "correct": true
        },
        {
          "id": "content-tabs",
          "label": "Turn the four sections into tabs and unmount every section except the selected one",
          "feedback": "Tabs split a continuous document into exclusive states, preventing natural reading and addressable in-page locations.",
          "correct": false
        },
        {
          "id": "back-to-top-only",
          "label": "Only add Back to top after each section and make users find the next section again",
          "feedback": "Returning to the top does not directly reach a target or communicate current position, so navigation remains costly.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "back-top",
    "zh": {
      "title": "手机端商品列表很长，用户滚动多屏后常要回顶部换筛选条件，右下角还有客服入口。怎样安排返回顶部？",
      "options": [
        {
          "id": "conditional-safe-backtop",
          "label": "滚动一段距离后显示明确按钮，并避开客服入口和底部操作区",
          "feedback": "按钮只在长距离返回有价值时出现，避让现有操作还能保证两个入口都可点击。",
          "correct": true
        },
        {
          "id": "always-visible-short-pages",
          "label": "在所有页面始终显示按钮，即使页面还没有产生滚动",
          "feedback": "短页面没有返回需求，常驻按钮会增加噪声并占用有限的手机操作区域。",
          "correct": false
        },
        {
          "id": "overlapping-corner-button",
          "label": "固定在右下角客服按钮上方，用更高层级保证它优先可点",
          "feedback": "提高层级只决定谁盖住谁，不能让被遮挡的入口继续可见和可用。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A long mobile product list often requires returning to filters at the top, and a support entry already occupies the bottom-right. How should Back to top work?",
      "options": [
        {
          "id": "conditional-safe-backtop",
          "label": "Reveal a clearly named button after meaningful scrolling and keep it clear of support and bottom actions",
          "feedback": "It appears only when long-distance return is useful, and collision avoidance keeps both controls usable.",
          "correct": true
        },
        {
          "id": "always-visible-short-pages",
          "label": "Show the button on every page at all times, including before any scrolling is possible",
          "feedback": "Short pages have no return need, so a persistent button adds noise and consumes limited mobile action space.",
          "correct": false
        },
        {
          "id": "overlapping-corner-button",
          "label": "Place it over the bottom-right support control and raise its layer so it receives clicks first",
          "feedback": "Layer order only chooses which control covers the other; it does not keep both entries visible and usable.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "skip-link",
    "zh": {
      "title": "键盘用户每次都要按很多次 Tab 才能越过导航、进入正文。怎样减少重复操作？",
      "options": [
        {
          "id": "skip-link",
          "label": "在页面开头提供“跳到正文”的链接",
          "feedback": "对。跳过导航链接让重复使用键盘的人直接越过每页都一样的内容。",
          "correct": true
        },
        {
          "id": "hidden-main",
          "label": "把导航链接移出 Tab 顺序，让键盘焦点直接进入正文",
          "feedback": "移出 Tab 顺序会让键盘用户无法使用导航。正确做法是保留导航，同时提供可主动跳过重复内容的入口。",
          "correct": false
        },
        {
          "id": "auto-jump",
          "label": "记录上次滚动位置，每次打开页面都自动滚到正文",
          "feedback": "自动跳转会打断正常导航；应由键盘用户在需要时主动选择。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Keyboard users Tab through a long navigation on every page before reaching content. What should be provided?",
      "options": [
        {
          "id": "skip-link",
          "label": "Provide a focusable Skip to main content link at page start that targets main",
          "feedback": "Correct. A skip link lets repeated keyboard users bypass content that is the same on every page.",
          "correct": true
        },
        {
          "id": "hidden-main",
          "label": "Permanently hide main so people do not pass navigation",
          "feedback": "Hiding main removes the page’s core information for everyone.",
          "correct": false
        },
        {
          "id": "auto-jump",
          "label": "Automatically move everyone to main on page load",
          "feedback": "Automatic movement interrupts normal navigation; people should choose it when needed.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "search",
    "zh": {
      "title": "用户想找名称或描述里提到“预算”的项目，但不知道项目状态。应该先做什么？",
      "options": [
        {
          "id": "keyword-search",
          "label": "搜索“预算”，从名称和描述中找相关项目",
          "feedback": "对。目标是从用户输入的词找到候选，不是先指定一个固定分类条件。",
          "correct": true
        },
        {
          "id": "status-filter",
          "label": "先筛选“未完成”，再只在剩余项目的标题里搜索“预算”",
          "feedback": "状态不能代表“预算”这个词出现在哪里，会遗漏仍在进行中的相关项目。",
          "correct": false
        },
        {
          "id": "chart-only",
          "label": "按最近更新时间排序，再从前几页人工查找“预算”",
          "feedback": "排序只能改变查看顺序，不能定位关键词；相关项目也可能很久没有更新，人工翻页容易漏掉。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A person wants projects whose name or description mentions “budget” but does not know their status. What should they use first?",
      "options": [
        {
          "id": "keyword-search",
          "label": "Search for “budget” across project names and descriptions, then filter further if needed",
          "feedback": "Correct. The goal is to find candidates from a person's words, not to choose a fixed category condition first.",
          "correct": true
        },
        {
          "id": "status-filter",
          "label": "Use only a Completed filter because all searches should be by status",
          "feedback": "Status cannot represent where “budget” appears and would miss relevant in-progress projects.",
          "correct": false
        },
        {
          "id": "chart-only",
          "label": "Draw a status chart so the person can guess which projects are relevant",
          "feedback": "Charts compare data; they do not locate specific content by keyword.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "hero",
    "zh": {
      "title": "一位第一次访问的用户打开产品官网，需要马上知道产品解决什么问题以及下一步做什么。首屏怎样组织更有效？",
      "options": [
        {
          "id": "clear-value-and-action",
          "label": "用明确标题和说明讲清价值，突出一个主要行动，并配必要的产品画面",
          "feedback": "标题、说明、行动和画面共同服务于首要理解，用户能判断产品是否相关并继续。",
          "correct": true
        },
        {
          "id": "abstract-visual-slogan",
          "label": "使用抽象口号和大幅装饰图，把具体能力留到页面底部再解释",
          "feedback": "画面可能醒目，但新访客无法从首屏判断产品负责什么，也不知道是否值得继续。",
          "correct": false
        },
        {
          "id": "everything-above-fold",
          "label": "把客户标志、全部功能、三档定价和 FAQ 一起塞进首屏",
          "feedback": "信息都重要不等于都属于首屏；过多并列内容会冲淡最主要的价值和行动。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A first-time visitor opens a product site and needs to understand the problem it solves and what to do next. How should the hero work?",
      "options": [
        {
          "id": "clear-value-and-action",
          "label": "State the value in a clear heading and explanation, emphasize one action, and show the necessary product view",
          "feedback": "The heading, support copy, action, and visual serve one primary understanding so visitors can judge relevance and continue.",
          "correct": true
        },
        {
          "id": "abstract-visual-slogan",
          "label": "Use an abstract slogan and large decorative image, explaining the actual capability near the page bottom",
          "feedback": "The composition may be striking, but new visitors cannot tell what the product does or whether to continue.",
          "correct": false
        },
        {
          "id": "everything-above-fold",
          "label": "Place customer logos, every feature, three prices, and the FAQ together in the hero",
          "feedback": "Important content does not all belong in the hero. Too many parallel messages dilute the primary value and action.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "cta",
    "zh": {
      "title": "落地页的主要目标是让访客开始免费试用，但首屏同时放了“提交、了解更多、联系我们”三个同样醒目的按钮。怎样调整？",
      "options": [
        {
          "id": "one-outcome-focused-cta",
          "label": "突出“开始免费试用”，将其他入口降为次级，并说明试用条件",
          "feedback": "主行动直接说明点击结果，层级和必要条件还能减少访客在关键一步的犹豫。",
          "correct": true
        },
        {
          "id": "equal-primary-actions",
          "label": "保留三个同等强调的主按钮，让不同访客自行判断下一步",
          "feedback": "同一视觉区域里多个主目标会相互竞争，用户反而更难识别页面希望他完成什么。",
          "correct": false
        },
        {
          "id": "generic-submit-copy",
          "label": "把三个按钮统一改成“提交”，通过点击后页面再解释结果",
          "feedback": "“提交”没有说明将开始试用、查看信息还是联系销售，用户点击前无法预期结果。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A landing page primarily wants visitors to start a free trial, but its hero has equally prominent Submit, Learn more, and Contact us buttons. What should change?",
      "options": [
        {
          "id": "one-outcome-focused-cta",
          "label": "Emphasize Start free trial, demote the other paths, and state the trial conditions",
          "feedback": "The primary action names its outcome, while hierarchy and relevant conditions reduce hesitation at the key step.",
          "correct": true
        },
        {
          "id": "equal-primary-actions",
          "label": "Keep three equally prominent primary buttons and let each visitor decide",
          "feedback": "Multiple primary goals compete within one visual region, making the intended next step harder to identify.",
          "correct": false
        },
        {
          "id": "generic-submit-copy",
          "label": "Rename every button Submit and explain the result only after it is clicked",
          "feedback": "Submit does not say whether it starts a trial, reveals information, or contacts sales, so the outcome is unclear beforehand.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "user-voice",
    "zh": {
      "title": "官网要展示客户说“每周少花两小时整理报表”，团队想把它改得更夸张并补一个职业头像。应该怎样处理？",
      "options": [
        {
          "id": "authorized-specific-voice",
          "label": "保留经确认的原话，说明使用场景、取得方式和授权身份",
          "feedback": "具体经历和可核实背景构成用户原声的可信度，展示范围也应服从真实授权。",
          "correct": true
        },
        {
          "id": "polished-marketing-claim",
          "label": "改写成“效率提升 10 倍”，让结果更适合官网传播",
          "feedback": "未经证据支持的放大会改变客户原意，不能再作为真实使用结果展示。",
          "correct": false
        },
        {
          "id": "invented-profile",
          "label": "保留匿名文字，但生成一个头像、姓名和职位增强真实感",
          "feedback": "匿名评价可以使用，虚构身份却会把隐私处理变成不存在的可验证背书。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A customer said, We spend two fewer hours each week preparing reports. The team wants to exaggerate it and add a professional avatar. What should happen?",
      "options": [
        {
          "id": "authorized-specific-voice",
          "label": "Keep the confirmed words and state the use case, collection method, and authorized identity",
          "feedback": "A specific experience and verifiable context create credibility, while display scope must follow actual permission.",
          "correct": true
        },
        {
          "id": "polished-marketing-claim",
          "label": "Rewrite it as 10× more efficient so the result works better in marketing",
          "feedback": "Unsupported amplification changes the customer's meaning and cannot be presented as a real usage result.",
          "correct": false
        },
        {
          "id": "invented-profile",
          "label": "Keep the text anonymous but generate an avatar, name, and title to make it feel real",
          "feedback": "Anonymous feedback can be valid, but invented identity turns privacy treatment into a false verifiable endorsement.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "header",
    "zh": {
      "title": "官网页头在桌面放品牌、五个导航、搜索和登录，到了手机后已经挤成两行。怎样调整？",
      "options": [
        {
          "id": "prioritized-responsive-header",
          "label": "保留品牌和关键操作，把次要导航收进可关闭的移动菜单",
          "feedback": "页头继续承担身份和主要入口，移动端按优先级收纳能避免把每个元素强行压小。",
          "correct": true
        },
        {
          "id": "shrink-everything",
          "label": "继续保留全部入口，并缩小字体、间距和按钮高度直到一行",
          "feedback": "内容虽然挤回一行，却会降低阅读和点击准确性，也没有建立移动端信息优先级。",
          "correct": false
        },
        {
          "id": "remove-brand",
          "label": "隐藏品牌和首页入口，只保留导航、搜索与登录",
          "feedback": "用户会失去当前网站身份和返回首页的稳定入口，页头的基本职责没有完成。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A desktop header contains brand, five navigation items, search, and login, but wraps to two lines on mobile. How should it adapt?",
      "options": [
        {
          "id": "prioritized-responsive-header",
          "label": "Keep brand and the key action, and move secondary navigation into a dismissible mobile menu",
          "feedback": "The header preserves identity and primary access, while prioritization avoids shrinking every control beyond usability.",
          "correct": true
        },
        {
          "id": "shrink-everything",
          "label": "Keep every entry and reduce type, gaps, and button height until they fit one line",
          "feedback": "It may fit, but readability and click accuracy decline, and no mobile information priority is established.",
          "correct": false
        },
        {
          "id": "remove-brand",
          "label": "Hide the brand and home entry while keeping navigation, search, and login",
          "feedback": "Users lose the site identity and stable home path, leaving a basic header responsibility unmet.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "logo",
    "zh": {
      "title": "窄屏上横向 Logo 挤占了导航按钮，应该怎样处理？",
      "options": [
        {
          "id": "use-compact-logo",
          "label": "使用已定义的紧凑或图形版 Logo，并在窄屏和深色背景分别验收",
          "feedback": "对。Logo 可以有适配变体，保持品牌识别的同时给导航留下空间；不应直接删除品牌或改成工具栏图标。",
          "correct": true
        },
        {
          "id": "shrink-unreadable-wordmark",
          "label": "继续缩小横向文字版 Logo，直到它和导航挤在同一行",
          "feedback": "尺寸变小但文字不可读时，品牌识别已经失败；应切换到合适的紧凑变体。",
          "correct": false
        },
        {
          "id": "replace-with-menu-icon",
          "label": "用菜单图标完全替代 Logo，让用户从导航里猜品牌",
          "feedback": "菜单图标表达展开导航的动作，不能替代品牌身份入口。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A horizontal Logo crowds the navigation on a narrow screen. What should you do?",
      "options": [
        {
          "id": "use-compact-logo",
          "label": "Use the defined compact or symbol Logo and verify it separately on narrow and dark surfaces",
          "feedback": "Correct. Logo variants can adapt to space while preserving recognition; do not delete the brand or turn it into a toolbar icon.",
          "correct": true
        },
        {
          "id": "shrink-unreadable-wordmark",
          "label": "Keep shrinking the horizontal wordmark until it fits beside the navigation",
          "feedback": "If the text becomes unreadable, brand recognition has already failed; switch to an appropriate compact variant.",
          "correct": false
        },
        {
          "id": "replace-with-menu-icon",
          "label": "Replace the Logo entirely with a menu icon and make people infer the brand from navigation",
          "feedback": "A menu icon communicates the action of opening navigation and cannot replace the brand identity entry.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "navbar",
    "zh": {
      "title": "官网的“产品、模板、价格、博客”需要在各页面保持一致，并清楚标出当前栏目。应该放在哪里？",
      "options": [
        {
          "id": "global-navbar",
          "label": "放进全站顶部导航栏，并高亮当前栏目",
          "feedback": "这些是跨页面的核心目的地，持续可见的导航栏能提供稳定入口和位置提示。",
          "correct": true
        },
        {
          "id": "local-tabs",
          "label": "每个页面各自放一组内容页签",
          "feedback": "页签用于同一页面或对象内的平级内容，不适合承担全站主要目的地。",
          "correct": false
        },
        {
          "id": "desktop-drawer",
          "label": "桌面端默认藏进右侧抽屉，需要时再打开",
          "feedback": "桌面空间充足时隐藏所有核心入口会增加访问步骤，也削弱当前位置提示。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Product, Templates, Pricing, and Blog must stay consistent across the site and show the current section. Where should they go?",
      "options": [
        {
          "id": "global-navbar",
          "label": "Place them in a global top navbar and highlight the current section",
          "feedback": "These are major cross-page destinations, so a persistent navbar provides stable access and location.",
          "correct": true
        },
        {
          "id": "local-tabs",
          "label": "Create a separate set of content tabs on every page",
          "feedback": "Tabs organize peer content within one page or object, not the site's main destinations.",
          "correct": false
        },
        {
          "id": "desktop-drawer",
          "label": "Hide them in a right drawer by default on desktop",
          "feedback": "Hiding every core destination despite available space adds steps and weakens location awareness.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "footer",
    "zh": {
      "title": "官网页脚需要放隐私、条款、帮助和联系方式，但 7 天退款期限会直接影响购买。怎样组织？",
      "options": [
        {
          "id": "grouped-supplementary-footer",
          "label": "按用途分组补充链接和联系入口，退款期限仍在购买区域显示",
          "feedback": "页脚适合集中补充信息，影响决定的规则则应在用户行动前就能看到。",
          "correct": true
        },
        {
          "id": "duplicate-header-links",
          "label": "把顶部所有导航和按钮原样复制到底部，再追加法律链接",
          "feedback": "机械重复会形成难以扫描的链接堆，页脚应围绕结尾阶段的补充需求组织。",
          "correct": false
        },
        {
          "id": "footer-only-refund",
          "label": "只在页脚条款链接中说明退款期限，购买卡片保持简洁",
          "feedback": "退款限制影响购买判断，藏在页面底部会让用户在行动前无法得到关键信息。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A site footer needs privacy, terms, help, and contact details, while a seven-day refund window directly affects purchase. How should it be organized?",
      "options": [
        {
          "id": "grouped-supplementary-footer",
          "label": "Group supplementary links and contact paths, while keeping the refund window visible near purchase",
          "feedback": "The footer consolidates supplementary information, while decision-critical terms remain visible before action.",
          "correct": true
        },
        {
          "id": "duplicate-header-links",
          "label": "Copy every header navigation item and button into the footer and then add legal links",
          "feedback": "Mechanical repetition creates an unscannable link pile instead of serving needs at the end of the page.",
          "correct": false
        },
        {
          "id": "footer-only-refund",
          "label": "Mention the refund window only inside a footer terms link to keep pricing cards clean",
          "feedback": "A refund limit changes the purchase decision, so hiding it at the bottom withholds key information before action.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "faq",
    "zh": {
      "title": "客服记录显示用户反复询问退款期限和数据安全。官网 FAQ 应该怎样整理这些内容？",
      "options": [
        {
          "id": "evidence-based-answers",
          "label": "按真实问题写标题，答案先给结论，再说明条件和下一步入口",
          "feedback": "真实问题对应实际疑虑，先给结论能快速解答，条件和链接帮助用户继续处理。",
          "correct": true
        },
        {
          "id": "promotional-questions",
          "label": "改写成“为什么我们是最佳选择”等问题，用答案集中介绍优点",
          "feedback": "自问自答的宣传没有解决客服反复收到的具体疑问，会降低 FAQ 的可信度。",
          "correct": false
        },
        {
          "id": "hide-decision-details",
          "label": "只在 FAQ 答案深处说明退款限制，购买区域不再重复展示",
          "feedback": "FAQ 可以补充细节，但影响购买决定的限制不能只等待用户主动展开寻找。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Support records show repeated questions about refund windows and data security. How should the site FAQ organize them?",
      "options": [
        {
          "id": "evidence-based-answers",
          "label": "Use the real questions as headings, answer with the conclusion first, then conditions and a next-step link",
          "feedback": "Real questions address actual concerns, a conclusion answers quickly, and conditions plus links support follow-up.",
          "correct": true
        },
        {
          "id": "promotional-questions",
          "label": "Rewrite them as Why are we the best choice? and use the answers to list product strengths",
          "feedback": "Promotional self-questioning does not resolve the concrete issues repeatedly reaching support and weakens trust.",
          "correct": false
        },
        {
          "id": "hide-decision-details",
          "label": "Put refund limits only deep inside FAQ answers and remove them from the purchase area",
          "feedback": "FAQ can add detail, but a condition that affects purchase should not depend on users discovering a hidden answer.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "pricing",
    "zh": {
      "title": "订阅页提供个人、团队和企业三档方案，既有月付也有年付。怎样让用户完成真实成本比较？",
      "options": [
        {
          "id": "transparent-plan-comparison",
          "label": "并列说明适用对象、核心权益、计费周期、实际总价和取消规则",
          "feedback": "这些信息共同决定方案是否适合以及实际要付多少，用户能够在同一口径下比较。",
          "correct": true
        },
        {
          "id": "monthly-equivalent-only",
          "label": "只突出年付折算后的最低月均价，把年付总额放到结账页",
          "feedback": "月均价方便比较，但隐藏本次总额会让用户无法在选择前判断真实支出。",
          "correct": false
        },
        {
          "id": "unsupported-popular-plan",
          "label": "给利润最高的方案标“最受欢迎”，不说明适用对象或数据来源",
          "feedback": "推荐标记会影响选择；没有真实依据时，它不能证明该方案更适合当前用户。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A subscription page offers Individual, Team, and Enterprise plans with monthly and annual billing. How can users compare real cost?",
      "options": [
        {
          "id": "transparent-plan-comparison",
          "label": "Compare intended users, core benefits, billing period, actual total, and cancellation terms",
          "feedback": "Together these determine fit and actual payment, allowing each plan to be compared on the same basis.",
          "correct": true
        },
        {
          "id": "monthly-equivalent-only",
          "label": "Emphasize only the lowest annual monthly equivalent and reveal the annual total at checkout",
          "feedback": "A monthly equivalent aids comparison, but hiding the charged total prevents users from judging real cost before selection.",
          "correct": false
        },
        {
          "id": "unsupported-popular-plan",
          "label": "Mark the highest-margin plan Most popular without an audience or evidence",
          "feedback": "Recommendations influence choice. Without evidence, the badge cannot show that the plan fits the current user.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "social-proof",
    "zh": {
      "title": "官网准备展示客户 Logo 和“10 万团队在用”，但目前只有估算数字，部分 Logo 也没有展示授权。应该怎样处理？",
      "options": [
        {
          "id": "verified-authorized-proof",
          "label": "只展示已授权素材和可核验数据，并注明时间、口径与来源",
          "feedback": "社会证明的价值来自外部可信依据，授权和统计说明让访客知道证据代表什么。",
          "correct": true
        },
        {
          "id": "publish-then-request",
          "label": "先放知名客户 Logo 增加信任，等官网上线后再集中申请授权",
          "feedback": "未经授权的标识不能作为可信证据，先展示还会带来品牌和事实风险。",
          "correct": false
        },
        {
          "id": "rounded-estimate",
          "label": "把估算数字取整成“10 万+”，只要视觉上足够醒目就不写来源",
          "feedback": "无法说明统计对象、时间和来源的数字不能被核验，醒目反而会放大可信度问题。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A site wants customer logos and Used by 100,000 teams, but the count is estimated and some logos lack display permission. What should happen?",
      "options": [
        {
          "id": "verified-authorized-proof",
          "label": "Show only authorized assets and verifiable data, with date, definition, and source",
          "feedback": "Social proof derives value from credible external evidence. Permission and measurement notes explain what that evidence represents.",
          "correct": true
        },
        {
          "id": "publish-then-request",
          "label": "Publish recognizable customer logos first and request permission after the site launches",
          "feedback": "Unauthorized marks cannot serve as trustworthy evidence, and publishing first creates brand and factual risk.",
          "correct": false
        },
        {
          "id": "rounded-estimate",
          "label": "Round the estimate to 100,000+ and omit its source as long as the number looks prominent",
          "feedback": "A number without audience, time, or source cannot be verified, and prominence amplifies the credibility problem.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "top-nav-layout",
    "zh": {
      "title": "内容网站只有首页、文章、专题、关于和搜索五个一级入口，没有复杂层级。哪种页面结构更直接？",
      "options": [
        {
          "id": "focused-top-navigation",
          "label": "使用顶部导航布局，下方内容限宽，手机端收纳次要入口",
          "feedback": "少量一级入口适合持续放在顶部，主要内容可以在完整宽度下保持清楚阅读。",
          "correct": true
        },
        {
          "id": "permanent-sidebar",
          "label": "使用常驻宽侧栏放五个入口，让正文一直占剩余区域",
          "feedback": "侧栏更适合层级较深或工具型导航，当前少量入口会长期占用不必要的阅读宽度。",
          "correct": false
        },
        {
          "id": "single-scroll-sections",
          "label": "取消页面跳转，把文章、专题和关于全部接成一个长首页",
          "feedback": "这些入口服务不同内容任务，强行合并会削弱独立网址、搜索和返回路径。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A content site has five top-level destinations—Home, Articles, Topics, About, and Search—with no deep hierarchy. Which page structure is direct?",
      "options": [
        {
          "id": "focused-top-navigation",
          "label": "Use a top-navigation layout, constrain reading width, and collect secondary entries on mobile",
          "feedback": "A small set of primary destinations fits persistent top access while leaving the main content clear and wide.",
          "correct": true
        },
        {
          "id": "permanent-sidebar",
          "label": "Use a wide permanent sidebar for the five entries and leave the remaining width to articles",
          "feedback": "Sidebars fit deeper or tool-oriented navigation; these few entries would consume reading width without adding clarity.",
          "correct": false
        },
        {
          "id": "single-scroll-sections",
          "label": "Remove page navigation and append Articles, Topics, and About into one long homepage",
          "feedback": "These serve different content tasks, and merging them weakens distinct URLs, search, and return paths.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "sidebar-layout",
    "zh": {
      "title": "管理后台有项目、成员、账单和权限等十多个分组功能，用户会频繁切换，右侧需要尽量大的工作区。怎样布局？",
      "options": [
        {
          "id": "adaptive-sidebar-workspace",
          "label": "用侧栏组织分组导航，内容区弹性伸缩，窄屏改为可关闭抽屉",
          "feedback": "稳定侧栏适合频繁访问的层级入口，弹性工作区和移动抽屉还能保留可用内容宽度。",
          "correct": true
        },
        {
          "id": "overflowing-topbar",
          "label": "把十多个入口全部放进一行顶栏，宽度不足时继续横向滚动",
          "feedback": "大量分组入口会失去层级和整体可见性，横向滚动也让导航位置难以预测。",
          "correct": false
        },
        {
          "id": "mobile-full-sidebar",
          "label": "桌面和手机都常驻同样宽度的侧栏，正文使用剩余空间",
          "feedback": "手机剩余宽度不足以完成主要任务，侧栏应转成按需打开的导航层。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An admin app has more than ten grouped areas such as projects, members, billing, and permissions. Users switch often and need a large workspace. How should it lay out?",
      "options": [
        {
          "id": "adaptive-sidebar-workspace",
          "label": "Use grouped sidebar navigation, let content flex, and turn the sidebar into a dismissible drawer on narrow screens",
          "feedback": "A stable sidebar fits frequent hierarchical access, while flexible content and a mobile drawer preserve working width.",
          "correct": true
        },
        {
          "id": "overflowing-topbar",
          "label": "Put every entry in one top bar and allow horizontal scrolling when it no longer fits",
          "feedback": "Many grouped destinations lose hierarchy and overview, while horizontal scrolling makes locations unpredictable.",
          "correct": false
        },
        {
          "id": "mobile-full-sidebar",
          "label": "Keep the same permanent sidebar width on desktop and mobile and give content the remainder",
          "feedback": "Mobile content loses the width required for primary tasks, so navigation should become an on-demand layer.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "single-page-layout",
    "zh": {
      "title": "产品落地页围绕一个试用目标，内容按“问题、价值、产品证据、客户证明、行动”依次排列。怎样组织更合适？",
      "options": [
        {
          "id": "guided-single-page",
          "label": "使用单页滚动布局，按阅读顺序分节，并提供锚点和阶段性行动入口",
          "feedback": "所有内容服务同一决策，连续页面能按顺序读完，页内导航也能避免在长页面中找不到位置。",
          "correct": true
        },
        {
          "id": "dashboard-long-page",
          "label": "把账号、账单和项目管理也接在落地页后面，统一靠滚动完成",
          "feedback": "这些是独立的工具任务，不属于同一阅读主线，合并会让导航和状态管理混乱。",
          "correct": false
        },
        {
          "id": "route-every-section",
          "label": "把每个短章节都拆成独立网址，用户必须逐页点击才能读完",
          "feedback": "内容本来组成一个连续决策，过度拆页会打断上下文和阅读节奏。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A product landing page serves one trial goal through a sequence of problem, value, product evidence, customer proof, and action. How should it be organized?",
      "options": [
        {
          "id": "guided-single-page",
          "label": "Use a single scrolling page with ordered sections, anchors, and contextual action entries",
          "feedback": "All content supports one decision, so a continuous page keeps one reading order while in-page navigation keeps people oriented on a long page.",
          "correct": true
        },
        {
          "id": "dashboard-long-page",
          "label": "Append account, billing, and project management below the landing page and handle everything by scrolling",
          "feedback": "Those are separate tool tasks rather than one reading path, so merging them confuses navigation and state.",
          "correct": false
        },
        {
          "id": "route-every-section",
          "label": "Give every short section a separate URL and require page-by-page navigation to read everything",
          "feedback": "The content forms one continuous decision, and excessive page breaks interrupt context and reading rhythm.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "doc-layout",
    "zh": {
      "title": "技术文档既要切换不同页面，又要在当前长文章内跳章节，桌面空间充足但手机很窄。怎样布局？",
      "options": [
        {
          "id": "responsive-three-role-docs",
          "label": "左侧放整站目录，中间正文，右侧放本页大纲；窄屏逐步收起两侧",
          "feedback": "三栏分别解决跨页、阅读和页内定位，响应式收起还能保证正文始终优先。",
          "correct": true
        },
        {
          "id": "equal-three-columns",
          "label": "三栏始终等宽平分屏幕，手机也完整保留所有目录",
          "feedback": "目录和大纲不应与正文同等占宽，窄屏强保三栏会让主要阅读区域无法使用。",
          "correct": false
        },
        {
          "id": "one-combined-directory",
          "label": "把整站页面和当前文章小节混进一个长目录，正文铺满剩余区域",
          "feedback": "两种导航范围混在一起会失去职责边界，用户难以分清跳转到新页面还是当前章节。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Technical docs need navigation across pages and within the current long article. Desktop has room but mobile is narrow. How should the layout adapt?",
      "options": [
        {
          "id": "responsive-three-role-docs",
          "label": "Use site navigation left, article center, and page outline right, progressively collapsing side columns on narrow screens",
          "feedback": "The columns handle cross-page access, reading, and in-page location separately, while collapse keeps content primary.",
          "correct": true
        },
        {
          "id": "equal-three-columns",
          "label": "Keep three equal-width columns on every screen, including all directories on mobile",
          "feedback": "Navigation and outline do not deserve equal reading width, and three mobile columns make the article unusable.",
          "correct": false
        },
        {
          "id": "one-combined-directory",
          "label": "Mix site pages and current headings into one long directory and use the rest for content",
          "feedback": "Mixing navigation scopes removes the boundary between opening another page and jumping within the current one.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "card-grid-layout",
    "zh": {
      "title": "模板库有几十张结构一致的卡片，容器宽度会变化，卡片标题和操作不能被压得过窄。怎样排布？",
      "options": [
        {
          "id": "responsive-card-grid",
          "label": "使用卡片网格，设定可读的最小卡宽，并让列数随容器自动变化",
          "feedback": "最小卡宽保护内容结构，自动列数和统一 gap 能在不同容器中保持稳定扫描。",
          "correct": true
        },
        {
          "id": "fixed-four-columns",
          "label": "始终使用四等分列，屏幕变窄时继续缩小卡片里的标题和按钮",
          "feedback": "固定列数忽略内容所需的最小宽度，标题、图片和操作最终会拥挤或溢出。",
          "correct": false
        },
        {
          "id": "different-card-structures",
          "label": "让每张卡片根据内容自由改变字段顺序和操作位置",
          "feedback": "网格仍然存在，但同类信息不再对齐，用户难以快速比较和连续浏览。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A template library has dozens of structurally consistent cards in containers of changing width. Titles and actions cannot become too narrow. How should it lay out?",
      "options": [
        {
          "id": "responsive-card-grid",
          "label": "Use a card grid with a readable minimum card width and automatic column count",
          "feedback": "Minimum width protects card structure, while automatic columns and one gap preserve scanning across containers.",
          "correct": true
        },
        {
          "id": "fixed-four-columns",
          "label": "Always use four equal columns and keep shrinking card titles and actions as the screen narrows",
          "feedback": "A fixed count ignores content's minimum width, eventually crowding or overflowing titles, images, and actions.",
          "correct": false
        },
        {
          "id": "different-card-structures",
          "label": "Let every card rearrange fields and actions independently according to its content",
          "feedback": "The grid remains, but comparable information no longer aligns, weakening scanning and comparison.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "centered-layout",
    "zh": {
      "title": "博客正文在大屏上铺满 1600 像素，单行文字很长，读者经常找不到下一行开头。怎样调整？",
      "options": [
        {
          "id": "constrained-centered-column",
          "label": "限制正文最大宽度并居中，保留两侧留白和左对齐行文",
          "feedback": "稳定行宽减少视线横向移动，居中窄栏让阅读任务在宽屏上仍然集中。",
          "correct": true
        },
        {
          "id": "full-width-copy",
          "label": "继续让正文占满屏幕，只增加字号、行高和段落间距",
          "feedback": "字号变化不能解决行长随视口无限增长的问题，宽屏阅读仍需长距离回扫。",
          "correct": false
        },
        {
          "id": "center-aligned-paragraphs",
          "label": "保持全文宽度，但把每段正文改成居中对齐",
          "feedback": "每行起点不一致会进一步降低长文阅读效率，也没有控制单行长度。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A blog article spans a 1600-pixel display, producing very long lines that make the next line hard to find. How should it change?",
      "options": [
        {
          "id": "constrained-centered-column",
          "label": "Constrain and center the article column, keep side whitespace, and retain left-aligned paragraphs",
          "feedback": "Stable line length reduces horizontal eye movement, and a centered narrow column keeps reading focused on wide screens.",
          "correct": true
        },
        {
          "id": "full-width-copy",
          "label": "Keep the article full-width and increase type size, line-height, and paragraph spacing",
          "feedback": "Type size does not stop line length growing with the viewport, so wide-screen return sweeps remain long.",
          "correct": false
        },
        {
          "id": "center-aligned-paragraphs",
          "label": "Keep the full width but center-align every paragraph",
          "feedback": "Variable line starts make long-form reading harder and still do not constrain line length.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "masonry-layout",
    "zh": {
      "title": "插画师的作品墙有上百张比例不同的图片，希望浏览紧凑、不出现整行空白。选哪种结构，验收时看什么？",
      "options": [
        {
          "id": "masonry-with-order-check",
          "label": "用瀑布流保持原始比例补位，并检查手机列数和补位后的阅读顺序",
          "feedback": "补位消除了整行留白；视觉顺序会按列交错，必须在桌面和手机上确认顺序仍然可以接受。",
          "correct": true
        },
        {
          "id": "uniform-crop-grid",
          "label": "用卡片网格，把封面统一裁成相同高度，保证每行严格对齐",
          "feedback": "统一裁切能得到整齐的行列，但会切掉作品画面；以图为主的展示墙上，裁切损失大于留白。",
          "correct": false
        },
        {
          "id": "masonry-without-check",
          "label": "用瀑布流保持原始比例，桌面上看着紧凑就不用再验收",
          "feedback": "紧凑只是目标的一半；补位后第 4 张可能排到第 3 张上方，手机收成单列还会再变一次顺序。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An illustrator has a portfolio wall with hundreds of images in different aspect ratios and wants compact browsing without full-row gaps. Which structure and acceptance check fit?",
      "options": [
        {
          "id": "masonry-with-order-check",
          "label": "Use masonry to pack images at their natural ratio, then check column count and reading order on mobile",
          "feedback": "Packing removes row gaps; the visual order interleaves across columns, so confirm it stays acceptable on desktop and phone.",
          "correct": true
        },
        {
          "id": "uniform-crop-grid",
          "label": "Use a card grid and crop every cover to the same height for strict row alignment",
          "feedback": "Uniform cropping gives tidy rows but cuts into the artwork; on an image-led wall the crop costs more than the gaps.",
          "correct": false
        },
        {
          "id": "masonry-without-check",
          "label": "Use masonry at natural ratios; if the desktop looks compact, no further check is needed",
          "feedback": "Compactness is only half the goal; after packing, card 4 can sit above card 3, and a single phone column reorders again.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "split-screen-layout",
    "zh": {
      "title": "产品登录页左侧放品牌故事、右侧放登录表单，两边各占一半。AI 交付的手机版仍是左右排列，文字和按钮都被压窄。怎样处理？",
      "options": [
        {
          "id": "stack-form-first",
          "label": "手机端改成上下排列，登录表单在上、品牌区在后，再检查输入和按钮可用",
          "feedback": "上下排列保住可读宽度；表单是用户打开登录页要完成的任务，放在前面。",
          "correct": true
        },
        {
          "id": "shrink-side-by-side",
          "label": "保留左右结构，把两个区域等比缩小到手机屏幕宽度",
          "feedback": "等比缩小会把输入框和按钮压到难以操作，手机端需要重新排列而不是缩放桌面布局。",
          "correct": false
        },
        {
          "id": "drop-brand-side",
          "label": "手机端直接删掉品牌区，只保留登录表单",
          "feedback": "品牌区在新访客首次访问时承担建立信任的任务；应先尝试上下重排，确认可省再删。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A product login page puts a brand story on the left half and the login form on the right. The delivered mobile version keeps the side-by-side layout, squeezing text and buttons. What should you do?",
      "options": [
        {
          "id": "stack-form-first",
          "label": "Stack the two areas on mobile with the login form first, then verify inputs and buttons stay usable",
          "feedback": "Stacking restores readable width; the form is the task visitors came to complete, so it leads.",
          "correct": true
        },
        {
          "id": "shrink-side-by-side",
          "label": "Keep the two columns and scale both areas down proportionally to fit the phone",
          "feedback": "Proportional shrinking crushes inputs and buttons; mobile needs rearrangement, not a scaled-down desktop layout.",
          "correct": false
        },
        {
          "id": "drop-brand-side",
          "label": "Remove the brand area on phones and keep only the login form",
          "feedback": "The brand area builds trust for first-time visitors; try restacking first and remove it only when it is proven dispensable.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "responsive-design",
    "zh": {
      "title": "三列商品卡放到手机上以后，文字和按钮都挤在一起。应该先怎样调整？",
      "options": [
        {
          "id": "reflow",
          "label": "改成单列或更少列，再检查文字和按钮是否容易使用",
          "feedback": "对。响应式先保证当前任务能完成，再决定是否保留所有桌面排列。",
          "correct": true
        },
        {
          "id": "scale",
          "label": "把桌面页面整体缩小，继续保留三列",
          "feedback": "比例缩小会使文字和触控目标难用，不能保证手机上的任务可完成。",
          "correct": false
        },
        {
          "id": "hide-main",
          "label": "保持三列宽度，改成横向滑动，让用户左右拖动浏览商品",
          "feedback": "横向滑动会隐藏后面的商品，也增加逐项比较成本。常规商品列表应先减少列数，保证内容和购买操作可见。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Three desktop product-card columns make text cramped and buttons too small at 390px. What change should be proposed first?",
      "options": [
        {
          "id": "reflow",
          "label": "Use one or fewer columns at mobile width and check that title, price, and button remain readable and tappable",
          "feedback": "Correct. Responsive work preserves the ability to complete the current task before preserving every desktop arrangement.",
          "correct": true
        },
        {
          "id": "scale",
          "label": "Scale down the entire desktop page proportionally; three columns must stay unchanged",
          "feedback": "Scaling makes text and touch targets unusable and does not ensure a mobile task can be completed.",
          "correct": false
        },
        {
          "id": "hide-main",
          "label": "Hide the title and purchase button, leaving only images to avoid crowding",
          "feedback": "That removes information and actions needed to buy rather than reorganizing the layout.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "space",
    "zh": {
      "title": "资料表单里，标签离自己的输入框很远，却和下一组标签挤在一起。怎样调整最能表达分组？",
      "options": [
        {
          "id": "same-gap",
          "label": "所有标签、输入框和分组之间统一使用同一个间距",
          "feedback": "完全相同的距离无法说明谁属于一组，用户仍可能把标签看成下一项的说明。",
          "correct": false
        },
        {
          "id": "relationship-gaps",
          "label": "缩小标签与输入框的距离，增大不同字段组的距离",
          "feedback": "较近表示关联，较远表示分组结束；复用固定档位后，同类关系也会保持一致。",
          "correct": true
        },
        {
          "id": "manual-blank-lines",
          "label": "在文字里加入空格和空行，把当前画面推到合适位置",
          "feedback": "文字内容和字体变化后，手工空格会失效；间距应由布局规则表达，而不是写进内容。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "In a profile form, each label is far from its own field but crowded against the next label. Which adjustment best communicates grouping?",
      "options": [
        {
          "id": "same-gap",
          "label": "Use exactly the same gap between every label, field, and group",
          "feedback": "Equal distances do not reveal which label belongs to which field, so the grouping remains ambiguous.",
          "correct": false
        },
        {
          "id": "relationship-gaps",
          "label": "Reduce label-to-field spacing and increase spacing between field groups",
          "feedback": "A smaller gap signals association, while a larger gap marks a new group. Reusable spacing steps keep this relationship consistent.",
          "correct": true
        },
        {
          "id": "manual-blank-lines",
          "label": "Insert spaces and blank lines into the text until the current view looks right",
          "feedback": "Manual whitespace breaks when copy or fonts change. Layout rules should express spacing relationships.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "margin",
    "zh": {
      "title": "两张卡片彼此贴得太近，但每张卡片内部的文字与边框距离已经合适。应该调整哪里？",
      "options": [
        {
          "id": "external-spacing",
          "label": "调整卡片之间的外边距，或统一修改父容器的间距",
          "feedback": "问题发生在两个组件之间，外边距或父级 gap 能改变外部关系而不破坏内部留白。",
          "correct": true
        },
        {
          "id": "increase-padding",
          "label": "增加两张卡片的内边距，让卡片内容进一步远离边框",
          "feedback": "内边距只会扩大内容与卡片边框的距离，卡片外边界仍然彼此贴近。",
          "correct": false
        },
        {
          "id": "empty-spacer-element",
          "label": "在两张卡片中间插入一个固定高度的空白元素",
          "feedback": "空元素把视觉间距变成额外内容，响应式变化和统一维护都会更困难。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Two cards sit too close together, but the text-to-border spacing inside each card is already correct. What should change?",
      "options": [
        {
          "id": "external-spacing",
          "label": "Adjust the cards' margin or change the parent container's shared gap",
          "feedback": "The problem is between components, so margin or parent gap changes their external relationship without disturbing internal space.",
          "correct": true
        },
        {
          "id": "increase-padding",
          "label": "Increase both cards' padding so their content moves farther from their borders",
          "feedback": "Padding only changes content-to-border distance. The cards' outer edges remain just as close.",
          "correct": false
        },
        {
          "id": "empty-spacer-element",
          "label": "Insert a fixed-height empty element between the two cards",
          "feedback": "A spacer turns visual distance into extra content and becomes harder to maintain across responsive layouts.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "padding",
    "zh": {
      "title": "按钮文字紧贴边框，可点击区域也太小，但按钮与旁边元素的距离已经合适。应该怎样调整？",
      "options": [
        {
          "id": "increase-button-padding",
          "label": "增加按钮内部的水平和垂直内边距，并重新检查控件尺寸",
          "feedback": "Padding 同时拉开文字与边框并扩大按钮自身的点击区域，不改变它和外部元素的关系。",
          "correct": true
        },
        {
          "id": "increase-button-margin",
          "label": "增加按钮外边距，把按钮整体推离旁边的文字和图标",
          "feedback": "Margin 会改变按钮与外界的距离，却不会让文字离边框更远，也不会扩大点击区域。",
          "correct": false
        },
        {
          "id": "line-height-only",
          "label": "只提高文字行高，让按钮高度随着文本行框一起变大",
          "feedback": "行高主要控制文字行框，不能独立建立稳定的左右留白，也不等于完整的按钮内边距。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Button text touches the border and the hit area is too small, while spacing to nearby elements is already correct. What should change?",
      "options": [
        {
          "id": "increase-button-padding",
          "label": "Increase horizontal and vertical button padding and recheck the control size",
          "feedback": "Padding separates text from the border and expands the button's own hit area without changing external relationships.",
          "correct": true
        },
        {
          "id": "increase-button-margin",
          "label": "Increase button margin and move the whole button away from nearby text and icons",
          "feedback": "Margin changes external distance but does not move text away from the border or enlarge the clickable area.",
          "correct": false
        },
        {
          "id": "line-height-only",
          "label": "Only increase text line-height and let the button grow with the line box",
          "feedback": "Line-height controls the text line box and cannot independently create reliable horizontal space or complete button padding.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "flex",
    "zh": {
      "title": "工具栏只有一行：标题靠左，数量会变化的操作按钮靠右，并保持垂直居中。怎样布局最直接？",
      "options": [
        {
          "id": "absolute-actions",
          "label": "让按钮绝对定位到右侧，再逐个调整 top 数值",
          "feedback": "按钮脱离正常排列后，标题或按钮数量变化容易重叠，垂直对齐也要反复手调。",
          "correct": false
        },
        {
          "id": "flex-toolbar",
          "label": "父级使用 Flex，两端分布并设置交叉轴居中",
          "feedback": "这是沿一条主轴排列的关系；Flex 能让两组内容自然分居两端，并统一垂直对齐。",
          "correct": true
        },
        {
          "id": "fixed-margins",
          "label": "给标题和每个按钮写固定外边距，把它们推到目标位置",
          "feedback": "固定距离只适配当前文字和按钮数量，内容变化后不能继续保持两端关系。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A toolbar has one row: a title on the left and a changing number of actions on the right, all vertically centered. Which layout is most direct?",
      "options": [
        {
          "id": "absolute-actions",
          "label": "Absolutely position the actions on the right and tune each top value",
          "feedback": "Removing actions from normal flow makes overlap likely when the title or action count changes.",
          "correct": false
        },
        {
          "id": "flex-toolbar",
          "label": "Use Flex on the parent, distribute both sides, and center the cross axis",
          "feedback": "This is a one-axis relationship. Flex keeps the two groups at opposite ends and aligns them vertically.",
          "correct": true
        },
        {
          "id": "fixed-margins",
          "label": "Give the title and every action fixed margins until they reach the target positions",
          "feedback": "Fixed distances only fit the current content and stop preserving the relationship when text or actions change.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "grid",
    "zh": {
      "title": "模板库要把同类卡片排成多行多列，并根据容器宽度自动减少列数。怎样实现更合适？",
      "options": [
        {
          "id": "fixed-card-widths",
          "label": "给每张卡片固定宽度和左边距，逐项计算换行位置",
          "feedback": "逐项计算会把布局绑在当前数量和宽度上，容器变化时容易出现空洞或溢出。",
          "correct": false
        },
        {
          "id": "responsive-grid",
          "label": "父级使用 Grid，以 minmax 定义可换列的轨道",
          "feedback": "任务同时涉及行和列；网格轨道能统一管理列宽、间距，并按可用空间重新排布。",
          "correct": true
        },
        {
          "id": "fixed-flex-columns",
          "label": "用 Flex 换行，并把每张卡固定为 33.33% 宽",
          "feedback": "Flex 可以换行，但固定三等分还要额外计算间距和窄屏列数，二维轨道更直接。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A template library needs multiple rows and columns of similar cards, with fewer columns as the container narrows. Which implementation fits?",
      "options": [
        {
          "id": "fixed-card-widths",
          "label": "Give each card a fixed width and margin and calculate every wrap point",
          "feedback": "Manual calculations bind the layout to the current count and width, causing gaps or overflow when the container changes.",
          "correct": false
        },
        {
          "id": "responsive-grid",
          "label": "Use Grid on the parent and define responsive tracks with minmax",
          "feedback": "The task coordinates rows and columns. Grid tracks manage width, gaps, and rearrangement from the available space.",
          "correct": true
        },
        {
          "id": "fixed-flex-columns",
          "label": "Wrap with Flex and fix every card at 33.33% width",
          "feedback": "Flex can wrap, but fixed thirds still require gap calculations and separate rules for narrower column counts.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "z-index",
    "zh": {
      "title": "下拉菜单已经设为 z-index: 99999，却仍被卡片边界裁掉。下一步最该检查什么？",
      "options": [
        {
          "id": "increase-number",
          "label": "继续把菜单的 z-index 增加到更大的数字",
          "feedback": "更大的数字仍受父级层叠上下文和裁切范围限制，不能让子元素越过这些边界。",
          "correct": false
        },
        {
          "id": "inspect-parents",
          "label": "检查父级的 overflow、定位和层叠上下文",
          "feedback": "菜单被裁掉通常不只是数值大小问题；要先找到限制它的父级边界，再决定浮层放置方式。",
          "correct": true
        },
        {
          "id": "raise-all-layers",
          "label": "把卡片及其所有子元素的 z-index 一起提高",
          "feedback": "整体抬高可能压住其他浮层，却没有解除卡片自身的裁切，也会让全局层级更混乱。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A dropdown already has z-index: 99999 but is still clipped at the card boundary. What should be inspected next?",
      "options": [
        {
          "id": "increase-number",
          "label": "Keep increasing the dropdown's z-index to a larger number",
          "feedback": "A larger number remains constrained by parent stacking contexts and clipping boundaries.",
          "correct": false
        },
        {
          "id": "inspect-parents",
          "label": "Inspect parent overflow, positioning, and stacking contexts",
          "feedback": "Clipping is usually not a number problem. Find the parent boundary first, then choose the correct layer placement.",
          "correct": true
        },
        {
          "id": "raise-all-layers",
          "label": "Increase the z-index of the card and every child together",
          "feedback": "Raising the whole card can cover other overlays without removing the card's own clipping behavior.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "sticky",
    "zh": {
      "title": "长表格放在独立滚动面板中，表头设置了 sticky 却没有吸住。下一步最应该检查什么？",
      "options": [
        {
          "id": "offset-and-scroll-ancestor",
          "label": "确认表头设置了 top，并检查实际滚动祖先、容器高度和 overflow",
          "feedback": "Sticky 需要对应轴的偏移，并受最近滚动祖先和包含范围限制，这些条件决定它能否吸附。",
          "correct": true
        },
        {
          "id": "replace-with-fixed",
          "label": "把表头改成 fixed，让它始终固定在浏览器视口顶部",
          "feedback": "Fixed 脱离表格和滚动面板，可能遮挡全页内容，也不再受表格边界约束。",
          "correct": false
        },
        {
          "id": "raise-z-index-only",
          "label": "保留现有布局，只把表头 z-index 提高到 99999",
          "feedback": "层级只能处理重叠顺序，不能补上 sticky 的偏移、滚动容器或可滚动距离。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A long table sits in its own scroll panel, but its sticky header does not stick. What should be checked next?",
      "options": [
        {
          "id": "offset-and-scroll-ancestor",
          "label": "Confirm a top offset and inspect the real scroll ancestor, container height, and overflow",
          "feedback": "Sticky needs an offset on its axis and is constrained by its nearest scroll ancestor and containing range.",
          "correct": true
        },
        {
          "id": "replace-with-fixed",
          "label": "Change the header to fixed so it remains at the top of the browser viewport",
          "feedback": "Fixed leaves the table and scroll panel, may cover page content, and no longer respects table boundaries.",
          "correct": false
        },
        {
          "id": "raise-z-index-only",
          "label": "Keep the layout and only increase the header z-index to 99999",
          "feedback": "Layer order handles overlap but cannot supply the missing offset, scrolling container, or scrolling distance.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "position",
    "zh": {
      "title": "“新品”角标要始终贴在商品卡片右上角，并随着卡片一起移动和换行。怎样定位最稳妥？",
      "options": [
        {
          "id": "relative-card-absolute-badge",
          "label": "让卡片建立定位参照，再把角标绝对定位到右上角",
          "feedback": "父卡片成为明确参照后，角标偏移会相对卡片计算，并随卡片整体移动。",
          "correct": true
        },
        {
          "id": "fixed-to-viewport",
          "label": "把角标固定定位到视口右上角，再根据卡片位置调整数值",
          "feedback": "Fixed 相对视口且脱离卡片，滚动或卡片换行后角标不会继续跟随目标。",
          "correct": false
        },
        {
          "id": "unscoped-absolute",
          "label": "只给角标设置 absolute 和较大的 top、right，不修改父级",
          "feedback": "没有建立预期参照时，角标可能相对更远的包含块定位，页面变化后容易偏离卡片。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A New badge must stay on the top-right of its product card and move and wrap with the card. What positioning is most reliable?",
      "options": [
        {
          "id": "relative-card-absolute-badge",
          "label": "Establish the card as the positioning reference and absolutely position the badge at its top-right",
          "feedback": "Once the parent card is the reference, badge offsets are calculated from it and move with the whole card.",
          "correct": true
        },
        {
          "id": "fixed-to-viewport",
          "label": "Fix the badge to the viewport's top-right and tune offsets to match the card",
          "feedback": "Fixed positioning follows the viewport rather than the card, so scrolling and wrapping separate badge from target.",
          "correct": false
        },
        {
          "id": "unscoped-absolute",
          "label": "Only set absolute with large top and right values and leave every parent unchanged",
          "feedback": "Without the intended reference, the badge may position against a distant containing block and drift as layout changes.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "centering",
    "zh": {
      "title": "空状态的图标和文案高度会随语言变化，但它们要始终在内容区域水平、垂直居中。怎样实现更合适？",
      "options": [
        {
          "id": "parent-axis-centering",
          "label": "让父容器使用 Flex 或 Grid，在水平和垂直两条轴上居中",
          "feedback": "父级对齐不依赖空状态自身尺寸，内容变高、容器变宽时仍能保持双轴居中。",
          "correct": true
        },
        {
          "id": "fixed-margins",
          "label": "根据当前截图给空状态写固定上外边距和左外边距",
          "feedback": "固定偏移只匹配当前尺寸，语言、视口或内容高度变化后中心位置会失准。",
          "correct": false
        },
        {
          "id": "absolute-fixed-offsets",
          "label": "把内容绝对定位到一组固定 top 和 left 数值，不考虑自身大小",
          "feedback": "固定坐标没有补偿元素自身宽高，也不能跟随容器尺寸变化保持真正居中。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An empty state's icon and copy change height by language, but must stay horizontally and vertically centered in the content area. What is the better approach?",
      "options": [
        {
          "id": "parent-axis-centering",
          "label": "Use Flex or Grid on the parent and center along both horizontal and vertical axes",
          "feedback": "Parent alignment does not depend on the empty state's own size, so it remains centered as content and container change.",
          "correct": true
        },
        {
          "id": "fixed-margins",
          "label": "Set fixed top and left margins based on the current screenshot",
          "feedback": "Fixed offsets only fit the current dimensions and drift when language, viewport, or content height changes.",
          "correct": false
        },
        {
          "id": "absolute-fixed-offsets",
          "label": "Absolutely position the content at fixed top and left values without considering its size",
          "feedback": "Fixed coordinates do not compensate for the element's own dimensions or adapt to its container.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "box-model",
    "zh": {
      "title": "两张卡片各占一半宽度，加上左右留白后却挤出页面。应该先检查什么？",
      "options": [
        {
          "id": "box-space",
          "label": "检查卡片的宽度是否还要加上内边距和边框",
          "feedback": "对。卡片实际占用的空间可能超过内容宽度，先看每层尺寸最能解释两列为何排不下。",
          "correct": true
        },
        {
          "id": "search-query",
          "label": "把每张卡片宽度改成 49%，先给左右留白腾出空间",
          "feedback": "把宽度改小可能暂时不溢出，但没有解释尺寸为什么超出。应先确认盒模型和 `box-sizing`，再决定宽度。",
          "correct": false
        },
        {
          "id": "cors",
          "label": "让父容器隐藏横向溢出，把超出页面的部分裁掉",
          "feedback": "隐藏溢出只会遮住问题，卡片内容仍可能被裁切；应先找出宽度、内边距和边框怎样共同占用空间。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Two cards each use `width: 50%` and each add 24px left and right padding, then overflow horizontally. What concept should you inspect first?",
      "options": [
        {
          "id": "box-space",
          "label": "Inspect whether width must also account for padding and border in the box model, then choose the sizing rule",
          "feedback": "Correct. A card's actual space may exceed its content width, so inspecting its layers best explains why two columns no longer fit.",
          "correct": true
        },
        {
          "id": "search-query",
          "label": "Inspect the search keyword because card text may be too long",
          "feedback": "Text length can create another issue, but the shared change here is the padding added to every card.",
          "correct": false
        },
        {
          "id": "cors",
          "label": "Inspect cross-origin settings because layout failures are usually CORS",
          "feedback": "CORS governs cross-origin reads, not CSS size calculation.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "overflow",
    "zh": {
      "title": "卡片文字变长后，底部的“下载完整视频”按钮不见了。应该先检查哪里？",
      "options": [
        {
          "id": "inspect-container",
          "label": "检查哪一层限制了高度或裁掉内容，再决定增高还是滚动",
          "feedback": "对。先确认哪一层发生纵向溢出，再按内容用途选择增高或滚动，才能保证底部按钮可达。",
          "correct": true
        },
        {
          "id": "raise-z",
          "label": "只把按钮的层级调到最高",
          "feedback": "被父容器裁掉的内容通常不会因为提高自身层级重新出现；应先检查边界、高度和 overflow。",
          "correct": false
        },
        {
          "id": "hide-last",
          "label": "按当前最长文案给卡片设置一个更高的固定高度",
          "feedback": "真实内容长度还会变化，删内容只绕过了这一次，不能证明卡片能承受最长内容。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A content card loses its Download video button when the copy becomes longer. What is the best first step?",
      "options": [
        {
          "id": "inspect-container",
          "label": "Find the exact container with a fixed height or `overflow: hidden`, then choose whether the card should grow or, only when bounded height is intentional, scroll internally",
          "feedback": "Correct. Identify the vertical overflow layer first, then choose growth or scrolling so the bottom action stays reachable.",
          "correct": true
        },
        {
          "id": "raise-z",
          "label": "Only set the button's `z-index` to 9999 without checking whether its parent clips it",
          "feedback": "Content clipped by a parent normally does not reappear merely because its own stacking level increases. Inspect the boundary, height, and overflow first.",
          "correct": false
        },
        {
          "id": "hide-last",
          "label": "Delete the last description so this one card happens to fit",
          "feedback": "Real content length changes. Removing content only avoids this instance and does not prove the card handles the longest case.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "typography",
    "zh": {
      "title": "设置页的标题、说明和权限警告几乎一样大，警告还是很浅的灰色。应该怎样调整？",
      "options": [
        {
          "id": "clear-text-roles",
          "label": "建立清楚的标题、正文和警告层级，并保证警告可读",
          "feedback": "不同文字承担不同责任；稳定的字号、字重和对比度能让用户先看到重点，又不会漏掉警告。",
          "correct": true
        },
        {
          "id": "bold-everything",
          "label": "把页面所有文字一起加粗，让每一段都更醒目",
          "feedback": "所有内容权重相同后，标题和警告反而失去区别，用户仍然找不到阅读顺序。",
          "correct": false
        },
        {
          "id": "shrink-supporting-copy",
          "label": "继续缩小说明和警告，只把页面标题放大",
          "feedback": "标题会更突出，但必须阅读的警告仍然难以看清；弱化辅助信息不能牺牲可读性。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A settings page gives its heading, descriptions, and permission warning nearly the same size, while the warning is very light gray. What should change?",
      "options": [
        {
          "id": "clear-text-roles",
          "label": "Define clear heading, body, and warning roles and keep the warning readable",
          "feedback": "Each text role has a different job. Consistent size, weight, and contrast reveal the reading order without hiding the warning.",
          "correct": true
        },
        {
          "id": "bold-everything",
          "label": "Bold every piece of text so that every paragraph becomes more prominent",
          "feedback": "When everything has equal emphasis, headings and warnings lose distinction and the reading order remains unclear.",
          "correct": false
        },
        {
          "id": "shrink-supporting-copy",
          "label": "Make descriptions and warnings smaller and enlarge only the page title",
          "feedback": "The title becomes clearer, but required warning text remains difficult to read. Supporting text still needs sufficient legibility.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "serif-sans",
    "zh": {
      "title": "双语杂志网站想用衬线标题和非衬线正文，英文样张很好看，但中文会回退成浏览器默认字体。下一步怎样做？",
      "options": [
        {
          "id": "test-covered-font-system",
          "label": "选择覆盖中英文的字体和回退方案，用真实样张测试",
          "feedback": "字体风格只有在语言覆盖、字号、字重和行高都可用时才成立，fallback 也应纳入系统。",
          "correct": true
        },
        {
          "id": "english-font-only",
          "label": "只指定英文字体名称，中文继续交给各个浏览器自动选择回退",
          "feedback": "中文回退不受设计控制，双语页面可能出现字重、比例和气质明显不一致。",
          "correct": false
        },
        {
          "id": "mix-by-section",
          "label": "每个同级标题分别挑最有感觉的衬线或非衬线字体",
          "feedback": "没有角色规则的混用会让同一层级失去一致性，也难以维护加载和回退。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A bilingual editorial site wants serif headings and sans-serif body text. English samples work, but Chinese falls back to browser defaults. What comes next?",
      "options": [
        {
          "id": "test-covered-font-system",
          "label": "Choose bilingual fonts and fallbacks, then test them with real copy",
          "feedback": "The style only works when coverage, size, weight, and line-height remain readable, and fallback is part of the system.",
          "correct": true
        },
        {
          "id": "english-font-only",
          "label": "Specify only the English font and let each browser choose its own Chinese fallback",
          "feedback": "Uncontrolled fallback can create visibly different weight, proportion, and tone across the bilingual page.",
          "correct": false
        },
        {
          "id": "mix-by-section",
          "label": "Choose whichever serif or sans font feels best for each heading at the same level",
          "feedback": "Role-free mixing breaks hierarchy consistency and makes font loading and fallback difficult to maintain.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "text-truncate",
    "zh": {
      "title": "订单表的商品标题列宽有限，部分标题很长，但价格和状态必须始终完整。怎样处理？",
      "options": [
        {
          "id": "title-ellipsis-with-access",
          "label": "只截断商品标题并显示省略号，同时提供键盘和触屏可用的全文入口",
          "feedback": "标题可以在有限列宽内缩短，但完整内容仍可访问，价格和状态则保留关键信息。",
          "correct": true
        },
        {
          "id": "truncate-every-column",
          "label": "标题、价格和状态都统一单行截断，让每列宽度完全一致",
          "feedback": "价格和状态是完成判断所需的关键信息，截断后用户可能无法确认订单。",
          "correct": false
        },
        {
          "id": "ellipsis-without-fulltext",
          "label": "给长标题加省略号，完整内容只留在接口数据里，不提供查看入口",
          "feedback": "省略号只说明内容被隐藏；没有全文出口时，用户永远无法获得缺失部分。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An order table has limited product-title width, but price and status must always remain complete. How should long content be handled?",
      "options": [
        {
          "id": "title-ellipsis-with-access",
          "label": "Truncate only the title with an ellipsis and provide a full-text path usable by keyboard and touch",
          "feedback": "The title can shorten in a limited column while remaining accessible, and decision-critical price and status stay complete.",
          "correct": true
        },
        {
          "id": "truncate-every-column",
          "label": "Truncate title, price, and status to one line so every column has identical width",
          "feedback": "Price and status are required for the order judgment, and hiding them can prevent confirmation.",
          "correct": false
        },
        {
          "id": "ellipsis-without-fulltext",
          "label": "Ellipsize long titles, keep the full value only in API data, and provide no viewing path",
          "feedback": "The ellipsis only signals hidden content. Without an outlet, users can never access the missing part.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "divider",
    "zh": {
      "title": "设置页有“账号、安全、通知”三组内容，当前每一行都画了深色横线，页面像表格一样零碎。怎样调整？",
      "options": [
        {
          "id": "spacing-first-group-dividers",
          "label": "先用留白形成分组，只在组与组关系不清时使用克制分割线",
          "feedback": "留白承担主要层级，少量分割线只补充分组变化，页面不会被切成许多小块。",
          "correct": true
        },
        {
          "id": "line-every-row",
          "label": "保留每行分割线，再用不同颜色区分账号、安全和通知",
          "feedback": "更多更醒目的线条会继续强调每一行，而不是帮助用户识别三组主要关系。",
          "correct": false
        },
        {
          "id": "thick-section-rules",
          "label": "把组间横线改成粗黑线，依靠强边界建立层级",
          "feedback": "粗线会抢过标题和内容，分组可以清楚但视觉权重明显过度。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A settings page has Account, Security, and Notifications groups, but every row uses a dark rule and the page feels fragmented. How should it change?",
      "options": [
        {
          "id": "spacing-first-group-dividers",
          "label": "Build groups with whitespace first and use restrained dividers only where the boundary remains unclear",
          "feedback": "Whitespace carries the hierarchy and a few dividers clarify group changes without slicing the page into fragments.",
          "correct": true
        },
        {
          "id": "line-every-row",
          "label": "Keep a divider on every row and color-code Account, Security, and Notifications",
          "feedback": "More prominent lines continue emphasizing individual rows rather than the three important groups.",
          "correct": false
        },
        {
          "id": "thick-section-rules",
          "label": "Replace group dividers with thick black rules to create stronger hierarchy",
          "feedback": "Heavy rules compete with headings and content, giving the boundary more visual weight than it needs.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "border-radius",
    "zh": {
      "title": "同一网站的按钮、输入框和卡片出现了十几种圆角数值，同类组件看起来也不一致。怎样整理？",
      "options": [
        {
          "id": "role-based-radius-tokens",
          "label": "按组件角色建立少量圆角档位，并让同类元素复用同一规则",
          "feedback": "角色化档位减少任意数值，同类组件一致，不同角色仍可根据尺寸保持区分。",
          "correct": true
        },
        {
          "id": "unique-radius-per-component",
          "label": "为每个组件保留独立圆角，只要单独看起来协调即可",
          "feedback": "局部都合理不代表系统一致，新增组件还会继续产生难以维护的数值。",
          "correct": false
        },
        {
          "id": "fifty-percent-everywhere",
          "label": "统一给所有按钮、输入框和卡片设置 50% 圆角",
          "feedback": "50% 会让长方形形成椭圆或过度圆化，不能作为所有组件的通用档位。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "One site uses more than ten radius values across buttons, inputs, and cards, and peers do not match. How should it be organized?",
      "options": [
        {
          "id": "role-based-radius-tokens",
          "label": "Create a small set of role-based radius tokens and reuse one rule for peer components",
          "feedback": "Role tokens remove arbitrary values, align peers, and still let different component sizes remain distinct.",
          "correct": true
        },
        {
          "id": "unique-radius-per-component",
          "label": "Keep a unique radius for every component as long as each one looks balanced alone",
          "feedback": "Local balance does not create system consistency, and every new component adds another value to maintain.",
          "correct": false
        },
        {
          "id": "fifty-percent-everywhere",
          "label": "Set buttons, inputs, and cards all to a 50% radius",
          "feedback": "Fifty percent turns rectangles into ellipses or excessive rounding and cannot serve every role.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "shadow",
    "zh": {
      "title": "页面同时有普通卡片、下拉菜单和弹窗，现在每个元素都使用同样浓重的阴影。怎样建立更清楚的层级？",
      "options": [
        {
          "id": "layered-consistent-shadows",
          "label": "普通内容保持克制，浮层按真实高度增强阴影，并统一光源方向",
          "feedback": "阴影差异对应界面层级，统一方向又让这些层级像来自同一个视觉系统。",
          "correct": true
        },
        {
          "id": "heavy-shadow-everywhere",
          "label": "所有卡片和控件继续使用重阴影，让每个元素都从背景中突出",
          "feedback": "每个元素都浮起会失去相对层级，页面同时产生大量互相竞争的边界。",
          "correct": false
        },
        {
          "id": "text-shadow-for-contrast",
          "label": "给正文文字也加投影，用同一效果补足浅色文字对比度",
          "feedback": "文字阴影会降低字形清晰度，对比度应通过前景和背景颜色解决。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A page has regular cards, dropdowns, and a modal, but every element uses the same heavy shadow. How should hierarchy become clearer?",
      "options": [
        {
          "id": "layered-consistent-shadows",
          "label": "Keep ordinary content restrained, strengthen shadows by actual elevation, and use one light direction",
          "feedback": "Shadow differences map to interface elevation, while consistent direction makes the layers belong to one system.",
          "correct": true
        },
        {
          "id": "heavy-shadow-everywhere",
          "label": "Keep heavy shadows on every card and control so each element stands out",
          "feedback": "When everything floats, relative hierarchy disappears and many competing boundaries fill the page.",
          "correct": false
        },
        {
          "id": "text-shadow-for-contrast",
          "label": "Add the same shadow to body text to improve contrast against light surfaces",
          "feedback": "Text shadow reduces glyph clarity; foreground and background colors should establish readable contrast.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "opacity",
    "zh": {
      "title": "浮层需要半透明背景，让后面的页面隐约可见，但浮层里的文字和按钮必须保持清晰。应该怎样实现？",
      "options": [
        {
          "id": "transparent-background-color",
          "label": "给背景颜色设置透明度，保持文字和按钮本身完全不透明",
          "feedback": "半透明颜色只影响背景层，子内容仍维持原有对比度和点击可见性。",
          "correct": true
        },
        {
          "id": "opacity-on-container",
          "label": "直接降低整个浮层的 opacity，让背景和所有内容一起变淡",
          "feedback": "Opacity 会同时影响子元素，文字和按钮也会失去清晰度，无法满足当前限制。",
          "correct": false
        },
        {
          "id": "invisible-interactive-layer",
          "label": "需要隐藏时设 opacity: 0，继续保留浮层的点击和焦点",
          "feedback": "透明为零不等于移除，元素仍可能挡住页面并接收键盘焦点。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A surface needs a translucent background revealing the page behind, while its text and buttons remain crisp. What should be done?",
      "options": [
        {
          "id": "transparent-background-color",
          "label": "Apply transparency to the background color while keeping text and controls fully opaque",
          "feedback": "A translucent color affects only the background layer, preserving content contrast and visible interaction.",
          "correct": true
        },
        {
          "id": "opacity-on-container",
          "label": "Lower opacity on the entire surface so its background and all content fade together",
          "feedback": "Opacity affects descendants too, reducing the clarity of text and buttons against the requirement.",
          "correct": false
        },
        {
          "id": "invisible-interactive-layer",
          "label": "Set opacity: 0 when hidden but keep the surface clickable and focusable",
          "feedback": "Zero opacity does not remove the element; it may still block the page and receive keyboard focus.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "gradient",
    "zh": {
      "title": "Hero 使用蓝到紫的渐变背景，白色标题在中间清楚，但靠近浅色一端几乎看不见。怎样修正？",
      "options": [
        {
          "id": "contrast-checked-gradient",
          "label": "调整色阶或文字区域，使整段背景都满足可读性，并准备纯色回退",
          "feedback": "渐变每个位置都可能成为文字背景，只有检查完整区域才能保证标题持续可读。",
          "correct": true
        },
        {
          "id": "saturated-text-background",
          "label": "增加更多高饱和颜色，让渐变更醒目并盖过文字问题",
          "feedback": "更强的颜色变化会进一步干扰正文，不能替代前景与各区域的对比度检查。",
          "correct": false
        },
        {
          "id": "repeat-gradient-everywhere",
          "label": "把同一渐变复制到卡片、按钮和页脚，依靠重复形成全站统一",
          "feedback": "重复重点效果会削弱 Hero 的主次，也把对比度风险扩散到更多内容。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A hero uses a blue-to-purple gradient. Its white heading reads well in the center but nearly disappears at the light end. How should it be fixed?",
      "options": [
        {
          "id": "contrast-checked-gradient",
          "label": "Adjust color stops or the text region for readability across the full area and provide a solid fallback",
          "feedback": "Every gradient position can sit behind the heading, so the entire text region must preserve contrast.",
          "correct": true
        },
        {
          "id": "saturated-text-background",
          "label": "Add more saturated colors so the gradient looks stronger and overpowers the text issue",
          "feedback": "Stronger color variation further competes with copy and cannot replace contrast checks across the background.",
          "correct": false
        },
        {
          "id": "repeat-gradient-everywhere",
          "label": "Repeat the same gradient across cards, buttons, and footer to create site-wide consistency",
          "feedback": "Repeating a focal effect weakens hierarchy and spreads the same contrast risk to more content.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "corner-feel",
    "zh": {
      "title": "全站卡片有的接近直角、有的像胶囊，按钮和输入框也各用不同数值。怎样统一“圆角气质”？",
      "options": [
        {
          "id": "role-based-corner-system",
          "label": "按卡片、输入和操作等角色建立少量档位，同类组件保持一致",
          "feedback": "圆角感受来自整套角色关系，少量规则能形成一致气质，也保留必要层级。",
          "correct": true
        },
        {
          "id": "maximum-rounding",
          "label": "把所有元素统一成最大圆角，确保整个网站都显得柔和",
          "feedback": "同一显著圆角会抹平组件角色，长方形内容还可能变成不合适的胶囊或椭圆。",
          "correct": false
        },
        {
          "id": "visual-one-offs",
          "label": "保留现状，遇到不协调的组件就单独微调一个新数值",
          "feedback": "逐项修补会继续扩大规则数量，下一次新增组件仍无法知道该使用哪个档位。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Some cards are nearly square and others pill-like, while buttons and inputs each use different values. How can the site's corner feel become coherent?",
      "options": [
        {
          "id": "role-based-corner-system",
          "label": "Create a small set of role-based levels for cards, inputs, and actions and keep peers consistent",
          "feedback": "Corner feel emerges from role relationships, so a small system creates coherence while retaining necessary hierarchy.",
          "correct": true
        },
        {
          "id": "maximum-rounding",
          "label": "Apply maximum rounding to every element so the whole site feels soft",
          "feedback": "One strong radius erases component roles and may turn rectangular content into inappropriate pills or ellipses.",
          "correct": false
        },
        {
          "id": "visual-one-offs",
          "label": "Keep the current system and introduce a new value whenever one component feels wrong",
          "feedback": "One-off fixes continue expanding the rule set and leave future components without a clear choice.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "backdrop-blur",
    "zh": {
      "title": "吸顶导航想做毛玻璃效果，但当前背景完全不透明，低性能手机滚动时也有卡顿。怎样处理？",
      "options": [
        {
          "id": "translucent-tested-backdrop",
          "label": "使用半透明底色配合适度模糊，并准备可读的纯色降级方案",
          "feedback": "透明底让背后内容参与模糊，克制范围和纯色回退还能兼顾性能与可读性。",
          "correct": true
        },
        {
          "id": "opaque-blurred-nav",
          "label": "保留不透明背景，只继续增加 backdrop blur 的模糊半径",
          "feedback": "不透明背景挡住后方画面，再大的背景模糊也无法形成可见毛玻璃。",
          "correct": false
        },
        {
          "id": "full-page-heavy-blur",
          "label": "把重度模糊扩展到整页内容，让所有区域保持相同风格",
          "feedback": "大面积多层模糊会增加渲染负担，也会让正文和状态失去清晰边界。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A sticky navigation needs a glass effect, but its background is fully opaque and low-end phones stutter while scrolling. What should change?",
      "options": [
        {
          "id": "translucent-tested-backdrop",
          "label": "Combine a translucent surface with restrained blur and provide a readable solid-color fallback",
          "feedback": "Transparency exposes content to the backdrop filter, while limited scope and fallback protect performance and readability.",
          "correct": true
        },
        {
          "id": "opaque-blurred-nav",
          "label": "Keep the opaque background and continue increasing the backdrop-blur radius",
          "feedback": "An opaque surface hides the scene behind it, so increasing backdrop blur cannot produce visible glass.",
          "correct": false
        },
        {
          "id": "full-page-heavy-blur",
          "label": "Extend heavy blur across the whole page so every region uses the same style",
          "feedback": "Large layered blur increases rendering cost and removes clear boundaries from body content and states.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "dark-mode",
    "zh": {
      "title": "背景改成深灰以后，输入框边界和错误提示几乎看不见。下一步应该检查什么？",
      "options": [
        {
          "id": "audit-states",
          "label": "检查文字、边框、错误和焦点在深色背景上是否清楚",
          "feedback": "对。深色模式是整套界面状态，关键操作和反馈都必须继续清楚。",
          "correct": true
        },
        {
          "id": "more-black",
          "label": "复用浅色模式的边框和错误色，只反转背景与正文颜色",
          "feedback": "背景更黑不会自动让边界、提示和焦点可辨认，反而可能降低可读性。",
          "correct": false
        },
        {
          "id": "remove-errors",
          "label": "给所有输入框统一加白色描边，错误状态继续使用同一种边框",
          "feedback": "统一白边可能让输入框可见，却抹掉普通、错误和焦点状态的差异；这些状态需要分别检查对比度。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "After the team changes a page background to dark gray, input borders and error messages are almost invisible. What should happen next?",
      "options": [
        {
          "id": "audit-states",
          "label": "Audit text, borders, inputs, errors, focus, and charts for contrast and state in the dark theme—not only the background",
          "feedback": "Correct. Dark mode is a full interface state, so key actions and feedback must remain clear.",
          "correct": true
        },
        {
          "id": "more-black",
          "label": "Make the background even blacker; no other colors need change",
          "feedback": "A darker background does not automatically make borders, feedback, and focus discernible and may reduce readability.",
          "correct": false
        },
        {
          "id": "remove-errors",
          "label": "Hide error messages to make the dark page cleaner",
          "feedback": "Errors remain feedback needed to complete a task; deleting them does not solve contrast.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "design-token",
    "zh": {
      "title": "三个页面的主按钮都要换成新的品牌色。怎样修改更不容易遗漏？",
      "options": [
        {
          "id": "shared-token",
          "label": "让按钮共用一个命名颜色，只修改这个颜色的值",
          "feedback": "对。共同设计决定有一个来源，改品牌色时不会遗漏分散写死的值。",
          "correct": true
        },
        {
          "id": "replace-literals",
          "label": "在每个组件里分别查找并替换色值",
          "feedback": "短期可行，但相同蓝色可能有不同含义，也容易漏掉某个组件或状态。",
          "correct": false
        },
        {
          "id": "one-off-token",
          "label": "为三个页面分别创建一份按钮颜色变量，再逐页修改",
          "feedback": "令牌应承载可共享的设计决定；每个实例各有一份不会带来一致性。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Primary buttons on three pages all need to change from blue to a new brand color. Which implementation is easier to maintain?",
      "options": [
        {
          "id": "shared-token",
          "label": "Have buttons reference one semantic primary-brand token, change that token's value once, and check every button",
          "feedback": "Correct. The shared design decision has one source, so a brand-color change does not miss scattered hard-coded values.",
          "correct": true
        },
        {
          "id": "replace-literals",
          "label": "Manually find and replace blue hex values in every component",
          "feedback": "This can work briefly, but the same blue may mean different things and it is easy to miss a component or state.",
          "correct": false
        },
        {
          "id": "one-off-token",
          "label": "Create a different color token for every button used once",
          "feedback": "Tokens should carry reusable design decisions; one isolated token per instance does not create consistency.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "contrast",
    "zh": {
      "title": "深色模式上线后有人反馈「正文看着费眼」。下面哪个描述最可能定位到问题？",
      "options": [
        {
          "id": "contrast-ratio",
          "label": "检查正文文字的对比度到没到 4.5:1",
          "feedback": "对。深色模式最常见的翻车就是背景变黑了、文字还是原来那档灰，对比度掉到门槛以下。用比值说话，AI 才知道改到什么程度。",
          "correct": true
        },
        {
          "id": "font-size",
          "label": "把正文字号整体调大两个型号，让字更容易辨认",
          "feedback": "字号变大只是让字更大，颜色差别没变的话还是费眼；先查对比度。",
          "correct": false
        },
        {
          "id": "more-color",
          "label": "给文字换成更亮的品牌色，让它在页面上更显眼",
          "feedback": "换色不等于达标：亮色在黑底上可能够，在灰底上可能不够，还是要按比值检查。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "After dark mode ships, someone says the body text strains their eyes. Which description most likely pinpoints the problem?",
      "options": [
        {
          "id": "contrast-ratio",
          "label": "Check whether body text contrast reaches 4.5:1",
          "feedback": "Correct. The background turned black while the text kept its gray, dropping below the threshold. The ratio gives the AI a concrete target.",
          "correct": true
        },
        {
          "id": "font-size",
          "label": "Bump the body font two sizes larger so words are easier to make out",
          "feedback": "Larger type stays hard to read if the color difference is unchanged; check contrast first.",
          "correct": false
        },
        {
          "id": "more-color",
          "label": "Switch the text to a brighter brand color so it stands out more",
          "feedback": "A different color is not automatically compliant—bright may pass on black and fail on gray; verify by ratio.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "visual-hierarchy",
    "zh": {
      "title": "访客反馈首页「找不到重点」。看了页面发现标题、说明、按钮的字号几乎一样。下一步跟 AI 怎么说？",
      "options": [
        {
          "id": "assign-levels",
          "label": "按主次分层：主标题明显大于说明，主要按钮用底色突出",
          "feedback": "对。让每层拉开差距（大小、颜色、底色），视线自然顺着「标题→说明→按钮」走，重点自己浮出来。",
          "correct": true
        },
        {
          "id": "more-content",
          "label": "在页面顶部再加一条大横幅写「重点在这里」",
          "feedback": "再加一个同样大的元素只会多一个争抢视线的东西，乱上加乱。",
          "correct": false
        },
        {
          "id": "shrink-all",
          "label": "把所有文字整体缩小，页面就显得不挤了",
          "feedback": "全部缩小后彼此的差距没变，依然分不出主次；挤和乱是两个问题。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Visitors say the homepage \"has no focus.\" The title, description, and buttons are nearly the same size. What do you tell the AI?",
      "options": [
        {
          "id": "assign-levels",
          "label": "Layer by importance: headline clearly larger, description secondary, main button filled",
          "feedback": "Correct. Widen the gaps (size, color, fill) so the eye travels title → description → button, and the focus emerges on its own.",
          "correct": true
        },
        {
          "id": "more-content",
          "label": "Add a big banner at the top saying \"the focus is here\"",
          "feedback": "Another same-sized element just joins the fight for attention, adding clutter.",
          "correct": false
        },
        {
          "id": "shrink-all",
          "label": "Shrink all the text so the page feels less crowded",
          "feedback": "Uniformly smaller text keeps the same ratios—still no order. Crowded and unordered are different problems.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "transition",
    "zh": {
      "title": "开关的滑块只需要在开和关两个位置之间平滑移动。怎样实现更合适？",
      "options": [
        {
          "id": "explicit-transition",
          "label": "只给 transform 设置短过渡，并处理减少动态效果偏好",
          "feedback": "变化只有明确的起点和终点；限定属性能避免无关样式被动画，并尊重用户的动态偏好。",
          "correct": true
        },
        {
          "id": "transition-all",
          "label": "给整个开关设置 transition: all，持续一秒",
          "feedback": "all 会让未来新增的颜色、尺寸等属性意外参与动画，一秒也会拖慢即时操作反馈。",
          "correct": false
        },
        {
          "id": "paired-keyframes",
          "label": "分别写“打开”和“关闭”两套关键帧，再按状态播放",
          "feedback": "关键帧能实现运动，但两套方向要重复维护；已有起点和终点时，过渡更直接。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A switch thumb only needs to move smoothly between its on and off positions. Which implementation fits best?",
      "options": [
        {
          "id": "explicit-transition",
          "label": "Apply a short transition only to transform and respect reduced-motion preferences",
          "feedback": "The change has clear start and end states. Limiting the property avoids animating unrelated styles and respects motion preferences.",
          "correct": true
        },
        {
          "id": "transition-all",
          "label": "Set transition: all on the whole switch for one second",
          "feedback": "The all keyword can animate future color or size changes unintentionally, and one second slows direct feedback.",
          "correct": false
        },
        {
          "id": "paired-keyframes",
          "label": "Write separate Open and Close keyframes and choose one for each state",
          "feedback": "Keyframes can move the thumb, but two directions duplicate maintenance when a transition already connects the current and next states.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "animation",
    "zh": {
      "title": "加载图标需要持续旋转，完成后停止；用户开启“减少动态效果”后，图标也不应持续旋转。怎样实现更合适？",
      "options": [
        {
          "id": "stateful-reduced-animation",
          "label": "用关键帧控制旋转，由加载状态启停，并为减少动态效果提供静态反馈",
          "feedback": "自主循环适合 Animation，界面状态决定播放范围，减弱方案保留信息而不强迫持续运动。",
          "correct": true
        },
        {
          "id": "transition-without-state-change",
          "label": "只设置 transition，让图标在没有属性变化时自动持续旋转",
          "feedback": "Transition 需要属性状态发生变化才能运行，不能独立定义连续循环。",
          "correct": false
        },
        {
          "id": "permanent-decorative-loop",
          "label": "让图标在加载结束后继续循环，作为页面保持活力的装饰",
          "feedback": "完成后持续运动不再表达加载状态，只会分散注意力并违背减少动态效果偏好。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A loading icon spins continuously and stops when complete. Under reduced motion, it should not keep spinning. What is the right approach?",
      "options": [
        {
          "id": "stateful-reduced-animation",
          "label": "Use keyframes, start and stop from loading state, and provide static feedback under reduced motion",
          "feedback": "Autonomous looping suits Animation, state defines its lifetime, and the reduced version preserves information without forced motion.",
          "correct": true
        },
        {
          "id": "transition-without-state-change",
          "label": "Use only transition and make the icon rotate continuously without any property change",
          "feedback": "A transition requires a property state change and cannot independently define a continuous loop.",
          "correct": false
        },
        {
          "id": "permanent-decorative-loop",
          "label": "Keep the icon looping after loading so the page continues to feel active",
          "feedback": "Motion after completion no longer communicates loading, distracts attention, and ignores reduced-motion preference.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "easing",
    "zh": {
      "title": "弹窗进入时需要快速响应再平稳停下，退出时不应拖延当前操作。怎样设置速度变化更合理？",
      "options": [
        {
          "id": "semantic-easing-system",
          "label": "进入先尝试快进慢停，退出尝试加速离开，并按距离测试后收敛为变量",
          "feedback": "进入、退出的任务方向不同，按语义测试并复用曲线能兼顾响应感与一致性。",
          "correct": true
        },
        {
          "id": "linear-for-everything",
          "label": "所有进入、退出和持续动画都用 linear，保证每一帧移动相同距离",
          "feedback": "匀速适合持续旋转或进度，对界面位移常显得机械，也没有区分进入和离开。",
          "correct": false
        },
        {
          "id": "random-custom-curves",
          "label": "每个弹窗单独拖一条不同曲线，只按当前画面感觉决定",
          "feedback": "局部可能顺眼，但随意曲线会让同类交互产生不同节奏，难以维护和预测。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A modal should respond quickly and settle smoothly on entry, while exit should not delay the current task. How should its speed change?",
      "options": [
        {
          "id": "semantic-easing-system",
          "label": "Start entry fast and settle, accelerate exit, test against distance, and consolidate curves into tokens",
          "feedback": "Entry and exit serve different directions, so semantic testing plus reuse balances responsiveness and consistency.",
          "correct": true
        },
        {
          "id": "linear-for-everything",
          "label": "Use linear for entry, exit, and continuous animation so every frame moves the same distance",
          "feedback": "Constant speed fits rotation or progress but often feels mechanical for interface movement and ignores direction.",
          "correct": false
        },
        {
          "id": "random-custom-curves",
          "label": "Draw a different custom curve for every modal based only on how the current screen feels",
          "feedback": "Each may look acceptable alone, but arbitrary curves give peer interactions inconsistent and unpredictable rhythm.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "spring",
    "zh": {
      "title": "拖拽卡片松手后需要回到目标位置，同时不能持续晃动。怎样处理更合适？",
      "options": [
        {
          "id": "settling-spring",
          "label": "使用项目现有动画方案做一次轻微过冲并快速停稳，减少动态效果时直接到目标位置",
          "feedback": "对。Spring 适合直接操作后的回位，但回弹要服务于位置变化，并提供稳定的减弱方案。",
          "correct": true
        },
        {
          "id": "permanent-bounce",
          "label": "让卡片持续来回弹动，直到用户再次点击，强化它具有弹性的感觉",
          "feedback": "持续回弹会让状态无法稳定，也会分散用户对后续任务的注意。",
          "correct": false
        },
        {
          "id": "same-spring-everywhere",
          "label": "把同一组强回弹参数应用到页面所有按钮、弹窗和列表项，保持完全一致",
          "feedback": "不同对象的距离、语义和风险不同；强迫所有元素回弹会削弱层级并干扰严肃操作。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A dragged card should return to its target after release without continuing to wobble. What is the better approach?",
      "options": [
        {
          "id": "settling-spring",
          "label": "Use the existing animation system for one small overshoot that settles quickly, and move directly to the target under reduced motion",
          "feedback": "Correct. A spring fits settling after direct manipulation, but the bounce must serve the position change and have a stable reduced alternative.",
          "correct": true
        },
        {
          "id": "permanent-bounce",
          "label": "Keep the card bouncing until the user clicks again so its elasticity remains obvious",
          "feedback": "Continuous bouncing prevents the state from settling and distracts from the next task.",
          "correct": false
        },
        {
          "id": "same-spring-everywhere",
          "label": "Apply the same strong spring to every button, dialog, and list item for complete consistency",
          "feedback": "Objects differ in distance, meaning, and risk; forcing all of them to bounce weakens hierarchy and disrupts serious actions.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "fade",
    "zh": {
      "title": "Toast 出现和离开只需要轻微淡入淡出，但透明为 0 后仍会挡住后面的按钮。应该怎样修？",
      "options": [
        {
          "id": "fade-with-interaction-state",
          "label": "过渡透明度，并在离开完成时同步移除点击、焦点和占位状态",
          "feedback": "Fade 负责视觉变化，交互和最终隐藏状态仍要同步处理，透明元素才不会继续挡路。",
          "correct": true
        },
        {
          "id": "opacity-only-hidden",
          "label": "只把 opacity 设为 0，继续保留原来的层级和点击区域",
          "feedback": "透明度为零并不移除元素，它仍可能覆盖按钮、占据空间或被键盘聚焦。",
          "correct": false
        },
        {
          "id": "directionless-drawer-fade",
          "label": "把所有浮层都统一成纯淡入淡出，包括需要表达侧边来源的抽屉",
          "feedback": "Toast 适合轻淡化，但抽屉等层级变化可能需要位移说明方向，不能用一个效果覆盖所有场景。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A toast only needs a light fade in and out, but after reaching zero opacity it still blocks a button underneath. How should it be fixed?",
      "options": [
        {
          "id": "fade-with-interaction-state",
          "label": "Transition opacity and remove hit testing, focus, and layout presence when exit completes",
          "feedback": "Fade owns the visual change, while interaction and final hidden state must synchronize so transparency stops blocking content.",
          "correct": true
        },
        {
          "id": "opacity-only-hidden",
          "label": "Only set opacity to zero and keep the original layer and click area",
          "feedback": "Zero opacity does not remove an element; it may still cover buttons, occupy space, or receive keyboard focus.",
          "correct": false
        },
        {
          "id": "directionless-drawer-fade",
          "label": "Use pure fading for every overlay, including drawers that need to communicate a side origin",
          "feedback": "A toast suits light fading, but drawers may need movement to explain direction and should not share one universal effect.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "hover",
    "zh": {
      "title": "项目卡片的“删除”入口只在鼠标悬停时出现，手机和键盘都找不到。应该怎样改？",
      "options": [
        {
          "id": "hover-only",
          "label": "保留悬停显示，并让入口出现得更快",
          "feedback": "速度不会解决触屏没有悬停、键盘用户不经过鼠标的问题，入口仍然不可发现。",
          "correct": false
        },
        {
          "id": "multiple-inputs",
          "label": "保留克制的悬停反馈，同时支持聚焦和触屏入口",
          "feedback": "悬停可以强化鼠标反馈，但关键操作还要能通过键盘聚焦和触屏方式发现并执行。",
          "correct": true
        },
        {
          "id": "hide-on-mobile",
          "label": "桌面继续悬停显示，手机端直接移除删除入口",
          "feedback": "移除入口会让手机用户无法完成相同任务；应提供适合触屏的可见菜单或操作。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A card's Delete action appears only on mouse hover, so touch and keyboard users cannot find it. What should change?",
      "options": [
        {
          "id": "hover-only",
          "label": "Keep hover-only visibility but make the action appear faster",
          "feedback": "Speed does not help touch devices without hover or keyboard users who never move a pointer over the card.",
          "correct": false
        },
        {
          "id": "multiple-inputs",
          "label": "Keep restrained hover feedback and also support focus and touch access",
          "feedback": "Hover can reinforce mouse interaction, but an important action also needs discoverable keyboard and touch paths.",
          "correct": true
        },
        {
          "id": "hide-on-mobile",
          "label": "Keep hover on desktop and remove the Delete action on mobile",
          "feedback": "Removing the action prevents mobile users from completing the same task instead of providing a touch-friendly entry.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "active",
    "zh": {
      "title": "提交按钮按下到松开的瞬间没有任何变化，用户经常连续点两次。怎样补充反馈？",
      "options": [
        {
          "id": "brief-press-feedback",
          "label": "在按下期间轻微改变颜色或位置，松开后恢复，并支持键盘激活",
          "feedback": "短暂变化直接回应输入动作，恢复后也不会被误认为持续选中或禁用状态。",
          "correct": true
        },
        {
          "id": "persistent-selected-style",
          "label": "第一次点击后一直保持按下样式，直到用户再次点击",
          "feedback": "持续样式表达的是切换或选中，不是从按下到松开的瞬时反馈。",
          "correct": false
        },
        {
          "id": "hover-only-feedback",
          "label": "只保留悬停变色，按下到松开期间不增加反馈，因为 hover 已经说明能点",
          "feedback": "悬停只提示指针所在位置，不能确认已经按下；键盘激活时也可能没有这层提示。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A submit button shows no change between pointer down and release, so users often click twice. What feedback should be added?",
      "options": [
        {
          "id": "brief-press-feedback",
          "label": "Change color or position slightly while pressed, restore on release, and support keyboard activation",
          "feedback": "A brief change responds directly to input and restores before it can be mistaken for selection or disablement.",
          "correct": true
        },
        {
          "id": "persistent-selected-style",
          "label": "Keep the pressed style after the first click until the user clicks again",
          "feedback": "Persistent styling expresses a toggle or selection rather than the moment from press to release.",
          "correct": false
        },
        {
          "id": "hover-only-feedback",
          "label": "Keep only the hover color and add no press-to-release feedback because hover already shows it is clickable",
          "feedback": "Hover only shows where the pointer is; it does not confirm a press and may not appear during keyboard activation.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "focus",
    "zh": {
      "title": "用键盘按 Tab 时，看不出接下来会操作哪个控件。应该先补什么？",
      "options": [
        {
          "id": "visible-focus",
          "label": "给当前控件显示清楚的选中轮廓",
          "feedback": "对。焦点指示告诉键盘用户当前位置，不能只在鼠标悬停时出现。",
          "correct": true
        },
        {
          "id": "remove-outline",
          "label": "只在鼠标点击控件后显示轮廓，按 Tab 时隐藏",
          "feedback": "看不见焦点会让键盘操作失去位置，无法判断下一次 Enter 会触发什么。",
          "correct": false
        },
        {
          "id": "hover-only",
          "label": "给所有可点击控件加更明显的鼠标悬停底色",
          "feedback": "键盘操作不依赖鼠标位置，hover 不能替代 focus。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A keyboard user cannot tell which control Tab will operate. What should be added first?",
      "options": [
        {
          "id": "visible-focus",
          "label": "Keep a clear visible focus style on interactive controls",
          "feedback": "Correct. Focus indication tells keyboard users their position and cannot be replaced by hover.",
          "correct": true
        },
        {
          "id": "remove-outline",
          "label": "Remove the browser focus outline for a cleaner UI",
          "feedback": "Invisible focus removes position from keyboard operation and hides what Enter will trigger.",
          "correct": false
        },
        {
          "id": "hover-only",
          "label": "Improve hover only because keyboard users also see a mouse",
          "feedback": "Keyboard operation does not depend on pointer position; hover cannot replace focus.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "drag",
    "zh": {
      "title": "任务卡支持拖拽排序，但键盘用户和手抖用户也要能调整顺序。哪套设计更完整？",
      "options": [
        {
          "id": "drag-only",
          "label": "只支持拖拽，并用更大的阴影表示抓取成功",
          "feedback": "视觉反馈能说明拖拽状态，却没有给无法稳定拖动的人提供完成排序的方式。",
          "correct": false
        },
        {
          "id": "drag-and-alternative",
          "label": "显示拖拽手柄和落点，同时提供上移、下移操作",
          "feedback": "拖动过程有清楚反馈，替代按钮又让键盘和精细操作困难的用户完成同一任务。",
          "correct": true
        },
        {
          "id": "whole-row-handle",
          "label": "把整张卡片设成拖拽区，取消文字选择和普通点击",
          "feedback": "扩大热区会和选择文字、点击链接等操作冲突，也没有解决键盘排序问题。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Task cards support drag reordering, but keyboard users and people with unsteady movement must also change the order. Which design is complete?",
      "options": [
        {
          "id": "drag-only",
          "label": "Support dragging only and use a stronger shadow to confirm pickup",
          "feedback": "The shadow explains drag state but provides no way to reorder for someone who cannot drag reliably.",
          "correct": false
        },
        {
          "id": "drag-and-alternative",
          "label": "Show a drag handle and drop position, plus Move up and Move down actions",
          "feedback": "Drag feedback clarifies the gesture, while alternative actions let keyboard and motor-impaired users complete the same task.",
          "correct": true
        },
        {
          "id": "whole-row-handle",
          "label": "Make the whole card draggable and disable text selection and normal clicks",
          "feedback": "A full-card drag target conflicts with selecting text and using links, and it still lacks keyboard reordering.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "disabled",
    "zh": {
      "title": "提交按钮因“公司名称”未填而禁用，但用户只看到一个灰色按钮。怎样让原因更清楚？",
      "options": [
        {
          "id": "tooltip-reason",
          "label": "把原因只放进按钮的鼠标悬停提示里",
          "feedback": "原生禁用按钮通常不能聚焦，触屏也没有稳定悬停；很多用户仍然看不到原因。",
          "correct": false
        },
        {
          "id": "nearby-reason",
          "label": "在缺失字段附近说明要求，并随填写更新按钮状态",
          "feedback": "原因和解决方法都靠近问题来源，键盘与触屏用户也能看见何时满足提交条件。",
          "correct": true
        },
        {
          "id": "gray-only",
          "label": "只降低按钮透明度，但继续让点击触发提交",
          "feedback": "视觉上像禁用、行为却仍可执行，会产生冲突反馈，也可能提交不完整数据。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Submit is disabled because Company name is empty, but people only see a gray button. How can the reason become clear?",
      "options": [
        {
          "id": "tooltip-reason",
          "label": "Put the reason only in a mouse-hover tooltip on the button",
          "feedback": "Native disabled buttons are often not focusable, and touch has no reliable hover, so the reason remains inaccessible.",
          "correct": false
        },
        {
          "id": "nearby-reason",
          "label": "Explain the requirement near the missing field and update the button as it is completed",
          "feedback": "The cause and remedy appear where the problem occurs, and every input method can see when submission becomes available.",
          "correct": true
        },
        {
          "id": "gray-only",
          "label": "Lower the button opacity but still submit when it is clicked",
          "feedback": "The visual state says unavailable while the behavior still runs, creating conflicting feedback and incomplete submissions.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "cursor",
    "zh": {
      "title": "可拖动卡片、文字输入框和禁用按钮现在都显示同一种小手指针。怎样修正？",
      "options": [
        {
          "id": "role-matched-cursors",
          "label": "按真实角色分别使用 grab、text 和 not-allowed，并保留清楚的控件样式",
          "feedback": "指针与操作类型一致能提前提示行为，但控件本身仍需表达可拖、可输入或禁用。",
          "correct": true
        },
        {
          "id": "pointer-everywhere",
          "label": "继续全部使用 pointer，让用户知道这些区域都值得关注",
          "feedback": "Pointer 通常暗示点击，无法区分拖动、文本输入和不可用状态，反而制造错误预期。",
          "correct": false
        },
        {
          "id": "cursor-only-affordance",
          "label": "移除按钮和输入框的视觉差异，只依靠鼠标指针说明功能",
          "feedback": "触屏没有鼠标变化，指针也只是辅助线索，不能替代控件的可见角色和状态。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A draggable card, text field, and disabled button all show the same hand cursor. How should this be corrected?",
      "options": [
        {
          "id": "role-matched-cursors",
          "label": "Use grab, text, and not-allowed by actual role while keeping clear control styling",
          "feedback": "Role-matched cursors preview behavior, while the controls themselves still communicate drag, input, and disabled state.",
          "correct": true
        },
        {
          "id": "pointer-everywhere",
          "label": "Keep pointer everywhere so users know all three regions deserve attention",
          "feedback": "Pointer usually implies clicking and cannot distinguish dragging, text input, and unavailable actions.",
          "correct": false
        },
        {
          "id": "cursor-only-affordance",
          "label": "Remove visual differences between controls and rely only on cursor shape for meaning",
          "feedback": "Touch has no cursor change, and a cursor is only a secondary cue rather than a visible role or state.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "selection",
    "zh": {
      "title": "文章选中文字后，品牌蓝背景和灰色文字几乎融在一起；团队还想禁止正文复制。怎样调整？",
      "options": [
        {
          "id": "readable-scoped-selection",
          "label": "为正文设置高对比选区颜色并允许复制，只在拖拽手柄等区域禁选",
          "feedback": "选区必须清楚可见，正文复制是正常能力；禁选应限制在确实会误触的操作区域。",
          "correct": true
        },
        {
          "id": "brand-color-only",
          "label": "保留品牌蓝和灰字，只要色彩符合品牌规范就不再调整",
          "feedback": "品牌一致不能替代选区可读性，低对比会让用户无法确认自己选中了什么。",
          "correct": false
        },
        {
          "id": "disable-article-selection",
          "label": "给整篇正文设置 user-select: none，彻底避免误选",
          "feedback": "正文并非拖拽控件，全面禁选会阻止复制、引用和辅助阅读等正常任务。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Selected article text uses brand blue behind gray copy and is barely readable, and the team wants to block copying. What should change?",
      "options": [
        {
          "id": "readable-scoped-selection",
          "label": "Use a high-contrast selection for body text, allow copying, and disable selection only on drag handles",
          "feedback": "Selection must remain visible and body copying is normal; prevention belongs only where selection interferes with an operation.",
          "correct": true
        },
        {
          "id": "brand-color-only",
          "label": "Keep the brand blue and gray text because brand compliance is more important",
          "feedback": "Brand consistency cannot replace selection readability; low contrast hides what users selected.",
          "correct": false
        },
        {
          "id": "disable-article-selection",
          "label": "Apply user-select: none to the entire article so accidental selection cannot happen",
          "feedback": "Body copy is not a drag control, and global prevention blocks copying, quoting, and assistive reading tasks.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "domain",
    "zh": {
      "title": "已经买下 example.com，但打开后仍看不到刚做好的网站。下一步应该确认什么？",
      "options": [
        {
          "id": "host-only",
          "label": "只在托管平台添加 example.com，不检查域名当前 DNS",
          "feedback": "托管平台知道域名还不够；DNS 仍可能指向注册商停放页，访问者不会到达新网站。",
          "correct": false
        },
        {
          "id": "deploy-and-connect",
          "label": "确认网站已部署，再按托管说明配置 DNS 指向",
          "feedback": "域名只是名称；还需要可访问的网站服务，并通过 DNS 把名称连接到该服务。",
          "correct": true
        },
        {
          "id": "redirect-temporary",
          "label": "把域名转发到临时地址，让浏览器跳走后再显示网站",
          "feedback": "转发可能打开网站，却不会让正式域名直接承载页面；地址会变化，也绕过了正常绑定。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "You bought example.com, but opening it still does not show the website you built. What should be confirmed next?",
      "options": [
        {
          "id": "host-only",
          "label": "Add example.com at the hosting platform but do not inspect its current DNS",
          "feedback": "The host may know the domain while DNS still points visitors to the registrar's parking page.",
          "correct": false
        },
        {
          "id": "deploy-and-connect",
          "label": "Confirm the site is deployed, then point DNS according to the host's instructions",
          "feedback": "A domain is only a name. A reachable host must serve the site, and DNS must connect the name to that service.",
          "correct": true
        },
        {
          "id": "redirect-temporary",
          "label": "Forward the domain to a temporary address and let the browser navigate away",
          "feedback": "A redirect may open the site but changes the visible address and does not properly bind the custom domain.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "dns",
    "zh": {
      "title": "域名刚改到新服务器，有些人看到新站，有些人仍打开旧站。下一步怎样排查更稳妥？",
      "options": [
        {
          "id": "repeat-edits",
          "label": "每隔几分钟更换一次记录值，直到所有人看到新站",
          "feedback": "旧缓存尚未过期时反复修改会产生更多版本，让不同地点的结果更难判断。",
          "correct": false
        },
        {
          "id": "verify-and-wait",
          "label": "核对当前记录和外部解析结果，再结合 TTL 等待缓存更新",
          "feedback": "先确认新记录本身正确，再区分配置错误与旧缓存未过期，能避免无意义的连续修改。",
          "correct": true
        },
        {
          "id": "clear-one-browser",
          "label": "只清理自己的浏览器缓存，并据此判断全球已经更新",
          "feedback": "浏览器缓存只是其中一层；其他地区的递归解析器仍可能保留旧记录，单点结果不能代表全部。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A domain was just pointed to a new server. Some people see the new site while others still see the old one. What is the safest next check?",
      "options": [
        {
          "id": "repeat-edits",
          "label": "Change the record value every few minutes until everyone sees the new site",
          "feedback": "Repeated edits while old caches remain create more versions and make regional results harder to diagnose.",
          "correct": false
        },
        {
          "id": "verify-and-wait",
          "label": "Verify the current record and external lookup results, then account for TTL caching",
          "feedback": "Confirming the new record first separates a configuration error from an old cached answer and avoids unnecessary changes.",
          "correct": true
        },
        {
          "id": "clear-one-browser",
          "label": "Clear one browser cache and use that result to declare the global update complete",
          "feedback": "Browser cache is only one layer. Recursive resolvers elsewhere may still hold the previous record.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "url",
    "zh": {
      "title": "用户想把“未付款订单第 3 页”发给同事，对方打开后要看到相同结果。网址应该怎样设计？",
      "options": [
        {
          "id": "state-only",
          "label": "筛选和页码只放在页面内存里，分享统一的 /orders",
          "feedback": "内存状态不会随链接传给同事，对方打开后只能看到默认订单列表。",
          "correct": false
        },
        {
          "id": "shareable-query",
          "label": "把筛选和页码写进查询参数，并确认链接可复现",
          "feedback": "路径标明页面，查询参数保存筛选和页码；完整网址能让另一台设备恢复同一结果。",
          "correct": true
        },
        {
          "id": "secret-in-url",
          "label": "把筛选、页码和登录令牌都放进网址后一起发送",
          "feedback": "筛选条件可以分享，但登录令牌属于敏感凭证；放进网址可能进入历史、日志和聊天记录。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Someone wants to send 'unpaid orders, page 3' to a teammate who should open the same result. How should the URL work?",
      "options": [
        {
          "id": "state-only",
          "label": "Keep filters and page number only in memory and share the same /orders URL",
          "feedback": "In-memory state does not travel with the link, so the teammate opens the default order list.",
          "correct": false
        },
        {
          "id": "shareable-query",
          "label": "Put the filter and page in query parameters and verify that the link reproduces the view",
          "feedback": "The path identifies the page and query parameters preserve filters and position for another device.",
          "correct": true
        },
        {
          "id": "secret-in-url",
          "label": "Put the filters, page number, and login token in the URL and send all of it",
          "feedback": "Filters may be shareable, but a login token is sensitive and can leak through history, logs, and messages.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "http",
    "zh": {
      "title": "修改昵称后页面没变化，Network 显示 POST /profile 返回 400。下一步最该检查什么？",
      "options": [
        {
          "id": "inspect-exchange",
          "label": "查看这次请求带了什么，以及 400 响应具体说明了什么",
          "feedback": "HTTP 记录了浏览器实际发送和服务器实际返回的内容；400 表示请求未按约定被接受，应先读证据。",
          "correct": true
        },
        {
          "id": "generic-error",
          "label": "只根据 400 显示“网络错误”，不再查看请求和响应内容",
          "feedback": "400 已经说明服务器收到请求但不接受；忽略具体内容会丢掉字段或格式错误等可修复线索。",
          "correct": false
        },
        {
          "id": "switch-to-get",
          "label": "把 POST 改成 GET，并把昵称写进网址后重新发送",
          "feedback": "保存操作应遵循接口约定；随意换方法会改变请求语义，还没有解决原请求为何被拒绝。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "After changing a nickname, the page does not update and Network shows POST /profile returned 400. What should be checked next?",
      "options": [
        {
          "id": "inspect-exchange",
          "label": "Inspect what the request sent and what the 400 response specifically reports",
          "feedback": "HTTP exposes the actual request and response. A 400 means the request was not accepted, so the evidence comes first.",
          "correct": true
        },
        {
          "id": "generic-error",
          "label": "Use the 400 status to show 'Network error' without reading the request or response",
          "feedback": "A 400 means the server received but rejected the request. Ignoring details loses actionable field or format evidence.",
          "correct": false
        },
        {
          "id": "switch-to-get",
          "label": "Change POST to GET, put the nickname in the URL, and send it again",
          "feedback": "A save should follow the API contract. Changing the method alters semantics without explaining the rejection.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "cookie",
    "zh": {
      "title": "登录接口返回成功，但刷新后用户又变成未登录。下一步最应该检查什么？",
      "options": [
        {
          "id": "cookie-round-trip",
          "label": "检查响应是否设置会话 Cookie，以及刷新后的请求是否带回它",
          "feedback": "对。要沿着设置、保存、携带这三步检查，才能判断服务器为何无法在下一次请求识别会话。",
          "correct": true
        },
        {
          "id": "local-storage-flag",
          "label": "在 localStorage 里写入 isLoggedIn=true，让页面继续显示登录态",
          "feedback": "前端标记只能改变页面显示，不能证明服务器认可会话，也不能代替请求中携带的凭证。",
          "correct": false
        },
        {
          "id": "database-user",
          "label": "只检查数据库里的用户记录，不查看浏览器和请求头",
          "feedback": "用户记录存在不代表这次浏览器请求带有可识别的会话；还要查看 Set-Cookie 和后续 Cookie 头。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The login API returns success, but a refresh makes the user signed out again. What should you inspect first?",
      "options": [
        {
          "id": "cookie-round-trip",
          "label": "Check whether the response sets a session cookie and the refresh request sends it back",
          "feedback": "Correct. Follow the set, store, and send steps to learn why the server cannot recognize the session on the next request.",
          "correct": true
        },
        {
          "id": "local-storage-flag",
          "label": "Write isLoggedIn=true to localStorage so the page keeps showing a signed-in state",
          "feedback": "A frontend flag changes display only. It does not prove that the server accepts a session or replace a request credential.",
          "correct": false
        },
        {
          "id": "database-user",
          "label": "Inspect only the user record in the database, not the browser or request headers",
          "feedback": "An existing user record does not mean this browser request carries a recognizable session. Check Set-Cookie and the later Cookie header too.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "https",
    "zh": {
      "title": "登录页已改成 https://，但浏览器仍警告不安全，控制台显示脚本从 http:// 加载。下一步怎样处理？",
      "options": [
        {
          "id": "valid-all-https",
          "label": "检查证书和域名，并把页面内脚本、图片等资源统一改为 HTTPS",
          "feedback": "主页面和子资源都要通过受保护连接加载，混合内容会被警告或直接拦截。",
          "correct": true
        },
        {
          "id": "hide-browser-warning",
          "label": "保留 HTTP 脚本，在页面内增加“本站可信”说明覆盖提示",
          "feedback": "网页文案不能改变传输方式，也无法阻止浏览器拦截不安全资源。",
          "correct": false
        },
        {
          "id": "lock-means-trusted-business",
          "label": "只要地址栏出现小锁，就把网站标记为公司和交易都已认证",
          "feedback": "HTTPS 保护设备与域名之间的连接，不证明经营者、内容或交易本身可信。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A login page uses https://, but the browser still warns because a script loads from http://. What should happen next?",
      "options": [
        {
          "id": "valid-all-https",
          "label": "Check certificate and domain, then load scripts, images, and other subresources through HTTPS",
          "feedback": "The page and its subresources need protected connections; mixed content may be warned about or blocked.",
          "correct": true
        },
        {
          "id": "hide-browser-warning",
          "label": "Keep the HTTP script and add a This site is trusted notice inside the page",
          "feedback": "Page copy cannot change transport security or stop the browser from blocking insecure resources.",
          "correct": false
        },
        {
          "id": "lock-means-trusted-business",
          "label": "Once a lock appears, label the company and every transaction as verified",
          "feedback": "HTTPS protects the connection to a domain; it does not verify the operator, content, or transaction.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "cdn",
    "zh": {
      "title": "海外用户加载产品图片很慢；接入 CDN 后发布新图，部分地区却仍看到旧版本。怎样处理更完整？",
      "options": [
        {
          "id": "cacheable-versioned-assets",
          "label": "让静态图走 CDN，并使用版本化地址或刷新缓存后验证各地区结果",
          "feedback": "CDN 缩短静态资源路径，版本化或 Purge 则解决节点继续命中旧缓存的问题。",
          "correct": true
        },
        {
          "id": "same-url-longer-cache",
          "label": "继续使用同一个图片地址并延长缓存时间，等待各地区节点自然更新",
          "feedback": "同一地址配合更长缓存会让旧副本保留更久，而且无法确定各节点何时一致。",
          "correct": false
        },
        {
          "id": "origin-only-verification",
          "label": "发布后绕过 CDN 检查源站；源站是新图就视为所有地区已更新",
          "feedback": "源站更新不代表边缘节点已经刷新，仍要检查版本、缓存状态和实际地区结果。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Product images load slowly overseas. After adding a CDN, some regions still show an old image after release. What is the complete response?",
      "options": [
        {
          "id": "cacheable-versioned-assets",
          "label": "Serve static images through the CDN and use versioned URLs or purge before regional verification",
          "feedback": "The CDN shortens delivery for static assets, while versioning or purge prevents nodes from serving an old cache.",
          "correct": true
        },
        {
          "id": "same-url-longer-cache",
          "label": "Keep the same image URL and extend its cache lifetime while waiting for every region to update naturally",
          "feedback": "A longer cache on the same URL preserves old copies for longer and provides no reliable update point.",
          "correct": false
        },
        {
          "id": "origin-only-verification",
          "label": "Bypass the CDN after release and treat a fresh origin image as proof every region has updated",
          "feedback": "A fresh origin does not prove edge caches have refreshed; verify versions, cache state, and real regions.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "port",
    "zh": {
      "title": "终端显示网页已运行在 `http://localhost:3001`，但你仍打开 `localhost:3000` 并看到旧页面。先做什么？",
      "options": [
        {
          "id": "use-reported-port",
          "label": "按终端地址打开 3001，并确认 3000 当前由哪个本地服务提供旧页面",
          "feedback": "对。localhost 是同一台电脑，端口才决定你连到哪项服务。",
          "correct": true
        },
        {
          "id": "change-domain",
          "label": "继续打开 3000，反复重启当前项目，直到旧页面被新页面替换",
          "feedback": "当前项目已经明确监听 3001；重启不能保证另一个占用 3000 的服务消失。",
          "correct": false
        },
        {
          "id": "assume-cache",
          "label": "让网页服务同时监听 3000 和 3001，保证两个地址都显示同一页面",
          "feedback": "这会绕开而不是解释冲突，也可能抢占另一个服务正在使用的端口；应先确认每个端口对应谁。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The terminal says the page is running at `http://localhost:3001`, but you keep opening `localhost:3000` and see an old page. What should you do first?",
      "options": [
        {
          "id": "use-reported-port",
          "label": "Open port 3001 as reported, then identify which local service is still serving the old page on 3000",
          "feedback": "Correct. localhost is the same device; the port decides which service you reach.",
          "correct": true
        },
        {
          "id": "change-domain",
          "label": "Keep opening port 3000 and restart the current project until the new page replaces the old one",
          "feedback": "The current project already reports port 3001. Restarting it does not guarantee that the other service using 3000 disappears.",
          "correct": false
        },
        {
          "id": "assume-cache",
          "label": "Make the page service listen on both 3000 and 3001 so both addresses show the same page",
          "feedback": "That avoids rather than explains the conflict and may take a port another service uses. First identify which service owns each port.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "redirect",
    "zh": {
      "title": "旧地址 `/account` 要永久带到 `/settings/profile`，而且地址栏要显示新地址。怎样处理？",
      "options": [
        {
          "id": "matching-target",
          "label": "配置到新地址的重定向，再访问旧地址检查最终 URL 和页面内容",
          "feedback": "对。重定向会让浏览器继续访问新 URL，地址栏和内容都应反映新的目标。",
          "correct": true
        },
        {
          "id": "homepage-all",
          "label": "让旧地址直接返回个人资料页内容，但继续保留 `/account`",
          "feedback": "这更接近服务器重写：内容可以变化，但地址栏没有被带到新的 URL。",
          "correct": false
        },
        {
          "id": "leave-404",
          "label": "打开旧页面后用前端状态切换到个人资料区域，不改变地址",
          "feedback": "页面内部切换不会把旧 URL 迁移到新 URL，也不能满足地址栏显示新地址的要求。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The old `/account` URL must permanently lead to `/settings/profile`, and the address bar must show the new URL. What should be done?",
      "options": [
        {
          "id": "matching-target",
          "label": "Configure a redirect to the new URL, then visit the old URL and check the final address and content",
          "feedback": "Correct. A redirect makes the browser continue to the new URL, so both the address bar and content should show the new target.",
          "correct": true
        },
        {
          "id": "homepage-all",
          "label": "Return the profile page content at the old URL while keeping `/account` in the address bar",
          "feedback": "That is closer to a server rewrite: the content changes, but the browser is not taken to the new URL.",
          "correct": false
        },
        {
          "id": "leave-404",
          "label": "Open the old page and switch its internal state to the profile section without changing the URL",
          "feedback": "An in-page state change does not migrate the old URL or make the address bar show the new target.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "json",
    "zh": {
      "title": "接口返回 {\"items\":[{\"name\":\"A\"}]}，页面却读取 data.list 并报错。应该先怎样修？",
      "options": [
        {
          "id": "match-structure",
          "label": "按实际 JSON 结构读取 items，并检查每项需要的字段",
          "feedback": "页面读取路径必须与收到的对象和数组层级一致；继续使用前还要确认字段是否齐全。",
          "correct": true
        },
        {
          "id": "change-quotes",
          "label": "把返回内容里的双引号换成单引号，再读取 data.list",
          "feedback": "标准 JSON 字符串使用双引号，而且换引号不会把 items 字段变成 list。",
          "correct": false
        },
        {
          "id": "hide-parse-error",
          "label": "捕获错误后返回空列表，不再查看接口内容",
          "feedback": "页面不会崩溃，但真实数据也被丢掉；应先对齐数据结构，再决定缺失时的降级状态。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An API returns {\"items\":[{\"name\":\"A\"}]}, but the page reads data.list and fails. What should be fixed first?",
      "options": [
        {
          "id": "match-structure",
          "label": "Read items from the actual JSON shape and verify each required field",
          "feedback": "The access path must match the received object and array levels, and required item fields still need validation.",
          "correct": true
        },
        {
          "id": "change-quotes",
          "label": "Replace double quotes with single quotes and keep reading data.list",
          "feedback": "Standard JSON uses double quotes, and changing quote style would not rename the items field to list.",
          "correct": false
        },
        {
          "id": "hide-parse-error",
          "label": "Catch the error, return an empty list, and stop inspecting the response",
          "feedback": "The crash disappears but valid data is discarded. Align the structure before choosing an empty-state fallback.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "cors",
    "zh": {
      "title": "本地网页 `localhost:3000` 调用 API `localhost:4000` 时，控制台报 CORS。哪项排查最准确？",
      "options": [
        {
          "id": "allow-origin",
          "label": "让 API 允许 `http://localhost:3000`，并核对当前请求的方法和凭据规则",
          "feedback": "对。两个端口构成不同源，浏览器需要从 API 响应里看到对应的允许规则。",
          "correct": true
        },
        {
          "id": "disable-login",
          "label": "把网页请求改成 `no-cors`，继续按原方式读取 API 返回的数据",
          "feedback": "`no-cors` 通常只会得到网页脚本无法读取的不透明响应，不能让原来的数据读取继续工作。",
          "correct": false
        },
        {
          "id": "store-token",
          "label": "让 API 允许 `http://localhost:4000`，因为请求最终发到了这个地址",
          "feedback": "CORS 要允许发起请求的网页来源，这里是 3000；4000 是被请求的 API 地址。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A local page at `localhost:3000` calls an API at `localhost:4000` and the console reports CORS. Which investigation is most accurate?",
      "options": [
        {
          "id": "allow-origin",
          "label": "Allow `http://localhost:3000` at the API and verify the request method and credential rules",
          "feedback": "Correct. The two ports are different origins, and the browser needs matching permission in the API response.",
          "correct": true
        },
        {
          "id": "disable-login",
          "label": "Change the page request to `no-cors` and keep reading the API data in the same way",
          "feedback": "`no-cors` normally produces an opaque response that page script cannot read, so the original data flow still does not work.",
          "correct": false
        },
        {
          "id": "store-token",
          "label": "Allow `http://localhost:4000` because that is the address receiving the request",
          "feedback": "CORS must allow the page origin that initiates the request, which is 3000 here; 4000 is the API destination.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "data-validation",
    "zh": {
      "title": "报名表把年龄填成“二十”，页面看起来能提交。更可靠的处理是哪一种？",
      "options": [
        {
          "id": "server-rule",
          "label": "前端提示格式，同时由服务端按年龄范围和数据类型再次校验",
          "feedback": "对。前端提示帮助用户更快改正，服务端校验才是不能绕过的最终判断。",
          "correct": true
        },
        {
          "id": "browser-only",
          "label": "只要浏览器的输入框限制了数字，就直接保存",
          "feedback": "浏览器限制可被绕过，也可能被脚本直接调用接口。",
          "correct": false
        },
        {
          "id": "save-clean",
          "label": "先保存原文，之后再由运营手动清理异常值",
          "feedback": "错误数据进入系统后会污染后续流程，应该在写入前拒绝或明确修正。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A signup form accepts the age “twenty”. Which handling is more reliable?",
      "options": [
        {
          "id": "server-rule",
          "label": "Give browser feedback and validate the type and range again on the server",
          "feedback": "Correct. Browser feedback helps people fix input; server validation is the final check that cannot be bypassed.",
          "correct": true
        },
        {
          "id": "browser-only",
          "label": "Save whenever the browser input restricts the field to numbers",
          "feedback": "Browser restrictions can be bypassed or skipped by a direct API call.",
          "correct": false
        },
        {
          "id": "save-clean",
          "label": "Save the original text and have operations clean invalid values later",
          "feedback": "Invalid data should be rejected or corrected before it enters later workflows.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "enqueue",
    "zh": {
      "title": "上传接口已经返回任务 ID，但转码还没结束。页面应该把这次结果显示成什么？",
      "options": [
        {
          "id": "queued-not-done",
          "label": "显示已入队或处理中，并用任务 ID 查询后续状态",
          "feedback": "对。任务 ID 说明可以追踪这项工作，但入队成功不代表转码结果已经产生。",
          "correct": true
        },
        {
          "id": "completed-on-enqueue",
          "label": "直接显示转码完成，因为任务已经成功写入队列",
          "feedback": "写入队列只表示任务已经被接收；消费者何时开始处理、最终是否成功，都要另行确认。",
          "correct": false
        },
        {
          "id": "wait-in-request",
          "label": "让上传请求一直等到转码结束，再返回任务 ID",
          "feedback": "这会把耗时处理重新塞回上传请求，失去入队后立即返回的好处，也更容易超时。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The upload API returned a task ID, but transcoding is not finished. What should the page show?",
      "options": [
        {
          "id": "queued-not-done",
          "label": "Show queued or processing, and use the task ID to check later status",
          "feedback": "Correct. The task ID makes the work trackable, but enqueueing does not mean transcoding has finished.",
          "correct": true
        },
        {
          "id": "completed-on-enqueue",
          "label": "Show completed because the task was successfully written to the queue",
          "feedback": "Writing to the queue only means the task was accepted. You still need to check when processing starts and whether it succeeds.",
          "correct": false
        },
        {
          "id": "wait-in-request",
          "label": "Keep the upload request open until transcoding finishes, then return the task ID",
          "feedback": "That puts the long operation back inside the upload request, making timeouts more likely.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "idempotency",
    "zh": {
      "title": "同一个支付回调因为超时被发送两次。哪种处理最合适？",
      "options": [
        {
          "id": "stable-key",
          "label": "用稳定事件编号和唯一约束原子地取得处理权，其他请求复用已有结果",
          "feedback": "对。稳定编号识别同一个业务动作，原子领取避免两个并发请求都开始处理，保存结果还能让重试得到一致反馈。",
          "correct": true
        },
        {
          "id": "disable-retry",
          "label": "让接口尽量快速返回，并要求支付平台不要再次重试",
          "feedback": "你不能控制网络丢包和平台重试；没有服务端去重时，重复回调仍可能重复改变订单。"
        },
        {
          "id": "timestamp",
          "label": "只按到达时间判断新旧，把较晚的回调当成新订单处理",
          "feedback": "到达时间不是业务身份，重复回调可能在不同时间到达，仍会被错误处理两次。"
        }
      ]
    },
    "en": {
      "title": "The same payment callback is sent twice after a timeout. Which handling is appropriate?",
      "options": [
        {
          "id": "stable-key",
          "label": "Use a stable event id and unique constraint to claim processing atomically; reuse the result for repeats",
          "feedback": "Correct. The stable id identifies one business action, the atomic claim prevents two concurrent handlers from starting it, and the saved result gives retries a consistent response.",
          "correct": true
        },
        {
          "id": "disable-retry",
          "label": "Return as fast as possible and ask the payment provider never to retry",
          "feedback": "You cannot control packet loss or provider retries; without server-side deduplication, the order can still change twice."
        },
        {
          "id": "timestamp",
          "label": "Accept only by arrival time and treat a later callback as a new order",
          "feedback": "Arrival time is not business identity; the same callback can arrive later and still be processed twice."
        }
      ]
    }
  },
  {
    "termId": "message-consumer",
    "zh": {
      "title": "生产者显示发送成功，但队列里的任务越来越多。先检查哪一部分？",
      "options": [
        {
          "id": "inspect-consumer",
          "label": "检查消费者是否在线、是否收到消息、处理是否失败以及是否反馈结果",
          "feedback": "对。生产者成功发送只说明消息进入了队列，堆积还可能来自无人消费或消费处理不过来。",
          "correct": true
        },
        {
          "id": "resend-producer",
          "label": "让生产者不断重发同一批消息，直到队列数量下降",
          "feedback": "重发会增加堆积，不能证明消费者已经收到或处理了消息。",
          "correct": false
        },
        {
          "id": "delete-queue",
          "label": "直接清空队列，先让监控数字恢复正常",
          "feedback": "清空会丢掉尚未处理的任务，绕过了对消费者状态和失败原因的检查。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The producer reports success, but the queue keeps growing. What should you inspect first?",
      "options": [
        {
          "id": "inspect-consumer",
          "label": "Check whether consumers are online, receiving messages, failing, and reporting results",
          "feedback": "Correct. Producer success only means the message entered the queue; buildup can come from no consumer or slow processing.",
          "correct": true
        },
        {
          "id": "resend-producer",
          "label": "Have the producer resend the same messages until the queue shrinks",
          "feedback": "Resending increases buildup and does not show that a consumer received or processed the messages.",
          "correct": false
        },
        {
          "id": "delete-queue",
          "label": "Clear the queue so the monitoring number looks normal again",
          "feedback": "Clearing can discard unprocessed work and avoids checking the consumer or the failure cause.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "browser-storage",
    "zh": {
      "title": "团队要让用户在手机和电脑都看到同一份已提交订单。数据应主要放在哪里？",
      "options": [
        {
          "id": "server-database",
          "label": "放到受服务端控制的数据库，通过登录后的接口读取；浏览器存储只可辅助本地体验",
          "feedback": "对。订单需要跨设备、可能也需要客服或其他系统读取，不能只依赖当前浏览器。",
          "correct": true
        },
        {
          "id": "local-only",
          "label": "只放 localStorage，因为刷新后还在",
          "feedback": "刷新仍在不表示能跨设备同步，也不能提供服务端的权限与可靠保存。",
          "correct": false
        },
        {
          "id": "page-state",
          "label": "只放页面状态，用户不离开当前页就够了",
          "feedback": "页面状态通常在刷新或关闭后消失，不能代表已提交订单。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A team needs users to see the same submitted orders on both phone and computer. Where should the data primarily live?",
      "options": [
        {
          "id": "server-database",
          "label": "In a server-controlled database, read through authenticated APIs; browser storage can only assist the local experience",
          "feedback": "Correct. Orders must work across devices and may need support staff or other systems, so the current browser cannot be the sole source.",
          "correct": true
        },
        {
          "id": "local-only",
          "label": "Only in localStorage because it survives a refresh",
          "feedback": "Surviving a refresh does not synchronize devices or provide server-side authorization and reliable persistence.",
          "correct": false
        },
        {
          "id": "page-state",
          "label": "Only in page state because the user does not need to leave this page",
          "feedback": "Page state commonly disappears after refresh or close and cannot represent a submitted order.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "database-migration",
    "zh": {
      "title": "准备给已有真实数据的用户表增加一个必填字段 status（不能为空）。最稳妥的工程做法是什么？",
      "options": [
        {
          "id": "safe-migration-steps",
          "label": "分步迁移：先加可空字段，按业务规则回填老数据，空值归零后再收紧为必填",
          "feedback": "对。先兼容旧记录，再完成数据转换，最后增加约束；每一步都有可检查的结果。",
          "correct": true
        },
        {
          "id": "drop-and-recreate",
          "label": "直接删掉生产用户表并重新建表，通知所有老用户重新注册并录入个人信息",
          "feedback": "不对。重建生产表会删除现有记录，不是增加字段所需的迁移方案。",
          "correct": false
        },
        {
          "id": "manual-gui-edit",
          "label": "登录生产数据库的可视化管理界面直接点点加列，只要在线上生效就无需提交代码",
          "feedback": "不对。只在线上手改无法让其他环境复现，也没有进入项目的版本记录和审核流程。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "You need to add a required column status (NOT NULL) to an existing user table with live data. What is the safest migration strategy?",
      "options": [
        {
          "id": "safe-migration-steps",
          "label": "Staged migration: add a nullable column first, backfill existing rows, and enforce NOT NULL after verifying zero NULLs",
          "feedback": "Correct. Keep old rows compatible, complete the data conversion, verify it, and only then enforce the constraint.",
          "correct": true
        },
        {
          "id": "drop-and-recreate",
          "label": "Drop the live user table and recreate it from scratch, asking existing users to sign up and re-enter data",
          "feedback": "Incorrect. Recreating the production table deletes existing records and is not a migration plan for adding one field.",
          "correct": false
        },
        {
          "id": "manual-gui-edit",
          "label": "Manually add the column via a database GUI in production without checking any migration files into git",
          "feedback": "Incorrect. A production-only manual edit cannot be reproduced in other environments or reviewed through the project's versioned workflow.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "sql",
    "zh": {
      "title": "要查“当前用户自己的未完成任务”，哪种查询边界更安全？",
      "options": [
        {
          "id": "scoped-query",
          "label": "按当前用户和未完成状态筛选，并只取页面需要的字段",
          "feedback": "对。查询条件同时限定归属和状态，避免读取无关或他人的数据。",
          "correct": true
        },
        {
          "id": "all-filter-ui",
          "label": "先查全部任务，再由前端隐藏不属于当前用户的行",
          "feedback": "数据已经被发到客户端，前端隐藏不能保护访问边界。",
          "correct": false
        },
        {
          "id": "select-star",
          "label": "只要加未完成条件，使用 SELECT * 没关系",
          "feedback": "即使行范围正确，也不应无必要地取回敏感或不用的字段。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "For a current user’s incomplete tasks, which SQL boundary is safer?",
      "options": [
        {
          "id": "scoped-query",
          "label": "Filter by current user and incomplete status, returning only fields the page needs",
          "feedback": "Correct. The query limits ownership and state so it does not read unrelated or other users’ data.",
          "correct": true
        },
        {
          "id": "all-filter-ui",
          "label": "Query every task and hide other users’ rows in the browser",
          "feedback": "The data is already sent to the client; hiding it there does not protect access.",
          "correct": false
        },
        {
          "id": "select-star",
          "label": "Use SELECT * as long as incomplete status is filtered",
          "feedback": "Even with correct rows, do not return sensitive or unused fields without need.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "transaction",
    "zh": {
      "title": "库存扣减失败，但页面已经显示下单成功。怎样修复？",
      "options": [
        {
          "id": "same-transaction",
          "label": "把创建订单和扣减库存放进同一事务，失败就回滚并返回失败",
          "feedback": "对。两次数据库修改共享同一个提交边界，扣库存失败时不会留下未完成的订单。",
          "correct": true
        },
        {
          "id": "compensate-later",
          "label": "先保存订单，库存失败后再另写一条取消订单记录",
          "feedback": "这仍然是两次独立写入，在补写取消记录期间可能暴露错误状态，不能提供同一个提交边界。"
        },
        {
          "id": "log-only",
          "label": "订单写入成功就显示成功，库存失败只记录日志供之后处理",
          "feedback": "这样页面会把未完成的订单当作成功显示给用户，而且仅记录日志并不能撤销已经写入的订单。"
        }
      ]
    },
    "en": {
      "title": "Inventory deduction fails, but the page already reports success. How should the flow be fixed?",
      "options": [
        {
          "id": "same-transaction",
          "label": "Put order creation and inventory deduction in one transaction; roll back and return a failure if needed",
          "feedback": "Correct. Both database changes share the same commit boundary, so a failed deduction will not leave an incomplete order behind.",
          "correct": true
        },
        {
          "id": "compensate-later",
          "label": "Save the order first, then write a cancellation record if inventory fails",
          "feedback": "These are still separate writes. Writing a cancellation record later can briefly expose an incorrect state and does not provide a shared commit boundary."
        },
        {
          "id": "log-only",
          "label": "Show success after the order write and leave the inventory failure in logs",
          "feedback": "The page would show an incomplete order as successful to the user, and logging the error does not undo the database change."
        }
      ]
    }
  },
  {
    "termId": "database-write",
    "zh": {
      "title": "接口返回 200，但刷新后昵称仍是旧值。先用什么证据排查？",
      "options": [
        {
          "id": "db-and-read",
          "label": "核对写入是否完成并提交，再查刷新请求读取的是否是同一条记录",
          "feedback": "对。数据库记录能证明是否写入，刷新查询目标能证明页面是否读回了同一条数据。",
          "correct": true
        },
        {
          "id": "local-state",
          "label": "只把保存按钮后的本地昵称改成新值，让页面先看起来正确",
          "feedback": "这只能改变当前页面，刷新后仍要依赖真实写入，无法证明数据库有新值。"
        },
        {
          "id": "delay-response",
          "label": "把成功响应延迟几秒，再刷新观察旧值是否偶尔消失",
          "feedback": "延迟不能证明写入是否完成，也不能找出查询错记录、未提交或写入失败的原因。"
        }
      ]
    },
    "en": {
      "title": "The API returns 200, but refreshing the page still shows the old nickname. What evidence should you check first?",
      "options": [
        {
          "id": "db-and-read",
          "label": "Verify the write and commit completed, then check whether refresh reads the same record",
          "feedback": "Correct. The database record proves whether the write happened, and the refresh target proves the page requested that same data.",
          "correct": true
        },
        {
          "id": "local-state",
          "label": "Only update the local nickname after clicking save so the page looks correct first",
          "feedback": "That changes only the current page; refresh still depends on a real write and proves nothing about the database."
        },
        {
          "id": "delay-response",
          "label": "Delay the success response for a few seconds and see whether refresh sometimes changes",
          "feedback": "A delay proves neither that writing finished nor whether the read used the wrong record or an uncommitted value."
        }
      ]
    }
  },
  {
    "termId": "postgresql",
    "zh": {
      "title": "页面只允许选择已有用户，但其他程序也能写订单。怎样防止订单引用不存在的用户编号？",
      "options": [
        {
          "id": "atomic-tx",
          "label": "给订单的用户编号配置外键，写入时由数据库检查",
          "feedback": "外键使所有写入路径都必须满足这条引用规则，无效用户编号会被数据库拒绝。",
          "correct": true
        },
        {
          "id": "single-file",
          "label": "只更新页面的用户下拉列表，让选项保持最新",
          "feedback": "页面筛选不能约束其他程序的写入，数据库里仍可能出现无效引用。",
          "correct": false
        },
        {
          "id": "ui-disable",
          "label": "定期找出没有对应用户的订单，发现后再清理",
          "feedback": "事后清理期间无效订单已经存在，不能保证每次写入都满足关系约束。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The page lists only existing users, but other programs also write orders. How can invalid user references be prevented?",
      "options": [
        {
          "id": "atomic-tx",
          "label": "Configure a foreign key so the database checks each order write",
          "feedback": "Every write path must satisfy the reference rule; nonexistent user IDs are rejected.",
          "correct": true
        },
        {
          "id": "single-file",
          "label": "Keep only the page’s user dropdown synchronized with current users",
          "feedback": "Page options cannot constrain writes made by other programs.",
          "correct": false
        },
        {
          "id": "ui-disable",
          "label": "Periodically find orders with missing users and clean them up",
          "feedback": "Invalid orders exist until cleanup; this does not enforce the relationship on each write.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "backend-framework",
    "zh": {
      "title": "项目已经使用 Next.js Route Handler，现在要增加一条注册接口。怎样处理更合适？",
      "options": [
        {
          "id": "follow-existing-framework",
          "label": "沿用现有路由、校验和错误处理方式，把注册业务放进对应处理函数并验证成功与失败请求",
          "feedback": "对。框架负责统一入口和公共处理，新增业务应沿用项目已有结构，并用真实请求验证结果。",
          "correct": true
        },
        {
          "id": "add-second-framework",
          "label": "另外安装 Express 专门处理注册接口，让两套框架分别维护自己的路由和错误格式",
          "feedback": "同一项目并行维护两套路由和错误处理会增加排错成本，这个需求没有证明需要第二套框架。",
          "correct": false
        },
        {
          "id": "keep-template-only",
          "label": "复制框架示例并返回固定成功结果，等页面完成后再补输入校验和注册业务",
          "feedback": "固定成功结果不能证明注册发生，也会让前端把未完成的业务误认为可用。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A project already uses Next.js Route Handlers and now needs a sign-up endpoint. What is the better approach?",
      "options": [
        {
          "id": "follow-existing-framework",
          "label": "Follow the existing routing, validation, and error patterns, put sign-up logic in the matching handler, and verify success and failure requests",
          "feedback": "Correct. The framework supplies consistent entry and shared handling; new business logic should follow that structure and be verified with real requests.",
          "correct": true
        },
        {
          "id": "add-second-framework",
          "label": "Install Express just for sign-up so two frameworks can maintain separate routes and error formats",
          "feedback": "Maintaining two routing and error systems increases debugging cost, and this request does not justify a second framework.",
          "correct": false
        },
        {
          "id": "keep-template-only",
          "label": "Copy a framework example that always returns success, then add validation and sign-up logic after the page is finished",
          "feedback": "A fixed success response does not prove an account was created and makes unfinished business logic appear usable.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "route",
    "zh": {
      "title": "同一个“文章”资源既要读取列表，也要创建新文章。怎样安排端点更清楚？",
      "options": [
        {
          "id": "method-and-path",
          "label": "GET /api/posts 读取，POST /api/posts 创建，并分别约定结果",
          "feedback": "方法和路径一起表达要处理的资源与动作，两条端点还能分别说明输入、成功和失败状态。",
          "correct": true
        },
        {
          "id": "generic-action",
          "label": "所有功能都发到 /api/do，再让后端从一句文字里猜动作",
          "feedback": "通用入口隐藏了资源和操作，文档、权限、错误处理和单独测试都会变得更难。",
          "correct": false
        },
        {
          "id": "get-for-both",
          "label": "读取和创建都使用 GET /api/posts，只改变请求体内容",
          "feedback": "GET 通常用于读取，而且请求体没有通用语义；创建应按接口约定使用能表达写入的方法。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The same Posts resource needs to list existing posts and create a new one. How should the endpoints be arranged?",
      "options": [
        {
          "id": "method-and-path",
          "label": "Use GET /api/posts to list and POST /api/posts to create, with separate result contracts",
          "feedback": "Method and path together express the resource and action, while each endpoint can define its own inputs and outcomes.",
          "correct": true
        },
        {
          "id": "generic-action",
          "label": "Send every operation to /api/do and let the backend infer the action from free text",
          "feedback": "A generic endpoint hides resources and actions, making documentation, permission checks, errors, and testing harder.",
          "correct": false
        },
        {
          "id": "get-for-both",
          "label": "Use GET /api/posts for both listing and creation and only change the request body",
          "feedback": "GET normally reads data and has no generally defined request-body semantics. Creation needs a method that expresses a write.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "atomicity",
    "zh": {
      "title": "库存只有 1 件，两个请求都读到了 1。哪种改法能保持结果正确？",
      "options": [
        {
          "id": "atomic-update",
          "label": "把库存条件检查和扣减放进一个不可分割的数据库操作",
          "feedback": "对。检查通过的请求才能完成扣减，另一个请求会明确失败，库存不会被卖成两份。",
          "correct": true
        },
        {
          "id": "separate-write",
          "label": "先让两个请求分别读取库存，再各自写入库存减一",
          "feedback": "两个请求可能都基于旧值写入，页面看似成功但会产生两张订单或错误库存。"
        },
        {
          "id": "disable-button",
          "label": "在两个用户的页面上都禁用按钮，等待其中一个请求结束",
          "feedback": "页面按钮状态不能限制另一个用户或重试请求，真正的并发保护必须在共享数据的一侧完成。"
        }
      ]
    },
    "en": {
      "title": "There is only 1 item in stock, and two requests both read 1. Which change keeps the result correct?",
      "options": [
        {
          "id": "atomic-update",
          "label": "Combine the inventory condition check and deduction into one indivisible database operation",
          "feedback": "Correct. Only a request that passes the check completes the deduction; the other fails clearly instead of creating a second sale.",
          "correct": true
        },
        {
          "id": "separate-write",
          "label": "Let both requests read inventory first, then have each write inventory minus one",
          "feedback": "Both requests can write based on the stale value, producing two orders or an incorrect inventory result."
        },
        {
          "id": "disable-button",
          "label": "Disable the button on both users' pages and wait for one request to finish",
          "feedback": "A page button state cannot restrict another user or a retry; concurrency protection must be enforced where the shared data is updated."
        }
      ]
    }
  },
  {
    "termId": "process",
    "zh": {
      "title": "图片任务占用大量内存并偶尔崩溃，目前与 Web 请求运行在同一进程中。哪种改法最符合进程隔离？",
      "options": [
        {
          "id": "separate-process",
          "label": "把图片任务交给独立进程，并分别记录两个 PID 和退出状态",
          "feedback": "对。独立进程有自己的运行环境，图片进程退出后可以单独重启并检查 Web 进程是否仍在响应。",
          "correct": true
        },
        {
          "id": "separate-function",
          "label": "把图片代码拆成另一个函数，但继续在同一进程里调用",
          "feedback": "函数边界不会带来进程级资源隔离，未处理崩溃仍可能让同一进程退出。",
          "correct": false
        },
        {
          "id": "rename-service",
          "label": "把同一个进程改名为 image-service，再继续同时处理 Web 请求",
          "feedback": "名称不会改变运行边界；要查看实际进程 ID、内存和生命周期。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Image work uses lots of memory and sometimes crashes inside the web process. Which change creates process isolation?",
      "options": [
        {
          "id": "separate-process",
          "label": "Run image work in a separate process and record both PIDs and exit states",
          "feedback": "Correct. The image process can exit and restart independently while the web process is checked for continued service.",
          "correct": true
        },
        {
          "id": "separate-function",
          "label": "Move image code to another function but call it in the same process",
          "feedback": "A function boundary does not isolate process resources or lifecycle.",
          "correct": false
        },
        {
          "id": "rename-service",
          "label": "Rename the same process image-service while it still handles web requests",
          "feedback": "A name does not create a runtime boundary; inspect PIDs, memory, and lifecycle.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "thread",
    "zh": {
      "title": "线程 A 和线程 B 属于同一进程，并同时更新共享缓存。最需要先确认什么？",
      "options": [
        {
          "id": "shared-sync",
          "label": "确认共享状态的读写是否有锁、队列或其他同步规则",
          "feedback": "对。同一进程的线程共享内存，并发修改需要明确访问顺序和可观察结果。",
          "correct": true
        },
        {
          "id": "different-pids",
          "label": "确认两个线程一定拥有不同的进程 ID 和完全隔离内存",
          "feedback": "同一进程中的线程通常共享同一个 PID 对应的内存空间。",
          "correct": false
        },
        {
          "id": "more-threads",
          "label": "继续增加线程数量，用更多并发自动消除覆盖问题",
          "feedback": "更多竞争者会增加共享状态冲突，不会自动建立同步。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Thread A and B belong to one process and update a shared cache concurrently. What should you verify first?",
      "options": [
        {
          "id": "shared-sync",
          "label": "Verify that shared reads and writes use a lock, queue, or another synchronization rule",
          "feedback": "Correct. Threads in one process share memory, so concurrent mutation needs an explicit order and evidence.",
          "correct": true
        },
        {
          "id": "different-pids",
          "label": "Verify that each thread has a different process ID and fully isolated memory",
          "feedback": "Threads in one process normally share its memory and process identity.",
          "correct": false
        },
        {
          "id": "more-threads",
          "label": "Add more threads so extra concurrency automatically removes overwrites",
          "feedback": "More competitors do not create synchronization and can increase conflicts.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "coroutine",
    "zh": {
      "title": "一个接口要等待三个外部 API，等待期间线程几乎没有计算。哪种改法更符合协程？",
      "options": [
        {
          "id": "suspend-io",
          "label": "在等待点挂起当前协程，让执行器先推进其他协程，响应后再恢复",
          "feedback": "对。协程用明确暂停点重叠 I/O 等待，不要求每个任务创建新线程。",
          "correct": true
        },
        {
          "id": "new-thread-claim",
          "label": "把异步函数都叫协程，并认定每个协程一定运行在独立线程",
          "feedback": "协程可以在同一线程交替运行，不等于创建了新线程。",
          "correct": false
        },
        {
          "id": "cpu-faster",
          "label": "把大量 CPU 计算包进协程，就认定它一定会并行变快",
          "feedback": "协程本身不提供 CPU 并行，CPU 密集任务仍要考虑调度器和线程或进程资源。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An endpoint waits for three external APIs and does almost no computation while waiting. Which change uses coroutines appropriately?",
      "options": [
        {
          "id": "suspend-io",
          "label": "Suspend at waits, let the executor advance other coroutines, then resume on response",
          "feedback": "Correct. Explicit suspension overlaps I/O waits without requiring a new thread per task.",
          "correct": true
        },
        {
          "id": "new-thread-claim",
          "label": "Call every async function a coroutine and assume each runs on its own thread",
          "feedback": "Coroutines can alternate on one thread and do not imply new threads.",
          "correct": false
        },
        {
          "id": "cpu-faster",
          "label": "Wrap heavy CPU computation in a coroutine and assume it becomes parallel and faster",
          "feedback": "Coroutines do not create CPU parallelism; scheduling and thread or process resources still matter.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "message-queue",
    "zh": {
      "title": "用户在商城下单并支付成功后，需要发送确认短信和生成发票。采用消息队列的最主要好处是什么？",
      "options": [
        {
          "id": "async-decoupling",
          "label": "支付完成后，把短信与开票任务写入队列；接口返回订单结果，后台再分别处理任务",
          "feedback": "对。队列让通知与开票不必占用支付请求，但后台仍要处理失败、重试和最终状态。",
          "correct": true
        },
        {
          "id": "sync-wait",
          "label": "支付接口必须在队列里等待短信和发票全部执行成功，收到全部回执后才能给前端响应",
          "feedback": "不对。这依然是同步阻塞，失去了消息队列异步缓冲和解耦的核心价值。",
          "correct": false
        },
        {
          "id": "immediate-completion",
          "label": "任务只要成功进入消息队列，短信就自动送达用户手机，不再需要任何后台消费者处理",
          "feedback": "不对。入队成功只是暂存，实际发送由后台消费者执行，入队不代表最终完成。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "After paying for an order, SMS confirmation and invoicing are needed. What is the primary benefit of using a message queue?",
      "options": [
        {
          "id": "async-decoupling",
          "label": "After payment completes, the API enqueues SMS and invoicing tasks, returns the order result, and lets workers process them",
          "feedback": "Correct. The tasks no longer occupy the payment request, while workers still need failure, retry, and final-state handling.",
          "correct": true
        },
        {
          "id": "sync-wait",
          "label": "The checkout API must block until the queue confirms that both SMS delivery and invoice generation have succeeded",
          "feedback": "Incorrect. That remains synchronous blocking and defeats the purpose of async queueing.",
          "correct": false
        },
        {
          "id": "immediate-completion",
          "label": "Once a task enters the message queue, the SMS is considered delivered without requiring any worker to process it",
          "feedback": "Incorrect. Enqueueing only stores the job; a background consumer must still execute it.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "side-effect",
    "zh": {
      "title": "预览接口每调用一次就新增报价记录并发邮件。怎样调整最合理？",
      "options": [
        {
          "id": "separate-submit",
          "label": "让预览只计算并返回价格，保存和通知放到用户明确提交的请求里",
          "feedback": "对。预览和提交各自有清楚的触发点，能分别验收没有外部改变和产生一次订单。",
          "correct": true
        },
        {
          "id": "hide-email",
          "label": "保留预览时的写入，只把邮件改成后台静默发送",
          "feedback": "隐藏邮件没有消除副作用，预览仍在不断写记录，用户也无法判断何时产生订单数据。"
        },
        {
          "id": "check-price",
          "label": "只检查预览返回的价格正确，不再观察数据库和邮件结果",
          "feedback": "价格正确不代表没有写库或发信；必须验证预览没有额外改变，提交才有预期副作用。"
        }
      ]
    },
    "en": {
      "title": "The preview endpoint adds a quote and sends email on every call. What is the best adjustment?",
      "options": [
        {
          "id": "separate-submit",
          "label": "Make preview calculate and return the price; save and notify only on explicit submit",
          "feedback": "Correct. Each action has a clear trigger, so you can verify no change during preview and one order during submission.",
          "correct": true
        },
        {
          "id": "hide-email",
          "label": "Keep the preview write but send the email silently in the background",
          "feedback": "Hiding the email does not remove the effect; previews still create records and users cannot tell when order data appeared."
        },
        {
          "id": "check-price",
          "label": "Check only that the preview price is correct and ignore database or email results",
          "feedback": "A correct price does not prove that no record or email was created; both preview and submit effects must be checked."
        }
      ]
    }
  },
  {
    "termId": "lock",
    "zh": {
      "title": "库存只剩 1 件，两个后端实例同时扣减。哪种加锁判断最可靠？",
      "options": [
        {
          "id": "matching-lock",
          "label": "使用能保护同一数据库记录的锁，持有者完成后让等待者重新检查库存",
          "feedback": "对。锁的作用范围要覆盖两个竞争者共同访问的资源，等待者取得锁后仍需基于新状态判断。",
          "correct": true
        },
        {
          "id": "local-only",
          "label": "在每个实例各自创建一把进程内锁，就认定两个实例已经互斥",
          "feedback": "不同实例的进程内锁彼此不可见，不能自动保护同一数据库记录。",
          "correct": false
        },
        {
          "id": "lock-after-write",
          "label": "两个请求先各自扣减库存，写完以后再取得锁记录结果",
          "feedback": "冲突已经发生；锁必须覆盖检查和修改共享资源的临界区。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Only one item remains and two backend instances decrement it concurrently. Which lock decision is reliable?",
      "options": [
        {
          "id": "matching-lock",
          "label": "Use a lock that protects the same database record, then make the waiter recheck stock",
          "feedback": "Correct. The lock scope covers the shared resource, and a waiter evaluates the new state after acquiring it.",
          "correct": true
        },
        {
          "id": "local-only",
          "label": "Create one in-process lock per instance and assume the instances now exclude each other",
          "feedback": "Separate in-process locks cannot see each other and do not protect one shared database record.",
          "correct": false
        },
        {
          "id": "lock-after-write",
          "label": "Let both requests decrement first, then acquire a lock to record what happened",
          "feedback": "The conflict has already happened; the lock must cover the check-and-update critical section.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "race-condition",
    "zh": {
      "title": "优惠券超发只在高并发时偶尔出现。下一步怎样最容易找到竞态证据？",
      "options": [
        {
          "id": "trace-concurrency",
          "label": "用相同输入重复并发运行，记录每次读取和写入的请求标识与时序",
          "feedback": "对。竞态依赖交错时序，重复并发运行和关联日志能还原结果为何偶发变化。",
          "correct": true
        },
        {
          "id": "single-pass",
          "label": "只串行运行一次，看到结果正常就认定没有问题",
          "feedback": "串行运行绕开了竞争时序，一次正常也不能证明并发下稳定。",
          "correct": false
        },
        {
          "id": "hide-error",
          "label": "把超发提示隐藏，让用户重新领取直到成功",
          "feedback": "隐藏表象不会改变共享状态或提供时序证据。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Coupon overselling happens only occasionally under high concurrency. What best gathers race evidence?",
      "options": [
        {
          "id": "trace-concurrency",
          "label": "Repeat the same concurrent run and record request IDs and timing for every read and write",
          "feedback": "Correct. A race depends on interleaving, so repeated concurrent runs and correlated logs reveal why outcomes vary.",
          "correct": true
        },
        {
          "id": "single-pass",
          "label": "Run once serially and treat a normal result as proof that no race exists",
          "feedback": "A serial run avoids the competing timing, and one success cannot prove concurrent stability.",
          "correct": false
        },
        {
          "id": "hide-error",
          "label": "Hide the oversell message and let users retry until one succeeds",
          "feedback": "Hiding the symptom neither fixes shared state nor provides timing evidence.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "backpressure",
    "zh": {
      "title": "图片处理速度低于上传速度，队列长度和内存都在上涨。哪种改法是在使用背压？",
      "options": [
        {
          "id": "slow-upstream",
          "label": "根据下游处理能力暂停或放慢上游发送，并限制未完成任务数量",
          "feedback": "对。背压把下游过慢的反馈传回上游，让未完成工作量保持在可控范围。",
          "correct": true
        },
        {
          "id": "add-capacity-only",
          "label": "只把队列容量调大，让更多任务先堆在内存里",
          "feedback": "容量变大只能延后暴露问题，不能让上游感知下游已经处理不过来。",
          "correct": false
        },
        {
          "id": "fixed-rate-limit",
          "label": "无论下游状态如何，永久把所有用户限制为同一个固定速率",
          "feedback": "这是固定限流的思路，不是根据下游反馈动态调整工作流。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Image processing is slower than uploads, and queue length and memory are rising. Which change uses backpressure?",
      "options": [
        {
          "id": "slow-upstream",
          "label": "Pause or slow publishing based on downstream capacity, and cap unfinished work",
          "feedback": "Correct. Backpressure sends the downstream slowdown back upstream and keeps unfinished work bounded.",
          "correct": true
        },
        {
          "id": "add-capacity-only",
          "label": "Only make the queue larger so more work can accumulate in memory",
          "feedback": "More capacity delays the symptom but does not tell the upstream that downstream is overloaded.",
          "correct": false
        },
        {
          "id": "fixed-rate-limit",
          "label": "Permanently give every user the same fixed rate regardless of downstream state",
          "feedback": "That is fixed rate limiting, not adapting the flow from downstream feedback.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "lease",
    "zh": {
      "title": "当前调度实例失联了，另一个实例准备运行同一任务。什么条件下可以接管？",
      "options": [
        {
          "id": "expired-lease",
          "label": "等原租约过期，再取得新租约和更大的持有代次；写入方原子拒绝旧代次",
          "feedback": "对。到期决定何时可以接管；递增代次由真正接收写入的一方校验，才能挡住恢复后的旧实例。",
          "correct": true
        },
        {
          "id": "wait-forever",
          "label": "只要原实例没有主动释放，就永久等待它回来",
          "feedback": "租约的意义就是让失联持有者最终失去持有权，永久等待会让任务无法恢复。",
          "correct": false
        },
        {
          "id": "take-immediately",
          "label": "不看租约状态，发现心跳暂时没到就立刻开始执行",
          "feedback": "短暂网络延迟不等于租约过期，立即接管可能让两个实例同时执行。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The current scheduler is unreachable and another instance is ready to run the same job. When may it take over?",
      "options": [
        {
          "id": "expired-lease",
          "label": "Confirm expiry, acquire a larger fencing token, and have the write target atomically reject stale tokens",
          "feedback": "Correct. Expiry permits takeover, while the monotonically increasing token lets the write target reject a recovered old holder.",
          "correct": true
        },
        {
          "id": "wait-forever",
          "label": "Wait forever unless the old instance releases the lease itself",
          "feedback": "A lease lets an unreachable holder lose ownership eventually; waiting forever prevents recovery.",
          "correct": false
        },
        {
          "id": "take-immediately",
          "label": "Ignore lease state and start as soon as one heartbeat is late",
          "feedback": "A short network delay is not expiry; immediate takeover can run the job twice.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "distributed-system",
    "zh": {
      "title": "订单服务已经创建订单，但库存服务网络超时。哪种判断更符合分布式系统的排错方式？",
      "options": [
        {
          "id": "trace-partial-failure",
          "label": "按请求标识查看订单和库存两边的结果，区分已完成、超时和可重试步骤",
          "feedback": "对。网络边界允许部分成功，必须把各节点的结果拼起来，才知道订单当前状态和下一步动作。",
          "correct": true
        },
        {
          "id": "assume-atomic",
          "label": "只要订单服务返回成功，就认定库存也一定扣减成功",
          "feedback": "不同服务之间的调用可能在网络中断时产生不同结果；一个服务成功不能直接证明另一个服务完成。",
          "correct": false
        },
        {
          "id": "thread-debug",
          "label": "只检查订单服务的线程数，不查看服务之间的请求和响应",
          "feedback": "线程数无法回答库存服务是否收到请求、处理到哪一步或响应是否在网络中丢失。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The order service created an order, but the inventory service timed out over the network. Which judgment fits a distributed system?",
      "options": [
        {
          "id": "trace-partial-failure",
          "label": "Use the request ID to inspect both services and separate completed, timed-out, and retryable steps",
          "feedback": "Correct. A network boundary allows partial success, so the current order state and next action require evidence from each node.",
          "correct": true
        },
        {
          "id": "assume-atomic",
          "label": "Because the order service returned success, assume inventory was definitely deducted",
          "feedback": "Separate service calls can end differently when the network fails; one service's success does not prove another completed.",
          "correct": false
        },
        {
          "id": "thread-debug",
          "label": "Inspect only the order service's thread count without checking the inter-service request and response",
          "feedback": "Thread count cannot show whether inventory received the request, processed it, or lost the response on the network.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "authentication",
    "zh": {
      "title": "有人带着有效登录态访问“我的订单”。系统首先该确认什么？",
      "options": [
        {
          "id": "identity",
          "label": "确认这次请求对应的是哪个已登录用户",
          "feedback": "对。身份认证回答“你是谁”；之后才能决定这个用户能看什么。",
          "correct": true
        },
        {
          "id": "button",
          "label": "只要页面上显示了用户头像，就认为已经登录",
          "feedback": "头像是前端显示，不是服务端可验证的身份凭据。",
          "correct": false
        },
        {
          "id": "role",
          "label": "先根据用户是管理员还是普通成员决定身份",
          "feedback": "角色属于权限判断，前提是已经可靠地识别出用户。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A request with a valid session opens My Orders. What must the system establish first?",
      "options": [
        {
          "id": "identity",
          "label": "Which signed-in user this request belongs to",
          "feedback": "Correct. Authentication answers who the requester is before the system can decide what they may see.",
          "correct": true
        },
        {
          "id": "button",
          "label": "That the page displays a user avatar",
          "feedback": "An avatar is browser display, not server-verifiable identity.",
          "correct": false
        },
        {
          "id": "role",
          "label": "Whether the user is an admin or a member",
          "feedback": "A role is an authorization decision made after identity is established.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "authorization",
    "zh": {
      "title": "已登录的普通成员请求删除另一个团队的项目。下一步该判断什么？",
      "options": [
        {
          "id": "permission",
          "label": "该用户是否对这一个项目拥有删除权限",
          "feedback": "对。身份已知后，还要针对资源和动作判断是否允许。",
          "correct": true
        },
        {
          "id": "login-again",
          "label": "让他重新输入一次密码，只要成功就允许删除",
          "feedback": "重新认证不能自动授予原本没有的项目权限。",
          "correct": false
        },
        {
          "id": "hide-button",
          "label": "只要前端没有显示删除按钮，就不需要服务端判断",
          "feedback": "用户仍可直接构造请求，服务端必须执行权限检查。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A signed-in member asks to delete a project from another team. What should be checked next?",
      "options": [
        {
          "id": "permission",
          "label": "Whether this user may delete this specific project",
          "feedback": "Correct. Once identity is known, permission must be checked for the resource and action.",
          "correct": true
        },
        {
          "id": "login-again",
          "label": "Ask for the password again and allow deletion if it succeeds",
          "feedback": "Re-authentication does not grant a project permission the person lacks.",
          "correct": false
        },
        {
          "id": "hide-button",
          "label": "Skip a server check if the browser hides the delete button",
          "feedback": "A request can still be constructed directly, so the server must check authorization.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "audit-log",
    "zh": {
      "title": "有人把财务组成员移出了结算权限。哪条证据最适合先用来追查？",
      "options": [
        {
          "id": "audit-record",
          "label": "查找包含操作者、时间、目标权限、动作和结果的审计记录",
          "feedback": "对。审计记录把一次安全相关操作的关键事实放在同一条可追查证据里。",
          "correct": true
        },
        {
          "id": "error-log",
          "label": "只搜索服务端报错日志，看到没有报错就认定没有权限变更",
          "feedback": "权限修改可能完全成功，不一定产生报错；报错日志也通常不会回答是谁主动执行了变更。",
          "correct": false
        },
        {
          "id": "metric-chart",
          "label": "查看当天请求量曲线，按曲线峰值推断是哪位管理员操作的",
          "feedback": "请求量只能显示数量变化，不能关联具体操作者、目标权限和动作结果。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Someone removed a finance-team member's checkout permission. Which evidence should you use first?",
      "options": [
        {
          "id": "audit-record",
          "label": "Find an audit record with the actor, time, target permission, action, and result",
          "feedback": "Correct. An audit record puts the key facts of a security-relevant action into one traceable piece of evidence.",
          "correct": true
        },
        {
          "id": "error-log",
          "label": "Search only server error logs; no error means no permission changed",
          "feedback": "A permission change can succeed without an error, and an error log usually does not identify who intentionally made the change.",
          "correct": false
        },
        {
          "id": "metric-chart",
          "label": "Use the day's request-volume chart to infer which administrator acted from the peak",
          "feedback": "Request volume shows counts, not the actor, target permission, action, or result.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "entitlement",
    "zh": {
      "title": "用户已付款升级，导出仍被拒绝；日志显示服务端权益还是 Free。应先检查哪里？",
      "options": [
        {
          "id": "reauth",
          "label": "刷新登录凭证，先检查账号的登录状态",
          "feedback": "日志已经定位到权益仍是 Free；刷新身份凭证不能证明权益记录已经更新。",
          "correct": false
        },
        {
          "id": "sync",
          "label": "核对权益变更通知是否已更新服务端记录",
          "feedback": "付款完成与权益生效有同步环节；检查这一环节能解释为什么服务端仍按 Free 拒绝。",
          "correct": true
        },
        {
          "id": "ui-only",
          "label": "把前端的套餐标签改成 Pro，再重试导出",
          "feedback": "页面标签不能改变服务端记录，导出请求仍会按 Free 权益判断。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A paid upgrade still cannot export; logs show the server entitlement is Free. What should be checked first?",
      "options": [
        {
          "id": "reauth",
          "label": "Refresh login credentials and inspect the account’s sign-in state",
          "feedback": "The logs already identify stale entitlements. Renewed identity credentials do not prove that access records were updated.",
          "correct": false
        },
        {
          "id": "sync",
          "label": "Check whether the entitlement notification updated the server record",
          "feedback": "Payment and effective access are separated by synchronization; inspect that step to explain the Free decision.",
          "correct": true
        },
        {
          "id": "ui-only",
          "label": "Change the browser plan label to Pro and retry the export",
          "feedback": "Changing a label does not change the server’s entitlement record.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "cache",
    "zh": {
      "title": "你清空本机缓存后已经看到新 CSS，但外地用户仍看到旧版。下一步先查哪里？",
      "options": [
        {
          "id": "shared-cache",
          "label": "检查共享缓存或 CDN 的命中记录、响应头和旧副本是否已失效",
          "feedback": "对。本机已更新而其他地区仍旧，范围指向本地之外的共享缓存层；要用外部请求和响应证据确认。",
          "correct": true
        },
        {
          "id": "browser-storage",
          "label": "继续清理 localStorage，因为所有旧页面都来自浏览器保存的数据",
          "feedback": "localStorage 保存的是网页数据，不是通用的 HTTP 响应副本；而且本机已经更新，现象也超出了单个浏览器。",
          "correct": false
        },
        {
          "id": "source-edit",
          "label": "重新修改 CSS 源文件，不检查请求实际拿到的资源版本",
          "feedback": "源文件可能已经正确，重复修改会掩盖资源到底从哪里返回；应先检查共享缓存和响应头。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Your cleared browser now shows the new CSS, but people elsewhere still see the old version. What should you check first?",
      "options": [
        {
          "id": "shared-cache",
          "label": "Check shared-cache or CDN hits, response headers, and whether the old copy was invalidated",
          "feedback": "Correct. A fresh local result but stale results elsewhere points beyond one browser, so verify the shared cache with external requests and response evidence.",
          "correct": true
        },
        {
          "id": "browser-storage",
          "label": "Keep clearing localStorage because every old page comes from browser-saved data",
          "feedback": "localStorage stores web data, not general HTTP response copies. The local browser is already fresh, and the symptom is wider than one browser.",
          "correct": false
        },
        {
          "id": "source-edit",
          "label": "Edit the CSS source again without checking which resource version the request received",
          "feedback": "The source may already be correct. Re-editing hides where the resource came from; check shared caching and response headers first.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "seo",
    "zh": {
      "title": "旧帮助页改版后要保留原链接带来的访问者。哪个做法更合适？",
      "options": [
        {
          "id": "redirect-old",
          "label": "把旧 URL 重定向到内容真正对应的新页面，并检查新旧链接访问结果",
          "feedback": "对。访问者和搜索系统都会被带到相关的新内容，旧地址不会直接变成死路。",
          "correct": true
        },
        {
          "id": "delete-old",
          "label": "直接删除旧页，不做任何处理，让搜索引擎下次自己更新",
          "feedback": "旧链接的读者会得到错误页，相关信号和可用性都会受影响。",
          "correct": false
        },
        {
          "id": "unrelated-home",
          "label": "把所有旧页都跳到首页，不管原来讲什么",
          "feedback": "首页未必回答原链接的需求。重定向应尽量对应真实替代内容。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "After an old help page is redesigned, visitors from its existing link still need a destination. What approach fits best?",
      "options": [
        {
          "id": "redirect-old",
          "label": "Redirect the old URL to the new page that truly corresponds to its content, then check both old and new link behavior",
          "feedback": "Correct. Visitors and search systems reach relevant replacement content instead of a dead end.",
          "correct": true
        },
        {
          "id": "delete-old",
          "label": "Delete the old page with no handling and let search engines update later",
          "feedback": "People following old links get an error page, harming usability and related signals.",
          "correct": false
        },
        {
          "id": "unrelated-home",
          "label": "Send every old page to the homepage regardless of what it covered",
          "feedback": "The home page may not answer the need expressed by the old link. Redirects should match real replacement content when possible.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "canonical-url",
    "zh": {
      "title": "旧商品地址还需要让用户自动到新地址，不能继续停留在旧地址。应该使用什么？",
      "options": [
        {
          "id": "use-redirect",
          "label": "配置从旧地址到新地址的重定向，并检查地址栏已经改变",
          "feedback": "对。用户必须被带到新地址时，需要重定向并验证最终 URL；canonical 本身通常不会改变地址栏。",
          "correct": true
        },
        {
          "id": "add-canonical-only",
          "label": "只在旧页面 head 里加入指向新地址的 canonical",
          "feedback": "Canonical 是代表版本提示，旧地址通常仍可访问；它不能单独满足自动迁移访问的要求。",
          "correct": false
        },
        {
          "id": "remove-old-url",
          "label": "删除旧页面并让它显示一个找不到页面",
          "feedback": "删除旧地址会造成 404，既没有把用户送到新内容，也没有保留旧链接的迁移关系。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Visitors must automatically reach the new product URL instead of staying on the old one. What should be used?",
      "options": [
        {
          "id": "use-redirect",
          "label": "Configure a redirect from the old URL to the new one and check that the address bar changes",
          "feedback": "Correct. When visitors must reach a new address, use and verify a redirect; a canonical hint normally does not change the address bar.",
          "correct": true
        },
        {
          "id": "add-canonical-only",
          "label": "Add only a canonical link to the new URL in the old page head",
          "feedback": "A canonical is a preferred-version hint, and the old URL usually remains accessible. It does not by itself migrate visitors.",
          "correct": false
        },
        {
          "id": "remove-old-url",
          "label": "Delete the old page and let it show a not-found page",
          "feedback": "Deleting the old URL creates a 404 without sending visitors to the new content or preserving a migration relationship.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "xml-sitemap",
    "zh": {
      "title": "sitemap.xml 里列出了一条已经返回 404 的文章地址。应该怎样处理？",
      "options": [
        {
          "id": "fix-or-remove",
          "label": "修复文章地址或从 sitemap 中移除它，再验证清单里的 URL 都能访问",
          "feedback": "对。Sitemap 应帮助爬虫找到重要且可访问的 URL，不能靠列出错误地址把不存在的页面变出来。",
          "correct": true
        },
        {
          "id": "keep-for-discovery",
          "label": "保留这条地址，因为爬虫看到它后就会自动创建或收录文章",
          "feedback": "Sitemap 只提供发现线索，不创建资源，也不保证收录；404 地址反而给抓取带来错误信号。",
          "correct": false
        },
        {
          "id": "replace-with-navigation",
          "label": "把它换成一个给访客看的文章目录页面，并把目录层级写完整",
          "feedback": "可见目录是信息架构或网站导航，不是 XML Sitemap 的替代物；这里仍要处理机器清单中的错误 URL。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An entry in sitemap.xml points to an article URL that returns 404. What should you do?",
      "options": [
        {
          "id": "fix-or-remove",
          "label": "Fix the article URL or remove it from the sitemap, then verify every listed URL is reachable",
          "feedback": "Correct. A sitemap should help crawlers find important reachable URLs; listing a broken address cannot create the missing page.",
          "correct": true
        },
        {
          "id": "keep-for-discovery",
          "label": "Keep it because a crawler will create or index the article after seeing the URL",
          "feedback": "A sitemap is a discovery hint, not a resource creator or an indexing guarantee. A 404 entry instead gives crawling an error signal.",
          "correct": false
        },
        {
          "id": "replace-with-navigation",
          "label": "Replace it with a visitor-facing article directory and write out the full navigation hierarchy",
          "feedback": "A visible directory is information architecture or site navigation, not a replacement for an XML sitemap. The broken machine URL still needs handling.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "robots-txt",
    "zh": {
      "title": "管理页包含客户数据，团队想在 robots.txt 里写 Disallow 来保护它。应该怎样判断？",
      "options": [
        {
          "id": "protect-with-auth",
          "label": "用认证和授权保护管理页，再视需要用 robots.txt 减少爬虫抓取",
          "feedback": "对。权限系统决定谁能访问数据；robots.txt 只给遵守规则的爬虫抓取建议，不能阻止知道 URL 的人打开页面。",
          "correct": true
        },
        {
          "id": "disallow-is-enough",
          "label": "只写 Disallow，因为爬虫看不到的路径就不会被任何人访问",
          "feedback": "Disallow 不是门锁，普通用户和不遵守规则的程序仍可能请求该地址，敏感数据不能依靠它保护。",
          "correct": false
        },
        {
          "id": "hide-from-navigation",
          "label": "从导航中删除管理页链接，就能替代访问控制",
          "feedback": "隐藏链接只减少被发现的机会，不会检查请求者身份，也不能阻止直接访问已知地址。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An admin page contains customer data, and the team wants to protect it with Disallow in robots.txt. What is the right judgment?",
      "options": [
        {
          "id": "protect-with-auth",
          "label": "Protect the admin page with authentication and authorization, then use robots.txt only to reduce crawling if useful",
          "feedback": "Correct. Permissions decide who can access data; robots.txt is a crawling suggestion for compliant crawlers and cannot block people who know the URL.",
          "correct": true
        },
        {
          "id": "disallow-is-enough",
          "label": "Disallow is enough because a path hidden from crawlers cannot be accessed by anyone",
          "feedback": "Disallow is not a lock. People and non-compliant programs can still request the URL, so sensitive data cannot rely on it.",
          "correct": false
        },
        {
          "id": "hide-from-navigation",
          "label": "Remove the admin page from navigation instead of adding access control",
          "feedback": "Hiding a link only reduces discovery. It does not check identity or prevent direct access to a known URL.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "not-found-page",
    "zh": {
      "title": "访问不存在的文章地址时，页面显示“找不到”，但 Network 显示 200。下一步应该做什么？",
      "options": [
        {
          "id": "return-404",
          "label": "让这个地址返回 404，同时保留说明和返回文章列表的入口",
          "feedback": "对。资源不存在时，页面提示和 HTTP 状态都要表达同一个事实，返回入口再帮助用户恢复。",
          "correct": true
        },
        {
          "id": "show-result",
          "label": "把页面改成结果页，显示“操作失败”并提供重新提交按钮",
          "feedback": "这里没有一个已经结束的提交流程，重试操作也不能让不存在的文章出现；问题首先是资源和状态不匹配。",
          "correct": false
        },
        {
          "id": "redirect-home",
          "label": "把所有不存在的地址重定向到首页，并继续返回成功状态",
          "feedback": "无关地址被送到首页会丢失用户上下文，也掩盖了资源确实不存在的事实；只有有明确替代内容时才应重定向。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An unknown article URL shows a Not Found message, but Network reports 200. What should happen next?",
      "options": [
        {
          "id": "return-404",
          "label": "Return 404 for the URL while keeping the explanation and a link back to the article list",
          "feedback": "Correct. The page message and HTTP status should describe the same missing resource, with a recovery path for the user.",
          "correct": true
        },
        {
          "id": "show-result",
          "label": "Turn it into a result page that says Operation failed and offers a resubmit button",
          "feedback": "No completed submission flow exists here, and retrying cannot create a missing article. The first problem is the resource and status mismatch.",
          "correct": false
        },
        {
          "id": "redirect-home",
          "label": "Redirect every unknown URL to the home page and keep returning a success status",
          "feedback": "Sending unrelated URLs to the home page loses context and hides that the resource is missing. Redirect only when a matching replacement exists.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "env-var",
    "zh": {
      "title": "要把第三方服务密钥用于后端，又不想把它提交到仓库。应该放在哪里？",
      "options": [
        {
          "id": "server-env",
          "label": "放在部署环境的服务端环境变量中，并让本地示例文件不含真实值",
          "feedback": "对。密钥由运行环境提供，仓库只保留变量名和设置说明。",
          "correct": true
        },
        {
          "id": "frontend-config",
          "label": "写进前端配置文件，靠不在界面上显示来隐藏",
          "feedback": "发到浏览器的内容可以被查看，不能存放密钥。",
          "correct": false
        },
        {
          "id": "commented-key",
          "label": "写在代码注释里，发布前再删掉",
          "feedback": "密钥可能已进入提交历史或构建产物，临时写入同样有泄露风险。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A backend needs a third-party secret without committing it. Where should it live?",
      "options": [
        {
          "id": "server-env",
          "label": "In a server-side deployment environment variable, with a real-value-free local example",
          "feedback": "Correct. The runtime supplies the secret; the repository keeps only its name and setup guidance.",
          "correct": true
        },
        {
          "id": "frontend-config",
          "label": "In frontend configuration, hidden by not rendering it",
          "feedback": "Anything shipped to the browser can be inspected and cannot hold a secret.",
          "correct": false
        },
        {
          "id": "commented-key",
          "label": "In a code comment until just before release",
          "feedback": "It can enter history or a build artifact; temporary exposure is still exposure.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "deployment",
    "zh": {
      "title": "代码已经合并，怎样确认用户实际访问到的是新版本？",
      "options": [
        {
          "id": "release-check",
          "label": "确认构建和部署成功，再用生产地址检查版本标识和关键路径",
          "feedback": "对。合并不等于上线；需要同时确认部署平台和真实用户入口。",
          "correct": true
        },
        {
          "id": "merged",
          "label": "看到 main 有新提交就宣布上线",
          "feedback": "构建、部署、缓存或环境配置仍可能让生产停在旧版本。",
          "correct": false
        },
        {
          "id": "local",
          "label": "本地打开正常就算生产已更新",
          "feedback": "本地环境无法证明生产构建和发布结果。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Code is merged. How do you confirm users are actually receiving the new version?",
      "options": [
        {
          "id": "release-check",
          "label": "Confirm build and deployment success, then check a version signal and key path on production",
          "feedback": "Correct. Merge is not release; verify both the platform and the real user entry point.",
          "correct": true
        },
        {
          "id": "merged",
          "label": "Announce release when main has the new commit",
          "feedback": "Build, deployment, cache, or environment configuration can still leave production on an old version.",
          "correct": false
        },
        {
          "id": "local",
          "label": "Count a working local page as production updated",
          "feedback": "Local behavior cannot prove the production build and release.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "web-hosting",
    "zh": {
      "title": "平台已经分配了运行环境，但公网页面还是旧版本。这个现象更应该先查什么？",
      "options": [
        {
          "id": "check-deployment",
          "label": "检查最近一次 Deployment 是否发布了正确版本，并查看公开 URL",
          "feedback": "对。承载环境已经存在，旧版本说明发布动作或版本选择可能有问题；先查 Deployment 的输入和结果。",
          "correct": true
        },
        {
          "id": "add-hosting",
          "label": "再创建一个 Hosting 环境，让两个环境同时提供页面",
          "feedback": "已有承载环境时，新增 Hosting 不会说明为什么旧版本被提供；应先检查发布到哪个环境和哪个版本。",
          "correct": false
        },
        {
          "id": "change-domain-only",
          "label": "只更换域名解析，因为域名本身会决定页面版本",
          "feedback": "域名和解析决定请求去哪里，不会自动把新版本发布进已有环境；版本问题仍要检查 Deployment。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The platform has assigned a runtime environment, but the public page still shows the old version. What should you check first?",
      "options": [
        {
          "id": "check-deployment",
          "label": "Check whether the latest deployment published the right version, then inspect the public URL",
          "feedback": "Correct. The hosting environment exists, so an old version points to the deployment input or result. Check which version was published where.",
          "correct": true
        },
        {
          "id": "add-hosting",
          "label": "Create another hosting environment and have both serve the page",
          "feedback": "An existing environment does not explain the old version. First check the target environment and the version used by the deployment.",
          "correct": false
        },
        {
          "id": "change-domain-only",
          "label": "Change DNS only because the domain determines which version is served",
          "feedback": "A domain and DNS direct requests to a destination, but they do not publish a new version into that environment. Check deployment instead.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "cd",
    "zh": {
      "title": "流水线在 CI 通过后自动部署测试环境，产品负责人确认页面和数据后才点击“发布生产”。这属于哪种 CD？",
      "options": [
        {
          "id": "continuous-delivery",
          "label": "持续交付，因为生产发布前仍有明确的人工批准",
          "feedback": "对。版本已经持续保持可发布，但“发到生产”的决定仍由人作出。",
          "correct": true
        },
        {
          "id": "continuous-deployment",
          "label": "持续部署，因为测试环境部署是自动的",
          "feedback": "测试环境自动部署不决定名称；关键是生产是否在门禁通过后自动发布。",
          "correct": false
        },
        {
          "id": "ci-only",
          "label": "只有 CI，因为流水线跑了测试",
          "feedback": "这里已把通过版本送到可发布状态并安排生产发布，范围超过 CI。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "After CI passes, a pipeline automatically deploys testing; a product owner checks the page and data, then clicks “release production.” Which kind of CD is this?",
      "options": [
        {
          "id": "continuous-delivery",
          "label": "Continuous delivery, because production still has an explicit human approval",
          "feedback": "Correct. The version stays continuously releasable, but a person still decides to release it to production.",
          "correct": true
        },
        {
          "id": "continuous-deployment",
          "label": "Continuous deployment, because testing deployment is automatic",
          "feedback": "Automatic testing deployment does not decide the name; the key is whether production releases automatically after gates pass.",
          "correct": false
        },
        {
          "id": "ci-only",
          "label": "Only CI, because the pipeline ran tests",
          "feedback": "A passing version is being made releasable and released, which goes beyond CI.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "staging",
    "zh": {
      "title": "团队准备测试“删除订单”功能。下面哪个环境安排更安全且更能提供有效证据？",
      "options": [
        {
          "id": "isolated-staging",
          "label": "在独立预发布环境用测试或脱敏订单执行，确认候选版本、近生产配置和删除结果",
          "feedback": "对。它能验证接近生产的完整流程，又不会删除真实用户订单。",
          "correct": true
        },
        {
          "id": "production-data",
          "label": "在生产找一条真实订单删除，确认功能确实能用",
          "feedback": "破坏性操作会影响真实用户和数据，不能用它作为普通验收手段。",
          "correct": false
        },
        {
          "id": "local-only",
          "label": "只在开发者本机看一眼按钮，不需要任何数据或配置验证",
          "feedback": "本地外观不能证明部署后的配置和服务连接正确。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The team plans to test “delete order.” Which environment arrangement is safer and gives useful evidence?",
      "options": [
        {
          "id": "isolated-staging",
          "label": "Use test or de-identified orders in isolated staging, confirming the candidate version, production-like configuration, and deletion result",
          "feedback": "Correct. It tests a production-like full flow without deleting a real customer order.",
          "correct": true
        },
        {
          "id": "production-data",
          "label": "Delete one real production order to prove the feature works",
          "feedback": "A destructive action can affect real users and data and is not ordinary acceptance evidence.",
          "correct": false
        },
        {
          "id": "local-only",
          "label": "Only inspect the button on a developer machine, with no data or configuration check",
          "feedback": "Local appearance does not prove deployed configuration and service connections are right.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "monitoring",
    "zh": {
      "title": "新版本发布十分钟后，登录错误率从 1% 升到 18%。哪种处理最符合监控的作用？",
      "options": [
        {
          "id": "alert-and-correlate",
          "label": "关联异常开始时间、受影响请求和当前版本，再决定关闭开关或回滚",
          "feedback": "对。监控要把异常与可操作的运行事实关联，支持及时止损。",
          "correct": true
        },
        {
          "id": "wait-weekly",
          "label": "先看过去一小时的平均错误率；如果均值不高，就继续观察而不关联版本",
          "feedback": "较长时间的平均值可能稀释发布后的突增，也无法判断异常是否从当前版本开始。",
          "correct": false
        },
        {
          "id": "only-dashboard",
          "label": "看到 18% 就立即回滚，不检查是新版本、外部登录服务还是监控口径变化",
          "feedback": "及时止损重要，但监控还要提供最基本的关联证据，否则可能采取错误动作并掩盖真正来源。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Ten minutes after a release, login error rate rises from 1% to 18%. Which response best uses monitoring?",
      "options": [
        {
          "id": "alert-and-correlate",
          "label": "Correlate when the anomaly started, affected requests, and the running version, then decide whether to disable a flag or roll back",
          "feedback": "Correct. Monitoring links anomalies to actionable runtime facts so impact can stop quickly.",
          "correct": true
        },
        {
          "id": "wait-weekly",
          "label": "Check the one-hour average first; if it is still low, keep watching without correlating a version",
          "feedback": "A longer average can hide a post-release spike and does not show whether the current version started it.",
          "correct": false
        },
        {
          "id": "only-dashboard",
          "label": "Roll back immediately at 18% without checking the new version, external login service, or metric definition",
          "feedback": "Stopping impact matters, but monitoring should still provide basic correlation evidence so the team does not take the wrong action or hide the real source.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "rollback",
    "zh": {
      "title": "v2 发布后登录错误率升高，团队把镜像切回 v1。接下来哪项才算完成回滚验证？",
      "options": [
        {
          "id": "version-and-health",
          "label": "确认线上实际运行 v1，并确认登录错误率和登录成功结果恢复",
          "feedback": "对。既要证明切换目标已运行，也要证明用户受影响的信号已恢复。",
          "correct": true
        },
        {
          "id": "command-only",
          "label": "命令显示成功就结束，不需要看线上指标",
          "feedback": "命令成功不保证流量已经用到目标版本，也不保证异常已经消失。",
          "correct": false
        },
        {
          "id": "new-fix-only",
          "label": "立刻开始修 v2，不再关心当前线上状态",
          "feedback": "向前修复可以后续进行，但当前需要先证实影响已经被止住。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "After v2 raises login error rate, the team switches the image back to v1. What completes rollback verification?",
      "options": [
        {
          "id": "version-and-health",
          "label": "Confirm production is actually running v1 and that login error rate and login success recover",
          "feedback": "Correct. Prove both that the target is running and that the user-impact signal recovered.",
          "correct": true
        },
        {
          "id": "command-only",
          "label": "End when the command reports success, without checking production metrics",
          "feedback": "A successful command does not guarantee traffic uses the target version or the anomaly disappeared.",
          "correct": false
        },
        {
          "id": "new-fix-only",
          "label": "Immediately start fixing v2 and ignore the current live state",
          "feedback": "A forward fix can follow, but first prove the present impact has stopped.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "feature-flag",
    "zh": {
      "title": "新推荐页已部署，但团队想先让内部员工试用，出现错误能立即让大家回旧页且不重新部署。最适合的是？",
      "options": [
        {
          "id": "flag-rollout",
          "label": "给新推荐路径加功能开关，只对内部员工开启；异常时关闭开关",
          "feedback": "对。开关能控制谁进入已部署的新路径，并快速停止这条路径。",
          "correct": true
        },
        {
          "id": "full-rollback",
          "label": "每次只想调整试用范围都回滚整个版本",
          "feedback": "回滚影响整个版本，不能细致控制同一版本中谁看新功能。",
          "correct": false
        },
        {
          "id": "delete-code",
          "label": "先把旧页代码永久删除，等出问题再恢复",
          "feedback": "这会失去快速回到旧路径的能力，也不是渐进开放。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The new recommendation page is deployed, but the team wants only employees to try it first and everyone to return to the old page immediately on error without redeploying. What fits best?",
      "options": [
        {
          "id": "flag-rollout",
          "label": "Add a feature flag for the new path, enable it only for employees, and disable it on anomaly",
          "feedback": "Correct. A flag controls who enters an already-deployed new path and can stop that path quickly.",
          "correct": true
        },
        {
          "id": "full-rollback",
          "label": "Roll back the entire version whenever the trial audience needs adjustment",
          "feedback": "Rollback affects a whole version and cannot finely control who sees one feature in it.",
          "correct": false
        },
        {
          "id": "delete-code",
          "label": "Permanently delete old-page code first, then restore it if there is a problem",
          "feedback": "That removes the ability to return quickly to the old path and is not gradual exposure.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "canary-release",
    "zh": {
      "title": "结账服务 v2 已承接 5% 流量，错误率达到 7%，超过 2% 阈值。下一步怎样处理？",
      "options": [
        {
          "id": "stop-and-return",
          "label": "停止扩大，把 v2 流量退回 v1，并确认错误率和结账成功率恢复",
          "feedback": "对。金丝雀已经提供了异常证据，应先限制影响并验证稳定版恢复。",
          "correct": true
        },
        {
          "id": "expand-anyway",
          "label": "继续扩大到 100%，等样本更多以后再判断",
          "feedback": "指标已经越过预设门槛，继续扩大只会让更多用户进入异常版本。",
          "correct": false
        },
        {
          "id": "deploy-success",
          "label": "只要部署任务显示成功，就保持 5% 流量不再处理",
          "feedback": "部署成功只说明版本已经运行，不能推翻真实流量下的错误率证据。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Checkout v2 is serving 5% of traffic, but its error rate reaches 7%, above the 2% threshold. What should happen next?",
      "options": [
        {
          "id": "stop-and-return",
          "label": "Stop expansion, return v2 traffic to v1, and confirm error rate and checkout success recover",
          "feedback": "Correct. The canary produced failure evidence, so limit impact first and verify recovery on the stable version.",
          "correct": true
        },
        {
          "id": "expand-anyway",
          "label": "Expand to 100% anyway and wait for a larger sample",
          "feedback": "The signal already crossed the agreed threshold; expanding would expose more people to the faulty release.",
          "correct": false
        },
        {
          "id": "deploy-success",
          "label": "Keep 5% traffic indefinitely because the deployment job succeeded",
          "feedback": "A successful deployment only proves the version is running; it does not override error evidence from real traffic.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "blue-green-deployment",
    "zh": {
      "title": "绿色环境 v2 已通过页面检查，但它执行了旧版 v1 无法读取的数据库变更。现在应该怎样做？",
      "options": [
        {
          "id": "resolve-compatibility",
          "label": "先解决数据向前向后兼容和回退方案，再决定是否切生产流量",
          "feedback": "对。应用流量能切回蓝色环境，不代表旧版还能读取已经变化的数据。",
          "correct": true
        },
        {
          "id": "switch-because-green",
          "label": "直接切到绿色环境，因为蓝绿部署本身保证随时可以回退",
          "feedback": "蓝绿部署只提供环境和流量切换能力，不能自动保证数据结构兼容。",
          "correct": false
        },
        {
          "id": "delete-blue",
          "label": "切流前先删除蓝色环境，避免两套环境占用资源",
          "feedback": "过早删除蓝色环境会失去快速切回路径，也违背本次蓝绿部署的止损目标。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Green v2 passes page checks, but it applies a database change that old blue v1 cannot read. What should happen now?",
      "options": [
        {
          "id": "resolve-compatibility",
          "label": "Resolve forward and backward data compatibility and the recovery plan before switching production traffic",
          "feedback": "Correct. Traffic can return to blue, but the old application may not understand data already changed by v2.",
          "correct": true
        },
        {
          "id": "switch-because-green",
          "label": "Switch immediately because blue-green guarantees rollback",
          "feedback": "Blue-green provides environments and traffic switching; it does not make schema changes automatically compatible.",
          "correct": false
        },
        {
          "id": "delete-blue",
          "label": "Delete blue before switching to avoid running two environments",
          "feedback": "Deleting blue too early removes the quick return path and defeats the mitigation goal.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "serverless",
    "zh": {
      "title": "小官网只有联系表单：收到提交后保存内容并发通知，不想维护服务器。哪种方案更合适？",
      "options": [
        {
          "id": "short-stateless-function",
          "label": "使用短时 Serverless 函数，把数据保存到外部服务并配置超时与密钥",
          "feedback": "任务按请求触发且时间短，平台可托管运行环境；持久数据和密钥仍需使用合适服务。",
          "correct": true
        },
        {
          "id": "memory-as-database",
          "label": "把每次表单内容保存在函数内存里，之后请求继续读取",
          "feedback": "不同请求可能落到不同实例，实例也会释放，函数内存不能当作持久数据库。",
          "correct": false
        },
        {
          "id": "long-running-worker",
          "label": "让一次函数调用持续运行几小时，顺便处理视频转码",
          "feedback": "短时函数受执行时长和资源限制，长任务需要匹配的队列或计算服务。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A small site only needs a contact form that saves submissions and sends notifications, without server maintenance. Which approach fits?",
      "options": [
        {
          "id": "short-stateless-function",
          "label": "Use a short serverless function, persist data externally, and configure timeouts and secrets",
          "feedback": "The task is brief and request-driven, so the platform can manage runtime while persistence and secrets use appropriate services.",
          "correct": true
        },
        {
          "id": "memory-as-database",
          "label": "Store form submissions in function memory and read them from later requests",
          "feedback": "Requests may reach different instances and instances disappear, so function memory is not durable storage.",
          "correct": false
        },
        {
          "id": "long-running-worker",
          "label": "Keep one invocation running for hours and use it for video transcoding too",
          "feedback": "Short functions have duration and resource limits; long jobs require suitable queues or compute services.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "server-log",
    "zh": {
      "title": "线上订单接口偶发 500，现有日志只有“出错了”，客服给出发生时间和订单号。下一步怎样改进排查？",
      "options": [
        {
          "id": "searchable-safe-context",
          "label": "记录时间、请求 ID、动作、耗时和错误堆栈，并按线索搜索复现",
          "feedback": "可搜索上下文能串起一次请求的关键步骤，错误堆栈则帮助定位真正失败位置。",
          "correct": true
        },
        {
          "id": "log-full-secrets",
          "label": "把密码、Token、Cookie 和完整订单都打印出来方便比对",
          "feedback": "敏感信息会进入长期日志和更多访问范围，排错不能以泄露用户凭证为代价。",
          "correct": false
        },
        {
          "id": "generic-message-only",
          "label": "继续只写“出错了”，但把同一句日志提高到 error 级别",
          "feedback": "提高级别不会增加动作、对象或原因，仍无法与客服提供的事件对应。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A production order API intermittently returns 500, and logs only say Error. Support provides time and order number. How should investigation improve?",
      "options": [
        {
          "id": "searchable-safe-context",
          "label": "Record time, request ID, action, duration, and stack, then search and reproduce from those clues",
          "feedback": "Searchable context connects the steps of one request, and the stack helps locate the actual failure.",
          "correct": true
        },
        {
          "id": "log-full-secrets",
          "label": "Print passwords, tokens, cookies, and the complete order to make comparison easier",
          "feedback": "Sensitive data would enter durable logs and broader access, making diagnosis itself a credential leak.",
          "correct": false
        },
        {
          "id": "generic-message-only",
          "label": "Keep only Error but raise the same message to error severity",
          "feedback": "A higher level adds no action, object, or cause and still cannot connect to the reported incident.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "circuit-breaker",
    "zh": {
      "title": "支付依赖已经连续失败，新的结算请求还在不断等待。熔断器下一步应该怎样做？",
      "options": [
        {
          "id": "open-fast-fail",
          "label": "进入 Open，快速失败或返回降级结果，稍后再以 Half-Open 探测",
          "feedback": "对。打开状态先隔离故障，半开状态用有限探测判断依赖是否恢复。",
          "correct": true
        },
        {
          "id": "retry-forever",
          "label": "继续增加重试次数，让每个请求都等到支付成功",
          "feedback": "无限重试会继续占用自己的资源；熔断器的作用正是停止把故障扩散到调用方。",
          "correct": false
        },
        {
          "id": "close-immediately",
          "label": "立即回到 Closed，并把所有新请求照常发送给失败依赖",
          "feedback": "连续失败时立即关闭会重新放大故障，应该先打开并经过探测。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The payment dependency keeps failing while new checkout requests wait. What should the circuit breaker do next?",
      "options": [
        {
          "id": "open-fast-fail",
          "label": "Enter Open, fail fast or degrade, then probe later in Half-Open",
          "feedback": "Correct. Open isolates the failure; Half-Open uses limited probes to learn whether the dependency recovered.",
          "correct": true
        },
        {
          "id": "retry-forever",
          "label": "Keep increasing retries so every request waits for payment success",
          "feedback": "Unlimited retries consume caller resources; the breaker exists to stop the failure spreading.",
          "correct": false
        },
        {
          "id": "close-immediately",
          "label": "Return to Closed immediately and send every new request to the failing dependency",
          "feedback": "Closing immediately would amplify the failure again; probe recovery before returning to normal calls.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "single-instance",
    "zh": {
      "title": "单实例服务正在重启，用户暂时打不开页面。哪种判断和验收最准确？",
      "options": [
        {
          "id": "restart-window",
          "label": "承认重启期间可能短暂不可用，确认服务恢复后持久化数据仍能读到",
          "feedback": "对。单实例的可用性风险集中在唯一副本，但持久化数据是否保留要单独验证。",
          "correct": true
        },
        {
          "id": "singleton-code",
          "label": "把代码里的单例对象删掉，就能让部署变成多实例并避免中断",
          "feedback": "单例模式是代码结构，不能改变运行环境中服务副本的数量或重启行为。",
          "correct": false
        },
        {
          "id": "memory-persistence",
          "label": "只要服务重新显示在线，重启前放在内存里的任务就一定还在",
          "feedback": "进程内存通常会随实例停止而消失；恢复在线不能证明内存任务被保存。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A single-instance service is restarting and users temporarily cannot open the page. Which judgment and verification are accurate?",
      "options": [
        {
          "id": "restart-window",
          "label": "Accept a brief restart outage and confirm durable data is readable after recovery",
          "feedback": "Correct. Availability risk is concentrated in the only replica, while data durability must be verified separately.",
          "correct": true
        },
        {
          "id": "singleton-code",
          "label": "Delete the Singleton object in code to make deployment multi-instance and avoid the interruption",
          "feedback": "The Singleton pattern is a code structure; it cannot change runtime replica count or restart behavior.",
          "correct": false
        },
        {
          "id": "memory-persistence",
          "label": "Once the service is online again, assume every task kept in memory before restart still exists",
          "feedback": "Process memory normally disappears when the instance stops; recovery does not prove in-memory work was saved.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "multi-instance",
    "zh": {
      "title": "多实例服务上线后，用户偶尔被要求重新登录。先检查哪一处？",
      "options": [
        {
          "id": "shared-session",
          "label": "检查请求是否被分到不同实例，以及登录会话是否只保存在某个实例本地",
          "feedback": "对。跳到另一个实例时，本地会话不可见是多实例常见问题；要把会话放到共享位置或采用可验证的无状态方案。",
          "correct": true
        },
        {
          "id": "more-replicas",
          "label": "继续增加实例数量，实例越多就越能自动共享用户登录状态",
          "feedback": "增加副本只改变请求承接数量，不会让各实例自动看到彼此的本地会话。",
          "correct": false
        },
        {
          "id": "database-ha",
          "label": "只检查数据库是否有备份，就认为登录问题与实例状态无关",
          "feedback": "数据库备份不能证明会话在实例之间可见；登录状态的存放位置仍需单独检查。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "After a multi-instance release, users are occasionally asked to sign in again. What should you inspect first?",
      "options": [
        {
          "id": "shared-session",
          "label": "Check whether requests reach different instances and whether the session exists only in one instance's local memory",
          "feedback": "Correct. A local session is invisible after a request moves to another instance; use shared state or a verifiable stateless approach.",
          "correct": true
        },
        {
          "id": "more-replicas",
          "label": "Add more instances because more replicas automatically share login state",
          "feedback": "More replicas change request capacity, not whether instances can see each other's local sessions.",
          "correct": false
        },
        {
          "id": "database-ha",
          "label": "Check only whether the database has backups and conclude instance state is unrelated",
          "feedback": "Backups do not prove sessions are visible across instances; the location of login state still needs inspection.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "user-story",
    "zh": {
      "title": "团队准备增加“保存行程”功能。下面哪一条最适合作为用户故事？",
      "options": [
        {
          "id": "traveler-goal-value",
          "label": "作为正在规划多日旅行的人，我希望保存未完成的行程，以便稍后继续编辑",
          "feedback": "对。这句话说明了谁有需要、希望完成什么，以及这个能力带来的结果，可以继续讨论保存范围和验收条件。",
          "correct": true
        },
        {
          "id": "implementation-list",
          "label": "新增 saveTrip() 方法、数据库表和右上角蓝色按钮",
          "feedback": "这是实现与界面清单。团队仍然不知道谁需要保存、为什么需要，也无法据此判断哪些方案合适。",
          "correct": false
        },
        {
          "id": "feature-name",
          "label": "增加一个体验更好的行程保存功能",
          "feedback": "这只是功能名称和模糊评价，没有说明目标用户、使用目的，也没有给后续讨论提供明确边界。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A team plans to add trip saving. Which option works best as a user story?",
      "options": [
        {
          "id": "traveler-goal-value",
          "label": "As a traveler planning a multi-day trip, I want to save an unfinished itinerary so I can continue editing it later",
          "feedback": "Correct. It names the user, goal, and value, giving the team a useful starting point for discussing scope and acceptance criteria.",
          "correct": true
        },
        {
          "id": "implementation-list",
          "label": "Add a saveTrip() method, a database table, and a blue button in the top right",
          "feedback": "That is an implementation and interface list. It does not explain who needs the feature or why.",
          "correct": false
        },
        {
          "id": "feature-name",
          "label": "Add a better trip-saving experience",
          "feedback": "That is only a feature label with a vague quality claim. It does not identify the user, goal, or value.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "use-case",
    "zh": {
      "title": "下面哪组内容最适合作为“顾客申请退款”的用户用例？",
      "options": [
        {
          "id": "actor-system-outcomes",
          "label": "顾客在可退款订单中提交原因；系统检查期限并显示退款结果；超期或重复申请时说明原因和下一步",
          "feedback": "对。它围绕一个参与者目标，写出了触发条件、顾客动作、系统回应、成功结果和重要例外。",
          "correct": true
        },
        {
          "id": "story-only",
          "label": "作为顾客，我希望申请退款，以便取回不需要商品的费用",
          "feedback": "这是用户故事，说明了用户、目标和原因，但没有展开系统交互、条件与例外。",
          "correct": false
        },
        {
          "id": "internal-code",
          "label": "RefundController 调用 PaymentService，再把状态写入 refunds 表",
          "feedback": "这是内部实现。用例应描述顾客与系统之间可观察的行为，不要求预先决定控制器、服务和数据表。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Which option works best as the use case for “a customer requests a refund”?",
      "options": [
        {
          "id": "actor-system-outcomes",
          "label": "The customer submits a reason for an eligible order; the system checks the deadline and shows the result; expired or duplicate requests explain why and what to do next",
          "feedback": "Correct. It centers on one actor goal and includes the trigger, interaction, system response, successful result, and important exceptions.",
          "correct": true
        },
        {
          "id": "story-only",
          "label": "As a customer, I want to request a refund so I can recover the cost of an unwanted item",
          "feedback": "That is a user story. It states the user, goal, and reason without describing the interaction and exceptions.",
          "correct": false
        },
        {
          "id": "internal-code",
          "label": "RefundController calls PaymentService and writes the status to the refunds table",
          "feedback": "That is internal implementation. A use case describes observable behavior without choosing controllers, services, or tables.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "user-flow",
    "zh": {
      "title": "团队要检查“访客完成预约”的路径。下面哪张图最符合 User Flow？",
      "options": [
        {
          "id": "goal-and-branches",
          "label": "从预约入口开始，经过选择时段和提交资料，分别画出有号、无号、提交成功、资料错误及返回修改的路径",
          "feedback": "对。这张图围绕一个用户目标，包含起点、关键动作、决策分支、成功终点和失败后的恢复路径。",
          "correct": true
        },
        {
          "id": "page-hierarchy",
          "label": "按首页、服务、价格、帮助中心列出全站页面层级，不说明预约动作和结果",
          "feedback": "这是 sitemap 的内容组织与导航结构，不能看出访客怎样完成一次预约。",
          "correct": false
        },
        {
          "id": "screen-layouts",
          "label": "详细画出预约页每个输入框、按钮的尺寸与位置，但不连接操作顺序和异常分支",
          "feedback": "这是 wireframe 更关心的界面布局。没有动作顺序和分支，就无法检查完整的用户路径。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A team wants to inspect the path for “a visitor completes a booking.” Which diagram is the best User Flow?",
      "options": [
        {
          "id": "goal-and-branches",
          "label": "Start at the booking entry, continue through slot selection and details submission, and map available, unavailable, success, invalid-details, and return-to-edit paths",
          "feedback": "Correct. It centers on one user goal and includes an entry, key actions, decisions, a successful endpoint, and recovery from failure.",
          "correct": true
        },
        {
          "id": "page-hierarchy",
          "label": "List the hierarchy of Home, Services, Pricing, and Help Center pages without showing booking actions or outcomes",
          "feedback": "That is sitemap content organization and navigation structure. It does not show how a visitor completes a booking.",
          "correct": false
        },
        {
          "id": "screen-layouts",
          "label": "Draw the exact size and position of every input and button on the booking screen without connecting the sequence or error branches",
          "feedback": "That is closer to a wireframe’s interface layout. Without actions and branches, the complete user path cannot be checked.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "user-journey",
    "zh": {
      "title": "下面哪份材料最接近“第一次购买并开始课程”的用户旅程？",
      "options": [
        {
          "id": "touchpoints-evidence",
          "label": "按发现、了解、购买、收到邮件、进入课程分阶段，记录每个触点的行动、疑问、情绪和访谈或行为证据",
          "feedback": "对。它跨越多个触点和时间阶段，并且把行动、想法、感受与证据放在一起。",
          "correct": true
        },
        {
          "id": "in-product-flow",
          "label": "只画登录页、课程列表和播放页之间的点击分支",
          "feedback": "这更接近 User Flow，只覆盖产品内完成任务的动作和分支。",
          "correct": false
        },
        {
          "id": "invented-emotions",
          "label": "团队直接写“用户一定很兴奋”，不记录访谈、反馈或行为依据",
          "feedback": "旅程图可以记录感受，但必须区分证据、推断和待验证假设，不能替用户编造情绪。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Which artifact is closest to the user journey for buying and starting a course?",
      "options": [
        {
          "id": "touchpoints-evidence",
          "label": "Map discovery, evaluation, purchase, email, and course entry, with actions, questions, feelings, and interview or behavior evidence at each touchpoint",
          "feedback": "Correct. It spans time and touchpoints while connecting actions, thoughts, feelings, and evidence.",
          "correct": true
        },
        {
          "id": "in-product-flow",
          "label": "Show only the click branches between sign-in, the course list, and the player",
          "feedback": "That is closer to a user flow, which focuses on actions and decisions inside the product.",
          "correct": false
        },
        {
          "id": "invented-emotions",
          "label": "Write “users will definitely feel excited” without interviews, feedback, or behavior evidence",
          "feedback": "A journey can include feelings, but it must separate evidence, inference, and assumptions.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "prd",
    "zh": {
      "title": "团队准备做“会议纪要一键导出”。下面哪组内容最适合作为这项需求的 PRD 主体？",
      "options": [
        {
          "id": "problem-scope-success",
          "label": "目标用户与导出障碍、要支持和暂不支持的场景、成功标准、假设与待确认问题",
          "feedback": "对。这组内容说明了为什么做、为谁做、做到哪里以及怎样判断有效，团队仍可在边界内讨论具体实现。",
          "correct": true
        },
        {
          "id": "quarterly-sequence",
          "label": "第三季度所有项目的先后顺序、负责人和预计发布日期",
          "feedback": "这些内容主要属于路线图或项目计划，不能替代当前导出需求的用户问题、范围和成功标准。",
          "correct": false
        },
        {
          "id": "locked-implementation",
          "label": "数据库表、接口字段和每个页面像素都预先写死，不说明用户问题或验证标准",
          "feedback": "这把技术设计和线框细节当成了需求本身。团队仍不知道为什么这样做，也无法判断交付后是否解决了用户问题。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A team is preparing a one-click meeting-notes export. Which set of content best forms the core of its PRD?",
      "options": [
        {
          "id": "problem-scope-success",
          "label": "Target users and export pain points, in-scope and out-of-scope cases, success criteria, assumptions, and open questions",
          "feedback": "Correct. This explains why the work matters, who it serves, its boundaries, and how to judge the result while leaving implementation choices open.",
          "correct": true
        },
        {
          "id": "quarterly-sequence",
          "label": "The sequence, owners, and projected dates for every third-quarter initiative",
          "feedback": "That is primarily roadmap or project-planning information. It does not replace the user problem, scope, and success criteria for this export requirement.",
          "correct": false
        },
        {
          "id": "locked-implementation",
          "label": "Predefine every database table, API field, and screen pixel without stating the user problem or validation criteria",
          "feedback": "This mistakes technical design and wireframe detail for the requirement itself. The team still cannot tell why it is building this or whether it solved the problem.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "product-discovery",
    "zh": {
      "title": "访谈和低保真测试发现：用户确实会手工并排比较结果，但目前只在意快速看差异，没人使用团队协作或多种导出。下一步怎样做更符合产品发现？",
      "options": [
        {
          "id": "narrow-and-test",
          "label": "把范围收窄到双栏差异和保存结果，继续观察目标用户是否能完成任务并重复使用",
          "feedback": "对。现有证据支持的是更小的问题范围；下一步应据此缩小方案并继续验证，而不是自动批准全部功能。",
          "correct": true
        },
        {
          "id": "build-full-suite",
          "label": "既然有人需要比较，就把团队协作、多种导出、支付和管理后台一起完成",
          "feedback": "不对。证据只支持快速比较，不能顺带证明其他功能有价值；扩大范围会重新引入未经验证的假设。",
          "correct": false
        },
        {
          "id": "ignore-evidence",
          "label": "因为用户没有认可完整方案，立刻认定比较需求不存在，并停止记录这次发现",
          "feedback": "不对。用户已经展示了真实的手工比较行为。合理决定是收窄问题并继续验证，而不是忽略已有证据。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Research shows users manually compare results side by side, but they currently care only about spotting differences; nobody uses collaboration or multiple exports. What should happen next?",
      "options": [
        {
          "id": "narrow-and-test",
          "label": "Narrow the scope to two-column differences and saved results, then keep observing task completion and repeat use",
          "feedback": "Correct. The evidence supports a smaller problem scope, so the next test should narrow the solution rather than approve every proposed feature.",
          "correct": true
        },
        {
          "id": "build-full-suite",
          "label": "Because comparison matters, finish collaboration, multiple exports, payments, and an admin dashboard together",
          "feedback": "Incorrect. Evidence for quick comparison does not validate the other features; expanding the scope adds untested assumptions.",
          "correct": false
        },
        {
          "id": "ignore-evidence",
          "label": "Because users did not endorse the full concept, conclude that no comparison problem exists and discard the research",
          "feedback": "Incorrect. Users demonstrated real manual comparison behavior. Narrowing and testing again fits the evidence better.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "mvp",
    "zh": {
      "title": "团队最担心“自由职业者是否愿意付费使用自动催款”。哪种 MVP 最能先验证这个风险？",
      "options": [
        {
          "id": "priced-pilot",
          "label": "向目标用户售卖小规模试点，先人工完成催款，并记录购买、使用和续费",
          "feedback": "对。真实付款直接检验付费意愿，人工交付则让团队不用先建设完整自动化系统；购买、使用和续费行为还能帮助判断价值是否持续。",
          "correct": true
        },
        {
          "id": "broken-suite",
          "label": "快速上线一套功能残缺、数据保护也未完成的财务系统，再看用户会不会抱怨",
          "feedback": "低质量和安全缺口会污染反馈并伤害用户，无法说明核心价值是否成立；“最小”不能省掉可信实验必需的条件。",
          "correct": false
        },
        {
          "id": "free-likes",
          "label": "发布一张免费功能概念图，只统计点赞数，并据此判断用户愿意付费",
          "feedback": "点赞表达的兴趣与真实付费行为不同。这种证据没有直接检验当前最关键的付费假设。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The team’s biggest risk is whether freelancers will pay for automatic payment reminders. Which MVP tests that risk first?",
      "options": [
        {
          "id": "priced-pilot",
          "label": "Sell a small paid pilot, deliver reminders manually, and track purchase, usage, and renewal",
          "feedback": "Correct. An actual payment directly tests willingness to pay, while manual delivery avoids building the full automation system first. Purchase, usage, and renewal behavior also show whether the value lasts.",
          "correct": true
        },
        {
          "id": "broken-suite",
          "label": "Quickly launch an incomplete finance suite without finished data protection, then watch whether users complain",
          "feedback": "Poor quality and safety gaps distort feedback and harm users. Being minimal does not remove conditions required for a trustworthy experiment.",
          "correct": false
        },
        {
          "id": "free-likes",
          "label": "Post a free feature concept image, count likes, and treat that as proof that users will pay",
          "feedback": "Likes show a different kind of interest from actual payment behavior, so this evidence does not directly test the key willingness-to-pay assumption.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "product-backlog",
    "zh": {
      "title": "支付故障影响所有订单，同时团队收到一个地图配色建议。怎样更新产品待办列表更合理？",
      "options": [
        {
          "id": "reorder-by-goal-risk",
          "label": "核对影响后把支付故障移到前面并补充验收条件，配色建议保留在后面等待更多证据",
          "feedback": "对。列表顺序可以根据风险和证据调整；近期条目需要更清楚，较远的想法可以先保留必要信息。",
          "correct": true
        },
        {
          "id": "append-only",
          "label": "所有新内容只按收到时间追加，原有顺序永远不变",
          "feedback": "产品待办列表是动态的。新风险和证据出现后仍保持旧顺序，会让列表失去决策作用。",
          "correct": false
        },
        {
          "id": "promise-all",
          "label": "给列表里的每一项确定发布日期，并立即向用户承诺全部实现",
          "feedback": "进入待办列表只表示该项被记录和考虑，不等于已经承诺范围或日期。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A payment failure affects every order, while the team also receives a map-color suggestion. How should the product backlog change?",
      "options": [
        {
          "id": "reorder-by-goal-risk",
          "label": "Verify the impact, move the payment failure upward with clearer acceptance conditions, and keep the color idea lower while gathering evidence",
          "feedback": "Correct. The order can change with risk and evidence. Near-term items need more clarity than distant ideas.",
          "correct": true
        },
        {
          "id": "append-only",
          "label": "Append every new item by arrival time and never change the existing order",
          "feedback": "A product backlog is dynamic. Keeping the old order after new risk appears removes its decision value.",
          "correct": false
        },
        {
          "id": "promise-all",
          "label": "Assign a release date to every item and promise that all of them will ship",
          "feedback": "Being in the backlog means an item is considered, not that its scope or release date is committed.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "product-roadmap",
    "zh": {
      "title": "下面哪份计划最接近产品路线图？",
      "options": [
        {
          "id": "outcomes-horizons",
          "label": "Now：减少行程丢失；Next：让同行者一起编辑；Later：验证自动规划需求，并为每阶段标出预期用户结果",
          "feedback": "对。它用时间范围表达目标、方向和预期成果，较远阶段仍保留调整空间。",
          "correct": true
        },
        {
          "id": "daily-assignments",
          "label": "列出未来六周每位开发者每天编写哪个文件，以及精确到小时的完成时间",
          "feedback": "这是任务排期，主要回答谁在什么时候完成什么，不是产品路线图的战略视角。",
          "correct": false
        },
        {
          "id": "unordered-wishes",
          "label": "把所有人提过的功能放进一张没有目标、顺序和时间范围的清单",
          "feedback": "没有方向与取舍的功能清单不能说明产品准备怎样演进。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Which plan is closest to a product roadmap?",
      "options": [
        {
          "id": "outcomes-horizons",
          "label": "Now: reduce lost itineraries; Next: support co-editing; Later: validate demand for automatic planning, with an expected user outcome for each horizon",
          "feedback": "Correct. It uses time horizons to communicate goals, direction, and expected outcomes while leaving distant work adjustable.",
          "correct": true
        },
        {
          "id": "daily-assignments",
          "label": "List the exact file each developer will edit every day for six weeks, with hourly completion times",
          "feedback": "That is task scheduling. It answers who does what and when, not how the product should evolve.",
          "correct": false
        },
        {
          "id": "unordered-wishes",
          "label": "Put every suggested feature into a list without goals, order, or time horizons",
          "feedback": "An unordered wish list cannot communicate product direction or tradeoffs.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "gantt-chart",
    "zh": {
      "title": "下面哪组信息最适合进入“行程协作功能”的甘特图？",
      "options": [
        {
          "id": "tasks-duration-dependencies",
          "label": "交互设计 3 天；完成后才能开发 5 天；开发结束后测试 2 天；测试通过是发布里程碑",
          "feedback": "对。这组信息包含具体任务、持续时间、依赖和里程碑，可以放到时间轴上检查排期。",
          "correct": true
        },
        {
          "id": "product-direction",
          "label": "今年希望让更多旅行者能够顺利与同行者协作",
          "feedback": "这是产品目标和方向，适合路线图；它还没有形成可以安排起止时间的具体任务。",
          "correct": false
        },
        {
          "id": "unknown-dates",
          "label": "所有未知任务都先填明天下午完成，让图表看起来完整",
          "feedback": "虚构日期会让依赖和风险失真。缺少估算时应明确标注待确认。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Which information belongs in the Gantt chart for a trip-collaboration feature?",
      "options": [
        {
          "id": "tasks-duration-dependencies",
          "label": "Interaction design takes 3 days; development takes 5 days after design; testing takes 2 days after development; passing tests is the release milestone",
          "feedback": "Correct. It contains tasks, durations, dependencies, and a milestone that can be placed on a timeline.",
          "correct": true
        },
        {
          "id": "product-direction",
          "label": "This year we want more travelers to collaborate successfully with companions",
          "feedback": "That is a product goal suited to a roadmap, not yet a set of schedulable tasks.",
          "correct": false
        },
        {
          "id": "unknown-dates",
          "label": "Set every unknown task to finish tomorrow afternoon so the chart looks complete",
          "feedback": "Invented dates distort dependencies and risk. Unknown estimates should remain visibly unresolved.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "wireframe",
    "zh": {
      "title": "AI 问你「首页做成什么样」，你现在只想确定区块位置。下面哪个回答更合适？",
      "options": [
        {
          "id": "wireframe-first",
          "label": "先画灰色骨架：页头、首屏、卡片、页脚排好位置，颜色之后再说",
          "feedback": "对。线框图阶段只定结构，位置确认了再上视觉，要改的也最少。",
          "correct": true
        },
        {
          "id": "full-design",
          "label": "直接给我做一版带渐变和字体的成品，看完再说",
          "feedback": "直接上视觉后，改一个区块位置往往连着改颜色、间距和字体；结构没定时这样改最贵。",
          "correct": false
        },
        {
          "id": "text-only",
          "label": "把所有文字内容写好就行，页面怎么排你看着办",
          "feedback": "内容固然要先定，但区块位置也需要你确认——「看着办」容易做出和你想法偏差很大的结构。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The AI asks \"what should the homepage look like?\" and you only want to settle block positions. Which reply fits?",
      "options": [
        {
          "id": "wireframe-first",
          "label": "Draw a gray skeleton first: header, hero, cards, footer in position; colors later",
          "feedback": "Correct. The wireframe stage fixes structure only; visuals come after positions are confirmed, with the least to redo.",
          "correct": true
        },
        {
          "id": "full-design",
          "label": "Build a finished version with gradients and fonts, and we'll react to it",
          "feedback": "With visuals already applied, moving one block drags colors, spacing, and fonts along—costliest time to restructure.",
          "correct": false
        },
        {
          "id": "text-only",
          "label": "Just write all the copy; arrange the page however you like",
          "feedback": "Content does come first, but block positions need your confirmation too—\"however you like\" invites big drift.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "moodboard",
    "zh": {
      "title": "AI 做的官网风格总和你想的不一样，来回改了四轮。下面哪个做法最可能一次对齐方向？",
      "options": [
        {
          "id": "moodboard-ref",
          "label": "拼三张喜欢的网站截图加一张不喜欢的，一起发给 AI",
          "feedback": "对。图比形容词准——喜欢的划定方向，不喜欢的划清边界，AI 照着做偏差最小。方向问题在拼图阶段就能解决，不用等到做完再改。",
          "correct": true
        },
        {
          "id": "adjectives",
          "label": "继续用文字描述：「再高级一点，再简洁一点」",
          "feedback": "「高级」「简洁」没有共同标准，你和 AI 各猜各的，第五轮还会偏。",
          "correct": false
        },
        {
          "id": "random-try",
          "label": "让 AI 随机出五版配色，挑一个顺眼的",
          "feedback": "碰运气出的五版都建立在你没说清的方向上，挑中也只是巧合。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The AI's site style keeps missing what you want after four rounds. Which move most likely aligns it in one shot?",
      "options": [
        {
          "id": "moodboard-ref",
          "label": "Paste three screenshots you like plus one you dislike, and send them together",
          "feedback": "Correct. Likes set the direction, the crossed-out one draws the boundary. Solving direction at the collage stage avoids redoing finished work.",
          "correct": true
        },
        {
          "id": "adjectives",
          "label": "Keep describing in words: \"more premium, more minimal\"",
          "feedback": "\"Premium\" and \"minimal\" have no shared definition; round five will drift the same way.",
          "correct": false
        },
        {
          "id": "random-try",
          "label": "Have the AI generate five random palettes and pick a good one",
          "feedback": "All five build on an unstated direction; picking a hit would be luck, not alignment.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "heuristic-evaluation",
    "zh": {
      "title": "评估者在设置页点击“保存昵称”后看不到任何变化。哪条问题记录最方便团队修复并在之后复查？",
      "options": [
        {
          "id": "reproducible-record",
          "label": "写清昵称表单的位置、修改后点击保存的步骤、系统状态不可见原则、用户影响，以及修复后要重走的路径",
          "feedback": "对。事实、原则、影响和复查路径都明确，团队可以复现问题，也能判断修复是否有效。",
          "correct": true
        },
        {
          "id": "subjective-record",
          "label": "只记录“这个页面感觉不高级，建议整体重新设计”，不写位置和操作步骤",
          "feedback": "不对。主观评价无法定位或复现问题，也不能判断改动后是否真的改善。",
          "correct": false
        },
        {
          "id": "solution-only",
          "label": "直接要求把按钮改成绿色，不说明用户遇到了什么问题，也不重新执行保存任务",
          "feedback": "不对。先写清观察和影响，再提出对应建议；只改样式不能证明状态反馈问题得到解决。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An evaluator clicks Save Nickname in Settings and sees no change. Which issue record best supports a fix and later recheck?",
      "options": [
        {
          "id": "reproducible-record",
          "label": "Record the nickname form location, edit-and-save steps, visibility heuristic, user impact, and the path to repeat after the fix",
          "feedback": "Correct. The observation, principle, impact, and recheck path make the issue reproducible and the fix verifiable.",
          "correct": true
        },
        {
          "id": "subjective-record",
          "label": "Write only that the page feels unpolished and should be redesigned, without a location or task steps",
          "feedback": "Incorrect. A subjective reaction cannot be reproduced or used to verify that the change improved the task.",
          "correct": false
        },
        {
          "id": "solution-only",
          "label": "Ask for a green button without describing the user problem or repeating the save task afterward",
          "feedback": "Incorrect. The observation and impact must come before a recommendation; a color change does not prove status feedback works.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "ab-test",
    "zh": {
      "title": "团队想比较两种注册引导。下面哪种做法最接近有效的 A/B 测试？",
      "options": [
        {
          "id": "random-concurrent-metric",
          "label": "同一时期把符合条件的新访客随机分到 A、B 两版，预先确定注册完成率和错误率，再按约定样本与时间分析",
          "feedback": "对。同期随机分组减少了流量和时间差异，预设主要指标、保护指标和停止条件也避免根据中途波动挑结果。",
          "correct": true
        },
        {
          "id": "before-after",
          "label": "本月给所有人上线 B 版，再与上月 A 版比较",
          "feedback": "流量来源、活动和季节都可能变化，前后差异不能只归因于页面版本。",
          "correct": false
        },
        {
          "id": "stop-on-spike",
          "label": "实验开始后每小时查看，哪一版暂时领先就立刻停止并宣布胜出",
          "feedback": "短期随机波动可能制造领先。应在开始前约定分析窗口和停止规则。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Which approach is closest to a valid A/B test for two sign-up guides?",
      "options": [
        {
          "id": "random-concurrent-metric",
          "label": "During the same period, randomly assign eligible new visitors to A or B, predefine completion and error rates, and analyze after the agreed sample and duration",
          "feedback": "Correct. Concurrent random assignment reduces traffic and time differences, while predefined metrics and stopping rules limit result picking.",
          "correct": true
        },
        {
          "id": "before-after",
          "label": "Show B to everyone this month and compare it with A from last month",
          "feedback": "Traffic sources, campaigns, and seasonality may change, so the difference cannot be attributed only to the page.",
          "correct": false
        },
        {
          "id": "stop-on-spike",
          "label": "Check hourly and stop as soon as one version briefly leads",
          "feedback": "Short-term random variation can create a temporary lead. Set the analysis window and stopping rule before launch.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "conversion-funnel",
    "zh": {
      "title": "注册漏斗显示：访问 1,000 人、开始注册 620 人、提交资料 310 人、完成注册 280 人。应先调查哪里？",
      "options": [
        {
          "id": "largest-step-loss",
          "label": "先调查“开始注册 → 提交资料”，同时核对两个事件的定义和采集是否一致",
          "feedback": "对。这一步从 620 人降到 310 人，步骤转化率为 50%，是当前最大流失；先核对数据口径，再调查页面、规则和用户原因。",
          "correct": true
        },
        {
          "id": "final-count-only",
          "label": "只看最终有 280 人完成，不需要检查中间步骤",
          "feedback": "最终人数不能说明主要阻碍发生在哪里，中间步骤正是漏斗提供的定位线索。",
          "correct": false
        },
        {
          "id": "invent-cause",
          "label": "直接认定资料表单太长并删除字段，不核对事件或用户反馈",
          "feedback": "漏斗说明哪里流失，不会自动解释为什么。原因仍需数据检查和用户证据。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A sign-up funnel shows 1,000 visits, 620 starts, 310 profile submissions, and 280 completions. What should the team investigate first?",
      "options": [
        {
          "id": "largest-step-loss",
          "label": "Investigate start → profile submission first, while verifying that both events use matching definitions and tracking",
          "feedback": "Correct. This step falls from 620 to 310, a 50% step conversion and the largest loss. Verify the data before investigating interface, rules, and user reasons.",
          "correct": true
        },
        {
          "id": "final-count-only",
          "label": "Look only at the 280 completions and ignore intermediate steps",
          "feedback": "The final count cannot locate the main obstacle. Intermediate steps are the funnel's diagnostic value.",
          "correct": false
        },
        {
          "id": "invent-cause",
          "label": "Assume the form is too long and delete fields without checking events or user feedback",
          "feedback": "A funnel shows where loss happens, not why. The cause still needs data checks and user evidence.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "crud",
    "zh": {
      "title": "AI 说「报价工具的增删改查都做完了」。下面哪个功能不属于这四种操作？",
      "options": [
        {
          "id": "export-report",
          "label": "把报价记录导出成月度统计图",
          "feedback": "对。导出和统计是建立在已有数据之上的扩展功能。四种基本操作只管每条记录本身的进出和修改。",
          "correct": true
        },
        {
          "id": "update-status",
          "label": "把一条报价的状态从「跟进中」改成「已成交」",
          "feedback": "这属于更新（Update）：修改已有记录里的信息。",
          "correct": false
        },
        {
          "id": "delete-record",
          "label": "删掉一条不再需要的报价记录",
          "feedback": "这属于删除（Delete）：移除一条已有记录。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An AI says \"the CRUD for the quote tool is done.\" Which feature below is NOT one of those four operations?",
      "options": [
        {
          "id": "export-report",
          "label": "Exporting quotes into a monthly chart",
          "feedback": "Correct. Exporting and reporting are extra features built on top of the data. The four basic operations only manage each record itself.",
          "correct": true
        },
        {
          "id": "update-status",
          "label": "Changing a quote's status from \"following up\" to \"won\"",
          "feedback": "That is Update: modifying information in an existing record.",
          "correct": false
        },
        {
          "id": "delete-record",
          "label": "Removing a quote record that is no longer needed",
          "feedback": "That is Delete: removing an existing record.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "field",
    "zh": {
      "title": "设计报价工具时，下面哪个属于字段？",
      "options": [
        {
          "id": "quote-amount",
          "label": "每条报价的「金额」",
          "feedback": "对。金额是每条记录里单独的一项信息，是字段；客户名、日期、状态也是字段。",
          "correct": true
        },
        {
          "id": "submit-button",
          "label": "表单底部的「保存」按钮",
          "feedback": "按钮是操作入口，不是被记录的信息。字段指信息本身，不指控件。",
          "correct": false
        },
        {
          "id": "whole-form",
          "label": "整张新建报价的表单",
          "feedback": "表单是填写一组字段的界面；字段是表单里的单项信息。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "While designing a quote tool, which of these is a field?",
      "options": [
        {
          "id": "quote-amount",
          "label": "The \"amount\" of each quote",
          "feedback": "Correct. Amount is one standalone piece of information per record; client name, date, and status are fields too.",
          "correct": true
        },
        {
          "id": "submit-button",
          "label": "The \"save\" button at the bottom of the form",
          "feedback": "A button is an action entry, not recorded information. A field is the information itself, not the control.",
          "correct": false
        },
        {
          "id": "whole-form",
          "label": "The entire new-quote form",
          "feedback": "The form is the interface for filling in a group of fields; a field is one item inside it.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "data-type",
    "zh": {
      "title": "报价工具里要「按日期远近排序」，日期字段用哪种类型最合适？",
      "options": [
        {
          "id": "date-type",
          "label": "日期类型",
          "feedback": "对。日期类型才能按时间先后排序，手机上还会弹出日期选择器，避免格式混乱。",
          "correct": true
        },
        {
          "id": "text-type",
          "label": "文字类型，自己输入「3月2日」",
          "feedback": "文字没法比较先后：「3月2日」和「12月1日」按文字排序会排错，格式也各写各的。",
          "correct": false
        },
        {
          "id": "number-type",
          "label": "数字类型，输入 0302 表示 3 月 2 日",
          "feedback": "凑数字会丢失月份天数，排序和显示都不对；日期就该用日期类型。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The quote tool needs to \"sort by date.\" Which type should the date field use?",
      "options": [
        {
          "id": "date-type",
          "label": "A date type",
          "feedback": "Correct. A date type sorts chronologically and opens a date picker on phones, avoiding messy formats.",
          "correct": true
        },
        {
          "id": "text-type",
          "label": "A text type, typing \"Mar 2\" manually",
          "feedback": "Text cannot be ordered in time: \"Mar 2\" and \"Dec 1\" sort wrongly as text, and formats drift.",
          "correct": false
        },
        {
          "id": "number-type",
          "label": "A number type, entering 0302 for March 2",
          "feedback": "Packed numbers lose month and day information; sorting and display both break. Dates belong in a date type.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "import-export",
    "zh": {
      "title": "会计要拿到这 200 条客户记录、在 Excel 里自己改。下面哪种做法真正把数据交给了她？",
      "options": [
        {
          "id": "csv-download",
          "label": "把记录存成 CSV 文件发给她",
          "feedback": "对。导出把数据整批变成一个文件，拿到的是数据本身，可以用 Excel 或别的工具打开。",
          "correct": true
        },
        {
          "id": "share-link",
          "label": "把网页链接发给同事看",
          "feedback": "分享链接只是给别人一个访问入口，数据还在原工具里——没有拿到文件。",
          "correct": false
        },
        {
          "id": "delete-batch",
          "label": "一次性删掉 200 条旧记录",
          "feedback": "批量删除是删除的批量版，数据没了而不是搬走了。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An accountant needs all 200 customer records as a file she can edit in Excel. Which option actually gives her the data?",
      "options": [
        {
          "id": "csv-download",
          "label": "Send her the records as a CSV file",
          "feedback": "Correct. Exporting turns the whole batch into one file you can open in Excel or another tool.",
          "correct": true
        },
        {
          "id": "share-link",
          "label": "Sending the web link to a colleague",
          "feedback": "Sharing a link only grants access; the data stays in the tool and no file changes hands.",
          "correct": false
        },
        {
          "id": "delete-batch",
          "label": "Deleting 200 old records at once",
          "feedback": "Batch deletion is delete at scale—the data is gone, not moved.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "acceptance-criteria",
    "zh": {
      "title": "团队说“行程功能做好了”，但还没有操作过页面。下面哪一条最适合作为验收标准？",
      "options": [
        {
          "id": "observable-result",
          "label": "保存有效行程后显示行程卡；刷新后同一行程仍在；日期错误时提示怎样修改",
          "feedback": "对。每一项都有明确操作和可观察结果，可以直接判定通过或不通过。",
          "correct": true
        },
        {
          "id": "technology-list",
          "label": "使用最新框架、覆盖率达到 80%、代码文件足够整洁",
          "feedback": "这些可能有价值，但没有说明用户是否完成了保存行程这件事。",
          "correct": false
        },
        {
          "id": "vague-quality",
          "label": "页面看起来专业，大家感觉应该可以上线",
          "feedback": "感觉不能替代可重复的检查条件。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The team says the itinerary feature is done but nobody has operated the page. Which is the best acceptance criterion?",
      "options": [
        {
          "id": "observable-result",
          "label": "Saving a valid itinerary shows its card, it remains after refresh, and invalid dates explain how to fix them",
          "feedback": "Correct. Every item has an action and an observable result, so it can pass or fail.",
          "correct": true
        },
        {
          "id": "technology-list",
          "label": "Use the latest framework, reach 80% coverage, and keep files tidy",
          "feedback": "These can matter, but they do not say whether a person can save an itinerary.",
          "correct": false
        },
        {
          "id": "vague-quality",
          "label": "The page looks professional and everyone feels it can ship",
          "feedback": "A feeling cannot replace repeatable conditions.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "test-case",
    "zh": {
      "title": "下面哪段最像可执行的“错误密码”测试用例？",
      "options": [
        {
          "id": "repeatable-case",
          "label": "准备已注册账号，输入正确邮箱和错误密码；点登录；预期留在登录页并显示“密码不正确”",
          "feedback": "对。起点、输入、动作和预期结果齐全，别人可以重复执行。",
          "correct": true
        },
        {
          "id": "broad-plan",
          "label": "准备已注册账号，依次尝试几组密码，记录登录页出现的结果",
          "feedback": "它有准备和操作，但没有写明这次检查期待什么结果，执行者无法直接判断通过或失败。",
          "correct": false
        },
        {
          "id": "implementation-note",
          "label": "输入任意邮箱和错误密码；点登录；预期统一显示“密码不正确”",
          "feedback": "邮箱是否属于已注册账号会改变合理结果；起点不明确时，这条预期可能把“账号不存在”也误判成密码错误。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Which text most resembles an executable wrong-password test case?",
      "options": [
        {
          "id": "repeatable-case",
          "label": "Prepare a registered account, enter its email and a wrong password, sign in, and expect to remain on the login page with “incorrect password”",
          "feedback": "Correct. It has a starting point, input, action, and expected result that someone else can repeat.",
          "correct": true
        },
        {
          "id": "broad-plan",
          "label": "Prepare a registered account, try several passwords, and record whatever the login page shows",
          "feedback": "It has setup and actions but no expected result, so the executor cannot directly decide pass or fail.",
          "correct": false
        },
        {
          "id": "implementation-note",
          "label": "Enter any email and a wrong password, sign in, and always expect “incorrect password”",
          "feedback": "Whether the email belongs to a registered account can change the valid result. The starting condition is too vague for that expectation.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "unit-test",
    "zh": {
      "title": "改了优惠计算规则后，哪项最适合作为单元测试？",
      "options": [
        {
          "id": "price-boundary",
          "label": "向优惠计算函数传入 99 元和 100 元，分别断言不减和减 20",
          "feedback": "对。它只检查一个明确规则，输入和预期输出都固定。",
          "correct": true
        },
        {
          "id": "full-checkout",
          "label": "通过订单 API 提交 99 元和 100 元商品，再核对接口返回的优惠金额",
          "feedback": "这也能发现问题，但已经把 API 和订单流程接进来，属于更偏集成层的检查。",
          "correct": false
        },
        {
          "id": "manual-feeling",
          "label": "在浏览器分别下单 99 元和 100 元商品，再检查确认页上的最终金额",
          "feedback": "它从用户入口检查完整结果，更接近端到端测试；不能像单元测试一样快速定位计算函数。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "After changing a discount rule, which is best as a unit test?",
      "options": [
        {
          "id": "price-boundary",
          "label": "Pass 99 and 100 to the discount function and assert no discount versus 20 off",
          "feedback": "Correct. It checks one clear rule with fixed input and expected output.",
          "correct": true
        },
        {
          "id": "full-checkout",
          "label": "Submit 99 and 100 items through the order API, then check the discount in its response",
          "feedback": "This can find a problem, but it includes the API and order flow, so it is closer to an integration test.",
          "correct": false
        },
        {
          "id": "manual-feeling",
          "label": "Place 99 and 100 orders in the browser, then check the final amount on the confirmation page",
          "feedback": "That checks a complete result from the user entry point, which is closer to an end-to-end test and does not isolate the calculation.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "integration-test",
    "zh": {
      "title": "价格计算单元测试都通过，但提交表单后总价显示为空。下一步最符合集成测试思路的是？",
      "options": [
        {
          "id": "check-contract",
          "label": "提交表单，核对发出的总价字段、API 返回字段和页面读取字段是否一致",
          "feedback": "对。每个小单元可能各自正确，问题常出在它们交接的数据约定。",
          "correct": true
        },
        {
          "id": "rewrite-function",
          "label": "继续给价格计算函数增加输入组合，确认它单独运行时仍能返回总价",
          "feedback": "这会继续加强单元测试，却没有检查总价在表单、API 和页面之间是否正确传递。",
          "correct": false
        },
        {
          "id": "only-screenshot",
          "label": "从浏览器完成一次真实支付，只检查最终订单确认页有没有金额",
          "feedback": "完整用户流程能证明结果，但范围更大；当前已有单元证据，先检查相邻模块的字段交接更容易定位。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Price unit tests pass, but the total is blank after form submission. What best follows integration-test thinking?",
      "options": [
        {
          "id": "check-contract",
          "label": "Submit the form and check that its total field, the API response field, and the page field agree",
          "feedback": "Correct. Each small unit may be right on its own; the data contract at their handoff is often wrong.",
          "correct": true
        },
        {
          "id": "rewrite-function",
          "label": "Add more input combinations to the price function and confirm it still returns a total on its own",
          "feedback": "That strengthens the unit test but does not check whether the total moves correctly through the form, API, and page.",
          "correct": false
        },
        {
          "id": "only-screenshot",
          "label": "Complete a real payment in the browser and only check whether the final confirmation page has an amount",
          "feedback": "A full user flow can prove the result, but its scope is wider. With unit evidence already available, checking the adjacent handoffs will locate the issue faster.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "contract-testing",
    "zh": {
      "title": "后端工程师准备将用户接口中的 user_id 重命名为 uid。哪种测试能以最低成本最快在 PR 合并前发现前端将被破坏？",
      "options": [
        {
          "id": "contract-test-catches",
          "label": "契约测试：根据调用方留存的接口契约校验，发现字段被重命名后在合并前自动阻断",
          "feedback": "对。提供方验证会把真实响应与调用方记录的最小要求比对，并在 CI 中明确指出缺失的 user_id。",
          "correct": true
        },
        {
          "id": "unit-test-alone",
          "label": "后端单元测试：只要后端自己的业务逻辑测试通过，就假定不会影响任何外部系统",
          "feedback": "不对。后端单元测试只验证后端自身逻辑，无法知道外部前端是否强依赖旧字段名。",
          "correct": false
        },
        {
          "id": "manual-acceptance",
          "label": "线上人工抽查：等代码发布到生产环境后，再由人工手动点击用户中心逐项核对",
          "feedback": "不对。这属于滞后的人工验收，不能在提交代码时自动预警，且成本和风险极高。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A backend developer plans to rename user_id to uid. Which test catches this breakage fastest and cheapest before PR merge?",
      "options": [
        {
          "id": "contract-test-catches",
          "label": "Contract testing: validates against consumer expectations and fails CI before code merges",
          "feedback": "Correct. Contract testing requires no browser orchestration or full environments, pinpointing breaking response schema changes directly.",
          "correct": true
        },
        {
          "id": "unit-test-alone",
          "label": "Backend unit tests: internal logic checks pass within the isolated service without client context",
          "feedback": "Incorrect. Unit tests only verify internal logic and cannot detect broken external consumer assumptions.",
          "correct": false
        },
        {
          "id": "manual-acceptance",
          "label": "Manual live checks: deploy the breaking change directly to production and verify the dashboard",
          "feedback": "Incorrect. Post-release manual checks come too late and carry massive deployment risk.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "e2e-test",
    "zh": {
      "title": "下面哪项最能证明“用户可以完成预订”这条端到端路径？",
      "options": [
        {
          "id": "browser-journey",
          "label": "在浏览器填写行程、提交、重新打开确认页，并核对显示的是刚才保存的行程",
          "feedback": "对。它从用户操作入口走到最终可见结果，跨过必要系统。",
          "correct": true
        },
        {
          "id": "api-alone",
          "label": "通过 API 创建行程，再检查数据库里是否写入了对应记录",
          "feedback": "这能验证服务和数据的连接，但没有从用户操作入口经过页面和确认结果。",
          "correct": false
        },
        {
          "id": "function-alone",
          "label": "在浏览器填写并提交行程，只检查页面有没有跳到确认页",
          "feedback": "跳转本身不证明行程已经保存，也不证明确认页显示的是刚才提交的数据。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Which best proves the end-to-end path “a user can complete a booking”?",
      "options": [
        {
          "id": "browser-journey",
          "label": "In a browser, enter an itinerary, submit it, reopen the confirmation page, and verify it shows the saved itinerary",
          "feedback": "Correct. It goes from the user's entry action to the final visible result across needed systems.",
          "correct": true
        },
        {
          "id": "api-alone",
          "label": "Create the itinerary through the API, then check whether the matching record exists in the database",
          "feedback": "That verifies the service and data connection, but it does not start from the user's page actions or check the visible confirmation.",
          "correct": false
        },
        {
          "id": "function-alone",
          "label": "Fill and submit the itinerary in a browser, but only check whether the page navigates to confirmation",
          "feedback": "Navigation alone does not prove the itinerary was saved or that confirmation shows the submitted data.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "smoke-test",
    "zh": {
      "title": "新构建部署后，首页打不开。团队下一步最合适的是？",
      "options": [
        {
          "id": "block-deeper-tests",
          "label": "记录版本和失败现象，先阻断完整回归，修复后再从冒烟测试开始",
          "feedback": "对。首页是关键探针，失败说明当前版本不值得继续投入更深测试。",
          "correct": true
        },
        {
          "id": "continue-anyway",
          "label": "继续运行所有支付、筛选和设置用例，最后再看首页",
          "feedback": "系统最基本入口已失败，后续大量结果难以解释且浪费时间。",
          "correct": false
        },
        {
          "id": "declare-regression",
          "label": "判定所有回归用例均未通过",
          "feedback": "只凭首页失败不能判断所有旧功能；先把当前版本阻断并定位。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "After a new build deploys, the home page will not open. What should the team do next?",
      "options": [
        {
          "id": "block-deeper-tests",
          "label": "Record the version and failure, block the full regression run, fix it, then restart from smoke tests",
          "feedback": "Correct. A failed key probe means this version is not worth deeper test investment yet.",
          "correct": true
        },
        {
          "id": "continue-anyway",
          "label": "Run every payment, filtering, and settings case first, then revisit the home page",
          "feedback": "The basic entry is already broken, so many later results are hard to interpret and waste time.",
          "correct": false
        },
        {
          "id": "declare-regression",
          "label": "Declare that every historical feature has regressed",
          "feedback": "One failed home page cannot establish that every old feature failed; block and locate the current version first.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "regression-test",
    "zh": {
      "title": "团队只改了优惠券计算，却发现总价会影响支付和订单确认。哪组最该加入回归测试？",
      "options": [
        {
          "id": "related-old-paths",
          "label": "原有优惠券、支付金额和订单确认用例",
          "feedback": "对。这些旧流程都依赖总价，最可能被这次变化误伤。",
          "correct": true
        },
        {
          "id": "only-new-rule",
          "label": "只检查新优惠券是否能显示",
          "feedback": "新规则显示不代表旧的支付和确认结果仍正确。",
          "correct": false
        },
        {
          "id": "unrelated-page",
          "label": "只检查个人头像上传",
          "feedback": "除非有明确共享依赖，否则它不在这次改动的主要风险面。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The team changed only coupon calculation, but the total also affects payment and order confirmation. Which set belongs in regression?",
      "options": [
        {
          "id": "related-old-paths",
          "label": "Existing coupon, payment-total, and order-confirmation cases",
          "feedback": "Correct. These older paths depend on the total and are most likely to be harmed by the change.",
          "correct": true
        },
        {
          "id": "only-new-rule",
          "label": "Only check that the new coupon displays",
          "feedback": "Displaying the new rule does not prove old payment and confirmation results remain correct.",
          "correct": false
        },
        {
          "id": "unrelated-page",
          "label": "Only check profile-avatar upload",
          "feedback": "Without a known shared dependency, it is not in this change's main risk area.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "test-coverage",
    "zh": {
      "title": "报告显示代码覆盖率 100%，但支付失败时页面仍显示“下单成功”。最合适的结论是？",
      "options": [
        {
          "id": "coverage-not-enough",
          "label": "检查失败分支有没有断言页面状态，并补一条支付失败后的可观察结果",
          "feedback": "对。测试可能走到了失败分支，却没有检查页面是否给出正确反馈。",
          "correct": true
        },
        {
          "id": "no-bugs",
          "label": "确认失败分支已经被执行，再增加它的运行次数来巩固 100% 覆盖率",
          "feedback": "重复执行仍只证明代码被走到；没有有效断言时，错误的成功提示不会被发现。",
          "correct": false
        },
        {
          "id": "ignore-failure",
          "label": "保留当前覆盖率，把这次错误作为单独的人工验收记录，不修改自动测试",
          "feedback": "人工记录能保留现象，但这个稳定失败路径仍缺少会持续检查用户结果的自动用例。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A report says 100% code coverage, but the page still says “order succeeded” when payment fails. What is the best conclusion?",
      "options": [
        {
          "id": "coverage-not-enough",
          "label": "Check whether the failure branch asserts page state, then add an observable result for failed payment",
          "feedback": "Correct. A test may execute the failure branch without checking that the page gives the right feedback.",
          "correct": true
        },
        {
          "id": "no-bugs",
          "label": "Confirm the failure branch runs, then run it more often to reinforce the 100% coverage number",
          "feedback": "Repeated execution still only proves the code was reached. Without a useful assertion, the wrong success message remains invisible.",
          "correct": false
        },
        {
          "id": "ignore-failure",
          "label": "Keep the current coverage and record this error as a separate manual check without changing automated tests",
          "feedback": "A manual record preserves the symptom, but this stable failure path still lacks an automated check of the user result.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "test-double",
    "zh": {
      "title": "你要验证“支付被拒绝时页面显示重试入口”，真实支付沙箱偶尔不可用。最合适的是？",
      "options": [
        {
          "id": "controlled-double",
          "label": "让支付测试替身稳定返回拒绝，再断言页面显示重试入口",
          "feedback": "对。测试重点是页面如何处理拒绝，替身让这个前提可重复。",
          "correct": true
        },
        {
          "id": "wait-real-service",
          "label": "一直等真实支付服务恰好返回拒绝",
          "feedback": "前提不可控，测试会慢且不稳定，难以重复。",
          "correct": false
        },
        {
          "id": "claim-integration",
          "label": "只用替身通过，就宣布真实支付集成已验证",
          "feedback": "替身不证明真实服务连接、认证或协议没有问题。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "You need to verify that a rejected payment shows a retry entry, but the real payment sandbox is sometimes unavailable. What is best?",
      "options": [
        {
          "id": "controlled-double",
          "label": "Have a payment test double consistently return rejection, then assert the page shows retry",
          "feedback": "Correct. The test asks how the page handles rejection, and the double makes that prerequisite repeatable.",
          "correct": true
        },
        {
          "id": "wait-real-service",
          "label": "Wait until the real payment service happens to reject",
          "feedback": "The prerequisite is uncontrolled, slow, unstable, and hard to repeat.",
          "correct": false
        },
        {
          "id": "claim-integration",
          "label": "If the double passes, declare real payment integration verified",
          "feedback": "A double does not prove real service connection, authentication, or protocol works.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "test-fixture",
    "zh": {
      "title": "“测试前创建普通用户和一张待支付订单，测试后删除它们”属于哪种测试准备方式？",
      "options": [
        {
          "id": "fixture",
          "label": "Fixture，因为它规定了用例开始前的准备和结束后的清理",
          "feedback": "对。用户姓名、订单金额等具体内容是测试数据；创建和清理的可复用流程是 Fixture。",
          "correct": true
        },
        {
          "id": "only-data",
          "label": "只是测试数据，因为里面有用户和订单",
          "feedback": "这里描述的不只是值，还包括每次运行前后如何建立和还原状态。",
          "correct": false
        },
        {
          "id": "production-seed",
          "label": "生产初始化数据，不需要在测试后清理",
          "feedback": "测试前提应避免污染真实生产数据，且应能恢复稳定起点。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Which test setup creates a regular user and a pending-payment order before each test, then removes them afterward?",
      "options": [
        {
          "id": "fixture",
          "label": "A fixture, because it defines setup before and cleanup after a case",
          "feedback": "Correct. The user name and order amount are test data; the reusable setup and cleanup flow is the fixture.",
          "correct": true
        },
        {
          "id": "only-data",
          "label": "Only test data, because it contains a user and order",
          "feedback": "It describes not only values but how state is created and restored around every run.",
          "correct": false
        },
        {
          "id": "production-seed",
          "label": "Production seed data that needs no cleanup",
          "feedback": "Test prerequisites should not pollute real production data and should restore a stable starting point.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "flaky-test",
    "zh": {
      "title": "同一 commit 的登录测试运行五次，结果是通过、通过、失败、通过、失败，失败原因都是超时。第一步应该做什么？",
      "options": [
        {
          "id": "investigate-variance",
          "label": "保留运行记录，检查等待条件、共享账号和 CI 环境差异，设法稳定复现",
          "feedback": "对。同一代码交替结果是波动证据，应先找不可控因素。",
          "correct": true
        },
        {
          "id": "infinite-retry",
          "label": "把重试次数调到无限，直到流水线变绿",
          "feedback": "这会隐藏信号、增加时间，不能消除不稳定根因。",
          "correct": false
        },
        {
          "id": "call-real-bug",
          "label": "直接按每次都能复现的产品缺陷处理，不必比较运行条件",
          "feedback": "它可能也暴露真实问题，但先要区分为什么同一测试有时通过。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A login test on the same commit passes, passes, fails, passes, then fails, and both failures time out. What should you do first?",
      "options": [
        {
          "id": "investigate-variance",
          "label": "Keep run evidence, inspect wait conditions, shared accounts, and CI differences, then make it reproduce stably",
          "feedback": "Correct. Alternating results on unchanged code are evidence of variance, so find the uncontrolled factor.",
          "correct": true
        },
        {
          "id": "infinite-retry",
          "label": "Set retries to infinite until the pipeline turns green",
          "feedback": "That hides signal and adds time; it does not remove the instability cause.",
          "correct": false
        },
        {
          "id": "call-real-bug",
          "label": "Treat it directly like a defect that always reproduces, without comparing run conditions",
          "feedback": "It may reveal a real product issue too, but first distinguish why the same test sometimes passes.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "load-testing",
    "zh": {
      "title": "活动前的结账负载测试显示，p95 延迟（95% 请求的响应时间不超过这个值）已经超过阈值，错误率也在上升。哪种处理最有用？",
      "options": [
        {
          "id": "analyze-and-improve",
          "label": "保留测试场景和指标，定位瓶颈，改善后重复测试并比较结果",
          "feedback": "对。负载测试的价值在于用可重复的负载和阈值发现瓶颈，再用下一轮结果验证改善。",
          "correct": true
        },
        {
          "id": "single-request",
          "label": "只测一次单个请求；它成功就说明活动全量结账不会超时",
          "feedback": "单个请求没有施加目标负载，不能说明并发用户下的延迟、吞吐或错误率。",
          "correct": false
        },
        {
          "id": "hide-errors",
          "label": "把错误请求从统计里排除，只报告成功请求的平均响应时间",
          "feedback": "排除失败会掩盖负载下的真实影响；错误率和响应时间都要按同一场景完整分析。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Before an event, checkout load testing shows 95th-percentile (p95) latency above threshold and rising errors. Which response is most useful?",
      "options": [
        {
          "id": "analyze-and-improve",
          "label": "Keep the scenario and metrics, locate the bottleneck, improve it, rerun, and compare the results",
          "feedback": "Correct. Load testing is useful when repeatable load and thresholds expose a bottleneck and the next run verifies the improvement.",
          "correct": true
        },
        {
          "id": "single-request",
          "label": "Test one request once; if it succeeds, full-event checkout will not time out",
          "feedback": "One request applies no target load and cannot show latency, throughput, or errors under concurrency.",
          "correct": false
        },
        {
          "id": "hide-errors",
          "label": "Exclude failed requests and report only the average response time of successful requests",
          "feedback": "Excluding failures hides the real impact under load; errors and latency must be analyzed for the same complete scenario.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "quality-gate",
    "zh": {
      "title": "PR 的 45 个测试都通过，但报告显示覆盖率 68%，要求至少 80%。下一步怎样做？",
      "options": [
        {
          "id": "check-log",
          "label": "根据报告补上未覆盖路径的测试，再检查新结果",
          "feedback": "失败的是覆盖率条件。补测并重新验证，才能证明这次改动满足约定标准。",
          "correct": true
        },
        {
          "id": "admin-bypass",
          "label": "保持代码和测试不变，再运行一次相同检查",
          "feedback": "相同测试重复通过，不会自动覆盖原本没有运行的路径。",
          "correct": false
        },
        {
          "id": "panic-rollback",
          "label": "把阈值从 80% 调到 60%，再检查是否通过",
          "feedback": "这样改变了准入标准，并未补上报告指出的测试缺口。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "All 45 PR tests pass, but coverage is 68% against a required 80%. What should happen next?",
      "options": [
        {
          "id": "check-log",
          "label": "Add tests for the uncovered paths, then check the new result",
          "feedback": "Coverage is the failed condition. Adding tests and verifying again shows whether the agreed criteria are met.",
          "correct": true
        },
        {
          "id": "admin-bypass",
          "label": "Rerun the same checks without changing the code or tests",
          "feedback": "Repeating the same tests does not automatically exercise missing paths.",
          "correct": false
        },
        {
          "id": "panic-rollback",
          "label": "Lower the threshold to 60%, then check whether it passes",
          "feedback": "This changes the admission rule without covering the gap identified in the report.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "terminal",
    "zh": {
      "title": "Agent 让你运行 npm install 和 npm run dev，但终端刚打开，不确定当前在哪个目录。应该先做什么？",
      "options": [
        {
          "id": "paste-anywhere",
          "label": "把两条命令一次粘贴运行，报错后再寻找项目",
          "feedback": "命令依赖当前目录；一次执行多条还会让后续命令在前一步失败后继续，增加混乱。",
          "correct": false
        },
        {
          "id": "confirm-directory",
          "label": "先用 pwd 和 ls 确认项目目录，再逐条运行并看输出",
          "feedback": "先确认作用目标能避免在错误目录安装或启动；逐条执行也能保留第一条可处理的结果。",
          "correct": true
        },
        {
          "id": "add-sudo",
          "label": "先给两条命令加 sudo，避免之后出现权限错误",
          "feedback": "尚未出现权限问题时提高权限会扩大影响范围，也不能解决当前目录是否正确。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An Agent asks you to run npm install and npm run dev, but the terminal just opened and you do not know the current directory. What comes first?",
      "options": [
        {
          "id": "paste-anywhere",
          "label": "Paste both commands at once and locate the project only after an error",
          "feedback": "Commands depend on the current directory, and batching them may continue after the first one fails.",
          "correct": false
        },
        {
          "id": "confirm-directory",
          "label": "Use pwd and ls to confirm the project, then run each command and read its output",
          "feedback": "Confirming the target avoids changing the wrong directory, and one-at-a-time execution preserves the first actionable result.",
          "correct": true
        },
        {
          "id": "add-sudo",
          "label": "Add sudo to both commands before any permission error appears",
          "feedback": "Increasing privileges expands the impact and does not establish whether the command is running in the correct project.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "browser-devtools",
    "zh": {
      "title": "保存按钮点击后没有更新，页面提示需要看服务器返回的失败原因。先打开哪个面板？",
      "options": [
        {
          "id": "network",
          "label": "打开 Network，查看保存请求的状态码、请求内容和响应",
          "feedback": "对。服务器返回的状态和响应内容属于网络请求证据，Network 能把失败停在哪一步显示出来。",
          "correct": true
        },
        {
          "id": "elements",
          "label": "打开 Elements，反复修改按钮文字直到页面看起来像保存成功",
          "feedback": "Elements 适合检查节点和样式，改文字不能证明请求成功，也看不到服务器返回的原因。",
          "correct": false
        },
        {
          "id": "storage",
          "label": "打开 Storage，先删除所有浏览器数据再重新点击保存",
          "feedback": "清除存储可能丢失登录态和草稿，却不能直接说明这次请求为何失败；应先保留并查看请求证据。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Clicking Save does not update the page, and the server response is needed to explain the failure. Which panel should you open first?",
      "options": [
        {
          "id": "network",
          "label": "Open Network and inspect the save request's status, payload, and response",
          "feedback": "Correct. The server status and response are network evidence, and Network shows where the save flow stopped.",
          "correct": true
        },
        {
          "id": "elements",
          "label": "Open Elements and keep changing the button text until it looks saved",
          "feedback": "Elements is for nodes and styles. Changing text cannot prove the request succeeded or reveal the server's reason.",
          "correct": false
        },
        {
          "id": "storage",
          "label": "Open Storage, delete all browser data, and click Save again",
          "feedback": "Clearing storage may lose a session or draft without explaining this failure. Preserve and inspect the request evidence first.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "npm",
    "zh": {
      "title": "刚 Clone 一个 JavaScript 项目，仓库里有 package.json 和锁文件，但没有 node_modules。下一步怎样恢复依赖？",
      "options": [
        {
          "id": "copy-node-modules",
          "label": "让同事压缩并传来他的 node_modules，直接覆盖到项目里",
          "feedback": "依赖目录可能与系统和环境不同，也无需手工传递；项目清单和锁文件才是可重建依据。",
          "correct": false
        },
        {
          "id": "install-from-manifest",
          "label": "进入项目目录运行 npm install，再执行项目定义的脚本",
          "feedback": "npm 会根据 package.json 和锁文件恢复依赖，随后 scripts 才能使用项目约定的工具。",
          "correct": true
        },
        {
          "id": "install-random-globals",
          "label": "看到缺哪个包就全局安装哪个，直到启动不再报错",
          "feedback": "逐个猜包会偏离项目锁定的依赖版本，也无法让其他环境按同一清单重建。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "You just cloned a JavaScript project. It contains package.json and a lockfile but no node_modules. How should dependencies be restored?",
      "options": [
        {
          "id": "copy-node-modules",
          "label": "Ask a teammate to zip their node_modules and copy it over the project",
          "feedback": "The dependency directory may differ by system and does not need manual transfer. The manifest and lockfile are the reproducible source.",
          "correct": false
        },
        {
          "id": "install-from-manifest",
          "label": "Enter the project directory, run npm install, then use the project's defined scripts",
          "feedback": "npm restores dependencies from package.json and the lockfile so project scripts can use the intended tools.",
          "correct": true
        },
        {
          "id": "install-random-globals",
          "label": "Install every missing package globally until the startup errors disappear",
          "feedback": "Guessing global packages bypasses the project's locked versions and cannot reproduce the same environment elsewhere.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "build",
    "zh": {
      "title": "流水线显示“Build succeeded”，但测试环境地址还是旧页面。下面哪个判断正确？",
      "options": [
        {
          "id": "artifact-only",
          "label": "核对这次构建的版本号，确认测试环境实际部署的是不是同一份工件",
          "feedback": "对。构建产物和环境里实际运行的版本不是同一件事。",
          "correct": true
        },
        {
          "id": "already-live",
          "label": "重新执行一次构建，再刷新测试地址，确认旧页面有没有被替换",
          "feedback": "重新构建只会再生成工件；如果部署步骤没有使用它，测试环境仍可能保持旧版本。",
          "correct": false
        },
        {
          "id": "all-tested",
          "label": "清理浏览器缓存后比较页面变化，把看到新页面作为构建成功的证据",
          "feedback": "缓存会影响看到的内容，但页面变化不能证明它对应哪次构建；应核对部署工件或版本标识。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The pipeline says “Build succeeded,” but the test URL still shows the old page. Which judgment is correct?",
      "options": [
        {
          "id": "artifact-only",
          "label": "Check this build's version and confirm whether the test environment actually deployed that same artifact",
          "feedback": "Correct. A build artifact and the version actually running in an environment are different things.",
          "correct": true
        },
        {
          "id": "already-live",
          "label": "Run the build again, then refresh the test URL to see whether the old page gets replaced",
          "feedback": "Building again only produces another artifact. If deployment does not use it, the test environment can remain old.",
          "correct": false
        },
        {
          "id": "all-tested",
          "label": "Clear browser cache and treat seeing the new page as evidence that this build succeeded",
          "feedback": "Cache can affect what you see, but a page change does not prove which build it came from. Check the deployed artifact or version identifier.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "ci",
    "zh": {
      "title": "有人说“我们有 CI”，但团队每周五才手动把所有分支合起来跑一次测试。这个判断对吗？",
      "options": [
        {
          "id": "not-continuous",
          "label": "不算完整的 CI；测试没有跟着每次改动自动运行",
          "feedback": "对。CI 的价值在于每次变更靠近共享主线时自动验证，而不是攒到最后。",
          "correct": true
        },
        {
          "id": "yes-because-tests",
          "label": "算 CI；只要合并前完整跑过一次测试就可以",
          "feedback": "是否自动、持续地围绕变更运行，决定了它是否发挥持续集成作用。",
          "correct": false
        },
        {
          "id": "only-deploy",
          "label": "不算 CI；因为检查通过后还没有自动发布到生产",
          "feedback": "自动发布属于 CD 的范围，CI 本身重点是构建和验证。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A team says it has CI, but only manually combines all branches and tests on Fridays. Is that right?",
      "options": [
        {
          "id": "not-continuous",
          "label": "Not complete CI; tests do not run automatically with each change",
          "feedback": "Correct. CI gains value by automatic verification as each change approaches the shared line, not at the end.",
          "correct": true
        },
        {
          "id": "yes-because-tests",
          "label": "It is CI; one full test run before merging is enough",
          "feedback": "Whether it runs automatically and continuously around changes determines whether it serves continuous integration.",
          "correct": false
        },
        {
          "id": "only-deploy",
          "label": "It is not CI because passing checks do not automatically deploy to production",
          "feedback": "Automatic release belongs to CD; CI itself focuses on build and verification.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "lint",
    "zh": {
      "title": "PR 的 Lint 已通过，但点击保存后页面没有任何提示。什么判断最准确？",
      "options": [
        {
          "id": "need-runtime-test",
          "label": "源码规则没有发现问题；还要实际操作或跑测试检查保存流程和反馈",
          "feedback": "对。Lint 通过不能证明按钮事件、网络请求或页面状态正确。",
          "correct": true
        },
        {
          "id": "feature-proven",
          "label": "Lint 通过就说明保存功能已经验收完成",
          "feedback": "静态检查没有执行用户操作，不能提供这种证据。",
          "correct": false
        },
        {
          "id": "delete-lint",
          "label": "既然还会出错，就不必运行 Lint",
          "feedback": "Lint 仍能及早发现另一类问题，只是不应被误当作全部验证。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A PR’s lint passes, but clicking save shows no feedback. What is the most accurate judgment?",
      "options": [
        {
          "id": "need-runtime-test",
          "label": "Source rules found no issue; operate or test the save flow and feedback next",
          "feedback": "Correct. Passing lint does not prove button events, network requests, or page state are right.",
          "correct": true
        },
        {
          "id": "feature-proven",
          "label": "Passing lint means saving is fully accepted",
          "feedback": "Static checking did not execute a user action, so it cannot supply that evidence.",
          "correct": false
        },
        {
          "id": "delete-lint",
          "label": "Since errors can still happen, do not run lint",
          "feedback": "Lint still catches another class of issues early; it simply should not be mistaken for all verification.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "hash",
    "zh": {
      "title": "脚本文件名已经随内容变化，但重新打开的网站仍显示旧文字；检查发现页面还引用旧文件。下一步先检查什么？",
      "options": [
        {
          "id": "entry",
          "label": "检查入口页面是否更新，以及它的缓存是否仍返回旧引用",
          "feedback": "决定性证据是页面还引用旧文件。先让入口引用新资源，再检查实际请求和显示结果。",
          "correct": true
        },
        {
          "id": "longer",
          "label": "把新文件的哈希从 8 位加长到完整摘要，再发布一次",
          "feedback": "当前证据是引用仍旧，不是文件名碰撞。增加摘要长度不会改变页面引用。",
          "correct": false
        },
        {
          "id": "no-cache",
          "label": "取消脚本文件的缓存，让浏览器重新请求当前引用",
          "feedback": "即使重新下载，当前引用仍指向旧脚本。应先检查入口页面与资源引用。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The script filename changed with its contents, but revisiting still shows old text. The page still references the old file. What should you inspect first?",
      "options": [
        {
          "id": "entry",
          "label": "Check whether the entry page and its cache still serve the old reference",
          "feedback": "The key evidence is the old reference. Update the entry to reference the new asset, then verify the request and displayed result.",
          "correct": true
        },
        {
          "id": "longer",
          "label": "Extend the new filename hash from 8 digits to the full digest and redeploy",
          "feedback": "The evidence points to an old reference, not a filename collision. A longer digest does not change that reference.",
          "correct": false
        },
        {
          "id": "no-cache",
          "label": "Disable caching for scripts so the browser fetches the referenced file again",
          "feedback": "Fetching the same old URL again still requests the old script. Inspect the entry page and its resource references first.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "tech-stack",
    "zh": {
      "title": "Agent 建议把现有项目的页面、数据服务和部署方式全部换成热门工具，但还没看当前代码。应该先做什么？",
      "options": [
        {
          "id": "inventory-current-stack",
          "label": "先盘点现有语言、框架、数据服务和运行方式，再判断具体替换收益",
          "feedback": "技术栈描述的是项目实际分工，只有知道现状和约束，替换才有可比较的成本与结果。",
          "correct": true
        },
        {
          "id": "replace-for-popularity",
          "label": "按热度一次替换全部工具，完成后再处理兼容和迁移问题",
          "feedback": "同时改变多层会扩大风险和排查范围，流行程度也不能证明适合当前项目。",
          "correct": false
        },
        {
          "id": "name-only-stack",
          "label": "只记录几个产品名称，不说明它们分别负责页面、数据还是部署",
          "feedback": "品牌清单没有表达职责，无法判断重复能力、缺口或某项替换会影响哪里。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An Agent proposes replacing a project's UI, data service, and deployment with popular tools before inspecting the code. What should happen first?",
      "options": [
        {
          "id": "inventory-current-stack",
          "label": "Inventory current languages, frameworks, data services, and runtime before judging replacement value",
          "feedback": "A stack describes actual responsibilities, and only current constraints make replacement cost and outcome comparable.",
          "correct": true
        },
        {
          "id": "replace-for-popularity",
          "label": "Replace every layer by popularity first and resolve migration and compatibility afterward",
          "feedback": "Changing many layers expands risk and diagnosis scope, while popularity does not prove fit.",
          "correct": false
        },
        {
          "id": "name-only-stack",
          "label": "List product names without saying which one owns UI, data, or deployment",
          "feedback": "A brand list hides responsibilities, so overlaps, gaps, and replacement impact cannot be judged.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "javascript",
    "zh": {
      "title": "收藏按钮点击后数字从 4 变成 5，但刷新页面又回到 4。怎样判断问题？",
      "options": [
        {
          "id": "ui-and-persistence",
          "label": "JavaScript 已更新当前画面，还要确认保存请求和服务器结果是否成功",
          "feedback": "浏览器逻辑可以立即改画面，刷新后的结果仍取决于数据是否真正保存。",
          "correct": true
        },
        {
          "id": "dom-change-is-save",
          "label": "数字已经变化，说明收藏完成，只需阻止页面刷新",
          "feedback": "画面变化只是当前浏览器状态，不能证明服务器已经保存收藏。",
          "correct": false
        },
        {
          "id": "client-permission-only",
          "label": "把收藏权限检查全部写进浏览器，服务器直接接受结果",
          "feedback": "浏览器代码可被修改，真实权限和数据规则必须由受控服务再次检查。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A favorite count changes from 4 to 5 after clicking but returns to 4 after refresh. How should the issue be understood?",
      "options": [
        {
          "id": "ui-and-persistence",
          "label": "JavaScript updated the current view, but the save request and server result still need verification",
          "feedback": "Browser logic can change the view immediately, while refresh depends on whether the data was persisted.",
          "correct": true
        },
        {
          "id": "dom-change-is-save",
          "label": "The number changed, so saving succeeded and refresh should simply be blocked",
          "feedback": "A view update is only browser state and does not prove the server stored the favorite.",
          "correct": false
        },
        {
          "id": "client-permission-only",
          "label": "Put all favorite permission checks in the browser and let the server accept the result",
          "feedback": "Browser code can be modified, so real permissions and data rules require a controlled server check.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "typescript",
    "zh": {
      "title": "用户资料规定 name 是文字，代码却读取 user.nmae；同时折扣公式把 20% 算成 20 倍。TypeScript 能解决什么？",
      "options": [
        {
          "id": "shape-not-business-proof",
          "label": "提前发现字段拼写或类型不符，但折扣业务公式仍需测试验证",
          "feedback": "类型系统能检查数据形状和使用方式，无法判断一个合法数字是否符合业务含义。",
          "correct": true
        },
        {
          "id": "types-prove-correctness",
          "label": "只要项目没有类型报错，字段和所有折扣结果就都正确",
          "feedback": "通过类型检查不代表逻辑正确，20 和 0.2 都可能是合法数字。",
          "correct": false
        },
        {
          "id": "silence-with-any",
          "label": "把用户资料和价格都标成 any，避免编辑器继续阻止运行",
          "feedback": "Any 关闭了最需要的结构检查，让拼写和错误用法更晚才暴露。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A user profile defines name as text, but code reads user.nmae, while a discount formula treats 20% as 20×. What can TypeScript solve?",
      "options": [
        {
          "id": "shape-not-business-proof",
          "label": "Catch misspelled fields and type mismatches early, while business formulas still need tests",
          "feedback": "Types check data shape and usage, but cannot know whether a valid number carries the correct business meaning.",
          "correct": true
        },
        {
          "id": "types-prove-correctness",
          "label": "If there are no type errors, every field and discount result must be correct",
          "feedback": "Passing type checks does not prove logic; both 20 and 0.2 can be valid numbers.",
          "correct": false
        },
        {
          "id": "silence-with-any",
          "label": "Mark profiles and prices as any so the editor stops blocking execution",
          "feedback": "Any disables the structural checks needed here and delays spelling and usage failures.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "python",
    "zh": {
      "title": "要用 Python 把 200 份 Markdown 汇总成 CSV，原文件不能被覆盖。运行脚本前最重要的准备是什么？",
      "options": [
        {
          "id": "explicit-safe-file-plan",
          "label": "确认输入目录、输出文件和覆盖规则，先用少量副本试运行",
          "feedback": "文件自动化的主要风险是作用范围和写入结果，先明确并试运行可以避免批量损坏。",
          "correct": true
        },
        {
          "id": "run-on-production-files",
          "label": "直接对 200 份正式文件运行，若结果不对再从编辑器撤销",
          "feedback": "批量脚本可能跨文件写入，编辑器撤销不一定覆盖整个过程；应先用副本验证范围和输出。",
          "correct": false
        },
        {
          "id": "syntax-only-check",
          "label": "只确认脚本能够启动，不检查输出列、编码和异常文件的处理方式",
          "feedback": "能够启动只说明语法和环境基本可用，不能证明批量输入、输出和异常路径安全。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A Python script will summarize 200 Markdown files into CSV without overwriting sources. What preparation matters most before running?",
      "options": [
        {
          "id": "explicit-safe-file-plan",
          "label": "Confirm input directory, output file, and overwrite rules, then test with a small copied sample",
          "feedback": "File automation risk comes from scope and writes, so explicit targets and a trial prevent batch damage.",
          "correct": true
        },
        {
          "id": "run-on-production-files",
          "label": "Run it directly on all 200 production files and use editor Undo if the result is wrong",
          "feedback": "Batch scripts may write across files, and editor Undo may not cover the process; test scope and output on copies first.",
          "correct": false
        },
        {
          "id": "syntax-only-check",
          "label": "Check only that the script starts, without verifying output columns, encoding, or malformed files",
          "feedback": "Starting proves only that syntax and runtime basically work, not that batch input, output, and error paths are safe.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "pointer",
    "zh": {
      "title": "配置中有嵌套的 theme 对象。用 { ...original } 创建草稿后，把 draft.theme.mode 改成 dark。原配置的 theme.mode 会怎样？",
      "options": [
        {
          "id": "nested",
          "label": "也会变成 dark，因为两份外层对象仍共用 theme",
          "feedback": "浅拷贝创建了新的外层对象，但没有复制内部 theme。改它的 mode 会影响双方读到的结果。",
          "correct": true
        },
        {
          "id": "outer",
          "label": "保持 light，因为草稿的外层已经是一个新对象",
          "feedback": "外层独立只保护第一层的替换；这里修改的是仍被共用的 theme 对象。",
          "correct": false
        },
        {
          "id": "cancel",
          "label": "等到点击取消时，才从 light 变成 dark",
          "feedback": "共享对象在执行属性修改时就已变化。取消不是这次变化的触发点。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The settings contain a nested theme object. After creating a draft with { ...original }, you set draft.theme.mode to dark. What happens to original.theme.mode?",
      "options": [
        {
          "id": "nested",
          "label": "It also becomes dark because both outer objects share theme",
          "feedback": "A shallow copy creates a new outer object, but does not copy the nested theme. Updating its mode affects what both names read.",
          "correct": true
        },
        {
          "id": "outer",
          "label": "It stays light because the draft has a new outer object",
          "feedback": "A separate outer object isolates top-level replacement. This edit changes the still-shared theme object.",
          "correct": false
        },
        {
          "id": "cancel",
          "label": "It changes from light to dark only when Cancel is clicked",
          "feedback": "The shared object changes when its property is edited. Cancel is not the trigger.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "react",
    "zh": {
      "title": "购物车数量会在商品卡、顶部徽标和结算区同时出现，修改后要一起更新。怎样组织更省事？",
      "options": [
        {
          "id": "shared-state-components",
          "label": "让多个 React 组件读取同一份状态，数量变化后统一重新显示",
          "feedback": "共享状态作为唯一画面依据，能避免三个位置各自维护并逐个同步。",
          "correct": true
        },
        {
          "id": "manual-dom-updates",
          "label": "分别查找三个 DOM 节点，每次点击后手工修改它们的文字",
          "feedback": "手工同步容易遗漏新位置，也把数据来源分散在多个操作步骤里。",
          "correct": false
        },
        {
          "id": "react-persists-data",
          "label": "只更新 React 状态，并假设刷新页面后购物车会自动保留",
          "feedback": "React 负责当前画面更新，刷新后的数据仍需要本地或服务器持久化。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Cart quantity appears in a product card, top badge, and checkout summary and must update together. How should it be organized?",
      "options": [
        {
          "id": "shared-state-components",
          "label": "Have multiple React components read one state and render together when quantity changes",
          "feedback": "One state becomes the view source, avoiding separate values and manual synchronization across locations.",
          "correct": true
        },
        {
          "id": "manual-dom-updates",
          "label": "Find three DOM nodes and manually rewrite each one's text after every click",
          "feedback": "Manual synchronization misses new locations easily and scatters the data source across operations.",
          "correct": false
        },
        {
          "id": "react-persists-data",
          "label": "Update React state and assume the cart remains after a page refresh",
          "feedback": "React updates the current view; persistence after refresh still requires local or server storage.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "vue",
    "zh": {
      "title": "设置页的主题名称在输入框和预览标题中同时出现，用户输入时预览要立即变化。Vue 应该负责什么？",
      "options": [
        {
          "id": "reactive-view-update",
          "label": "让输入和预览绑定同一份响应式状态，变化时自动更新画面",
          "feedback": "Vue 根据状态重新显示相关组件，避免手工查找和同步多个文本节点。",
          "correct": true
        },
        {
          "id": "manual-text-node",
          "label": "监听每次按键后直接寻找预览 DOM，并替换它的文字",
          "feedback": "手工操作绕开了响应式数据来源，页面增加新预览位置后容易遗漏。",
          "correct": false
        },
        {
          "id": "automatic-server-save",
          "label": "只要使用 Vue，输入的主题名称就会自动保存到服务器",
          "feedback": "Vue 能更新当前界面，不会自动提供请求、数据库或长期保存。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A theme name appears in a settings input and preview heading, and the preview should change while typing. What should Vue own?",
      "options": [
        {
          "id": "reactive-view-update",
          "label": "Bind input and preview to one reactive state so the view updates when it changes",
          "feedback": "Vue renders related components from state, avoiding manual lookup and synchronization of text nodes.",
          "correct": true
        },
        {
          "id": "manual-text-node",
          "label": "After each keypress, find the preview DOM and replace its text directly",
          "feedback": "Manual operations bypass the reactive source and easily miss new preview locations.",
          "correct": false
        },
        {
          "id": "automatic-server-save",
          "label": "Assume using Vue automatically saves the theme name to the server",
          "feedback": "Vue updates the current interface; it does not automatically provide requests, databases, or persistence.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "nextjs",
    "zh": {
      "title": "内容站用 React，需要每篇文章有独立网址、可被搜索引擎读取，并统一处理页面结构。Next.js 适合负责什么？",
      "options": [
        {
          "id": "routing-rendering-framework",
          "label": "负责路由、页面渲染和数据加载组织，业务存储与权限仍单独实现",
          "feedback": "Next.js 扩展 React 的网站结构和渲染能力，不会自动生成符合业务的数据与授权。",
          "correct": true
        },
        {
          "id": "automatic-business-backend",
          "label": "安装 Next.js 后，文章数据库、登录权限和后台管理会自动完成",
          "feedback": "框架提供构建能力，不知道项目的数据模型、账号规则或管理流程。",
          "correct": false
        },
        {
          "id": "required-for-component",
          "label": "只要页面里有一个 React 按钮，就必须迁移整个项目到 Next.js",
          "feedback": "单个组件不需要完整网站框架，是否采用取决于路由、渲染和部署任务。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A React content site needs a URL per article, search-readable pages, and consistent page structure. What should Next.js own?",
      "options": [
        {
          "id": "routing-rendering-framework",
          "label": "Organize routing, page rendering, and data loading while storage and permissions remain explicit",
          "feedback": "Next.js extends React with site structure and rendering, but cannot invent the project's business data or authorization.",
          "correct": true
        },
        {
          "id": "automatic-business-backend",
          "label": "Install Next.js and receive an article database, login permissions, and admin workflow automatically",
          "feedback": "The framework provides building capabilities, not the project's data model, account rules, or operations.",
          "correct": false
        },
        {
          "id": "required-for-component",
          "label": "Migrate the entire project to Next.js whenever one React button appears",
          "feedback": "One component does not require a full-site framework; the choice depends on routing, rendering, and deployment.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "tailwind-css",
    "zh": {
      "title": "给卡片加入一段更长的说明后，文字显得拥挤，离卡片边缘很近。应该先改哪类 Tailwind 类名？",
      "options": [
        {
          "id": "padding",
          "label": "控制内边距的 p-* 类名",
          "feedback": "对。内容与卡片边缘的距离由 padding 控制，p-* 正是在调整内边距。",
          "correct": true
        },
        {
          "id": "radius",
          "label": "控制外边距的 m-* 类名",
          "feedback": "外边距会改变卡片与邻居的距离，不能增加内容与自身边缘之间的空间。",
          "correct": false
        },
        {
          "id": "border",
          "label": "控制圆角的 rounded-* 类名",
          "feedback": "rounded-* 只改变角的形状，不会把内容从边缘推开。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "After adding longer copy to a card, the text feels cramped against its edges. Which Tailwind utility should you change first?",
      "options": [
        {
          "id": "padding",
          "label": "A p-* utility that controls padding",
          "feedback": "Correct. Padding controls the space between content and the card edge, and p-* utilities change that padding.",
          "correct": true
        },
        {
          "id": "radius",
          "label": "An m-* utility that controls outer margin",
          "feedback": "Outer margin changes the card’s distance from neighbors, not the space between its content and edge.",
          "correct": false
        },
        {
          "id": "border",
          "label": "A rounded-* utility that controls corner radius",
          "feedback": "rounded-* changes the corner shape, not the distance between content and the edge.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "shadcn-ui",
    "zh": {
      "title": "运行 shadcn/ui 的 Button 添加命令后，团队应该怎样理解这个组件？",
      "options": [
        {
          "id": "project-owned-code",
          "label": "Button 代码已经写进项目，页面引用这份文件，后续修改和升级由项目自己维护",
          "feedback": "对。shadcn/ui 交付的是进入项目的组件源码，不是只能远程调用的黑盒服务。",
          "correct": true
        },
        {
          "id": "remote-service",
          "label": "Button 仍托管在 shadcn/ui 服务器，项目只能调整调用参数，不能修改组件文件",
          "feedback": "添加命令会把代码写进项目，项目可以直接修改，也要承担后续维护。",
          "correct": false
        },
        {
          "id": "automatic-upgrades",
          "label": "Button 会自动跟随所有上游更新，不需要检查本地改动或兼容性",
          "feedback": "本地组件不会自动安全升级；更新时仍要审查项目自己的修改和使用位置。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "After running the shadcn/ui command to add Button, how should the team understand the component?",
      "options": [
        {
          "id": "project-owned-code",
          "label": "Button code now lives in the project, pages import that file, and the project owns future changes and upgrades",
          "feedback": "Correct. shadcn/ui provides component source that enters the project, not a remote black-box service.",
          "correct": true
        },
        {
          "id": "remote-service",
          "label": "Button remains hosted by shadcn/ui, so the project can only change call parameters and cannot edit the component file",
          "feedback": "The add command writes code into the project, where it can be edited and must be maintained.",
          "correct": false
        },
        {
          "id": "automatic-upgrades",
          "label": "Button automatically follows every upstream update without reviewing local changes or compatibility",
          "feedback": "A local component does not upgrade safely by itself; updates still require review of project changes and usage.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "ai-basics",
    "zh": {
      "title": "日历助手回答“明天下午有两场会”，但产品从未给它日历权限，也没有调用日历接口。应该怎样修正？",
      "options": [
        {
          "id": "authorized-tool-result",
          "label": "由应用申请权限并调用日历工具，再把真实结果交给 AI 组织回答",
          "feedback": "AI 只能根据收到的上下文和工具结果回答，真实日程必须由受控产品能力读取。",
          "correct": true
        },
        {
          "id": "model-direct-access",
          "label": "继续让模型根据用户语气推测日程，不需要连接实际日历",
          "feedback": "语言模型无法凭空知道私人数据，推测会把不存在的信息当成真实结果。",
          "correct": false
        },
        {
          "id": "claim-action-without-call",
          "label": "只在提示词中要求“必须查询日历”，并把回答当作已执行",
          "feedback": "提示词不能创造工具和权限，是否查询必须由应用实际调用记录证明。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A calendar assistant says there are two meetings tomorrow afternoon, but the product has no calendar permission and made no calendar call. How should this be fixed?",
      "options": [
        {
          "id": "authorized-tool-result",
          "label": "Have the app request permission, call the calendar tool, and give real results to the AI for wording",
          "feedback": "AI answers from supplied context and tool results; private schedules require a controlled product capability.",
          "correct": true
        },
        {
          "id": "model-direct-access",
          "label": "Let the model infer meetings from the user's tone without connecting a real calendar",
          "feedback": "A language model cannot know private data without access, so inference turns invented information into a claimed result.",
          "correct": false
        },
        {
          "id": "claim-action-without-call",
          "label": "Write You must query the calendar in the prompt and treat the response as executed",
          "feedback": "A prompt creates neither tools nor permission; actual execution requires an application call record.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "ai-hallucination",
    "zh": {
      "title": "AI 说“城市博物馆周一开放到 22:00”，还把它排进了晚间行程。哪种做法最合适？",
      "options": [
        {
          "id": "check-sources",
          "label": "联网查看博物馆官网、官方预约页和当天场次，核对日期后再决定是否保留这项行程",
          "feedback": "对。开放时间可以从带日期的一手来源直接核验，搜索摘要和 AI 的详细描述都不能替代官方信息。",
          "correct": true
        },
        {
          "id": "trust-detail",
          "label": "攻略写得很具体，还有具体时间，所以直接照着去",
          "feedback": "具体时间让说法更像真的，却不能证明它准确；到现场才发现闭馆会直接打乱行程。",
          "correct": false
        },
        {
          "id": "ask-again",
          "label": "继续问同一个 AI 它是否确定，不查看其他来源",
          "feedback": "同一模型重复确认不是独立证据，应回到官网、官方预约页或场馆公告。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "AI says the city museum is open until 10 PM on Monday and puts it in the evening itinerary. What is the best action?",
      "options": [
        {
          "id": "check-sources",
          "label": "Research the museum's official website, official reservation page, and daily sessions online, then check the date before keeping it in the itinerary",
          "feedback": "Correct. Dated primary sources can verify opening hours directly; a search summary or detailed AI wording cannot replace official information.",
          "correct": true
        },
        {
          "id": "trust-detail",
          "label": "Follow the guide because it includes a specific time",
          "feedback": "A precise time makes the claim sound real but does not prove accuracy. Arriving to find it closed would disrupt the trip.",
          "correct": false
        },
        {
          "id": "ask-again",
          "label": "Keep asking the same AI if it is sure without checking another source",
          "feedback": "Repeated confirmation from the same model is not independent evidence. Return to the official site, official reservation page, or venue notice.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "vibe-coding",
    "zh": {
      "title": "AI 做出的活动报名页已经能在本机打开，团队准备明天收集真实姓名和手机号。下一步更合适的是？",
      "options": [
        {
          "id": "review-before-release",
          "label": "暂停继续堆功能，先检查数据流、权限和依赖，补关键测试并由人审查改动",
          "feedback": "对。本机画面正常只证明原型能运行；接触真实个人信息前，需要把它当正式软件检查和验证。",
          "correct": true
        },
        {
          "id": "accept-and-ship",
          "label": "继续接受 AI 的全部修改，只要页面没有报错就直接上线",
          "feedback": "没有报错不能证明数据处理、权限和异常路径安全，真实信息不适合只靠原型体验验收。",
          "correct": false
        },
        {
          "id": "polish-first",
          "label": "先让 AI 把颜色和动画做精致，视觉完成后再默认功能可靠",
          "feedback": "视觉完成度与数据是否正确保存、是否越权没有直接关系，不能代替技术检查。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An AI-built event signup page works locally, and the team plans to collect real names and phone numbers tomorrow. What is the better next step?",
      "options": [
        {
          "id": "review-before-release",
          "label": "Pause feature work, inspect data flow, permissions, and dependencies, add critical tests, and have a person review the changes",
          "feedback": "Correct. A working local screen proves only that the prototype runs. Software handling real personal data needs formal review and verification.",
          "correct": true
        },
        {
          "id": "accept-and-ship",
          "label": "Keep accepting every AI change and ship as soon as the page shows no error",
          "feedback": "No visible error does not establish safe data handling, authorization, or failure behavior.",
          "correct": false
        },
        {
          "id": "polish-first",
          "label": "Polish colors and animation first, then treat visual completion as proof that the feature is reliable",
          "feedback": "Visual polish says nothing about correct storage or access control and cannot replace technical checks.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "multimodal",
    "zh": {
      "title": "你想让 AI 判断手机结账页里的付款按钮为什么看不见，怎样做最合适？",
      "options": [
        {
          "id": "attach-and-scope",
          "label": "附上当前截图，说明按钮本应出现的位置，请它区分画面能确认的线索和需要检查代码才能确认的原因",
          "feedback": "对。图片提供当前画面，文字说明问题和判断边界。模型先分析可见线索；原因还要由你，或获得项目工具权限的 Agent，在真实项目中验证。",
          "correct": true
        },
        {
          "id": "vague-text-only",
          "label": "只说“页面有问题，帮我修一下”，不提供截图或具体表现",
          "feedback": "模型没有收到当前画面，也不知道哪里异常，只能猜测。多模态任务仍需要明确提供相关信息。",
          "correct": false
        },
        {
          "id": "assume-full-access",
          "label": "只上传截图，并默认 AI 已经看见全部代码、隐藏状态和真实运行过程",
          "feedback": "截图只包含画面中的像素，不会自动带上源代码、设备状态或运行数据。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "You want AI to explain why the payment button is not visible on a mobile checkout page. What is the best approach?",
      "options": [
        {
          "id": "attach-and-scope",
          "label": "Attach the current screenshot, say where the button should appear, and ask it to separate visible evidence from causes that require checking the code",
          "feedback": "Correct. The image supplies the current screen, while the text defines the question and its limits. The model can inspect visible clues first; you, or an agent with project-tool access, must then verify the cause in the real project.",
          "correct": true
        },
        {
          "id": "vague-text-only",
          "label": "Only say “the page is broken, fix it” without a screenshot or a specific symptom",
          "feedback": "The model has neither the current screen nor a clear symptom, so it can only guess. A multimodal task still needs relevant information.",
          "correct": false
        },
        {
          "id": "assume-full-access",
          "label": "Upload only the screenshot and assume the AI can now see all code, hidden state, and runtime behavior",
          "feedback": "A screenshot contains only visible pixels. It does not automatically include source code, device state, or runtime data.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "context-engineering",
    "zh": {
      "title": "一个长任务里已经有需求、确认过的架构决定、几十页旧日志和大量重复工具输出。Agent 开始忽略最新限制，下一轮该怎样整理？",
      "options": [
        {
          "id": "curate-context",
          "label": "保留目标、限制、架构决定和未解决问题；压缩旧日志，只在定位需要时按路径取回原文",
          "feedback": "对。当前目标和限制要持续可见；重复记录可以改成摘要，需要细节时再按文件位置读取原文。",
          "correct": true
        },
        {
          "id": "include-everything",
          "label": "把全部历史和工具原始输出再次放入上下文，避免遗漏任何一个字",
          "feedback": "信息越全不等于重点越清楚；重复输出会占空间并掩盖当前限制。",
          "correct": false
        },
        {
          "id": "prompt-only",
          "label": "只把最后一句提示词改得更强硬，历史和工具结果保持原样",
          "feedback": "问题不只在措辞。旧信息如何筛选、压缩和取回也是上下文工程的一部分。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A long task contains requirements, approved architecture decisions, dozens of pages of old logs, and repeated tool output. The agent starts missing the newest constraint. How should the next turn be prepared?",
      "options": [
        {
          "id": "curate-context",
          "label": "Keep the goal, constraints, architecture decisions, and open issues; compress old logs and retrieve originals by path only when needed",
          "feedback": "Correct. Critical decisions stay visible, low-signal material is compressed, and locators preserve access to details on demand.",
          "correct": true
        },
        {
          "id": "include-everything",
          "label": "Insert the entire history and every raw tool result again so no word can be omitted",
          "feedback": "More material does not mean clearer priorities. Repeated output consumes context and can bury the current constraint.",
          "correct": false
        },
        {
          "id": "prompt-only",
          "label": "Make only the final instruction more forceful and leave all history and tool results unchanged",
          "feedback": "Wording is only one part. Selecting, compressing, and retrieving the rest of the context also matters.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "token",
    "zh": {
      "title": "团队按“一个汉字等于一个 Token”估算上下文和费用，实际账单总是对不上。应该怎样估算？",
      "options": [
        {
          "id": "model-specific-usage",
          "label": "按所用模型的实际分词和用量统计输入、输出与相关上下文",
          "feedback": "Token 划分随模型和内容变化，真实用量或对应分词工具比字符数规则可靠。",
          "correct": true
        },
        {
          "id": "one-character-one-token",
          "label": "继续按每个汉字、字母和标点各算一个 Token",
          "feedback": "字符与 Token 不是固定一一对应，代码、中文和英文都可能被不同方式切分。",
          "correct": false
        },
        {
          "id": "count-output-only",
          "label": "只统计 AI 最终回答，系统规则、历史和文件都不计入",
          "feedback": "模型读取的输入同样占用上下文和用量，不能只看屏幕上新增的回答。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A team estimates context and cost with one Chinese character equals one token, but bills never match. How should usage be estimated?",
      "options": [
        {
          "id": "model-specific-usage",
          "label": "Use the selected model's tokenizer or actual usage for input, output, and included context",
          "feedback": "Tokenization varies by model and content, so actual usage or the matching tokenizer is more reliable than character rules.",
          "correct": true
        },
        {
          "id": "one-character-one-token",
          "label": "Keep counting each character, letter, and punctuation mark as one token",
          "feedback": "Characters and tokens are not one-to-one; code, Chinese, and English may all split differently.",
          "correct": false
        },
        {
          "id": "count-output-only",
          "label": "Count only the final AI answer and ignore system rules, history, and files",
          "feedback": "Input read by the model also consumes context and usage, not only newly displayed output.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "context-window",
    "zh": {
      "title": "Agent 开始遗漏刚补充的要求，回答也常在结尾被截断。准备继续同一任务前，先怎么处理？",
      "options": [
        {
          "id": "remove-noise",
          "label": "梳理当前任务必需的规则、资料和近期决定，摘要旧内容并预留回答空间",
          "feedback": "对。上下文要优先保留当前任务需要的信息；旧内容可浓缩，但仍要给回答留出空间。",
          "correct": true
        },
        {
          "id": "remove-output",
          "label": "保留所有输入，把给回答预留的空间压到最小",
          "feedback": "输入都放进去却没有足够输出空间，模型仍可能无法完成回答。",
          "correct": false
        },
        {
          "id": "paste-more",
          "label": "再发一条消息，把剩余资料继续贴进去",
          "feedback": "新消息也会占用上下文。没有先筛掉无关内容，只会让空间更紧张。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An Agent starts missing newly added requirements and replies often cut off. Before continuing the same task, what should you do first?",
      "options": [
        {
          "id": "remove-noise",
          "label": "Identify the rules, material, and recent decisions the task needs, summarize older content, and reserve answer space",
          "feedback": "Correct. Prioritize material the current task needs, compress older content, and leave room for a response.",
          "correct": true
        },
        {
          "id": "remove-output",
          "label": "Keep every input and reduce the response reserve as much as possible",
          "feedback": "Without enough response space, the model may still be unable to complete the answer.",
          "correct": false
        },
        {
          "id": "paste-more",
          "label": "Send another message and paste the remaining material there",
          "feedback": "The new message also consumes context. Adding more without removing noise makes the limit worse.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "system-prompt",
    "zh": {
      "title": "客服 Agent 有“不能承诺退款结果”的固定规则，但用户在聊天里要求它马上承诺。哪条应优先？",
      "options": [
        {
          "id": "system-rule",
          "label": "保留系统规则，说明可执行的下一步而不是承诺结果",
          "feedback": "对。系统提示词用于产品级固定约束，用户消息不能覆盖它。",
          "correct": true
        },
        {
          "id": "latest-user",
          "label": "按最新用户消息承诺，因为用户最了解自己的情况",
          "feedback": "用户需求重要，但不能推翻产品设定的安全和业务边界。",
          "correct": false
        },
        {
          "id": "copy-rule",
          "label": "把整段系统提示词原样发给用户要求确认",
          "feedback": "应执行规则并说明可做什么，不需要暴露内部提示词全文。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A support agent has a fixed rule not to promise refund outcomes, but a user asks for an immediate promise. Which instruction wins?",
      "options": [
        {
          "id": "system-rule",
          "label": "Keep the system rule and offer an actionable next step instead of a promise",
          "feedback": "Correct. System instructions set product-level constraints that a user message cannot override.",
          "correct": true
        },
        {
          "id": "latest-user",
          "label": "Promise it because the newest user message knows the situation best",
          "feedback": "User needs matter, but cannot override product safety and business boundaries.",
          "correct": false
        },
        {
          "id": "copy-rule",
          "label": "Send the full system prompt to the user for confirmation",
          "feedback": "Apply the rule and explain available action; do not expose the internal prompt.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "conversation-history",
    "zh": {
      "title": "用户在很长对话后说“把第二条改短”，界面能看到所有旧消息，但模型答错了对象。怎样改进？",
      "options": [
        {
          "id": "relevant-history-context",
          "label": "在本次请求中带回相关列表和指代，并控制无关历史的长度",
          "feedback": "模型需要当前所指内容才能解析“第二条”，界面可见不代表请求实际包含它。",
          "correct": true
        },
        {
          "id": "send-everything-forever",
          "label": "每次永久发送完整历史，不考虑窗口、费用或无关信息",
          "feedback": "全量历史会持续占用空间和成本，还可能让旧目标干扰当前任务。",
          "correct": false
        },
        {
          "id": "visible-means-sent",
          "label": "保持界面显示旧消息即可，不必检查请求里有没有发送",
          "feedback": "产品保存和展示消息是一层，组装模型输入是另一层，二者不能互相替代。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "After a long chat, a user says Shorten the second one. All old messages are visible, but the model edits the wrong item. How should this improve?",
      "options": [
        {
          "id": "relevant-history-context",
          "label": "Include the relevant list and reference in this request while limiting unrelated history",
          "feedback": "The model needs the referenced content to resolve second; visible history does not prove it was sent.",
          "correct": true
        },
        {
          "id": "send-everything-forever",
          "label": "Always send the complete history without considering window, cost, or relevance",
          "feedback": "Full history continuously consumes space and cost and may let outdated goals interfere with the task.",
          "correct": false
        },
        {
          "id": "visible-means-sent",
          "label": "Keep old messages visible in the UI and do not inspect whether the request includes them",
          "feedback": "Saving and displaying messages is separate from assembling model input, so one cannot replace the other.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "prompt",
    "zh": {
      "title": "AI 做出来的东西和想的不一样，第一步应该做什么？",
      "options": [
        {
          "id": "refine-prompt",
          "label": "把要求说得更具体：对象、字段、怎样算完成",
          "feedback": "对。AI 是按提示词工作的，结果偏了多半是提示词里缺信息。补上「要什么、不要什么、怎么验收」，下一轮就准了。",
          "correct": true
        },
        {
          "id": "change-tool",
          "label": "立刻换一个 AI 工具试试",
          "feedback": "换工具解决不了信息缺失：同样的模糊要求，换一个 AI 还是只能猜。先把话说清通常更快。",
          "correct": false
        },
        {
          "id": "repeat-vague",
          "label": "反复说「不对，重做」，等它自己领会",
          "feedback": "「不对」没有告诉 AI 哪里不对。每轮重做都在烧时间和额度，不如一句话说清要改哪里。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The AI's result is not what you wanted. What should you do first?",
      "options": [
        {
          "id": "refine-prompt",
          "label": "Make the request specific: object, fields, and what counts as done",
          "feedback": "Correct. The AI works from your prompt; off-target results usually mean missing information. Add \"what, what not, and how to verify.\"",
          "correct": true
        },
        {
          "id": "change-tool",
          "label": "Switch to a different AI tool right away",
          "feedback": "A different tool still has to guess from the same vague request. Clarifying is almost always faster.",
          "correct": false
        },
        {
          "id": "repeat-vague",
          "label": "Keep saying \"wrong, redo it\" until it gets you",
          "feedback": "\"Wrong\" does not say what is wrong. Each redo burns time and quota; one specific sentence beats ten vague ones.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "stateless-request",
    "zh": {
      "title": "服务端只收到一句“继续完成刚才的表格”，请求里没有表格或上一轮结果。模型应该如何获得背景？",
      "options": [
        {
          "id": "rebuild-needed-context",
          "label": "由应用在每次请求中重新附上当前表格、目标和相关上一轮结果",
          "feedback": "请求本身无状态，模型只能使用这次收到的内容，应用需要重建必要背景。",
          "correct": true
        },
        {
          "id": "model-remembers-session",
          "label": "只发送“继续”，模型会根据用户账号自动恢复之前内容",
          "feedback": "账号或会话存在不代表模型持有旧请求，缺少背景时“继续”没有可确定对象。",
          "correct": false
        },
        {
          "id": "ui-history-is-context",
          "label": "让聊天界面保留旧表格即可，不必把它加入新请求",
          "feedback": "界面存储服务于展示，只有实际组装进请求的内容才能被模型读取。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A server receives only Continue the previous table, with no table or prior result in the request. How should the model get context?",
      "options": [
        {
          "id": "rebuild-needed-context",
          "label": "Have the application attach the current table, goal, and relevant prior result to each request",
          "feedback": "The request is stateless and the model can only use current input, so the application rebuilds required background.",
          "correct": true
        },
        {
          "id": "model-remembers-session",
          "label": "Send only Continue and let the model recover previous content from the user account",
          "feedback": "An account or session does not mean the model retains prior requests, leaving Continue without a known object.",
          "correct": false
        },
        {
          "id": "ui-history-is-context",
          "label": "Keep the old table visible in the chat UI without adding it to the new request",
          "feedback": "UI storage supports display; only content assembled into the request can be read by the model.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "structured-output",
    "zh": {
      "title": "页面要把模型结果显示成任务卡片。哪种返回方式最容易稳定处理？",
      "options": [
        {
          "id": "schema",
          "label": "要求符合任务字段 schema 的结构化结果，并校验必填字段",
          "feedback": "对。字段固定后，程序才能可靠地渲染、校验和处理缺失值。",
          "correct": true
        },
        {
          "id": "prose",
          "label": "让模型写一段自然语言，再用字符串规则猜标题和截止日",
          "feedback": "自然语言格式容易变化，解析规则会脆弱且难以发现遗漏。",
          "correct": false
        },
        {
          "id": "html",
          "label": "让模型直接返回整张任务卡片的 HTML",
          "feedback": "模型生成的展示 HTML 难以安全校验；应返回数据，再由界面负责渲染。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A page must render model results as task cards. Which return format is most reliable?",
      "options": [
        {
          "id": "schema",
          "label": "Request structured output matching a task-field schema and validate required fields",
          "feedback": "Correct. Stable fields let software render, validate, and handle omissions reliably.",
          "correct": true
        },
        {
          "id": "prose",
          "label": "Ask for prose and guess title and due date with string rules",
          "feedback": "Natural-language formats change, making parsing brittle and omissions hard to detect.",
          "correct": false
        },
        {
          "id": "html",
          "label": "Ask the model to return full task-card HTML",
          "feedback": "Model-generated display HTML is hard to validate safely; return data and let the UI render it.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "streaming-response",
    "zh": {
      "title": "长回答要 20 秒完成，产品想让用户更早看到内容，但还要正确处理失败和结束。怎样设计？",
      "options": [
        {
          "id": "real-stream-with-states",
          "label": "接收真实流并逐段渲染，明确生成中、完成、中断和重试状态",
          "feedback": "流式响应缩短首段等待，完整状态则防止把中断内容误认为最终答案。",
          "correct": true
        },
        {
          "id": "fake-typewriter-after-wait",
          "label": "等完整回答返回后，再用打字机动画慢慢显示",
          "feedback": "用户仍等待了全部生成时间，只是把已完成内容延迟播放，并没有更早获得结果。",
          "correct": false
        },
        {
          "id": "first-token-means-finished",
          "label": "出现第一个字就标记任务完成，后续内容在后台随缘追加",
          "feedback": "首段可见不代表回答结束，过早完成会破坏复制、保存和错误处理。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A long answer takes 20 seconds, and the product wants earlier visible content while handling failure and completion correctly. How should it work?",
      "options": [
        {
          "id": "real-stream-with-states",
          "label": "Render a real stream incrementally with generating, complete, interrupted, and retry states",
          "feedback": "Streaming reduces time to first content, while explicit states keep interrupted output from looking final.",
          "correct": true
        },
        {
          "id": "fake-typewriter-after-wait",
          "label": "Wait for the complete answer, then reveal it slowly with a typewriter animation",
          "feedback": "Users still wait for full generation and then receive an artificial delay rather than earlier content.",
          "correct": false
        },
        {
          "id": "first-token-means-finished",
          "label": "Mark the task complete at the first character and append later content in the background",
          "feedback": "First content is not completion, and premature state breaks copying, saving, and error handling.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "ai-agent",
    "zh": {
      "title": "下面哪一种更符合 AI Agent，而不是单次回答或预先写死的工作流？",
      "options": [
        {
          "id": "dynamic-debugging",
          "label": "它先读报错和相关文件，再根据测试结果自行决定继续定位、修改还是请求人工判断",
          "feedback": "对。步骤不是预先固定的，模型会用环境中的真实观察决定下一步，同时仍受工具和停止条件控制。",
          "correct": true
        },
        {
          "id": "single-summary",
          "label": "模型收到一篇文章，只返回一次摘要，不读取外部信息也不继续行动",
          "feedback": "这是一次模型生成，没有围绕环境反馈反复选择行动。",
          "correct": false
        },
        {
          "id": "fixed-sequence",
          "label": "代码固定执行“分类、翻译、发送”三步，模型不能改变顺序或选择其他工具",
          "feedback": "这是预设工作流：模型参与其中，但运行路径由代码提前决定。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Which example is best described as an AI agent rather than a single response or a predefined workflow?",
      "options": [
        {
          "id": "dynamic-debugging",
          "label": "It reads the error and relevant files, then uses test results to decide whether to investigate, edit, or ask for human judgment",
          "feedback": "Correct. The path is not fixed in advance: the model chooses actions from real observations while tools and stopping conditions still constrain it.",
          "correct": true
        },
        {
          "id": "single-summary",
          "label": "A model receives one article and returns one summary without external information or follow-up action",
          "feedback": "That is a single generation, not a loop of actions chosen from environmental feedback.",
          "correct": false
        },
        {
          "id": "fixed-sequence",
          "label": "Code always runs classify, translate, and send in that order, and the model cannot change the path or choose another tool",
          "feedback": "That is a predefined workflow: a model participates, but code decides the route in advance.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "harness-engineering",
    "zh": {
      "title": "前端 Agent 连续三次交付“看起来完成”的页面，但点击主按钮都没有反应。哪种改法最像 Harness Engineering？",
      "options": [
        {
          "id": "interactive-evaluator",
          "label": "让独立评审器用浏览器完成主流程，把失败步骤和截图送回下一轮，通过后才结束",
          "feedback": "对。这里补的是会实际操作页面、产生失败证据并把证据送回下一轮的评测环境。",
          "correct": true
        },
        {
          "id": "more-screenshots",
          "label": "只让 Agent 多截几张静态图，图看起来完整就算通过",
          "feedback": "静态图只能证明页面能显示，不能证明按钮、导航和完整任务真的可用。",
          "correct": false
        },
        {
          "id": "stronger-wording",
          "label": "把提示词改成“请认真检查所有交互”，仍由 Agent 自己判断是否完成",
          "feedback": "自我提醒没有增加新的证据来源，同一种遗漏仍可能被带到下一轮。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A frontend agent delivers a page that “looks done” three times, but the main button never works. Which change is harness engineering?",
      "options": [
        {
          "id": "interactive-evaluator",
          "label": "Have an independent evaluator complete the live flow, return failed steps and screenshots, and end only after it passes",
          "feedback": "Correct. This adds an environment that operates the page, produces failure evidence, and returns it to the next turn.",
          "correct": true
        },
        {
          "id": "more-screenshots",
          "label": "Only ask for more static screenshots and pass the page whenever they look complete",
          "feedback": "A static image proves that the page renders, not that its buttons, navigation, or end-to-end task work.",
          "correct": false
        },
        {
          "id": "stronger-wording",
          "label": "Add “carefully check every interaction” while still letting the agent judge its own work",
          "feedback": "A reminder adds no new source of evidence, so the same omission can survive another turn.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "human-in-the-loop",
    "zh": {
      "title": "旅行 Agent 已经找到合适航班，下一步会直接使用已保存的支付方式出票。怎样设置人在回路最合适？",
      "options": [
        {
          "id": "pause-before-charge",
          "label": "在扣款出票前暂停，展示日期、乘机人、总价和退改规则，批准后才继续",
          "feedback": "对。暂停发生在不可逆动作之前，人也拿到了足够信息，可以批准、拒绝或要求修改。",
          "correct": true
        },
        {
          "id": "review-after-charge",
          "label": "先自动扣款出票，完成后再通知用户检查订单",
          "feedback": "这时高风险动作已经发生，人工检查无法起到事前控制作用。",
          "correct": false
        },
        {
          "id": "approve-every-search",
          "label": "每次搜索一个航班都要求用户确认，连只读比较也暂停",
          "feedback": "人在回路不等于每一步都审批；低风险、可撤销的检索可以自动完成。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A travel agent has found a suitable flight and is about to ticket it with a saved payment method. Where should human-in-the-loop approval occur?",
      "options": [
        {
          "id": "pause-before-charge",
          "label": "Pause before charging and ticketing, show the dates, passenger, total, and change rules, then continue only after approval",
          "feedback": "Correct. The pause occurs before the irreversible action and gives the person enough information to approve, reject, or request a change.",
          "correct": true
        },
        {
          "id": "review-after-charge",
          "label": "Charge and issue the ticket automatically, then ask the user to review the order",
          "feedback": "The high-risk action has already happened, so the review cannot provide preventive control.",
          "correct": false
        },
        {
          "id": "approve-every-search",
          "label": "Require approval for every flight search, including read-only comparisons",
          "feedback": "Human-in-the-loop does not mean approving every step. Low-risk, reversible searches can remain automatic.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "sub-agent",
    "zh": {
      "title": "上线前要检查无障碍、接口错误处理和测试缺口，三项都只读代码并能独立给出证据。怎样安排更合适？",
      "options": [
        {
          "id": "parallel-readers",
          "label": "分别交给三个只读 Sub-agent，写清检查范围；主 Agent 等全部结果后去重并汇总",
          "feedback": "对。三项互不依赖且不改文件，适合并行；主 Agent 仍负责合并冲突结论和最终判断。",
          "correct": true
        },
        {
          "id": "parallel-same-file",
          "label": "让三个 Sub-agent 同时重写同一个配置文件，不划分所有权",
          "feedback": "并行写同一文件容易覆盖和冲突。应先明确所有权，或由主 Agent 汇总结论后串行修改。",
          "correct": false
        },
        {
          "id": "delegate-whole-task",
          "label": "把“检查一切”原样交给多个 Sub-agent，不说明范围、证据或返回格式",
          "feedback": "边界不清会造成重复、遗漏和难以汇总；委派时仍要写清任务与产出。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Before release, accessibility, API error handling, and test gaps must be reviewed. All three checks are read-only and can produce independent evidence. What is the better arrangement?",
      "options": [
        {
          "id": "parallel-readers",
          "label": "Assign one read-only subagent to each scoped check, then have the main agent wait, deduplicate, and summarize",
          "feedback": "Correct. Independent read-only checks parallelize well, while the main agent still resolves overlapping or conflicting findings.",
          "correct": true
        },
        {
          "id": "parallel-same-file",
          "label": "Have three subagents rewrite the same configuration file at once without ownership boundaries",
          "feedback": "Concurrent writes to the same file can conflict or overwrite work. Define ownership or make changes serially after synthesis.",
          "correct": false
        },
        {
          "id": "delegate-whole-task",
          "label": "Give several subagents the same instruction to check everything, without scope, evidence requirements, or a return format",
          "feedback": "Unbounded delegation creates duplication, gaps, and results that are difficult to combine.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "tool-calling",
    "zh": {
      "title": "Agent 说“已经创建日历会议”，但还没有执行日历工具。此时最准确的状态是什么？",
      "options": [
        {
          "id": "request-not-result",
          "label": "它只提出了工具调用请求；应用执行并返回结果后才能说会议已创建",
          "feedback": "对。模型选择工具不等于外部操作已经发生。",
          "correct": true
        },
        {
          "id": "model-done",
          "label": "模型写出了会议标题，就可视为会议已经存在",
          "feedback": "文字和真实日历状态是两件事。",
          "correct": false
        },
        {
          "id": "skip-result",
          "label": "直接告诉用户成功，不必等待工具的返回",
          "feedback": "工具可能失败、被拒绝或创建了不同结果，必须依据真实返回确认。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An agent says a calendar meeting is created but has not run the calendar tool. What is the accurate state?",
      "options": [
        {
          "id": "request-not-result",
          "label": "It has only requested a tool call; claim creation only after the app executes it and returns a result",
          "feedback": "Correct. Choosing a tool is not the same as an external action occurring.",
          "correct": true
        },
        {
          "id": "model-done",
          "label": "A meeting title in model text means the meeting exists",
          "feedback": "Text and real calendar state are different things.",
          "correct": false
        },
        {
          "id": "skip-result",
          "label": "Tell the user it worked without waiting for the tool response",
          "feedback": "The tool may fail, be denied, or create a different result; confirm from its real return.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "react-pattern",
    "zh": {
      "title": "Agent 认为登录按钮缺少点击事件，但读取文件后发现点击事件已经存在。下一步怎样处理更符合 ReAct？",
      "options": [
        {
          "id": "reason-act-observe",
          "label": "根据文件结果放弃原判断，改查点击后发出的网络请求",
          "feedback": "对。真实观察否定了原判断，下一步应该改查仍未解释的网络请求。",
          "correct": true
        },
        {
          "id": "fixed-plan-no-observation",
          "label": "继续重写按钮点击代码，因为最初已经认定问题在按钮",
          "feedback": "文件已经证明点击事件存在，继续按原判断修改会忽略刚得到的证据。",
          "correct": false
        },
        {
          "id": "unlimited-retries",
          "label": "直接宣布按钮代码没有问题，不再检查点击后的真实结果",
          "feedback": "确认一个位置没有问题，不代表故障已经解释；还要根据现有证据选择下一处检查。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An agent assumes a login button has no click handler, but the file shows that the handler already exists. What should happen next in a ReAct pattern?",
      "options": [
        {
          "id": "reason-act-observe",
          "label": "Drop the original assumption and inspect the network request triggered by the click",
          "feedback": "Correct. The file result disproves the original assumption, so the next action investigates the unexplained network behavior.",
          "correct": true
        },
        {
          "id": "fixed-plan-no-observation",
          "label": "Rewrite the click handler anyway because the original plan blamed the button",
          "feedback": "The file already shows a handler, so continuing the original edit ignores the latest evidence.",
          "correct": false
        },
        {
          "id": "unlimited-retries",
          "label": "Declare the button correct and stop without checking what happens after the click",
          "feedback": "Clearing one location does not explain the failure; the observation should direct the next check.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "agent-loop",
    "zh": {
      "title": "Agent 修复手机导航后，同一项横向滚动检查连续失败两次。规则规定同类失败最多两次，接下来应该怎样做？",
      "options": [
        {
          "id": "bounded-verified-loop",
          "label": "暂停任务，保留两轮检查结果，并在扩大修改范围前请求确认",
          "feedback": "同类失败已经达到上限，循环应暂停并把证据交给用户，而不是继续扩大改动。",
          "correct": true
        },
        {
          "id": "trust-completion-claim",
          "label": "让 AI 把任务标为完成，因为它已经尝试过两次",
          "feedback": "尝试次数不是完成证据；构建和手机页面检查还没有通过。",
          "correct": false
        },
        {
          "id": "retry-without-limit",
          "label": "继续自动修改，直到检查通过为止，不再限制次数",
          "feedback": "这会绕过已经设定的上限，并可能让改动范围不断扩大。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An agent tries to fix mobile navigation, but the same horizontal-overflow check fails twice. The rule allows two attempts for the same failure. What should happen next?",
      "options": [
        {
          "id": "bounded-verified-loop",
          "label": "Pause, preserve both check results, and ask before expanding the change scope",
          "feedback": "The repeated failure has reached its limit, so the loop should pause and present evidence instead of expanding changes.",
          "correct": true
        },
        {
          "id": "trust-completion-claim",
          "label": "Mark the task complete because the agent already tried twice",
          "feedback": "Attempt count is not proof; the build and mobile-page check have not passed.",
          "correct": false
        },
        {
          "id": "retry-without-limit",
          "label": "Keep editing automatically until the check passes, with no further limit",
          "feedback": "This bypasses the stated limit and can let the change scope keep growing.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "provider",
    "zh": {
      "title": "provider: OpenRouter，model: deepseek-v4-flash。请问我们连接的模型提供商是谁？",
      "options": [
        {
          "id": "openrouter-provider",
          "label": "OpenRouter",
          "feedback": "对。Provider 表示通过哪个服务平台调用，Model 表示这次选择的具体模型，所以这里连接的模型提供商是 OpenRouter。",
          "correct": true
        },
        {
          "id": "deepseek-model",
          "label": "deepseek-v4-flash",
          "feedback": "这不是 Provider，而是 Model 名称。它说明选择了哪个模型，不能单独说明请求通过哪个服务平台发送。",
          "correct": false
        },
        {
          "id": "unknown-provider",
          "label": "无法判断",
          "feedback": "这里已经明确写出 `provider: OpenRouter`，因此可以判断请求通过 OpenRouter 发送。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "provider: OpenRouter, model: deepseek-v4-flash. Who is the model provider we connect to?",
      "options": [
        {
          "id": "openrouter-provider",
          "label": "OpenRouter",
          "feedback": "Correct. Provider says which service platform you call, while Model says which model you select. The provider here is OpenRouter.",
          "correct": true
        },
        {
          "id": "deepseek-model",
          "label": "deepseek-v4-flash",
          "feedback": "That is the Model name, not the Provider. It identifies which model is selected, not which service platform receives the request.",
          "correct": false
        },
        {
          "id": "unknown-provider",
          "label": "It cannot be determined",
          "feedback": "The configuration explicitly says `provider: OpenRouter`, so the request goes through OpenRouter.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "base-url",
    "zh": {
      "title": "配置 OpenRouter 时，哪一项是合适的 Base URL？",
      "options": [
        {
          "id": "base-prefix",
          "label": "填写 `https://openrouter.ai/api/v1`，让工具继续补上本次请求的路径",
          "feedback": "对。针对 OpenRouter 这种 OpenAI 兼容的服务，需要包含 /api/v1 路径；但注意并不是所有服务都要写 /v1，例如 Anthropic 的 Base URL 是 `https://api.anthropic.com`，一切以具体服务商文档为准。",
          "correct": true
        },
        {
          "id": "full-route",
          "label": "填写完整的 `https://openrouter.ai/api/v1/chat/completions`",
          "feedback": "不对。这包含了具体端点的完整请求路径。Base URL 通常只包含公共前缀，否则工具再次拼接路径时会导致请求地址错误（如双重 completions 路径）。",
          "correct": false
        },
        {
          "id": "domain-only",
          "label": "只填写 `https://openrouter.ai`，省略 `/api/v1`",
          "feedback": "不对。对于 OpenRouter 这类兼容服务，省略 /api/v1 会导致工具无法匹配正确的接口路径。请务必根据官方文档确定具体前缀，而不是硬套规则。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Which Base URL is suitable when configuring OpenRouter?",
      "options": [
        {
          "id": "base-prefix",
          "label": "Use `https://openrouter.ai/api/v1` and let the tool add the request path",
          "feedback": "Correct. For OpenAI-compatible services like OpenRouter, the path prefix /api/v1 is needed; however, not all providers use /v1 (e.g. Anthropic uses `https://api.anthropic.com`). Always check the provider's documentation.",
          "correct": true
        },
        {
          "id": "full-route",
          "label": "Use the full `https://openrouter.ai/api/v1/chat/completions`",
          "feedback": "Incorrect. This includes the full endpoint path. The Base URL should only contain the shared prefix; otherwise, when the tool appends the endpoint path, it will result in a malformed URL.",
          "correct": false
        },
        {
          "id": "domain-only",
          "label": "Use only `https://openrouter.ai`",
          "feedback": "This leaves out the path required by the OpenRouter service, so it cannot replace the complete Base URL.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "api-proxy",
    "zh": {
      "title": "一次模型调用经过 API 代理时，正确的请求和返回链路是？",
      "options": [
        {
          "id": "proxy-round-trip",
          "label": "个人通过 AI 工具发起请求 → 中转站 → 模型提供商 → 中转站 → 返回给个人",
          "feedback": "对。请求先从个人经 AI 工具发给中转站，再由中转站转给模型提供商；结果也要经过中转站返回个人，所以两段内容都经过中转站。",
          "correct": true
        },
        {
          "id": "provider-first",
          "label": "个人通过 AI 工具发起请求 → 模型提供商 → 中转站 → 返回给个人",
          "feedback": "不对。这个链路跳过了中转站接收请求的环节；如果配置了 API 代理，请求应先到中转站，再由它转给模型提供商。",
          "correct": false
        },
        {
          "id": "relay-generates",
          "label": "个人通过 AI 工具发起请求 → 中转站，中转站直接生成模型结果",
          "feedback": "不对。中转站只负责接收、转发和返回数据，真正运行模型并生成结果的是模型提供商。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "What is the correct request-and-response path through an API proxy?",
      "options": [
        {
          "id": "proxy-round-trip",
          "label": "You send a request through the AI tool → proxy relay → model provider → proxy relay → back to you",
          "feedback": "Correct. The request goes from you through the AI tool to the relay and then to the model provider; the result also passes through the relay on its way back to you.",
          "correct": true
        },
        {
          "id": "provider-first",
          "label": "You send a request through the AI tool → model provider → proxy relay → back to you",
          "feedback": "Not quite. This path skips the relay when the request is sent. With an API proxy configured, the request should reach the relay first, which forwards it to the model provider.",
          "correct": false
        },
        {
          "id": "relay-generates",
          "label": "You send a request through the AI tool → proxy relay, and the relay generates the model result",
          "feedback": "Not quite. The relay receives, forwards, and returns data; the model provider is the part that runs the model and generates the result.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "openai-compatible-api",
    "zh": {
      "title": "接口格式兼容，但模型提示不支持工具调用，哪项判断正确？",
      "options": [
        {
          "id": "protocol-boundary",
          "label": "通信格式兼容不代表底层模型具备工具调用能力",
          "feedback": "对。兼容 API 解决请求怎样包装，工具调用还取决于底层模型的能力。",
          "correct": true
        },
        {
          "id": "same-model",
          "label": "只要接口兼容，底层模型就应当拥有 GPT 的全部能力",
          "feedback": "接口协议和模型能力是不同层次；兼容声明不能保证工具调用、多模态或流式表现相同。",
          "correct": false
        },
        {
          "id": "force-capability",
          "label": "强行打开一个配置项就能补出模型没有的工具调用能力",
          "feedback": "配置只能请求某项能力，不能替底层模型增加理解工具和生成结构化参数的能力。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The endpoint is compatible, but the model says it does not support tool calls. Which judgment is correct?",
      "options": [
        {
          "id": "protocol-boundary",
          "label": "Protocol compatibility does not mean the underlying model supports tool calls",
          "feedback": "Correct. A compatible API standardizes request packaging; tool calls still depend on the model.",
          "correct": true
        },
        {
          "id": "same-model",
          "label": "A compatible endpoint must provide every capability of a GPT model",
          "feedback": "Protocol and model capability are different layers; compatibility does not guarantee identical tool, multimodal, or streaming behavior.",
          "correct": false
        },
        {
          "id": "force-capability",
          "label": "A configuration flag can add tool-calling capability that the model does not have",
          "feedback": "A setting can request a capability, but it cannot give the model the ability to understand tools and emit structured arguments.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "api-key",
    "zh": {
      "title": "AI 把 API Key 直接写在了代码里，正确的处理方式是？",
      "options": [
        {
          "id": "env-var",
          "label": "移到环境变量里，代码只引用变量名",
          "feedback": "对。环境变量存在部署平台或本地的配置里，不进代码仓库；代码里只写变量名，Key 的值不上传。",
          "correct": true
        },
        {
          "id": "keep-code",
          "label": "没关系，项目是私有的，放着就行",
          "feedback": "私有仓库也可能被泄漏、被截图、被 AI 工具读到；Key 写在代码里迟早会跟着代码一起离开你的控制。",
          "correct": false
        },
        {
          "id": "share-key",
          "label": "发给协作的同事，让大家填在各自代码里",
          "feedback": "Key 应该各自创建、按人管理；散落在聊天记录和多个代码库里更难吊销。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The AI hardcoded your API Key in the source. What is the right fix?",
      "options": [
        {
          "id": "env-var",
          "label": "Move it to an environment variable; reference the variable name in code",
          "feedback": "Correct. Env vars live on the deploy platform or local config, never in the repo; code carries only the name, not the value.",
          "correct": true
        },
        {
          "id": "keep-code",
          "label": "It's a private repo, just leave it",
          "feedback": "Private repos leak, get screenshotted, and get read by AI tooling; a key in code eventually escapes your control.",
          "correct": false
        },
        {
          "id": "share-key",
          "label": "Send it to teammates so everyone pastes it into their code",
          "feedback": "Keys should be created per person and per environment; copies in chats and repos are hard to revoke.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "config-file",
    "zh": {
      "title": "模型调用失败时，应该先查看什么类型的文件？",
      "options": [
        {
          "id": "config-file",
          "label": "配置文件",
          "feedback": "对。模型调用失败时，应先检查配置文件中的 Provider、模型和连接设置。",
          "correct": true
        },
        {
          "id": "project-rules",
          "label": "项目规则文件",
          "feedback": "不对。模型调用失败时，应先检查配置文件中的 Provider、模型和连接设置。",
          "correct": false
        },
        {
          "id": "page-style",
          "label": "页面样式文件",
          "feedback": "不对。模型调用失败时，应先检查配置文件中的 Provider、模型和连接设置。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "What type of file should you check first when a model call fails?",
      "options": [
        {
          "id": "config-file",
          "label": "The config file",
          "feedback": "Correct. First check the Provider, model, and connection settings in the config file.",
          "correct": true
        },
        {
          "id": "project-rules",
          "label": "The project rules file",
          "feedback": "Not quite. First check the Provider, model, and connection settings in the config file.",
          "correct": false
        },
        {
          "id": "page-style",
          "label": "The page style file",
          "feedback": "Not quite. First check the Provider, model, and connection settings in the config file.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "profile",
    "zh": {
      "title": "为了避免把敏感项目请求发到公网，使用 Profile 时哪项做法更安全？",
      "options": [
        {
          "id": "explicit-profile",
          "label": "在敏感项目目录启动工具时明确指定隔离的内网 Profile",
          "feedback": "对。显式选择 Profile 能让当前会话加载预期的 Provider 和地址，减少误用默认配置的风险。",
          "correct": true
        },
        {
          "id": "shared-default",
          "label": "把公司和个人密钥都放进同一个 default Profile，启动时最省事",
          "feedback": "共享默认配置容易在敏感项目中误用个人或公网连接，不能提供隔离。",
          "correct": false
        },
        {
          "id": "branch-switch",
          "label": "切换 Profile 就等于切换 Git 分支，因此不需要确认网络地址",
          "feedback": "Profile 只切换 AI 连接参数，不会切换代码分支，也不能替代对 Provider 和 Base URL 的检查。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Which Profile workflow is safer for keeping sensitive project requests off public endpoints?",
      "options": [
        {
          "id": "explicit-profile",
          "label": "Explicitly select an isolated intranet Profile when starting the tool in the sensitive project",
          "feedback": "Correct. An explicit Profile loads the expected Provider and endpoint and reduces accidental use of a default configuration.",
          "correct": true
        },
        {
          "id": "shared-default",
          "label": "Put both company and personal keys in one default Profile for convenience",
          "feedback": "A shared default can route sensitive work through the wrong personal or public connection and does not isolate it.",
          "correct": false
        },
        {
          "id": "branch-switch",
          "label": "Treat switching a Profile as switching a Git branch, so endpoint checks are unnecessary",
          "feedback": "A Profile changes AI connection settings, not code branches, and does not replace checking the Provider and Base URL.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "project-rules",
    "zh": {
      "title": "AI 总是生成不符合团队技术栈的代码，哪种做法最直接？",
      "options": [
        {
          "id": "shared-project-guidance",
          "label": "在项目规则文件中写明技术栈、代码风格和高风险操作确认要求",
          "feedback": "对。项目规则会作为任务上下文提供给 Agent，帮助它在生成阶段遵循团队约定。",
          "correct": true
        },
        {
          "id": "client-config-rule",
          "label": "把代码风格规则写进只控制 Provider 和端口的客户端配置文件",
          "feedback": "客户端配置控制工具怎么连接和运行，不能代替给 Agent 的项目开发规范。",
          "correct": false
        },
        {
          "id": "compiler-enforce",
          "label": "只增加编译或 Linter 检查，就能在生成前告诉 AI 应该怎么写",
          "feedback": "编译器和 Linter 主要在生成后发现问题，不能替代项目规则在生成阶段提供指导。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The AI keeps generating code outside the team's stack. What is the most direct fix?",
      "options": [
        {
          "id": "shared-project-guidance",
          "label": "Put the stack, code style, and risky-action approval rules in project instructions",
          "feedback": "Correct. Project rules enter the agent's task context and guide generation toward the team's conventions.",
          "correct": true
        },
        {
          "id": "client-config-rule",
          "label": "Put code style rules in the client config that only controls the Provider and port",
          "feedback": "Client config controls how the tool connects and runs; it does not replace project guidance for the agent.",
          "correct": false
        },
        {
          "id": "compiler-enforce",
          "label": "Only add compiler or linter checks and they will tell the AI how to write code before generation",
          "feedback": "Compilers and linters mainly catch problems after generation; they do not replace guidance during generation.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "hook",
    "zh": {
      "title": "想在 AI 写完文件后自动格式化，哪种机制最合适？",
      "options": [
        {
          "id": "event-trigger",
          "label": "配置 post-write Hook，在文件写入事件后运行格式化命令",
          "feedback": "对。Hook 由生命周期事件触发，适合在写入完成后自动执行预设任务。",
          "correct": true
        },
        {
          "id": "task-method",
          "label": "创建 Skill，让 Agent 每次自己判断是否要格式化",
          "feedback": "Skill 是可调用的任务方法，不是写入事件发生时自动触发的监听器。",
          "correct": false
        },
        {
          "id": "logic-fix",
          "label": "配置 Hook 后就能自动修复生成代码中的业务逻辑错误",
          "feedback": "Hook 只能运行预设脚本；格式化或检查不能替代业务逻辑修复和人工验收。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Which mechanism fits automatic formatting after the AI writes a file?",
      "options": [
        {
          "id": "event-trigger",
          "label": "Configure a post-write Hook to run the formatter after the file-write event",
          "feedback": "Correct. Hooks are triggered by lifecycle events and run preset tasks after a write completes.",
          "correct": true
        },
        {
          "id": "task-method",
          "label": "Create a Skill and let the agent decide whether to format each time",
          "feedback": "A Skill is an invokable task method, not a listener that automatically responds to a file-write event.",
          "correct": false
        },
        {
          "id": "logic-fix",
          "label": "A Hook will automatically repair business logic bugs in generated code",
          "feedback": "A Hook only runs its preset script; formatting or checks do not replace logic fixes and review.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "plugin",
    "zh": {
      "title": "团队需要编辑器侧边栏和 diff 预览，哪种扩展更匹配？",
      "options": [
        {
          "id": "editor-integration",
          "label": "使用 Plugin，把界面入口和编辑器集成打包进去",
          "feedback": "对。Plugin 适合提供侧边栏、快捷键、行内建议和 diff 等编辑器能力。",
          "correct": true
        },
        {
          "id": "skill-ui",
          "label": "使用 Skill，因为 Skill 会自动提供跨编辑器的可视化界面",
          "feedback": "Skill 主要提供可复用的任务方法和文件，不等于编辑器 UI 扩展。",
          "correct": false
        },
        {
          "id": "hook-ui",
          "label": "使用 Hook，因为后台事件脚本会自动生成完整的侧边栏",
          "feedback": "Hook 监听事件并执行预设任务，不负责提供编辑器侧边栏或 diff 界面。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A team needs an editor sidebar and diff preview. Which extension fits?",
      "options": [
        {
          "id": "editor-integration",
          "label": "Use a Plugin to package the UI entry point and editor integration",
          "feedback": "Correct. Plugins can provide sidebars, shortcuts, inline suggestions, and diff views in an editor.",
          "correct": true
        },
        {
          "id": "skill-ui",
          "label": "Use a Skill because Skills automatically provide visual UI across editors",
          "feedback": "A Skill mainly provides a reusable task method and files; it is not an editor UI extension.",
          "correct": false
        },
        {
          "id": "hook-ui",
          "label": "Use a Hook because a background event script will create the full sidebar",
          "feedback": "A Hook listens for events and runs preset tasks; it does not provide a sidebar or diff interface.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "mcp",
    "zh": {
      "title": "用户问“工单 #1024 谁负责”。应用通过 MCP 发现 get_ticket 工具后，下一步哪种做法正确？",
      "options": [
        {
          "id": "scoped-permission",
          "label": "由应用请求 get_ticket({ id: 1024 })，让工单系统检查当前账号权限并返回真实记录",
          "feedback": "对。MCP 负责发现工具和传递调用，工单系统仍负责权限与真实数据。",
          "correct": true
        },
        {
          "id": "trust-protocol",
          "label": "使用了 MCP 就说明已经获得权限，可以跳过工单系统的账号检查",
          "feedback": "连接协议不等于授权，是否能读 #1024 仍要由工单系统判断。",
          "correct": false
        },
        {
          "id": "model-is-server",
          "label": "让模型根据工单编号猜一个负责人，不必真正调用工具",
          "feedback": "负责人必须来自工具返回的真实记录，不能由模型猜测。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A user asks who owns issue #1024. After the application discovers get_ticket through MCP, what should happen next?",
      "options": [
        {
          "id": "scoped-permission",
          "label": "The app requests get_ticket({ id: 1024 }), and the issue tracker checks the current account before returning the real record",
          "feedback": "Correct. MCP handles tool discovery and the call; the issue tracker still handles authorization and real data.",
          "correct": true
        },
        {
          "id": "trust-protocol",
          "label": "Because it uses MCP, the application can skip the issue tracker's account check",
          "feedback": "A connection protocol is not authorization. The issue tracker still decides whether this account may read #1024.",
          "correct": false
        },
        {
          "id": "model-is-server",
          "label": "Let the model guess an owner from the issue number without calling the tool",
          "feedback": "The owner must come from the real record returned by the tool, not a model guess.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "skill",
    "zh": {
      "title": "团队每周都让 Agent 按同一规则生成发布说明，还要复用脚本和模板。怎样减少重复教学？",
      "options": [
        {
          "id": "structured-reusable-skill",
          "label": "建立带 SKILL.md 入口的 Skill，并收纳触发规则、步骤、脚本和模板",
          "feedback": "稳定流程和配套资源有明确入口后，Agent 能在对应任务中重复采用同一套做法。",
          "correct": true
        },
        {
          "id": "one-line-reminder",
          "label": "只保存一句“生成高质量发布说明”，每次让 Agent 自行猜格式",
          "feedback": "一句目标没有执行步骤、模板和验收条件，输出仍会随每次上下文变化。",
          "correct": false
        },
        {
          "id": "dump-all-context",
          "label": "把所有项目聊天记录都塞进说明文件，不区分触发任务和长期规则",
          "feedback": "无关历史会稀释稳定流程，也让 Skill 难以判断何时和怎样使用资源。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Every week, a team teaches an Agent the same release-note rules and reuses scripts and templates. How can repetition be reduced?",
      "options": [
        {
          "id": "structured-reusable-skill",
          "label": "Create a Skill with a SKILL.md entry plus triggers, steps, scripts, and templates",
          "feedback": "A clear entry to a stable workflow and resources lets the Agent reuse the same method for matching tasks.",
          "correct": true
        },
        {
          "id": "one-line-reminder",
          "label": "Save only Write high-quality release notes and let the Agent infer the format each time",
          "feedback": "One goal provides no procedure, template, or acceptance criteria, so output still varies with context.",
          "correct": false
        },
        {
          "id": "dump-all-context",
          "label": "Put every project chat into the instruction file without separating triggers from durable rules",
          "feedback": "Irrelevant history dilutes the stable process and obscures when and how resources should be used.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "permission-mode",
    "zh": {
      "title": "关于权限模式，哪种说法正确？",
      "options": [
        {
          "id": "plan-is-read-only",
          "label": "Plan / read-only 主要用于读取和分析，不修改代码；确认方案后再进入执行阶段",
          "feedback": "对。Plan / read-only 用于理解上下文和制定计划，代码修改应在确认方案后，根据需要选择合适的访问范围和审批方式。",
          "correct": true
        },
        {
          "id": "full-access-is-model-quality",
          "label": "Full access 只决定模型能力，不影响 AI 对文件和网络资源的访问范围",
          "feedback": "不对。Full access 会扩大或取消沙箱等访问限制，影响 AI 可以访问的文件和网络资源。",
          "correct": false
        },
        {
          "id": "ask-is-always-read-only",
          "label": "Ask for approval 表示 AI 永远不能修改代码，只能向用户提问",
          "feedback": "不对。Ask for approval 表示执行需要批准的动作前先询问；获得批准后，AI 仍可能在允许范围内修改代码。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Which statement about permission modes is correct?",
      "options": [
        {
          "id": "plan-is-read-only",
          "label": "Plan / read-only is mainly for reading and analysis without changing code; after confirming the plan, move to the execution phase",
          "feedback": "Correct. Plan / read-only is for understanding context and preparing a plan. Code changes should happen after confirmation, with access and approval settings chosen for the task.",
          "correct": true
        },
        {
          "id": "full-access-is-model-quality",
          "label": "Full access only changes model capability and does not affect the AI's access to files or network resources",
          "feedback": "Not quite. Full access widens or removes sandbox restrictions, which affects the files and network resources the AI can access.",
          "correct": false
        },
        {
          "id": "ask-is-always-read-only",
          "label": "Ask for approval means the AI can never change code and may only ask the user questions",
          "feedback": "Not quite. Ask for approval means the AI asks before actions that need approval. After approval, it may still change code within the permitted scope.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "sandbox",
    "zh": {
      "title": "让 AI 调试数据库时，哪种方案同时体现沙箱隔离和最小权限？",
      "options": [
        {
          "id": "isolated-mock",
          "label": "在沙箱中运行，只挂载必要代码目录并连接测试或假数据",
          "feedback": "对。受限环境和非生产数据共同减少宿主机、真实数据库和凭证暴露的影响。",
          "correct": true
        },
        {
          "id": "production-credentials",
          "label": "把生产数据库管理员账号放进沙箱，因为容器会自动保护所有数据",
          "feedback": "沙箱不能让主动注入的生产凭证变得安全；代码仍可能使用或外传它们。",
          "correct": false
        },
        {
          "id": "approval-only",
          "label": "只把权限模式设为 allow，就可以代替环境隔离",
          "feedback": "allow 是审批策略，不是技术隔离；自动允许命令反而可能扩大宿主机风险。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Which setup combines sandbox isolation with least privilege when the AI debugs a database?",
      "options": [
        {
          "id": "isolated-mock",
          "label": "Run in a sandbox with only the needed code mounted and a test or mock data connection",
          "feedback": "Correct. The restricted environment and non-production data reduce exposure of the host, real database, and credentials.",
          "correct": true
        },
        {
          "id": "production-credentials",
          "label": "Pass production database admin credentials into the sandbox because containers protect all data automatically",
          "feedback": "A sandbox cannot make intentionally injected production credentials safe; code may still use or exfiltrate them.",
          "correct": false
        },
        {
          "id": "approval-only",
          "label": "Set permission mode to allow and use that instead of environment isolation",
          "feedback": "Allow is an approval policy, not technical isolation; auto-running commands can increase host risk.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "response-speed",
    "zh": {
      "title": "模型 A 一秒出现首字但长回答生成很慢，模型 B 三秒开始却很快写完。应该怎样比较速度？",
      "options": [
        {
          "id": "measure-ttft-tps-total",
          "label": "分别记录首段等待、生成后速度和完整回答总时长",
          "feedback": "TTFT、TPS 和总时长描述不同阶段，分开测才能解释两种体验差异。",
          "correct": true
        },
        {
          "id": "first-token-only",
          "label": "只比较谁先出现第一个字，并据此认定整体速度更快",
          "feedback": "首段等待短不代表后续生成快，长回答的总完成时间可能反而更久。",
          "correct": false
        },
        {
          "id": "mix-network-and-generation",
          "label": "把网络等待和生成速度合成一个 TPS 数字，不区分阶段",
          "feedback": "TPS 描述开始输出后的生成速率，混入前置等待会失去指标含义。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Model A shows its first token in one second but generates slowly; Model B starts in three seconds and finishes quickly. How should speed be compared?",
      "options": [
        {
          "id": "measure-ttft-tps-total",
          "label": "Measure time to first content, generation rate after start, and total completion separately",
          "feedback": "TTFT, TPS, and total time describe different phases and together explain the two experiences.",
          "correct": true
        },
        {
          "id": "first-token-only",
          "label": "Compare only which model shows the first character and call it faster overall",
          "feedback": "Short first-content wait does not imply fast generation, and a long answer may finish later.",
          "correct": false
        },
        {
          "id": "mix-network-and-generation",
          "label": "Combine network waiting and generation into one TPS number without phases",
          "feedback": "TPS describes output rate after generation starts, so including prior waiting removes its meaning.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "token-cost",
    "zh": {
      "title": "Agent 每轮都重新发送长系统规则、完整聊天和工具结果，账单持续上涨。怎样定位并降低成本？",
      "options": [
        {
          "id": "per-round-usage-audit",
          "label": "逐轮统计输入、输出、缓存和模型价格，裁剪无关上下文",
          "feedback": "多轮成本来自每次实际处理的内容和价格，分项记录才能找到重复输入与高成本环节。",
          "correct": true
        },
        {
          "id": "count-user-message-only",
          "label": "只计算用户新输入的几句话，忽略系统规则、历史和工具结果",
          "feedback": "模型每轮读取的所有输入都会占用用量，界面上新写的文字只是其中一部分。",
          "correct": false
        },
        {
          "id": "hide-history-in-ui",
          "label": "把旧消息从聊天界面隐藏，假设请求成本也会自动下降",
          "feedback": "显示与请求组装是两层，隐藏消息不代表后端不再发送它们。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An Agent resends long system rules, full chat, and tool results every round, and the bill keeps rising. How should cost be diagnosed and reduced?",
      "options": [
        {
          "id": "per-round-usage-audit",
          "label": "Track input, output, cache, and model price per round, then remove irrelevant context",
          "feedback": "Multi-round cost follows actual processed content and rates, so itemized usage reveals repeated input and expensive stages.",
          "correct": true
        },
        {
          "id": "count-user-message-only",
          "label": "Count only the user's new sentences and ignore system rules, history, and tool results",
          "feedback": "Everything the model reads each round contributes to usage; newly visible user text is only one part.",
          "correct": false
        },
        {
          "id": "hide-history-in-ui",
          "label": "Hide old messages in the chat interface and assume request cost falls automatically",
          "feedback": "Display and request assembly are separate, so hidden messages may still be sent by the backend.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "rate-limit",
    "zh": {
      "title": "短时间内连续点击“重新生成”触发了限流。界面下一步该怎么做？",
      "options": [
        {
          "id": "wait-guidance",
          "label": "停止立即重试，说明等待时间或可重试时机，并防止重复提交",
          "feedback": "对。限流是暂时拒绝；明确等待和禁用重复动作能避免继续加重请求。",
          "correct": true
        },
        {
          "id": "retry-loop",
          "label": "在后台每 100 毫秒自动重试，直到成功",
          "feedback": "高频重试会继续触发限制，也可能影响其他请求。",
          "correct": false
        },
        {
          "id": "hide-error",
          "label": "不显示错误提示，让用户多点几次试试",
          "feedback": "用户需要知道当前动作没有完成以及何时可以重试。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Rapid clicks on Regenerate hit a rate limit. What should the UI do next?",
      "options": [
        {
          "id": "wait-guidance",
          "label": "Stop immediate retries, explain when to retry, and prevent duplicate submission",
          "feedback": "Correct. A limit is temporary refusal; clear waiting guidance and duplicate prevention avoid making it worse.",
          "correct": true
        },
        {
          "id": "retry-loop",
          "label": "Retry automatically every 100ms until it succeeds",
          "feedback": "Fast retries keep triggering the limit and can affect other requests.",
          "correct": false
        },
        {
          "id": "hide-error",
          "label": "Hide the error and let people click more",
          "feedback": "People need to know the action did not complete and when it can be retried.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "git",
    "zh": {
      "title": "当前版本已经能运行，接下来要让 Agent 大改首页。怎样先留下可靠的恢复点？",
      "options": [
        {
          "id": "copy-folder",
          "label": "复制整个项目文件夹，并用“最终版2”作为备份名",
          "feedback": "复制能留下副本，但无法清楚比较每次变化，也容易产生多个不知道差异的文件夹。",
          "correct": false
        },
        {
          "id": "commit-working-state",
          "label": "检查当前改动并创建说明清楚的 Commit，再开始大改",
          "feedback": "Commit 会把确认可用的状态写进版本历史，之后可以比较新改动并回到这个恢复点。",
          "correct": true
        },
        {
          "id": "push-uncommitted",
          "label": "不保存版本，直接运行 Push，把当前文件传到远端",
          "feedback": "Push 只同步已经 Commit 的历史；未提交的工作区改动不会因此成为可恢复版本。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "The current version works, and an Agent will make a large homepage change next. How should a reliable restore point be created first?",
      "options": [
        {
          "id": "copy-folder",
          "label": "Duplicate the whole project folder and name it final-version-2",
          "feedback": "A copy preserves files but does not clearly compare changes and quickly creates ambiguous backup folders.",
          "correct": false
        },
        {
          "id": "commit-working-state",
          "label": "Review the current changes and create a clearly described commit before the large edit",
          "feedback": "A commit records the verified working state in history so later changes can be compared or restored.",
          "correct": true
        },
        {
          "id": "push-uncommitted",
          "label": "Skip saving a version and run Push to send the current files remotely",
          "feedback": "Push transfers committed history. Uncommitted working files do not become a restorable version through Push.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "commit",
    "zh": {
      "title": "git status 同时显示 index.html 和 .env 有改动，这次只想提交首页导航。怎么做更安全？",
      "options": [
        {
          "id": "stage-scope",
          "label": "只暂存 index.html，检查暂存区差异，再提交“修复首页导航”",
          "feedback": "对。先限定本次范围并检查暂存区，可以避免把 .env 里的密钥写进版本历史。",
          "correct": true
        },
        {
          "id": "stage-all",
          "label": "运行 git add .，把两个文件一起提交，之后再整理",
          "feedback": "git add . 会把 .env 一起放进暂存区。密钥一旦进入历史，删除文件也不等于消除泄露风险。",
          "correct": false
        },
        {
          "id": "commit-secret-later",
          "label": "先提交 .env，推送前再从最新版本里删掉",
          "feedback": "删掉最新文件不会抹去之前的提交记录。密钥进入历史后应立即轮换。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "git status shows changes in index.html and .env, but this commit should contain only the homepage navigation. What is safer?",
      "options": [
        {
          "id": "stage-scope",
          "label": "Stage only index.html, inspect the staged diff, then commit with “Fix homepage navigation”",
          "feedback": "Correct. Limiting and reviewing the staged changes keeps secrets from .env out of version history.",
          "correct": true
        },
        {
          "id": "stage-all",
          "label": "Run git add . and commit both files, then clean it up later",
          "feedback": "git add . would stage .env too. Once a secret enters history, deleting the latest file does not remove the exposure.",
          "correct": false
        },
        {
          "id": "commit-secret-later",
          "label": "Commit .env now and delete it from the latest version before pushing",
          "feedback": "Deleting the latest copy does not erase earlier commits. A secret that enters history should be rotated.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "branch",
    "zh": {
      "title": "main 现在稳定，你要尝试一套可能推翻的导航方案。怎样开始更安全？",
      "options": [
        {
          "id": "edit-main",
          "label": "留在 main 直接修改，完成后再决定要不要保留",
          "feedback": "不确定的大改会直接混入稳定路线，之后分辨和撤回实验内容都更困难。",
          "correct": false
        },
        {
          "id": "branch-from-main",
          "label": "先收好当前改动，再从最新 main 创建用途明确的分支",
          "feedback": "新分支共享稳定起点，却把后续实验暂时隔开，验证后再决定是否合回。",
          "correct": true
        },
        {
          "id": "new-repository",
          "label": "为这次导航实验创建一个全新的 Git 仓库",
          "feedback": "新仓库会割裂原有历史和协作关系；同一项目的独立修改路线应使用分支。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "Main is stable, and you want to try a navigation approach that may be discarded. What is the safer start?",
      "options": [
        {
          "id": "edit-main",
          "label": "Stay on main, make the experiment, and decide whether to keep it later",
          "feedback": "An uncertain large change enters the stable line directly, making experimental work harder to isolate and undo.",
          "correct": false
        },
        {
          "id": "branch-from-main",
          "label": "Store current work, then create a purpose-named branch from the latest main",
          "feedback": "The branch shares the stable starting point while keeping the experiment separate until it is verified.",
          "correct": true
        },
        {
          "id": "new-repository",
          "label": "Create an entirely new Git repository for the navigation experiment",
          "feedback": "A new repository disconnects the project's history and collaboration. A branch is the independent line within the same project.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "merge",
    "zh": {
      "title": "功能分支准备进入 main，但两边都改了同一行。怎样处理冲突更可靠？",
      "options": [
        {
          "id": "resolve-test",
          "label": "理解两边意图后合并出正确内容，完成冲突标记，再运行相关测试",
          "feedback": "对。冲突不是任选一边；需要保留正确业务结果并验证代码仍能运行。",
          "correct": true
        },
        {
          "id": "ours",
          "label": "总是选择当前分支版本，因为它离自己最近",
          "feedback": "当前分支不一定包含目标分支必须保留的修复。",
          "correct": false
        },
        {
          "id": "markers",
          "label": "保留冲突标记提交，让 CI 之后再决定",
          "feedback": "冲突标记不是可运行代码，应在合并前明确解决。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A feature branch is ready for main, but both sides changed one line. What is the reliable conflict handling?",
      "options": [
        {
          "id": "resolve-test",
          "label": "Understand both intents, produce the correct combined content, clear markers, and run relevant tests",
          "feedback": "Correct. A conflict is not a choice of a side; retain the right behavior and verify it still runs.",
          "correct": true
        },
        {
          "id": "ours",
          "label": "Always choose the current branch because it is closest to your work",
          "feedback": "It may omit a required fix from the target branch.",
          "correct": false
        },
        {
          "id": "markers",
          "label": "Commit the conflict markers and let CI decide later",
          "feedback": "Conflict markers are not runnable code and need an explicit resolution first.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "pull",
    "zh": {
      "title": "同事已把修复推到远端，但你本地还有未完成改动。怎样同步更安全？",
      "options": [
        {
          "id": "save-then-pull-verify",
          "label": "先查看状态并提交或贮藏本地改动，再 Pull，解决冲突后运行检查",
          "feedback": "先收好本地现场能分清两批变化，拉取后的冲突和运行结果也都有明确验收。",
          "correct": true
        },
        {
          "id": "pull-dirty-worktree",
          "label": "直接 Pull，让 Git 自动决定未完成改动该保留哪一边",
          "feedback": "Git 不能理解业务意图，混合现场会增加冲突和误选内容的风险。",
          "correct": false
        },
        {
          "id": "clone-again",
          "label": "每次远端更新都重新 Clone 一个“项目-最新版”文件夹",
          "feedback": "重复项目会分散本地改动和环境，已有仓库应通过 Pull 同步新版本。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A teammate pushed a fix, but your local project still has unfinished changes. How can you synchronize safely?",
      "options": [
        {
          "id": "save-then-pull-verify",
          "label": "Inspect status, commit or stash local work, pull, resolve conflicts, and run checks",
          "feedback": "Securing local work separates the change sets, while conflict resolution and checks verify the merged result.",
          "correct": true
        },
        {
          "id": "pull-dirty-worktree",
          "label": "Pull immediately and let Git decide which unfinished changes to keep",
          "feedback": "Git cannot understand business intent, and mixing an unfinished workspace increases conflict and wrong-choice risk.",
          "correct": false
        },
        {
          "id": "clone-again",
          "label": "Clone a new project-latest folder whenever the remote repository changes",
          "feedback": "Duplicate projects scatter local work and environments; an existing repository should synchronize with Pull.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "push",
    "zh": {
      "title": "本地提交修复后，怎样把它安全地交给远端协作？",
      "options": [
        {
          "id": "review-push",
          "label": "先看提交和目标分支，再 push 到对应远端分支并确认远端提交号",
          "feedback": "对。Push 会写入共享远端，先确认范围和目标分支，随后核对远端结果。",
          "correct": true
        },
        {
          "id": "force-main",
          "label": "直接强制推送到 main，让远端完全等于本地",
          "feedback": "强制推送可能覆盖他人的远端历史，不能作为普通交付步骤。",
          "correct": false
        },
        {
          "id": "copy-files",
          "label": "把改过的文件发给同事，Git 记录不需要同步",
          "feedback": "文件副本会丢失可追溯的提交关系，协作分支也不会更新。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "After a local fix commit, how do you safely share it with remote collaborators?",
      "options": [
        {
          "id": "review-push",
          "label": "Inspect the commit and target branch, push to its remote branch, then confirm the remote hash",
          "feedback": "Correct. Push writes shared remote state, so confirm scope and target, then verify the result.",
          "correct": true
        },
        {
          "id": "force-main",
          "label": "Force-push straight to main so remote exactly matches local",
          "feedback": "A force push can overwrite other people’s remote history.",
          "correct": false
        },
        {
          "id": "copy-files",
          "label": "Send edited files to a teammate; Git history need not be shared",
          "feedback": "A file copy loses traceable commit relationships and does not update the shared branch.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "clone",
    "zh": {
      "title": "新成员第一次拿到 GitHub 项目，既要修改代码，也要保留版本记录。应该怎样开始？",
      "options": [
        {
          "id": "clone-read-setup",
          "label": "用正确仓库地址 Clone，进入新目录阅读 README，再按配置安装依赖",
          "feedback": "Clone 会取得代码和历史，随后按项目说明建立环境，后续更新再使用 Pull。",
          "correct": true
        },
        {
          "id": "download-zip-equivalent",
          "label": "下载 ZIP 并解压，把它当作包含完整 Git 历史的仓库",
          "feedback": "压缩包通常只有当前文件快照，没有分支、提交历史和远端关联。",
          "correct": false
        },
        {
          "id": "repeat-clone-updates",
          "label": "每次有更新都再次 Clone，并用文件夹名称区分版本",
          "feedback": "反复下载会制造多个不一致现场，已有仓库应使用 Pull 同步。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A new teammate needs a local copy of a GitHub project, including its code and version history. How should they begin?",
      "options": [
        {
          "id": "clone-read-setup",
          "label": "Clone the correct repository, enter the new directory, read README, and install from project configuration",
          "feedback": "Clone retrieves code and history, setup follows project guidance, and later updates use Pull.",
          "correct": true
        },
        {
          "id": "download-zip-equivalent",
          "label": "Download and unzip an archive and treat it as a repository with complete Git history",
          "feedback": "An archive generally contains a file snapshot without branches, commit history, or remote connection.",
          "correct": false
        },
        {
          "id": "repeat-clone-updates",
          "label": "Clone again for every update and distinguish versions through folder names",
          "feedback": "Repeated downloads create inconsistent workspaces; an existing repository should use Pull.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "pull-request",
    "zh": {
      "title": "功能分支已提交 PR，自动检查通过，但评审指出手机端按钮被裁掉。下一步怎样处理？",
      "options": [
        {
          "id": "merge-green-checks",
          "label": "自动检查已经通过，先合并再到 main 修手机问题",
          "feedback": "自动检查没有覆盖这项手机布局问题；已知缺陷不应因为状态为绿色就进入主版本。",
          "correct": false
        },
        {
          "id": "update-and-review",
          "label": "在原分支修复并重新验证，再查看 PR 的最新改动",
          "feedback": "PR 应汇集最新代码、讨论和验证结果；处理反馈后重新检查，才能决定是否合并。",
          "correct": true
        },
        {
          "id": "bypass-pr",
          "label": "关闭原 PR，把相同代码复制到 main 后再修手机问题",
          "feedback": "直接复制会绕过原有讨论和改动记录；修复应留在功能分支，让 PR 展示最终差异。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A feature branch has a pull request with passing checks, but review finds that a button is clipped on mobile. What should happen next?",
      "options": [
        {
          "id": "merge-green-checks",
          "label": "Merge because checks passed and fix mobile later on main",
          "feedback": "The checks did not cover this mobile defect. A known issue should not enter the main line because the status is green.",
          "correct": false
        },
        {
          "id": "update-and-review",
          "label": "Fix it on the same branch, verify again, and review the pull request's latest changes",
          "feedback": "The pull request should collect the current code, discussion, and verification before the merge decision.",
          "correct": true
        },
        {
          "id": "bypass-pr",
          "label": "Close the pull request, copy the same code to main, and fix mobile there",
          "feedback": "Copying directly bypasses the discussion and change history. The feature branch should contain the reviewed final fix.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "worktree",
    "zh": {
      "title": "首页分支正在运行且改到一半，现在要并行修复线上 Bug，又不想收起当前改动或切换分支。怎样做？",
      "options": [
        {
          "id": "separate-branch-worktree",
          "label": "为修复分支创建额外 Worktree，在另一个目录独立修改和运行",
          "feedback": "同一仓库的不同分支分配到不同目录，两项任务可同时保留文件和进程现场。",
          "correct": true
        },
        {
          "id": "same-branch-two-folders",
          "label": "让两个 Worktree 同时打开首页分支，分别修改不同文件",
          "feedback": "同一分支不能同时检出到两个 Worktree，任务也应使用职责清楚的独立分支。",
          "correct": false
        },
        {
          "id": "manual-folder-copy",
          "label": "复制当前项目文件夹后直接修改，修完再手工把变化文件拷回原目录",
          "feedback": "普通副本没有清楚的分支对应关系，手工回拷也容易遗漏、覆盖或混入当前未完成改动。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A homepage branch is running with unfinished changes when an urgent production fix arrives, and the current workspace must remain. What should be done?",
      "options": [
        {
          "id": "separate-branch-worktree",
          "label": "Create another worktree for the fix branch and edit and run it in a separate directory",
          "feedback": "Different branches of one repository get separate directories, preserving both file and process workspaces.",
          "correct": true
        },
        {
          "id": "same-branch-two-folders",
          "label": "Open the homepage branch in two worktrees and edit different files in each",
          "feedback": "One branch cannot be checked out in two worktrees, and tasks need distinct responsibility branches.",
          "correct": false
        },
        {
          "id": "manual-folder-copy",
          "label": "Copy the current project folder, edit it directly, and manually copy changed files back afterward",
          "feedback": "A plain copy lacks a clear branch mapping, and manual copying can omit, overwrite, or mix unfinished changes.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "stash",
    "zh": {
      "title": "功能改到一半要临时切分支修 Bug，其中还有刚新建、尚未跟踪的文件。怎样使用 Stash 更稳妥？",
      "options": [
        {
          "id": "inspect-described-stash",
          "label": "先看状态，确认包含哪些文件，带说明贮藏，恢复后再逐项检查",
          "feedback": "状态检查能发现未跟踪文件，清楚说明和恢复验收避免拿错或遗漏临时现场。",
          "correct": true
        },
        {
          "id": "stash-as-backup",
          "label": "把重要成果长期放在 Stash 里，当作正式版本和远端备份",
          "feedback": "Stash 是本地短期中转，不具备清楚版本历史和远端备份能力。",
          "correct": false
        },
        {
          "id": "assume-all-files",
          "label": "直接 Stash 并假设新建文件一定会一起收起，不再查看状态",
          "feedback": "未跟踪文件默认可能不被包含，切换前必须确认实际收起范围。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A half-finished feature must pause for a bugfix and includes newly created untracked files. How can Stash be used safely?",
      "options": [
        {
          "id": "inspect-described-stash",
          "label": "Inspect status, confirm included files, stash with a description, and review after restoring",
          "feedback": "Status reveals untracked files, while a clear description and restore review prevent loss or confusion.",
          "correct": true
        },
        {
          "id": "stash-as-backup",
          "label": "Keep important results in Stash long-term as formal versions and remote backup",
          "feedback": "Stash is local short-term transport without clear version history or remote backup.",
          "correct": false
        },
        {
          "id": "assume-all-files",
          "label": "Stash immediately and assume every new file is included without checking status",
          "feedback": "Untracked files may not be included by default, so actual scope must be confirmed before switching.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "gitignore",
    "zh": {
      "title": "真实 `.env` 已经提交并推到远端，现在才把它写进 `.gitignore`。还需要做什么？",
      "options": [
        {
          "id": "untrack-and-rotate",
          "label": "停止跟踪文件、保留无密钥示例，并立即轮换已经泄露的凭证",
          "feedback": "忽略规则只影响未跟踪内容，历史中的密钥已经暴露，必须作废和更换。",
          "correct": true
        },
        {
          "id": "ignore-only-fix",
          "label": "只提交 `.gitignore`，旧文件和旧密钥会自动从历史消失",
          "feedback": "已跟踪文件不会因新规则消失，历史提交中的内容也仍然存在。",
          "correct": false
        },
        {
          "id": "ignore-as-encryption",
          "label": "保留原密钥继续使用，因为 `.gitignore` 已经把它加密隐藏",
          "feedback": "Gitignore 只是匹配排除规则，不会加密已经提交或本地保存的内容。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "A real .env was already committed and pushed before being added to .gitignore. What else must happen?",
      "options": [
        {
          "id": "untrack-and-rotate",
          "label": "Stop tracking it, keep a secret-free example, and immediately rotate exposed credentials",
          "feedback": "Ignore rules affect untracked content only, and credentials exposed in history must be revoked and replaced.",
          "correct": true
        },
        {
          "id": "ignore-only-fix",
          "label": "Commit only .gitignore and assume the old file and secret disappear from history",
          "feedback": "Tracked files do not vanish from a new rule, and prior commit content remains.",
          "correct": false
        },
        {
          "id": "ignore-as-encryption",
          "label": "Keep using the old secret because .gitignore has now encrypted and hidden it",
          "feedback": "Gitignore is a matching rule, not encryption for committed or local content.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "diff",
    "zh": {
      "title": "Agent 说“只改了按钮颜色”，但 `git status` 显示 12 个文件有变化，其中还有大段删除。提交前应该怎样确认？",
      "options": [
        {
          "id": "review-both-diffs",
          "label": "逐行检查未暂存和已暂存 Diff，确认误删、调试内容与密钥都不存在",
          "feedback": "Diff 展示实际增删，分别检查两部分才能知道提交最终会包含什么。",
          "correct": true
        },
        {
          "id": "file-count-only",
          "label": "只看修改文件数量，只要按钮文件在列表里就直接提交",
          "feedback": "文件名不能说明每行变化，其他文件中的误删和敏感内容仍可能进入提交。",
          "correct": false
        },
        {
          "id": "green-means-correct",
          "label": "看到新增绿色行很多就判断改动正确，不阅读删除内容",
          "feedback": "颜色只表示增加或删除，不评价业务正确性；大段删除尤其需要停下来确认。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "An Agent says it only changed a button color, but `git status` shows 12 changed files and large deletions. What should happen before commit?",
      "options": [
        {
          "id": "review-both-diffs",
          "label": "Review unstaged and staged diffs line by line for deletion, debug content, and secrets",
          "feedback": "Diff shows actual additions and removals, and both areas reveal what the final commit will contain.",
          "correct": true
        },
        {
          "id": "file-count-only",
          "label": "Check only the file count and commit as long as the button file appears",
          "feedback": "Filenames do not reveal line changes, so other files may still contain deletion or sensitive content.",
          "correct": false
        },
        {
          "id": "green-means-correct",
          "label": "Assume many green additions mean correctness and skip reading removed content",
          "feedback": "Colors indicate addition and removal, not business correctness; large deletions require explicit review.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "style-bauhaus",
    "zh": {
      "title": "你让 AI 把展览官网改成包豪斯风格，结果页面只是多了红、黄、蓝色块，内容结构没有变化。怎样判断和反馈？",
      "options": [
        {
          "id": "geometry-must-serve-function",
          "label": "指出配色不等于包豪斯，要求每个几何形承担分区、指示或强调等功能",
          "feedback": "包豪斯的判断依据是几何与功能的关系；每个形状都有明确职责时，风格才成立。",
          "correct": true
        },
        {
          "id": "accept-primary-colors",
          "label": "接受当前方案，包豪斯的核心就是三原色对比，结构可以保持不变",
          "feedback": "三原色只是容易被记住的表面特征；只有色块没有功能关系时，页面只是换了配色。",
          "correct": false
        },
        {
          "id": "switch-to-strict-grid",
          "label": "改成严格文字网格和无衬线排版，去掉页面里的几何图形",
          "feedback": "这是瑞士排版的解决方式；它同样现代，但用网格秩序取代了几何构成，不是包豪斯。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "You asked the AI to take an exhibition site in a Bauhaus direction, and it only added red, yellow, and blue blocks without changing the content structure. How do you judge and respond?",
      "options": [
        {
          "id": "geometry-must-serve-function",
          "label": "Point out that a palette is not Bauhaus; every geometric shape must serve a function like dividing, pointing, or emphasizing",
          "feedback": "Bauhaus is judged by the geometry-function relationship; the style holds only when each shape has a clear job.",
          "correct": true
        },
        {
          "id": "accept-primary-colors",
          "label": "Accept it, since primary-color contrast is the core of Bauhaus and structure can stay",
          "feedback": "Primary colors are just the most memorable surface trait; blocks without functional roles are only a recolor.",
          "correct": false
        },
        {
          "id": "switch-to-strict-grid",
          "label": "Switch to a strict text grid with sans-serif type and remove the geometric shapes",
          "feedback": "That is the Swiss typography answer; it replaces geometric composition with grid order, which is a different movement.",
          "correct": false
        }
      ]
    }
  },
  {
    "termId": "style-art-deco",
    "zh": {
      "title": "你让 AI 把精品酒店官网改成装饰艺术风格，结果页面只是换成了黑底金字，构图没有变化。哪个反馈最接近问题？",
      "options": [
        {
          "id": "structure-before-gold",
          "label": "要求先建立中轴对称骨架、阶梯轮廓和放射纹样，金色只作少量点缀",
          "feedback": "装饰艺术的判断依据是几何骨架；对称、阶梯和放射关系成立后，材质才有附着点。",
          "correct": true
        },
        {
          "id": "more-gold-area",
          "label": "认可当前方向，装饰艺术就是黑金配色，可以再加大金色面积",
          "feedback": "黑金只是容易被记住的配色结果；没有对称和几何纹样时，加大金色面积也得不到装饰艺术。",
          "correct": false
        },
        {
          "id": "add-plant-curves",
          "label": "加入更多植物藤蔓和流动曲线，让页面看起来更复古",
          "feedback": "长曲线和植物形态属于新艺术；装饰艺术使用对称的几何形，两种风格的形状语言相反。",
          "correct": false
        }
      ]
    },
    "en": {
      "title": "You asked the AI to take a boutique hotel site in an Art Deco direction, and it only switched the page to a black background with gold text. Which response comes closest to the problem?",
      "options": [
        {
          "id": "structure-before-gold",
          "label": "Ask for a symmetrical skeleton, stepped contours, and radiating motifs first, with gold only as a restrained accent",
          "feedback": "Art Deco is judged by its geometric skeleton; materials only have a place once symmetry, steps, and rays exist.",
          "correct": true
        },
        {
          "id": "more-gold-area",
          "label": "Approve the direction since Art Deco is the black-and-gold palette, then enlarge the gold areas",
          "feedback": "Black and gold is only the memorable surface result; without symmetry and geometric motifs, more gold is still not Art Deco.",
          "correct": false
        },
        {
          "id": "add-plant-curves",
          "label": "Add more plant vines and flowing curves to make the page feel more vintage",
          "feedback": "Long curves and plant forms belong to Art Nouveau; Art Deco uses symmetrical geometry, the opposite shape language.",
          "correct": false
        }
      ]
    }
  }
];
