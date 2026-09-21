export const quickCheckFeedback = {
  "component": {
    "zh": [
      "对。卡片的共同责任集中在一起，改卡片样式或行为后，三个页面会得到同一套结果。",
      "复制可以暂时显示内容，但共同规则会分散，后续容易漏改或出现不一致。",
      "参数越多不代表复用越好。组件应集中稳定的共同责任；把所有差异都塞成开关，会让调用和维护同样复杂。"
    ],
    "en": [
      "Correct. The card's shared responsibility lives in one place, so a style or behavior change reaches all three pages.",
      "It can show content initially, but shared rules become scattered and will drift or be missed later.",
      "That does not separate responsibilities. A component should make one reasonably independent part of the interface easier to understand and maintain."
    ]
  },
  "state": {
    "zh": [
      "对。等待、成功和失败是不同状态，页面要根据真实请求结果切换。",
      "这会把界面文案当成证据，用户会以为数据已经成功保存。",
      "禁用按钮只能防止重复提交，不能告诉用户结果。成功和失败必须进入不同的可见状态。"
    ],
    "en": [
      "Correct. Pending, success, and failure are different states, and the interface should change from the actual request result.",
      "That treats interface text as proof and makes users think data was stored when it was not.",
      "People still need to know whether an action is pending, succeeded, or failed. Removing feedback does not make state accurate."
    ]
  },
  "markdown": {
    "zh": [
      "Markdown 同时保留可读结构和纯文本内容，命令能复制，修改也能在 Git 中逐行审查。",
      "图片能保留外观，但文字难以复制、搜索和逐行比较，不适合持续协作的 README。",
      "不同编辑器会用不同字体和换行宽度，空格排版无法稳定表达标题、列表和代码边界。"
    ],
    "en": [
      "Markdown keeps readable structure in plain text, so commands remain copyable and changes can be reviewed line by line.",
      "Images preserve appearance, but their text is difficult to copy, search, and compare line by line.",
      "Editors use different fonts and wrapping widths, so spacing cannot reliably express headings, lists, or code boundaries."
    ]
  },
  "html": {
    "zh": [
      "HTML 元素会把标题层级和链接角色交给浏览器识别，页面外观仍可继续由 CSS 控制。",
      "视觉样式能改变外观，却不会让浏览器、键盘和辅助技术识别标题结构或链接角色。",
      "图片会丢失可选择文字和清楚的内容结构，入口范围与含义也难以被正确识别。"
    ],
    "en": [
      "HTML elements expose heading hierarchy and link behavior to the browser while CSS can still control appearance.",
      "Visual styling changes appearance but does not give browsers, keyboards, or assistive tools the missing roles.",
      "An image removes selectable text and clear document structure, and its single click target obscures the action's meaning."
    ]
  },
  "css": {
    "zh": [
      "对。按钮行为已经存在，先看匹配和覆盖后的最终值，才能知道主题色在哪一步被替换。",
      "点击逻辑和静态颜色是两件事；改事件可能掩盖 CSS 覆盖问题，还会让颜色依赖一次点击。",
      "更换元素不会自动解决样式规则冲突；应先确认选择器是否命中以及哪条声明胜出。"
    ],
    "en": [
      "Correct. The button behavior already exists, so inspect matching and the final value to find where the theme color was replaced.",
      "Click behavior and a static color are separate. This can hide the CSS conflict and make the color depend on one click.",
      "Changing the element does not resolve a stylesheet conflict. Check selector matching and which declaration wins first."
    ]
  },
  "dom": {
    "zh": [
      "对。查看源代码反映初始文档，Elements 面板里的运行时 DOM 才能显示点击后的节点变化。",
      "这会把一次点击产生的动态内容变成固定内容，仍然没有解释脚本怎样更新当前页面。",
      "DOM 更新只证明当前页面有了节点，不证明数据已写入数据库；刷新后是否保留还要单独验证。"
    ],
    "en": [
      "Correct. View Source shows the initial document; the runtime DOM in Elements shows the node change after the click.",
      "That turns click-generated content into fixed content and still does not explain how the script updates the current page.",
      "A DOM update proves only that the current page has a node. It does not prove a database write; refresh persistence needs a separate check."
    ]
  },
  "title-tag": {
    "zh": [
      "对。title 负责浏览器文档标识，商品名能帮助区分页面；H1 仍负责页面正文层级。",
      "H1 的变化不会自动证明浏览器标签页的 title 已经按页面更新。",
      "搜索系统可能参考 title，但不保证原样采用；当前页面首先要解决标签页识别问题。"
    ],
    "en": [
      "Correct. The title identifies the document in the browser, while the product name distinguishes pages and the H1 keeps its content hierarchy.",
      "Changing the H1 does not prove that the browser tab title updates per page.",
      "Search systems may use the title but are not required to copy it exactly; first solve page identification in the tab."
    ]
  },
  "page-metadata": {
    "zh": [
      "对。不同消费方读取不同字段，标签页正常不能证明分享卡的图片字段存在或可访问。",
      "正文内容不等于分享元数据，不能替代对分享卡输入字段的检查。",
      "Favicon 主要服务浏览器识别站点，不是分享卡的主图字段。"
    ],
    "en": [
      "Correct. Consumers read different fields, so a correct tab title does not prove that the share image exists or is reachable.",
      "Page content is not the same as sharing metadata and cannot replace checking the fields that feed the preview card.",
      "A Favicon mainly identifies the site in browser surfaces; it is not the main image field for a share card."
    ]
  },
  "favicon": {
    "zh": [
      "对。页头 Logo 和浏览器 Favicon 是两条使用路径，应检查图标资源、关联配置和浏览器缓存。",
      "Header 只负责页面中的品牌入口，不会自动替换浏览器标签页图标。",
      "界面功能图标服务于操作含义，与浏览器识别站点的 Favicon 不是同一个对象。"
    ],
    "en": [
      "Correct. The header Logo and browser Favicon are separate paths, so inspect the asset, relation, and browser cache.",
      "The Header owns the brand entry in the page; it does not automatically replace the browser tab icon.",
      "A UI action icon communicates an operation and is separate from the Favicon that identifies the site in the browser."
    ]
  },
  "open-graph": {
    "zh": [
      "对。网页中的 Hero 图和分享卡输入是不同路径，必须检查 og:image 的值与外部可访问性。",
      "裁切页面图片不会自动写入 Open Graph 元数据，也不能保证外部平台读取到它。",
      "Open Graph 主要描述链接分享预览，不是搜索排名配置；正文关键词不能替代 og:image。"
    ],
    "en": [
      "Correct. The page Hero image and share-card input are separate paths, so inspect the og:image value and reachability.",
      "Cropping the page image does not write Open Graph metadata or guarantee that the external platform reads it.",
      "Open Graph primarily describes shared-link previews, not search ranking; body keywords cannot replace og:image."
    ]
  },
  "web-app-manifest": {
    "zh": [
      "对。安装后的默认启动地址由 Manifest 等安装配置决定，不能靠更换 Favicon 修复。",
      "Favicon 负责浏览器站点识别，不负责安装后的默认启动 URL。",
      "Service Worker 与缓存或离线行为有关，不能替代检查 Manifest 的 start_url。"
    ],
    "en": [
      "Correct. The default installed launch address comes from install configuration such as the Manifest, not from changing the Favicon.",
      "A Favicon identifies a site in browser surfaces; it does not define the installed default URL.",
      "A Service Worker relates to caching or offline behavior and cannot replace checking the Manifest start_url."
    ]
  },
  "undo": {
    "zh": [
      "对。撤销把刚发生的一步原样退回，删掉的记录按原来的样子回来——比重打快，也不会引入新错误。",
      "重打是新建一条，金额和日期可能记错；撤销恢复的才是原来那条。",
      "刷新不会撤销操作，反而可能把撤销历史清掉——这一步做完就真的退不回了。"
    ],
    "en": [
      "Correct. Undo rolls back the last step exactly as it was—faster than retyping and free of new mistakes.",
      "Retyping creates a new record and risks misremembering; undo restores the original one.",
      "Refreshing does not undo anything and may wipe the undo history—after that there is no way back."
    ]
  },
  "accessibility": {
    "zh": [
      "对。这三项分别覆盖看不见图的人、不用鼠标的人和看不清字的人——这三项各管一件事，一起查一遍就能挡住最常见的问题。",
      "对比度只照顾「看不清」一种情况；不用鼠标的和用读屏的访客照样可能被挡在门外。",
      "同一台设备同一浏览器正是「我这里能用」的陷阱；无障碍要换输入方式和场景测。"
    ],
    "en": [
      "Correct. Each of the three blocks one common barrier, and together they are together they catch the most common problems in one pass.",
      "Contrast covers only \"hard to see\"; keyboard and screen-reader users may still be locked out.",
      "Same device, same browser is exactly the \"works for me\" trap; accessibility needs different inputs and contexts."
    ]
  },
  "button": {
    "zh": [
      "对。前三项会直接改变或放弃当前状态，应该触发动作；重设密码会前往另一页，适合用链接。删除还要在执行前确认。",
      "“取消修改”会直接放弃当前编辑，也是在执行动作；如果它不是离开页面，就不该用链接表达。",
      "都使用按钮不代表层级相同。删除账号需要降低视觉优先级并单独确认，不能和保存并列成同一种操作。"
    ],
    "en": [
      "Correct. The first three change or discard current state, while reset password navigates to another page. Deletion also needs confirmation.",
      "Save, discard, and delete act on the current page; links do not express that behavior or handle submission state well.",
      "Each action needs an explicit target; destructive account deletion cannot be mixed with routine saving."
    ]
  },
  "link": {
    "zh": [
      "链接会表达明确目的地，同时保留复制地址、浏览器返回和键盘访问能力。",
      "按钮适合执行当前页动作，但展开内容不会形成可复制的独立详情地址。",
      "普通文字缺少链接语义，也容易丢失地址、焦点和浏览器导航能力。"
    ],
    "en": [
      "A link provides a real destination plus URL copying, browser history, and keyboard access.",
      "A button can reveal content, but it does not provide the independent, copyable destination requested.",
      "Plain clickable text lacks link semantics and can lose URL, focus, and browser navigation behavior."
    ]
  },
  "input": {
    "zh": [
      "姓名是自由填写的短文本，单行输入框既直接，也能清楚关联字段标签。",
      "多行文本框适合评论或描述；用来填姓名会放大控件却没有增加有效能力。",
      "用户需要自由填写姓名，固定选项会阻止名单之外的有效输入。"
    ],
    "en": [
      "A name is short free-form text, so a labeled single-line input matches both the value and the task.",
      "A textarea suits comments or descriptions; its extra height adds no useful capability for a name.",
      "The value must be freely entered, so fixed options would block valid names outside the list."
    ]
  },
  "textarea": {
    "zh": [
      "故障描述是较长的自由文本，多行空间和可见字数限制都直接服务这项任务。",
      "单行输入框会隐藏上下文，让用户难以检查和修改多段描述。",
      "题目只需要纯文本描述，完整富文本工具会增加无关操作和界面负担。"
    ],
    "en": [
      "The task needs longer free-form text, so multiline space and a visible limit directly support it.",
      "A single line hides context and makes several paragraphs difficult to review and edit.",
      "The task only needs plain text, so rich formatting tools add unrelated choices and interface weight."
    ]
  },
  "input-number": {
    "zh": [
      "控件负责数值格式和基本范围，提交校验负责判断当时是否还有足够库存。",
      "滑块适合近似或连续调节，精确选择购物数量时输入和加减通常更直接。",
      "1–20 只是允许填写的范围，并不能证明提交时仍有对应库存，订单仍可能超卖。"
    ],
    "en": [
      "The control handles numeric format and basic range, while submission checks whether enough stock exists at that moment.",
      "Sliders fit approximate or continuous adjustment. Typing and step buttons are clearer for exact purchase quantities.",
      "The allowed input range does not prove that the requested stock still exists when the order is submitted."
    ]
  },
  "radio": {
    "zh": [
      "少量互斥选项适合直接展示为单选组，用户能同时比较所有时间段。",
      "复选项表达可以多选，等提交时才纠错会让控件语义和真实规则冲突。",
      "下拉可以节省空间，但题目强调少量选项要一眼看全并直接比较。"
    ],
    "en": [
      "A small mutually exclusive set fits a visible radio group, letting people compare every slot.",
      "Checkboxes communicate multiple selection, so their meaning would conflict with the actual rule.",
      "A dropdown saves space, but it works against the stated need to see and compare all four options."
    ]
  },
  "checkbox": {
    "zh": [
      "三个渠道彼此独立，复选框能准确表达可选一个、多个或完全不选。",
      "单选组只允许保留一个选项，会错误限制用户同时订阅多个渠道。",
      "开关通常表示操作后立即改变状态，与题目中统一提交后生效的流程不一致。"
    ],
    "en": [
      "The channels are independent, and checkboxes express choosing one, several, or none accurately.",
      "A radio group keeps only one choice, incorrectly preventing people from selecting several channels.",
      "Switches normally signal immediate change, which conflicts with the form's apply-on-submit behavior."
    ]
  },
  "switch": {
    "zh": [
      "这是一个明确的开关状态，而且操作后立即生效，符合开关的行为预期。",
      "复选框配合提交可以成立，但不符合题目要求的即时反馈和即时生效。",
      "一次性按钮不能持续显示当前是开还是关，也难以让用户随时反向切换。"
    ],
    "en": [
      "This is a persistent on-off setting with an immediate effect, which matches switch behavior.",
      "A submitted checkbox can work elsewhere, but it does not meet the requested immediate behavior.",
      "A one-time button does not keep the current state visible or make reversing the choice clear."
    ]
  },
  "slider": {
    "zh": [
      "音量是连续范围；当前值、实时反馈和键盘操作共同覆盖了判断与操作需要。",
      "数字输入能精确填写，却削弱了连续调节和即时试听，不能满足当前任务的主要操作方式。",
      "大量固定选项会增加查找成本，也无法提供拖动过程中的连续反馈。"
    ],
    "en": [
      "Volume is a continuous range. A visible value, live feedback, and keyboard controls cover both understanding and operation.",
      "A number field supports precision but removes the continuous adjustment and immediate listening required here.",
      "A long fixed list increases search effort and cannot provide feedback throughout a continuous drag."
    ]
  },
  "rate": {
    "zh": [
      "评分控件表达有顺序的等级，文字分值让当前选择不只依赖星星数量或颜色。",
      "二选一只能收集正负态度，无法保留当前任务要求的五级满意程度。",
      "自由数字会超出评价规则，也缺少评分控件提供的固定等级和直观反馈。"
    ],
    "en": [
      "The control expresses ordered levels, while text makes the current value available without relying only on stars or color.",
      "A binary choice captures positive or negative sentiment but loses the five degrees required by this task.",
      "Free numbers can exceed the rating rules and do not provide the fixed levels and immediate feedback of a rating control."
    ]
  },
  "select": {
    "zh": [
      "对。固定选项里只选一个时，选择器能节省空间并清楚表达当前值。",
      "自由文本容易产生无效或不一致的值。",
      "只有四个固定值时，不需要搜索和创建新值；额外能力会让用户误以为可以保存系统不支持的时区。"
    ],
    "en": [
      "Correct. A selector saves space and clearly represents the current value for one option from a fixed set.",
      "Free text easily creates invalid or inconsistent values.",
      "These are mutually exclusive values for one field, not four immediate actions."
    ]
  },
  "auto-complete": {
    "zh": [
      "对。候选集很大且已有规范数据时，自动完成能帮助搜索并避免拼错。",
      "大量选项难以浏览，也不适合按名字快速缩小范围。",
      "同名员工可能不止一位。系统应展示部门、邮箱等可区分信息，让用户明确选中目标，而不是替用户猜。"
    ],
    "en": [
      "Correct. With a large, standardized candidate set, autocomplete supports search and avoids misspelling.",
      "Large option sets are hard to browse and not fast to narrow by name.",
      "The invitee must match an existing account; arbitrary creation makes duplicates or wrong targets."
    ]
  },
  "cascader": {
    "zh": [
      "对。任务只需要一条父子路径，级联选择能保留选择顺序和最终结果。",
      "多选树适合跨分支选择多个范围，不适合只能提交一个最终收货地区的任务。",
      "三个独立选项无法保证父子关系正确，可能提交并不存在的省市区组合。"
    ],
    "en": [
      "Correct. The task needs one parent-child path, and a cascader preserves both the sequence and final result.",
      "A multi-select tree fits several scopes across branches, not one final shipping region.",
      "Independent choices cannot preserve the hierarchy and may submit a region combination that does not exist."
    ]
  },
  "tree-select": {
    "zh": [
      "对。任务需要看见层级并跨分支多选，树选择器能同时表达父子关系和选择状态。",
      "级联选择适合一条路径，无法同时保留多个部门下的小组范围。",
      "扁平列表隐藏了部门关系，后端也不能从未表达的选择规则中可靠推断父级范围。"
    ],
    "en": [
      "Correct. The task needs visible hierarchy and cross-branch selection, which a tree selector can express together.",
      "A cascader fits one path and cannot preserve groups selected under several departments.",
      "A flat list hides department relationships, and the backend cannot reliably infer rules the interface never expressed."
    ]
  },
  "date-picker": {
    "zh": [
      "同一个区间控件能统一格式、显示可选范围，并在选择过程中维护两个日期的关系。",
      "自由文本会引入格式歧义，用户也会在完成提交前看不到哪些日期不可订。",
      "单个日期都可订不代表区间有效；若不联动检查，离店可能早于入住。"
    ],
    "en": [
      "One range control keeps the format consistent, exposes availability, and maintains the relationship between both dates.",
      "Free text introduces format ambiguity and hides unavailable dates until after the user finishes the form.",
      "Two individually available dates do not guarantee a valid range; check-out could still precede check-in."
    ]
  },
  "time-picker": {
    "zh": [
      "结构化时段控制格式和可用范围，时区说明让不同地区用户理解选择对应的真实时刻。",
      "自然语言无法稳定对应半小时预约位，不同地区对“明早”的理解也可能不同。",
      "选项看似精确，但跨地区用户可能按自己的本地时间理解，最终预约到错误时刻。"
    ],
    "en": [
      "Structured slots control format and availability, while the zone tells users in other regions what instant they selected.",
      "Natural language cannot map reliably to 30-minute inventory, and tomorrow morning differs across regions.",
      "The values look precise, but remote users may interpret them in their own local time and book the wrong instant."
    ]
  },
  "upload": {
    "zh": [
      "浏览器检查能提前反馈，但请求可以被绕过；服务器仍要检查文件类型、大小和权限。",
      "用户能提前判断文件是否合适，并看见传输状态；服务器还可以在保存前再次校验。",
      "最终校验仍需要，但已知限制应提前说明；传完才拒绝会浪费时间和流量。"
    ],
    "en": [
      "Browser checks improve feedback but can be bypassed. The server must still verify type, size, and permission.",
      "People can choose an eligible file, see the transfer state, and recover from failure while the server validates it again.",
      "Final server validation is still required, but known limits should be visible before a long transfer begins."
    ]
  },
  "form": {
    "zh": [
      "三个字段共同完成注册，分开提交会产生不完整状态，用户也无法确认账号何时真正创建。",
      "这些字段属于同一项注册任务；统一提交能一起校验，并明确显示创建成功或失败。",
      "统一提交是对的，但笼统提示没有指出哪个字段需要修改，用户仍要逐项猜测。"
    ],
    "en": [
      "The fields belong to one sign-up task. Separate submissions create incomplete states and make it unclear when the account exists.",
      "The fields complete one task, so one submission can validate them together and report whether account creation succeeded.",
      "One submission is appropriate, but a generic message does not identify which field needs correction."
    ]
  },
  "color-picker": {
    "zh": [
      "色盘用于探索，精确色值用于复现，对比度检查则确保选择后的界面仍能阅读。",
      "用户能看到结果，却无法精确修改、复制或向他人复现同一个颜色。",
      "视觉偏好不能保证文字与背景可读，过浅或过近的颜色可能让关键按钮失去对比。"
    ],
    "en": [
      "The field supports exploration, the exact value supports reproduction, and contrast validation preserves readability.",
      "Users can see the result but cannot adjust it precisely, copy it, or reproduce the same color elsewhere.",
      "Visual preference does not guarantee readable foreground contrast, so pale or similar colors may hide key actions."
    ]
  },
  "label": {
    "zh": [
      "可见且关联的标签会在输入前后持续说明字段用途，也扩大了聚焦控件的入口。",
      "文案更具体仍未解决输入后消失的问题，用户检查已填内容时依然缺少字段名称。",
      "图标可能有歧义，悬停说明在触屏和键盘场景也不稳定，不能替代持续可见的标签。"
    ],
    "en": [
      "A visible, associated label explains the field before and after entry and provides another way to focus it.",
      "More specific placeholders still disappear, leaving users without field names when reviewing completed values.",
      "Icons can be ambiguous and hover explanations are unreliable on touch and keyboard, so they cannot replace labels."
    ]
  },
  "placeholder": {
    "zh": [
      "对。占位文字只是开场的示范，输入一开始就让位。所以它不能代替标签——不然输入之后用户就不知道框里该是什么了。",
      "标签一直显示在框旁边，不随输入消失——这正是它和占位文字的分工。",
      "占位文字会在输入开始时消失；如果它没消失，反而是实现有问题的信号。"
    ],
    "en": [
      "Correct. The placeholder yields the moment typing starts—which is why it cannot replace the label.",
      "The label stays beside the box through typing—that is exactly its job.",
      "The placeholder does disappear once typing begins; if it stays, the implementation is off."
    ]
  },
  "table": {
    "zh": [
      "卡片适合浏览单条丰富内容，但字段上下分散后，很难沿同一列快速比较订单。",
      "记录结构相同，而且任务是跨记录比较；固定列能让金额、状态和时间快速对齐。",
      "描述列表适合阅读一条记录；逐笔切换会失去同时比较 50 笔订单的能力。"
    ],
    "en": [
      "Cards help browse rich individual items, but vertically scattered fields make cross-order comparison slow.",
      "Every record shares the same fields, and fixed columns make amounts, statuses, and dates easy to compare.",
      "A description list is useful for one record, but switching records removes the side-by-side comparison the task needs."
    ]
  },
  "list": {
    "zh": [
      "这些记录结构一致、以顺序浏览为主，列表能让用户连续扫读并进入单条详情。",
      "表格更适合跨行比较固定字段；摘要长短不一时拆列会压缩内容并增加横向阅读。",
      "通知的主体不是图片，多列卡片会打断时间顺序，还引入当前任务不需要的视觉信息。"
    ],
    "en": [
      "The records share a structure and are read in sequence, so a list supports scanning and opening individual details.",
      "Tables suit comparison across fixed fields. Variable summaries become compressed and force horizontal reading.",
      "Images are not the main content here. A grid interrupts chronological reading and adds irrelevant visual information."
    ]
  },
  "card": {
    "zh": [
      "每个模板都是可独立浏览和进入详情的对象，卡片能把它的关键信息组合在一起。",
      "一张大容器无法表达每个模板的独立边界，也会让点击目标和信息归属变模糊。",
      "数据表适合密集比较字段，但题目要求突出封面并以视觉方式浏览模板。"
    ],
    "en": [
      "Each template is an independent browsable object, so a card can group its key information and destination.",
      "One large container hides item boundaries and makes click targets and information ownership unclear.",
      "A table suits dense field comparison, but the task calls for visual browsing led by template covers."
    ]
  },
  "tag": {
    "zh": [
      "两者都用短文字帮助扫读，但只有可取消的筛选条件需要关闭操作，状态本身不是按钮。",
      "状态标签描述现有结果，不应暗示用户能直接改动；把标记和操作混在一起会造成误触。",
      "数量徽标不能代替“已付款”“北京”等具体含义，颜色和圆点也不足以让用户识别条件。"
    ],
    "en": [
      "Both use short text for scanning, but only removable filter conditions need a close action. Status is not a button.",
      "A status tag describes an existing result and should not imply direct editing. Mixing labels and actions invites mistakes.",
      "Counts cannot replace meanings such as Paid or Beijing, and color dots alone do not identify the active condition."
    ]
  },
  "badge": {
    "zh": [
      "徽标补充入口的数量状态，可访问说明则让不依赖视觉的人获得同样信息。",
      "统计卡会占用远多于状态提示所需的空间，也割裂了数量与消息入口的关系。",
      "红点能提示发生了变化，却不能表达数量，依赖颜色的用户也可能无法获得完整状态。"
    ],
    "en": [
      "The badge supplements the entry with a compact count, while the accessible description provides the same information nonvisually.",
      "A statistic card consumes much more space than this status needs and separates the count from the message entry.",
      "A dot signals change but cannot communicate quantity, and color alone does not provide the complete state."
    ]
  },
  "avatar": {
    "zh": [
      "头像帮助快速扫读，姓名负责明确身份，稳定的首字兜底还能覆盖图片缺失情况。",
      "相似照片难以区分，触屏和键盘用户也不能稳定依赖悬停提示确认身份。",
      "首字可能重复，只适合作为缺图兜底；没有姓名时仍无法确认具体作者。"
    ],
    "en": [
      "The avatar speeds scanning, the name confirms identity, and a stable initials fallback covers missing images.",
      "Similar photos are hard to distinguish, and touch or keyboard users cannot reliably depend on hover for identity.",
      "Initials can collide and work only as an image fallback. Without names, the specific author remains unclear."
    ]
  },
  "descriptions": {
    "zh": [
      "这是单条记录的只读属性，字段名与内容配对能让用户快速确认信息。",
      "禁用控件暗示这里本可编辑，还会增加视觉噪声；当前页面只需要清楚阅读。",
      "表格适合多条记录按列比较，单行八列在窄屏上会明显压缩内容。"
    ],
    "en": [
      "These are read-only properties of one record, so paired labels and values make them easy to verify.",
      "Disabled controls imply potential editing and add visual noise when the task only requires reading.",
      "Tables suit comparing many records by column. One row across eight columns compresses badly on narrow screens."
    ]
  },
  "statistic": {
    "zh": [
      "指标名称、当前值、单位和比较基准都明确，用户才能理解数字代表什么变化。",
      "涨幅没有说明是什么指标、相对哪个时期，无法支持业务判断。",
      "进度条需要明确目标总量；当前数据描述的是订单数量和环比，不是完成进度。"
    ],
    "en": [
      "Metric name, current value, unit, and benchmark are all explicit, so the change can be understood.",
      "A percentage without the metric or comparison period cannot support a business judgment.",
      "Progress needs a defined target. This data describes a count and period-over-period change, not completion."
    ]
  },
  "tabs": {
    "zh": [
      "三个区域共享同一个项目上下文且层级平行，页签能保持当前位置并切换内容。",
      "顶部导航服务跨页面的核心目的地，不适合承载某个项目内部的局部内容。",
      "概览、成员和日志没有完成顺序，用步骤条会制造不存在的流程约束。"
    ],
    "en": [
      "The sections share one project context and the same level, so tabs preserve context while switching content.",
      "Global navigation serves major destinations across the site, not sections inside one project.",
      "Overview, Members, and Logs have no completion order, so steps would invent a false workflow."
    ]
  },
  "segmented": {
    "zh": [
      "两个选项短、互斥且切换同一份内容的显示方式，适合紧凑的分段选择器。",
      "这里没有两个独立内容区，只是在改变同一批文件的显示模式。",
      "列表和网格是并列命名的模式，不是某个功能的开启与关闭状态。"
    ],
    "en": [
      "The choices are short, mutually exclusive display modes for the same content, which fits a segmented control.",
      "There are no separate content sections here; only the presentation of the same files changes.",
      "List and Grid are named peer modes, not the enabled and disabled states of one setting."
    ]
  },
  "collapse": {
    "zh": [
      "折叠能降低次要内容的浏览负担，影响决定的关键条件则不应等待用户主动发现。",
      "结构更短却隐藏了关键购买条件，用户可能在没有看到限制时作出决定。",
      "大量标签难以扫描和换行，也没有解决退款条件需要持续可见的问题。"
    ],
    "en": [
      "Collapsing reduces the cost of secondary content, while a decision-critical condition should not depend on discovery.",
      "The page becomes shorter but hides a key purchase condition, so users may decide without seeing the limit.",
      "Many tabs are difficult to scan and wrap, and they still fail to keep the refund condition visible."
    ]
  },
  "timeline": {
    "zh": [
      "这些是带时间先后的历史事件，时间轴能同时表达顺序和每次变化的具体内容。",
      "步骤条通常引导待完成流程，而这里需要还原已经发生的记录和责任人。",
      "按名称排序会丢失事件先后，用户无法判断工单状态是怎样变化的。"
    ],
    "en": [
      "These are historical events with temporal order, so a timeline expresses both sequence and each specific change.",
      "A stepper usually guides work still to be completed, while this page must reconstruct past records and responsibility.",
      "Alphabetical ordering removes event sequence, so users cannot see how the ticket state changed."
    ]
  },
  "tree": {
    "zh": [
      "文件本身具有多层父子关系，树能在同一区域里逐级浏览并保持当前位置。",
      "扁平排序会丢失文件属于哪个目录，重名文件和深层位置都难以判断。",
      "级联选择适合沿单一路径选值，当前任务需要持续展开和比较同级节点，而不是提交选择。"
    ],
    "en": [
      "Files naturally form a multi-level hierarchy, and a tree supports gradual browsing while preserving location.",
      "Flattening removes directory membership, making duplicate names and deep locations difficult to understand.",
      "A cascader fits selecting one path. This task needs persistent expansion and sibling comparison rather than submission."
    ]
  },
  "carousel": {
    "zh": [
      "同一区域轮换相关图片节省窄屏空间，明确位置和入口让浏览过程由用户掌控。",
      "用户无法停留查看细节，也不知道还有多少图片或怎样返回上一张。",
      "内容都能看到，但在手机上占用过长页面，失去单个主图区域的浏览目标。"
    ],
    "en": [
      "Rotating related images in one area saves narrow-screen space, while position and controls keep users in charge.",
      "Users cannot hold an image for inspection, know how many remain, or return to the previous one.",
      "Every image is visible, but the mobile page becomes unnecessarily long and loses the intended single-image area."
    ]
  },
  "empty": {
    "zh": [
      "请求已经完成，继续显示加载状态会让用户误以为内容仍在路上，而不是当前确实没有项目。",
      "页面应说明本来会出现什么、为什么现在为空，并给出创建第一条数据的可执行下一步。",
      "请求已经成功，空数据不是错误；错误提示会让用户重复请求，却仍然得不到项目。"
    ],
    "en": [
      "The request is finished, so a loading state incorrectly suggests that content is still on its way.",
      "The page explains what belongs here, why it is empty now, and the useful next step for creating the first item.",
      "An empty successful response is not a failure. Refreshing repeats the request without solving the absence of data."
    ]
  },
  "image": {
    "zh": [
      "预留尺寸能减少加载跳动，按比例裁切避免变形，文字说明覆盖加载失败和非视觉阅读。",
      "尺寸统一了，但强制改变长宽比会让商品外观失真，影响用户判断。",
      "保留原比例却会在加载过程中不断改变卡片高度，导致内容位置跳动。"
    ],
    "en": [
      "Reserved dimensions reduce layout shift, proportional cropping avoids distortion, and text covers failures and nonvisual reading.",
      "The boxes become consistent, but changing aspect ratio distorts products and can mislead visual judgment.",
      "Original ratios remain intact, but card heights change during loading and make surrounding content jump."
    ]
  },
  "file": {
    "zh": [
      "文件项让用户确认具体对象和当前结果，操作也能准确作用在对应附件上。",
      "总数不能说明哪个文件失败或正在处理，用户也无法确认是否选对文件。",
      "传输过程中没有单项状态，用户无法发现失败、取消错误文件或判断是否需要等待。"
    ],
    "en": [
      "File items let users confirm each object and its result, while actions target the correct attachment.",
      "A total count cannot identify the failed or active file, and users cannot verify what they selected.",
      "Without per-file progress, users cannot notice failure, remove a mistaken file, or know whether to wait."
    ]
  },
  "icon": {
    "zh": [
      "图标帮助扫读，文字消除陌生和高风险操作的歧义，按钮则负责真实交互。",
      "悬停说明在触屏上不可用，用户也必须先猜测图标；高风险操作应在点击前持续说明。",
      "确认弹窗能防止误提交，却不能解决入口本身含义不清；用户不应先触发才知道后果。"
    ],
    "en": [
      "The icon aids scanning, the text removes ambiguity for an unfamiliar high-risk action, and the button owns interaction.",
      "Hover help is unavailable on touch and still requires users to guess the icon. High-risk actions need persistent meaning before activation.",
      "Confirmation can prevent final mistakes but does not make the entry understandable before users activate it."
    ]
  },
  "quote": {
    "zh": [
      "引用块负责区分原话与作者观点，来源和上下文让读者能够判断这句话代表什么。",
      "排版上像引用不代表内容可核实，缺少来源时读者无法判断是否为真实原话。",
      "改写和虚构身份改变了证据本身，不能继续当作客户原话呈现。"
    ],
    "en": [
      "A quote separates original speech from the author's view, while source and context let readers judge what it represents.",
      "Quotation styling does not make content verifiable. Without a source, readers cannot know whether the words are real.",
      "Rewriting and inventing identity changes the evidence, so it can no longer be presented as the customer's exact words."
    ]
  },
  "video": {
    "zh": [
      "视频展示动态过程，字幕和文字步骤确保静音、无法播放或需要快速查阅时仍能完成任务。",
      "自动声音会打断用户并消耗资源，也没有解决字幕和替代说明的需要。",
      "无法播放、听不清或只想定位一步的用户会失去完成任务所需的信息。"
    ],
    "en": [
      "Video shows motion, while captions and written steps preserve the task for muted playback, failure, and quick reference.",
      "Automatic sound interrupts users and consumes resources, while still failing to provide captions or alternatives.",
      "Users who cannot play or hear it, or who need one step quickly, lose the information required to complete the task."
    ]
  },
  "chat-ui": {
    "zh": [
      "对。用户既知道发生了什么，也不会丢掉刚写的内容，还能完成下一步。",
      "静默重发保住了内容，却让用户不知道消息是否送达、何时会发送，也无法决定修改或取消。",
      "这制造了错误状态，不能让界面文案代替真实传输结果。"
    ],
    "en": [
      "Correct. The person knows what happened, does not lose the text, and has a usable next step.",
      "The person cannot know whether it was delivered and may lose text that is hard to recreate.",
      "That fabricates state; interface wording cannot replace an actual delivery result."
    ]
  },
  "filter": {
    "zh": [
      "对。两个已知字段共同缩小任务集合，用户也能看见为什么有些任务没有出现。",
      "标题未必包含“本周到期”或“未完成”，这会把结构化条件误当关键词。",
      "排序不会排除不符合条件的任务，只会改变它们出现的顺序。"
    ],
    "en": [
      "Correct. Two known fields narrow the task set, and people can see why some tasks are absent.",
      "Titles may not contain “due this week” or “incomplete”; that mistakes structured conditions for keywords.",
      "Sorting does not remove items that fail a condition; it only changes their order."
    ]
  },
  "chart": {
    "zh": [
      "对。柱的长度让类别数量容易比较，标签和数值让结果可核对。",
      "饼图能看构成，但相近扇区不容易精确比较；题目要比较四个独立类别的数量，柱长更直接。",
      "四个渠道不是连续时间点，连线会暗示不存在的顺序和趋势，无法准确表达类别比较。"
    ],
    "en": [
      "Correct. Bar length makes category counts easy to compare, while labels and values keep the result checkable.",
      "People cannot reliably tell what each color means or the precise difference.",
      "A chart can show changes happening together; it cannot prove causation on its own."
    ]
  },
  "app-icon": {
    "zh": [
      "对。系统会缩放或套用形状，图标应保留清楚的识别中心，不能直接把横向 Logo 当成最终图标。",
      "工具栏图标表达单个功能，应用图标负责识别整个应用，尺寸、语义和展示位置都不同。",
      "默认图标会失去应用识别；应调整品牌图形的简化程度和安全区域，而不是放弃身份。"
    ],
    "en": [
      "Correct. The system scales or masks the icon, so its recognition center must remain clear instead of using a horizontal Logo unchanged.",
      "A toolbar icon communicates one function; an App Icon identifies the whole app, so their meanings and surfaces differ.",
      "A default icon loses the app's identity. Adjust the brand shape and safe area instead of abandoning recognition."
    ]
  },
  "sort": {
    "zh": [
      "对。排序只调整先后，所有记录都还在，金额最大的排到最上面；想看前几条看前几行。",
      "筛选会把不符合条件的记录藏起来，列表变短——数量变了，这是筛选不是排序。",
      "删除直接减少数据本身，代价是记录没了；看排序不该用删除实现。"
    ],
    "en": [
      "Correct. Sorting only reorders—every record stays, the largest ones move to the top.",
      "Filtering hides non-matching records and shortens the list—the count changes. That is filtering, not sorting.",
      "Deleting removes the data itself. Viewing order should never be built on deletion."
    ]
  },
  "alert": {
    "zh": [
      "这条信息需要持续可见，但不必阻断编辑；就近警告能同时说明风险和下一步。",
      "到期提醒需要用户记住并可能稍后处理，短暂消失的轻提示很容易被错过。",
      "用户仍可继续使用和编辑，强制阻断超过了当前风险；持续但不阻断的提醒更合适。"
    ],
    "en": [
      "The message remains visible without blocking editing and gives both the risk and a clear next step.",
      "An expiry reminder may require later action, so a brief disappearing message is too easy to miss.",
      "The account still works, so blocking the entire settings task overstates the current restriction."
    ]
  },
  "toast": {
    "zh": [
      "复制是已经完成的小操作，简短确认能说明结果，又不会打断用户接下来的工作。",
      "结果不需要长期记住或处理，持续占据页面会把一次轻量反馈误写成重要状态。",
      "复制已经完成且没有后续选择，弹窗增加了无意义的操作并打断当前流程。"
    ],
    "en": [
      "Copying is a completed lightweight action, so a brief confirmation reports the result without interrupting the next task.",
      "The result requires no later action or memory, so a persistent alert gives it unnecessary importance.",
      "The action is already complete and needs no decision, so a modal adds an unnecessary interruption."
    ]
  },
  "notification": {
    "zh": [
      "结果发生在原操作之后且需要后续处理，保留通知能让用户回来找到具体文件。",
      "用户已经离开原页面，短暂反馈很可能完全看不到，也无法稍后找到下载入口。",
      "导出结果不需要打断当前任务；强制立即处理会让后台任务反过来阻塞用户。"
    ],
    "en": [
      "The result occurs after the original action and needs follow-up, so a retained notification lets users find the exact file later.",
      "The user already left that page, so brief feedback may never be seen and provides no later download path.",
      "Export completion does not block the current task. Forced handling turns a background task into an interruption."
    ]
  },
  "modal": {
    "zh": [
      "对。独立、短暂且需要专注的任务适合弹窗；内容很长或多步时应进入完整页面。",
      "内联编辑并非不能用，但把表单插到页面顶部会打断当前位置；这项短任务更适合在原页面上方集中完成。",
      "独立页面适合更长、更复杂的地址管理；这里只修改当前订单地址，跳走会增加返回和重新定位成本。"
    ],
    "en": [
      "Correct. A separate, brief task needing focus fits a modal; long or multi-step work belongs on a full page.",
      "Frequent interruption adds burden; simple guidance does not need a modal layer.",
      "Navigation should remain predictable and returnable, not trap site paths in a dialog."
    ]
  },
  "drawer": {
    "zh": [
      "抽屉能容纳较完整的表单，同时保留订单上下文和关闭后的列表位置。",
      "确认弹窗适合短而聚焦的决定，完整地址表单会显得拥挤并遮住更多上下文。",
      "独立页面能完成编辑，但会丢失题目要求保留的订单内容和原列表位置。"
    ],
    "en": [
      "A drawer has room for the form while preserving order context and the list position after closing.",
      "A confirmation modal suits a short decision; a full address form becomes cramped and hides more context.",
      "A separate page can edit the address, but it loses the requested order context and list position."
    ]
  },
  "popconfirm": {
    "zh": [
      "对。单个、可逆但有后果的即时动作适合就近确认。",
      "完整弹窗会让一个简单的就近判断变得过重。",
      "可恢复不等于没有影响；用户仍需要在执行前确认对象和结果。"
    ],
    "en": [
      "Correct. A single, reversible but consequential immediate action fits nearby confirmation.",
      "A full dialog makes a simple nearby decision unnecessarily heavy.",
      "Reversible does not mean consequence-free; people still need to confirm the target and result."
    ]
  },
  "popover": {
    "zh": [
      "内容比一句提示丰富但仍很轻量，Popover 能保持触发关系，也能覆盖键盘和触屏。",
      "Tooltip 不适合承载多项资料和交互，触屏设备也没有稳定的悬停入口。",
      "弹窗能放下内容，但对少量资料和两个快捷操作来说层级过重，打断当前列表浏览。"
    ],
    "en": [
      "The content is richer than a hint but still lightweight. A popover preserves context and supports keyboard and touch.",
      "Tooltips do not suit multiple details and interactive actions, and touch devices have no reliable hover entry.",
      "A modal can hold the content but is too heavy for a few details and two shortcuts, interrupting list browsing."
    ]
  },
  "tooltip": {
    "zh": [
      "短说明用于补充图标含义，且鼠标与键盘都能触发，符合文字提示的用途。",
      "题目只需要解释图标，不需要包含选择和操作的交互式浮层。",
      "用户需要在操作前识别按钮，点击后的消息无法帮助他提前理解图标。"
    ],
    "en": [
      "A short label explains the icon, and supporting both mouse and keyboard makes the hint reachable.",
      "The task only needs to explain the icon, not an interactive layer with choices and actions.",
      "People need to understand the control before acting, so a message after the click arrives too late."
    ]
  },
  "progress": {
    "zh": [
      "对。任务总量和已完成量可测时，进度条能让用户判断还要等多久。",
      "已有真实完成量时，Spinner 丢掉了用户可以利用的信息。",
      "既然系统知道真实上传量，就应优先展示真实进度；网速变化会让估算倒计时反复跳动或提前结束。"
    ],
    "en": [
      "Correct. When total and completed work are measurable, progress lets people judge the wait.",
      "When real completion exists, a Spinner loses useful information.",
      "It presents incomplete transfer as success and can lead to data-loss assumptions."
    ]
  },
  "skeleton": {
    "zh": [
      "骨架提前占住真实内容的位置，结构相近时能减少内容出现后的布局变化。",
      "请求尚未结束，空状态会错误地告诉用户没有数据，并在结果到达时改变含义。",
      "系统不知道完成比例，伪造百分比可能提前走完，也无法稳定文章列表的布局。"
    ],
    "en": [
      "A skeleton that resembles the incoming structure reserves space and reduces movement when real content appears.",
      "The request is still pending, so an empty state incorrectly claims that no data exists.",
      "The system does not know completion percentage, and fake progress does not reserve the article layout."
    ]
  },
  "result": {
    "zh": [
      "支付是完整流程终点，集中展示结果和后续入口能让用户确认任务是否真正完成。",
      "短暂提示没有订单依据和后续入口，用户也可能来不及确认支付对应哪笔订单。",
      "空购物车只说明当前没有商品，不能证明支付结果，也无法解释失败或处理中状态。"
    ],
    "en": [
      "Payment ends a complete flow, so one result state lets users verify completion and find the next path.",
      "Brief feedback provides no order evidence or follow-up and may disappear before users know which payment it refers to.",
      "An empty cart only describes current contents. It does not prove payment outcome or explain failure and processing states."
    ]
  },
  "spinner": {
    "zh": [
      "对。短暂且无法估算完成度的等待适合 Spinner，并要说明正在做什么。",
      "没有真实完成度时，虚假进度会误导用户。",
      "加载提示离触发位置太远，而且按钮仍能重复点击。短暂保存应在按钮附近明确状态并暂时阻止重复提交。"
    ],
    "en": [
      "Correct. A brief wait with unknown completion suits a Spinner and should say what is happening.",
      "Without real completion, fake progress misleads people.",
      "People cannot tell whether the click worked and may submit again."
    ]
  },
  "menu": {
    "zh": [
      "这些项目会带用户前往不同页面；分组和当前态能同时解决查找入口与确认位置。",
      "标签页适合同一对象的少量并列内容；用它承载整套后台页面会让层级和地址变得模糊。",
      "下拉菜单节省空间，却隐藏了主要页面和当前位置；8 个稳定入口更适合分组持续展示。"
    ],
    "en": [
      "These items navigate to separate pages, and grouping plus a current state supports both discovery and orientation.",
      "Tabs fit a small set of peer views for one object, not the primary hierarchy of an entire admin product.",
      "A dropdown saves space but hides the main destinations and current location that should remain visible."
    ]
  },
  "breadcrumb": {
    "zh": [
      "这条路径表达页面在内容层级中的位置，并让用户直接返回任一上级。",
      "访问历史会随进入方式变化，不能稳定说明当前页面属于哪个项目和层级。",
      "这些页面是层级位置，不是必须按顺序完成的流程；步骤状态会暗示不存在的任务进度。"
    ],
    "en": [
      "The path communicates the page's stable place in the hierarchy and provides direct navigation to each parent.",
      "Visit history changes with the route taken and does not reliably explain where the current page belongs.",
      "These are locations in a hierarchy, not stages of a required process, so completion states are misleading."
    ]
  },
  "pagination": {
    "zh": [
      "稳定页码适合定位和返回大量记录；写入网址后，同一筛选结果还能分享和复现。",
      "连续加载适合随意浏览，但很难准确分享第 4 页，也不利于返回原来的日志位置。",
      "标签页用于少量并列类别，不是大量结果的页码；数量增长后会迅速挤满导航。"
    ],
    "en": [
      "Stable pages support precise return and sharing, while URL parameters reproduce the same filtered result.",
      "Continuous loading supports casual browsing but makes page 4 difficult to share or revisit precisely.",
      "Tabs represent a small set of peer categories, not thousands of sequential result pages."
    ]
  },
  "steps": {
    "zh": [
      "对。步骤条表达多步流程的位置和进展，不替代每步自己的表单校验。",
      "结账步骤有顺序和完成条件，任意跳过会破坏流程。",
      "“第 2/4 步”只能说明数量，用户仍不知道前后分别是什么，也无法快速确认哪些步骤已经完成。"
    ],
    "en": [
      "Correct. Steps express position and progress in a multi-step flow; they do not replace validation inside each form.",
      "Checkout stages have order and completion conditions; arbitrary skipping breaks the flow.",
      "A waiting state does not communicate flow position or remaining stages."
    ]
  },
  "dropdown": {
    "zh": [
      "对。与同一对象相关的次要动作可以放进菜单，但不能只靠图标让人猜。",
      "图标含义常有歧义，尤其是低频或有风险的动作。",
      "右键菜单可以作为补充，但不能作为唯一入口；触屏和不熟悉右键的用户很难发现这些操作。"
    ],
    "en": [
      "Correct. Related secondary commands can share a menu, but should not rely on guessed icons.",
      "Icons are often ambiguous, especially for infrequent or risky actions.",
      "These are immediate commands on the current row, not a persistent field value."
    ]
  },
  "anchor": {
    "zh": [
      "锚点直接定位同一页面的内容，高亮还能保持目录与阅读位置同步。",
      "标签会把连续文档拆成互斥状态，用户无法自然滚动阅读全文或使用页内地址定位。",
      "回到顶部不能直接到达目标章节，也没有说明当前阅读位置，长文档查找仍然费力。"
    ],
    "en": [
      "Anchors locate content within the same page, while highlighting keeps the directory synchronized with reading position.",
      "Tabs split a continuous document into exclusive states, preventing natural reading and addressable in-page locations.",
      "Returning to the top does not directly reach a target or communicate current position, so navigation remains costly."
    ]
  },
  "back-top": {
    "zh": [
      "按钮只在长距离返回有价值时出现，避让现有操作还能保证两个入口都可点击。",
      "短页面没有返回需求，常驻按钮会增加噪声并占用有限的手机操作区域。",
      "提高层级只决定谁盖住谁，不能让被遮挡的入口继续可见和可用。"
    ],
    "en": [
      "It appears only when long-distance return is useful, and collision avoidance keeps both controls usable.",
      "Short pages have no return need, so a persistent button adds noise and consumes limited mobile action space.",
      "Layer order only chooses which control covers the other; it does not keep both entries visible and usable."
    ]
  },
  "skip-link": {
    "zh": [
      "对。跳过导航链接让重复使用键盘的人直接越过每页都一样的内容。",
      "移出 Tab 顺序会让键盘用户无法使用导航。正确做法是保留导航，同时提供可主动跳过重复内容的入口。",
      "自动跳转会打断正常导航；应由键盘用户在需要时主动选择。"
    ],
    "en": [
      "Correct. A skip link lets repeated keyboard users bypass content that is the same on every page.",
      "Hiding main removes the page’s core information for everyone.",
      "Automatic movement interrupts normal navigation; people should choose it when needed."
    ]
  },
  "search": {
    "zh": [
      "对。目标是从用户输入的词找到候选，不是先指定一个固定分类条件。",
      "状态不能代表“预算”这个词出现在哪里，会遗漏仍在进行中的相关项目。",
      "排序只能改变查看顺序，不能定位关键词；相关项目也可能很久没有更新，人工翻页容易漏掉。"
    ],
    "en": [
      "Correct. The goal is to find candidates from a person's words, not to choose a fixed category condition first.",
      "Status cannot represent where “budget” appears and would miss relevant in-progress projects.",
      "Charts compare data; they do not locate specific content by keyword."
    ]
  },
  "hero": {
    "zh": [
      "标题、说明、行动和画面共同服务于首要理解，用户能判断产品是否相关并继续。",
      "画面可能醒目，但新访客无法从首屏判断产品负责什么，也不知道是否值得继续。",
      "信息都重要不等于都属于首屏；过多并列内容会冲淡最主要的价值和行动。"
    ],
    "en": [
      "The heading, support copy, action, and visual serve one primary understanding so visitors can judge relevance and continue.",
      "The composition may be striking, but new visitors cannot tell what the product does or whether to continue.",
      "Important content does not all belong in the hero. Too many parallel messages dilute the primary value and action."
    ]
  },
  "cta": {
    "zh": [
      "主行动直接说明点击结果，层级和必要条件还能减少访客在关键一步的犹豫。",
      "同一视觉区域里多个主目标会相互竞争，用户反而更难识别页面希望他完成什么。",
      "“提交”没有说明将开始试用、查看信息还是联系销售，用户点击前无法预期结果。"
    ],
    "en": [
      "The primary action names its outcome, while hierarchy and relevant conditions reduce hesitation at the key step.",
      "Multiple primary goals compete within one visual region, making the intended next step harder to identify.",
      "Submit does not say whether it starts a trial, reveals information, or contacts sales, so the outcome is unclear beforehand."
    ]
  },
  "user-voice": {
    "zh": [
      "具体经历和可核实背景构成用户原声的可信度，展示范围也应服从真实授权。",
      "未经证据支持的放大会改变客户原意，不能再作为真实使用结果展示。",
      "匿名评价可以使用，虚构身份却会把隐私处理变成不存在的可验证背书。"
    ],
    "en": [
      "A specific experience and verifiable context create credibility, while display scope must follow actual permission.",
      "Unsupported amplification changes the customer's meaning and cannot be presented as a real usage result.",
      "Anonymous feedback can be valid, but invented identity turns privacy treatment into a false verifiable endorsement."
    ]
  },
  "header": {
    "zh": [
      "页头继续承担身份和主要入口，移动端按优先级收纳能避免把每个元素强行压小。",
      "内容虽然挤回一行，却会降低阅读和点击准确性，也没有建立移动端信息优先级。",
      "用户会失去当前网站身份和返回首页的稳定入口，页头的基本职责没有完成。"
    ],
    "en": [
      "The header preserves identity and primary access, while prioritization avoids shrinking every control beyond usability.",
      "It may fit, but readability and click accuracy decline, and no mobile information priority is established.",
      "Users lose the site identity and stable home path, leaving a basic header responsibility unmet."
    ]
  },
  "logo": {
    "zh": [
      "对。Logo 可以有适配变体，保持品牌识别的同时给导航留下空间；不应直接删除品牌或改成工具栏图标。",
      "尺寸变小但文字不可读时，品牌识别已经失败；应切换到合适的紧凑变体。",
      "菜单图标表达展开导航的动作，不能替代品牌身份入口。"
    ],
    "en": [
      "Correct. Logo variants can adapt to space while preserving recognition; do not delete the brand or turn it into a toolbar icon.",
      "If the text becomes unreadable, brand recognition has already failed; switch to an appropriate compact variant.",
      "A menu icon communicates the action of opening navigation and cannot replace the brand identity entry."
    ]
  },
  "navbar": {
    "zh": [
      "这些是跨页面的核心目的地，持续可见的导航栏能提供稳定入口和位置提示。",
      "页签用于同一页面或对象内的平级内容，不适合承担全站主要目的地。",
      "桌面空间充足时隐藏所有核心入口会增加访问步骤，也削弱当前位置提示。"
    ],
    "en": [
      "These are major cross-page destinations, so a persistent navbar provides stable access and location.",
      "Tabs organize peer content within one page or object, not the site's main destinations.",
      "Hiding every core destination despite available space adds steps and weakens location awareness."
    ]
  },
  "footer": {
    "zh": [
      "页脚适合集中补充信息，影响决定的规则则应在用户行动前就能看到。",
      "机械重复会形成难以扫描的链接堆，页脚应围绕结尾阶段的补充需求组织。",
      "退款限制影响购买判断，藏在页面底部会让用户在行动前无法得到关键信息。"
    ],
    "en": [
      "The footer consolidates supplementary information, while decision-critical terms remain visible before action.",
      "Mechanical repetition creates an unscannable link pile instead of serving needs at the end of the page.",
      "A refund limit changes the purchase decision, so hiding it at the bottom withholds key information before action."
    ]
  },
  "faq": {
    "zh": [
      "真实问题对应实际疑虑，先给结论能快速解答，条件和链接帮助用户继续处理。",
      "自问自答的宣传没有解决客服反复收到的具体疑问，会降低 FAQ 的可信度。",
      "FAQ 可以补充细节，但影响购买决定的限制不能只等待用户主动展开寻找。"
    ],
    "en": [
      "Real questions address actual concerns, a conclusion answers quickly, and conditions plus links support follow-up.",
      "Promotional self-questioning does not resolve the concrete issues repeatedly reaching support and weakens trust.",
      "FAQ can add detail, but a condition that affects purchase should not depend on users discovering a hidden answer."
    ]
  },
  "pricing": {
    "zh": [
      "这些信息共同决定方案是否适合以及实际要付多少，用户能够在同一口径下比较。",
      "月均价方便比较，但隐藏本次总额会让用户无法在选择前判断真实支出。",
      "推荐标记会影响选择；没有真实依据时，它不能证明该方案更适合当前用户。"
    ],
    "en": [
      "Together these determine fit and actual payment, allowing each plan to be compared on the same basis.",
      "A monthly equivalent aids comparison, but hiding the charged total prevents users from judging real cost before selection.",
      "Recommendations influence choice. Without evidence, the badge cannot show that the plan fits the current user."
    ]
  },
  "social-proof": {
    "zh": [
      "社会证明的价值来自外部可信依据，授权和统计说明让访客知道证据代表什么。",
      "未经授权的标识不能作为可信证据，先展示还会带来品牌和事实风险。",
      "无法说明统计对象、时间和来源的数字不能被核验，醒目反而会放大可信度问题。"
    ],
    "en": [
      "Social proof derives value from credible external evidence. Permission and measurement notes explain what that evidence represents.",
      "Unauthorized marks cannot serve as trustworthy evidence, and publishing first creates brand and factual risk.",
      "A number without audience, time, or source cannot be verified, and prominence amplifies the credibility problem."
    ]
  },
  "top-nav-layout": {
    "zh": [
      "少量一级入口适合持续放在顶部，主要内容可以在完整宽度下保持清楚阅读。",
      "侧栏更适合层级较深或工具型导航，当前少量入口会长期占用不必要的阅读宽度。",
      "这些入口服务不同内容任务，强行合并会削弱独立网址、搜索和返回路径。"
    ],
    "en": [
      "A small set of primary destinations fits persistent top access while leaving the main content clear and wide.",
      "Sidebars fit deeper or tool-oriented navigation; these few entries would consume reading width without adding clarity.",
      "These serve different content tasks, and merging them weakens distinct URLs, search, and return paths."
    ]
  },
  "sidebar-layout": {
    "zh": [
      "稳定侧栏适合频繁访问的层级入口，弹性工作区和移动抽屉还能保留可用内容宽度。",
      "大量分组入口会失去层级和整体可见性，横向滚动也让导航位置难以预测。",
      "手机剩余宽度不足以完成主要任务，侧栏应转成按需打开的导航层。"
    ],
    "en": [
      "A stable sidebar fits frequent hierarchical access, while flexible content and a mobile drawer preserve working width.",
      "Many grouped destinations lose hierarchy and overview, while horizontal scrolling makes locations unpredictable.",
      "Mobile content loses the width required for primary tasks, so navigation should become an on-demand layer."
    ]
  },
  "single-page-layout": {
    "zh": [
      "所有内容服务同一决策，连续页面能按顺序读完，页内导航也能避免在长页面中找不到位置。",
      "这些是独立的工具任务，不属于同一阅读主线，合并会让导航和状态管理混乱。",
      "内容本来组成一个连续决策，过度拆页会打断上下文和阅读节奏。"
    ],
    "en": [
      "All content supports one decision, so a continuous page keeps one reading order while in-page navigation keeps people oriented on a long page.",
      "Those are separate tool tasks rather than one reading path, so merging them confuses navigation and state.",
      "The content forms one continuous decision, and excessive page breaks interrupt context and reading rhythm."
    ]
  },
  "doc-layout": {
    "zh": [
      "三栏分别解决跨页、阅读和页内定位，响应式收起还能保证正文始终优先。",
      "目录和大纲不应与正文同等占宽，窄屏强保三栏会让主要阅读区域无法使用。",
      "两种导航范围混在一起会失去职责边界，用户难以分清跳转到新页面还是当前章节。"
    ],
    "en": [
      "The columns handle cross-page access, reading, and in-page location separately, while collapse keeps content primary.",
      "Navigation and outline do not deserve equal reading width, and three mobile columns make the article unusable.",
      "Mixing navigation scopes removes the boundary between opening another page and jumping within the current one."
    ]
  },
  "card-grid-layout": {
    "zh": [
      "最小卡宽保护内容结构，自动列数和统一 gap 能在不同容器中保持稳定扫描。",
      "固定列数忽略内容所需的最小宽度，标题、图片和操作最终会拥挤或溢出。",
      "网格仍然存在，但同类信息不再对齐，用户难以快速比较和连续浏览。"
    ],
    "en": [
      "Minimum width protects card structure, while automatic columns and one gap preserve scanning across containers.",
      "A fixed count ignores content's minimum width, eventually crowding or overflowing titles, images, and actions.",
      "The grid remains, but comparable information no longer aligns, weakening scanning and comparison."
    ]
  },
  "centered-layout": {
    "zh": [
      "稳定行宽减少视线横向移动，居中窄栏让阅读任务在宽屏上仍然集中。",
      "字号变化不能解决行长随视口无限增长的问题，宽屏阅读仍需长距离回扫。",
      "每行起点不一致会进一步降低长文阅读效率，也没有控制单行长度。"
    ],
    "en": [
      "Stable line length reduces horizontal eye movement, and a centered narrow column keeps reading focused on wide screens.",
      "Type size does not stop line length growing with the viewport, so wide-screen return sweeps remain long.",
      "Variable line starts make long-form reading harder and still do not constrain line length."
    ]
  },
  "masonry-layout": {
    "zh": [
      "补位消除了整行留白；视觉顺序会按列交错，必须在桌面和手机上确认顺序仍然可以接受。",
      "统一裁切能得到整齐的行列，但会切掉作品画面；以图为主的展示墙上，裁切损失大于留白。",
      "紧凑只是目标的一半；补位后第 4 张可能排到第 3 张上方，手机收成单列还会再变一次顺序。"
    ],
    "en": [
      "Packing removes row gaps; the visual order interleaves across columns, so confirm it stays acceptable on desktop and phone.",
      "Uniform cropping gives tidy rows but cuts into the artwork; on an image-led wall the crop costs more than the gaps.",
      "Compactness is only half the goal; after packing, card 4 can sit above card 3, and a single phone column reorders again."
    ]
  },
  "split-screen-layout": {
    "zh": [
      "上下排列保住可读宽度；表单是用户打开登录页要完成的任务，放在前面。",
      "等比缩小会把输入框和按钮压到难以操作，手机端需要重新排列而不是缩放桌面布局。",
      "品牌区在新访客首次访问时承担建立信任的任务；应先尝试上下重排，确认可省再删。"
    ],
    "en": [
      "Stacking restores readable width; the form is the task visitors came to complete, so it leads.",
      "Proportional shrinking crushes inputs and buttons; mobile needs rearrangement, not a scaled-down desktop layout.",
      "The brand area builds trust for first-time visitors; try restacking first and remove it only when it is proven dispensable."
    ]
  },
  "responsive-design": {
    "zh": [
      "对。响应式先保证当前任务能完成，再决定是否保留所有桌面排列。",
      "比例缩小会使文字和触控目标难用，不能保证手机上的任务可完成。",
      "横向滑动会隐藏后面的商品，也增加逐项比较成本。常规商品列表应先减少列数，保证内容和购买操作可见。"
    ],
    "en": [
      "Correct. Responsive work preserves the ability to complete the current task before preserving every desktop arrangement.",
      "Scaling makes text and touch targets unusable and does not ensure a mobile task can be completed.",
      "That removes information and actions needed to buy rather than reorganizing the layout."
    ]
  },
  "space": {
    "zh": [
      "完全相同的距离无法说明谁属于一组，用户仍可能把标签看成下一项的说明。",
      "较近表示关联，较远表示分组结束；复用固定档位后，同类关系也会保持一致。",
      "文字内容和字体变化后，手工空格会失效；间距应由布局规则表达，而不是写进内容。"
    ],
    "en": [
      "Equal distances do not reveal which label belongs to which field, so the grouping remains ambiguous.",
      "A smaller gap signals association, while a larger gap marks a new group. Reusable spacing steps keep this relationship consistent.",
      "Manual whitespace breaks when copy or fonts change. Layout rules should express spacing relationships."
    ]
  },
  "margin": {
    "zh": [
      "问题发生在两个组件之间，外边距或父级 gap 能改变外部关系而不破坏内部留白。",
      "内边距只会扩大内容与卡片边框的距离，卡片外边界仍然彼此贴近。",
      "空元素把视觉间距变成额外内容，响应式变化和统一维护都会更困难。"
    ],
    "en": [
      "The problem is between components, so margin or parent gap changes their external relationship without disturbing internal space.",
      "Padding only changes content-to-border distance. The cards' outer edges remain just as close.",
      "A spacer turns visual distance into extra content and becomes harder to maintain across responsive layouts."
    ]
  },
  "padding": {
    "zh": [
      "Padding 同时拉开文字与边框并扩大按钮自身的点击区域，不改变它和外部元素的关系。",
      "Margin 会改变按钮与外界的距离，却不会让文字离边框更远，也不会扩大点击区域。",
      "行高主要控制文字行框，不能独立建立稳定的左右留白，也不等于完整的按钮内边距。"
    ],
    "en": [
      "Padding separates text from the border and expands the button's own hit area without changing external relationships.",
      "Margin changes external distance but does not move text away from the border or enlarge the clickable area.",
      "Line-height controls the text line box and cannot independently create reliable horizontal space or complete button padding."
    ]
  },
  "flex": {
    "zh": [
      "按钮脱离正常排列后，标题或按钮数量变化容易重叠，垂直对齐也要反复手调。",
      "这是沿一条主轴排列的关系；Flex 能让两组内容自然分居两端，并统一垂直对齐。",
      "固定距离只适配当前文字和按钮数量，内容变化后不能继续保持两端关系。"
    ],
    "en": [
      "Removing actions from normal flow makes overlap likely when the title or action count changes.",
      "This is a one-axis relationship. Flex keeps the two groups at opposite ends and aligns them vertically.",
      "Fixed distances only fit the current content and stop preserving the relationship when text or actions change."
    ]
  },
  "grid": {
    "zh": [
      "逐项计算会把布局绑在当前数量和宽度上，容器变化时容易出现空洞或溢出。",
      "任务同时涉及行和列；网格轨道能统一管理列宽、间距，并按可用空间重新排布。",
      "Flex 可以换行，但固定三等分还要额外计算间距和窄屏列数，二维轨道更直接。"
    ],
    "en": [
      "Manual calculations bind the layout to the current count and width, causing gaps or overflow when the container changes.",
      "The task coordinates rows and columns. Grid tracks manage width, gaps, and rearrangement from the available space.",
      "Flex can wrap, but fixed thirds still require gap calculations and separate rules for narrower column counts."
    ]
  },
  "z-index": {
    "zh": [
      "更大的数字仍受父级层叠上下文和裁切范围限制，不能让子元素越过这些边界。",
      "菜单被裁掉通常不只是数值大小问题；要先找到限制它的父级边界，再决定浮层放置方式。",
      "整体抬高可能压住其他浮层，却没有解除卡片自身的裁切，也会让全局层级更混乱。"
    ],
    "en": [
      "A larger number remains constrained by parent stacking contexts and clipping boundaries.",
      "Clipping is usually not a number problem. Find the parent boundary first, then choose the correct layer placement.",
      "Raising the whole card can cover other overlays without removing the card's own clipping behavior."
    ]
  },
  "sticky": {
    "zh": [
      "Sticky 需要对应轴的偏移，并受最近滚动祖先和包含范围限制，这些条件决定它能否吸附。",
      "Fixed 脱离表格和滚动面板，可能遮挡全页内容，也不再受表格边界约束。",
      "层级只能处理重叠顺序，不能补上 sticky 的偏移、滚动容器或可滚动距离。"
    ],
    "en": [
      "Sticky needs an offset on its axis and is constrained by its nearest scroll ancestor and containing range.",
      "Fixed leaves the table and scroll panel, may cover page content, and no longer respects table boundaries.",
      "Layer order handles overlap but cannot supply the missing offset, scrolling container, or scrolling distance."
    ]
  },
  "position": {
    "zh": [
      "父卡片成为明确参照后，角标偏移会相对卡片计算，并随卡片整体移动。",
      "Fixed 相对视口且脱离卡片，滚动或卡片换行后角标不会继续跟随目标。",
      "没有建立预期参照时，角标可能相对更远的包含块定位，页面变化后容易偏离卡片。"
    ],
    "en": [
      "Once the parent card is the reference, badge offsets are calculated from it and move with the whole card.",
      "Fixed positioning follows the viewport rather than the card, so scrolling and wrapping separate badge from target.",
      "Without the intended reference, the badge may position against a distant containing block and drift as layout changes."
    ]
  },
  "centering": {
    "zh": [
      "父级对齐不依赖空状态自身尺寸，内容变高、容器变宽时仍能保持双轴居中。",
      "固定偏移只匹配当前尺寸，语言、视口或内容高度变化后中心位置会失准。",
      "固定坐标没有补偿元素自身宽高，也不能跟随容器尺寸变化保持真正居中。"
    ],
    "en": [
      "Parent alignment does not depend on the empty state's own size, so it remains centered as content and container change.",
      "Fixed offsets only fit the current dimensions and drift when language, viewport, or content height changes.",
      "Fixed coordinates do not compensate for the element's own dimensions or adapt to its container."
    ]
  },
  "box-model": {
    "zh": [
      "对。卡片实际占用的空间可能超过内容宽度，先看每层尺寸最能解释两列为何排不下。",
      "把宽度改小可能暂时不溢出，但没有解释尺寸为什么超出。应先确认盒模型和 `box-sizing`，再决定宽度。",
      "隐藏溢出只会遮住问题，卡片内容仍可能被裁切；应先找出宽度、内边距和边框怎样共同占用空间。"
    ],
    "en": [
      "Correct. A card's actual space may exceed its content width, so inspecting its layers best explains why two columns no longer fit.",
      "Text length can create another issue, but the shared change here is the padding added to every card.",
      "CORS governs cross-origin reads, not CSS size calculation."
    ]
  },
  "overflow": {
    "zh": [
      "对。先确认哪一层发生纵向溢出，再按内容用途选择增高或滚动，才能保证底部按钮可达。",
      "被父容器裁掉的内容通常不会因为提高自身层级重新出现；应先检查边界、高度和 overflow。",
      "真实内容长度还会变化，删内容只绕过了这一次，不能证明卡片能承受最长内容。"
    ],
    "en": [
      "Correct. Identify the vertical overflow layer first, then choose growth or scrolling so the bottom action stays reachable.",
      "Content clipped by a parent normally does not reappear merely because its own stacking level increases. Inspect the boundary, height, and overflow first.",
      "Real content length changes. Removing content only avoids this instance and does not prove the card handles the longest case."
    ]
  },
  "typography": {
    "zh": [
      "不同文字承担不同责任；稳定的字号、字重和对比度能让用户先看到重点，又不会漏掉警告。",
      "所有内容权重相同后，标题和警告反而失去区别，用户仍然找不到阅读顺序。",
      "标题会更突出，但必须阅读的警告仍然难以看清；弱化辅助信息不能牺牲可读性。"
    ],
    "en": [
      "Each text role has a different job. Consistent size, weight, and contrast reveal the reading order without hiding the warning.",
      "When everything has equal emphasis, headings and warnings lose distinction and the reading order remains unclear.",
      "The title becomes clearer, but required warning text remains difficult to read. Supporting text still needs sufficient legibility."
    ]
  },
  "serif-sans": {
    "zh": [
      "字体风格只有在语言覆盖、字号、字重和行高都可用时才成立，fallback 也应纳入系统。",
      "中文回退不受设计控制，双语页面可能出现字重、比例和气质明显不一致。",
      "没有角色规则的混用会让同一层级失去一致性，也难以维护加载和回退。"
    ],
    "en": [
      "The style only works when coverage, size, weight, and line-height remain readable, and fallback is part of the system.",
      "Uncontrolled fallback can create visibly different weight, proportion, and tone across the bilingual page.",
      "Role-free mixing breaks hierarchy consistency and makes font loading and fallback difficult to maintain."
    ]
  },
  "text-truncate": {
    "zh": [
      "标题可以在有限列宽内缩短，但完整内容仍可访问，价格和状态则保留关键信息。",
      "价格和状态是完成判断所需的关键信息，截断后用户可能无法确认订单。",
      "省略号只说明内容被隐藏；没有全文出口时，用户永远无法获得缺失部分。"
    ],
    "en": [
      "The title can shorten in a limited column while remaining accessible, and decision-critical price and status stay complete.",
      "Price and status are required for the order judgment, and hiding them can prevent confirmation.",
      "The ellipsis only signals hidden content. Without an outlet, users can never access the missing part."
    ]
  },
  "divider": {
    "zh": [
      "留白承担主要层级，少量分割线只补充分组变化，页面不会被切成许多小块。",
      "更多更醒目的线条会继续强调每一行，而不是帮助用户识别三组主要关系。",
      "粗线会抢过标题和内容，分组可以清楚但视觉权重明显过度。"
    ],
    "en": [
      "Whitespace carries the hierarchy and a few dividers clarify group changes without slicing the page into fragments.",
      "More prominent lines continue emphasizing individual rows rather than the three important groups.",
      "Heavy rules compete with headings and content, giving the boundary more visual weight than it needs."
    ]
  },
  "border-radius": {
    "zh": [
      "角色化档位减少任意数值，同类组件一致，不同角色仍可根据尺寸保持区分。",
      "局部都合理不代表系统一致，新增组件还会继续产生难以维护的数值。",
      "50% 会让长方形形成椭圆或过度圆化，不能作为所有组件的通用档位。"
    ],
    "en": [
      "Role tokens remove arbitrary values, align peers, and still let different component sizes remain distinct.",
      "Local balance does not create system consistency, and every new component adds another value to maintain.",
      "Fifty percent turns rectangles into ellipses or excessive rounding and cannot serve every role."
    ]
  },
  "shadow": {
    "zh": [
      "阴影差异对应界面层级，统一方向又让这些层级像来自同一个视觉系统。",
      "每个元素都浮起会失去相对层级，页面同时产生大量互相竞争的边界。",
      "文字阴影会降低字形清晰度，对比度应通过前景和背景颜色解决。"
    ],
    "en": [
      "Shadow differences map to interface elevation, while consistent direction makes the layers belong to one system.",
      "When everything floats, relative hierarchy disappears and many competing boundaries fill the page.",
      "Text shadow reduces glyph clarity; foreground and background colors should establish readable contrast."
    ]
  },
  "opacity": {
    "zh": [
      "半透明颜色只影响背景层，子内容仍维持原有对比度和点击可见性。",
      "Opacity 会同时影响子元素，文字和按钮也会失去清晰度，无法满足当前限制。",
      "透明为零不等于移除，元素仍可能挡住页面并接收键盘焦点。"
    ],
    "en": [
      "A translucent color affects only the background layer, preserving content contrast and visible interaction.",
      "Opacity affects descendants too, reducing the clarity of text and buttons against the requirement.",
      "Zero opacity does not remove the element; it may still block the page and receive keyboard focus."
    ]
  },
  "gradient": {
    "zh": [
      "渐变每个位置都可能成为文字背景，只有检查完整区域才能保证标题持续可读。",
      "更强的颜色变化会进一步干扰正文，不能替代前景与各区域的对比度检查。",
      "重复重点效果会削弱 Hero 的主次，也把对比度风险扩散到更多内容。"
    ],
    "en": [
      "Every gradient position can sit behind the heading, so the entire text region must preserve contrast.",
      "Stronger color variation further competes with copy and cannot replace contrast checks across the background.",
      "Repeating a focal effect weakens hierarchy and spreads the same contrast risk to more content."
    ]
  },
  "corner-feel": {
    "zh": [
      "圆角感受来自整套角色关系，少量规则能形成一致气质，也保留必要层级。",
      "同一显著圆角会抹平组件角色，长方形内容还可能变成不合适的胶囊或椭圆。",
      "逐项修补会继续扩大规则数量，下一次新增组件仍无法知道该使用哪个档位。"
    ],
    "en": [
      "Corner feel emerges from role relationships, so a small system creates coherence while retaining necessary hierarchy.",
      "One strong radius erases component roles and may turn rectangular content into inappropriate pills or ellipses.",
      "One-off fixes continue expanding the rule set and leave future components without a clear choice."
    ]
  },
  "backdrop-blur": {
    "zh": [
      "透明底让背后内容参与模糊，克制范围和纯色回退还能兼顾性能与可读性。",
      "不透明背景挡住后方画面，再大的背景模糊也无法形成可见毛玻璃。",
      "大面积多层模糊会增加渲染负担，也会让正文和状态失去清晰边界。"
    ],
    "en": [
      "Transparency exposes content to the backdrop filter, while limited scope and fallback protect performance and readability.",
      "An opaque surface hides the scene behind it, so increasing backdrop blur cannot produce visible glass.",
      "Large layered blur increases rendering cost and removes clear boundaries from body content and states."
    ]
  },
  "dark-mode": {
    "zh": [
      "对。深色模式是整套界面状态，关键操作和反馈都必须继续清楚。",
      "背景更黑不会自动让边界、提示和焦点可辨认，反而可能降低可读性。",
      "统一白边可能让输入框可见，却抹掉普通、错误和焦点状态的差异；这些状态需要分别检查对比度。"
    ],
    "en": [
      "Correct. Dark mode is a full interface state, so key actions and feedback must remain clear.",
      "A darker background does not automatically make borders, feedback, and focus discernible and may reduce readability.",
      "Errors remain feedback needed to complete a task; deleting them does not solve contrast."
    ]
  },
  "design-token": {
    "zh": [
      "对。共同设计决定有一个来源，改品牌色时不会遗漏分散写死的值。",
      "短期可行，但相同蓝色可能有不同含义，也容易漏掉某个组件或状态。",
      "令牌应承载可共享的设计决定；每个实例各有一份不会带来一致性。"
    ],
    "en": [
      "Correct. The shared design decision has one source, so a brand-color change does not miss scattered hard-coded values.",
      "This can work briefly, but the same blue may mean different things and it is easy to miss a component or state.",
      "Tokens should carry reusable design decisions; one isolated token per instance does not create consistency."
    ]
  },
  "contrast": {
    "zh": [
      "对。深色模式最常见的翻车就是背景变黑了、文字还是原来那档灰，对比度掉到门槛以下。用比值说话，AI 才知道改到什么程度。",
      "字号变大只是让字更大，颜色差别没变的话还是费眼；先查对比度。",
      "换色不等于达标：亮色在黑底上可能够，在灰底上可能不够，还是要按比值检查。"
    ],
    "en": [
      "Correct. The background turned black while the text kept its gray, dropping below the threshold. The ratio gives the AI a concrete target.",
      "Larger type stays hard to read if the color difference is unchanged; check contrast first.",
      "A different color is not automatically compliant—bright may pass on black and fail on gray; verify by ratio."
    ]
  },
  "visual-hierarchy": {
    "zh": [
      "对。让每层拉开差距（大小、颜色、底色），视线自然顺着「标题→说明→按钮」走，重点自己浮出来。",
      "再加一个同样大的元素只会多一个争抢视线的东西，乱上加乱。",
      "全部缩小后彼此的差距没变，依然分不出主次；挤和乱是两个问题。"
    ],
    "en": [
      "Correct. Widen the gaps (size, color, fill) so the eye travels title → description → button, and the focus emerges on its own.",
      "Another same-sized element just joins the fight for attention, adding clutter.",
      "Uniformly smaller text keeps the same ratios—still no order. Crowded and unordered are different problems."
    ]
  },
  "transition": {
    "zh": [
      "变化只有明确的起点和终点；限定属性能避免无关样式被动画，并尊重用户的动态偏好。",
      "all 会让未来新增的颜色、尺寸等属性意外参与动画，一秒也会拖慢即时操作反馈。",
      "关键帧能实现运动，但两套方向要重复维护；已有起点和终点时，过渡更直接。"
    ],
    "en": [
      "The change has clear start and end states. Limiting the property avoids animating unrelated styles and respects motion preferences.",
      "The all keyword can animate future color or size changes unintentionally, and one second slows direct feedback.",
      "Keyframes can move the thumb, but two directions duplicate maintenance when a transition already connects the current and next states."
    ]
  },
  "animation": {
    "zh": [
      "自主循环适合 Animation，界面状态决定播放范围，减弱方案保留信息而不强迫持续运动。",
      "Transition 需要属性状态发生变化才能运行，不能独立定义连续循环。",
      "完成后持续运动不再表达加载状态，只会分散注意力并违背减少动态效果偏好。"
    ],
    "en": [
      "Autonomous looping suits Animation, state defines its lifetime, and the reduced version preserves information without forced motion.",
      "A transition requires a property state change and cannot independently define a continuous loop.",
      "Motion after completion no longer communicates loading, distracts attention, and ignores reduced-motion preference."
    ]
  },
  "easing": {
    "zh": [
      "进入、退出的任务方向不同，按语义测试并复用曲线能兼顾响应感与一致性。",
      "匀速适合持续旋转或进度，对界面位移常显得机械，也没有区分进入和离开。",
      "局部可能顺眼，但随意曲线会让同类交互产生不同节奏，难以维护和预测。"
    ],
    "en": [
      "Entry and exit serve different directions, so semantic testing plus reuse balances responsiveness and consistency.",
      "Constant speed fits rotation or progress but often feels mechanical for interface movement and ignores direction.",
      "Each may look acceptable alone, but arbitrary curves give peer interactions inconsistent and unpredictable rhythm."
    ]
  },
  "spring": {
    "zh": [
      "对。Spring 适合直接操作后的回位，但回弹要服务于位置变化，并提供稳定的减弱方案。",
      "持续回弹会让状态无法稳定，也会分散用户对后续任务的注意。",
      "不同对象的距离、语义和风险不同；强迫所有元素回弹会削弱层级并干扰严肃操作。"
    ],
    "en": [
      "Correct. A spring fits settling after direct manipulation, but the bounce must serve the position change and have a stable reduced alternative.",
      "Continuous bouncing prevents the state from settling and distracts from the next task.",
      "Objects differ in distance, meaning, and risk; forcing all of them to bounce weakens hierarchy and disrupts serious actions."
    ]
  },
  "fade": {
    "zh": [
      "Fade 负责视觉变化，交互和最终隐藏状态仍要同步处理，透明元素才不会继续挡路。",
      "透明度为零并不移除元素，它仍可能覆盖按钮、占据空间或被键盘聚焦。",
      "Toast 适合轻淡化，但抽屉等层级变化可能需要位移说明方向，不能用一个效果覆盖所有场景。"
    ],
    "en": [
      "Fade owns the visual change, while interaction and final hidden state must synchronize so transparency stops blocking content.",
      "Zero opacity does not remove an element; it may still cover buttons, occupy space, or receive keyboard focus.",
      "A toast suits light fading, but drawers may need movement to explain direction and should not share one universal effect."
    ]
  },
  "hover": {
    "zh": [
      "速度不会解决触屏没有悬停、键盘用户不经过鼠标的问题，入口仍然不可发现。",
      "悬停可以强化鼠标反馈，但关键操作还要能通过键盘聚焦和触屏方式发现并执行。",
      "移除入口会让手机用户无法完成相同任务；应提供适合触屏的可见菜单或操作。"
    ],
    "en": [
      "Speed does not help touch devices without hover or keyboard users who never move a pointer over the card.",
      "Hover can reinforce mouse interaction, but an important action also needs discoverable keyboard and touch paths.",
      "Removing the action prevents mobile users from completing the same task instead of providing a touch-friendly entry."
    ]
  },
  "active": {
    "zh": [
      "短暂变化直接回应输入动作，恢复后也不会被误认为持续选中或禁用状态。",
      "持续样式表达的是切换或选中，不是从按下到松开的瞬时反馈。",
      "悬停只提示指针所在位置，不能确认已经按下；键盘激活时也可能没有这层提示。"
    ],
    "en": [
      "A brief change responds directly to input and restores before it can be mistaken for selection or disablement.",
      "Persistent styling expresses a toggle or selection rather than the moment from press to release.",
      "Hover only shows where the pointer is; it does not confirm a press and may not appear during keyboard activation."
    ]
  },
  "focus": {
    "zh": [
      "对。焦点指示告诉键盘用户当前位置，不能只在鼠标悬停时出现。",
      "看不见焦点会让键盘操作失去位置，无法判断下一次 Enter 会触发什么。",
      "键盘操作不依赖鼠标位置，hover 不能替代 focus。"
    ],
    "en": [
      "Correct. Focus indication tells keyboard users their position and cannot be replaced by hover.",
      "Invisible focus removes position from keyboard operation and hides what Enter will trigger.",
      "Keyboard operation does not depend on pointer position; hover cannot replace focus."
    ]
  },
  "drag": {
    "zh": [
      "视觉反馈能说明拖拽状态，却没有给无法稳定拖动的人提供完成排序的方式。",
      "拖动过程有清楚反馈，替代按钮又让键盘和精细操作困难的用户完成同一任务。",
      "扩大热区会和选择文字、点击链接等操作冲突，也没有解决键盘排序问题。"
    ],
    "en": [
      "The shadow explains drag state but provides no way to reorder for someone who cannot drag reliably.",
      "Drag feedback clarifies the gesture, while alternative actions let keyboard and motor-impaired users complete the same task.",
      "A full-card drag target conflicts with selecting text and using links, and it still lacks keyboard reordering."
    ]
  },
  "disabled": {
    "zh": [
      "原生禁用按钮通常不能聚焦，触屏也没有稳定悬停；很多用户仍然看不到原因。",
      "原因和解决方法都靠近问题来源，键盘与触屏用户也能看见何时满足提交条件。",
      "视觉上像禁用、行为却仍可执行，会产生冲突反馈，也可能提交不完整数据。"
    ],
    "en": [
      "Native disabled buttons are often not focusable, and touch has no reliable hover, so the reason remains inaccessible.",
      "The cause and remedy appear where the problem occurs, and every input method can see when submission becomes available.",
      "The visual state says unavailable while the behavior still runs, creating conflicting feedback and incomplete submissions."
    ]
  },
  "cursor": {
    "zh": [
      "指针与操作类型一致能提前提示行为，但控件本身仍需表达可拖、可输入或禁用。",
      "Pointer 通常暗示点击，无法区分拖动、文本输入和不可用状态，反而制造错误预期。",
      "触屏没有鼠标变化，指针也只是辅助线索，不能替代控件的可见角色和状态。"
    ],
    "en": [
      "Role-matched cursors preview behavior, while the controls themselves still communicate drag, input, and disabled state.",
      "Pointer usually implies clicking and cannot distinguish dragging, text input, and unavailable actions.",
      "Touch has no cursor change, and a cursor is only a secondary cue rather than a visible role or state."
    ]
  },
  "selection": {
    "zh": [
      "选区必须清楚可见，正文复制是正常能力；禁选应限制在确实会误触的操作区域。",
      "品牌一致不能替代选区可读性，低对比会让用户无法确认自己选中了什么。",
      "正文并非拖拽控件，全面禁选会阻止复制、引用和辅助阅读等正常任务。"
    ],
    "en": [
      "Selection must remain visible and body copying is normal; prevention belongs only where selection interferes with an operation.",
      "Brand consistency cannot replace selection readability; low contrast hides what users selected.",
      "Body copy is not a drag control, and global prevention blocks copying, quoting, and assistive reading tasks."
    ]
  },
  "domain": {
    "zh": [
      "托管平台知道域名还不够；DNS 仍可能指向注册商停放页，访问者不会到达新网站。",
      "域名只是名称；还需要可访问的网站服务，并通过 DNS 把名称连接到该服务。",
      "转发可能打开网站，却不会让正式域名直接承载页面；地址会变化，也绕过了正常绑定。"
    ],
    "en": [
      "The host may know the domain while DNS still points visitors to the registrar's parking page.",
      "A domain is only a name. A reachable host must serve the site, and DNS must connect the name to that service.",
      "A redirect may open the site but changes the visible address and does not properly bind the custom domain."
    ]
  },
  "dns": {
    "zh": [
      "旧缓存尚未过期时反复修改会产生更多版本，让不同地点的结果更难判断。",
      "先确认新记录本身正确，再区分配置错误与旧缓存未过期，能避免无意义的连续修改。",
      "浏览器缓存只是其中一层；其他地区的递归解析器仍可能保留旧记录，单点结果不能代表全部。"
    ],
    "en": [
      "Repeated edits while old caches remain create more versions and make regional results harder to diagnose.",
      "Confirming the new record first separates a configuration error from an old cached answer and avoids unnecessary changes.",
      "Browser cache is only one layer. Recursive resolvers elsewhere may still hold the previous record."
    ]
  },
  "url": {
    "zh": [
      "内存状态不会随链接传给同事，对方打开后只能看到默认订单列表。",
      "路径标明页面，查询参数保存筛选和页码；完整网址能让另一台设备恢复同一结果。",
      "筛选条件可以分享，但登录令牌属于敏感凭证；放进网址可能进入历史、日志和聊天记录。"
    ],
    "en": [
      "In-memory state does not travel with the link, so the teammate opens the default order list.",
      "The path identifies the page and query parameters preserve filters and position for another device.",
      "Filters may be shareable, but a login token is sensitive and can leak through history, logs, and messages."
    ]
  },
  "http": {
    "zh": [
      "HTTP 记录了浏览器实际发送和服务器实际返回的内容；400 表示请求未按约定被接受，应先读证据。",
      "400 已经说明服务器收到请求但不接受；忽略具体内容会丢掉字段或格式错误等可修复线索。",
      "保存操作应遵循接口约定；随意换方法会改变请求语义，还没有解决原请求为何被拒绝。"
    ],
    "en": [
      "HTTP exposes the actual request and response. A 400 means the request was not accepted, so the evidence comes first.",
      "A 400 means the server received but rejected the request. Ignoring details loses actionable field or format evidence.",
      "A save should follow the API contract. Changing the method alters semantics without explaining the rejection."
    ]
  },
  "cookie": {
    "zh": [
      "对。要沿着设置、保存、携带这三步检查，才能判断服务器为何无法在下一次请求识别会话。",
      "前端标记只能改变页面显示，不能证明服务器认可会话，也不能代替请求中携带的凭证。",
      "用户记录存在不代表这次浏览器请求带有可识别的会话；还要查看 Set-Cookie 和后续 Cookie 头。"
    ],
    "en": [
      "Correct. Follow the set, store, and send steps to learn why the server cannot recognize the session on the next request.",
      "A frontend flag changes display only. It does not prove that the server accepts a session or replace a request credential.",
      "An existing user record does not mean this browser request carries a recognizable session. Check Set-Cookie and the later Cookie header too."
    ]
  },
  "https": {
    "zh": [
      "主页面和子资源都要通过受保护连接加载，混合内容会被警告或直接拦截。",
      "网页文案不能改变传输方式，也无法阻止浏览器拦截不安全资源。",
      "HTTPS 保护设备与域名之间的连接，不证明经营者、内容或交易本身可信。"
    ],
    "en": [
      "The page and its subresources need protected connections; mixed content may be warned about or blocked.",
      "Page copy cannot change transport security or stop the browser from blocking insecure resources.",
      "HTTPS protects the connection to a domain; it does not verify the operator, content, or transaction."
    ]
  },
  "cdn": {
    "zh": [
      "CDN 缩短静态资源路径，版本化或 Purge 则解决节点继续命中旧缓存的问题。",
      "同一地址配合更长缓存会让旧副本保留更久，而且无法确定各节点何时一致。",
      "源站更新不代表边缘节点已经刷新，仍要检查版本、缓存状态和实际地区结果。"
    ],
    "en": [
      "The CDN shortens delivery for static assets, while versioning or purge prevents nodes from serving an old cache.",
      "A longer cache on the same URL preserves old copies for longer and provides no reliable update point.",
      "A fresh origin does not prove edge caches have refreshed; verify versions, cache state, and real regions."
    ]
  },
  "port": {
    "zh": [
      "对。localhost 是同一台电脑，端口才决定你连到哪项服务。",
      "当前项目已经明确监听 3001；重启不能保证另一个占用 3000 的服务消失。",
      "这会绕开而不是解释冲突，也可能抢占另一个服务正在使用的端口；应先确认每个端口对应谁。"
    ],
    "en": [
      "Correct. localhost is the same device; the port decides which service you reach.",
      "The current project already reports port 3001. Restarting it does not guarantee that the other service using 3000 disappears.",
      "That avoids rather than explains the conflict and may take a port another service uses. First identify which service owns each port."
    ]
  },
  "redirect": {
    "zh": [
      "对。重定向会让浏览器继续访问新 URL，地址栏和内容都应反映新的目标。",
      "这更接近服务器重写：内容可以变化，但地址栏没有被带到新的 URL。",
      "页面内部切换不会把旧 URL 迁移到新 URL，也不能满足地址栏显示新地址的要求。"
    ],
    "en": [
      "Correct. A redirect makes the browser continue to the new URL, so both the address bar and content should show the new target.",
      "That is closer to a server rewrite: the content changes, but the browser is not taken to the new URL.",
      "An in-page state change does not migrate the old URL or make the address bar show the new target."
    ]
  },
  "json": {
    "zh": [
      "页面读取路径必须与收到的对象和数组层级一致；继续使用前还要确认字段是否齐全。",
      "标准 JSON 字符串使用双引号，而且换引号不会把 items 字段变成 list。",
      "页面不会崩溃，但真实数据也被丢掉；应先对齐数据结构，再决定缺失时的降级状态。"
    ],
    "en": [
      "The access path must match the received object and array levels, and required item fields still need validation.",
      "Standard JSON uses double quotes, and changing quote style would not rename the items field to list.",
      "The crash disappears but valid data is discarded. Align the structure before choosing an empty-state fallback."
    ]
  },
  "cors": {
    "zh": [
      "对。两个端口构成不同源，浏览器需要从 API 响应里看到对应的允许规则。",
      "`no-cors` 通常只会得到网页脚本无法读取的不透明响应，不能让原来的数据读取继续工作。",
      "CORS 要允许发起请求的网页来源，这里是 3000；4000 是被请求的 API 地址。"
    ],
    "en": [
      "Correct. The two ports are different origins, and the browser needs matching permission in the API response.",
      "`no-cors` normally produces an opaque response that page script cannot read, so the original data flow still does not work.",
      "CORS must allow the page origin that initiates the request, which is 3000 here; 4000 is the API destination."
    ]
  },
  "data-validation": {
    "zh": [
      "对。前端提示帮助用户更快改正，服务端校验才是不能绕过的最终判断。",
      "浏览器限制可被绕过，也可能被脚本直接调用接口。",
      "错误数据进入系统后会污染后续流程，应该在写入前拒绝或明确修正。"
    ],
    "en": [
      "Correct. Browser feedback helps people fix input; server validation is the final check that cannot be bypassed.",
      "Browser restrictions can be bypassed or skipped by a direct API call.",
      "Invalid data should be rejected or corrected before it enters later workflows."
    ]
  },
  "enqueue": {
    "zh": [
      "对。任务 ID 说明可以追踪这项工作，但入队成功不代表转码结果已经产生。",
      "写入队列只表示任务已经被接收；消费者何时开始处理、最终是否成功，都要另行确认。",
      "这会把耗时处理重新塞回上传请求，失去入队后立即返回的好处，也更容易超时。"
    ],
    "en": [
      "Correct. The task ID makes the work trackable, but enqueueing does not mean transcoding has finished.",
      "Writing to the queue only means the task was accepted. You still need to check when processing starts and whether it succeeds.",
      "That puts the long operation back inside the upload request, making timeouts more likely."
    ]
  },
  "idempotency": {
    "zh": [
      "对。稳定编号识别同一个业务动作，原子领取避免两个并发请求都开始处理，保存结果还能让重试得到一致反馈。",
      "你不能控制网络丢包和平台重试；没有服务端去重时，重复回调仍可能重复改变订单。",
      "到达时间不是业务身份，重复回调可能在不同时间到达，仍会被错误处理两次。"
    ],
    "en": [
      "Correct. The stable id identifies one business action, the atomic claim prevents two concurrent handlers from starting it, and the saved result gives retries a consistent response.",
      "You cannot control packet loss or provider retries; without server-side deduplication, the order can still change twice.",
      "Arrival time is not business identity; the same callback can arrive later and still be processed twice."
    ]
  },
  "message-consumer": {
    "zh": [
      "对。生产者成功发送只说明消息进入了队列，堆积还可能来自无人消费或消费处理不过来。",
      "重发会增加堆积，不能证明消费者已经收到或处理了消息。",
      "清空会丢掉尚未处理的任务，绕过了对消费者状态和失败原因的检查。"
    ],
    "en": [
      "Correct. Producer success only means the message entered the queue; buildup can come from no consumer or slow processing.",
      "Resending increases buildup and does not show that a consumer received or processed the messages.",
      "Clearing can discard unprocessed work and avoids checking the consumer or the failure cause."
    ]
  },
  "browser-storage": {
    "zh": [
      "对。订单需要跨设备、可能也需要客服或其他系统读取，不能只依赖当前浏览器。",
      "刷新仍在不表示能跨设备同步，也不能提供服务端的权限与可靠保存。",
      "页面状态通常在刷新或关闭后消失，不能代表已提交订单。"
    ],
    "en": [
      "Correct. Orders must work across devices and may need support staff or other systems, so the current browser cannot be the sole source.",
      "Surviving a refresh does not synchronize devices or provide server-side authorization and reliable persistence.",
      "Page state commonly disappears after refresh or close and cannot represent a submitted order."
    ]
  },
  "database-migration": {
    "zh": [
      "对。先兼容旧记录，再完成数据转换，最后增加约束；每一步都有可检查的结果。",
      "不对。重建生产表会删除现有记录，不是增加字段所需的迁移方案。",
      "不对。只在线上手改无法让其他环境复现，也没有进入项目的版本记录和审核流程。"
    ],
    "en": [
      "Correct. Keep old rows compatible, complete the data conversion, verify it, and only then enforce the constraint.",
      "Incorrect. Recreating the production table deletes existing records and is not a migration plan for adding one field.",
      "Incorrect. A production-only manual edit cannot be reproduced in other environments or reviewed through the project's versioned workflow."
    ]
  },
  "sql": {
    "zh": [
      "对。查询条件同时限定归属和状态，避免读取无关或他人的数据。",
      "数据已经被发到客户端，前端隐藏不能保护访问边界。",
      "即使行范围正确，也不应无必要地取回敏感或不用的字段。"
    ],
    "en": [
      "Correct. The query limits ownership and state so it does not read unrelated or other users’ data.",
      "The data is already sent to the client; hiding it there does not protect access.",
      "Even with correct rows, do not return sensitive or unused fields without need."
    ]
  },
  "transaction": {
    "zh": [
      "对。两次数据库修改共享同一个提交边界，扣库存失败时不会留下未完成的订单。",
      "这仍然是两次独立写入，在补写取消记录期间可能暴露错误状态，不能提供同一个提交边界。",
      "这样页面会把未完成的订单当作成功显示给用户，而且仅记录日志并不能撤销已经写入的订单。"
    ],
    "en": [
      "Correct. Both database changes share the same commit boundary, so a failed deduction will not leave an incomplete order behind.",
      "These are still separate writes. Writing a cancellation record later can briefly expose an incorrect state and does not provide a shared commit boundary.",
      "The page would show an incomplete order as successful to the user, and logging the error does not undo the database change."
    ]
  },
  "database-write": {
    "zh": [
      "对。数据库记录能证明是否写入，刷新查询目标能证明页面是否读回了同一条数据。",
      "这只能改变当前页面，刷新后仍要依赖真实写入，无法证明数据库有新值。",
      "延迟不能证明写入是否完成，也不能找出查询错记录、未提交或写入失败的原因。"
    ],
    "en": [
      "Correct. The database record proves whether the write happened, and the refresh target proves the page requested that same data.",
      "That changes only the current page; refresh still depends on a real write and proves nothing about the database.",
      "A delay proves neither that writing finished nor whether the read used the wrong record or an uncommitted value."
    ]
  },
  "postgresql": {
    "zh": [
      "外键使所有写入路径都必须满足这条引用规则，无效用户编号会被数据库拒绝。",
      "页面筛选不能约束其他程序的写入，数据库里仍可能出现无效引用。",
      "事后清理期间无效订单已经存在，不能保证每次写入都满足关系约束。"
    ],
    "en": [
      "Every write path must satisfy the reference rule; nonexistent user IDs are rejected.",
      "Page options cannot constrain writes made by other programs.",
      "Invalid orders exist until cleanup; this does not enforce the relationship on each write."
    ]
  },
  "backend-framework": {
    "zh": [
      "对。框架负责统一入口和公共处理，新增业务应沿用项目已有结构，并用真实请求验证结果。",
      "同一项目并行维护两套路由和错误处理会增加排错成本，这个需求没有证明需要第二套框架。",
      "固定成功结果不能证明注册发生，也会让前端把未完成的业务误认为可用。"
    ],
    "en": [
      "Correct. The framework supplies consistent entry and shared handling; new business logic should follow that structure and be verified with real requests.",
      "Maintaining two routing and error systems increases debugging cost, and this request does not justify a second framework.",
      "A fixed success response does not prove an account was created and makes unfinished business logic appear usable."
    ]
  },
  "route": {
    "zh": [
      "方法和路径一起表达要处理的资源与动作，两条端点还能分别说明输入、成功和失败状态。",
      "通用入口隐藏了资源和操作，文档、权限、错误处理和单独测试都会变得更难。",
      "GET 通常用于读取，而且请求体没有通用语义；创建应按接口约定使用能表达写入的方法。"
    ],
    "en": [
      "Method and path together express the resource and action, while each endpoint can define its own inputs and outcomes.",
      "A generic endpoint hides resources and actions, making documentation, permission checks, errors, and testing harder.",
      "GET normally reads data and has no generally defined request-body semantics. Creation needs a method that expresses a write."
    ]
  },
  "atomicity": {
    "zh": [
      "对。检查通过的请求才能完成扣减，另一个请求会明确失败，库存不会被卖成两份。",
      "两个请求可能都基于旧值写入，页面看似成功但会产生两张订单或错误库存。",
      "页面按钮状态不能限制另一个用户或重试请求，真正的并发保护必须在共享数据的一侧完成。"
    ],
    "en": [
      "Correct. Only a request that passes the check completes the deduction; the other fails clearly instead of creating a second sale.",
      "Both requests can write based on the stale value, producing two orders or an incorrect inventory result.",
      "A page button state cannot restrict another user or a retry; concurrency protection must be enforced where the shared data is updated."
    ]
  },
  "process": {
    "zh": [
      "对。独立进程有自己的运行环境，图片进程退出后可以单独重启并检查 Web 进程是否仍在响应。",
      "函数边界不会带来进程级资源隔离，未处理崩溃仍可能让同一进程退出。",
      "名称不会改变运行边界；要查看实际进程 ID、内存和生命周期。"
    ],
    "en": [
      "Correct. The image process can exit and restart independently while the web process is checked for continued service.",
      "A function boundary does not isolate process resources or lifecycle.",
      "A name does not create a runtime boundary; inspect PIDs, memory, and lifecycle."
    ]
  },
  "thread": {
    "zh": [
      "对。同一进程的线程共享内存，并发修改需要明确访问顺序和可观察结果。",
      "同一进程中的线程通常共享同一个 PID 对应的内存空间。",
      "更多竞争者会增加共享状态冲突，不会自动建立同步。"
    ],
    "en": [
      "Correct. Threads in one process share memory, so concurrent mutation needs an explicit order and evidence.",
      "Threads in one process normally share its memory and process identity.",
      "More competitors do not create synchronization and can increase conflicts."
    ]
  },
  "coroutine": {
    "zh": [
      "对。协程用明确暂停点重叠 I/O 等待，不要求每个任务创建新线程。",
      "协程可以在同一线程交替运行，不等于创建了新线程。",
      "协程本身不提供 CPU 并行，CPU 密集任务仍要考虑调度器和线程或进程资源。"
    ],
    "en": [
      "Correct. Explicit suspension overlaps I/O waits without requiring a new thread per task.",
      "Coroutines can alternate on one thread and do not imply new threads.",
      "Coroutines do not create CPU parallelism; scheduling and thread or process resources still matter."
    ]
  },
  "message-queue": {
    "zh": [
      "对。队列让通知与开票不必占用支付请求，但后台仍要处理失败、重试和最终状态。",
      "不对。这依然是同步阻塞，失去了消息队列异步缓冲和解耦的核心价值。",
      "不对。入队成功只是暂存，实际发送由后台消费者执行，入队不代表最终完成。"
    ],
    "en": [
      "Correct. The tasks no longer occupy the payment request, while workers still need failure, retry, and final-state handling.",
      "Incorrect. That remains synchronous blocking and defeats the purpose of async queueing.",
      "Incorrect. Enqueueing only stores the job; a background consumer must still execute it."
    ]
  },
  "side-effect": {
    "zh": [
      "对。预览和提交各自有清楚的触发点，能分别验收没有外部改变和产生一次订单。",
      "隐藏邮件没有消除副作用，预览仍在不断写记录，用户也无法判断何时产生订单数据。",
      "价格正确不代表没有写库或发信；必须验证预览没有额外改变，提交才有预期副作用。"
    ],
    "en": [
      "Correct. Each action has a clear trigger, so you can verify no change during preview and one order during submission.",
      "Hiding the email does not remove the effect; previews still create records and users cannot tell when order data appeared.",
      "A correct price does not prove that no record or email was created; both preview and submit effects must be checked."
    ]
  },
  "lock": {
    "zh": [
      "对。锁的作用范围要覆盖两个竞争者共同访问的资源，等待者取得锁后仍需基于新状态判断。",
      "不同实例的进程内锁彼此不可见，不能自动保护同一数据库记录。",
      "冲突已经发生；锁必须覆盖检查和修改共享资源的临界区。"
    ],
    "en": [
      "Correct. The lock scope covers the shared resource, and a waiter evaluates the new state after acquiring it.",
      "Separate in-process locks cannot see each other and do not protect one shared database record.",
      "The conflict has already happened; the lock must cover the check-and-update critical section."
    ]
  },
  "race-condition": {
    "zh": [
      "对。竞态依赖交错时序，重复并发运行和关联日志能还原结果为何偶发变化。",
      "串行运行绕开了竞争时序，一次正常也不能证明并发下稳定。",
      "隐藏表象不会改变共享状态或提供时序证据。"
    ],
    "en": [
      "Correct. A race depends on interleaving, so repeated concurrent runs and correlated logs reveal why outcomes vary.",
      "A serial run avoids the competing timing, and one success cannot prove concurrent stability.",
      "Hiding the symptom neither fixes shared state nor provides timing evidence."
    ]
  },
  "backpressure": {
    "zh": [
      "对。背压把下游过慢的反馈传回上游，让未完成工作量保持在可控范围。",
      "容量变大只能延后暴露问题，不能让上游感知下游已经处理不过来。",
      "这是固定限流的思路，不是根据下游反馈动态调整工作流。"
    ],
    "en": [
      "Correct. Backpressure sends the downstream slowdown back upstream and keeps unfinished work bounded.",
      "More capacity delays the symptom but does not tell the upstream that downstream is overloaded.",
      "That is fixed rate limiting, not adapting the flow from downstream feedback."
    ]
  },
  "lease": {
    "zh": [
      "对。到期决定何时可以接管；递增代次由真正接收写入的一方校验，才能挡住恢复后的旧实例。",
      "租约的意义就是让失联持有者最终失去持有权，永久等待会让任务无法恢复。",
      "短暂网络延迟不等于租约过期，立即接管可能让两个实例同时执行。"
    ],
    "en": [
      "Correct. Expiry permits takeover, while the monotonically increasing token lets the write target reject a recovered old holder.",
      "A lease lets an unreachable holder lose ownership eventually; waiting forever prevents recovery.",
      "A short network delay is not expiry; immediate takeover can run the job twice."
    ]
  },
  "distributed-system": {
    "zh": [
      "对。网络边界允许部分成功，必须把各节点的结果拼起来，才知道订单当前状态和下一步动作。",
      "不同服务之间的调用可能在网络中断时产生不同结果；一个服务成功不能直接证明另一个服务完成。",
      "线程数无法回答库存服务是否收到请求、处理到哪一步或响应是否在网络中丢失。"
    ],
    "en": [
      "Correct. A network boundary allows partial success, so the current order state and next action require evidence from each node.",
      "Separate service calls can end differently when the network fails; one service's success does not prove another completed.",
      "Thread count cannot show whether inventory received the request, processed it, or lost the response on the network."
    ]
  },
  "authentication": {
    "zh": [
      "对。身份认证回答“你是谁”；之后才能决定这个用户能看什么。",
      "头像是前端显示，不是服务端可验证的身份凭据。",
      "角色属于权限判断，前提是已经可靠地识别出用户。"
    ],
    "en": [
      "Correct. Authentication answers who the requester is before the system can decide what they may see.",
      "An avatar is browser display, not server-verifiable identity.",
      "A role is an authorization decision made after identity is established."
    ]
  },
  "authorization": {
    "zh": [
      "对。身份已知后，还要针对资源和动作判断是否允许。",
      "重新认证不能自动授予原本没有的项目权限。",
      "用户仍可直接构造请求，服务端必须执行权限检查。"
    ],
    "en": [
      "Correct. Once identity is known, permission must be checked for the resource and action.",
      "Re-authentication does not grant a project permission the person lacks.",
      "A request can still be constructed directly, so the server must check authorization."
    ]
  },
  "audit-log": {
    "zh": [
      "对。审计记录把一次安全相关操作的关键事实放在同一条可追查证据里。",
      "权限修改可能完全成功，不一定产生报错；报错日志也通常不会回答是谁主动执行了变更。",
      "请求量只能显示数量变化，不能关联具体操作者、目标权限和动作结果。"
    ],
    "en": [
      "Correct. An audit record puts the key facts of a security-relevant action into one traceable piece of evidence.",
      "A permission change can succeed without an error, and an error log usually does not identify who intentionally made the change.",
      "Request volume shows counts, not the actor, target permission, action, or result."
    ]
  },
  "entitlement": {
    "zh": [
      "日志已经定位到权益仍是 Free；刷新身份凭证不能证明权益记录已经更新。",
      "付款完成与权益生效有同步环节；检查这一环节能解释为什么服务端仍按 Free 拒绝。",
      "页面标签不能改变服务端记录，导出请求仍会按 Free 权益判断。"
    ],
    "en": [
      "The logs already identify stale entitlements. Renewed identity credentials do not prove that access records were updated.",
      "Payment and effective access are separated by synchronization; inspect that step to explain the Free decision.",
      "Changing a label does not change the server’s entitlement record."
    ]
  },
  "cache": {
    "zh": [
      "对。本机已更新而其他地区仍旧，范围指向本地之外的共享缓存层；要用外部请求和响应证据确认。",
      "localStorage 保存的是网页数据，不是通用的 HTTP 响应副本；而且本机已经更新，现象也超出了单个浏览器。",
      "源文件可能已经正确，重复修改会掩盖资源到底从哪里返回；应先检查共享缓存和响应头。"
    ],
    "en": [
      "Correct. A fresh local result but stale results elsewhere points beyond one browser, so verify the shared cache with external requests and response evidence.",
      "localStorage stores web data, not general HTTP response copies. The local browser is already fresh, and the symptom is wider than one browser.",
      "The source may already be correct. Re-editing hides where the resource came from; check shared caching and response headers first."
    ]
  },
  "seo": {
    "zh": [
      "对。访问者和搜索系统都会被带到相关的新内容，旧地址不会直接变成死路。",
      "旧链接的读者会得到错误页，相关信号和可用性都会受影响。",
      "首页未必回答原链接的需求。重定向应尽量对应真实替代内容。"
    ],
    "en": [
      "Correct. Visitors and search systems reach relevant replacement content instead of a dead end.",
      "People following old links get an error page, harming usability and related signals.",
      "The home page may not answer the need expressed by the old link. Redirects should match real replacement content when possible."
    ]
  },
  "canonical-url": {
    "zh": [
      "对。用户必须被带到新地址时，需要重定向并验证最终 URL；canonical 本身通常不会改变地址栏。",
      "Canonical 是代表版本提示，旧地址通常仍可访问；它不能单独满足自动迁移访问的要求。",
      "删除旧地址会造成 404，既没有把用户送到新内容，也没有保留旧链接的迁移关系。"
    ],
    "en": [
      "Correct. When visitors must reach a new address, use and verify a redirect; a canonical hint normally does not change the address bar.",
      "A canonical is a preferred-version hint, and the old URL usually remains accessible. It does not by itself migrate visitors.",
      "Deleting the old URL creates a 404 without sending visitors to the new content or preserving a migration relationship."
    ]
  },
  "xml-sitemap": {
    "zh": [
      "对。Sitemap 应帮助爬虫找到重要且可访问的 URL，不能靠列出错误地址把不存在的页面变出来。",
      "Sitemap 只提供发现线索，不创建资源，也不保证收录；404 地址反而给抓取带来错误信号。",
      "可见目录是信息架构或网站导航，不是 XML Sitemap 的替代物；这里仍要处理机器清单中的错误 URL。"
    ],
    "en": [
      "Correct. A sitemap should help crawlers find important reachable URLs; listing a broken address cannot create the missing page.",
      "A sitemap is a discovery hint, not a resource creator or an indexing guarantee. A 404 entry instead gives crawling an error signal.",
      "A visible directory is information architecture or site navigation, not a replacement for an XML sitemap. The broken machine URL still needs handling."
    ]
  },
  "robots-txt": {
    "zh": [
      "对。权限系统决定谁能访问数据；robots.txt 只给遵守规则的爬虫抓取建议，不能阻止知道 URL 的人打开页面。",
      "Disallow 不是门锁，普通用户和不遵守规则的程序仍可能请求该地址，敏感数据不能依靠它保护。",
      "隐藏链接只减少被发现的机会，不会检查请求者身份，也不能阻止直接访问已知地址。"
    ],
    "en": [
      "Correct. Permissions decide who can access data; robots.txt is a crawling suggestion for compliant crawlers and cannot block people who know the URL.",
      "Disallow is not a lock. People and non-compliant programs can still request the URL, so sensitive data cannot rely on it.",
      "Hiding a link only reduces discovery. It does not check identity or prevent direct access to a known URL."
    ]
  },
  "not-found-page": {
    "zh": [
      "对。资源不存在时，页面提示和 HTTP 状态都要表达同一个事实，返回入口再帮助用户恢复。",
      "这里没有一个已经结束的提交流程，重试操作也不能让不存在的文章出现；问题首先是资源和状态不匹配。",
      "无关地址被送到首页会丢失用户上下文，也掩盖了资源确实不存在的事实；只有有明确替代内容时才应重定向。"
    ],
    "en": [
      "Correct. The page message and HTTP status should describe the same missing resource, with a recovery path for the user.",
      "No completed submission flow exists here, and retrying cannot create a missing article. The first problem is the resource and status mismatch.",
      "Sending unrelated URLs to the home page loses context and hides that the resource is missing. Redirect only when a matching replacement exists."
    ]
  },
  "env-var": {
    "zh": [
      "对。密钥由运行环境提供，仓库只保留变量名和设置说明。",
      "发到浏览器的内容可以被查看，不能存放密钥。",
      "密钥可能已进入提交历史或构建产物，临时写入同样有泄露风险。"
    ],
    "en": [
      "Correct. The runtime supplies the secret; the repository keeps only its name and setup guidance.",
      "Anything shipped to the browser can be inspected and cannot hold a secret.",
      "It can enter history or a build artifact; temporary exposure is still exposure."
    ]
  },
  "deployment": {
    "zh": [
      "对。合并不等于上线；需要同时确认部署平台和真实用户入口。",
      "构建、部署、缓存或环境配置仍可能让生产停在旧版本。",
      "本地环境无法证明生产构建和发布结果。"
    ],
    "en": [
      "Correct. Merge is not release; verify both the platform and the real user entry point.",
      "Build, deployment, cache, or environment configuration can still leave production on an old version.",
      "Local behavior cannot prove the production build and release."
    ]
  },
  "web-hosting": {
    "zh": [
      "对。承载环境已经存在，旧版本说明发布动作或版本选择可能有问题；先查 Deployment 的输入和结果。",
      "已有承载环境时，新增 Hosting 不会说明为什么旧版本被提供；应先检查发布到哪个环境和哪个版本。",
      "域名和解析决定请求去哪里，不会自动把新版本发布进已有环境；版本问题仍要检查 Deployment。"
    ],
    "en": [
      "Correct. The hosting environment exists, so an old version points to the deployment input or result. Check which version was published where.",
      "An existing environment does not explain the old version. First check the target environment and the version used by the deployment.",
      "A domain and DNS direct requests to a destination, but they do not publish a new version into that environment. Check deployment instead."
    ]
  },
  "cd": {
    "zh": [
      "对。版本已经持续保持可发布，但“发到生产”的决定仍由人作出。",
      "测试环境自动部署不决定名称；关键是生产是否在门禁通过后自动发布。",
      "这里已把通过版本送到可发布状态并安排生产发布，范围超过 CI。"
    ],
    "en": [
      "Correct. The version stays continuously releasable, but a person still decides to release it to production.",
      "Automatic testing deployment does not decide the name; the key is whether production releases automatically after gates pass.",
      "A passing version is being made releasable and released, which goes beyond CI."
    ]
  },
  "staging": {
    "zh": [
      "对。它能验证接近生产的完整流程，又不会删除真实用户订单。",
      "破坏性操作会影响真实用户和数据，不能用它作为普通验收手段。",
      "本地外观不能证明部署后的配置和服务连接正确。"
    ],
    "en": [
      "Correct. It tests a production-like full flow without deleting a real customer order.",
      "A destructive action can affect real users and data and is not ordinary acceptance evidence.",
      "Local appearance does not prove deployed configuration and service connections are right."
    ]
  },
  "monitoring": {
    "zh": [
      "对。监控要把异常与可操作的运行事实关联，支持及时止损。",
      "较长时间的平均值可能稀释发布后的突增，也无法判断异常是否从当前版本开始。",
      "及时止损重要，但监控还要提供最基本的关联证据，否则可能采取错误动作并掩盖真正来源。"
    ],
    "en": [
      "Correct. Monitoring links anomalies to actionable runtime facts so impact can stop quickly.",
      "A longer average can hide a post-release spike and does not show whether the current version started it.",
      "Stopping impact matters, but monitoring should still provide basic correlation evidence so the team does not take the wrong action or hide the real source."
    ]
  },
  "rollback": {
    "zh": [
      "对。既要证明切换目标已运行，也要证明用户受影响的信号已恢复。",
      "命令成功不保证流量已经用到目标版本，也不保证异常已经消失。",
      "向前修复可以后续进行，但当前需要先证实影响已经被止住。"
    ],
    "en": [
      "Correct. Prove both that the target is running and that the user-impact signal recovered.",
      "A successful command does not guarantee traffic uses the target version or the anomaly disappeared.",
      "A forward fix can follow, but first prove the present impact has stopped."
    ]
  },
  "feature-flag": {
    "zh": [
      "对。开关能控制谁进入已部署的新路径，并快速停止这条路径。",
      "回滚影响整个版本，不能细致控制同一版本中谁看新功能。",
      "这会失去快速回到旧路径的能力，也不是渐进开放。"
    ],
    "en": [
      "Correct. A flag controls who enters an already-deployed new path and can stop that path quickly.",
      "Rollback affects a whole version and cannot finely control who sees one feature in it.",
      "That removes the ability to return quickly to the old path and is not gradual exposure."
    ]
  },
  "canary-release": {
    "zh": [
      "对。金丝雀已经提供了异常证据，应先限制影响并验证稳定版恢复。",
      "指标已经越过预设门槛，继续扩大只会让更多用户进入异常版本。",
      "部署成功只说明版本已经运行，不能推翻真实流量下的错误率证据。"
    ],
    "en": [
      "Correct. The canary produced failure evidence, so limit impact first and verify recovery on the stable version.",
      "The signal already crossed the agreed threshold; expanding would expose more people to the faulty release.",
      "A successful deployment only proves the version is running; it does not override error evidence from real traffic."
    ]
  },
  "blue-green-deployment": {
    "zh": [
      "对。应用流量能切回蓝色环境，不代表旧版还能读取已经变化的数据。",
      "蓝绿部署只提供环境和流量切换能力，不能自动保证数据结构兼容。",
      "过早删除蓝色环境会失去快速切回路径，也违背本次蓝绿部署的止损目标。"
    ],
    "en": [
      "Correct. Traffic can return to blue, but the old application may not understand data already changed by v2.",
      "Blue-green provides environments and traffic switching; it does not make schema changes automatically compatible.",
      "Deleting blue too early removes the quick return path and defeats the mitigation goal."
    ]
  },
  "serverless": {
    "zh": [
      "任务按请求触发且时间短，平台可托管运行环境；持久数据和密钥仍需使用合适服务。",
      "不同请求可能落到不同实例，实例也会释放，函数内存不能当作持久数据库。",
      "短时函数受执行时长和资源限制，长任务需要匹配的队列或计算服务。"
    ],
    "en": [
      "The task is brief and request-driven, so the platform can manage runtime while persistence and secrets use appropriate services.",
      "Requests may reach different instances and instances disappear, so function memory is not durable storage.",
      "Short functions have duration and resource limits; long jobs require suitable queues or compute services."
    ]
  },
  "server-log": {
    "zh": [
      "可搜索上下文能串起一次请求的关键步骤，错误堆栈则帮助定位真正失败位置。",
      "敏感信息会进入长期日志和更多访问范围，排错不能以泄露用户凭证为代价。",
      "提高级别不会增加动作、对象或原因，仍无法与客服提供的事件对应。"
    ],
    "en": [
      "Searchable context connects the steps of one request, and the stack helps locate the actual failure.",
      "Sensitive data would enter durable logs and broader access, making diagnosis itself a credential leak.",
      "A higher level adds no action, object, or cause and still cannot connect to the reported incident."
    ]
  },
  "circuit-breaker": {
    "zh": [
      "对。打开状态先隔离故障，半开状态用有限探测判断依赖是否恢复。",
      "无限重试会继续占用自己的资源；熔断器的作用正是停止把故障扩散到调用方。",
      "连续失败时立即关闭会重新放大故障，应该先打开并经过探测。"
    ],
    "en": [
      "Correct. Open isolates the failure; Half-Open uses limited probes to learn whether the dependency recovered.",
      "Unlimited retries consume caller resources; the breaker exists to stop the failure spreading.",
      "Closing immediately would amplify the failure again; probe recovery before returning to normal calls."
    ]
  },
  "single-instance": {
    "zh": [
      "对。单实例的可用性风险集中在唯一副本，但持久化数据是否保留要单独验证。",
      "单例模式是代码结构，不能改变运行环境中服务副本的数量或重启行为。",
      "进程内存通常会随实例停止而消失；恢复在线不能证明内存任务被保存。"
    ],
    "en": [
      "Correct. Availability risk is concentrated in the only replica, while data durability must be verified separately.",
      "The Singleton pattern is a code structure; it cannot change runtime replica count or restart behavior.",
      "Process memory normally disappears when the instance stops; recovery does not prove in-memory work was saved."
    ]
  },
  "multi-instance": {
    "zh": [
      "对。跳到另一个实例时，本地会话不可见是多实例常见问题；要把会话放到共享位置或采用可验证的无状态方案。",
      "增加副本只改变请求承接数量，不会让各实例自动看到彼此的本地会话。",
      "数据库备份不能证明会话在实例之间可见；登录状态的存放位置仍需单独检查。"
    ],
    "en": [
      "Correct. A local session is invisible after a request moves to another instance; use shared state or a verifiable stateless approach.",
      "More replicas change request capacity, not whether instances can see each other's local sessions.",
      "Backups do not prove sessions are visible across instances; the location of login state still needs inspection."
    ]
  },
  "user-story": {
    "zh": [
      "对。这句话说明了谁有需要、希望完成什么，以及这个能力带来的结果，可以继续讨论保存范围和验收条件。",
      "这是实现与界面清单。团队仍然不知道谁需要保存、为什么需要，也无法据此判断哪些方案合适。",
      "这只是功能名称和模糊评价，没有说明目标用户、使用目的，也没有给后续讨论提供明确边界。"
    ],
    "en": [
      "Correct. It names the user, goal, and value, giving the team a useful starting point for discussing scope and acceptance criteria.",
      "That is an implementation and interface list. It does not explain who needs the feature or why.",
      "That is only a feature label with a vague quality claim. It does not identify the user, goal, or value."
    ]
  },
  "use-case": {
    "zh": [
      "对。它围绕一个参与者目标，写出了触发条件、顾客动作、系统回应、成功结果和重要例外。",
      "这是用户故事，说明了用户、目标和原因，但没有展开系统交互、条件与例外。",
      "这是内部实现。用例应描述顾客与系统之间可观察的行为，不要求预先决定控制器、服务和数据表。"
    ],
    "en": [
      "Correct. It centers on one actor goal and includes the trigger, interaction, system response, successful result, and important exceptions.",
      "That is a user story. It states the user, goal, and reason without describing the interaction and exceptions.",
      "That is internal implementation. A use case describes observable behavior without choosing controllers, services, or tables."
    ]
  },
  "user-flow": {
    "zh": [
      "对。这张图围绕一个用户目标，包含起点、关键动作、决策分支、成功终点和失败后的恢复路径。",
      "这是 sitemap 的内容组织与导航结构，不能看出访客怎样完成一次预约。",
      "这是 wireframe 更关心的界面布局。没有动作顺序和分支，就无法检查完整的用户路径。"
    ],
    "en": [
      "Correct. It centers on one user goal and includes an entry, key actions, decisions, a successful endpoint, and recovery from failure.",
      "That is sitemap content organization and navigation structure. It does not show how a visitor completes a booking.",
      "That is closer to a wireframe’s interface layout. Without actions and branches, the complete user path cannot be checked."
    ]
  },
  "user-journey": {
    "zh": [
      "对。它跨越多个触点和时间阶段，并且把行动、想法、感受与证据放在一起。",
      "这更接近 User Flow，只覆盖产品内完成任务的动作和分支。",
      "旅程图可以记录感受，但必须区分证据、推断和待验证假设，不能替用户编造情绪。"
    ],
    "en": [
      "Correct. It spans time and touchpoints while connecting actions, thoughts, feelings, and evidence.",
      "That is closer to a user flow, which focuses on actions and decisions inside the product.",
      "A journey can include feelings, but it must separate evidence, inference, and assumptions."
    ]
  },
  "prd": {
    "zh": [
      "对。这组内容说明了为什么做、为谁做、做到哪里以及怎样判断有效，团队仍可在边界内讨论具体实现。",
      "这些内容主要属于路线图或项目计划，不能替代当前导出需求的用户问题、范围和成功标准。",
      "这把技术设计和线框细节当成了需求本身。团队仍不知道为什么这样做，也无法判断交付后是否解决了用户问题。"
    ],
    "en": [
      "Correct. This explains why the work matters, who it serves, its boundaries, and how to judge the result while leaving implementation choices open.",
      "That is primarily roadmap or project-planning information. It does not replace the user problem, scope, and success criteria for this export requirement.",
      "This mistakes technical design and wireframe detail for the requirement itself. The team still cannot tell why it is building this or whether it solved the problem."
    ]
  },
  "product-discovery": {
    "zh": [
      "对。现有证据支持的是更小的问题范围；下一步应据此缩小方案并继续验证，而不是自动批准全部功能。",
      "不对。证据只支持快速比较，不能顺带证明其他功能有价值；扩大范围会重新引入未经验证的假设。",
      "不对。用户已经展示了真实的手工比较行为。合理决定是收窄问题并继续验证，而不是忽略已有证据。"
    ],
    "en": [
      "Correct. The evidence supports a smaller problem scope, so the next test should narrow the solution rather than approve every proposed feature.",
      "Incorrect. Evidence for quick comparison does not validate the other features; expanding the scope adds untested assumptions.",
      "Incorrect. Users demonstrated real manual comparison behavior. Narrowing and testing again fits the evidence better."
    ]
  },
  "mvp": {
    "zh": [
      "对。真实付款直接检验付费意愿，人工交付则让团队不用先建设完整自动化系统；购买、使用和续费行为还能帮助判断价值是否持续。",
      "低质量和安全缺口会污染反馈并伤害用户，无法说明核心价值是否成立；“最小”不能省掉可信实验必需的条件。",
      "点赞表达的兴趣与真实付费行为不同。这种证据没有直接检验当前最关键的付费假设。"
    ],
    "en": [
      "Correct. An actual payment directly tests willingness to pay, while manual delivery avoids building the full automation system first. Purchase, usage, and renewal behavior also show whether the value lasts.",
      "Poor quality and safety gaps distort feedback and harm users. Being minimal does not remove conditions required for a trustworthy experiment.",
      "Likes show a different kind of interest from actual payment behavior, so this evidence does not directly test the key willingness-to-pay assumption."
    ]
  },
  "product-backlog": {
    "zh": [
      "对。列表顺序可以根据风险和证据调整；近期条目需要更清楚，较远的想法可以先保留必要信息。",
      "产品待办列表是动态的。新风险和证据出现后仍保持旧顺序，会让列表失去决策作用。",
      "进入待办列表只表示该项被记录和考虑，不等于已经承诺范围或日期。"
    ],
    "en": [
      "Correct. The order can change with risk and evidence. Near-term items need more clarity than distant ideas.",
      "A product backlog is dynamic. Keeping the old order after new risk appears removes its decision value.",
      "Being in the backlog means an item is considered, not that its scope or release date is committed."
    ]
  },
  "product-roadmap": {
    "zh": [
      "对。它用时间范围表达目标、方向和预期成果，较远阶段仍保留调整空间。",
      "这是任务排期，主要回答谁在什么时候完成什么，不是产品路线图的战略视角。",
      "没有方向与取舍的功能清单不能说明产品准备怎样演进。"
    ],
    "en": [
      "Correct. It uses time horizons to communicate goals, direction, and expected outcomes while leaving distant work adjustable.",
      "That is task scheduling. It answers who does what and when, not how the product should evolve.",
      "An unordered wish list cannot communicate product direction or tradeoffs."
    ]
  },
  "gantt-chart": {
    "zh": [
      "对。这组信息包含具体任务、持续时间、依赖和里程碑，可以放到时间轴上检查排期。",
      "这是产品目标和方向，适合路线图；它还没有形成可以安排起止时间的具体任务。",
      "虚构日期会让依赖和风险失真。缺少估算时应明确标注待确认。"
    ],
    "en": [
      "Correct. It contains tasks, durations, dependencies, and a milestone that can be placed on a timeline.",
      "That is a product goal suited to a roadmap, not yet a set of schedulable tasks.",
      "Invented dates distort dependencies and risk. Unknown estimates should remain visibly unresolved."
    ]
  },
  "wireframe": {
    "zh": [
      "对。线框图阶段只定结构，位置确认了再上视觉，要改的也最少。",
      "直接上视觉后，改一个区块位置往往连着改颜色、间距和字体；结构没定时这样改最贵。",
      "内容固然要先定，但区块位置也需要你确认——「看着办」容易做出和你想法偏差很大的结构。"
    ],
    "en": [
      "Correct. The wireframe stage fixes structure only; visuals come after positions are confirmed, with the least to redo.",
      "With visuals already applied, moving one block drags colors, spacing, and fonts along—costliest time to restructure.",
      "Content does come first, but block positions need your confirmation too—\"however you like\" invites big drift."
    ]
  },
  "moodboard": {
    "zh": [
      "对。图比形容词准——喜欢的划定方向，不喜欢的划清边界，AI 照着做偏差最小。方向问题在拼图阶段就能解决，不用等到做完再改。",
      "「高级」「简洁」没有共同标准，你和 AI 各猜各的，第五轮还会偏。",
      "碰运气出的五版都建立在你没说清的方向上，挑中也只是巧合。"
    ],
    "en": [
      "Correct. Likes set the direction, the crossed-out one draws the boundary. Solving direction at the collage stage avoids redoing finished work.",
      "\"Premium\" and \"minimal\" have no shared definition; round five will drift the same way.",
      "All five build on an unstated direction; picking a hit would be luck, not alignment."
    ]
  },
  "heuristic-evaluation": {
    "zh": [
      "对。事实、原则、影响和复查路径都明确，团队可以复现问题，也能判断修复是否有效。",
      "不对。主观评价无法定位或复现问题，也不能判断改动后是否真的改善。",
      "不对。先写清观察和影响，再提出对应建议；只改样式不能证明状态反馈问题得到解决。"
    ],
    "en": [
      "Correct. The observation, principle, impact, and recheck path make the issue reproducible and the fix verifiable.",
      "Incorrect. A subjective reaction cannot be reproduced or used to verify that the change improved the task.",
      "Incorrect. The observation and impact must come before a recommendation; a color change does not prove status feedback works."
    ]
  },
  "ab-test": {
    "zh": [
      "对。同期随机分组减少了流量和时间差异，预设主要指标、保护指标和停止条件也避免根据中途波动挑结果。",
      "流量来源、活动和季节都可能变化，前后差异不能只归因于页面版本。",
      "短期随机波动可能制造领先。应在开始前约定分析窗口和停止规则。"
    ],
    "en": [
      "Correct. Concurrent random assignment reduces traffic and time differences, while predefined metrics and stopping rules limit result picking.",
      "Traffic sources, campaigns, and seasonality may change, so the difference cannot be attributed only to the page.",
      "Short-term random variation can create a temporary lead. Set the analysis window and stopping rule before launch."
    ]
  },
  "conversion-funnel": {
    "zh": [
      "对。这一步从 620 人降到 310 人，步骤转化率为 50%，是当前最大流失；先核对数据口径，再调查页面、规则和用户原因。",
      "最终人数不能说明主要阻碍发生在哪里，中间步骤正是漏斗提供的定位线索。",
      "漏斗说明哪里流失，不会自动解释为什么。原因仍需数据检查和用户证据。"
    ],
    "en": [
      "Correct. This step falls from 620 to 310, a 50% step conversion and the largest loss. Verify the data before investigating interface, rules, and user reasons.",
      "The final count cannot locate the main obstacle. Intermediate steps are the funnel's diagnostic value.",
      "A funnel shows where loss happens, not why. The cause still needs data checks and user evidence."
    ]
  },
  "crud": {
    "zh": [
      "对。导出和统计是建立在已有数据之上的扩展功能。四种基本操作只管每条记录本身的进出和修改。",
      "这属于更新（Update）：修改已有记录里的信息。",
      "这属于删除（Delete）：移除一条已有记录。"
    ],
    "en": [
      "Correct. Exporting and reporting are extra features built on top of the data. The four basic operations only manage each record itself.",
      "That is Update: modifying information in an existing record.",
      "That is Delete: removing an existing record."
    ]
  },
  "field": {
    "zh": [
      "对。金额是每条记录里单独的一项信息，是字段；客户名、日期、状态也是字段。",
      "按钮是操作入口，不是被记录的信息。字段指信息本身，不指控件。",
      "表单是填写一组字段的界面；字段是表单里的单项信息。"
    ],
    "en": [
      "Correct. Amount is one standalone piece of information per record; client name, date, and status are fields too.",
      "A button is an action entry, not recorded information. A field is the information itself, not the control.",
      "The form is the interface for filling in a group of fields; a field is one item inside it."
    ]
  },
  "data-type": {
    "zh": [
      "对。日期类型才能按时间先后排序，手机上还会弹出日期选择器，避免格式混乱。",
      "文字没法比较先后：「3月2日」和「12月1日」按文字排序会排错，格式也各写各的。",
      "凑数字会丢失月份天数，排序和显示都不对；日期就该用日期类型。"
    ],
    "en": [
      "Correct. A date type sorts chronologically and opens a date picker on phones, avoiding messy formats.",
      "Text cannot be ordered in time: \"Mar 2\" and \"Dec 1\" sort wrongly as text, and formats drift.",
      "Packed numbers lose month and day information; sorting and display both break. Dates belong in a date type."
    ]
  },
  "import-export": {
    "zh": [
      "对。导出把数据整批变成一个文件，拿到的是数据本身，可以用 Excel 或别的工具打开。",
      "分享链接只是给别人一个访问入口，数据还在原工具里——没有拿到文件。",
      "批量删除是删除的批量版，数据没了而不是搬走了。"
    ],
    "en": [
      "Correct. Exporting turns the whole batch into one file you can open in Excel or another tool.",
      "Sharing a link only grants access; the data stays in the tool and no file changes hands.",
      "Batch deletion is delete at scale—the data is gone, not moved."
    ]
  },
  "acceptance-criteria": {
    "zh": [
      "对。每一项都有明确操作和可观察结果，可以直接判定通过或不通过。",
      "这些可能有价值，但没有说明用户是否完成了保存行程这件事。",
      "感觉不能替代可重复的检查条件。"
    ],
    "en": [
      "Correct. Every item has an action and an observable result, so it can pass or fail.",
      "These can matter, but they do not say whether a person can save an itinerary.",
      "A feeling cannot replace repeatable conditions."
    ]
  },
  "test-case": {
    "zh": [
      "对。起点、输入、动作和预期结果齐全，别人可以重复执行。",
      "它有准备和操作，但没有写明这次检查期待什么结果，执行者无法直接判断通过或失败。",
      "邮箱是否属于已注册账号会改变合理结果；起点不明确时，这条预期可能把“账号不存在”也误判成密码错误。"
    ],
    "en": [
      "Correct. It has a starting point, input, action, and expected result that someone else can repeat.",
      "It has setup and actions but no expected result, so the executor cannot directly decide pass or fail.",
      "Whether the email belongs to a registered account can change the valid result. The starting condition is too vague for that expectation."
    ]
  },
  "unit-test": {
    "zh": [
      "对。它只检查一个明确规则，输入和预期输出都固定。",
      "这也能发现问题，但已经把 API 和订单流程接进来，属于更偏集成层的检查。",
      "它从用户入口检查完整结果，更接近端到端测试；不能像单元测试一样快速定位计算函数。"
    ],
    "en": [
      "Correct. It checks one clear rule with fixed input and expected output.",
      "This can find a problem, but it includes the API and order flow, so it is closer to an integration test.",
      "That checks a complete result from the user entry point, which is closer to an end-to-end test and does not isolate the calculation."
    ]
  },
  "integration-test": {
    "zh": [
      "对。每个小单元可能各自正确，问题常出在它们交接的数据约定。",
      "这会继续加强单元测试，却没有检查总价在表单、API 和页面之间是否正确传递。",
      "完整用户流程能证明结果，但范围更大；当前已有单元证据，先检查相邻模块的字段交接更容易定位。"
    ],
    "en": [
      "Correct. Each small unit may be right on its own; the data contract at their handoff is often wrong.",
      "That strengthens the unit test but does not check whether the total moves correctly through the form, API, and page.",
      "A full user flow can prove the result, but its scope is wider. With unit evidence already available, checking the adjacent handoffs will locate the issue faster."
    ]
  },
  "contract-testing": {
    "zh": [
      "对。提供方验证会把真实响应与调用方记录的最小要求比对，并在 CI 中明确指出缺失的 user_id。",
      "不对。后端单元测试只验证后端自身逻辑，无法知道外部前端是否强依赖旧字段名。",
      "不对。这属于滞后的人工验收，不能在提交代码时自动预警，且成本和风险极高。"
    ],
    "en": [
      "Correct. Contract testing requires no browser orchestration or full environments, pinpointing breaking response schema changes directly.",
      "Incorrect. Unit tests only verify internal logic and cannot detect broken external consumer assumptions.",
      "Incorrect. Post-release manual checks come too late and carry massive deployment risk."
    ]
  },
  "e2e-test": {
    "zh": [
      "对。它从用户操作入口走到最终可见结果，跨过必要系统。",
      "这能验证服务和数据的连接，但没有从用户操作入口经过页面和确认结果。",
      "跳转本身不证明行程已经保存，也不证明确认页显示的是刚才提交的数据。"
    ],
    "en": [
      "Correct. It goes from the user's entry action to the final visible result across needed systems.",
      "That verifies the service and data connection, but it does not start from the user's page actions or check the visible confirmation.",
      "Navigation alone does not prove the itinerary was saved or that confirmation shows the submitted data."
    ]
  },
  "smoke-test": {
    "zh": [
      "对。首页是关键探针，失败说明当前版本不值得继续投入更深测试。",
      "系统最基本入口已失败，后续大量结果难以解释且浪费时间。",
      "只凭首页失败不能判断所有旧功能；先把当前版本阻断并定位。"
    ],
    "en": [
      "Correct. A failed key probe means this version is not worth deeper test investment yet.",
      "The basic entry is already broken, so many later results are hard to interpret and waste time.",
      "One failed home page cannot establish that every old feature failed; block and locate the current version first."
    ]
  },
  "regression-test": {
    "zh": [
      "对。这些旧流程都依赖总价，最可能被这次变化误伤。",
      "新规则显示不代表旧的支付和确认结果仍正确。",
      "除非有明确共享依赖，否则它不在这次改动的主要风险面。"
    ],
    "en": [
      "Correct. These older paths depend on the total and are most likely to be harmed by the change.",
      "Displaying the new rule does not prove old payment and confirmation results remain correct.",
      "Without a known shared dependency, it is not in this change's main risk area."
    ]
  },
  "test-coverage": {
    "zh": [
      "对。测试可能走到了失败分支，却没有检查页面是否给出正确反馈。",
      "重复执行仍只证明代码被走到；没有有效断言时，错误的成功提示不会被发现。",
      "人工记录能保留现象，但这个稳定失败路径仍缺少会持续检查用户结果的自动用例。"
    ],
    "en": [
      "Correct. A test may execute the failure branch without checking that the page gives the right feedback.",
      "Repeated execution still only proves the code was reached. Without a useful assertion, the wrong success message remains invisible.",
      "A manual record preserves the symptom, but this stable failure path still lacks an automated check of the user result."
    ]
  },
  "test-double": {
    "zh": [
      "对。测试重点是页面如何处理拒绝，替身让这个前提可重复。",
      "前提不可控，测试会慢且不稳定，难以重复。",
      "替身不证明真实服务连接、认证或协议没有问题。"
    ],
    "en": [
      "Correct. The test asks how the page handles rejection, and the double makes that prerequisite repeatable.",
      "The prerequisite is uncontrolled, slow, unstable, and hard to repeat.",
      "A double does not prove real service connection, authentication, or protocol works."
    ]
  },
  "test-fixture": {
    "zh": [
      "对。用户姓名、订单金额等具体内容是测试数据；创建和清理的可复用流程是 Fixture。",
      "这里描述的不只是值，还包括每次运行前后如何建立和还原状态。",
      "测试前提应避免污染真实生产数据，且应能恢复稳定起点。"
    ],
    "en": [
      "Correct. The user name and order amount are test data; the reusable setup and cleanup flow is the fixture.",
      "It describes not only values but how state is created and restored around every run.",
      "Test prerequisites should not pollute real production data and should restore a stable starting point."
    ]
  },
  "flaky-test": {
    "zh": [
      "对。同一代码交替结果是波动证据，应先找不可控因素。",
      "这会隐藏信号、增加时间，不能消除不稳定根因。",
      "它可能也暴露真实问题，但先要区分为什么同一测试有时通过。"
    ],
    "en": [
      "Correct. Alternating results on unchanged code are evidence of variance, so find the uncontrolled factor.",
      "That hides signal and adds time; it does not remove the instability cause.",
      "It may reveal a real product issue too, but first distinguish why the same test sometimes passes."
    ]
  },
  "load-testing": {
    "zh": [
      "对。负载测试的价值在于用可重复的负载和阈值发现瓶颈，再用下一轮结果验证改善。",
      "单个请求没有施加目标负载，不能说明并发用户下的延迟、吞吐或错误率。",
      "排除失败会掩盖负载下的真实影响；错误率和响应时间都要按同一场景完整分析。"
    ],
    "en": [
      "Correct. Load testing is useful when repeatable load and thresholds expose a bottleneck and the next run verifies the improvement.",
      "One request applies no target load and cannot show latency, throughput, or errors under concurrency.",
      "Excluding failures hides the real impact under load; errors and latency must be analyzed for the same complete scenario."
    ]
  },
  "quality-gate": {
    "zh": [
      "失败的是覆盖率条件。补测并重新验证，才能证明这次改动满足约定标准。",
      "相同测试重复通过，不会自动覆盖原本没有运行的路径。",
      "这样改变了准入标准，并未补上报告指出的测试缺口。"
    ],
    "en": [
      "Coverage is the failed condition. Adding tests and verifying again shows whether the agreed criteria are met.",
      "Repeating the same tests does not automatically exercise missing paths.",
      "This changes the admission rule without covering the gap identified in the report."
    ]
  },
  "terminal": {
    "zh": [
      "命令依赖当前目录；一次执行多条还会让后续命令在前一步失败后继续，增加混乱。",
      "先确认作用目标能避免在错误目录安装或启动；逐条执行也能保留第一条可处理的结果。",
      "尚未出现权限问题时提高权限会扩大影响范围，也不能解决当前目录是否正确。"
    ],
    "en": [
      "Commands depend on the current directory, and batching them may continue after the first one fails.",
      "Confirming the target avoids changing the wrong directory, and one-at-a-time execution preserves the first actionable result.",
      "Increasing privileges expands the impact and does not establish whether the command is running in the correct project."
    ]
  },
  "browser-devtools": {
    "zh": [
      "对。服务器返回的状态和响应内容属于网络请求证据，Network 能把失败停在哪一步显示出来。",
      "Elements 适合检查节点和样式，改文字不能证明请求成功，也看不到服务器返回的原因。",
      "清除存储可能丢失登录态和草稿，却不能直接说明这次请求为何失败；应先保留并查看请求证据。"
    ],
    "en": [
      "Correct. The server status and response are network evidence, and Network shows where the save flow stopped.",
      "Elements is for nodes and styles. Changing text cannot prove the request succeeded or reveal the server's reason.",
      "Clearing storage may lose a session or draft without explaining this failure. Preserve and inspect the request evidence first."
    ]
  },
  "npm": {
    "zh": [
      "依赖目录可能与系统和环境不同，也无需手工传递；项目清单和锁文件才是可重建依据。",
      "npm 会根据 package.json 和锁文件恢复依赖，随后 scripts 才能使用项目约定的工具。",
      "逐个猜包会偏离项目锁定的依赖版本，也无法让其他环境按同一清单重建。"
    ],
    "en": [
      "The dependency directory may differ by system and does not need manual transfer. The manifest and lockfile are the reproducible source.",
      "npm restores dependencies from package.json and the lockfile so project scripts can use the intended tools.",
      "Guessing global packages bypasses the project's locked versions and cannot reproduce the same environment elsewhere."
    ]
  },
  "build": {
    "zh": [
      "对。构建产物和环境里实际运行的版本不是同一件事。",
      "重新构建只会再生成工件；如果部署步骤没有使用它，测试环境仍可能保持旧版本。",
      "缓存会影响看到的内容，但页面变化不能证明它对应哪次构建；应核对部署工件或版本标识。"
    ],
    "en": [
      "Correct. A build artifact and the version actually running in an environment are different things.",
      "Building again only produces another artifact. If deployment does not use it, the test environment can remain old.",
      "Cache can affect what you see, but a page change does not prove which build it came from. Check the deployed artifact or version identifier."
    ]
  },
  "ci": {
    "zh": [
      "对。CI 的价值在于每次变更靠近共享主线时自动验证，而不是攒到最后。",
      "是否自动、持续地围绕变更运行，决定了它是否发挥持续集成作用。",
      "自动发布属于 CD 的范围，CI 本身重点是构建和验证。"
    ],
    "en": [
      "Correct. CI gains value by automatic verification as each change approaches the shared line, not at the end.",
      "Whether it runs automatically and continuously around changes determines whether it serves continuous integration.",
      "Automatic release belongs to CD; CI itself focuses on build and verification."
    ]
  },
  "lint": {
    "zh": [
      "对。Lint 通过不能证明按钮事件、网络请求或页面状态正确。",
      "静态检查没有执行用户操作，不能提供这种证据。",
      "Lint 仍能及早发现另一类问题，只是不应被误当作全部验证。"
    ],
    "en": [
      "Correct. Passing lint does not prove button events, network requests, or page state are right.",
      "Static checking did not execute a user action, so it cannot supply that evidence.",
      "Lint still catches another class of issues early; it simply should not be mistaken for all verification."
    ]
  },
  "hash": {
    "zh": [
      "决定性证据是页面还引用旧文件。先让入口引用新资源，再检查实际请求和显示结果。",
      "当前证据是引用仍旧，不是文件名碰撞。增加摘要长度不会改变页面引用。",
      "即使重新下载，当前引用仍指向旧脚本。应先检查入口页面与资源引用。"
    ],
    "en": [
      "The key evidence is the old reference. Update the entry to reference the new asset, then verify the request and displayed result.",
      "The evidence points to an old reference, not a filename collision. A longer digest does not change that reference.",
      "Fetching the same old URL again still requests the old script. Inspect the entry page and its resource references first."
    ]
  },
  "tech-stack": {
    "zh": [
      "技术栈描述的是项目实际分工，只有知道现状和约束，替换才有可比较的成本与结果。",
      "同时改变多层会扩大风险和排查范围，流行程度也不能证明适合当前项目。",
      "品牌清单没有表达职责，无法判断重复能力、缺口或某项替换会影响哪里。"
    ],
    "en": [
      "A stack describes actual responsibilities, and only current constraints make replacement cost and outcome comparable.",
      "Changing many layers expands risk and diagnosis scope, while popularity does not prove fit.",
      "A brand list hides responsibilities, so overlaps, gaps, and replacement impact cannot be judged."
    ]
  },
  "javascript": {
    "zh": [
      "浏览器逻辑可以立即改画面，刷新后的结果仍取决于数据是否真正保存。",
      "画面变化只是当前浏览器状态，不能证明服务器已经保存收藏。",
      "浏览器代码可被修改，真实权限和数据规则必须由受控服务再次检查。"
    ],
    "en": [
      "Browser logic can change the view immediately, while refresh depends on whether the data was persisted.",
      "A view update is only browser state and does not prove the server stored the favorite.",
      "Browser code can be modified, so real permissions and data rules require a controlled server check."
    ]
  },
  "typescript": {
    "zh": [
      "类型系统能检查数据形状和使用方式，无法判断一个合法数字是否符合业务含义。",
      "通过类型检查不代表逻辑正确，20 和 0.2 都可能是合法数字。",
      "Any 关闭了最需要的结构检查，让拼写和错误用法更晚才暴露。"
    ],
    "en": [
      "Types check data shape and usage, but cannot know whether a valid number carries the correct business meaning.",
      "Passing type checks does not prove logic; both 20 and 0.2 can be valid numbers.",
      "Any disables the structural checks needed here and delays spelling and usage failures."
    ]
  },
  "python": {
    "zh": [
      "文件自动化的主要风险是作用范围和写入结果，先明确并试运行可以避免批量损坏。",
      "批量脚本可能跨文件写入，编辑器撤销不一定覆盖整个过程；应先用副本验证范围和输出。",
      "能够启动只说明语法和环境基本可用，不能证明批量输入、输出和异常路径安全。"
    ],
    "en": [
      "File automation risk comes from scope and writes, so explicit targets and a trial prevent batch damage.",
      "Batch scripts may write across files, and editor Undo may not cover the process; test scope and output on copies first.",
      "Starting proves only that syntax and runtime basically work, not that batch input, output, and error paths are safe."
    ]
  },
  "pointer": {
    "zh": [
      "浅拷贝创建了新的外层对象，但没有复制内部 theme。改它的 mode 会影响双方读到的结果。",
      "外层独立只保护第一层的替换；这里修改的是仍被共用的 theme 对象。",
      "共享对象在执行属性修改时就已变化。取消不是这次变化的触发点。"
    ],
    "en": [
      "A shallow copy creates a new outer object, but does not copy the nested theme. Updating its mode affects what both names read.",
      "A separate outer object isolates top-level replacement. This edit changes the still-shared theme object.",
      "The shared object changes when its property is edited. Cancel is not the trigger."
    ]
  },
  "react": {
    "zh": [
      "共享状态作为唯一画面依据，能避免三个位置各自维护并逐个同步。",
      "手工同步容易遗漏新位置，也把数据来源分散在多个操作步骤里。",
      "React 负责当前画面更新，刷新后的数据仍需要本地或服务器持久化。"
    ],
    "en": [
      "One state becomes the view source, avoiding separate values and manual synchronization across locations.",
      "Manual synchronization misses new locations easily and scatters the data source across operations.",
      "React updates the current view; persistence after refresh still requires local or server storage."
    ]
  },
  "vue": {
    "zh": [
      "Vue 根据状态重新显示相关组件，避免手工查找和同步多个文本节点。",
      "手工操作绕开了响应式数据来源，页面增加新预览位置后容易遗漏。",
      "Vue 能更新当前界面，不会自动提供请求、数据库或长期保存。"
    ],
    "en": [
      "Vue renders related components from state, avoiding manual lookup and synchronization of text nodes.",
      "Manual operations bypass the reactive source and easily miss new preview locations.",
      "Vue updates the current interface; it does not automatically provide requests, databases, or persistence."
    ]
  },
  "nextjs": {
    "zh": [
      "Next.js 扩展 React 的网站结构和渲染能力，不会自动生成符合业务的数据与授权。",
      "框架提供构建能力，不知道项目的数据模型、账号规则或管理流程。",
      "单个组件不需要完整网站框架，是否采用取决于路由、渲染和部署任务。"
    ],
    "en": [
      "Next.js extends React with site structure and rendering, but cannot invent the project's business data or authorization.",
      "The framework provides building capabilities, not the project's data model, account rules, or operations.",
      "One component does not require a full-site framework; the choice depends on routing, rendering, and deployment."
    ]
  },
  "tailwind-css": {
    "zh": [
      "对。内容与卡片边缘的距离由 padding 控制，p-* 正是在调整内边距。",
      "外边距会改变卡片与邻居的距离，不能增加内容与自身边缘之间的空间。",
      "rounded-* 只改变角的形状，不会把内容从边缘推开。"
    ],
    "en": [
      "Correct. Padding controls the space between content and the card edge, and p-* utilities change that padding.",
      "Outer margin changes the card’s distance from neighbors, not the space between its content and edge.",
      "rounded-* changes the corner shape, not the distance between content and the edge."
    ]
  },
  "shadcn-ui": {
    "zh": [
      "对。shadcn/ui 交付的是进入项目的组件源码，不是只能远程调用的黑盒服务。",
      "添加命令会把代码写进项目，项目可以直接修改，也要承担后续维护。",
      "本地组件不会自动安全升级；更新时仍要审查项目自己的修改和使用位置。"
    ],
    "en": [
      "Correct. shadcn/ui provides component source that enters the project, not a remote black-box service.",
      "The add command writes code into the project, where it can be edited and must be maintained.",
      "A local component does not upgrade safely by itself; updates still require review of project changes and usage."
    ]
  },
  "ai-basics": {
    "zh": [
      "AI 只能根据收到的上下文和工具结果回答，真实日程必须由受控产品能力读取。",
      "语言模型无法凭空知道私人数据，推测会把不存在的信息当成真实结果。",
      "提示词不能创造工具和权限，是否查询必须由应用实际调用记录证明。"
    ],
    "en": [
      "AI answers from supplied context and tool results; private schedules require a controlled product capability.",
      "A language model cannot know private data without access, so inference turns invented information into a claimed result.",
      "A prompt creates neither tools nor permission; actual execution requires an application call record."
    ]
  },
  "ai-hallucination": {
    "zh": [
      "对。开放时间可以从带日期的一手来源直接核验，搜索摘要和 AI 的详细描述都不能替代官方信息。",
      "具体时间让说法更像真的，却不能证明它准确；到现场才发现闭馆会直接打乱行程。",
      "同一模型重复确认不是独立证据，应回到官网、官方预约页或场馆公告。"
    ],
    "en": [
      "Correct. Dated primary sources can verify opening hours directly; a search summary or detailed AI wording cannot replace official information.",
      "A precise time makes the claim sound real but does not prove accuracy. Arriving to find it closed would disrupt the trip.",
      "Repeated confirmation from the same model is not independent evidence. Return to the official site, official reservation page, or venue notice."
    ]
  },
  "vibe-coding": {
    "zh": [
      "对。本机画面正常只证明原型能运行；接触真实个人信息前，需要把它当正式软件检查和验证。",
      "没有报错不能证明数据处理、权限和异常路径安全，真实信息不适合只靠原型体验验收。",
      "视觉完成度与数据是否正确保存、是否越权没有直接关系，不能代替技术检查。"
    ],
    "en": [
      "Correct. A working local screen proves only that the prototype runs. Software handling real personal data needs formal review and verification.",
      "No visible error does not establish safe data handling, authorization, or failure behavior.",
      "Visual polish says nothing about correct storage or access control and cannot replace technical checks."
    ]
  },
  "multimodal": {
    "zh": [
      "对。图片提供当前画面，文字说明问题和判断边界。模型先分析可见线索；原因还要由你，或获得项目工具权限的 Agent，在真实项目中验证。",
      "模型没有收到当前画面，也不知道哪里异常，只能猜测。多模态任务仍需要明确提供相关信息。",
      "截图只包含画面中的像素，不会自动带上源代码、设备状态或运行数据。"
    ],
    "en": [
      "Correct. The image supplies the current screen, while the text defines the question and its limits. The model can inspect visible clues first; you, or an agent with project-tool access, must then verify the cause in the real project.",
      "The model has neither the current screen nor a clear symptom, so it can only guess. A multimodal task still needs relevant information.",
      "A screenshot contains only visible pixels. It does not automatically include source code, device state, or runtime data."
    ]
  },
  "context-engineering": {
    "zh": [
      "对。当前目标和限制要持续可见；重复记录可以改成摘要，需要细节时再按文件位置读取原文。",
      "信息越全不等于重点越清楚；重复输出会占空间并掩盖当前限制。",
      "问题不只在措辞。旧信息如何筛选、压缩和取回也是上下文工程的一部分。"
    ],
    "en": [
      "Correct. Critical decisions stay visible, low-signal material is compressed, and locators preserve access to details on demand.",
      "More material does not mean clearer priorities. Repeated output consumes context and can bury the current constraint.",
      "Wording is only one part. Selecting, compressing, and retrieving the rest of the context also matters."
    ]
  },
  "token": {
    "zh": [
      "Token 划分随模型和内容变化，真实用量或对应分词工具比字符数规则可靠。",
      "字符与 Token 不是固定一一对应，代码、中文和英文都可能被不同方式切分。",
      "模型读取的输入同样占用上下文和用量，不能只看屏幕上新增的回答。"
    ],
    "en": [
      "Tokenization varies by model and content, so actual usage or the matching tokenizer is more reliable than character rules.",
      "Characters and tokens are not one-to-one; code, Chinese, and English may all split differently.",
      "Input read by the model also consumes context and usage, not only newly displayed output."
    ]
  },
  "context-window": {
    "zh": [
      "对。上下文要优先保留当前任务需要的信息；旧内容可浓缩，但仍要给回答留出空间。",
      "输入都放进去却没有足够输出空间，模型仍可能无法完成回答。",
      "新消息也会占用上下文。没有先筛掉无关内容，只会让空间更紧张。"
    ],
    "en": [
      "Correct. Prioritize material the current task needs, compress older content, and leave room for a response.",
      "Without enough response space, the model may still be unable to complete the answer.",
      "The new message also consumes context. Adding more without removing noise makes the limit worse."
    ]
  },
  "system-prompt": {
    "zh": [
      "对。系统提示词用于产品级固定约束，用户消息不能覆盖它。",
      "用户需求重要，但不能推翻产品设定的安全和业务边界。",
      "应执行规则并说明可做什么，不需要暴露内部提示词全文。"
    ],
    "en": [
      "Correct. System instructions set product-level constraints that a user message cannot override.",
      "User needs matter, but cannot override product safety and business boundaries.",
      "Apply the rule and explain available action; do not expose the internal prompt."
    ]
  },
  "conversation-history": {
    "zh": [
      "模型需要当前所指内容才能解析“第二条”，界面可见不代表请求实际包含它。",
      "全量历史会持续占用空间和成本，还可能让旧目标干扰当前任务。",
      "产品保存和展示消息是一层，组装模型输入是另一层，二者不能互相替代。"
    ],
    "en": [
      "The model needs the referenced content to resolve second; visible history does not prove it was sent.",
      "Full history continuously consumes space and cost and may let outdated goals interfere with the task.",
      "Saving and displaying messages is separate from assembling model input, so one cannot replace the other."
    ]
  },
  "prompt": {
    "zh": [
      "对。AI 是按提示词工作的，结果偏了多半是提示词里缺信息。补上「要什么、不要什么、怎么验收」，下一轮就准了。",
      "换工具解决不了信息缺失：同样的模糊要求，换一个 AI 还是只能猜。先把话说清通常更快。",
      "「不对」没有告诉 AI 哪里不对。每轮重做都在烧时间和额度，不如一句话说清要改哪里。"
    ],
    "en": [
      "Correct. The AI works from your prompt; off-target results usually mean missing information. Add \"what, what not, and how to verify.\"",
      "A different tool still has to guess from the same vague request. Clarifying is almost always faster.",
      "\"Wrong\" does not say what is wrong. Each redo burns time and quota; one specific sentence beats ten vague ones."
    ]
  },
  "stateless-request": {
    "zh": [
      "请求本身无状态，模型只能使用这次收到的内容，应用需要重建必要背景。",
      "账号或会话存在不代表模型持有旧请求，缺少背景时“继续”没有可确定对象。",
      "界面存储服务于展示，只有实际组装进请求的内容才能被模型读取。"
    ],
    "en": [
      "The request is stateless and the model can only use current input, so the application rebuilds required background.",
      "An account or session does not mean the model retains prior requests, leaving Continue without a known object.",
      "UI storage supports display; only content assembled into the request can be read by the model."
    ]
  },
  "structured-output": {
    "zh": [
      "对。字段固定后，程序才能可靠地渲染、校验和处理缺失值。",
      "自然语言格式容易变化，解析规则会脆弱且难以发现遗漏。",
      "模型生成的展示 HTML 难以安全校验；应返回数据，再由界面负责渲染。"
    ],
    "en": [
      "Correct. Stable fields let software render, validate, and handle omissions reliably.",
      "Natural-language formats change, making parsing brittle and omissions hard to detect.",
      "Model-generated display HTML is hard to validate safely; return data and let the UI render it."
    ]
  },
  "streaming-response": {
    "zh": [
      "流式响应缩短首段等待，完整状态则防止把中断内容误认为最终答案。",
      "用户仍等待了全部生成时间，只是把已完成内容延迟播放，并没有更早获得结果。",
      "首段可见不代表回答结束，过早完成会破坏复制、保存和错误处理。"
    ],
    "en": [
      "Streaming reduces time to first content, while explicit states keep interrupted output from looking final.",
      "Users still wait for full generation and then receive an artificial delay rather than earlier content.",
      "First content is not completion, and premature state breaks copying, saving, and error handling."
    ]
  },
  "ai-agent": {
    "zh": [
      "对。步骤不是预先固定的，模型会用环境中的真实观察决定下一步，同时仍受工具和停止条件控制。",
      "这是一次模型生成，没有围绕环境反馈反复选择行动。",
      "这是预设工作流：模型参与其中，但运行路径由代码提前决定。"
    ],
    "en": [
      "Correct. The path is not fixed in advance: the model chooses actions from real observations while tools and stopping conditions still constrain it.",
      "That is a single generation, not a loop of actions chosen from environmental feedback.",
      "That is a predefined workflow: a model participates, but code decides the route in advance."
    ]
  },
  "harness-engineering": {
    "zh": [
      "对。这里补的是会实际操作页面、产生失败证据并把证据送回下一轮的评测环境。",
      "静态图只能证明页面能显示，不能证明按钮、导航和完整任务真的可用。",
      "自我提醒没有增加新的证据来源，同一种遗漏仍可能被带到下一轮。"
    ],
    "en": [
      "Correct. This adds an environment that operates the page, produces failure evidence, and returns it to the next turn.",
      "A static image proves that the page renders, not that its buttons, navigation, or end-to-end task work.",
      "A reminder adds no new source of evidence, so the same omission can survive another turn."
    ]
  },
  "human-in-the-loop": {
    "zh": [
      "对。暂停发生在不可逆动作之前，人也拿到了足够信息，可以批准、拒绝或要求修改。",
      "这时高风险动作已经发生，人工检查无法起到事前控制作用。",
      "人在回路不等于每一步都审批；低风险、可撤销的检索可以自动完成。"
    ],
    "en": [
      "Correct. The pause occurs before the irreversible action and gives the person enough information to approve, reject, or request a change.",
      "The high-risk action has already happened, so the review cannot provide preventive control.",
      "Human-in-the-loop does not mean approving every step. Low-risk, reversible searches can remain automatic."
    ]
  },
  "sub-agent": {
    "zh": [
      "对。三项互不依赖且不改文件，适合并行；主 Agent 仍负责合并冲突结论和最终判断。",
      "并行写同一文件容易覆盖和冲突。应先明确所有权，或由主 Agent 汇总结论后串行修改。",
      "边界不清会造成重复、遗漏和难以汇总；委派时仍要写清任务与产出。"
    ],
    "en": [
      "Correct. Independent read-only checks parallelize well, while the main agent still resolves overlapping or conflicting findings.",
      "Concurrent writes to the same file can conflict or overwrite work. Define ownership or make changes serially after synthesis.",
      "Unbounded delegation creates duplication, gaps, and results that are difficult to combine."
    ]
  },
  "tool-calling": {
    "zh": [
      "对。模型选择工具不等于外部操作已经发生。",
      "文字和真实日历状态是两件事。",
      "工具可能失败、被拒绝或创建了不同结果，必须依据真实返回确认。"
    ],
    "en": [
      "Correct. Choosing a tool is not the same as an external action occurring.",
      "Text and real calendar state are different things.",
      "The tool may fail, be denied, or create a different result; confirm from its real return."
    ]
  },
  "react-pattern": {
    "zh": [
      "对。真实观察否定了原判断，下一步应该改查仍未解释的网络请求。",
      "文件已经证明点击事件存在，继续按原判断修改会忽略刚得到的证据。",
      "确认一个位置没有问题，不代表故障已经解释；还要根据现有证据选择下一处检查。"
    ],
    "en": [
      "Correct. The file result disproves the original assumption, so the next action investigates the unexplained network behavior.",
      "The file already shows a handler, so continuing the original edit ignores the latest evidence.",
      "Clearing one location does not explain the failure; the observation should direct the next check."
    ]
  },
  "agent-loop": {
    "zh": [
      "同类失败已经达到上限，循环应暂停并把证据交给用户，而不是继续扩大改动。",
      "尝试次数不是完成证据；构建和手机页面检查还没有通过。",
      "这会绕过已经设定的上限，并可能让改动范围不断扩大。"
    ],
    "en": [
      "The repeated failure has reached its limit, so the loop should pause and present evidence instead of expanding changes.",
      "Attempt count is not proof; the build and mobile-page check have not passed.",
      "This bypasses the stated limit and can let the change scope keep growing."
    ]
  },
  "provider": {
    "zh": [
      "对。Provider 表示通过哪个服务平台调用，Model 表示这次选择的具体模型，所以这里连接的模型提供商是 OpenRouter。",
      "这不是 Provider，而是 Model 名称。它说明选择了哪个模型，不能单独说明请求通过哪个服务平台发送。",
      "这里已经明确写出 `provider: OpenRouter`，因此可以判断请求通过 OpenRouter 发送。"
    ],
    "en": [
      "Correct. Provider says which service platform you call, while Model says which model you select. The provider here is OpenRouter.",
      "That is the Model name, not the Provider. It identifies which model is selected, not which service platform receives the request.",
      "The configuration explicitly says `provider: OpenRouter`, so the request goes through OpenRouter."
    ]
  },
  "base-url": {
    "zh": [
      "对。针对 OpenRouter 这种 OpenAI 兼容的服务，需要包含 /api/v1 路径；但注意并不是所有服务都要写 /v1，例如 Anthropic 的 Base URL 是 `https://api.anthropic.com`，一切以具体服务商文档为准。",
      "不对。这包含了具体端点的完整请求路径。Base URL 通常只包含公共前缀，否则工具再次拼接路径时会导致请求地址错误（如双重 completions 路径）。",
      "不对。对于 OpenRouter 这类兼容服务，省略 /api/v1 会导致工具无法匹配正确的接口路径。请务必根据官方文档确定具体前缀，而不是硬套规则。"
    ],
    "en": [
      "Correct. For OpenAI-compatible services like OpenRouter, the path prefix /api/v1 is needed; however, not all providers use /v1 (e.g. Anthropic uses `https://api.anthropic.com`). Always check the provider's documentation.",
      "Incorrect. This includes the full endpoint path. The Base URL should only contain the shared prefix; otherwise, when the tool appends the endpoint path, it will result in a malformed URL.",
      "This leaves out the path required by the OpenRouter service, so it cannot replace the complete Base URL."
    ]
  },
  "api-proxy": {
    "zh": [
      "对。请求先从个人经 AI 工具发给中转站，再由中转站转给模型提供商；结果也要经过中转站返回个人，所以两段内容都经过中转站。",
      "不对。这个链路跳过了中转站接收请求的环节；如果配置了 API 代理，请求应先到中转站，再由它转给模型提供商。",
      "不对。中转站只负责接收、转发和返回数据，真正运行模型并生成结果的是模型提供商。"
    ],
    "en": [
      "Correct. The request goes from you through the AI tool to the relay and then to the model provider; the result also passes through the relay on its way back to you.",
      "Not quite. This path skips the relay when the request is sent. With an API proxy configured, the request should reach the relay first, which forwards it to the model provider.",
      "Not quite. The relay receives, forwards, and returns data; the model provider is the part that runs the model and generates the result."
    ]
  },
  "openai-compatible-api": {
    "zh": [
      "对。兼容 API 解决请求怎样包装，工具调用还取决于底层模型的能力。",
      "接口协议和模型能力是不同层次；兼容声明不能保证工具调用、多模态或流式表现相同。",
      "配置只能请求某项能力，不能替底层模型增加理解工具和生成结构化参数的能力。"
    ],
    "en": [
      "Correct. A compatible API standardizes request packaging; tool calls still depend on the model.",
      "Protocol and model capability are different layers; compatibility does not guarantee identical tool, multimodal, or streaming behavior.",
      "A setting can request a capability, but it cannot give the model the ability to understand tools and emit structured arguments."
    ]
  },
  "api-key": {
    "zh": [
      "对。环境变量存在部署平台或本地的配置里，不进代码仓库；代码里只写变量名，Key 的值不上传。",
      "私有仓库也可能被泄漏、被截图、被 AI 工具读到；Key 写在代码里迟早会跟着代码一起离开你的控制。",
      "Key 应该各自创建、按人管理；散落在聊天记录和多个代码库里更难吊销。"
    ],
    "en": [
      "Correct. Env vars live on the deploy platform or local config, never in the repo; code carries only the name, not the value.",
      "Private repos leak, get screenshotted, and get read by AI tooling; a key in code eventually escapes your control.",
      "Keys should be created per person and per environment; copies in chats and repos are hard to revoke."
    ]
  },
  "config-file": {
    "zh": [
      "对。模型调用失败时，应先检查配置文件中的 Provider、模型和连接设置。",
      "不对。模型调用失败时，应先检查配置文件中的 Provider、模型和连接设置。",
      "不对。模型调用失败时，应先检查配置文件中的 Provider、模型和连接设置。"
    ],
    "en": [
      "Correct. First check the Provider, model, and connection settings in the config file.",
      "Not quite. First check the Provider, model, and connection settings in the config file.",
      "Not quite. First check the Provider, model, and connection settings in the config file."
    ]
  },
  "profile": {
    "zh": [
      "对。显式选择 Profile 能让当前会话加载预期的 Provider 和地址，减少误用默认配置的风险。",
      "共享默认配置容易在敏感项目中误用个人或公网连接，不能提供隔离。",
      "Profile 只切换 AI 连接参数，不会切换代码分支，也不能替代对 Provider 和 Base URL 的检查。"
    ],
    "en": [
      "Correct. An explicit Profile loads the expected Provider and endpoint and reduces accidental use of a default configuration.",
      "A shared default can route sensitive work through the wrong personal or public connection and does not isolate it.",
      "A Profile changes AI connection settings, not code branches, and does not replace checking the Provider and Base URL."
    ]
  },
  "project-rules": {
    "zh": [
      "对。项目规则会作为任务上下文提供给 Agent，帮助它在生成阶段遵循团队约定。",
      "客户端配置控制工具怎么连接和运行，不能代替给 Agent 的项目开发规范。",
      "编译器和 Linter 主要在生成后发现问题，不能替代项目规则在生成阶段提供指导。"
    ],
    "en": [
      "Correct. Project rules enter the agent's task context and guide generation toward the team's conventions.",
      "Client config controls how the tool connects and runs; it does not replace project guidance for the agent.",
      "Compilers and linters mainly catch problems after generation; they do not replace guidance during generation."
    ]
  },
  "hook": {
    "zh": [
      "对。Hook 由生命周期事件触发，适合在写入完成后自动执行预设任务。",
      "Skill 是可调用的任务方法，不是写入事件发生时自动触发的监听器。",
      "Hook 只能运行预设脚本；格式化或检查不能替代业务逻辑修复和人工验收。"
    ],
    "en": [
      "Correct. Hooks are triggered by lifecycle events and run preset tasks after a write completes.",
      "A Skill is an invokable task method, not a listener that automatically responds to a file-write event.",
      "A Hook only runs its preset script; formatting or checks do not replace logic fixes and review."
    ]
  },
  "plugin": {
    "zh": [
      "对。Plugin 适合提供侧边栏、快捷键、行内建议和 diff 等编辑器能力。",
      "Skill 主要提供可复用的任务方法和文件，不等于编辑器 UI 扩展。",
      "Hook 监听事件并执行预设任务，不负责提供编辑器侧边栏或 diff 界面。"
    ],
    "en": [
      "Correct. Plugins can provide sidebars, shortcuts, inline suggestions, and diff views in an editor.",
      "A Skill mainly provides a reusable task method and files; it is not an editor UI extension.",
      "A Hook listens for events and runs preset tasks; it does not provide a sidebar or diff interface."
    ]
  },
  "mcp": {
    "zh": [
      "对。MCP 负责发现工具和传递调用，工单系统仍负责权限与真实数据。",
      "连接协议不等于授权，是否能读 #1024 仍要由工单系统判断。",
      "负责人必须来自工具返回的真实记录，不能由模型猜测。"
    ],
    "en": [
      "Correct. MCP handles tool discovery and the call; the issue tracker still handles authorization and real data.",
      "A connection protocol is not authorization. The issue tracker still decides whether this account may read #1024.",
      "The owner must come from the real record returned by the tool, not a model guess."
    ]
  },
  "skill": {
    "zh": [
      "稳定流程和配套资源有明确入口后，Agent 能在对应任务中重复采用同一套做法。",
      "一句目标没有执行步骤、模板和验收条件，输出仍会随每次上下文变化。",
      "无关历史会稀释稳定流程，也让 Skill 难以判断何时和怎样使用资源。"
    ],
    "en": [
      "A clear entry to a stable workflow and resources lets the Agent reuse the same method for matching tasks.",
      "One goal provides no procedure, template, or acceptance criteria, so output still varies with context.",
      "Irrelevant history dilutes the stable process and obscures when and how resources should be used."
    ]
  },
  "permission-mode": {
    "zh": [
      "对。Plan / read-only 用于理解上下文和制定计划，代码修改应在确认方案后，根据需要选择合适的访问范围和审批方式。",
      "不对。Full access 会扩大或取消沙箱等访问限制，影响 AI 可以访问的文件和网络资源。",
      "不对。Ask for approval 表示执行需要批准的动作前先询问；获得批准后，AI 仍可能在允许范围内修改代码。"
    ],
    "en": [
      "Correct. Plan / read-only is for understanding context and preparing a plan. Code changes should happen after confirmation, with access and approval settings chosen for the task.",
      "Not quite. Full access widens or removes sandbox restrictions, which affects the files and network resources the AI can access.",
      "Not quite. Ask for approval means the AI asks before actions that need approval. After approval, it may still change code within the permitted scope."
    ]
  },
  "sandbox": {
    "zh": [
      "对。受限环境和非生产数据共同减少宿主机、真实数据库和凭证暴露的影响。",
      "沙箱不能让主动注入的生产凭证变得安全；代码仍可能使用或外传它们。",
      "allow 是审批策略，不是技术隔离；自动允许命令反而可能扩大宿主机风险。"
    ],
    "en": [
      "Correct. The restricted environment and non-production data reduce exposure of the host, real database, and credentials.",
      "A sandbox cannot make intentionally injected production credentials safe; code may still use or exfiltrate them.",
      "Allow is an approval policy, not technical isolation; auto-running commands can increase host risk."
    ]
  },
  "response-speed": {
    "zh": [
      "TTFT、TPS 和总时长描述不同阶段，分开测才能解释两种体验差异。",
      "首段等待短不代表后续生成快，长回答的总完成时间可能反而更久。",
      "TPS 描述开始输出后的生成速率，混入前置等待会失去指标含义。"
    ],
    "en": [
      "TTFT, TPS, and total time describe different phases and together explain the two experiences.",
      "Short first-content wait does not imply fast generation, and a long answer may finish later.",
      "TPS describes output rate after generation starts, so including prior waiting removes its meaning."
    ]
  },
  "token-cost": {
    "zh": [
      "多轮成本来自每次实际处理的内容和价格，分项记录才能找到重复输入与高成本环节。",
      "模型每轮读取的所有输入都会占用用量，界面上新写的文字只是其中一部分。",
      "显示与请求组装是两层，隐藏消息不代表后端不再发送它们。"
    ],
    "en": [
      "Multi-round cost follows actual processed content and rates, so itemized usage reveals repeated input and expensive stages.",
      "Everything the model reads each round contributes to usage; newly visible user text is only one part.",
      "Display and request assembly are separate, so hidden messages may still be sent by the backend."
    ]
  },
  "rate-limit": {
    "zh": [
      "对。限流是暂时拒绝；明确等待和禁用重复动作能避免继续加重请求。",
      "高频重试会继续触发限制，也可能影响其他请求。",
      "用户需要知道当前动作没有完成以及何时可以重试。"
    ],
    "en": [
      "Correct. A limit is temporary refusal; clear waiting guidance and duplicate prevention avoid making it worse.",
      "Fast retries keep triggering the limit and can affect other requests.",
      "People need to know the action did not complete and when it can be retried."
    ]
  },
  "git": {
    "zh": [
      "复制能留下副本，但无法清楚比较每次变化，也容易产生多个不知道差异的文件夹。",
      "Commit 会把确认可用的状态写进版本历史，之后可以比较新改动并回到这个恢复点。",
      "Push 只同步已经 Commit 的历史；未提交的工作区改动不会因此成为可恢复版本。"
    ],
    "en": [
      "A copy preserves files but does not clearly compare changes and quickly creates ambiguous backup folders.",
      "A commit records the verified working state in history so later changes can be compared or restored.",
      "Push transfers committed history. Uncommitted working files do not become a restorable version through Push."
    ]
  },
  "commit": {
    "zh": [
      "对。先限定本次范围并检查暂存区，可以避免把 .env 里的密钥写进版本历史。",
      "git add . 会把 .env 一起放进暂存区。密钥一旦进入历史，删除文件也不等于消除泄露风险。",
      "删掉最新文件不会抹去之前的提交记录。密钥进入历史后应立即轮换。"
    ],
    "en": [
      "Correct. Limiting and reviewing the staged changes keeps secrets from .env out of version history.",
      "git add . would stage .env too. Once a secret enters history, deleting the latest file does not remove the exposure.",
      "Deleting the latest copy does not erase earlier commits. A secret that enters history should be rotated."
    ]
  },
  "branch": {
    "zh": [
      "不确定的大改会直接混入稳定路线，之后分辨和撤回实验内容都更困难。",
      "新分支共享稳定起点，却把后续实验暂时隔开，验证后再决定是否合回。",
      "新仓库会割裂原有历史和协作关系；同一项目的独立修改路线应使用分支。"
    ],
    "en": [
      "An uncertain large change enters the stable line directly, making experimental work harder to isolate and undo.",
      "The branch shares the stable starting point while keeping the experiment separate until it is verified.",
      "A new repository disconnects the project's history and collaboration. A branch is the independent line within the same project."
    ]
  },
  "merge": {
    "zh": [
      "对。冲突不是任选一边；需要保留正确业务结果并验证代码仍能运行。",
      "当前分支不一定包含目标分支必须保留的修复。",
      "冲突标记不是可运行代码，应在合并前明确解决。"
    ],
    "en": [
      "Correct. A conflict is not a choice of a side; retain the right behavior and verify it still runs.",
      "It may omit a required fix from the target branch.",
      "Conflict markers are not runnable code and need an explicit resolution first."
    ]
  },
  "pull": {
    "zh": [
      "先收好本地现场能分清两批变化，拉取后的冲突和运行结果也都有明确验收。",
      "Git 不能理解业务意图，混合现场会增加冲突和误选内容的风险。",
      "重复项目会分散本地改动和环境，已有仓库应通过 Pull 同步新版本。"
    ],
    "en": [
      "Securing local work separates the change sets, while conflict resolution and checks verify the merged result.",
      "Git cannot understand business intent, and mixing an unfinished workspace increases conflict and wrong-choice risk.",
      "Duplicate projects scatter local work and environments; an existing repository should synchronize with Pull."
    ]
  },
  "push": {
    "zh": [
      "对。Push 会写入共享远端，先确认范围和目标分支，随后核对远端结果。",
      "强制推送可能覆盖他人的远端历史，不能作为普通交付步骤。",
      "文件副本会丢失可追溯的提交关系，协作分支也不会更新。"
    ],
    "en": [
      "Correct. Push writes shared remote state, so confirm scope and target, then verify the result.",
      "A force push can overwrite other people’s remote history.",
      "A file copy loses traceable commit relationships and does not update the shared branch."
    ]
  },
  "clone": {
    "zh": [
      "Clone 会取得代码和历史，随后按项目说明建立环境，后续更新再使用 Pull。",
      "压缩包通常只有当前文件快照，没有分支、提交历史和远端关联。",
      "反复下载会制造多个不一致现场，已有仓库应使用 Pull 同步。"
    ],
    "en": [
      "Clone retrieves code and history, setup follows project guidance, and later updates use Pull.",
      "An archive generally contains a file snapshot without branches, commit history, or remote connection.",
      "Repeated downloads create inconsistent workspaces; an existing repository should use Pull."
    ]
  },
  "pull-request": {
    "zh": [
      "自动检查没有覆盖这项手机布局问题；已知缺陷不应因为状态为绿色就进入主版本。",
      "PR 应汇集最新代码、讨论和验证结果；处理反馈后重新检查，才能决定是否合并。",
      "直接复制会绕过原有讨论和改动记录；修复应留在功能分支，让 PR 展示最终差异。"
    ],
    "en": [
      "The checks did not cover this mobile defect. A known issue should not enter the main line because the status is green.",
      "The pull request should collect the current code, discussion, and verification before the merge decision.",
      "Copying directly bypasses the discussion and change history. The feature branch should contain the reviewed final fix."
    ]
  },
  "worktree": {
    "zh": [
      "同一仓库的不同分支分配到不同目录，两项任务可同时保留文件和进程现场。",
      "同一分支不能同时检出到两个 Worktree，任务也应使用职责清楚的独立分支。",
      "普通副本没有清楚的分支对应关系，手工回拷也容易遗漏、覆盖或混入当前未完成改动。"
    ],
    "en": [
      "Different branches of one repository get separate directories, preserving both file and process workspaces.",
      "One branch cannot be checked out in two worktrees, and tasks need distinct responsibility branches.",
      "A plain copy lacks a clear branch mapping, and manual copying can omit, overwrite, or mix unfinished changes."
    ]
  },
  "stash": {
    "zh": [
      "状态检查能发现未跟踪文件，清楚说明和恢复验收避免拿错或遗漏临时现场。",
      "Stash 是本地短期中转，不具备清楚版本历史和远端备份能力。",
      "未跟踪文件默认可能不被包含，切换前必须确认实际收起范围。"
    ],
    "en": [
      "Status reveals untracked files, while a clear description and restore review prevent loss or confusion.",
      "Stash is local short-term transport without clear version history or remote backup.",
      "Untracked files may not be included by default, so actual scope must be confirmed before switching."
    ]
  },
  "gitignore": {
    "zh": [
      "忽略规则只影响未跟踪内容，历史中的密钥已经暴露，必须作废和更换。",
      "已跟踪文件不会因新规则消失，历史提交中的内容也仍然存在。",
      "Gitignore 只是匹配排除规则，不会加密已经提交或本地保存的内容。"
    ],
    "en": [
      "Ignore rules affect untracked content only, and credentials exposed in history must be revoked and replaced.",
      "Tracked files do not vanish from a new rule, and prior commit content remains.",
      "Gitignore is a matching rule, not encryption for committed or local content."
    ]
  },
  "diff": {
    "zh": [
      "Diff 展示实际增删，分别检查两部分才能知道提交最终会包含什么。",
      "文件名不能说明每行变化，其他文件中的误删和敏感内容仍可能进入提交。",
      "颜色只表示增加或删除，不评价业务正确性；大段删除尤其需要停下来确认。"
    ],
    "en": [
      "Diff shows actual additions and removals, and both areas reveal what the final commit will contain.",
      "Filenames do not reveal line changes, so other files may still contain deletion or sensitive content.",
      "Colors indicate addition and removal, not business correctness; large deletions require explicit review."
    ]
  },
  "style-bauhaus": {
    "zh": [
      "包豪斯的判断依据是几何与功能的关系；每个形状都有明确职责时，风格才成立。",
      "三原色只是容易被记住的表面特征；只有色块没有功能关系时，页面只是换了配色。",
      "这是瑞士排版的解决方式；它同样现代，但用网格秩序取代了几何构成，不是包豪斯。"
    ],
    "en": [
      "Bauhaus is judged by the geometry-function relationship; the style holds only when each shape has a clear job.",
      "Primary colors are just the most memorable surface trait; blocks without functional roles are only a recolor.",
      "That is the Swiss typography answer; it replaces geometric composition with grid order, which is a different movement."
    ]
  },
  "style-art-deco": {
    "zh": [
      "装饰艺术的判断依据是几何骨架；对称、阶梯和放射关系成立后，材质才有附着点。",
      "黑金只是容易被记住的配色结果；没有对称和几何纹样时，加大金色面积也得不到装饰艺术。",
      "长曲线和植物形态属于新艺术；装饰艺术使用对称的几何形，两种风格的形状语言相反。"
    ],
    "en": [
      "Art Deco is judged by its geometric skeleton; materials only have a place once symmetry, steps, and rays exist.",
      "Black and gold is only the memorable surface result; without symmetry and geometric motifs, more gold is still not Art Deco.",
      "Long curves and plant forms belong to Art Nouveau; Art Deco uses symmetrical geometry, the opposite shape language."
    ]
  },
  "http-status-code": {
    "zh": [
      "500 表示服务器处理请求时自己出错，证据在服务端；页面提示文字不能替代状态码做这个判断。",
      "500 不是“请求没送到”，而是服务器处理失败；重试可能掩盖真实故障，应先看服务端日志。",
      "提示文字由前端决定显示什么，不代表问题出在前端；500 已经指出责任一侧是服务器。"
    ],
    "en": [
      "500 means the server failed while handling the request, so the evidence lives server-side. The page message cannot replace the status code.",
      "500 means the server failed to process the request, not that it never arrived. Retrying can hide the real failure.",
      "The page decides what text to show; it does not decide which side failed. 500 already points to the server."
    ]
  },
  "stack-trace": {
    "zh": [
      "栈顶可能是 Node 或第三方库的内部调用；自己文件里的帧才对应你写的代码，是排查的起点。",
      "最上面一帧只是出错时正在执行的函数，可能属于运行环境内部，与你的代码无关。",
      "完整报错可以一起发给 AI，但自己先指出自己文件的那一帧，能确认 AI 的修改落在正确位置。"
    ],
    "en": [
      "The top frame can be Node or a third-party library internals. A frame in your own file corresponds to code you wrote and is where investigation starts.",
      "The topmost frame is just the function running when it failed; it can belong to the runtime and have nothing to do with your code.",
      "Sending the full trace to AI is fine, but identifying your own file's frame first confirms AI fixes the right location."
    ]
  },
  "timeout": {
    "zh": [
      "超时只发生在等待的一端：页面按上限放弃了，不取消服务器正在进行的处理，数据随后仍会被写入。",
      "日志显示处理正常完成且数据已写入，崩溃与观察到的结果不符。",
      "服务端日志里有这次请求的记录，说明请求已经到达并正在被处理。"
    ],
    "en": [
      "A timeout happens only on the waiting side: the page gave up after its limit without cancelling the server, which finished and wrote the data later.",
      "The logs show the request completed normally and the data was written, which contradicts a crash.",
      "The server log contains this request, proving it arrived and was being processed."
    ]
  },
  "object-storage": {
    "zh": [
      "对。文件走对象存储，结构化文字走数据库，两处靠地址字段关联。",
      "大文件进库会让查询、备份和迁移都变慢；应按内容类型分工。",
      "本地存储只在这一台设备上，换设备或清缓存就没了。"
    ],
    "en": [
      "Correct. Files go to object storage, structured text to the database, and the two are linked by an address field.",
      "Large files in the database slow queries, backups, and migration; separate by content type.",
      "Local storage exists only on this device; it is gone after switching devices or clearing cache."
    ]
  },
  "primary-key": {
    "zh": [
      "对。相同邮箱对应多行时，按邮箱更新会改到多行；主键才能唯一定位。",
      "改错行意味着改了别人的资料；定位必须唯一。",
      "删除数据是危险操作；先弄清为什么重复，再决定合并还是修正，而不是直接删。"
    ],
    "en": [
      "Correct. When identical emails map to multiple rows, updating by email changes several rows; only the primary key locates one.",
      "Editing the wrong row edits someone else's data; location must be unique.",
      "Deleting data is dangerous; find out why duplicates exist and decide to merge or fix, not delete."
    ]
  },
  "session": {
    "zh": [
      "对。短有效期会让用户频繁重新登录；调整有效期或支持记住登录可以改善。",
      "能登录说明密码是对的；问题是登录状态保持不住。",
      "数据库故障会有更广泛的报错，不只是定时要求重新登录。"
    ],
    "en": [
      "Correct. A short lifetime makes users re-sign-in frequently; adjusting the lifetime or supporting remember-me helps.",
      "Being able to sign in proves the password is right; the issue is that the signed-in state does not persist.",
      "A database outage causes broader failures, not just periodic re-sign-in prompts."
    ]
  },
  "oauth": {
    "zh": [
      "对。两种方式解决同一件事的不同路径；并存时都要能创建和识别同一个用户。",
      "网站仍需自己的用户记录来识别“是谁”；OAuth 只负责授权确认这一步。",
      "OAuth 的意义正是网站不接触第三方密码；授权后只拿到结果，不拿到密码。"
    ],
    "en": [
      "Correct. The two are different paths to the same goal; when coexisting, both must create and recognize the same user.",
      "The site still needs its own user records to identify who is who; OAuth only handles the authorization confirmation step.",
      "The point of OAuth is that the site never touches third-party passwords; after authorization it only gets the result."
    ]
  },
  "webhook": {
    "zh": [
      "对。事件驱动，几乎无延迟；要防重复通知并确认来源真实。",
      "轮询有间隔延迟，且大部分查询没有新支付，浪费请求。",
      "人工介入体验差且不可扩展；自动化才是这类需求的正解。"
    ],
    "en": [
      "Correct. Event-driven with almost no delay; guard against duplicate notifications and verify the source.",
      "Polling adds interval delay, and most checks find no new payment, wasting requests.",
      "Manual handling is a poor experience and does not scale; automation is the right answer here."
    ]
  },
  "http-methods": {
    "zh": [
      "对。GET 是读取语义：浏览器、代理都可能重发它；有副作用的操作要用 POST 或 DELETE。",
      "弹窗拦不住刷新、后退和重试；方法语义错才是根因。",
      "状态码只描述结果，改它不改变“GET 会被重发”的事实。"
    ],
    "en": [
      "Correct. GET carries read semantics: browsers and proxies may resend it; side-effecting operations should use POST or DELETE.",
      "A dialog cannot stop refresh, back, or retry; the method semantics are the root cause.",
      "A status code only describes the result; changing it does not change that GET gets resent."
    ]
  },
  "ip-address": {
    "zh": [
      "对。localhost 是每台电脑对自己的称呼；同事访问需要局域网地址或公网地址。",
      "localhost 在同事电脑上指向他自己，访问不到你的服务。",
      "端口只是同一设备上的入口，没有 IP 或域名无法定位到哪台设备。"
    ],
    "en": [
      "Correct. localhost is each machine's name for itself; a colleague needs a LAN or public address.",
      "localhost on the colleague's machine points at themselves, not your service.",
      "A port is only an entry on one device; without an IP or domain, no device can be located."
    ]
  },
  "websocket": {
    "zh": [
      "对。高频轮询既费请求又有最长一秒的延迟；WebSocket 让消息到达即推送。",
      "每秒一轮意味着平均半秒延迟，且绝大多数查询没有新消息。",
      "页面容量与消息到达速度无关；问题在获取消息的方式。"
    ],
    "en": [
      "Correct. High-frequency polling wastes requests and adds up to a second of delay; WebSocket pushes messages as they arrive.",
      "One-second rounds mean up to a second of average delay, and most checks find nothing.",
      "Page capacity is unrelated to message arrival speed; the issue is how messages are fetched."
    ]
  },
  "merge-conflict": {
    "zh": [
      "对。冲突已经写在文件里：保留正确内容、移除全部标记、git add 后提交，合并才算完成。",
      "同样的两处改动再合一次还会冲突；先弄清两边意图，才能决定保留什么。",
      "删除文件会丢掉两边的改动，应保留文件并处理其中的冲突区。"
    ],
    "en": [
      "Correct. The conflict is written into the file: keep the right content, remove all markers, git add, and commit for the merge to finish.",
      "Merging the same two changes again produces the same conflict. Understand both sides first to decide what to keep.",
      "Deleting the file discards both sides' changes. Keep the file and resolve the conflict inside it."
    ]
  },
  "remote-repository": {
    "zh": [
      "远程有你没有的提交。先拉取合并、解决冲突，推送才不会覆盖别人的工作。",
      "强推会抹掉远程上别人的提交，协作项目里是危险操作。",
      "换远程地址只是换了一份副本，原来的协作关系和历史会分裂。"
    ],
    "en": [
      "The remote has commits you do not have. Pull, merge, and resolve conflicts before pushing so you do not overwrite others' work.",
      "A force push erases commits others pushed to the remote; it is dangerous in shared projects.",
      "A different remote is just another copy; the original collaboration and history split apart."
    ]
  },
  "reset-revert": {
    "zh": [
      "对。revert 不改写已有历史，同事拉取反向提交后，两边历史保持一致。",
      "强推会改写远程历史，同事本地会冲突，且已消失的提交难以找回。",
      "删文件可能丢掉该提交里的正常改动；应先看清提交内容再决定撤销方式。"
    ],
    "en": [
      "Correct. Revert does not rewrite history, so after pulling the opposite commit both sides keep the same history.",
      "A force push rewrites remote history; teammates' copies conflict and the dropped commit is hard to recover.",
      "Deleting the file may drop legitimate changes from that commit. Inspect the commit before choosing an undo method."
    ]
  },
  "node-js": {
    "zh": [
      "对。npm 和构建工具都运行在 Node.js 上；没有它，项目命令无法执行。版本也要满足项目要求。",
      "报错说的是本机缺少 node 这个程序，与项目文件是否完整无关。",
      "浏览器只运行页面里的脚本，不能替代项目需要的 Node.js 运行环境。"
    ],
    "en": [
      "Correct. npm and build tools run on top of Node.js; without it project commands cannot execute. The version also needs to meet the project requirement.",
      "The error says this machine lacks the node program; it has nothing to do with whether the project files are complete.",
      "A browser runs only page scripts; it cannot replace the Node.js runtime the project needs."
    ]
  },
  "dependency": {
    "zh": [
      "对。克隆下来的项目通常不含依赖本身，只含记录；先安装再运行是正常流程。",
      "报错说明依赖没装，不是代码写错；删代码会破坏功能。",
      "Node.js 存在时，先装项目依赖；node 本身缺失会有不同的报错（command not found）。"
    ],
    "en": [
      "Correct. A cloned project usually contains the dependency records, not the packages themselves. Installing first is the normal flow.",
      "The error says dependencies are missing, not that the code is wrong; removing imports breaks the feature.",
      "When Node.js exists, install the project's dependencies first; a missing node itself produces a different error (command not found)."
    ]
  },
  "semantic-versioning": {
    "zh": [
      "对。主版本变化可能包含破坏性改动；发布说明列出改动清单，是升级前必须看的材料。",
      "版本号新不等于兼容；跨主版本可能让原有代码失效。",
      "长期不升级会积累安全和兼容问题；应按需、按发布说明升级。"
    ],
    "en": [
      "Correct. A major version change can include breaking changes; the release notes list them and are required reading before upgrading.",
      "A newer number does not mean compatible; a major bump can invalidate existing code.",
      "Never upgrading accumulates security and compatibility problems; upgrade deliberately based on release notes."
    ]
  },
  "rag": {
    "zh": [
      "对。RAG 每次现场检索，文档更新后答案立即跟着变，无需重新训练。",
      "微调成本高、周期长，且模型学的是“知识”而不是“每次查最新”，文档频繁更新时不适合。",
      "文档多了会超出上下文上限，且每次重复付费；RAG 只取相关段落更可控。"
    ],
    "en": [
      "Correct. RAG retrieves at answer time, so doc updates change answers immediately without retraining.",
      "Fine-tuning is costly and slow, and it bakes knowledge in rather than checking the latest each time—unsuited to frequent doc updates.",
      "Large docs exceed the context limit and are paid for repeatedly; RAG takes only relevant passages."
    ]
  },
  "prompt-injection": {
    "zh": [
      "对。第三方内容里的指令不是你的命令；读取资料与执行动作要分开，敏感操作还要收紧权限。",
      "邮件是别人写的内容，不等于你的指令；执行它等于让攻击者替你下令。",
      "拒绝总结过于保守；关键是区分“读内容”和“执行指令”，而不是不读。"
    ],
    "en": [
      "Correct. Instructions inside third-party content are not your commands; reading material and performing actions must stay separate, and sensitive actions need tighter permissions.",
      "The email is content written by someone else, not your instruction; following it lets the attacker order through you.",
      "Refusing to read is overly conservative; the key is separating reading content from executing instructions, not refusing to read."
    ]
  },
  "temperature": {
    "zh": [
      "对。低温让输出更稳定可预测，再配合结构化输出约定，格式才可能固定下来。",
      "高温度让输出更多变，固定格式的任务会变得更不稳定。",
      "长度限制回答写多长，与格式是否稳定无关。"
    ],
    "en": [
      "Correct. A low temperature makes output stable and predictable; combined with a structured-output contract, the format can hold.",
      "A high temperature makes output more varied, which destabilizes fixed-format tasks.",
      "The length limit controls how long the answer is, not whether the format stays stable."
    ]
  },
  "fine-tuning": {
    "zh": [
      "对。风格类需求通常先用提示词加示例解决；微调成本高，应作为提示词不够时的下一步。",
      "提示词加示例已经能处理大部分风格需求；直接微调成本高且不一定比提示词稳。",
      "换模型不针对你的风格要求；风格仍需要提示词或微调来约束。"
    ],
    "en": [
      "Correct. Style needs are usually handled with prompts plus examples first; fine-tuning is costly and should be the next step when prompts fall short.",
      "Prompts with examples already cover most style needs; fine-tuning directly is costly and not necessarily steadier.",
      "Switching models does not target your style requirement; style still needs prompts or fine-tuning."
    ]
  },
  "reasoning-model": {
    "zh": [
      "对。描述清楚减少模型猜测；复杂多步任务换推理模型能提高准确率，但等待更久。",
      "随机重试不解决多步推理错误；先澄清信息，再考虑换模型类型。",
      "高温度让输出更多变，与提高推理深度无关；复杂任务需要的是更强的推理而非随机性。"
    ],
    "en": [
      "Correct. Clear descriptions reduce guessing; for complex multi-step tasks a reasoning model improves accuracy but waits longer.",
      "Random retries do not fix multi-step reasoning errors; clarify the information first, then consider switching model type.",
      "A high temperature adds variation, not reasoning depth; complex tasks need stronger reasoning, not randomness."
    ]
  },
  "agent-memory": {
    "zh": [
      "对。项目规则随项目存在，每次新对话都会加载，不依赖你是否记得重说。",
      "对话里的说明只在本轮有效；忘记重说时约束就失效了。",
      "记忆机制可以帮忙，但项目级约定写进规则更可检查、可共享；两者可以配合。"
    ],
    "en": [
      "Correct. Project rules travel with the project and load into every new conversation, without relying on you restating them.",
      "Chat instructions last only for that conversation; forgetting to restate removes the constraint.",
      "Memory can help, but project-level conventions belong in rules where they are checkable and shareable; the two can work together."
    ]
  },
  "scope-creep": {
    "zh": [
      "对。越界改动让验收目标失焦；还原后明确范围，一次只改一件事。",
      "未评估的改动可能破坏其他页面；保留等于默许范围继续扩大。",
      "颜色修改本身是要做的；只还原越界部分即可，不必推倒重来。"
    ],
    "en": [
      "Correct. Out-of-scope edits blur the acceptance target; revert them and state the scope so one change stays one change.",
      "Unevaluated changes can break other pages; keeping them tacitly allows the scope to keep growing.",
      "The color change was the actual task; revert only the out-of-scope parts instead of starting over."
    ]
  },
  "technical-debt": {
    "zh": [
      "对。债要可见：记下位置和影响，再按交付节奏决定还债时机，而不是每次凭感觉。",
      "每次改动都牵连五处，改漏就出错；不处理的债会持续收利息。",
      "无差别全面重写风险高；应按影响范围和优先级分批还债，而不是推倒重做。"
    ],
    "en": [
      "Correct. Debt must be visible: record its location and impact, then choose a payoff time by delivery rhythm rather than by feel each time.",
      "Every change touches five places and missing one causes errors; unpaid debt keeps accruing.",
      "An undifferentiated full rewrite is high-risk; pay off debt in batches by impact and priority instead."
    ]
  },
  "persona": {
    "zh": [
      "对。画像把分歧变成可对照的具体假设；先对齐本次服务谁，再谈功能取舍。",
      "同时服务两个画像会让文案和功能都失去焦点，两个人群都服务不好。",
      "目标用户是业务判断；AI 可以帮你写画像，但依据要来自真实了解。"
    ],
    "en": [
      "Correct. A persona turns disagreement into a concrete comparable assumption; align on this round's user before feature tradeoffs.",
      "Serving two personas at once makes copy and features lose focus and serves neither well.",
      "The target user is a business judgment; AI can help write the persona, but the basis must come from real understanding."
    ]
  },
  "prototype": {
    "zh": [
      "对。原型用最低成本验证流程；跳过它直接写代码，流程错了就要改实现。",
      "没对齐就实现两条，成本翻倍且都可能是错的。",
      "线框图点不动，走查不出分支和返回路径的问题。"
    ],
    "en": [
      "Correct. A prototype validates flow at the lowest cost; skipping it means flow mistakes require changing implementation.",
      "Building two flows before alignment doubles cost and both may be wrong.",
      "A wireframe cannot be clicked, so branches and return paths cannot be walked through."
    ]
  },
  "event-tracking": {
    "zh": [
      "对。先有埋点才有数据；自己点一次并核对后台，是验证埋点生效的最直接方式。",
      "停留时长不能替代点击记录；没有埋点就没有点击数据。",
      "用户自述不可靠且无法持续统计；埋点记录的是真实动作。"
    ],
    "en": [
      "Correct. No tracking means no data; clicking once and verifying the backend is the most direct way to confirm tracking works.",
      "Time on page cannot replace click records; without tracking there is no click data.",
      "Self-reports are unreliable and cannot be tracked continuously; events record real actions."
    ]
  },
  "regex": {
    "zh": [
      "对。\\d 是数字，+ 是一个以上；带加号或空格的号码会被拒绝。",
      "它只匹配纯数字；+86、空格、横线都会匹配失败。",
      "开头的 ^ 和结尾的 $ 要求整串都是数字，不是任意文字。"
    ],
    "en": [
      "Correct. \\d is a digit and + means one or more; numbers with plus signs or spaces are rejected.",
      "It matches only pure digits; +86, spaces, and dashes all fail to match.",
      "The leading ^ and trailing $ require the whole string to be digits, not any text."
    ]
  },
  "keyframe": {
    "zh": [
      "对。循环播放需要关键帧；过渡只在状态切换时播放一次，不会自己循环。",
      "过渡由状态变化触发，只播一次；不会自动循环。",
      "帧动画成本高且不流畅；一个旋转用关键帧即可表达。"
    ],
    "en": [
      "Correct. Looping playback needs keyframes; a transition plays once on a state change and does not loop by itself.",
      "A transition is triggered by state changes and plays once; it does not loop automatically.",
      "Frame-by-frame images are costly and choppy; a rotation is expressed with keyframes."
    ]
  },
  "prefers-reduced-motion": {
    "zh": [
      "对。读取设置后按设置改变动画；在系统设置里切换一次，是验证生效的直接方式。",
      "按钮需要用户自己发现和点击；系统设置已经表达了偏好，页面应该自动响应。",
      "加载和状态反馈动画仍有作用；应减弱装饰性动画，保留必要的反馈。"
    ],
    "en": [
      "Correct. Read the setting and change animation accordingly; toggling the system setting once is the direct way to verify.",
      "Buttons require users to find and click them; the system setting already expresses the preference and the page should respond automatically.",
      "Loading and status feedback animations still serve a purpose; reduce decorative animation, keep necessary feedback."
    ]
  },
  "semantic-html": {
    "zh": [
      "对。层级递进表达从属关系；两个 H1 和跳级都会让大纲混乱，影响机器和辅助技术理解。",
      "标签决定结构语义；字号只是外观，机器按标签读大纲。",
      "H1 是页面主标题的角色标记，不是“最大字号”的样式开关。"
    ],
    "en": [
      "Correct. Descending levels express hierarchy; two H1s and skipped levels make the outline confusing for machines and assistive tech.",
      "Tags decide structural semantics; font size is only appearance, and machines read the outline by tags.",
      "H1 marks the role of the page's main heading; it is not a style switch for the biggest font."
    ]
  }
};
