// ============================================================
// 《江山北望》状态栏前端 —— 独立 ESM 脚本（照原卡 statusbar 结构）
// 用法：在酒馆助手脚本条目 content 里写：
//   void import('https://<你的地址>/jsbw-statusbar.js').catch(e=>console.error('[江山北望] 状态栏加载失败', e));
// import 后自动执行，右下角挂「北」字悬浮球，点开是 13 页签状态面板。
// ============================================================
const JBW_CSS = "/* ============================================================\n   《江山北望》卡内前端 —— 总览仪表盘样式\n   古风朱砂宣纸 · 双主题（浅色宣纸 / 深色夜色）\n   ============================================================ */\n\n/* 浅色主题（默认） */\n.jbw {\n  --jbw-bg: transparent;\n  --jbw-card: #fffdf6;\n  --jbw-line: rgba(90, 70, 50, 0.22);\n  --jbw-ink: #3a2f28;\n  --jbw-muted: #8a7b6a;\n  --jbw-accent: #b23a3a;\n  --jbw-gold: #b98a3e;\n  --jbw-blue: #3f7da8;\n  --jbw-track: #ece4d6;\n  --jbw-badge-bg: #f1e8d8;\n  --jbw-badge-ink: #8a6b3a;\n  font-family: \"Noto Serif SC\", \"Songti SC\", \"SimSun\", \"KaiTi\", serif;\n  color: var(--jbw-ink);\n  line-height: 1.6;\n  padding: 6px 2px;\n}\n\n/* 深色主题（酒馆暗色模式下自动切换） */\n@media (prefers-color-scheme: dark) {\n  .jbw {\n    --jbw-card: #231d16;\n    --jbw-line: rgba(200, 170, 130, 0.22);\n    --jbw-ink: #e8dcc8;\n    --jbw-muted: #9a8a78;\n    --jbw-accent: #c04040;\n    --jbw-gold: #c4a56a;\n    --jbw-blue: #5b8fb8;\n    --jbw-track: #342c22;\n    --jbw-badge-bg: #33291d;\n    --jbw-badge-ink: #c4a56a;\n  }\n}\n\n.jbw .jbw-top {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 14px;\n}\n.jbw .jbw-brand {\n  font-size: 13px;\n  letter-spacing: 3px;\n  color: var(--jbw-muted);\n}\n.jbw .jbw-brand b {\n  color: var(--jbw-accent);\n  font-weight: 600;\n}\n.jbw .jbw-tag {\n  font-size: 11px;\n  color: var(--jbw-muted);\n  letter-spacing: 1px;\n}\n.jbw .jbw-tag i {\n  font-style: normal;\n  font-size: 10px;\n  padding: 1px 6px;\n  border-radius: 8px;\n  margin-left: 4px;\n  border: 0.5px solid var(--jbw-line);\n}\n.jbw .jbw-tag i.war { color: #b23a3a; border-color: rgba(178,58,58,.4); }\n.jbw .jbw-tag i.private { color: #8a5a9a; border-color: rgba(138,90,154,.4); }\n.jbw .jbw-tag i.safe { color: var(--jbw-muted); }\n\n.jbw .jbw-hero {\n  border-bottom: 1px solid var(--jbw-line);\n  padding-bottom: 12px;\n  margin-bottom: 14px;\n}\n.jbw .jbw-hero h3 {\n  font-size: 18px;\n  font-weight: 600;\n  margin: 0 0 4px;\n  letter-spacing: 1px;\n}\n.jbw .jbw-hero .sub {\n  font-size: 12px;\n  color: var(--jbw-muted);\n}\n.jbw .jbw-hero .place {\n  font-size: 12px;\n  color: var(--jbw-accent);\n  margin-top: 2px;\n}\n\n.jbw .jbw-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.jbw .jbw-card {\n  background: var(--jbw-card);\n  border: 0.5px solid var(--jbw-line);\n  border-radius: 8px;\n  padding: 14px 16px;\n}\n.jbw .jbw-card .hd {\n  font-size: 12px;\n  letter-spacing: 3px;\n  color: var(--jbw-accent);\n  border-left: 2px solid var(--jbw-accent);\n  padding-left: 8px;\n  margin-bottom: 10px;\n}\n\n.jbw .jbw-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  font-size: 13px;\n  padding: 3px 0;\n}\n.jbw .jbw-row .k { color: var(--jbw-muted); }\n.jbw .jbw-row .v { font-weight: 600; }\n\n.jbw .jbw-sp { height: 6px; }\n\n.jbw .jbw-bar {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 12px;\n  padding: 2px 0;\n}\n.jbw .jbw-bar .bk { width: 38px; color: var(--jbw-muted); flex: none; }\n.jbw .jbw-bar .tr {\n  flex: 1;\n  height: 7px;\n  background: var(--jbw-track);\n  border-radius: 4px;\n  overflow: hidden;\n}\n.jbw .jbw-bar .fl {\n  height: 100%;\n  background: var(--jbw-accent);\n  border-radius: 4px;\n  transition: width .3s ease;\n}\n/* 进度条配色（tone） */\n.jbw .jbw-bar .fl.high { background: var(--jbw-gold); }\n.jbw .jbw-bar .fl.mid  { background: var(--jbw-gold); }\n.jbw .jbw-bar .fl.gold { background: var(--jbw-gold); }\n.jbw .jbw-bar .fl.danger { background: var(--jbw-accent); }\n.jbw .jbw-bar .fl.blue { background: var(--jbw-blue); }\n.jbw .jbw-bar .fl.low  { background: var(--jbw-muted); }\n.jbw .jbw-bar .bv {\n  width: 26px;\n  text-align: right;\n  font-weight: 600;\n  flex: none;\n}\n\n.jbw .jbw-item {\n  border: 0.5px solid var(--jbw-line);\n  border-radius: 6px;\n  padding: 8px 10px;\n  margin-bottom: 8px;\n}\n.jbw .jbw-item:last-child { margin-bottom: 0; }\n.jbw .jbw-item .tt {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 13px;\n}\n.jbw .jbw-item .tt b { font-weight: 600; }\n.jbw .jbw-badge {\n  font-size: 11px;\n  padding: 1px 8px;\n  border-radius: 10px;\n  background: var(--jbw-badge-bg);\n  color: var(--jbw-badge-ink);\n  border: 0.5px solid var(--jbw-line);\n}\n.jbw .jbw-badge.safe { color: var(--jbw-muted); }\n.jbw .jbw-badge.private { color: #8a5a9a; border-color: rgba(138,90,154,.4); }\n.jbw .jbw-badge.danger { color: var(--jbw-accent); border-color: rgba(192,64,64,.4); }\n.jbw .jbw-tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n  margin-top: 6px;\n}\n.jbw .jbw-sub {\n  font-size: 12px;\n  color: var(--jbw-muted);\n  margin: 3px 0 0;\n}\n.jbw .jbw-item.jbw-private {\n  border-left: 2px solid #8a5a9a;\n}\n.jbw .jbw-item.jbw-private[data-action] {\n  cursor: pointer;\n  transition: background .15s ease, box-shadow .15s ease;\n}\n.jbw .jbw-item.jbw-private[data-action]:hover {\n  background: var(--jbw-track);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.jbw .jbw-item.jbw-private .jbw-private-open {\n  font-size: 11px;\n  color: #8a5a9a;\n  letter-spacing: 1px;\n  flex: none;\n}\n.jbw-modal-holder .jbw-outfit {\n  white-space: pre-wrap;\n  line-height: 1.7;\n  color: var(--jbw-ink);\n}\n.jbw .jbw-item p {\n  font-size: 12px;\n  color: var(--jbw-muted);\n  margin: 5px 0 0;\n}\n.jbw .jbw-empty {\n  font-size: 12px;\n  color: var(--jbw-muted);\n}\n.jbw .jbw-qty {\n  font-size: 11px;\n  padding: 1px 8px;\n  border-radius: 10px;\n  background: var(--jbw-badge-bg);\n  color: var(--jbw-badge-ink);\n  border: 0.5px solid var(--jbw-line);\n}\n\n/* ---------- 钱粮收支页 ---------- */\n.jbw .jbw-money-tabs {\n  display: flex;\n  gap: 0;\n  margin-bottom: 12px;\n  border-bottom: 1px solid var(--jbw-line);\n}\n.jbw .jbw-money-tab {\n  font-family: inherit;\n  font-size: 13px;\n  letter-spacing: 3px;\n  padding: 8px 22px;\n  background: none;\n  border: none;\n  border-bottom: 2px solid transparent;\n  color: var(--jbw-muted);\n  cursor: pointer;\n  transition: color .15s ease;\n}\n.jbw .jbw-money-tab:hover { color: var(--jbw-accent); }\n.jbw .jbw-money-tab.on {\n  color: var(--jbw-accent);\n  border-bottom-color: var(--jbw-accent);\n  font-weight: 600;\n}\n.jbw .jbw-money-pane { display: none; }\n.jbw .jbw-money-pane.on { display: block; }\n.jbw .jbw-note p {\n  font-size: 12px;\n  color: var(--jbw-muted);\n  margin: 3px 0;\n}\n.jbw .jbw-note b {\n  color: var(--jbw-accent);\n  font-weight: 600;\n}\n\n.jbw .jbw-pills {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.jbw .jbw-pill {\n  font-size: 12px;\n  padding: 3px 10px;\n  border-radius: 12px;\n  background: var(--jbw-badge-bg);\n  color: var(--jbw-badge-ink);\n  border: 0.5px solid var(--jbw-line);\n}\n.jbw .jbw-pill b { margin-right: 4px; color: var(--jbw-ink); }\n\n.jbw .jbw-grain {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n  text-align: center;\n}\n.jbw .jbw-grain > div {\n  background: var(--jbw-track);\n  border-radius: 6px;\n  padding: 10px 6px;\n}\n.jbw .jbw-grain small {\n  display: block;\n  font-size: 11px;\n  color: var(--jbw-muted);\n  margin-bottom: 3px;\n}\n.jbw .jbw-grain b {\n  font-size: 16px;\n  color: var(--jbw-accent);\n}\n\n.jbw .jbw-goods {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 8px;\n}\n.jbw .jbw-good {\n  border: 0.5px solid var(--jbw-line);\n  border-radius: 6px;\n  padding: 8px 10px;\n}\n.jbw .jbw-good .gt {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  font-size: 13px;\n}\n.jbw .jbw-good .gt b { font-weight: 600; }\n.jbw .jbw-price {\n  font-size: 12px;\n  color: var(--jbw-gold);\n  font-weight: 600;\n}\n.jbw .jbw-price small {\n  font-size: 10px;\n  color: var(--jbw-muted);\n  font-weight: 400;\n}\n.jbw .jbw-good p {\n  font-size: 11px;\n  color: var(--jbw-muted);\n  margin: 4px 0;\n}\n.jbw .jbw-good .gs {\n  font-size: 11px;\n  color: var(--jbw-badge-ink);\n}\n\n/* ---------- 折叠面板（details） ---------- */\n.jbw .jbw-fold {\n  border: 0.5px solid var(--jbw-line);\n  border-radius: 8px;\n  background: var(--jbw-card);\n  margin-top: 12px;\n  overflow: hidden;\n}\n.jbw .jbw-fold > summary {\n  list-style: none;\n  cursor: pointer;\n  padding: 12px 16px;\n  font-size: 13px;\n  letter-spacing: 2px;\n  color: var(--jbw-accent);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  user-select: none;\n}\n.jbw .jbw-fold > summary::-webkit-details-marker { display: none; }\n.jbw .jbw-fold > summary::before {\n  content: \"▸\";\n  margin-right: 8px;\n  transition: transform .2s ease;\n  color: var(--jbw-gold);\n}\n.jbw .jbw-fold[open] > summary::before { transform: rotate(90deg); }\n.jbw .jbw-fold .jbw-fold-hint {\n  font-size: 11px;\n  color: var(--jbw-muted);\n  letter-spacing: 0;\n}\n.jbw .jbw-fold > .jbw-goods {\n  padding: 4px 16px 16px;\n}\n\n/* ---------- 买入按钮 / 兑换 ---------- */\n.jbw .jbw-buy-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-top: 8px;\n}\n.jbw .jbw-buy-row label {\n  font-size: 11px;\n  color: var(--jbw-muted);\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.jbw .jbw-buy-row input {\n  width: 56px;\n  padding: 4px 6px;\n  font: inherit;\n  font-size: 12px;\n  border: 0.5px solid var(--jbw-line);\n  border-radius: 6px;\n  background: var(--jbw-track);\n  color: var(--jbw-ink);\n}\n.jbw .jbw-btn {\n  font-family: inherit;\n  font-size: 12px;\n  letter-spacing: 1px;\n  padding: 5px 14px;\n  border-radius: 6px;\n  border: 0.5px solid var(--jbw-accent);\n  background: var(--jbw-accent);\n  color: #fff;\n  cursor: pointer;\n  transition: opacity .15s ease;\n}\n.jbw .jbw-btn:hover { opacity: .85; }\n.jbw .jbw-btn:disabled {\n  background: var(--jbw-track);\n  border-color: var(--jbw-line);\n  color: var(--jbw-muted);\n  cursor: not-allowed;\n}\n.jbw .jbw-good.sold-out { opacity: .55; }\n.jbw .jbw-pay {\n  font-size: 11px;\n  color: var(--jbw-muted);\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  margin-left: 8px;\n}\n.jbw .jbw-pay select {\n  font: inherit;\n  font-size: 11px;\n  padding: 2px 4px;\n  border: 0.5px solid var(--jbw-line);\n  border-radius: 5px;\n  background: var(--jbw-track);\n  color: var(--jbw-ink);\n}\n\n/* ---------- 钱庄水牌 ---------- */\n.jbw .jbw-exchange {\n  border: 0.5px solid var(--jbw-line);\n  border-radius: 8px;\n  background: var(--jbw-card);\n  margin-top: 12px;\n  padding: 14px 16px;\n}\n.jbw .jbw-exchange-head {\n  display: flex;\n  align-items: baseline;\n  gap: 10px;\n  font-size: 13px;\n  margin-bottom: 4px;\n}\n.jbw .jbw-exchange-head span { color: var(--jbw-muted); font-size: 11px; }\n.jbw .jbw-exchange-head b { color: var(--jbw-accent); letter-spacing: 2px; }\n.jbw .jbw-exchange-head i { font-style: normal; font-size: 11px; color: var(--jbw-gold); margin-left: auto; }\n.jbw .jbw-ex-row {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 12px;\n  padding: 5px 0;\n}\n.jbw .jbw-ex-row span { width: 96px; color: var(--jbw-ink); flex: none; }\n.jbw .jbw-ex-row input {\n  width: 80px;\n  padding: 4px 6px;\n  font: inherit;\n  font-size: 12px;\n  border: 0.5px solid var(--jbw-line);\n  border-radius: 6px;\n  background: var(--jbw-track);\n  color: var(--jbw-ink);\n}\n.jbw .jbw-ex-row .jbw-btn { padding: 4px 12px; }\n\n/* ---------- 人物志 ---------- */\n.jbw .jbw-portrait-group {\n  margin-bottom: 16px;\n}\n.jbw .jbw-portrait-grouphd {\n  font-size: 12px;\n  letter-spacing: 3px;\n  color: var(--jbw-accent);\n  border-left: 2px solid var(--jbw-accent);\n  padding-left: 8px;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.jbw .jbw-persons {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n}\n.jbw .jbw-person {\n  border: 0.5px solid var(--jbw-line);\n  border-radius: 8px;\n  background: var(--jbw-card);\n  padding: 10px 12px;\n}\n.jbw .jbw-person.jbw-person-hate {\n  border-left: 2px solid var(--jbw-accent);\n}\n.jbw .jbw-person-head {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 6px;\n}\n.jbw .jbw-avatar {\n  width: 40px;\n  height: 40px;\n  flex: none;\n  border-radius: 6px;\n  overflow: hidden;\n  background: var(--jbw-track);\n  border: 0.5px solid var(--jbw-line);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.jbw .jbw-avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.jbw .jbw-avatar-ph {\n  font-size: 18px;\n  font-weight: 600;\n  color: var(--jbw-gold);\n  letter-spacing: 1px;\n}\n.jbw .jbw-person-id {\n  flex: 1;\n  min-width: 0;\n}\n.jbw .jbw-person-id .nm {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--jbw-ink);\n}\n.jbw .jbw-person-id .role {\n  font-size: 11px;\n  color: var(--jbw-muted);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.jbw .jbw-person-flags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n  flex: none;\n  justify-content: flex-end;\n}\n.jbw .jbw-birth {\n  color: #8a5a9a;\n}\n\n/* ---------- 营伍军务 ---------- */\n.jbw .jbw-badge.mid { color: var(--jbw-gold); }\n.jbw .jbw-badge.gold { color: var(--jbw-gold); border-color: rgba(185,138,62,.5); }\n.jbw .jbw-badge.blue { color: var(--jbw-blue); border-color: rgba(63,125,168,.5); }\n\n/* 顶部统计栏 */\n.jbw .jbw-mil-stats {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.jbw .jbw-mil-stat {\n  background: var(--jbw-card);\n  border: 0.5px solid var(--jbw-line);\n  border-radius: 8px;\n  padding: 10px 6px;\n  text-align: center;\n}\n.jbw .jbw-mil-stat small {\n  display: block;\n  font-size: 11px;\n  color: var(--jbw-muted);\n  letter-spacing: 1px;\n  margin-bottom: 3px;\n}\n.jbw .jbw-mil-stat b {\n  font-size: 20px;\n  color: var(--jbw-accent);\n  font-weight: 600;\n}\n.jbw .jbw-mil-stat i {\n  font-style: normal;\n  font-size: 11px;\n  color: var(--jbw-muted);\n  margin-left: 2px;\n}\n\n/* 军务折叠面板 */\n.jbw .jbw-mil-fold {\n  margin-top: 8px;\n}\n.jbw .jbw-mil-fold:first-of-type {\n  margin-top: 0;\n}\n.jbw .jbw-mil-fold > .jbw-fold-body {\n  padding: 4px 16px 16px;\n}\n\n/* 军令条目 */\n.jbw .jbw-order-item {\n  font-size: 12px;\n  color: var(--jbw-ink);\n  padding: 6px 0;\n  border-bottom: 0.5px dashed var(--jbw-line);\n}\n.jbw .jbw-order-item:last-child { border-bottom: none; }\n\n\n.jbw .jbw-camps,\n.jbw .jbw-generals {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n}\n.jbw .jbw-camp,\n.jbw .jbw-general,\n.jbw .jbw-battle {\n  border: 0.5px solid var(--jbw-line);\n  border-radius: 8px;\n  padding: 10px 12px;\n  background: var(--jbw-card);\n}\n.jbw .jbw-camp {\n  border-top: 2px solid var(--jbw-gold);\n}\n.jbw .jbw-general {\n  border-left: 2px solid var(--jbw-gold);\n}\n.jbw .jbw-battle {\n  margin-bottom: 8px;\n}\n.jbw .jbw-battle:last-child { margin-bottom: 0; }\n.jbw .jbw-battle .tt {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 13px;\n}\n.jbw .jbw-battle .tt b { font-weight: 600; }\n\n.jbw .jbw-camp-head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 8px;\n}\n.jbw .jbw-camp-name {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--jbw-ink);\n}\n.jbw .jbw-camp-name b { font-weight: 600; }\n.jbw .jbw-camp-general {\n  display: block;\n  font-size: 11px;\n  font-weight: 400;\n  color: var(--jbw-muted);\n  margin-top: 2px;\n}\n.jbw .jbw-camp-stats {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: 6px;\n  margin-bottom: 8px;\n}\n.jbw .jbw-stat {\n  background: var(--jbw-track);\n  border-radius: 6px;\n  padding: 6px 2px;\n  text-align: center;\n}\n.jbw .jbw-stat small {\n  display: block;\n  font-size: 10px;\n  color: var(--jbw-muted);\n  margin-bottom: 2px;\n}\n.jbw .jbw-stat b {\n  font-size: 15px;\n  color: var(--jbw-accent);\n  font-weight: 600;\n}\n.jbw .jbw-warn {\n  font-size: 12px;\n  color: var(--jbw-accent);\n  margin: 3px 0 0;\n  font-weight: 600;\n}\n\n/* ---------- 时局任务 ---------- */\n/* 折叠面板 */\n.jbw .jbw-sit-fold {\n  margin-top: 10px;\n}\n.jbw .jbw-sit-fold > .jbw-fold-body {\n  padding: 4px 14px 14px;\n}\n\n/* 势力行式列表 */\n.jbw .jbw-powers {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.jbw .jbw-power-row {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n  text-align: left;\n  padding: 8px 10px;\n  border: 0.5px solid var(--jbw-line);\n  border-radius: 8px;\n  background: var(--jbw-card);\n  cursor: pointer;\n  font-family: inherit;\n  transition: background .12s ease, border-color .12s ease;\n}\n.jbw .jbw-power-row:hover {\n  background: var(--jbw-track);\n  border-color: var(--jbw-gold);\n}\n.jbw .jbw-power-seal {\n  flex: none;\n  width: 34px;\n  height: 34px;\n  border-radius: 4px;\n  background: var(--jbw-accent);\n  color: #fff;\n  font-size: 16px;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  letter-spacing: 1px;\n}\n.jbw .jbw-power-id {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.jbw .jbw-power-id .nm {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--jbw-ink);\n}\n.jbw .jbw-power-favor {\n  flex: none;\n  font-size: 12px;\n  color: var(--jbw-muted);\n}\n.jbw .jbw-power-favor.gold { color: var(--jbw-gold); }\n.jbw .jbw-power-favor.danger { color: var(--jbw-accent); }\n.jbw .jbw-power-arrow {\n  flex: none;\n  font-size: 20px;\n  line-height: 1;\n  color: var(--jbw-muted);\n}\n\n/* 待办事项卡片 */\n.jbw .jbw-todos {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.jbw .jbw-todo {\n  border: 0.5px solid var(--jbw-line);\n  border-left: 2px solid var(--jbw-gold);\n  border-radius: 8px;\n  padding: 10px 12px;\n  background: var(--jbw-card);\n}\n.jbw .jbw-todo .tt {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  font-size: 14px;\n  margin-bottom: 6px;\n}\n.jbw .jbw-todo .tt b {\n  font-weight: 600;\n  color: var(--jbw-ink);\n}\n\n/* 势力档案弹窗 / 私帷档案 / 地区态势弹窗（挂在 body，需自带变量兜底） */\n.jbw-modal-holder {\n  --jbw-card: #fffdf6;\n  --jbw-line: rgba(90, 70, 50, 0.22);\n  --jbw-ink: #3a2f28;\n  --jbw-muted: #8a7b6a;\n  --jbw-accent: #b23a3a;\n  --jbw-gold: #b98a3e;\n  --jbw-blue: #3f7da8;\n  --jbw-track: #ece4d6;\n  --jbw-badge-bg: #f1e8d8;\n  --jbw-badge-ink: #8a6b3a;\n  font-family: \"Noto Serif SC\", \"Songti SC\", \"SimSun\", \"KaiTi\", serif;\n}\n@media (prefers-color-scheme: dark) {\n  .jbw-modal-holder {\n    --jbw-card: #231d16;\n    --jbw-line: rgba(200, 170, 130, 0.22);\n    --jbw-ink: #e8dcc8;\n    --jbw-muted: #9a8a78;\n    --jbw-accent: #c04040;\n    --jbw-gold: #c4a56a;\n    --jbw-blue: #5b8fb8;\n    --jbw-track: #342c22;\n    --jbw-badge-bg: #33291d;\n    --jbw-badge-ink: #c4a56a;\n  }\n}\n.jbw-modal-holder .jbw-modal-mask {\n  position: fixed;\n  inset: 0;\n  background: rgba(20, 16, 10, 0.55);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n}\n.jbw-modal-holder .jbw-modal {\n  width: min(560px, 92vw);\n  max-height: 84vh;\n  overflow-y: auto;\n  background: var(--jbw-card);\n  border: 1px solid var(--jbw-gold);\n  border-radius: 10px;\n  padding: 16px 18px;\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);\n}\n.jbw-modal-holder .jbw-modal-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 4px;\n}\n.jbw-modal-holder .jbw-modal-label {\n  font-size: 11px;\n  letter-spacing: 2px;\n  color: var(--jbw-muted);\n}\n.jbw-modal-holder .jbw-modal-x {\n  border: none;\n  background: none;\n  font-size: 20px;\n  line-height: 1;\n  color: var(--jbw-muted);\n  cursor: pointer;\n  padding: 2px 6px;\n}\n.jbw-modal-holder .jbw-modal-x:hover { color: var(--jbw-ink); }\n.jbw-modal-holder .jbw-modal-title {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 10px;\n}\n.jbw-modal-holder .jbw-modal-title b {\n  font-size: 18px;\n  font-weight: 600;\n  color: var(--jbw-ink);\n}\n.jbw-modal-holder .jbw-modal-note {\n  font-size: 12px;\n  color: var(--jbw-muted);\n  line-height: 1.6;\n  margin: 8px 0;\n  padding: 8px 10px;\n  background: var(--jbw-track);\n  border-radius: 6px;\n}\n.jbw-modal-holder .jbw-bar {\n  margin: 6px 0;\n}\n.jbw-modal-holder .jbw-kv {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  margin-bottom: 4px;\n}\n.jbw-modal-holder .jbw-kv-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 13px;\n  padding: 4px 0;\n  border-bottom: 0.5px dashed var(--jbw-line);\n}\n.jbw-modal-holder .jbw-kv-row:last-child { border-bottom: none; }\n.jbw-modal-holder .jbw-kv-row .k {\n  color: var(--jbw-muted);\n}\n.jbw-modal-holder .jbw-kv-row .v {\n  color: var(--jbw-ink);\n  font-weight: 500;\n}\n\n/* 势力详情分节标题（弹窗内复用） */\n.jbw .jbw-sectitle,\n.jbw-modal-holder .jbw-sectitle {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--jbw-gold);\n  margin: 10px 0 6px;\n  padding-left: 8px;\n  border-left: 3px solid var(--jbw-gold);\n}\n.jbw .jbw-power-sublist,\n.jbw-modal-holder .jbw-power-sublist {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.jbw .jbw-power-general,\n.jbw .jbw-power-army,\n.jbw-modal-holder .jbw-power-general,\n.jbw-modal-holder .jbw-power-army {\n  border: 0.5px solid var(--jbw-line);\n  border-radius: 6px;\n  padding: 8px 10px;\n  background: var(--jbw-track);\n}\n.jbw .jbw-power-general .tt,\n.jbw .jbw-power-army .tt,\n.jbw-modal-holder .jbw-power-general .tt,\n.jbw-modal-holder .jbw-power-army .tt {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex-wrap: wrap;\n  font-size: 13px;\n  margin-bottom: 4px;\n}\n.jbw .jbw-power-general .tt b,\n.jbw .jbw-power-army .tt b,\n.jbw-modal-holder .jbw-power-general .tt b,\n.jbw-modal-holder .jbw-power-army .tt b {\n  font-weight: 600;\n  color: var(--jbw-ink);\n}\n\n/* ---------- 技术进展 ---------- */\n.jbw .jbw-techs {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.jbw .jbw-tech {\n  border: 0.5px solid var(--jbw-line);\n  border-left: 2px solid var(--jbw-gold);\n  border-radius: 8px;\n  padding: 10px 12px;\n  background: var(--jbw-card);\n}\n.jbw .jbw-tech-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  flex-wrap: wrap;\n  margin-bottom: 6px;\n}\n.jbw .jbw-tech-head b {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--jbw-ink);\n}\n.jbw .jbw-tech .jbw-bar {\n  margin: 4px 0;\n}\n.jbw .jbw-tech .jbw-bar .bk {\n  min-width: 34px;\n}\n\n/* ---------- 生平史记 ---------- */\n.jbw .jbw-his-fold {\n  margin-top: 10px;\n}\n.jbw .jbw-his-fold:first-of-type {\n  margin-top: 0;\n}\n.jbw .jbw-his-fold > .jbw-fold-body {\n  padding: 4px 14px 12px;\n}\n.jbw .jbw-event {\n  border: 0.5px solid var(--jbw-line);\n  border-left: 2px solid var(--jbw-gold);\n  border-radius: 8px;\n  padding: 10px 12px;\n  background: var(--jbw-card);\n  margin-bottom: 8px;\n}\n.jbw .jbw-event:last-child {\n  margin-bottom: 0;\n}\n.jbw .jbw-event-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  flex-wrap: wrap;\n  margin-bottom: 4px;\n}\n.jbw .jbw-event-head b {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--jbw-ink);\n}\n\n/* ---------- 人物谱系（ECharts 力导向关系图） ---------- */\n.jbw .jbw-graph-wrap {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.jbw .jbw-graph-toolbar {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  justify-content: space-between;\n  border: 0.5px solid var(--jbw-line);\n  border-radius: 12px;\n  background: var(--jbw-card);\n  padding: 10px 12px;\n}\n.jbw .jbw-graph-search {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  color: var(--jbw-muted);\n  font-size: 13px;\n  letter-spacing: .12em;\n}\n.jbw .jbw-graph-search input {\n  flex: 1;\n  min-width: 0;\n  border: 1px solid var(--jbw-line);\n  border-radius: 999px;\n  background: var(--jbw-track);\n  color: var(--jbw-ink);\n  padding: 8px 13px;\n  outline: none;\n  font: inherit;\n  letter-spacing: 0;\n}\n.jbw .jbw-graph-search input:focus {\n  border-color: var(--jbw-accent);\n  background: var(--jbw-card);\n}\n.jbw .jbw-mini-action {\n  flex-shrink: 0;\n  border: 1px solid var(--jbw-line);\n  border-radius: 999px;\n  background: var(--jbw-track);\n  color: var(--jbw-ink);\n  padding: 8px 16px;\n  cursor: pointer;\n  font: inherit;\n  font-size: 13px;\n}\n.jbw .jbw-mini-action:hover {\n  border-color: var(--jbw-gold);\n  color: var(--jbw-gold);\n}\n.jbw .jbw-graph-legend {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  justify-content: center;\n  margin-bottom: 4px;\n}\n.jbw .jbw-graph-legend-item {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: var(--jbw-muted);\n}\n.jbw .jbw-graph-legend-item i {\n  width: 18px;\n  height: 14px;\n  border-radius: 6px;\n  border: 1px solid var(--jbw-line);\n}\n.jbw .jbw-graph-stage {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 260px;\n  gap: 12px;\n  align-items: stretch;\n}\n.jbw #jbw-graph-wrapper {\n  position: relative;\n  width: 100%;\n  min-height: 460px;\n  border: 1px solid var(--jbw-line);\n  border-radius: 14px;\n  background: radial-gradient(circle at 50% 50%, var(--jbw-card), var(--jbw-track));\n  overflow: hidden;\n}\n.jbw #jbw-graph {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.jbw .jbw-graph-detail {\n  min-height: 460px;\n  border: 1px solid var(--jbw-line);\n  border-radius: 14px;\n  background: var(--jbw-card);\n  padding: 14px;\n  overflow-y: auto;\n}\n.jbw .jbw-graph-detail-card h3 {\n  margin: 0 0 6px;\n  color: var(--jbw-accent);\n  font-size: 22px;\n  letter-spacing: .08em;\n}\n.jbw .jbw-kicker {\n  margin: 0 0 4px;\n  color: var(--jbw-muted);\n  font-size: 12px;\n  letter-spacing: .2em;\n}\n.jbw .jbw-graph-detail-cat {\n  display: inline-flex;\n  border: 1px solid var(--jbw-line);\n  border-radius: 999px;\n  padding: 3px 10px;\n  margin-bottom: 10px;\n  color: var(--jbw-muted);\n  font-size: 12px;\n  background: var(--jbw-track);\n}\n.jbw .jbw-heart {\n  color: var(--jbw-muted);\n  font-size: 13px;\n  line-height: 1.7;\n  margin: 0 0 6px;\n}\n.jbw .jbw-graph-detail h4 {\n  margin: 14px 0 8px;\n  color: var(--jbw-accent);\n  font-size: 14px;\n  letter-spacing: .12em;\n}\n.jbw .jbw-graph-relations {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n}\n.jbw .jbw-graph-relation {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n  border: 1px solid var(--jbw-line);\n  border-radius: 10px;\n  background: var(--jbw-track);\n  padding: 8px 10px;\n  cursor: pointer;\n  text-align: left;\n  font: inherit;\n  transition: all .18s ease;\n}\n.jbw .jbw-graph-relation:hover {\n  border-color: var(--jbw-accent);\n  transform: translateX(3px);\n}\n.jbw .jbw-graph-relation b {\n  color: var(--jbw-ink);\n  font-weight: 600;\n  font-size: 14px;\n}\n.jbw .jbw-graph-relation span {\n  color: var(--jbw-muted);\n  font-size: 12px;\n}\n.jbw .jbw-graph-hint {\n  margin: 6px 0 0;\n  text-align: center;\n  color: var(--jbw-muted);\n  font-size: 12px;\n}\n@media (max-width: 900px) {\n  .jbw .jbw-graph-stage {\n    grid-template-columns: 1fr;\n  }\n  .jbw .jbw-graph-detail {\n    min-height: auto;\n  }\n  .jbw #jbw-graph-wrapper {\n    min-height: 380px;\n  }\n}\n\n/* ---------- toast 提示 ---------- */\n.jbw-toast {\n  position: fixed;\n  left: 50%;\n  bottom: 28px;\n  transform: translateX(-50%);\n  background: #231d16;\n  color: #e8dcc8;\n  font-family: \"Noto Serif SC\", \"Songti SC\", \"SimSun\", serif;\n  font-size: 13px;\n  letter-spacing: 1px;\n  padding: 10px 20px;\n  border-radius: 8px;\n  box-shadow: 0 4px 20px rgba(0,0,0,.4);\n  z-index: 99999;\n  display: none;\n  border-left: 3px solid #c4a56a;\n}\n.jbw-toast.ok { border-left-color: #6aa06a; }\n.jbw-toast.err { border-left-color: #c04040; }\n\n/* ---------- 风月阁（NSFW：同房点数 + 器物兑换） ---------- */\n/* 账牌：顶部同房点数展示 */\n.jbw .jbw-fy-ledger {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background: var(--jbw-card);\n  border: 0.5px solid var(--jbw-line);\n  border-left: 3px solid #8a5a9a;\n  border-radius: 8px;\n  padding: 12px 14px;\n  margin-bottom: 14px;\n}\n.jbw .jbw-fy-ledger-left {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n  color: var(--jbw-ink);\n}\n.jbw .jbw-fy-ledger-left b {\n  font-size: 20px;\n  color: #8a5a9a;\n  font-weight: 600;\n}\n.jbw .jbw-fy-coin {\n  font-size: 20px;\n  color: #8a5a9a;\n  line-height: 1;\n}\n.jbw .jbw-fy-ledger-hint {\n  font-size: 11px;\n  color: var(--jbw-muted);\n  letter-spacing: 1px;\n}\n\n/* 双栏布局：左货架 / 右我的器物 */\n.jbw .jbw-fy-cols {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.jbw .jbw-fy-col {\n  min-width: 0;\n}\n.jbw .jbw-fy-h {\n  font-size: 13px;\n  color: var(--jbw-accent);\n  margin: 0 0 10px;\n  letter-spacing: 1px;\n  font-weight: 600;\n}\n\n/* 器物分类折叠 */\n.jbw .jbw-fy-cat {\n  margin-bottom: 8px;\n}\n.jbw .jbw-fy-cat > .jbw-fold-body {\n  padding: 4px 12px 12px;\n}\n.jbw .jbw-fy-grid {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n/* 单件器物卡 */\n.jbw .jbw-fy-item {\n  display: flex;\n  align-items: stretch;\n  gap: 8px;\n  border: 0.5px solid var(--jbw-line);\n  border-radius: 8px;\n  padding: 10px 12px;\n  background: var(--jbw-card);\n}\n.jbw .jbw-fy-item-body {\n  flex: 1;\n  min-width: 0;\n}\n.jbw .jbw-fy-item-title {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  font-size: 13px;\n  margin-bottom: 4px;\n}\n.jbw .jbw-fy-item-title b {\n  font-weight: 600;\n  color: var(--jbw-ink);\n}\n.jbw .jbw-fy-price {\n  font-size: 11px;\n  color: #8a5a9a;\n  flex: none;\n  letter-spacing: 1px;\n}\n.jbw .jbw-fy-desc {\n  font-size: 12px;\n  color: var(--jbw-muted);\n  margin: 0;\n  line-height: 1.5;\n}\n.jbw .jbw-fy-owned {\n  display: inline-block;\n  font-size: 11px;\n  color: #8a5a9a;\n  margin-top: 4px;\n}\n.jbw .jbw-fy-buy {\n  flex: none;\n  align-self: center;\n  font-family: inherit;\n  font-size: 12px;\n  letter-spacing: 1px;\n  padding: 5px 12px;\n  border-radius: 6px;\n  border: 0.5px solid rgba(138,90,154,.4);\n  background: transparent;\n  color: #8a5a9a;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: background .12s ease, color .12s ease;\n}\n.jbw .jbw-fy-buy:hover {\n  background: #8a5a9a;\n  color: #fff;\n}\n.jbw .jbw-fy-buy:disabled {\n  opacity: .4;\n  cursor: not-allowed;\n}\n\n/* 我的器物清单 */\n.jbw .jbw-fy-owned-list {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.jbw .jbw-fy-owned-item {\n  border: 0.5px solid var(--jbw-line);\n  border-radius: 8px;\n  padding: 10px 12px;\n  background: var(--jbw-card);\n}\n\n/* 窄屏回落单栏 */\n@media (max-width: 520px) {\n  .jbw .jbw-fy-cols {\n    grid-template-columns: 1fr;\n  }\n}\n\n/* ---------- 天下舆图（架空 SVG 示意地图） ---------- */\n.jbw .jbw-map-toolbar {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 10px;\n}\n.jbw .jbw-map-mode-label {\n  font-size: 11px;\n  color: var(--jbw-muted);\n  letter-spacing: 2px;\n}\n.jbw .jbw-map-mode {\n  font-family: inherit;\n  font-size: 12px;\n  letter-spacing: 1px;\n  padding: 4px 14px;\n  border-radius: 14px;\n  border: 0.5px solid var(--jbw-line);\n  background: var(--jbw-track);\n  color: var(--jbw-muted);\n  cursor: pointer;\n  transition: all .15s ease;\n}\n.jbw .jbw-map-mode.on {\n  background: var(--jbw-accent);\n  border-color: var(--jbw-accent);\n  color: #fff;\n}\n.jbw .jbw-map-legend {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px 14px;\n  margin-bottom: 12px;\n}\n.jbw .jbw-map-lg {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 11px;\n  color: var(--jbw-muted);\n}\n.jbw .jbw-map-lg i {\n  width: 10px;\n  height: 10px;\n  border-radius: 2px;\n  flex: none;\n}\n.jbw .jbw-map-stage {\n  border: 1px solid var(--jbw-line);\n  border-radius: 8px;\n  background: var(--jbw-track);\n  overflow: hidden;\n}\n.jbw .jbw-map-svg {\n  display: block;\n  width: 100%;\n  height: auto;\n}\n.jbw .jbw-map-bg {\n  fill: var(--jbw-card);\n}\n.jbw .jbw-map-river {\n  stroke: #3d5a70;\n  stroke-width: 1;\n}\n.jbw .jbw-map-river-label {\n  fill: #eaf2f7;\n  font-size: 22px;\n  letter-spacing: 10px;\n  text-anchor: middle;\n  font-family: inherit;\n  paint-order: stroke;\n  stroke: #2c3e4d;\n  stroke-width: 3px;\n  stroke-linejoin: round;\n  font-weight: 600;\n}\n.jbw .jbw-map-region {\n  stroke: rgba(120, 80, 40, 0.5);\n  stroke-width: 1.2;\n  cursor: pointer;\n  transition: opacity .15s ease, filter .15s ease;\n}\n.jbw .jbw-map-region:hover {\n  filter: brightness(1.15);\n  opacity: .92;\n}\n.jbw .jbw-map-region-label {\n  fill: #fff;\n  font-size: 13px;\n  text-anchor: middle;\n  pointer-events: none;\n  font-family: inherit;\n  letter-spacing: 1px;\n  text-shadow: 0 1px 2px rgba(0,0,0,.6);\n}\n.jbw .jbw-map-hint {\n  font-size: 11px;\n  color: var(--jbw-muted);\n  text-align: center;\n  margin-top: 10px;\n}\n.jbw .jbw-map-powers {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-top: 4px;\n}\n.jbw .jbw-map-power {\n  border: 0.5px solid var(--jbw-line);\n  border-radius: 6px;\n  padding: 8px 10px;\n}\n.jbw .jbw-map-power .jbw-meta {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 12px;\n  margin-bottom: 4px;\n}\n.jbw .jbw-map-power .jbw-meta span { color: var(--jbw-ink); font-weight: 600; }\n.jbw .jbw-map-power .jbw-meta b { color: var(--jbw-gold); font-weight: 500; font-size: 11px; }\n.jbw .jbw-map-line {\n  font-size: 11px;\n  color: var(--jbw-muted);\n  margin: 3px 0 0;\n}\n\n/* ===== 天下舆图（ECharts 东晋历史地图） ===== */\n.jbw .jbw-map-stage #jbw-map {\n  width: 100%;\n  height: 560px;\n}\n.jbw .jbw-map-fallback {\n  padding: 60px 20px;\n  text-align: center;\n  font-size: 13px;\n  color: var(--jbw-muted);\n  letter-spacing: 1px;\n}\n\n/* 争夺状态徽标（州郡舆图弹窗内） */\n.jbw-map-badge {\n  display: inline-block;\n  padding: 0 8px;\n  border-radius: 3px;\n  font-size: 11px;\n  line-height: 1.7;\n  color: #fff;\n  vertical-align: 1px;\n}\n.jbw-map-badge.war { background: #bf5b46; }\n.jbw-map-badge.stable { background: #7b9b6a; }\n.jbw-map-badge.turmoil { background: #c49750; }\n.jbw-map-badge.contested { background: #9c6a3a; }\n.jbw-map-badge.unknown { background: #8a8a8a; }\n\n/* 州郡舆图详情弹窗 */\n.jbw-modal-holder .jbw-map-modal {\n  width: min(560px, 92vw);\n  max-height: 86vh;\n  display: flex;\n  flex-direction: column;\n}\n.jbw-modal-holder .jbw-map-modal-scroll {\n  overflow-y: auto;\n  flex: 1;\n  min-height: 0;\n}\n.jbw-modal-holder .jbw-map-force {\n  margin: 8px 0;\n  padding: 10px 12px;\n  background: var(--jbw-track);\n  border-radius: 6px;\n}\n.jbw-modal-holder .jbw-map-force-head {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  margin-bottom: 6px;\n}\n.jbw-modal-holder .jbw-map-force-head .fn {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--jbw-ink);\n}\n.jbw-modal-holder .jbw-map-force-head .fi {\n  font-size: 12px;\n  color: var(--jbw-accent);\n}\n.jbw-modal-holder .jbw-map-force-head .fi b {\n  font-size: 15px;\n}\n.jbw-modal-holder .jbw-map-force .jbw-bar .fl.high {\n  background: linear-gradient(90deg, #c9a86a, #a43d2d);\n}\n.jbw-modal-holder .jbw-map-line2 {\n  margin-top: 6px;\n  font-size: 12.5px;\n  color: var(--jbw-ink);\n  line-height: 1.7;\n}\n.jbw-modal-holder .jbw-map-line2 .t {\n  color: var(--jbw-muted);\n}\n\n\n/* ============================================================\n   悬浮窗外壳：折叠按钮 + 悬浮面板 + 左侧导航\n   ============================================================ */\n.jbw-fab {\n  position: fixed;\n  right: 18px;\n  bottom: 22px;\n  z-index: 99990;\n  width: 46px;\n  height: 46px;\n  border-radius: 50%;\n  border: 1px solid var(--jbw-gold, #b98a3e);\n  background: linear-gradient(135deg, #b23a3a, #8f2c2c);\n  color: #f6e9d2;\n  font-family: \"Noto Serif SC\", \"Songti SC\", \"SimSun\", \"KaiTi\", serif;\n  font-size: 20px;\n  font-weight: 700;\n  line-height: 1;\n  cursor: pointer;\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: transform 0.15s ease;\n}\n.jbw-fab:hover {\n  transform: scale(1.08);\n}\n.jbw-shell {\n  position: fixed;\n  right: 18px;\n  bottom: 18px;\n  z-index: 99991;\n  width: 820px;\n  max-width: calc(100vw - 36px);\n  height: 78vh;\n  max-height: 660px;\n  display: flex;\n  flex-direction: column;\n  border: 1px solid var(--jbw-line, rgba(90, 70, 50, 0.22));\n  border-radius: 12px;\n  overflow: hidden;\n  background: var(--jbw-card, #fffdf6);\n  color: var(--jbw-ink, #3a2f28);\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);\n  font-family: \"Noto Serif SC\", \"Songti SC\", \"SimSun\", \"KaiTi\", serif;\n  line-height: 1.6;\n}\n.jbw-shell-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 16px;\n  background: linear-gradient(90deg, #b23a3a, #8f2c2c);\n  color: #f6e9d2;\n  flex: 0 0 auto;\n}\n.jbw-shell-title {\n  font-size: 15px;\n  letter-spacing: 4px;\n  font-weight: 600;\n}\n.jbw-shell-close {\n  border: none;\n  background: transparent;\n  color: #f6e9d2;\n  font-size: 22px;\n  line-height: 1;\n  cursor: pointer;\n  padding: 0 4px;\n}\n.jbw-shell-body {\n  display: flex;\n  flex: 1 1 auto;\n  min-height: 0;\n}\n.jbw-shell-nav {\n  width: 132px;\n  flex: 0 0 132px;\n  border-right: 1px solid var(--jbw-line, rgba(90, 70, 50, 0.22));\n  background: var(--jbw-badge-bg, #f1e8d8);\n  padding: 10px 0;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.jbw-nav-item {\n  display: block;\n  width: 100%;\n  text-align: left;\n  border: none;\n  background: transparent;\n  color: var(--jbw-ink, #3a2f28);\n  font-family: inherit;\n  font-size: 13px;\n  padding: 9px 16px;\n  cursor: pointer;\n  letter-spacing: 1px;\n  border-left: 3px solid transparent;\n  transition: background 0.12s ease, color 0.12s ease;\n}\n.jbw-nav-item:hover {\n  background: rgba(178, 58, 58, 0.08);\n}\n.jbw-nav-item.on {\n  background: rgba(178, 58, 58, 0.14);\n  color: var(--jbw-accent, #b23a3a);\n  border-left-color: var(--jbw-accent, #b23a3a);\n  font-weight: 600;\n}\n.jbw-shell-content {\n  flex: 1 1 auto;\n  min-width: 0;\n  overflow-y: auto;\n  padding: 14px 16px;\n}\n@media (prefers-color-scheme: dark) {\n  .jbw-shell {\n    background: #231d16;\n  }\n  .jbw-shell-nav {\n    background: #33291d;\n  }\n}\n";

// ============================================================
// 《江山北望》卡内前端 —— 总览仪表盘（本地化，零云端）
// ============================================================
// 作用：读取 MVU 插件注入的变量快照 stat_data，渲染「总览」仪表盘
// 依赖：酒馆助手 MVU 插件的 {{format_message_variable::stat_data}} 宏
// 容错：所有取值走 ln()（可选链兜底）+ clamp()（数值钳制），字段缺失不报错
// ============================================================

(function () {
  'use strict';

  // ============================================================
  // 宿主 document 重定向（关键，照搬原卡 statusbar 源码）
  // 原卡写法：const g=()=>window.parent??window; const h=()=>g().document??document;
  // 酒馆助手脚本运行在 iframe 中，裸 document 指向 iframe 自身；
  // window.parent 是宿主酒馆页面的 window，window.parent.document 是宿主 document。
  // 这里把本 IIFE 内的 document 重定向为宿主 document，使下面所有
  // document.createElement / body / querySelector 都落到酒馆页面。
  // ============================================================
  var __globalDoc = (typeof document !== 'undefined') ? document : null;
  var __hostWin = (function () {
    try {
      if (typeof window !== 'undefined' && window.parent && window.parent !== window) return window.parent;
    } catch (e) {}
    return (typeof window !== 'undefined') ? window : null;
  })();
  var __hostDoc = (function () {
    try {
      if (__hostWin && __hostWin.document) return __hostWin.document;
    } catch (e) {}
    return __globalDoc;
  })();
  var document = __hostDoc;

  // ---------- 容错地基函数（照搬原卡 MagVarUpdate 的设计） ----------

  // ln(obj, 'a.b.c', 默认值)：按点路径安全取值，路径任一环为 null/undefined 返回默认值
  function ln(obj, path, fallback) {
    if (obj == null) return fallback;
    const segs = String(path).split('.').filter(Boolean);
    let cur = obj;
    for (let i = 0; i < segs.length; i++) {
      if (cur == null) return fallback;
      cur = cur[segs[i]];
    }
    return (cur == null || cur === '') ? fallback : cur;
  }

  // pn(v, 默认值)：数值容错，非数字/非有限值返回默认值
  function pn(v, fallback) {
    const n = Number(v);
    return Number.isFinite(n) ? n : (fallback == null ? 0 : fallback);
  }

  // clamp(v, min, max)：数值钳制，越界拉回
  function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
  }

  // ---------- 声望 8 档称号映射 ----------
  function repLevel(v) {
    if (v <= -800) return '遗臭万年';
    if (v <= -500) return '千夫所指';
    if (v <= -200) return '声名狼藉';
    if (v < 0)     return '毁誉参半';
    if (v < 200)   return '默默无闻';
    if (v < 500)   return '小有声名';
    if (v < 800)   return '声名鹊起';
    return '名垂千古';
  }

  // ---------- 五维字段（含 range 定义，用于 clamp） ----------
  const FIVE_DIMS = [
    { key: '生命', range: [0, 100] },
    { key: '武力', range: [0, 100] },
    { key: '统率', range: [0, 100] },
    { key: '智谋', range: [0, 100] },
    { key: '政治', range: [0, 100] },
  ];

  // ---------- 场景徽标映射 ----------
  function sceneBadge(scene) {
    if (scene === 'WAR')  return { text: '战', cls: 'war' };
    if (scene === 'NSFW') return { text: '私', cls: 'private' };
    return { text: '常', cls: 'safe' };
  }

  // ---------- 主渲染函数：stat_data → 总览 HTML ----------
  function renderOverview(stat) {
    const world = stat && stat['世界运转'] ? stat['世界运转'] : {};
    const hero = stat && stat['主角'] ? stat['主角'] : {};
    const tasks = (stat && stat['时局与任务'] && stat['时局与任务']['未决事项']) || {};

    // 顶部横幅：日期 + 时间 + 地点
    const hh = String(pn(ln(world, '二十四时.小时', 0), 0)).padStart(2, '0');
    const mm = String(pn(ln(world, '二十四时.分钟', 0), 0)).padStart(2, '0');
    const date = ln(world, '当前日期', '未载日期');
    const year = ln(world, '公元年份', '未载');
    const shichen = ln(world, '十二时辰.时辰', '卯时') + ln(world, '十二时辰.刻', '三刻');
    const weather = ln(world, '天气', '未载天气');
    const place = ln(world, '当前地点', '未载地点');
    const scene = sceneBadge(ln(world, '场景', 'SFW'));

    // 此身：官职 + 声望
    const post = ln(hero, '官职', '未载');
    const rep = clamp(pn(ln(hero, '声望', 0), 0), -1000, 1000);
    const repText = rep + ' · ' + repLevel(rep);

    // 五维进度条
    let barsHtml = '';
    for (const d of FIVE_DIMS) {
      const raw = pn(ln(hero, '五维.' + d.key, 0), 0);
      const v = clamp(raw, d.range[0], d.range[1]);
      const pct = clamp((v - d.range[0]) / (d.range[1] - d.range[0]) * 100, 0, 100);
      barsHtml += `
        <div class="jbw-bar">
          <span class="bk">${d.key}</span>
          <div class="tr"><div class="fl" style="width:${pct}%"></div></div>
          <span class="bv">${Math.round(v)}</span>
        </div>`;
    }

    // 未决之事（最多 5 条）
    let tasksHtml = '';
    const taskKeys = Object.keys(tasks).slice(0, 5);
    if (!taskKeys.length) {
      tasksHtml = '<p class="jbw-empty">眼下暂无明记之事。</p>';
    } else {
      for (const k of taskKeys) {
        const it = tasks[k] || {};
        const st = ln(it, '状态', '待处理');
        const summary = ln(it, '概要', '暂无概要');
        tasksHtml += `
          <div class="jbw-item">
            <div class="tt"><b>${k}</b><span class="jbw-badge">${st}</span></div>
            <p>${summary}</p>
          </div>`;
      }
    }

    // 组装
    return `
<div class="jbw">
  <div class="jbw-top">
    <span class="jbw-brand"><b>江山北望</b></span>
    <span class="jbw-tag">总览 <i class="${scene.cls}">${scene.text}</i></span>
  </div>
  <div class="jbw-hero">
    <h3>${date}</h3>
    <div class="sub">公元${year}年 · ${shichen} / ${hh}:${mm} · ${weather}</div>
    <div class="place">${place}</div>
  </div>
  <div class="jbw-grid">
    <div class="jbw-card">
      <div class="hd">此身</div>
      <div class="jbw-row"><span class="k">官职</span><span class="v">${post}</span></div>
      <div class="jbw-row"><span class="k">声望</span><span class="v">${repText}</span></div>
      <div class="jbw-sp"></div>
      ${barsHtml}
    </div>
    <div class="jbw-card">
      <div class="hd">未决之事</div>
      ${tasksHtml}
    </div>
  </div>
</div>`;
  }

  // ---------- 个人信息页渲染函数 ----------
  function renderSelf(stat) {
    const hero = stat && stat['主角'] ? stat['主角'] : {};
    const five = hero['五维'] || {};
    const items = hero['私库'] && hero['私库']['重要物品'] ? hero['私库']['重要物品'] : {};

    // 履历：官职 + 声望 + 声望阶段
    const post = ln(hero, '官职', '未载');
    const rep = clamp(pn(ln(hero, '声望', 0), 0), -1000, 1000);
    const repStage = ln(hero, '声望阶段', repLevel(rep));

    // 五维进度条
    let barsHtml = '';
    for (const d of FIVE_DIMS) {
      const raw = pn(ln(five, d.key, 0), 0);
      const v = clamp(raw, d.range[0], d.range[1]);
      const pct = clamp((v - d.range[0]) / (d.range[1] - d.range[0]) * 100, 0, 100);
      barsHtml += `
        <div class="jbw-bar">
          <span class="bk">${d.key}</span>
          <div class="tr"><div class="fl" style="width:${pct}%"></div></div>
          <span class="bv">${Math.round(v)}</span>
        </div>`;
    }

    // 随身要物
    let itemsHtml = '';
    const itemKeys = Object.keys(items);
    if (!itemKeys.length) {
      itemsHtml = '<p class="jbw-empty">暂无重要物品。</p>';
    } else {
      for (const k of itemKeys) {
        const it = items[k] || {};
        const qty = pn(ln(it, '数量', 1), 1);
        const desc = ln(it, '简介', '无简介');
        itemsHtml += `
          <div class="jbw-item">
            <div class="tt"><b>${k}</b><span class="jbw-qty">×${Math.round(qty)}</span></div>
            <p>${desc}</p>
          </div>`;
      }
    }

    return `
<div class="jbw">
  <div class="jbw-top">
    <span class="jbw-brand"><b>江山北望</b></span>
    <span class="jbw-tag">个人信息</span>
  </div>
  <div class="jbw-grid">
    <div class="jbw-card">
      <div class="hd">履历</div>
      <div class="jbw-row"><span class="k">官职</span><span class="v">${post}</span></div>
      <div class="jbw-row"><span class="k">声望</span><span class="v">${rep}</span></div>
      <div class="jbw-row"><span class="k">声望阶段</span><span class="v">${repStage}</span></div>
    </div>
    <div class="jbw-card">
      <div class="hd">五维</div>
      ${barsHtml}
    </div>
  </div>
  <div class="jbw-card" style="margin-top:12px;">
    <div class="hd">随身要物</div>
    ${itemsHtml}
  </div>
</div>`;
  }

  // ============================================================
  // 钱粮收支页 —— 经济数据与派生计算
  // ============================================================

  // 16 种商品表（通用经济数据，币种可后续替换）
  const GOODS = [
    { id: 'rice', name: '稻米', cat: '粮食', unit: '石', price: 0.6,  stock: 200, desc: '南方常见主粮，可直接充作军粮或赈济用粮。' },
    { id: 'wheat', name: '小麦', cat: '粮食', unit: '石', price: 0.55, stock: 150, desc: '耐储耐运，磨面后便于行军携带。' },
    { id: 'millet', name: '粟米', cat: '粮食', unit: '石', price: 0.5,  stock: 150, desc: '北地常用口粮，炊煮方便，适合作为营中军粮。' },
    { id: 'mixed_grain', name: '杂粮', cat: '粮食', unit: '石', price: 0.4,  stock: 200, desc: '高粱、大麦与荞麦等混装粗粮，价廉而耐放。' },
    { id: 'soybean', name: '黄豆', cat: '粮食', unit: '石', price: 0.65, stock: 80,  desc: '可煮食、磨浆或制成豆食，适合补充军粮。' },
    { id: 'fodder', name: '草料', cat: '粮食', unit: '石', price: 0.2,  stock: 200, desc: '供牲畜与运输畜力消耗，不计入士卒口粮。' },
    { id: 'spear', name: '长枪', cat: '军需', unit: '杆', price: 0.18, stock: 200, desc: '木杆铁首的基础长兵，适合成批装备步卒。' },
    { id: 'sabre_shield', name: '刀盾', cat: '军需', unit: '套', price: 0.6,  stock: 100, desc: '腰刀与藤木盾成套出售，供近战兵卒使用。' },
    { id: 'bow_arrow', name: '弓箭', cat: '军需', unit: '套', price: 0.8,  stock: 100, desc: '步弓一张配常用箭矢，适合基础弓手操练。' },
    { id: 'cotton_armour', name: '棉甲', cat: '军需', unit: '领', price: 1.5, stock: 100, desc: '多层棉布缀甲片制成，价格与防护较为均衡。' },
    { id: 'salt', name: '食盐', cat: '常用物资', unit: '斤', price: 0.035, stock: 500, desc: '炊食、腌藏与赈济皆不可缺少的民生物资。' },
    { id: 'cotton_cloth', name: '棉布', cat: '常用物资', unit: '匹', price: 0.25, stock: 100, desc: '可制衣被、军服、包扎布与各类日常用品。' },
    { id: 'pig_iron', name: '生铁', cat: '常用物资', unit: '斤', price: 0.03, stock: 1000, desc: '打造农具、修补军械和作坊生产所需原料。' },
    { id: 'timber', name: '木料', cat: '常用物资', unit: '方', price: 0.08, stock: 100, desc: '用于修缮房舍、车辆、仓场与简易工事。' },
    { id: 'medicine', name: '药材', cat: '常用物资', unit: '份', price: 0.12, stock: 100, desc: '常用内外伤药材合包，适合药铺与军营储备。' },
    { id: 'vegetable_oil', name: '菜油', cat: '常用物资', unit: '斤', price: 0.02, stock: 300, desc: '可供炊食、照明及部分作坊生产使用。' },
  ];
  const GOODS_CATS = ['粮食', '军需', '常用物资'];
  const GOODS_CAT_NAME = { '粮食': '五谷粮秣', '军需': '基础军需', '常用物资': '民生物料' };

  // 判断某仓储项是否为「可食军粮」（单位=石 且 名称含粮类关键词）
  const GRAIN_KW = ['粮', '稻', '麦', '粟', '米', '豆', '草料', '高粱', '大麦', '荞麦'];
  function isGrain(name, unit) {
    if (unit !== '石') return false;
    const s = String(name);
    return GRAIN_KW.some(k => s.includes(k));
  }

  // 养军军费 + 军粮：从「军事.各营」按人数估算（简化版，与总览/军务共用口径）
  // 每营：军费按人数*基准，军粮按人数*口粮。无真实营伍数据时返回 0。
  function militaryCost(stat) {
    const camps = (stat && stat['军事'] && stat['军事']['各营']) || {};
    let cost = 0, grain = 0, people = 0;
    for (const k of Object.keys(camps)) {
      const c = camps[k] || {};
      const n = pn(c['人数'], 0);
      if (n <= 0) continue;
      // 每兵月饷约 0.5 两、月粮约 0.05 石（与原卡口径接近的简化值）
      cost += n * 0.5;
      grain += n * 0.05;
      people += n;
    }
    return { cost: Math.round(cost), grain: Math.round(grain), people: Math.round(people) };
  }

  // 资产月入合计
  function assetIncome(assets) {
    let total = 0;
    for (const k of Object.keys(assets || {})) {
      const a = assets[k] || {};
      const v = pn(a['月入'], 0);
      if (Number.isFinite(v)) total += v;
    }
    return Math.round(total);
  }

  // 可食军粮合计
  function edibleGrain(storage) {
    let total = 0;
    for (const k of Object.keys(storage || {})) {
      const it = storage[k] || {};
      if (isGrain(k, it['单位'])) total += Math.max(0, pn(it['数量'], 0));
    }
    return total;
  }

  // ---------- 钱粮收支页渲染 ----------
  function renderMoney(stat) {
    const hero = (stat && stat['主角']) || {};
    const econ = (stat && stat['经济']) || {};
    const purse = (hero['私库'] && hero['私库']['金银铜']) || {};
    const assets = econ['资产'] || {};
    const storage = econ['仓储'] || {};
    const settle = econ['上次结算'] || null;
    const market = econ['市场'] || {};   // 汇率 / 价格指数 / 市况 / 库存

    const gold = pn(purse['黄金'], 0);
    const silver = pn(purse['白银'], 0);
    const copper = pn(purse['铜钱'], 0);

    // 汇率（默认 1金=6银，1银=1200文）
    const rateGold = pn(ln(market, '汇率.一两黄金兑白银', 6), 6);
    const rateSilver = pn(ln(market, '汇率.一两白银兑铜钱', 1200), 1200);

    const income = assetIncome(assets);
    const mil = militaryCost(stat);
    const grain = edibleGrain(storage);
    const monthEst = income - mil.cost;
    const sustain = mil.grain > 0 ? (grain / mil.grain) : null;

    // 资产列表
    let assetHtml = '';
    const assetKeys = Object.keys(assets);
    if (!assetKeys.length) {
      assetHtml = '<p class="jbw-empty">暂无资产。</p>';
    } else {
      for (const k of assetKeys) {
        const a = assets[k] || {};
        assetHtml += `
          <div class="jbw-item">
            <div class="tt"><b>${k}</b><span class="jbw-badge">${pn(a['月入'], 0)} 两/月</span></div>
            <p>${ln(a, '说明', '无说明')}</p>
          </div>`;
      }
    }

    // 仓储概览
    let storeHtml = '';
    const storeKeys = Object.keys(storage);
    if (!storeKeys.length) {
      storeHtml = '<p class="jbw-empty">仓储空空如也。</p>';
    } else {
      storeHtml = '<div class="jbw-pills">';
      for (const k of storeKeys) {
        const it = storage[k] || {};
        storeHtml += `<span class="jbw-pill"><b>${k}</b>${pn(it['数量'], 0)}${ln(it, '单位', '')}</span>`;
      }
      storeHtml += '</div>';
    }

    // 上次结算快照
    let settleHtml = '';
    if (settle && typeof settle === 'object') {
      const rows = [];
      rows.push(`${ln(settle, '类型', '自动跨月结算')} · ${ln(settle, '日期', '未载日期')}`);
      rows.push(`资产月入 ${pn(settle['资产月入'], 0)} 两${settle['军费支出'] ? ' · 军费 ' + settle['军费支出'] + ' 两' : ''}`);
      const extra = [];
      if (settle['仓储耗粮']) extra.push(`耗粮 ${settle['仓储耗粮']} 石`);
      if (settle['折银补粮']) extra.push(`折银 ${settle['折银补粮']} 两`);
      if (extra.length) rows.push(extra.join(' · '));
      rows.push(`私库 ${pn(settle['私库变动'], 0) >= 0 ? '+' : ''}${pn(settle['私库变动'], 0)} 两 → 余额 ${pn(settle['私库余额'], 0)} 两`);
      settleHtml = rows.map(r => `<p>${r}</p>`).join('');
    } else {
      settleHtml = '<p class="jbw-empty">尚未跨月结算。</p>';
    }

    // 商品表（市集）—— 可折叠 + 可买入
    let marketHtml = '';
    for (const cat of GOODS_CATS) {
      const items = GOODS.filter(g => g.cat === cat);
      let itemHtml = '';
      for (const g of items) {
        // 库存 = 月供 - 已售（从市场快照读，无快照则默认满供）
        const remain = clamp(pn(marketStock(g.id, econ), g.stock), 0, g.stock);
        const soldOut = remain <= 0;
        itemHtml += `
          <div class="jbw-good${soldOut ? ' sold-out' : ''}">
            <div class="gt"><b>${g.name}</b><span class="jbw-price">${g.price} 两/<small>${g.unit}</small></span></div>
            <p>${g.desc}</p>
            <div class="gs">本月余货 ${remain} / ${g.stock} ${g.unit}</div>
            <div class="jbw-buy-row">
              <label>数量 <input type="number" min="1" max="${remain}" step="1" value="1" data-jbw-qty ${soldOut ? 'disabled' : ''}></label>
              <button type="button" class="jbw-btn" data-action="jbw-buy" data-item-id="${g.id}" ${soldOut ? 'disabled' : ''}>${soldOut ? '本月售罄' : '买入'}</button>
            </div>
          </div>`;
      }
      marketHtml += `
        <details class="jbw-fold" data-fold="goods-${cat}">
          <summary>${GOODS_CAT_NAME[cat]} <span class="jbw-fold-hint">${items.length} 种</span></summary>
          <div class="jbw-goods">${itemHtml}</div>
        </details>`;
    }

    // 钱庄水牌（金银兑钱）
    const exchangeHtml = `
        <div class="jbw-exchange">
          <div class="jbw-exchange-head"><span>钱庄水牌</span><b>金银兑钱</b><i>双向折价 3%</i></div>
          <p class="jbw-empty" style="margin:6px 0">市价 1 金兑 ${rateGold} 两银，1 银兑 ${rateSilver} 文。兑入兑出均按钱庄折价。</p>
          <div class="jbw-ex-row">
            <span>黄金 → 白银</span>
            <input type="number" min="1" step="1" value="1" data-jbw-ex="sell-gold">
            <button type="button" class="jbw-btn" data-action="jbw-ex" data-kind="sell-gold">兑银</button>
          </div>
          <div class="jbw-ex-row">
            <span>白银 → 黄金</span>
            <input type="number" min="1" step="1" value="1" data-jbw-ex="buy-gold">
            <button type="button" class="jbw-btn" data-action="jbw-ex" data-kind="buy-gold">兑金</button>
          </div>
          <div class="jbw-ex-row">
            <span>白银 → 铜钱</span>
            <input type="number" min="1" step="1" value="1" data-jbw-ex="sell-silver">
            <button type="button" class="jbw-btn" data-action="jbw-ex" data-kind="sell-silver">兑钱</button>
          </div>
          <div class="jbw-ex-row">
            <span>铜钱 → 白银</span>
            <input type="number" min="1" step="1" value="1" data-jbw-ex="buy-silver">
            <button type="button" class="jbw-btn" data-action="jbw-ex" data-kind="buy-silver">兑银</button>
          </div>
        </div>`;

    // 账房页签（经济规则 + 私库/下月预估/仓储概览 + 军粮运力 + 资产/上次结算）
    const ledgerHtml = `
  <div class="jbw-money-pane" data-money-pane="ledger">
    <div class="jbw-card">
      <div class="hd">经济规则</div>
      <div class="jbw-note">
        <p><b>即时入账</b>——钱货实际交割时，AI 直接改动私库或仓储；只是报价、许诺、订单或未取回的财物，不提前入账。</p>
        <p><b>资产月入</b>——田庄、铺面、作坊等的稳定净收益，仅在日期跨月时自动转入私库。</p>
        <p><b>养军结算</b>——跨月时自动扣除军费和仓储军粮。军粮不足时折银补粮；钱粮不足会影响欠饷、士气和后勤。</p>
      </div>
    </div>

    <div class="jbw-grid" style="margin-top:12px;">
      <div class="jbw-card">
        <div class="hd">私库</div>
        <div class="jbw-row"><span class="k">黄金</span><span class="v">${gold} 两</span></div>
        <div class="jbw-row"><span class="k">白银</span><span class="v">${silver} 两</span></div>
        <div class="jbw-row"><span class="k">铜钱</span><span class="v">${copper} 文</span></div>
      </div>
      <div class="jbw-card">
        <div class="hd">下月预估</div>
        <div class="jbw-row"><span class="k">资产月入</span><span class="v">${income} 两</span></div>
        <div class="jbw-row"><span class="k">养军军费</span><span class="v">${mil.cost} 两</span></div>
        <div class="jbw-row"><span class="k">养军军粮</span><span class="v">${mil.grain} 石</span></div>
        <div class="jbw-row"><span class="k">预估净变动</span><span class="v">${monthEst >= 0 ? '+' : ''}${monthEst} 两</span></div>
      </div>
      <div class="jbw-card">
        <div class="hd">仓储概览</div>
        ${storeHtml}
      </div>
    </div>

    <div class="jbw-card" style="margin-top:12px;">
      <div class="hd">军粮运力</div>
      <div class="jbw-grain">
        <div><small>可食军粮</small><b>${grain} 石</b></div>
        <div><small>每月预估</small><b>${mil.grain} 石</b></div>
        <div><small>可支撑</small><b>${sustain == null ? '无养军消耗' : sustain.toFixed(1) + ' 月'}</b></div>
      </div>
    </div>

    <div class="jbw-grid" style="margin-top:12px;">
      <div class="jbw-card">
        <div class="hd">资产</div>
        ${assetHtml}
      </div>
      <div class="jbw-card">
        <div class="hd">上次自动结算</div>
        ${settleHtml}
      </div>
    </div>
  </div>`;

    // 市集页签（金银兑钱 + 商品三大类）
    const marketPaneHtml = `
  <div class="jbw-money-pane on" data-money-pane="market">
    ${exchangeHtml}
    ${marketHtml}
  </div>`;

    return `
<div class="jbw jbw-money-root">
  <div class="jbw-top">
    <span class="jbw-brand"><b>江山北望</b></span>
    <span class="jbw-tag">钱粮收支 <label class="jbw-pay">支付<select data-jbw-pay><option value="白银" selected>白银</option><option value="铜钱">铜钱</option><option value="黄金">黄金</option></select></label></span>
  </div>

  <div class="jbw-money-tabs">
    <button type="button" class="jbw-money-tab" data-action="jbw-money-tab" data-money-tab="ledger">账房</button>
    <button type="button" class="jbw-money-tab on" data-action="jbw-money-tab" data-money-tab="market">市集</button>
  </div>

  ${ledgerHtml}
  ${marketPaneHtml}
</div>`;
  }

  // ---------- 进度条（复用） ----------
  function barRow(label, value, opts) {
    opts = opts || {};
    const min = opts.min != null ? opts.min : 0;
    const max = opts.max != null ? opts.max : 100;
    const tone = opts.tone || 'high';
    const v = clamp(pn(value, 0), min, max);
    const pct = clamp((v - min) / (max - min) * 100, 0, 100);
    return `<div class="jbw-bar"><span class="bk">${label}</span><div class="tr"><div class="fl ${tone}" style="width:${pct}%"></div></div><span class="bv">${Math.round(v)}</span></div>`;
  }

  // ---------- 徽标 ----------
  function tag(text, cls) {
    return `<span class="jbw-badge ${cls || ''}">${text}</span>`;
  }

  // ---------- HTML 转义（用于用户/AI 提供的自由文本，防注入） ----------
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ---------- 是否在场 ----------
  function isPresent(stat, name) {
    const arr = ln(stat, '人际网络.在场角色', []);
    return Array.isArray(arr) && arr.indexOf(name) >= 0;
  }

  // ---------- 人际网络 六大分类折叠面板 ----------
  function renderPeople(stat) {
    const groups = [
      ['上司', '上司'],
      ['故友与同僚', '故友与同僚'],
      ['下属与幕僚', '下属与幕僚'],
      ['三教九流', '三教九流'],
      ['仇敌', '仇敌'],
      ['亲属', '亲属'],
    ];
    let body = '';
    for (const [title, key] of groups) {
      const map = ln(stat, '人际网络.' + key, {});
      const entries = Object.keys(map);
      let items = '';
      for (const name of entries) {
        const p = map[name] || {};
        const enemy = key === '仇敌';
        const favKey = enemy ? '仇恨度' : '好感度';
        const fav = pn(p[favKey], 0);
        const favMin = enemy ? 0 : -100;
        const favMax = enemy ? 100 : 100;
        const favTone = enemy ? 'danger' : (fav < 0 ? 'danger' : 'high');
        const id = p['身份'] ? `<p class="jbw-sub">身份：${p['身份']}</p>` : '';
        const rel = p['关系'] ? `<p class="jbw-sub">关系：${p['关系']}</p>` : '';
        const loyal = (p['忠心'] != null) ? barRow('忠心', p['忠心'], { tone: 'mid' }) : '';
        items += `
          <div class="jbw-item">
            <div class="tt"><b>${name}</b>${isPresent(stat, name) ? tag('在场', 'safe') : tag('不在场', '')}</div>
            ${id}${rel}
            ${barRow(favKey, fav, { min: favMin, max: favMax, tone: favTone })}
            ${loyal}
          </div>`;
      }
      body += `
        <details class="jbw-fold" data-fold="people-${key}">
          <summary>${title} <span class="jbw-fold-hint">${entries.length} 人</span></summary>
          <div class="jbw-goods">${items || '<p class="jbw-empty">此簿暂无记载。</p>'}</div>
        </details>`;
    }
    return `
<div class="jbw">
  <div class="jbw-top">
    <span class="jbw-brand"><b>江山北望</b></span>
    <span class="jbw-tag">人情往来</span>
  </div>
  ${body}
</div>`;
  }

  // ---------- 私帷小记（含生育系统 + 点击查看详情） ----------
  function renderPrivate(stat) {
    const map = ln(stat, '人际网络.私帷', {});
    const names = Object.keys(map);
    // 缓存私帷数据，供详情弹窗点击时读取
    if (typeof window !== 'undefined') {
      window.JSBW._privateMap = map;
    }
    let rows = '';
    for (const name of names) {
      const p = map[name] || {};
      const birth = p['生育'] || {};
      const virgin = birth['是否处女'];
      const virginText = virgin === false ? '已非处子' : '处子之身';
      const virginCls = virgin === false ? 'private' : 'safe';
      const count = birth['同房次数'] != null ? birth['同房次数'] : 0;
      const state = birth['状态'] || '未孕';
      const stateCls = (state === '已孕' || state === '待产') ? 'private' : '';
      const due = birth['预产期'];
      let birthTags = `${tag('好感 ' + pn(p['好感度'], 0), '')}${isPresent(stat, name) ? tag('在场', 'safe') : tag('不在场', '')}${tag(virginText, virginCls)}${tag('同房 ' + count + ' 次', 'private')}`;
      birthTags += `${tag('周期 ' + (birth['周期'] != null ? birth['周期'] : 1), '')}${tag(birth['时期'] || '安全期', '')}${tag(state, stateCls)}`;
      if ((state === '已孕' || state === '待产') && due) birthTags += tag('预产 ' + due, 'private');
      rows += `
        <div class="jbw-item jbw-private" data-action="jbw-private-open" data-name="${esc(name)}" role="button" tabindex="0">
          <div class="tt"><b>${esc(name)}</b><span class="jbw-private-open">详情 ›</span></div>
          <div class="jbw-tags">${birthTags}</div>
        </div>`;
    }
    if (!rows) rows = '<p class="jbw-empty">私帷暂无记载。</p>';
    return `
<div class="jbw">
  <div class="jbw-top">
    <span class="jbw-brand"><b>江山北望</b></span>
    <span class="jbw-tag">私帷小记</span>
  </div>
  ${rows}
</div>`;
  }

  // ---------- 私帷角色详情弹窗 ----------
  // 展示：身份/关系/好感/忠心/当前着装 + 生育系统完整字段
  function privateModal(name, p) {
    p = p || {};
    const birth = p['生育'] || {};
    const identity = p['身份'] || '';
    const relation = p['关系'] || '';
    const outfit = p['着装'] || p['衣着'] || '';
    const favor = pn(p['好感度'], 0);
    const loyalty = pn(p['忠心'], 0);

    // 基本信息键值
    const baseRows = [];
    if (identity) baseRows.push(['身份', identity]);
    if (relation) baseRows.push(['关系', relation]);
    if (baseRows.length) baseRows.push(['好感度', favor]);
    if (p['忠心'] != null) baseRows.push(['忠心', loyalty]);

    const baseHtml = baseRows.length
      ? '<div class="jbw-kv">' + baseRows.map(function (r) { return '<div class="jbw-kv-row"><span class="k">' + r[0] + '</span><span class="v">' + r[1] + '</span></div>'; }).join('') + '</div>'
      : '';

    // 生育系统字段
    const virgin = birth['是否处女'];
    const virginText = virgin === false ? '已非处子' : (virgin === true ? '处子之身' : '');
    const state = birth['状态'] || '';
    const due = birth['预产期'] || '';
    const last = birth['末次同房'] || {};

    const birthRows = [];
    if (virginText) birthRows.push(['是否处女', virginText]);
    if (birth['同房次数'] != null) birthRows.push(['同房次数', birth['同房次数'] + ' 次']);
    if (birth['周期'] != null) birthRows.push(['月经周期', birth['周期'] + ' 天']);
    if (birth['时期']) birthRows.push(['当前时期', birth['时期']]);
    if (state) birthRows.push(['孕产状态', state]);
    if (last['日期']) birthRows.push(['末次同房', last['日期']]);
    if (last['周期日'] != null) birthRows.push(['周期日', '第 ' + last['周期日'] + ' 天']);
    if (due) birthRows.push(['预产期', due]);

    const birthHtml = birthRows.length
      ? '<div class="jbw-sectitle">生育</div><div class="jbw-kv">' + birthRows.map(function (r) { return '<div class="jbw-kv-row"><span class="k">' + r[0] + '</span><span class="v">' + r[1] + '</span></div>'; }).join('') + '</div>'
      : '';

    // 着装（重点展示）
    const outfitHtml = outfit
      ? '<div class="jbw-sectitle">当前着装</div><p class="jbw-modal-note jbw-outfit">' + esc(outfit) + '</p>'
      : '<div class="jbw-sectitle">当前着装</div><p class="jbw-empty" style="margin:4px 0 8px">尚未记载着装。</p>';

    return `
      <div class="jbw-modal-mask" data-action="jbw-private-close">
        <div class="jbw-modal">
          <div class="jbw-modal-head">
            <span class="jbw-modal-label">私帷档案</span>
            <button type="button" class="jbw-modal-x" data-action="jbw-private-close">×</button>
          </div>
          <div class="jbw-modal-title">
            <span class="jbw-power-seal">${surnameOf(name)}</span>
            <b>${esc(name)}</b>
          </div>
          ${baseHtml}
          ${outfitHtml}
          ${birthHtml}
        </div>
      </div>`;
  }

  // 打开私帷角色详情弹窗
  function openPrivateModal(name) {
    if (typeof document === 'undefined') return;
    const map = window.JSBW._privateMap || {};
    const p = map[name];
    if (!p) return;
    closePowerModal();
    const holder = document.createElement('div');
    holder.className = 'jbw-modal-holder';
    holder.innerHTML = privateModal(name, p);
    document.body.appendChild(holder);
    holder.addEventListener('click', function (e) {
      const xBtn = e.target.closest('.jbw-modal-x');
      const onMask = e.target.closest('.jbw-modal-mask') && !e.target.closest('.jbw-modal');
      if (xBtn || onMask) closePowerModal();
    });
  }

  // ---------- 人物志（角色档案总谱） ----------
  // 读取 人际网络 六大分类，聚合成一张人物总谱：
  // 每个角色一个卡片（姓名/身份/关系/好感|忠心|仇恨度条/在场状态/头像占位）
  // 头像：优先读 角色.头像（预留字段，世界书 NPC 立绘 URL 或 base64），无则显示姓氏占位

  // 六大分类定义（顺序 = 原卡导航）
  const PORTRAIT_GROUPS = [
    ['上司', '上司', 'fav'],
    ['故友与同僚', '故友与同僚', 'fav'],
    ['下属与幕僚', '下属与幕僚', 'fav'],
    ['三教九流', '三教九流', 'fav'],
    ['仇敌', '仇敌', 'hate'],
    ['亲属', '亲属', 'fav'],
    ['私帷', '私帷', 'fav'],
  ];

  // 取角色姓氏（头像占位用）：取首字符
  function surnameOf(name) {
    const s = String(name == null ? '' : name).trim();
    return s ? s.charAt(0) : '佚';
  }

  // 头像：优先读 头像 字段，否则姓氏占位
  function avatarHtml(p, name) {
    const av = ln(p, '头像', '');
    if (av) {
      return `<span class="jbw-avatar"><img src="${av}" alt="${name}" onerror="this.style.display='none';this.parentNode.textContent='${surnameOf(name)}';"></span>`;
    }
    return `<span class="jbw-avatar jbw-avatar-ph">${surnameOf(name)}</span>`;
  }

  // 渲染单个人物卡片
  function portraitCard(name, p, kind, stat) {
    const isHate = kind === 'hate';
    const favKey = isHate ? '仇恨度' : '好感度';
    const fav = pn(p[favKey], 0);
    const favTone = isHate ? 'danger' : (fav < 0 ? 'danger' : 'high');
    const favMin = isHate ? 0 : -100;
    const loyal = (!isHate && p['忠心'] != null) ? barRow('忠心', p['忠心'], { tone: 'mid' }) : '';
    const rel = p['关系'] ? `<p class="jbw-sub">关系：${p['关系']}</p>` : '';
    const birth = p['生育'];
    let birthLine = '';
    if (birth) {
      const st = birth['状态'] || '未孕';
      const parts = [];
      if (birth['是否处女'] === false) parts.push('已非处子'); else if (birth['是否处女'] === true) parts.push('处子之身');
      if (birth['同房次数'] != null) parts.push('同房' + birth['同房次数'] + '次');
      parts.push(st);
      if ((st === '已孕' || st === '待产') && birth['预产期']) parts.push('预产' + birth['预产期']);
      birthLine = `<p class="jbw-sub jbw-birth">${parts.join(' · ')}</p>`;
    }
    const tags = [
      isPresent(stat, name) ? tag('在场', 'safe') : tag('不在场', ''),
      isHate ? tag('仇敌', 'danger') : '',
    ].join('');
    return `
      <div class="jbw-person${isHate ? ' jbw-person-hate' : ''}">
        <div class="jbw-person-head">
          ${avatarHtml(p, name)}
          <div class="jbw-person-id">
            <div class="nm">${name}</div>
            ${p['身份'] ? `<div class="role">${p['身份']}</div>` : ''}
          </div>
          <div class="jbw-person-flags">${tags}</div>
        </div>
        ${rel}${birthLine}
        ${barRow(favKey, fav, { min: favMin, max: 100, tone: favTone })}
        ${loyal}
      </div>`;
  }

  function renderPortraits(stat) {
    let body = '';
    let total = 0;
    for (const [title, key, kind] of PORTRAIT_GROUPS) {
      const map = ln(stat, '人际网络.' + key, {});
      const names = Object.keys(map);
      if (!names.length) continue;
      total += names.length;
      let cards = '';
      for (const name of names) {
        cards += portraitCard(name, map[name] || {}, kind, stat);
      }
      body += `
        <div class="jbw-portrait-group">
          <div class="jbw-portrait-grouphd">${title}<span class="jbw-fold-hint">${names.length} 人</span></div>
          <div class="jbw-persons">${cards}</div>
        </div>`;
    }
    if (!body) body = '<p class="jbw-empty">人物志暂无一卷，待江湖再会。</p>';
    return `
<div class="jbw jbw-portraits-root">
  <div class="jbw-top">
    <span class="jbw-brand"><b>江山北望</b></span>
    <span class="jbw-tag">人物志 · ${total} 人</span>
  </div>
  ${body}
</div>`;
  }

  // ---------- 营伍军务（军事） ----------
  // 读取 军事.各营 / 军事.将领 / 军事.战斗记录，展示直辖部队编制、将领、战史

  // 各营状态徽标（状态 → 样式色）
  const CAMP_STATE = {
    '待命': 'safe', '休整': 'safe', '训练': 'mid', '换装': 'mid',
    '行军': 'mid', '作战': 'danger', '缺粮': 'danger', '哗变': 'danger',
  };
  function campStateCls(state) { return CAMP_STATE[state] || ''; }

  // 装备等级徽标
  const EQUIP_TONE = { '残破': 'danger', '简陋': '', '普通': 'mid', '精良': 'gold', '精锐': 'gold' };
  function equipCls(e) { return EQUIP_TONE[e] || ''; }

  // 营级徽标
  const LEVEL_TONE = { '乌合': 'danger', '新募': '', '可用': 'mid', '良好': 'mid', '精锐': 'gold', '名军': 'gold' };
  function levelCls(l) { return LEVEL_TONE[l] || ''; }

  // 单个营伍卡片
  function campCard(name, c) {
    const people = pn(c['人数'], 0);
    const morale = pn(c['士气'], 0);
    const train = pn(c['训练'], 0);
    const supply = pn(c['后勤'], 0);
    const fatigue = pn(c['疲劳'], 0);
    const wounded = pn(c['伤兵'], 0);
    const owePay = pn(c['欠饷月数'], 0);
    const lackFood = pn(c['缺粮天数'], 0);
    const equip = c['装备'] || '';
    const level = c['等级'] || '';
    const state = c['状态'] || '';
    const troopType = c['兵种'] || '';
    const general = c['将领'] || '';
    const garrison = c['驻地'] || '';

    // 装备编制
    const eq = c['装备编制'] || {};
    const eqBits = [];
    if (eq['主战兵器']) eqBits.push('主战 ' + eq['主战兵器']);
    if (eq['远射兵器']) eqBits.push('远射 ' + eq['远射兵器']);
    if (eq['防具']) eqBits.push('防具 ' + eq['防具']);
    if (eq['火器']) eqBits.push('火器 ' + eq['火器']);
    if (eq['坐骑']) eqBits.push('坐骑 ' + eq['坐骑']);
    if (eq['齐备率'] != null) eqBits.push('齐备率 ' + pn(eq['齐备率'], 0) + '%');
    if (eq['完好率'] != null) eqBits.push('完好率 ' + pn(eq['完好率'], 0) + '%');

    // 顶部标签行
    const tags = [
      troopType ? tag(troopType, '') : '',
      level ? tag(level, levelCls(level)) : '',
      equip ? tag(equip, equipCls(equip)) : '',
      state ? tag(state, campStateCls(state)) : '',
    ].join('');

    // 警戒提示
    let alert = '';
    if (owePay > 0) alert += '<p class="jbw-warn">欠饷 ' + owePay + ' 月</p>';
    if (lackFood > 0) alert += '<p class="jbw-warn">缺粮 ' + lackFood + ' 日</p>';
    if (wounded > 0) alert += '<p class="jbw-sub">伤兵 ' + wounded + ' 人</p>';

    return `
      <div class="jbw-camp">
        <div class="jbw-camp-head">
          <div class="jbw-camp-name"><b>${name}</b>${general ? '<span class="jbw-camp-general">主将 · ' + general + '</span>' : ''}</div>
          <div class="jbw-tags">${tags}</div>
        </div>
        <div class="jbw-camp-stats">
          <div class="jbw-stat"><small>人数</small><b>${people}</b></div>
          <div class="jbw-stat"><small>士气</small><b>${morale}</b></div>
          <div class="jbw-stat"><small>训练</small><b>${train}</b></div>
          <div class="jbw-stat"><small>后勤</small><b>${supply}</b></div>
          <div class="jbw-stat"><small>疲劳</small><b>${fatigue}</b></div>
        </div>
        ${barRow('士气', morale, { tone: morale < 35 ? 'danger' : 'high' })}
        ${barRow('训练', train, { tone: train < 30 ? 'danger' : 'high' })}
        ${barRow('后勤', supply, { tone: supply < 30 ? 'danger' : 'high' })}
        ${garrison ? '<p class="jbw-sub">驻地：' + garrison + '</p>' : ''}
        ${eqBits.length ? '<p class="jbw-sub">装备：' + eqBits.join('、') + '</p>' : ''}
        ${alert}
      </div>`;
  }

  // 单个将领卡片
  function generalCard(name, g) {
    const attrs = ['统率', '武力', '智谋', '政治', '威望'];
    let bars = '';
    let hasAttr = false;
    for (const a of attrs) {
      if (g[a] != null) { hasAttr = true; bars += barRow(a, g[a], { tone: 'high' }); }
    }
    const post = g['职位'] || '';
    const troops = g['兵力'] != null ? '兵力 ' + pn(g['兵力'], 0) : '';
    const garrison = g['驻地'] || '';
    const intro = g['简介'] || '';

    const tags = [
      post ? tag(post, '') : '',
      troops ? tag(troops, '') : '',
    ].join('');

    return `
      <div class="jbw-general">
        <div class="jbw-camp-head">
          <div class="jbw-camp-name"><b>${name}</b></div>
          <div class="jbw-tags">${tags}</div>
        </div>
        ${garrison ? '<p class="jbw-sub">驻地：' + garrison + '</p>' : ''}
        ${hasAttr ? bars : ''}
        ${intro ? '<p class="jbw-sub">' + intro + '</p>' : ''}
      </div>`;
  }

  // 军令记录项（数组元素结构由脚本维护，容错渲染：对象取字段，字符串直接显示）
  function orderItemHtml(o) {
    if (o == null) return '';
    if (typeof o === 'string') return '<div class="jbw-order-item">' + o + '</div>';
    const bits = [];
    if (o['命令'] || o['军令']) bits.push(o['命令'] || o['军令']);
    if (o['营'] || o['对象']) bits.push(o['营'] || o['对象']);
    if (o['状态']) bits.push(o['状态']);
    if (o['日期']) bits.push(o['日期']);
    const text = bits.join(' · ');
    if (!text) return '';
    return '<div class="jbw-order-item">' + text + '</div>';
  }

  function renderMilitary(stat) {
    const mil = (stat && stat['军事']) || {};
    const camps = mil['各营'] || {};
    const generals = mil['将领'] || {};
    const battles = mil['战斗记录'] || {};
    const orders = mil['军令'] || {};        // 脚本维护：当前在行军令（对象）
    const orderLog = mil['军令记录'] || [];  // 脚本维护：军令历史（数组）

    // ---- 顶部统计栏 ----
    const campNames = Object.keys(camps);
    const generalNames = Object.keys(generals);
    const battleNames = Object.keys(battles);
    const campTotal = campNames.reduce(function (s, n) { return s + pn((camps[n] || {})['人数'], 0); }, 0);
    // 伤兵合计
    const woundedTotal = campNames.reduce(function (s, n) { return s + pn((camps[n] || {})['伤兵'], 0); }, 0);

    // ---- 折叠面板：兵籍名册（各营）----
    let campsHtml = '';
    if (!campNames.length) {
      campsHtml = '<p class="jbw-empty">尚无直辖营伍。</p>';
    } else {
      campsHtml = '<div class="jbw-camps">';
      for (const name of campNames) campsHtml += campCard(name, camps[name] || {});
      campsHtml += '</div>';
    }

    // ---- 折叠面板：在行军令（军令）----
    let ordersHtml = '';
    const orderKeys = Object.keys(orders);
    if (!orderKeys.length) {
      ordersHtml = '<p class="jbw-empty">暂无在行军令。</p>';
    } else {
      for (const k of orderKeys) {
        ordersHtml += '<div class="jbw-order">' + (orders[k] != null ? orderItemHtml(orders[k]) : '') + '</div>';
      }
    }

    // ---- 折叠面板：军令部（军令记录）----
    let orderLogHtml = '';
    if (!Array.isArray(orderLog) || !orderLog.length) {
      orderLogHtml = '<p class="jbw-empty">军令部暂无记载。</p>';
    } else {
      const list = orderLog.slice().reverse().slice(0, 12);
      for (const o of list) orderLogHtml += orderItemHtml(o);
    }

    // ---- 折叠面板：将领名册（将领）----
    let generalsHtml = '';
    if (!generalNames.length) {
      generalsHtml = '<p class="jbw-empty">尚无在册将领。</p>';
    } else {
      generalsHtml = '<div class="jbw-generals">';
      for (const name of generalNames) generalsHtml += generalCard(name, generals[name] || {});
      generalsHtml += '</div>';
    }

    // ---- 折叠面板：战斗记录（倒序，最多 8 条）----
    let battlesHtml = '';
    if (!battleNames.length) {
      battlesHtml = '<p class="jbw-empty">尚无战史记载。</p>';
    } else {
      const list = battleNames.slice().reverse().slice(0, 8);
      for (const name of list) {
        const b = battles[name] || {};
        const date = b['日期'] || '';
        const foe = b['对手'] || '';
        const result = b['结果'] || '';
        const loot = b['战利品'] || '';
        const summary = b['摘要'] || '';
        battlesHtml += `
          <div class="jbw-battle">
            <div class="tt"><b>${name}</b>${result ? tag(result, '') : ''}</div>
            ${date || foe ? '<p class="jbw-sub">' + (date ? date + ' · ' : '') + (foe ? '对阵 ' + foe : '') + '</p>' : ''}
            ${summary ? '<p>' + summary + '</p>' : ''}
            ${loot && loot !== '无' ? '<p class="jbw-sub">战利品：' + loot + '</p>' : ''}
          </div>`;
      }
    }

    return `
<div class="jbw jbw-military-root">
  <div class="jbw-top">
    <span class="jbw-brand"><b>江山北望</b></span>
    <span class="jbw-tag">营伍军务</span>
  </div>

  <div class="jbw-mil-stats">
    <div class="jbw-mil-stat"><small>军册在录</small><b>${campTotal}</b><i>名</i></div>
    <div class="jbw-mil-stat"><small>营伍</small><b>${campNames.length}</b><i>营</i></div>
    <div class="jbw-mil-stat"><small>伤兵</small><b>${woundedTotal}</b><i>人</i></div>
    <div class="jbw-mil-stat"><small>在册将领</small><b>${generalNames.length}</b><i>员</i></div>
  </div>

  <details class="jbw-fold jbw-mil-fold" data-fold="mil-camps" open>
    <summary>兵籍名册 <span class="jbw-fold-hint">${campNames.length} 营</span></summary>
    <div class="jbw-fold-body">${campsHtml}</div>
  </details>

  <details class="jbw-fold jbw-mil-fold" data-fold="mil-orders">
    <summary>在行军令 <span class="jbw-fold-hint">${orderKeys.length} 道</span></summary>
    <div class="jbw-fold-body">${ordersHtml}</div>
  </details>

  <details class="jbw-fold jbw-mil-fold" data-fold="mil-orderlog">
    <summary>军令部 <span class="jbw-fold-hint">${Array.isArray(orderLog) ? orderLog.length : 0} 条</span></summary>
    <div class="jbw-fold-body">${orderLogHtml}</div>
  </details>

  <details class="jbw-fold jbw-mil-fold" data-fold="mil-generals">
    <summary>将领名册 <span class="jbw-fold-hint">${generalNames.length} 员</span></summary>
    <div class="jbw-fold-body">${generalsHtml}</div>
  </details>

  <details class="jbw-fold jbw-mil-fold" data-fold="mil-battles">
    <summary>战斗记录 <span class="jbw-fold-hint">${battleNames.length} 场</span></summary>
    <div class="jbw-fold-body">${battlesHtml}</div>
  </details>
</div>`;
  }

  // ---------- 时局任务（时局与任务） ----------
  // 读取 时局与任务.势力关系 / 时局与任务.未决事项，展示天下势力账本与待办事项

  // 势力状态徽标配色
  const POWER_STATE = {
    '未接触': '', '观望': '', '友好': 'gold', '结盟': 'gold', '附庸': 'mid', '宗主': 'mid',
    '敌对': 'danger', '交战': 'danger', '已投降': '', '已覆灭': 'danger',
  };
  function powerStateCls(s) { return POWER_STATE[s] || ''; }

  // 经济/粮草档位配色
  const ECON_TONE = { '崩溃': 'danger', '拮据': 'danger', '平稳': 'mid', '富足': 'gold', '雄厚': 'gold' };
  const FOOD_TONE = { '断绝': 'danger', '短缺': 'danger', '尚可': 'mid', '充足': 'gold' };
  function econCls(v) { return ECON_TONE[v] || ''; }
  function foodCls(v) { return FOOD_TONE[v] || ''; }

  // 未决事项状态配色
  const TODO_STATE = { '待处理': 'danger', '推进中': 'mid', '等待中': '', '暂缓': '' };
  function todoCls(s) { return TODO_STATE[s] || ''; }

  // 势力下属将领卡
  function powerGeneralCard(name, g) {
    const attrs = ['统率', '武力', '智谋', '忠诚'];
    let bars = '';
    let hasAttr = false;
    for (const a of attrs) {
      if (g[a] != null) { hasAttr = true; bars += barRow(a, g[a], { tone: 'high' }); }
    }
    const post = g['职位'] || '';
    const troops = g['兵力'] != null ? '兵力 ' + pn(g['兵力'], 0) : '';
    const garrison = g['驻地'] || '';
    const intro = g['简介'] || '';
    return `
      <div class="jbw-power-general">
        <div class="tt"><b>${name}</b>${post ? tag(post, '') : ''}${troops ? tag(troops, '') : ''}</div>
        ${garrison ? '<p class="jbw-sub">驻地：' + garrison + '</p>' : ''}
        ${hasAttr ? bars : ''}
        ${intro ? '<p class="jbw-sub">' + intro + '</p>' : ''}
      </div>`;
  }

  // 势力军队卡
  function powerArmyCard(name, a) {
    const people = pn(a['人数'], 0);
    const morale = pn(a['士气'], 0);
    const train = pn(a['训练'], 0);
    const supply = pn(a['后勤'], 0);
    const troopType = a['兵种'] || '';
    const equip = a['装备'] || '';
    const level = a['等级'] || '';
    const state = a['状态'] || '';
    const general = a['将领'] || '';
    const garrison = a['驻地'] || '';
    const tags = [
      troopType ? tag(troopType, '') : '',
      level ? tag(level, levelCls(level)) : '',
      equip ? tag(equip, equipCls(equip)) : '',
      state ? tag(state, campStateCls(state)) : '',
    ].join('');
    return `
      <div class="jbw-power-army">
        <div class="tt"><b>${name}</b>${general ? tag('主将 ' + general, '') : ''}</div>
        <div class="jbw-tags">${tags}</div>
        <div class="jbw-camp-stats">
          <div class="jbw-stat"><small>人数</small><b>${people}</b></div>
          <div class="jbw-stat"><small>士气</small><b>${morale}</b></div>
          <div class="jbw-stat"><small>训练</small><b>${train}</b></div>
          <div class="jbw-stat"><small>后勤</small><b>${supply}</b></div>
        </div>
        ${garrison ? '<p class="jbw-sub">驻地：' + garrison + '</p>' : ''}
      </div>`;
  }

  // 势力关系状态徽标（列表行用）
  const POWER_LIST_TONE = { '友好': 'gold', '结盟': 'gold', '附庸': 'mid', '宗主': 'mid', '敌对': 'danger', '交战': 'danger', '已覆灭': 'danger' };

  // 单个势力行条目（列表）
  function powerRow(name, p) {
    const favor = clamp(pn(p['好感度'], 0), -100, 100);
    const state = p['状态'] || '';
    const tone = POWER_LIST_TONE[state] || '';
    const favorTone = favor >= 30 ? 'gold' : (favor <= -30 ? 'danger' : 'mid');
    const favorSign = favor > 0 ? '+' : '';
    return `
      <button type="button" class="jbw-power-row" data-action="jbw-power-open" data-power="${name}">
        <span class="jbw-power-seal">${surnameOf(name)}</span>
        <span class="jbw-power-id">
          <span class="nm">${name}</span>
          ${state ? '<span class="jbw-badge ' + tone + '">' + state + '</span>' : ''}
        </span>
        <span class="jbw-power-favor ${favorTone}">好感 ${favorSign}${favor}</span>
        <span class="jbw-power-arrow">›</span>
      </button>`;
  }

  // 势力详情弹窗内容
  function powerModal(name, p) {
    const favor = clamp(pn(p['好感度'], 0), -100, 100);
    const state = p['状态'] || '';
    const summary = p['关系摘要'] || '';
    const econ = p['经济'] || {};
    const mil = p['军事'] || {};
    const fin = econ['财政状况'] || '';
    const food = econ['粮草状态'] || '';
    const favorPct = clamp((favor + 100) / 200 * 100, 0, 100);
    const favorTone = favor >= 30 ? 'gold' : (favor <= -30 ? 'danger' : 'mid');

    const totalTroops = pn(mil['总兵力'], 0);
    const mainType = mil['主力兵种'] || '';

    const gens = mil['下属将领'] || {};
    const genNames = Object.keys(gens);
    const armies = mil['军队'] || {};
    const armyNames = Object.keys(armies);

    let gensHtml = '';
    if (genNames.length) {
      gensHtml = '<div class="jbw-sectitle">下属将领</div><div class="jbw-power-sublist">'
        + genNames.map(function (n) { return powerGeneralCard(n, gens[n] || {}); }).join('') + '</div>';
    }
    let armiesHtml = '';
    if (armyNames.length) {
      armiesHtml = '<div class="jbw-sectitle">成建制军队</div><div class="jbw-power-sublist">'
        + armyNames.map(function (n) { return powerArmyCard(n, armies[n] || {}); }).join('') + '</div>';
    }

    return `
      <div class="jbw-modal-mask" data-action="jbw-power-close">
        <div class="jbw-modal">
          <div class="jbw-modal-head">
            <span class="jbw-modal-label">势力档案</span>
            <button type="button" class="jbw-modal-x" data-action="jbw-power-close">×</button>
          </div>
          <div class="jbw-modal-title">
            <span class="jbw-power-seal">${surnameOf(name)}</span>
            <b>${name}</b>
            ${state ? tag(state, powerStateCls(state)) : ''}
          </div>
          <div class="jbw-bar"><span class="bk">好感度</span><div class="tr"><div class="fl ${favorTone}" style="width:${favorPct}%"></div></div><span class="bv">${favor}</span></div>
          ${summary ? '<p class="jbw-modal-note">' + summary + '</p>' : ''}
          ${(fin || food) ? '<div class="jbw-sectitle">经济</div><div class="jbw-kv">'
            + (fin ? '<div class="jbw-kv-row"><span class="k">财政状况</span><span class="v">' + fin + '</span></div>' : '')
            + (food ? '<div class="jbw-kv-row"><span class="k">粮草状态</span><span class="v">' + food + '</span></div>' : '')
            + '</div>' : ''}
          ${(totalTroops > 0 || mainType) ? '<div class="jbw-sectitle">军事</div><div class="jbw-kv">'
            + '<div class="jbw-kv-row"><span class="k">总兵力</span><span class="v">' + totalTroops + '</span></div>'
            + (mainType ? '<div class="jbw-kv-row"><span class="k">主力兵种</span><span class="v">' + mainType + '</span></div>' : '')
            + '</div>' : ''}
          ${gensHtml}
          ${armiesHtml}
        </div>
      </div>`;
  }

  function renderSituation(stat) {
    const sit = (stat && stat['时局与任务']) || {};
    const powers = sit['势力关系'] || {};
    const todos = sit['未决事项'] || {};

    // 缓存势力数据，供弹窗点击时读取
    if (typeof window !== 'undefined') {
      window.JSBW._situationPowers = powers;
    }

    // 势力关系（行式列表，点开弹窗）
    const powerNames = Object.keys(powers);
    let powersHtml = '';
    if (!powerNames.length) {
      powersHtml = '<p class="jbw-empty">尚无已建档的势力。</p>';
    } else {
      powersHtml = '<div class="jbw-powers">' + powerNames.map(function (n) { return powerRow(n, powers[n] || {}); }).join('') + '</div>';
    }

    // 未决事项（待处理优先，其次推进中，再等待中/暂缓）
    const todoNames = Object.keys(todos);
    let todosHtml = '';
    if (!todoNames.length) {
      todosHtml = '<p class="jbw-empty">眼下无未决之事。</p>';
    } else {
      const prio = { '待处理': 0, '推进中': 1, '等待中': 2, '暂缓': 3 };
      const sorted = todoNames.slice().sort(function (a, b) {
        return (prio[(todos[a] || {}).状态] != null ? prio[(todos[a] || {}).状态] : 9) - (prio[(todos[b] || {}).状态] != null ? prio[(todos[b] || {}).状态] : 9);
      });
      todosHtml = '<div class="jbw-todos">' + sorted.map(function (n) {
        const t = todos[n] || {};
        const state = t['状态'] || '';
        const outline = t['概要'] || '';
        const now = t['现状'] || '';
        const remind = t['提醒'] || '';
        return `
          <div class="jbw-todo">
            <div class="tt"><b>${n}</b>${state ? tag(state, todoCls(state)) : ''}</div>
            ${outline ? '<p>' + outline + '</p>' : ''}
            ${now ? '<p class="jbw-sub">现状：' + now + '</p>' : ''}
            ${remind ? '<p class="jbw-sub">提醒：' + remind + '</p>' : ''}
          </div>`;
      }).join('') + '</div>';
    }

    return `
<div class="jbw jbw-situation-root">
  <div class="jbw-top">
    <span class="jbw-brand"><b>江山北望</b></span>
    <span class="jbw-tag">时局任务</span>
  </div>

  <details class="jbw-fold jbw-sit-fold" data-fold="sit-todos" open>
    <summary>未决之事 <span class="jbw-fold-hint">${todoNames.length} 件</span></summary>
    <div class="jbw-fold-body">${todosHtml}</div>
  </details>

  <details class="jbw-fold jbw-sit-fold" data-fold="sit-powers" open>
    <summary>势力关系 <span class="jbw-fold-hint">${powerNames.length} 家</span></summary>
    <div class="jbw-fold-body">${powersHtml}</div>
  </details>
</div>`;
  }

  // ---------- 技术进展（科技） ----------
  // 读取 科技.<技术名>.{进度, 现状}，展示技术项目清单

  // 进度档位配色与进度条比例
  const TECH_STAGE = {
    '未开始': { cls: '', pct: 5 },
    '试验中': { cls: 'mid', pct: 40 },
    '小规模试点': { cls: 'blue', pct: 70 },
    '已推广': { cls: 'gold', pct: 100 },
  };
  function techStageCls(s) { return (TECH_STAGE[s] || {}).cls || ''; }
  function techStagePct(s) { return (TECH_STAGE[s] || {}).pct || 5; }

  // 单条技术项目卡
  function techCard(name, t) {
    const stage = t['进度'] || '';
    const status = t['现状'] || '';
    const cls = techStageCls(stage);
    const pct = techStagePct(stage);
    return `
      <div class="jbw-tech">
        <div class="jbw-tech-head">
          <b>${name}</b>
          ${stage ? tag(stage, cls) : ''}
        </div>
        <div class="jbw-bar"><span class="bk">进度</span><div class="tr"><div class="fl ${cls}" style="width:${pct}%"></div></div><span class="bv">${stage || '—'}</span></div>
        ${status ? '<p class="jbw-sub">' + status + '</p>' : ''}
      </div>`;
  }

  function renderTech(stat) {
    // 容错：科技 可能是 {技术名:{进度,现状}}，也可能是 {项目边界:{技术名:{进度,现状}}}
    const techRaw = (stat && stat['科技']) || {};
    let techs = techRaw;
    // 若存在「项目边界」这一中间层，则取其值
    if (techRaw['项目边界'] && typeof techRaw['项目边界'] === 'object') {
      techs = techRaw['项目边界'];
    }
    // 过滤掉明显不是技术项目的键（排除「项目边界」自身及其他可能的元字段）
    const names = Object.keys(techs).filter(function (k) {
      return k !== '项目边界' && techs[k] && typeof techs[k] === 'object';
    });

    // 按进度排序：已推广 → 小规模试点 → 试验中 → 未开始
    const order = { '已推广': 0, '小规模试点': 1, '试验中': 2, '未开始': 3 };
    const sorted = names.slice().sort(function (a, b) {
      const sa = (techs[a] || {}).进度 || '';
      const sb = (techs[b] || {}).进度 || '';
      return (order[sa] != null ? order[sa] : 9) - (order[sb] != null ? order[sb] : 9);
    });

    // 统计各阶段数量
    let cntPromoted = 0, cntPilot = 0, cntTesting = 0, cntPending = 0;
    names.forEach(function (n) {
      const s = (techs[n] || {}).进度 || '';
      if (s === '已推广') cntPromoted++;
      else if (s === '小规模试点') cntPilot++;
      else if (s === '试验中') cntTesting++;
      else if (s === '未开始') cntPending++;
    });

    let listHtml = '';
    if (!sorted.length) {
      listHtml = '<p class="jbw-empty">尚无立项的技术项目。</p>';
    } else {
      listHtml = '<div class="jbw-techs">' + sorted.map(function (n) { return techCard(n, techs[n] || {}); }).join('') + '</div>';
    }

    return `
<div class="jbw jbw-tech-root">
  <div class="jbw-top">
    <span class="jbw-brand"><b>江山北望</b></span>
    <span class="jbw-tag">技术进展 · ${names.length} 项</span>
  </div>

  <div class="jbw-mil-stats">
    <div class="jbw-mil-stat"><b>${cntPromoted}</b><i>已推广</i></div>
    <div class="jbw-mil-stat"><b>${cntPilot}</b><i>小规模试点</i></div>
    <div class="jbw-mil-stat"><b>${cntTesting}</b><i>试验中</i></div>
    <div class="jbw-mil-stat"><b>${cntPending}</b><i>未开始</i></div>
  </div>

  <div class="jbw-card" style="margin-top:12px;">
    <div class="hd">技术项目</div>
    ${listHtml}
  </div>
</div>`;
  }

  // ---------- 生平史记（个人史记） ----------
  // 读取 个人史记.大事记.{事件名}.{日期, 地点, 类型, 事迹, 影响}
  // 按「类型」分组（军政/经济/人事/外交/战役/建设/技术/家族），每组一个可折叠面板

  // 大事记类型清单（顺序即折叠面板展示顺序）
  const HISTORY_TYPES = ['军政', '经济', '人事', '外交', '战役', '建设', '技术', '家族'];

  // 类型徽标配色
  const HISTORY_TONE = {
    '军政': 'gold', '经济': 'blue', '人事': 'blue', '外交': 'private',
    '战役': 'danger', '建设': 'gold', '技术': 'mid', '家族': 'danger',
  };
  function historyTypeCls(t) { return HISTORY_TONE[t] || ''; }

  // 单条大事记卡
  function historyEventCard(name, e) {
    const date = e['日期'] || '';
    const place = e['地点'] || '';
    const type = e['类型'] || '';
    const deed = e['事迹'] || '';
    const impact = e['影响'] || '';
    return `
      <div class="jbw-event">
        <div class="jbw-event-head">
          <b>${name}</b>
          ${type ? tag(type, historyTypeCls(type)) : ''}
        </div>
        ${date || place ? '<p class="jbw-sub">' + (date ? date : '') + (date && place ? ' · ' : '') + (place ? place : '') + '</p>' : ''}
        ${deed ? '<p>' + deed + '</p>' : ''}
        ${impact ? '<p class="jbw-sub">影响：' + impact + '</p>' : ''}
      </div>`;
  }

  function renderHistory(stat) {
    const his = (stat && stat['个人史记']) || {};
    const events = his['大事记'] || {};

    // 事件按类型分组
    const grouped = {};
    HISTORY_TYPES.forEach(function (t) { grouped[t] = []; });
    let untyped = [];

    // 遍历事件，按类型归类；保留插入顺序（对象键顺序），倒序展示（最新在前）
    const names = Object.keys(events);
    names.forEach(function (n) {
      const e = events[n] || {};
      const t = e['类型'] || '';
      if (HISTORY_TYPES.indexOf(t) >= 0) {
        grouped[t].push(n);
      } else {
        untyped.push(n);
      }
    });

    // 各类型折叠面板（只渲染有内容的类型）
    let bodyHtml = '';
    let totalCount = names.length;
    let renderedTypeCount = 0;

    HISTORY_TYPES.forEach(function (t) {
      const list = grouped[t];
      if (!list.length) return;
      renderedTypeCount++;
      // 倒序：最新在前
      const reversed = list.slice().reverse();
      const items = reversed.map(function (n) { return historyEventCard(n, events[n] || {}); }).join('');
      bodyHtml += `
      <details class="jbw-fold jbw-his-fold" data-fold="his-${t}">
        <summary>${t} <span class="jbw-fold-hint">${list.length} 件</span></summary>
        <div class="jbw-fold-body">${items}</div>
      </details>`;
    });

    // 未分类事件（类型字段缺失或异常）单独归一组
    if (untyped.length) {
      const reversed = untyped.slice().reverse();
      const items = reversed.map(function (n) { return historyEventCard(n, events[n] || {}); }).join('');
      bodyHtml += `
      <details class="jbw-fold jbw-his-fold" data-fold="his-other">
        <summary>其他 <span class="jbw-fold-hint">${untyped.length} 件</span></summary>
        <div class="jbw-fold-body">${items}</div>
      </details>`;
    }

    if (!totalCount) {
      bodyHtml = '<p class="jbw-empty">尚无载入史册之事。</p>';
    }

    return `
<div class="jbw jbw-history-root">
  <div class="jbw-top">
    <span class="jbw-brand"><b>江山北望</b></span>
    <span class="jbw-tag">生平史记 · ${totalCount} 件</span>
  </div>

  ${bodyHtml}
</div>`;
  }

  // ---------- 风月阁（NSFW，同房点数 + 器物兑换） ----------
  // 完全对齐原卡《残明余烬》状态栏「风月阁」页签：
  //   顶部「风月阁账牌」显示同房点数；左「货架」三类折叠（闺中秘器/炉中秘药/枕边小物），
  //   每件器物卡（名称/价格/简介/已拥有×N/购买按钮）；右「我的器物」清单（名称/×数量/简介）。
  // 数据：读取 风月阁.同房点数（number）、风月阁.器物 = {器物名:{简介,数量}}。
  // 购买：点数足够则扣点 + 器物数量累加（已有 +1，无则写入 {简介,数量:1}），回写变量。

  // 内置货架清单（照搬原卡 fe 常量，零云端内嵌）
  const FENGYUE_SHELF = [
    { cat: '闺中秘器', items: [
      { id: 'mianling', name: '缅铃', price: 5, desc: '缅甸货，空心银铃铛，里头灌了水银。给你家姑娘塞进去，走一步它就在里头滚一圈，你能听见声儿算我输。她白天戴着出门，晚上回来腿都夹不紧了。洗干净塞进去就成，然后你就等着验收成果吧。' },
      { id: 'jiaoxiansheng', name: '角先生', price: 4, desc: '羊脂白玉的，你摸摸。你不在家的时候它就是代你值班的，温水泡热了跟活人似的。别嫌它比你秀气，它又不会喘气不会说情话，抢不走你的人。' },
      { id: 'guangdongrenshi', name: '广东人事', price: 4, desc: '广东老师傅用黄杨木削的，比角先生粗一圈。木头有个好处，捂热了跟真人皮肤似的，越用越润。用法跟角先生一样，温水泡软了给你家姑娘，她用了就知道什么叫广东功夫。' },
      { id: 'shuangtoulong', name: '双头龙', price: 5, desc: '两头都做成龟首的样子，中间牛筋连着。她俩可以一起用，你自个儿也可以一边一个。别拿那种眼神看我，来我这儿买这个的客官多了去了，你又不是第一个。' },
      { id: 'yintuozi', name: '银托子', price: 4, desc: '精银圆环，套你根部的。箍着它你就没那么快交代，多撑一会儿她念你的好。勒太紧废了我可不赔，后半辈子你就只能天天来我这进货角先生了。' },
      { id: 'xuanyuhuan', name: '悬玉环', price: 3, desc: '羊脂白玉的细环，系着绛色丝绦。行房的时候挂在腰上或者帐钩上，托着你那话儿，让你悠着点发力。说白了就是个温柔的银托子，好看还管用。' },
      { id: 'liuhuangquan', name: '硫磺圈', price: 3, desc: '硫磺跟蜂蜡合炼的，套你根部的。跟银托子不一样，这个遇热会微微发烫，酸酸胀胀的，让你想交代又交代不了。喜欢被吊着的感觉就试这个。' },
      { id: 'lujiao', name: '鹿角', price: 3, desc: '嫩鹿茸尖磨的，天然微弯，触体温润。用法我说了怕你不好意思，反正你拿着看两秒就懂了。比角先生野，适合胆子大的姑娘。' },
      { id: 'xiangyachou', name: '象牙筹', price: 2, desc: '象牙磨的细长薄片，两头圆圆的。按穴位用的，从脖子一路划到腿根，轻轻重重的，她痒你就对了。下手重了也能当小鞭子使，看你会不会玩。' },
      { id: 'yuruyi', name: '玉如意', price: 3, desc: '巴掌大的袖珍青玉如意。挠背可惜了，换个地方挠，你家姑娘叫起来的时候你就知道这钱没白花。' },
      { id: 'muma', name: '木马', price: 5, desc: '木头的马架子，不是让你骑上去打仗的。姑娘趴上去，手脚刚好够着四个角，后面的事你自己琢磨。做工扎实，承重够，翻不下来。家里有地方的客官才买，住客栈的就别想了。' },
      { id: 'yushi', name: '玉势', price: 2, desc: '角先生的小妹，比角先生小两圈，手指粗细。好处是小，姑娘出门塞包袱里都没人知道。翡翠的羊脂玉的都有，先到先挑。你家那位刚入门的拿这个试，不吓人。' },
      { id: 'fuchen', name: '拂尘', price: 2, desc: '白麈尾毛扎的拂尘，道士手里那个见过吧？我这把不扫灰，扫人。从后颈一路拂到腰眼，轻一下重一下，她痒得扭成麻花你负责。比手好用，够不着的地方它够得着。' }
    ] },
    { cat: '炉中秘药', items: [
      { id: 'nuanqingxiang', name: '暖情香', price: 2, desc: '西域方子，点上之后满屋子那个味儿。闻着闻着她身子就热了，她热了你还能凉着？掰一小块搁香炉里就行，别整块丢进去，又不是烧柴火。' },
      { id: 'chanshengjiao', name: '颤声娇', price: 4, desc: '西域秘药，绿豆大一颗含舌头底下。含完以后浑身酥酥麻麻的，跟有蚂蚁爬似的，碰哪儿都痒，叫出来的声儿比平时好听十倍。名字就是这么来的。' },
      { id: 'fengqigao', name: '封脐膏', price: 3, desc: '肉桂丁香蛇床子炼的膏药。贴肚脐下面三指，热力顺着丹田往下走，用不了一盏茶她就主动往你身上蹭了。贴之前先把那儿的毛刮一刮，不然撕的时候别怪我。' },
      { id: 'cuizhenzi', name: '催阵子', price: 3, desc: '黄豆大的药丸子，扔浴桶里化开。人泡进去浑身发烫，皮肤敏感得跟换了个人似的。泡完出来不用我教了吧？床就在那儿，水温刚好，人更刚好。' },
      { id: 'xiangsidan', name: '相思丹', price: 4, desc: '朱红小药丸，绿豆大。吃下去一刻钟面颊生晕心跳加速，她自个儿就湿了，跟喝了酒似的但又没醉。给她吃还是自己吃都行，俩人一起吃更好。' },
      { id: 'shenxujiao', name: '慎恤胶', price: 5, desc: '汉朝古方，鹿茸海马紫河车炼的，龙眼大一颗。黄酒送服，提前半个时辰吃。一颗下去今晚你想停她未必让你停。赵飞燕用过，她后来吃太多了，你比她惜命，一颗够了。第二天腿软别怨我，反正也不是天天用。' },
      { id: 'dongqingsan', name: '动情散', price: 2, desc: '粉末状的，跟胡椒面似的。洒在酒里茶里都行，无色无味，一杯下去一盏茶的功夫她就往你身上贴。比药丸子快，比膏药隐蔽，饭桌上就能把事办了。一包三回的量，省着用。' },
      { id: 'zhuqinghua', name: '助情花', price: 3, desc: '西域干花瓣，搁炭火上焙，不用明火。焙出来的味儿跟桂花有点像又不太像，反正闻着闻着裤子就紧了。比暖情香省事，不用香炉，炭火盆就成。一包能焙三四回。' },
      { id: 'huangudan', name: '换骨丹', price: 5, desc: '道门里传出来的方子，名字听着唬人，其实就是让你家姑娘浑身酥得跟没骨头似的。吃下去以后你碰哪儿她都软，轻轻摸一下跟过电一样。一颗管一个时辰，提前一刻钟吃。别跟慎恤胶一块儿用，药性叠了别来找我。' }
    ] },
    { cat: '枕边小物', items: [
      { id: 'hehuanling', name: '合欢铃', price: 3, desc: '小铜铃一对，系她脚踝上。你一动她就响，她一动也响，叮叮当当的跟给你俩打拍子似的。系手腕也行系哪儿都行，反正响起来你就知道使对地方了。' },
      { id: 'bailingdai', name: '白绫带', price: 1, desc: '素白丝绫编的，又软又韧。绑手腕、束腰、蒙眼睛，怎么用全看你想象力。便宜，但玩好了花样最多。新手先拿这个练手，玩不坏。' },
      { id: 'qinxian', name: '琴弦', price: 2, desc: '蚕丝绞的细弦，柔韧里带点涩。系在腕上腰上，你一动它就收紧，你一停它就松，跟弹琴似的，越动弹越有滋味。系松点，别勒出印子。' },
      { id: 'jinlianbei', name: '金莲杯', price: 2, desc: '绣花弓鞋一双，崭新的。斟了酒从鞋里嘬着喝，你一口她一口，喝着喝着嘴就凑一块儿去了。文人管这叫风雅，我说就是换个花样摸腿，别装了。' },
      { id: 'chungongtuce', name: '春宫图册', price: 2, desc: '唐寅真迹摹本，十二页，纸墨精良。画得讲究，姿势含蓄但有味道。跟你家姑娘一块儿翻着看，翻两页她自己就脸红了，脸红了你手就可以动了。' },
      { id: 'bihuotu', name: '避火图', price: 1, desc: '民间刻版秘戏图谱，三十六页不重样，该露的全露。跟你家姑娘翻到哪页学哪页，学完了告诉我哪页最好使。挂床头避火，避的是哪种火你心里有数。' },
      { id: 'xiangsitao', name: '相思套', price: 2, desc: '羊肠做的，薄得跟蝉翅膀似的。两个用处，避妊是一个，另一个嘛你用了就知道了，比不用舒服。用前温水泡软了套上，别干套，干套疼。' },
      { id: 'yubiaotao', name: '鱼膘套', price: 1, desc: '黄河大鲤鱼的鱼鳔做的，比羊肠还薄还透。就一个毛病，尺寸偏小。你要是天生本钱大就别试了，勒得慌。普通身板的客官买这个比相思套划算。' },
      { id: 'hongsheng', name: '红绳', price: 2, desc: '朱红丝绳，比白绫带细，比琴弦软，专门绑手腕脚踝的。颜色衬得皮肤白，比白绫带多了层闺房秀色的意思。系法有讲究，系松了挣得开，系紧了勒印子，回头买了我教你几个结。' },
      { id: 'xiyangsiva', name: '西洋丝袜', price: 3, desc: '西洋舶来货，蚕丝织的，薄得透肉。顺着腿往上一拉，那个紧那个滑，你家姑娘穿上以后你眼睛就不想往别处看了。两条腿缠你腰上的时候跟没穿差不多，又比没穿强。就一双，省着穿，勾了丝别来找我。' }
    ] }
  ];

  // 按 id 查器物（购买逻辑用）
  function fengyueFind(id) {
    for (let c = 0; c < FENGYUE_SHELF.length; c++) {
      const items = FENGYUE_SHELF[c].items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) return items[i];
      }
    }
    return null;
  }

  // 渲染「货架」一个分类的折叠面板
  function fengyueCat(cat, owned) {
    const items = cat.items;
    let grid = '';
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const ownedQty = pn(ln(owned, it.name + '.数量', 0), 0);
      const affordable = true; // 价格判定在渲染时用点数算，这里先放行，购买时再校验
      grid += `
        <div class="jbw-fy-item" data-item-id="${esc(it.id)}">
          <div class="jbw-fy-item-body">
            <div class="jbw-fy-item-title">
              <b>${esc(it.name)}</b>
              <span class="jbw-fy-price">${it.price} 点</span>
            </div>
            <p class="jbw-fy-desc">${esc(it.desc)}</p>
            ${ownedQty > 0 ? '<small class="jbw-fy-owned">已拥有 ×' + ownedQty + '</small>' : ''}
          </div>
          <button class="jbw-fy-buy" data-action="jbw-fy-buy" data-item-id="${esc(it.id)}">${ownedQty > 0 ? '再买' : '购买'}</button>
        </div>`;
    }
    return `
      <details class="jbw-fold jbw-fy-cat" open>
        <summary>${esc(cat.cat)} <span class="jbw-fold-hint">${items.length} 件</span></summary>
        <div class="jbw-fold-body jbw-fy-grid">${grid}</div>
      </details>`;
  }

  // 渲染「我的器物」清单
  function fengyueOwnedList(owned) {
    const names = Object.keys(owned);
    if (!names.length) return '<p class="jbw-empty">尚未购买任何器物。来都来了，不看看？</p>';
    let html = '<div class="jbw-fy-owned-list">';
    for (let i = 0; i < names.length; i++) {
      const n = names[i];
      const it = owned[n] || {};
      const qty = pn(it['数量'], 1);
      html += `
        <article class="jbw-fy-owned-item">
          <div class="jbw-fy-item-title"><b>${esc(n)}</b>${tag('×' + qty, 'private')}</div>
          <p class="jbw-fy-desc">${esc(it['简介'] || '')}</p>
        </article>`;
    }
    html += '</div>';
    return html;
  }

  function renderFengyue(stat) {
    const fy = (stat && stat['风月阁']) || {};
    const points = pn(fy['同房点数'], 0);
    const owned = fy['器物'] || {};

    // 货架：三类折叠
    let shelfHtml = '';
    for (let c = 0; c < FENGYUE_SHELF.length; c++) {
      shelfHtml += fengyueCat(FENGYUE_SHELF[c], owned);
    }

    // 已拥有器物件数
    const ownedCount = Object.keys(owned).reduce(function (s, n) {
      return s + pn((owned[n] || {}).数量, 1);
    }, 0);

    return `
<div class="jbw jbw-fengyue-root">
  <div class="jbw-top">
    <span class="jbw-brand"><b>江山北望</b></span>
    <span class="jbw-tag">风月阁</span>
  </div>

  <section class="jbw-fy-ledger">
    <div class="jbw-fy-ledger-left">
      <span class="jbw-fy-coin">⿓</span>
      <span>同房点数：<b>${points}</b></span>
    </div>
    <span class="jbw-fy-ledger-hint">已藏器物 ${ownedCount} 件</span>
  </section>

  <div class="jbw-fy-cols">
    <div class="jbw-fy-col">
      <h3 class="jbw-fy-h">货架</h3>
      ${shelfHtml}
    </div>
    <div class="jbw-fy-col">
      <h3 class="jbw-fy-h">我的器物</h3>
      ${fengyueOwnedList(owned)}
    </div>
  </div>
</div>`;
  }

  // ---------- 人物谱系（关系图，ECharts 力导向） ----------
  // 数据源：stat.ui.relationshipGraph = { categories, nodes, links }
  // 与原卡一致：categories=[{name,color,symbol}]，nodes=[{id,name,category,symbolSize,symbol,desc}]，
  //   links=[{source,target,label,lineStyle:{color,type}}]
  // 完全对齐原卡云端 statusbar 的 graph 页签：拖拽 / 缩放 / 搜索高亮 / 点击查看档案 / 关联跳转

  // 关系图缓存（供交互层复用）
  let _graphCategories = [];
  let _graphNodes = [];
  let _graphLinks = [];
  let _graphSelectedId = '';

  // 从 stat 里抽取关系图数据（带兜底）
  function graphDataOf(stat) {
    const g = (stat && stat['ui'] && stat['ui']['relationshipGraph']) || (stat && stat['relationshipGraph']) || {};
    const cats = Array.isArray(g['categories']) && g['categories'].length
      ? g['categories']
      : [{ name: '未建档', color: '#8b8178', symbol: 'circle' }];
    let nodes = Array.isArray(g['nodes']) && g['nodes'].length
      ? g['nodes']
      : [{ id: '主角', name: '主角', category: 0, symbolSize: 64, symbol: 'circle', desc: '人物谱系尚未建档；可在世界书或变量中补充 ui.relationshipGraph。' }];
    const links = Array.isArray(g['links']) ? g['links'] : [];
    return { cats: cats, nodes: nodes, links: links };
  }

  // 图例（含「主角」固定在最前）
  function graphLegendHtml(cats) {
    const names = ['主角'].concat(cats.map(function (c) { return c['name']; }));
    const colors = ['#d4a040'].concat(cats.map(function (c) { return c['color'] || '#999'; }));
    return names.map(function (n, i) {
      return '<span class="jbw-graph-legend-item"><i style="background:' + colors[i] + '"></i>' + esc(n) + '</span>';
    }).join('');
  }

  // 单个人物详情卡（右侧）
  function graphDetailHtml(node) {
    if (!node) node = { id: '主角', name: '主角', category: 0, desc: '' };
    const links = _graphLinks;
    // 关联人物：source 或 target 命中当前节点
    const rels = [];
    links.forEach(function (l) {
      if (l['source'] === node.id) rels.push({ other: l['target'], label: l['label'] });
      else if (l['target'] === node.id) rels.push({ other: l['source'], label: l['label'] });
    });
    const catName = (function () {
      if (node.id === '主角') return '主角';
      const cat = _graphCategories[node.category];
      return cat && cat.name ? cat.name : '未知';
    })();
    let relHtml = '';
    if (rels.length) {
      relHtml = '<h4>关联人物</h4><div class="jbw-graph-relations">' + rels.map(function (r) {
        return '<button class="jbw-graph-relation" data-action="jbw-graph-select" data-node-id="' + esc(r.other) + '"><b>' + esc(r.other) + '</b><span>' + esc(r.label || '') + '</span></button>';
      }).join('') + '</div>';
    }
    return '<div class="jbw-graph-detail-card">'
      + '<p class="jbw-kicker">人物档案</p>'
      + '<h3>' + esc(node.name) + '</h3>'
      + '<div class="jbw-graph-detail-cat">' + esc(catName) + '</div>'
      + '<p class="jbw-heart">' + esc(node.desc || '暂无记载。') + '</p>'
      + relHtml
      + '</div>';
  }

  // 渲染人物谱系（返回容器 HTML；ECharts 在 bind 后由 initGraph 挂载）
  function renderGraph(stat) {
    const gd = graphDataOf(stat);
    _graphCategories = gd.cats;
    _graphNodes = gd.nodes;
    _graphLinks = gd.links;
    // 选中项默认主角
    _graphSelectedId = '';
    const first = _graphNodes.find(function (n) { return n.id === '主角'; }) || _graphNodes[0];
    if (first) _graphSelectedId = first.id;

    return `
<div class="jbw jbw-graph-root">
  <div class="jbw-top">
    <span class="jbw-brand"><b>江山北望</b></span>
    <span class="jbw-tag">人物谱系 · ${_graphNodes.length} 人 · ${_graphLinks.length} 层关系</span>
  </div>

  <div class="jbw-graph-wrap">
    <div class="jbw-graph-toolbar">
      <label class="jbw-graph-search">
        <span>寻人</span>
        <input id="jbw-graph-search-input" placeholder="输入人名、地点、身份……" autocomplete="off" />
      </label>
      <button class="jbw-mini-action" data-action="jbw-graph-search">搜索</button>
    </div>

    <div class="jbw-graph-legend">${graphLegendHtml(_graphCategories)}</div>

    <div class="jbw-graph-stage">
      <div id="jbw-graph-wrapper">
        <div id="jbw-graph"></div>
      </div>
      <aside id="jbw-graph-detail" class="jbw-graph-detail">${graphDetailHtml(first)}</aside>
    </div>
  </div>

  <p class="jbw-graph-hint">可拖拽节点 · 滚轮缩放 · 点击人物查看详情 · 搜索会高亮匹配人物</p>
</div>
<script>setTimeout(function(){ if (window.JSBW && window.JSBW.initGraph) window.JSBW.initGraph(); }, 0);</script>`;
  }

  // ---------- 天下舆图（东晋十六国格局 · ECharts 历史地图） ----------
  // 沿用原卡《残明余烬》的东亚历史底图（world_1634_overview，明末府级区划），
  // 以「东晋十六国」势力重新着色，地区名在 GeoJSON 源头替换为东晋州郡名（杜绝「江西/湖广/河南/山东」漏出）。
  // 三大架空势力：宣国（东晋）、邬奴（前秦）、燕国（前燕），其余史实势力保留原名。
  // 河流（长江/黄河/天河=淮河）为水系线，悬停显示河名；点击地区弹出「州郡舆图」详情浮层。
  // 数据分发：地图数据 + echarts 均从 jsdelivr CDN 动态加载（与人物谱系页签一致）。

  // 势力配色（fill 疆域填色 / seal 印章色）
  const MAP_FORCE_COLOR = {
    '宣国':   { fill: '#b85850', seal: '#a43d2d' },
    '邬奴':   { fill: '#7a9a6a', seal: '#4c7a4c' },
    '燕国':   { fill: '#5f86a8', seal: '#3a5f7a' },
    '吐谷浑': { fill: '#c0a060', seal: '#8a6a30' },
    '柔然':   { fill: '#b39a72', seal: '#7a6444' },
    '高句丽': { fill: '#7a8fa8', seal: '#4a5f78' },
    '诸羌':   { fill: '#a890a0', seal: '#7a6078' },
    '倭':     { fill: '#9a9a9a', seal: '#6a6a6a' },
    '周边诸国':{ fill: '#b8b0a0', seal: '#8a8272' },
    '流民义军':{ fill: '#c07a3a', seal: '#8a5a2a' },
    '地方中立':{ fill: '#9a9a92', seal: '#6a6a62' },
  };

  // 地区（明末名）→ 势力
  const MAP_AREA_FORCE = {
    '南直隶':'宣国', '浙江':'宣国', '江西':'宣国', '湖广':'宣国',
    '福建':'宣国', '广东':'宣国', '广西':'宣国', '云南':'宣国',
    '贵州':'宣国', '四川':'宣国',
    '陕西':'邬奴', '山西':'邬奴', '河南':'邬奴', '宁夏':'邬奴', '西域':'邬奴',
    '北直隶':'燕国', '山东':'燕国', '辽东':'燕国',
    '青海':'吐谷浑', '察哈尔':'柔然', '后金':'高句丽',
    '乌思藏':'诸羌', '日本':'倭', '朝鲜':'高句丽',
    '东番':'周边诸国', '莫卧儿':'周边诸国', '暹罗':'周边诸国',
    '不丹':'周边诸国', '尼婆罗':'周边诸国', '吕宋':'周边诸国',
    '爪哇':'周边诸国', '郑主':'周边诸国', '澜沧':'周边诸国', '澳洲':'周边诸国',
  };

  // 地区名映射：明末 → 东晋州郡 + 治所
  const MAP_AREA_JIN = {
    '南直隶': { 名:'扬州', 治所:'建康（京畿）' },
    '浙江':   { 名:'会稽', 治所:'会稽（吴兴）' },
    '江西':   { 名:'江州', 治所:'寻阳（九江）' },
    '湖广':   { 名:'荆州', 治所:'江陵' },
    '福建':   { 名:'建安', 治所:'建安（晋安）' },
    '广东':   { 名:'广州', 治所:'番禺' },
    '广西':   { 名:'桂林', 治所:'桂林（郁林）' },
    '云南':   { 名:'宁州', 治所:'滇池' },
    '贵州':   { 名:'牂柯', 治所:'牂柯（宁州）' },
    '四川':   { 名:'益州', 治所:'成都' },
    '陕西':   { 名:'雍州', 治所:'长安' },
    '山西':   { 名:'并州', 治所:'晋阳（太原）' },
    '河南':   { 名:'豫州', 治所:'洛阳' },
    '宁夏':   { 名:'秦州', 治所:'陇右' },
    '西域':   { 名:'西域', 治所:'龟兹' },
    '北直隶': { 名:'幽州', 治所:'蓟城' },
    '山东':   { 名:'青州', 治所:'广固' },
    '辽东':   { 名:'平州', 治所:'龙城' },
    '青海':   { 名:'吐谷浑', 治所:'伏俟城' },
    '察哈尔': { 名:'柔然', 治所:'漠北' },
    '后金':   { 名:'高句丽', 治所:'丸都' },
    '乌思藏': { 名:'诸羌', 治所:'—' },
    '日本':   { 名:'倭国', 治所:'大和' },
    '朝鲜':   { 名:'三韩', 治所:'平壤' },
    '东番':   { 名:'夷洲', 治所:'—' },
    '莫卧儿': { 名:'笈多', 治所:'华氏城' },
    '暹罗':   { 名:'扶南', 治所:'—' },
    '不丹':   { 名:'雪山诸部', 治所:'—' },
    '尼婆罗': { 名:'尼婆罗', 治所:'—' },
    '吕宋':   { 名:'吕宋诸邦', 治所:'—' },
    '爪哇':   { 名:'爪哇诸邦', 治所:'—' },
    '郑主':   { 名:'林邑', 治所:'—' },
    '澜沧':   { 名:'真腊', 治所:'—' },
    '澳洲':   { 名:'南方大陆', 治所:'—' },
  };

  // 图例顺序（显示疆域填色的势力）
  const MAP_LEGEND_ORDER = ['宣国','邬奴','燕国','吐谷浑','柔然','高句丽','诸羌','倭','周边诸国'];

  // 势力详情简介
  const MAP_FORCE_INTRO = {
    '宣国':   { 国号:'宣国', 对应:'东晋', 都城:'宣京（建康）', 疆域:'扬州、江州、荆州、湘州、广州、宁州、益州',
      简介:'天河之南的南渡朝廷，承中原衣冠，偏安一隅。荆扬相衡、门阀林立，外有邬奴压境，内有权臣党争。' },
    '邬奴':   { 国号:'邬奴', 对应:'前秦', 都城:'王庭（长安）', 疆域:'雍州、并州、豫州、秦州、西域',
      简介:'北侵胡族之首，横扫北方诸国，势欲渡河吞并江南。军势浩大，然内部诸部未稳，隐忧暗伏。' },
    '燕国':   { 国号:'燕国', 对应:'前燕', 都城:'龙城（蓟）', 疆域:'幽州、冀州、青州、平州',
      简介:'鲜卑慕容氏所建，据河北山东辽东，东临沧海。与邬奴分庭抗礼，亦南窥宣国青徐之地。' },
    '吐谷浑': { 国号:'吐谷浑', 对应:'吐谷浑', 都城:'伏俟城', 疆域:'青海高原',
      简介:'鲜卑慕容别部西迁青海，据河湟水草，畜牧为业，周旋于南北之间。' },
    '柔然':   { 国号:'柔然', 对应:'柔然/鲜卑拓跋', 都城:'漠北王庭', 疆域:'漠南草原',
      简介:'漠北草原游牧诸部，控弦数十万，为北境心腹之患。' },
    '高句丽': { 国号:'高句丽', 对应:'高句丽', 都城:'丸都/平壤', 疆域:'辽东塞外、朝鲜半岛',
      简介:'东北雄藩，据辽东塞外，与鲜卑诸部相接。' },
    '诸羌':   { 国号:'诸羌', 对应:'羌氐诸部', 都城:'—', 疆域:'乌思藏高原',
      简介:'青藏高原诸羌部落，地远而民悍，时叛时附。' },
    '倭':     { 国号:'倭国', 对应:'倭（日本列岛）', 都城:'大和', 疆域:'日本列岛',
      简介:'东海列岛之国，隔海相望，时遣使通问。' },
    '周边诸国':{ 国号:'周边诸国', 对应:'南海诸国', 都城:'—', 疆域:'东南亚、南海',
      简介:'南海诸国，朝贡通商，远在天涯。' },
  };

  // ==================== 地区态势（静态兜底，对齐变量树 天下地图.地区态势） ====================
  // 字段与变量树完全一致：名义归属/实控势力/实控阵营/争夺状态/附注/主要势力{影响力/军事存在/描述}/军事态势/经济态势/最近大事
  // 世界书填好变量树后，前端优先读变量树；此处为史实兜底，保证点击总有详实内容。
  const MAP_AREA_SITUATION = {
    // ===== 宣国（东晋）十州 =====
    '南直隶': { 名义归属:'宣国', 实控势力:'宣国（京畿朝廷）', 实控阵营:'宣廷', 争夺状态:'稳定',
      附注:'宣京所在，衣冠南渡之根本。',
      主要势力: { '宣廷': { 影响力:90, 军事存在:'台城禁军、京口北府兵、建康水师', 描述:'朝廷中枢与京畿腹地，门阀林立，北府兵坐镇京口。' } },
      军事态势:'京口北府兵为朝廷精锐，沿江布防，戒备邬奴南渡。', 经济态势:'三吴财赋所聚，漕运通达，为宣国财源根本。', 最近大事:'宣廷朝堂党争渐起，主战主和两派相持。' },
    '浙江': { 名义归属:'宣国', 实控势力:'宣国（会稽）', 实控阵营:'宣廷', 争夺状态:'稳定',
      附注:'三吴故地，膏腴之壤。',
      主要势力: { '宣廷': { 影响力:80, 军事存在:'会稽郡兵、吴兴屯戍', 描述:'江南豪族聚居，三吴财赋源源输往宣京。' } },
      军事态势:'腹地无虞，偶有流民啸聚。', 经济态势:'鱼米丝绸之乡，赋税甲于诸州。', 最近大事:'会稽豪族与侨姓士族争田，隐有龃龉。' },
    '江西': { 名义归属:'宣国', 实控势力:'宣国（江州）', 实控阵营:'宣廷', 争夺状态:'稳定',
      附注:'江州居荆扬之间，为东西枢纽。',
      主要势力: { '宣廷': { 影响力:75, 军事存在:'寻阳水师、豫章屯兵', 描述:'江州据长江中游，控扼荆扬，为兵家必争之冲要。' } },
      军事态势:'寻阳水师巡江，东西呼应。', 经济态势:'鄱阳鱼米，江湖之利。', 最近大事:'江州刺史与荆州都督暗自角力。' },
    '湖广': { 名义归属:'宣国', 实控势力:'宣国（荆州）', 实控阵营:'宣廷', 争夺状态:'动荡',
      附注:'国之西门，荆州重镇。',
      主要势力: { '宣廷': { 影响力:70, 军事存在:'江陵守军、荆州都督府', 描述:'荆州为宣国上游屏藩，与扬州相衡，权重兵强。' },
                  '流民义军': { 影响力:15, 军事存在:'巴峡流民', 描述:'湘西、巴东流民时起，掳掠州县。' } },
      军事态势:'荆襄上游防务吃紧，须防北兵自南阳、襄阳南下。', 经济态势:'江汉粮秣，楚地物产丰饶。', 最近大事:'荆州都督募兵增防，与邬奴前哨小有冲突。' },
    '福建': { 名义归属:'宣国', 实控势力:'宣国（建安）', 实控阵营:'宣廷', 争夺状态:'稳定',
      附注:'闽中僻处东南，山海险阻。',
      主要势力: { '宣廷': { 影响力:60, 军事存在:'建安郡兵', 描述:'闽越旧地，山越间出，郡县羁縻。' } },
      军事态势:'山海偏远，内乱少。', 经济态势:'山货海盐，商舶渐兴。', 最近大事:'无大事。' },
    '广东': { 名义归属:'宣国', 实控势力:'宣国（广州）', 实控阵营:'宣廷', 争夺状态:'稳定',
      附注:'岭南都会，市舶通番。',
      主要势力: { '宣廷': { 影响力:65, 军事存在:'番禺驻军、广州刺史府', 描述:'广州据岭南，通海舶，商贾辐辏。' } },
      军事态势:'岭南僻远，无北顾之忧。', 经济态势:'珍珠、犀象、香药之利，商舶往来。', 最近大事:'市舶司税入渐丰。' },
    '广西': { 名义归属:'宣国', 实控势力:'宣国（桂林）', 实控阵营:'宣廷', 争夺状态:'稳定',
      附注:'岭西瘴疠之地，溪峒杂处。',
      主要势力: { '宣廷': { 影响力:50, 军事存在:'桂林郡兵', 描述:'郁林、桂林诸郡，溪峒蛮僚羁縻而治。' } },
      军事态势:'溪峒偶叛，郡兵可平。', 经济态势:'地瘠民贫，多赖岭南转输。', 最近大事:'无大事。' },
    '云南': { 名义归属:'宣国', 实控势力:'宣国（宁州）', 实控阵营:'宣廷', 争夺状态:'动荡',
      附注:'南中半羁縻，爨氏豪强。',
      主要势力: { '宣廷': { 影响力:45, 军事存在:'滇池戍军', 描述:'南中爨氏世据，朝廷羁縻，号令难达。' },
                  '地方豪强': { 影响力:40, 军事存在:'爨氏部曲', 描述:'爨氏为南中大姓，坐拥部曲，隐然自立。' } },
      军事态势:'南中豪强坐大，朝廷鞭长莫及。', 经济态势:'金银盐铁，山泽之利多为豪强把持。', 最近大事:'爨氏与宁州刺史争权。' },
    '贵州': { 名义归属:'宣国', 实控势力:'宣国（牂柯）', 实控阵营:'宣廷', 争夺状态:'动荡',
      附注:'牂柯夜郎故地，夷僚盘踞。',
      主要势力: { '宣廷': { 影响力:35, 军事存在:'牂柯戍卒', 描述:'牂柯蛮夷杂处，郡县虚设，羁縻而已。' } },
      军事态势:'夷僚时叛，难以深入。', 经济态势:'地贫山险，赋税无几。', 最近大事:'无大事。' },
    '四川': { 名义归属:'宣国', 实控势力:'宣国（益州）', 实控阵营:'宣廷', 争夺状态:'动荡',
      附注:'天府之国，上游重地。',
      主要势力: { '宣廷': { 影响力:65, 军事存在:'成都守军、益州都督', 描述:'益州据长江上游，天府之土，为宣国西陲屏障。' },
                  '成汉余党': { 影响力:20, 军事存在:'巴蜀流民', 描述:'成汉虽灭，巴氐流民余部仍有异动。' } },
      军事态势:'巴蜀上游须防北兵自汉中入，亦须抚流民。', 经济态势:'天府粮仓，蜀锦盐井之利。', 最近大事:'益州刺史抚流民、缮城防。' },
    // ===== 邬奴（前秦）五州 =====
    '陕西': { 名义归属:'邬奴', 实控势力:'邬奴（王庭）', 实控阵营:'邬奴', 争夺状态:'稳定',
      附注:'邬奴王庭所在，关中之根本。',
      主要势力: { '邬奴': { 影响力:95, 军事存在:'王庭禁军、关中诸营', 描述:'关中形胜之地，邬奴王庭据此，虎视南北。' } },
      军事态势:'王庭禁军精强，蓄势待发，图谋南渡。', 经济态势:'关中沃野，八百里秦川。', 最近大事:'邬奴王庭整军经武，南侵之意渐显。' },
    '山西': { 名义归属:'邬奴', 实控势力:'邬奴（并州）', 实控阵营:'邬奴', 争夺状态:'稳定',
      附注:'并州表里山河，北境要冲。',
      主要势力: { '邬奴': { 影响力:80, 军事存在:'晋阳守军、并州诸营', 描述:'并州据河东，控扼燕、赵，为邬奴北道重镇。' } },
      军事态势:'并州驻军戒备燕国与漠南诸部。', 经济态势:'河东盐铁之利。', 最近大事:'无大事。' },
    '河南': { 名义归属:'邬奴', 实控势力:'邬奴（豫州）', 实控阵营:'邬奴', 争夺状态:'争夺中',
      附注:'洛阳故都，中原腹心，南北拉锯。',
      主要势力: { '邬奴': { 影响力:60, 军事存在:'洛阳守军、豫州诸营', 描述:'洛阳为故都，邬奴据之，与宣国隔天河对峙。' },
                  '宣国': { 影响力:25, 军事存在:'北伐前锋', 描述:'宣国志在克复中原，屡次北伐窥伺洛阳。' } },
      军事态势:'天河沿线为南北拉锯之地，双方前锋时有交兵。', 经济态势:'中原残破，户口流散，然战略价值极重。', 最近大事:'邬奴、宣国前锋于天河沿线小规模交锋。' },
    '宁夏': { 名义归属:'邬奴', 实控势力:'邬奴（秦州）', 实控阵营:'邬奴', 争夺状态:'动荡',
      附注:'陇右诸羌杂处。',
      主要势力: { '邬奴': { 影响力:55, 军事存在:'陇右戍军', 描述:'陇右地接诸羌，邬奴驻军羁縻。' },
                  '诸羌': { 影响力:30, 军事存在:'羌氐诸部', 描述:'陇右羌氐诸部时叛时附，为邬奴西顾之患。' } },
      军事态势:'陇右诸羌不稳，邬奴须分兵镇抚。', 经济态势:'牧马之地，马政所系。', 最近大事:'陇右羌部小有叛乱，旋被平定。' },
    '西域': { 名义归属:'邬奴', 实控势力:'邬奴（西域都护）', 实控阵营:'邬奴', 争夺状态:'稳定',
      附注:'天山南北，丝绸之路要冲。',
      主要势力: { '邬奴': { 影响力:70, 军事存在:'西域都护府、戍卒', 描述:'邬奴设西域都护，镇抚天山南北诸国。' } },
      军事态势:'西域诸国朝贡羁縻，都护府维系商道。', 经济态势:'丝路商贾辐辏，驼马皮毛之利。', 最近大事:'龟兹、焉耆诸国遣使朝贡。' },
    // ===== 燕国（前燕）三州 =====
    '北直隶': { 名义归属:'燕国', 实控势力:'燕国（幽州）', 实控阵营:'燕国', 争夺状态:'稳定',
      附注:'幽州龙兴之地，蓟城为都。',
      主要势力: { '燕国': { 影响力:85, 军事存在:'蓟城禁军、幽州诸镇', 描述:'幽州为慕容氏龙兴根本，蓟城为都，控扼山海关内外。' } },
      军事态势:'燕国据幽州，东控辽东，南窥青冀，与邬奴分庭。', 经济态势:'幽蓟富庶，兼得马政之利。', 最近大事:'燕国王庭整军，谋与邬奴争雄。' },
    '山东': { 名义归属:'燕国', 实控势力:'燕国（青州）', 实控阵营:'燕国', 争夺状态:'争夺中',
      附注:'青州富庶，南接宣国。',
      主要势力: { '燕国': { 影响力:65, 军事存在:'广固守军、青州诸营', 描述:'青州为燕国南道重镇，与宣国隔河相望。' },
                  '宣国': { 影响力:25, 军事存在:'青徐北伐军', 描述:'宣国志在克复青徐，屡次北伐。' } },
      军事态势:'青徐之地为燕、宣拉锯，战事频仍。', 经济态势:'青州沃壤，鱼盐之利。', 最近大事:'燕宣两军于青徐边境对峙。' },
    '辽东': { 名义归属:'燕国', 实控势力:'燕国（平州）', 实控阵营:'燕国', 争夺状态:'稳定',
      附注:'龙城故地，慕容氏发祥。',
      主要势力: { '燕国': { 影响力:75, 军事存在:'龙城守军、平州诸镇', 描述:'辽东为慕容氏发祥之地，龙城旧都，北接高句丽。' } },
      军事态势:'辽东须防备高句丽与漠南诸部。', 经济态势:'辽河沃野，马匹皮毛。', 最近大事:'高句丽与燕国于辽东边境时有摩擦。' },
    // ===== 史实势力 =====
    '青海': { 名义归属:'吐谷浑', 实控势力:'吐谷浑', 实控阵营:'吐谷浑', 争夺状态:'稳定',
      附注:'鲜卑慕容别部，据河湟水草。',
      主要势力: { '吐谷浑': { 影响力:80, 军事存在:'河湟骑众', 描述:'吐谷浑据青海，畜牧为业，周旋于南北之间。' } },
      军事态势:'吐谷浑骑众骁勇，南北皆以礼羁縻。', 经济态势:'畜牧马牛羊，皮毛交易。', 最近大事:'吐谷浑可汗遣使与宣国通好。' },
    '察哈尔': { 名义归属:'柔然', 实控势力:'柔然（漠南诸部）', 实控阵营:'柔然', 争夺状态:'争夺中',
      附注:'漠南草原游牧诸部，控弦数十万。',
      主要势力: { '柔然': { 影响力:55, 军事存在:'漠南骑众', 描述:'漠南诸部游牧为生，时附时叛，为北境心腹之患。' },
                  '邬奴': { 影响力:30, 军事存在:'北边戍军', 描述:'邬奴设防北境，图谋收抚漠南诸部。' } },
      军事态势:'漠南诸部游移不定，南北皆欲收为己用。', 经济态势:'游牧为业，马牛羊为货。', 最近大事:'漠南诸部内部盟誓，动向未明。' },
    '后金': { 名义归属:'高句丽', 实控势力:'高句丽', 实控阵营:'高句丽', 争夺状态:'稳定',
      附注:'东北雄藩，据辽东塞外。',
      主要势力: { '高句丽': { 影响力:75, 军事存在:'丸都守军、辽东塞外诸城', 描述:'高句丽据辽东塞外，与燕国、鲜卑诸部相接。' } },
      军事态势:'高句丽山城坚固，燕国亦不敢轻犯。', 经济态势:'农猎兼营，铁器精良。', 最近大事:'高句丽与燕国于辽东边境对峙。' },
    '乌思藏': { 名义归属:'诸羌', 实控势力:'诸羌诸部', 实控阵营:'诸羌', 争夺状态:'稳定',
      附注:'青藏高原羌氐诸部。',
      主要势力: { '诸羌': { 影响力:70, 军事存在:'高原羌氐部众', 描述:'青藏高原诸羌氐部落，地远而民悍，时叛时附。' } },
      军事态势:'高原险远，南北皆难深入。', 经济态势:'畜牧青稞，皮毛之利。', 最近大事:'无大事。' },
    '日本': { 名义归属:'倭国', 实控势力:'倭国（大和）', 实控阵营:'倭', 争夺状态:'稳定',
      附注:'东海列岛，隔海相望。',
      主要势力: { '倭': { 影响力:70, 军事存在:'大和朝廷诸豪族', 描述:'东海列岛之国，大和朝廷渐兴，豪族林立。' } },
      军事态势:'隔海无虞。', 经济态势:'岛国物产，时遣使通问。', 最近大事:'倭国遣使渡海通问。' },
    '朝鲜': { 名义归属:'三韩', 实控势力:'高句丽/百济/新罗', 实控阵营:'三韩', 争夺状态:'争夺中',
      附注:'半岛三国并立。',
      主要势力: { '高句丽': { 影响力:40, 军事存在:'北境诸城', 描述:'高句丽据半岛北部，与新罗、百济鼎足。' },
                  '百济': { 影响力:30, 军事存在:'汉城诸城', 描述:'百济据半岛西南，与东晋交好。' },
                  '新罗': { 影响力:30, 军事存在:'庆州诸城', 描述:'新罗据半岛东南，渐次兴起。' } },
      军事态势:'半岛三国互相攻伐，皆欲交好南朝。', 经济态势:'农桑鱼盐，海路通商。', 最近大事:'百济、新罗皆遣使朝贡宣国。' },
    // ===== 周边诸国 =====
    '东番': { 名义归属:'夷洲', 实控势力:'岛夷诸部', 实控阵营:'周边诸国', 争夺状态:'稳定',
      附注:'海东大岛，夷民散处。',
      主要势力: { '岛夷诸部': { 影响力:50, 军事存在:'—', 描述:'海东大岛，夷民散处，未通王化。' } },
      军事态势:'隔海无虞。', 经济态势:'岛夷渔猎。', 最近大事:'无大事。' },
    '莫卧儿': { 名义归属:'笈多', 实控势力:'笈多王朝', 实控阵营:'周边诸国', 争夺状态:'稳定',
      附注:'天竺大国。',
      主要势力: { '笈多': { 影响力:70, 军事存在:'天竺诸军', 描述:'天竺大国，佛法昌盛，与西域通商。' } },
      军事态势:'远在天竺，无涉。', 经济态势:'佛国商路。', 最近大事:'无大事。' },
    '暹罗': { 名义归属:'扶南', 实控势力:'扶南', 实控阵营:'周边诸国', 争夺状态:'稳定',
      附注:'南海大国。',
      主要势力: { '扶南': { 影响力:60, 军事存在:'扶南水师', 描述:'南海大国，据湄公河下游，与南朝通商朝贡。' } },
      军事态势:'远在南海。', 经济态势:'海舶通商，稻米丰饶。', 最近大事:'扶南遣使朝贡。' },
    '不丹': { 名义归属:'雪山诸部', 实控势力:'雪山诸部', 实控阵营:'周边诸国', 争夺状态:'稳定',
      附注:'雪山南麓小国。',
      主要势力: { '雪山诸部': { 影响力:40, 军事存在:'—', 描述:'雪山南麓诸部，僻处一隅。' } },
      军事态势:'无涉。', 经济态势:'山货。', 最近大事:'无大事。' },
    '尼婆罗': { 名义归属:'尼婆罗', 实控势力:'尼婆罗', 实控阵营:'周边诸国', 争夺状态:'稳定',
      附注:'雪山之国。',
      主要势力: { '尼婆罗': { 影响力:40, 军事存在:'—', 描述:'雪山之国，与天竺相接。' } },
      军事态势:'无涉。', 经济态势:'山货。', 最近大事:'无大事。' },
    '吕宋': { 名义归属:'吕宋诸邦', 实控势力:'吕宋诸邦', 实控阵营:'周边诸国', 争夺状态:'稳定',
      附注:'南海群岛。',
      主要势力: { '吕宋诸邦': { 影响力:40, 军事存在:'—', 描述:'南海群岛诸邦，与华南海舶通商。' } },
      军事态势:'无涉。', 经济态势:'海舶互市。', 最近大事:'无大事。' },
    '爪哇': { 名义归属:'爪哇诸邦', 实控势力:'爪哇诸邦', 实控阵营:'周边诸国', 争夺状态:'稳定',
      附注:'南海群岛。',
      主要势力: { '爪哇诸邦': { 影响力:40, 军事存在:'—', 描述:'南海群岛诸邦，海舶往来。' } },
      军事态势:'无涉。', 经济态势:'香药海货。', 最近大事:'无大事。' },
    '郑主': { 名义归属:'林邑', 实控势力:'林邑', 实控阵营:'周边诸国', 争夺状态:'稳定',
      附注:'交州以南。',
      主要势力: { '林邑': { 影响力:45, 军事存在:'林邑兵', 描述:'交州以南古国，与宣国交州相接。' } },
      军事态势:'与交州偶有边衅。', 经济态势:'香木犀象。', 最近大事:'无大事。' },
    '澜沧': { 名义归属:'真腊', 实控势力:'真腊', 实控阵营:'周边诸国', 争夺状态:'稳定',
      附注:'湄公河中游。',
      主要势力: { '真腊': { 影响力:45, 军事存在:'—', 描述:'湄公河中游古国，与扶南相邻。' } },
      军事态势:'无涉。', 经济态势:'稻米。', 最近大事:'无大事。' },
    '澳洲': { 名义归属:'南方大陆', 实控势力:'岛夷', 实控阵营:'周边诸国', 争夺状态:'稳定',
      附注:'南方大陆。',
      主要势力: { '岛夷': { 影响力:30, 军事存在:'—', 描述:'南方大陆，远隔重洋。' } },
      军事态势:'无涉。', 经济态势:'—', 最近大事:'无大事。' },
  };

  // ==================== 蜿蜒水系线 ====================
  const MAP_YANGTZE = [
    [104.0,28.7],[104.6,28.9],[105.2,29.3],[106.0,29.8],[106.8,30.2],
    [107.5,30.0],[108.2,30.4],[109.0,30.6],[109.8,30.2],[110.5,30.0],
    [111.2,30.3],[112.0,30.2],[112.8,29.9],[113.6,29.7],[114.3,30.0],
    [115.0,30.2],[115.8,29.9],[116.6,30.0],[117.4,30.4],[118.2,30.8],
    [118.9,31.2],[119.6,31.6],[120.3,31.7],[121.0,31.5],[121.8,31.4],
  ];
  const MAP_HUANGHE = [
    [102.5,35.0],[103.5,34.9],[104.5,34.8],[105.5,35.0],[106.4,35.6],
    [107.2,36.2],[107.8,36.9],[108.3,37.4],[108.6,37.9],[108.5,38.4],
    [108.1,38.8],[107.4,39.0],[106.5,38.9],[105.5,38.6],[104.5,38.2],
    [104.0,37.6],[104.2,37.0],[104.8,36.5],[105.6,36.0],[106.4,35.5],
    [107.2,35.2],[108.0,35.0],[108.8,34.8],[109.6,34.7],[110.4,34.8],
    [111.2,34.9],[112.0,34.9],[112.8,34.8],[113.6,34.9],[114.4,35.1],
    [115.2,35.3],[116.0,35.6],[116.8,36.0],[117.4,36.5],[117.9,37.0],
    [118.4,37.5],[118.8,37.9],[119.1,38.1],
  ];
  const MAP_HUAIHE = [
    [112.8,32.4],[113.5,32.3],[114.2,32.5],[114.9,32.7],[115.6,32.6],
    [116.3,32.7],[117.0,32.8],[117.6,33.0],[118.2,33.2],[118.8,33.3],
    [119.4,33.4],[120.0,33.6],[120.5,33.8],
  ];
  const MAP_RIVERS = [
    { name:'长江', points: MAP_YANGTZE, color:'#3a7abf' },
    { name:'黄河', points: MAP_HUANGHE, color:'#c8a030' },
    { name:'天河', points: MAP_HUAIHE, color:'#d06020' },
  ];

  // ==================== 城市点（东晋/十六国治所，精简为都城+重镇） ====================
  const MAP_CITIES = [
    { name:'建康', lng:118.79, lat:32.06, force:'宣国', cap:true },
    { name:'江陵', lng:112.19, lat:30.35, force:'宣国' },
    { name:'寻阳', lng:115.99, lat:29.70, force:'宣国' },
    { name:'成都', lng:104.06, lat:30.67, force:'宣国' },
    { name:'番禺', lng:113.26, lat:23.13, force:'宣国' },
    { name:'长安', lng:108.94, lat:34.34, force:'邬奴', cap:true },
    { name:'洛阳', lng:112.45, lat:34.62, force:'邬奴' },
    { name:'晋阳', lng:112.55, lat:37.87, force:'邬奴' },
    { name:'蓟城', lng:116.40, lat:39.90, force:'燕国', cap:true },
    { name:'龙城', lng:120.45, lat:41.58, force:'燕国' },
    { name:'广固', lng:118.15, lat:36.70, force:'燕国' },
    { name:'伏俟城', lng:100.98, lat:36.93, force:'吐谷浑', cap:true },
    { name:'丸都', lng:126.14, lat:41.16, force:'高句丽', cap:true },
  ];

  // 东晋名 → 明末名（内部反查）
  let _mapJin2Raw = null;
  function mapRawOf(name) {
    if (!_mapJin2Raw) {
      _mapJin2Raw = {};
      Object.keys(MAP_AREA_JIN).forEach(function (k) {
        _mapJin2Raw[MAP_AREA_JIN[k].名] = k;
      });
    }
    return _mapJin2Raw[name] || name;
  }

  // 图例 HTML
  function mapLegendHtml() {
    return '<div class="jbw-map-legend">' + MAP_LEGEND_ORDER.map(function (f) {
      const c = MAP_FORCE_COLOR[f];
      if (!c) return '';
      return '<span class="jbw-map-lg"><i style="background:' + c.fill + '"></i>' + f + '</span>';
    }).join('') + '</div>';
  }

  // 阵营/势力名 → 势力配色（宽松匹配：阵营可能是「宣廷/主角方/流民义军」等，统一归入对应势力色）
  function mapForceColorOf(name) {
    if (!name) return null;
    const n = String(name);
    // 先精确匹配势力
    if (MAP_FORCE_COLOR[n]) return MAP_FORCE_COLOR[n];
    // 实控阵营六枚举 + 势力名关键词归并（实控势力优先，其次实控阵营）
    if (/主角方|宣|晋/.test(n)) return MAP_FORCE_COLOR['宣国'];
    if (/邬|奴|乌/.test(n)) return MAP_FORCE_COLOR['邬奴'];
    if (/燕/.test(n)) return MAP_FORCE_COLOR['燕国'];
    if (/吐谷浑|鲜卑慕容别部/.test(n)) return MAP_FORCE_COLOR['吐谷浑'];
    if (/柔然|拓跋|漠南|漠北/.test(n)) return MAP_FORCE_COLOR['柔然'];
    if (/高句丽|三韩|百济|新罗/.test(n)) return MAP_FORCE_COLOR['高句丽'];
    if (/羌|氐|乌思藏/.test(n)) return MAP_FORCE_COLOR['诸羌'];
    if (/倭|日本/.test(n)) return MAP_FORCE_COLOR['倭'];
    if (/流民|义军/.test(n)) return MAP_FORCE_COLOR['流民义军'];
    if (/地方中立|中立/.test(n)) return MAP_FORCE_COLOR['地方中立'];
    return null;
  }

  // 读某地区（东晋名）的变量态势；返回 null 表示变量树未填
  function mapGetDynamic(stat, jinName) {
    if (!stat || !jinName) return null;
    let v = ln(stat, '天下地图.地区态势.' + jinName, null);
    if (!v) {
      // 兜底：地区名可能写了「扬州（南直隶）」之类，或直接是明末名
      const raw = mapRawOf(jinName);
      if (raw && raw !== jinName) v = ln(stat, '天下地图.地区态势.' + raw, null);
    }
    return v;
  }

  // 构造地区着色数据（GeoJSON name 已在源头改成东晋名，regions 必须用东晋名匹配）
  // 着色优先级：变量 实控阵营/实控势力 → 静态 MAP_AREA_FORCE 兜底
  function mapBuildRegionData(stat) {
    const arr = [];
    Object.keys(MAP_AREA_FORCE).forEach(function (area) {
      const staticForce = MAP_AREA_FORCE[area];
      const jin = MAP_AREA_JIN[area];
      const jinName = jin ? jin.名 : area;

      // 动态：读变量树，着色优先级 实控势力 > 实控阵营 > 名义归属 > 静态兜底
      const dyn = mapGetDynamic(stat, jinName) || {};
      let color = null;
      let labelForce = null;
      if (dyn && typeof dyn === 'object') {
        const candidate = dyn.实控势力 || dyn.实控阵营 || dyn.名义归属 || null;
        labelForce = candidate;
        color = mapForceColorOf(candidate);
      }
      if (!color) {
        labelForce = staticForce;
        color = MAP_FORCE_COLOR[staticForce] || MAP_FORCE_COLOR['周边诸国'];
      }

      const c = color;
      const showLabel = (labelForce === '宣国' || labelForce === '邬奴' || labelForce === '燕国' || labelForce === '吐谷浑' || labelForce === '柔然' || labelForce === '高句丽' || labelForce === '诸羌');
      const item = { name: jinName, itemStyle: { areaColor: c.fill } };
      if (showLabel && jin) {
        item.label = {
          show: true, color: '#3a2a1a', fontSize: 11, fontWeight: 'bold',
          formatter: jinName, textShadowColor: 'rgba(255,255,255,.85)', textShadowBlur: 3,
        };
        if (jinName === '广州') item.label.offset = [0, -13];
      }
      arr.push(item);
    });
    return arr;
  }

  // 河流 series
  function mapRiverSeries(river) {
    return {
      name: river.name, type: 'lines',
      coordinateSystem: 'geo', geoIndex: 0,
      zlevel: 10, z: 10, silent: false,
      polyline: true,
      effect: { show: false },
      lineStyle: { color: river.color, width: 3, opacity: .92, curveness: 0.35 },
      emphasis: { lineStyle: { width: 5, opacity: 1 } },
      data: [{ name: river.name, coords: river.points }],
    };
  }

  // 城市 series
  function mapCitySeries() {
    const data = MAP_CITIES.map(function (c) {
      const seal = (MAP_FORCE_COLOR[c.force] || {}).seal || '#666';
      const item = {
        name: c.name, value: [c.lng, c.lat, c.force],
        symbol: 'circle', symbolSize: c.cap ? 10 : 6,
        itemStyle: { color: '#fff', borderColor: seal, borderWidth: c.cap ? 2.5 : 1.8 },
      };
      if (c.cap) {
        item.label = { show: true, position: 'right', formatter: '{b}', color: '#5a2a1a', fontSize: 11, fontWeight: 'bold',
          distance: 4, textShadowColor: '#fff', textShadowBlur: 2 };
      } else {
        item.label = { show: false };
        item.emphasis = { label: { show: true, formatter: '{b}', color: '#3a2a1a', fontSize: 11, fontWeight: 'bold',
          position: 'right', textShadowColor: '#fff', textShadowBlur: 2 } };
      }
      return item;
    });
    return {
      name: '城市', type: 'scatter',
      coordinateSystem: 'geo', geoIndex: 0,
      zlevel: 11, z: 11, silent: false,
      symbolSize: 6,
      label: { show: false },
      emphasis: { label: { show: true, formatter: '{b}', color: '#3a2a1a', fontSize: 11, fontWeight: 'bold',
        position: 'right', textShadowColor: '#fff', textShadowBlur: 2 } },
      data: data,
    };
  }

  // 争夺状态 → 徽标 class
  const MAP_STATUS_CLASS = { '稳定':'stable', '动荡':'turmoil', '争夺中':'contested', '沦陷':'war', '失控':'war', '未载':'unknown' };
  function mapStatusBadge(st) {
    const cls = MAP_STATUS_CLASS[st] || 'unknown';
    return '<span class="jbw-map-badge ' + cls + '">' + esc(st) + '</span>';
  }

  // 取地区态势：优先读变量树 天下地图.地区态势，否则静态史实兜底
  function mapGetSituation(area) {
    const stat = (typeof window !== 'undefined' && window.JSBW && window.JSBW._stat) || null;
    const jinName = (MAP_AREA_JIN[area] || {}).名 || area;
    let v = mapGetDynamic(stat, jinName);
    return v || MAP_AREA_SITUATION[area] || MAP_AREA_SITUATION[jinName] || null;
  }

  // 地区详情弹窗（对齐原卡「地方分图·州郡舆图」样式）
  function showMapModal(area, jin, force) {
    if (typeof document === 'undefined') return;
    // 复用 closePowerModal 移除旧弹窗（.jbw-modal-holder）
    closePowerModal();
    const jinName = jin ? jin.名 : area;
    const zhisuo = jin ? (jin.治所 || '—') : '—';
    const sit = mapGetSituation(area) || {};

    // 印章色/徽标：优先用变量里的实控势力/阵营，回退静态 force
    const colorName = sit.实控势力 || sit.实控阵营 || sit.名义归属;
    let forceForColor = colorName ? mapForceColorOf(colorName) : null;
    if (!forceForColor) forceForColor = mapForceColorOf(force) || MAP_FORCE_COLOR[force] || MAP_FORCE_COLOR['周边诸国'];
    const sealColor = forceForColor.seal;

    const nom = sit.名义归属 || (MAP_AREA_FORCE[area] || '周边诸国');
    const real = sit.实控势力 || force;
    const camp = sit.实控阵营 || force;
    const st = sit.争夺状态 || '未载';

    // 主要势力区块
    let forcesHtml = '';
    const powers = sit.主要势力 || {};
    const pnames = Object.keys(powers);
    if (pnames.length) {
      forcesHtml = '<div class="jbw-sectitle">主要势力</div>' + pnames.map(function (pname) {
        const p = powers[pname] || {};
        const inf = clamp(pn(p.影响力, 0), 0, 100);
        return '<div class="jbw-map-force">'
          + '<div class="jbw-map-force-head"><span class="fn">' + esc(pname) + '</span>'
          + '<span class="fi">影响力 <b>' + Math.round(inf) + '</b></span></div>'
          + '<div class="jbw-bar"><div class="tr"><div class="fl high" style="width:' + inf + '%"></div></div></div>'
          + (p.军事存在 ? '<div class="jbw-map-line2"><span class="t">军事存在：</span>' + esc(p.军事存在) + '</div>' : '')
          + (p.描述 ? '<div class="jbw-map-line2">' + esc(p.描述) + '</div>' : '')
          + '</div>';
      }).join('');
    }

    const holder = document.createElement('div');
    holder.className = 'jbw-modal-holder';
    holder.innerHTML =
      '<div class="jbw-modal-mask">' +
        '<div class="jbw-modal jbw-map-modal">' +
          '<div class="jbw-modal-head"><span class="jbw-modal-label">地方分图 · 州郡舆图</span><button type="button" class="jbw-modal-x">×</button></div>' +
          '<div class="jbw-modal-title"><span class="jbw-power-seal" style="background:' + sealColor + '">' + esc(jinName.charAt(0)) + '</span><b>' + esc(jinName) + '</b></div>' +
          '<div class="jbw-map-modal-scroll">' +
            '<div class="jbw-kv">' +
              '<div class="jbw-kv-row"><span class="k">名义归属</span><span class="v">' + esc(nom) + '</span></div>' +
              '<div class="jbw-kv-row"><span class="k">实控势力</span><span class="v">' + esc(real) + '</span></div>' +
              '<div class="jbw-kv-row"><span class="k">实控阵营</span><span class="v">' + esc(camp) + '</span></div>' +
              '<div class="jbw-kv-row"><span class="k">争夺状态</span><span class="v">' + mapStatusBadge(st) + '</span></div>' +
              '<div class="jbw-kv-row"><span class="k">治所</span><span class="v">' + esc(zhisuo) + '</span></div>' +
            '</div>' +
            (sit.附注 ? '<div class="jbw-modal-note">' + esc(sit.附注) + '</div>' : '') +
            forcesHtml +
            (sit.军事态势 ? '<div class="jbw-sectitle">军事态势</div><div class="jbw-map-line2">' + esc(sit.军事态势) + '</div>' : '') +
            (sit.经济态势 ? '<div class="jbw-sectitle">经济态势</div><div class="jbw-map-line2">' + esc(sit.经济态势) + '</div>' : '') +
            (sit.最近大事 ? '<div class="jbw-sectitle">最近大事</div><div class="jbw-map-line2">' + esc(sit.最近大事) + '</div>' : '') +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(holder);
    holder.addEventListener('click', function (e) {
      const xBtn = e.target.closest('.jbw-modal-x');
      const onMask = e.target.closest('.jbw-modal-mask') && !e.target.closest('.jbw-modal');
      if (xBtn || onMask) closePowerModal();
    });
  }

  // 渲染地图（加载 echarts + 地图数据后 init）
  function initMap() {
    const w = (typeof window !== 'undefined' ? window : null);
    const doc = w && w.document;
    if (!doc) return;
    const el = doc.getElementById('jbw-map');
    if (!el) return;

    const stat = (window.JSBW && window.JSBW._stat) || null;

    // 已初始化过：直接重着色（变量变化后 renderMap 会再次触发 initMap）
    const cached = window.JSBW._mapChart;
    if (cached && !cached.isDisposed && cached.getDom() === el) {
      cached.setOption({ geo: { regions: mapBuildRegionData(stat) } });
      return;
    }

    loadEcharts(function (echarts) {
      loadMapData(function (mapData) {
        if (!mapData) {
          el.innerHTML = '<div class="jbw-map-fallback">地图数据加载失败，请检查网络连接。</div>';
          return;
        }
        // 在 GeoJSON 源头把明末名换成东晋州郡名
        const features = (mapData && mapData.features) || [];
        const jin2raw = {};
        features.forEach(function (f) {
          const raw = f.properties && f.properties.name;
          const jin = MAP_AREA_JIN[raw];
          if (jin) {
            f.properties.rawName = raw;
            f.properties.name = jin.名;
            jin2raw[jin.名] = raw;
          } else if (raw) {
            jin2raw[raw] = raw;
          }
        });
        // 重置反查缓存（可能被多次 init）
        _mapJin2Raw = jin2raw;

        echarts.registerMap('jbw_east_asia_1634', mapData);
        const chart = echarts.init(el);
        chart.setOption({
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              if (params.seriesType === 'lines') return '<b>' + params.name + '</b>';
              if (params.seriesType === 'scatter') {
                const city = MAP_CITIES.find(function (c) { return c.name === params.name; });
                if (city) return '<b>' + city.name + '</b>（' + city.force + (city.cap ? ' · 都城' : '') + '）';
                return params.name;
              }
              const jinName = params.name;
              const raw = mapRawOf(jinName);
              const jin = MAP_AREA_JIN[raw];
              const dyn = mapGetDynamic(stat, jinName) || {};
              const force = dyn.实控势力 || dyn.实控阵营 || dyn.名义归属 || MAP_AREA_FORCE[raw] || '周边诸国';
              return '<b>' + jinName + '</b>'
                + '<br>所属：' + force
                + (jin ? '<br>治所：' + (jin.治所 || '—') : '');
            },
            backgroundColor: 'rgba(253,246,227,.97)',
            borderColor: 'rgba(96,65,36,.4)',
            textStyle: { color: '#2c2118', fontSize: 13 },
            extraCssText: 'box-shadow:0 4px 14px rgba(0,0,0,.25);border-radius:6px;',
          },
          geo: {
            map: 'jbw_east_asia_1634',
            roam: true,
            center: [110, 35],
            zoom: 1.5,
            scaleLimit: { min: 1, max: 8 },
            label: { show: false },
            itemStyle: { areaColor: '#d4c5a0', borderColor: 'rgba(96,65,36,.35)', borderWidth: 0.6 },
            emphasis: {
              label: { show: true, color: '#2c2118', fontSize: 13, formatter: function (p) { return p.name; } },
              itemStyle: { areaColor: '#e8d9b0' },
            },
            select: { disabled: true },
            regions: mapBuildRegionData(stat),
          },
          series: [
            MAP_RIVERS.map(mapRiverSeries)[0],
            MAP_RIVERS.map(mapRiverSeries)[1],
            MAP_RIVERS.map(mapRiverSeries)[2],
            mapCitySeries(),
          ],
        });
        chart.on('click', function (params) {
          if (params.componentType === 'geo') {
            const area = mapRawOf(params.name);
            const force = MAP_AREA_FORCE[area] || '周边诸国';
            const jin = MAP_AREA_JIN[area];
            showMapModal(area, jin, force);
          }
        });
        // 存引用，便于窗口 resize
        window.JSBW._mapChart = chart;
        try {
          if (w.addEventListener) w.addEventListener('resize', function () { chart.resize(); });
        } catch (e) {}
      });
    });
  }

  // 渲染函数：返回天下舆图页签 HTML（ECharts 容器 + 图例）
  function renderMap(stat) {
    // 缓存 stat 供弹窗读变量树
    if (typeof window !== 'undefined') window.JSBW._stat = stat;

    return `
<div class="jbw jbw-map-root">
  <div class="jbw-top">
    <span class="jbw-brand"><b>江山北望</b></span>
    <span class="jbw-tag">天下舆图 · 东晋十六国格局</span>
  </div>

  ${mapLegendHtml()}

  <div class="jbw-map-stage" style="position:relative;">
    <div id="jbw-map" style="width:100%;height:560px;"></div>
  </div>

  <p class="jbw-map-hint">天河为界 · 长江黄河蜿蜒其间 · 悬停河流看河名 · 点击地区查看势力详情。</p>
</div>
<script>setTimeout(function(){ if (window.JSBW && window.JSBW.initMap) window.JSBW.initMap(); }, 0);</script>`;
  }

  // ============================================================
  // 悬浮窗外壳：折叠按钮 + 悬浮面板 + 左侧导航 + 内容切换
  // ============================================================
  // 页签清单（key -> { label, render }），顺序对齐原卡左侧导航
  const SHELL_PAGES = [
    { key: 'overview',  label: '总览',     render: renderOverview },
    { key: 'self',      label: '个人信息', render: renderSelf },
    { key: 'money',     label: '钱粮收支', render: renderMoney },
    { key: 'people',    label: '人情往来', render: renderPeople },
    { key: 'private',   label: '私帷小记', render: renderPrivate },
    { key: 'portraits', label: '人物志',   render: renderPortraits },
    { key: 'military',  label: '营伍军务', render: renderMilitary },
    { key: 'situation', label: '时局任务', render: renderSituation },
    { key: 'tech',      label: '技术进展', render: renderTech },
    { key: 'history',   label: '生平史记', render: renderHistory },
    { key: 'map',       label: '天下舆图', render: renderMap },
    { key: 'graph',     label: '人物谱系', render: renderGraph },
    { key: 'fengyue',   label: '风月阁',   render: renderFengyue },
  ];

  // 当前激活页签（跨重绘保留）
  let _shellPage = 'overview';

  // 渲染外壳：折叠按钮 + 悬浮面板
  function renderShell(stat) {
    if (typeof window !== 'undefined') window.JSBW._stat = stat || null;
    // 折叠按钮（始终 fixed，独立于面板）
    let nav = '';
    for (const p of SHELL_PAGES) {
      nav += '<button type="button" class="jbw-nav-item" data-jbw-nav="' + p.key + '">' + p.label + '</button>';
    }
    const cur = SHELL_PAGES.find(function (p) { return p.key === _shellPage; }) || SHELL_PAGES[0];
    let body = '';
    try { body = cur.render(stat || {}); }
    catch (e) { body = '<div class="jbw-empty">此页渲染出错。</div>'; }

    return ''
      + '<button type="button" class="jbw-fab" data-jbw-fab="toggle" title="江山北望 · 状态面板">北</button>'
      + '<div class="jbw-shell" data-jbw-shell="panel" style="display:none;">'
      + '  <div class="jbw-shell-head">'
      + '    <span class="jbw-shell-title">江山北望</span>'
      + '    <button type="button" class="jbw-shell-close" data-jbw-fab="close" title="收起">×</button>'
      + '  </div>'
      + '  <div class="jbw-shell-body">'
      + '    <nav class="jbw-shell-nav">' + nav + '</nav>'
      + '    <div class="jbw-shell-content" data-jbw-shell="content">' + body + '</div>'
      + '  </div>'
      + '</div>'
      + '<script>setTimeout(function(){ if (window.JSBW && window.JSBW.afterShell) window.JSBW.afterShell(); }, 0);</script>';
  }

  // 切换页签（渲染对应页面到内容区）
  function switchPage(key) {
    const p = SHELL_PAGES.find(function (x) { return x.key === key; });
    if (!p) return;
    _shellPage = key;
    if (typeof window !== 'undefined') window.JSBW._shellPage = key;
    const stat = (window.JSBW && window.JSBW._stat) || {};
    const content = document.querySelector('[data-jbw-shell="content"]');
    if (!content) return;
    content.innerHTML = '';
    try { content.innerHTML = p.render(stat); }
    catch (e) { content.innerHTML = '<div class="jbw-empty">此页渲染出错。</div>'; }
    // 高亮当前导航项
    document.querySelectorAll('.jbw-nav-item').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-jbw-nav') === key);
    });
    // 地图/谱系需在渲染后初始化
    if (key === 'map') setTimeout(function () { initMap(); }, 0);
    if (key === 'graph') setTimeout(function () { initGraph(); }, 0);
  }

  // 展开/收起面板
  function toggleShell(open) {
    const panel = document.querySelector('[data-jbw-shell="panel"]');
    const fab = document.querySelector('[data-jbw-fab="toggle"]');
    if (!panel) return;
    const willOpen = open == null ? (panel.style.display === 'none') : !!open;
    panel.style.display = willOpen ? 'flex' : 'none';
    if (fab) fab.style.display = willOpen ? 'none' : 'flex';
    // 打开时刷新当前页内容（确保最新变量）
    if (willOpen) switchPage(_shellPage);
  }

  // 外壳渲染后的后续处理（init 地图/谱系等）
  function afterShell() {
    if (document.querySelector('[data-jbw-shell="content"]')) {
      if (_shellPage === 'map') setTimeout(function () { initMap(); }, 0);
      if (_shellPage === 'graph') setTimeout(function () { initGraph(); }, 0);
    }
  }

  // 打开地图详情弹窗（兼容旧 data-action 调用，实际弹窗由 showMapModal 直接处理）
  function openMapModal(name) {
    if (typeof document === 'undefined') return;
    const area = mapRawOf(name);
    const force = MAP_AREA_FORCE[area] || '周边诸国';
    const jin = MAP_AREA_JIN[area];
    showMapModal(area, jin, force);
  }

  // 加载地图数据（CDN：jsdelivr 官方域名回退 testingcf 镜像）
  function loadMapData(cb) {
    const w = (typeof window !== 'undefined' ? window : null) || (typeof globalThis !== 'undefined' ? globalThis : null);
    if (!w) return cb(null);
    if (w.WORLD_1634_OVERVIEW) { cb(w.WORLD_1634_OVERVIEW); return; }
    const doc = w.document;
    if (!doc) return cb(null);
    const urls = [
      'https://testingcf.jsdelivr.net/gh/CSEZK/CMYJ-Frontend@d697affd3ed71c09e8278cc2ac37b5d3b5dc2ded/assets/maps/world_1634_overview.js',
      'https://cdn.jsdelivr.net/gh/CSEZK/CMYJ-Frontend@d697affd3ed71c09e8278cc2ac37b5d3b5dc2ded/assets/maps/world_1634_overview.js',
    ];
    let i = 0;
    function tryLoad() {
      if (i >= urls.length) { cb(null); return; }
      const s = doc.createElement('script');
      s.src = urls[i++];
      s.onload = function () { if (w.WORLD_1634_OVERVIEW) cb(w.WORLD_1634_OVERVIEW); else tryLoad(); };
      s.onerror = function () { tryLoad(); };
      doc.head.appendChild(s);
    }
    tryLoad();
  }

  // 加载 ECharts（CDN，与原卡一致；jsdelivr 官方域名回退）
  function loadEcharts(cb) {
    const w = (typeof window !== 'undefined' ? window : null) || (typeof globalThis !== 'undefined' ? globalThis : null);
    if (!w) return;
    const doc = w.document;
    if (!doc) return;
    if (w.echarts) { cb(w.echarts); return; }
    const urls = [
      'https://testingcf.jsdelivr.net/npm/echarts@5/dist/echarts.min.js',
      'https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js',
    ];
    let i = 0;
    function tryLoad() {
      if (i >= urls.length) return;
      const s = doc.createElement('script');
      s.src = urls[i++];
      s.onload = function () { if (w.echarts) cb(w.echarts); else tryLoad(); };
      s.onerror = function () { tryLoad(); };
      doc.head.appendChild(s);
    }
    tryLoad();
  }

  // 初始化 / 刷新 ECharts 关系图
  function initGraph() {
    const w = (typeof window !== 'undefined' ? window : null);
    const doc = w && w.document;
    if (!doc) return;
    const el = doc.getElementById('jbw-graph');
    if (!el) return;
    // 读搜索关键词
    const searchInput = doc.getElementById('jbw-graph-search-input');
    const kw = (searchInput ? searchInput.value : '').trim();

    loadEcharts(function (echarts) {
      // 复用或新建实例
      if (!window.JSBW._graphChart || window.JSBW._graphChart.isDisposed()) {
        window.JSBW._graphChart = echarts.init(el);
        // 点击节点
        window.JSBW._graphChart.on('click', function (params) {
          if (params.dataType === 'node') {
            _graphSelectedId = params.data.id;
            const d = doc.getElementById('jbw-graph-detail');
            const node = _graphNodes.find(function (n) { return n.id === _graphSelectedId; });
            if (d && node) d.innerHTML = graphDetailHtml(node);
            graphRender(_graphSelectedId, kw);
          }
        });
      }
      graphRender(_graphSelectedId, kw, echarts);
    });
  }

  // 计算图例分类色 + 组装 ECharts option 并渲染
  function graphRender(focusId, kw, echarts) {
    const chart = window.JSBW._graphChart;
    if (!chart || !echarts) return;
    const dark = (function () {
      try { return document.body && document.body.classList.contains('dark'); } catch (e) { return false; }
    })();
    const labelColor = dark ? '#c0b090' : '#5c4530';
    const lineColor = dark ? '#6a5a40' : '#c0b090';
    const catColors = _graphCategories.map(function (c) { return c['color'] || '#999'; });

    // 搜索命中集合
    const hit = new Set();
    if (kw) {
      _graphNodes.forEach(function (n) {
        const cat = _graphCategories[n.category];
        const catName = cat && cat.name ? cat.name : '';
        const hay = (n.name || '') + ' ' + (n.id || '') + ' ' + (n.desc || '') + ' ' + catName;
        if (hay.indexOf(kw) >= 0) hit.add(n.id);
      });
    }

    // 焦点相关节点（焦点 + 其关联人物）
    const focusSet = new Set([focusId]);
    _graphLinks.forEach(function (l) {
      if (l.source === focusId) focusSet.add(l.target);
      else if (l.target === focusId) focusSet.add(l.source);
    });

    const nodes = _graphNodes.map(function (n) {
      const isMain = n.id === '主角';
      const isFocus = n.id === focusId;
      const isHit = kw && hit.has(n.id);
      const isRelated = !kw && focusSet.has(n.id);
      const dim = kw ? !isHit : !(isFocus || isRelated);
      return {
        id: n.id,
        name: n.name,
        // ECharts categories 最前固定放「主角」，其余分类顺延 +1
        category: isMain ? 0 : ((n.category || 0) + 1),
        symbolSize: n.symbolSize || (isMain ? 64 : 34),
        symbol: n.symbol || 'circle',
        desc: n.desc || '',
        label: { show: true, fontSize: 12, color: labelColor, distance: 16, opacity: dim ? 0.35 : 1 },
        itemStyle: {
          opacity: dim ? 0.22 : 1,
          borderWidth: isFocus || isHit ? 3 : (isMain ? 2 : 0),
          borderColor: isFocus ? '#f2d27a' : (isHit ? '#fff1b0' : (isMain ? (dark ? '#e8d090' : '#8a6a20') : undefined)),
          color: isMain ? '#d4a040' : undefined,
        },
      };
    });

    const links = _graphLinks.map(function (l) {
      const isFocusLink = l.source === focusId || l.target === focusId;
      const isHitLink = kw && (hit.has(l.source) || hit.has(l.target));
      const dim = kw ? !isHitLink : !isFocusLink;
      return {
        source: l.source,
        target: l.target,
        label: { show: true, formatter: l.label || '', fontSize: 11, color: labelColor, opacity: dim ? 0.08 : 1 },
        lineStyle: {
          color: l.lineStyle && l.lineStyle.color ? l.lineStyle.color : lineColor,
          width: isFocusLink || isHitLink ? 3 : (l.lineStyle && l.lineStyle.width) || 1,
          type: (l.lineStyle && l.lineStyle.type) || 'solid',
          curveness: 0.15,
          opacity: dim ? 0.16 : 0.9,
        },
      };
    });

    chart.setOption({
      animationDuration: 400,
      tooltip: {
        show: true,
        formatter: function (p) {
          if (p.dataType === 'node') return p.data.name;
          return p.data.label ? (p.data.label.formatter || '') : '';
        },
      },
      series: [{
        type: 'graph',
        layout: 'force',
        roam: true,
        draggable: true,
        force: { repulsion: 220, edgeLength: 120, gravity: 0.08, friction: 0.35 },
        label: { show: true },
        // 主角固定为第 0 类（金色），其余分类顺延
        categories: [{ name: '主角', itemStyle: { color: '#d4a040' } }].concat(_graphCategories),
        data: nodes,
        links: links,
        lineStyle: { color: 'source', curveness: 0.15 },
        emphasis: { focus: 'adjacency', lineStyle: { width: 3 } },
      }],
    });
  }

  // 供交互层调用的图谱操作
  function graphSearch() {
    if (typeof document === 'undefined') return;
    const input = document.getElementById('jbw-graph-search-input');
    const kw = input ? input.value.trim() : '';
    const hits = [];
    if (kw) {
      _graphNodes.forEach(function (n) {
        const cat = _graphCategories[n.category];
        const catName = cat && cat.name ? cat.name : '';
        const hay = (n.name || '') + ' ' + (n.id || '') + ' ' + (n.desc || '') + ' ' + catName;
        if (hay.indexOf(kw) >= 0) hits.push(n.id);
      });
    }
    // 有命中则定位到第一个
    if (hits.length && hits.indexOf(_graphSelectedId) < 0) {
      _graphSelectedId = hits[0];
      const node = _graphNodes.find(function (n) { return n.id === _graphSelectedId; });
      const d = document.getElementById('jbw-graph-detail');
      if (d && node) d.innerHTML = graphDetailHtml(node);
    }
    graphRender(_graphSelectedId, kw, (typeof window !== 'undefined' && window.echarts) || null);
  }

  function graphSelect(nodeId) {
    if (typeof document === 'undefined') return;
    _graphSelectedId = nodeId || '主角';
    const node = _graphNodes.find(function (n) { return n.id === _graphSelectedId; });
    const d = document.getElementById('jbw-graph-detail');
    if (d && node) d.innerHTML = graphDetailHtml(node);
    const input = document.getElementById('jbw-graph-search-input');
    const kw = input ? input.value.trim() : '';
    graphRender(_graphSelectedId, kw, (typeof window !== 'undefined' && window.echarts) || null);
  }

  // ============================================================
  // 交互层：买入 / 金银兑换（照搬原卡 getMvuData / replaceMvuData 机制）
  // ============================================================

  // 读取某商品的「本月剩余库存」；市场快照里没有就回落到满供
  function marketStock(id, econ) {
    const remain = ln(econ, '市场._剩余库存.' + id, null);
    return remain == null ? null : pn(remain, 0);
  }

  // 拿到酒馆助手 MVU 插件暴露的对象（照搬原卡：globalThis.Mvu ?? window.parent?.Mvu）
  function getMvu() {
    try {
      const gt = (typeof globalThis !== 'undefined') ? globalThis : null;
      if (gt && gt.Mvu && gt.Mvu.getMvuData && gt.Mvu.replaceMvuData) return gt.Mvu;
      if (typeof window !== 'undefined') {
        if (window.Mvu && window.Mvu.getMvuData && window.Mvu.replaceMvuData) return window.Mvu;
        if (window.parent && window.parent.Mvu && window.parent.Mvu.getMvuData) return window.parent.Mvu;
      }
    } catch (e) { /* 跨域/未初始化，吞掉 */ }
    return null;
  }

  // 安全深取值 + 安全深设值（用于读写变量树）
  function deepGet(obj, path, fb) {
    const segs = String(path).split('.').filter(Boolean);
    let cur = obj;
    for (let i = 0; i < segs.length; i++) {
      if (cur == null) return fb;
      cur = cur[segs[i]];
    }
    return cur == null ? fb : cur;
  }
  function deepSet(obj, path, val) {
    const segs = String(path).split('.').filter(Boolean);
    let cur = obj;
    for (let i = 0; i < segs.length - 1; i++) {
      const k = segs[i];
      if (cur[k] == null || typeof cur[k] !== 'object') cur[k] = {};
      cur = cur[k];
    }
    cur[segs[segs.length - 1]] = val;
  }

  // 页面内 toast 提示（就地显示，不依赖酒馆 UI）
  function toast(msg, ok) {
    if (typeof document === 'undefined') { return; }
    let box = document.querySelector('.jbw-toast');
    if (!box) {
      box = document.createElement('div');
      box.className = 'jbw-toast';
      document.body.appendChild(box);
    }
    box.textContent = msg;
    box.className = 'jbw-toast ' + (ok ? 'ok' : 'err');
    box.style.display = 'block';
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { box.style.display = 'none'; }, 2600);
  }

  // 计算某商品以指定币种计价的花费（简化：按 basePrice 为「两银」计价）
  // 返回 { key, amount }：key=扣除的币种字段名，amount=需扣数量
  function priceOf(goods, qty, payKind) {
    const base = pn(goods.price, 0);
    if (payKind === '黄金') {
      // 1金=6银
      return { key: '黄金', amount: base * qty / 6 };
    }
    if (payKind === '铜钱') {
      // 1银=1200文
      return { key: '铜钱', amount: base * qty * 1200 };
    }
    return { key: '白银', amount: base * qty };
  }

  // 买入：读变量 → 校验 → 扣钱 + 加仓储 + 减库存 → 写回
  async function doBuy(itemId, qty, payKind) {
    const mvu = getMvu();
    if (!mvu) { toast('MVU 尚未初始化，无法交易。', false); return; }
    const goods = GOODS.find(function (g) { return g.id === itemId; });
    if (!goods) return;
    const n = Math.max(0, Math.floor(pn(qty, 0)));
    if (!n) { toast('购买数量必须为正整数。', false); return; }
    try {
      const msg = await mvu.getMvuData({ type: 'message', message_id: 'latest' });
      const stat = deepGet(msg, 'stat_data', {});
      const market = deepGet(stat, '经济.市场', {});
      // 剩余库存
      const remainRaw = marketStock(itemId, stat['经济'] || {});
      const remain = remainRaw == null ? goods.stock : remainRaw;
      if (remain < n) { toast('本月「' + goods.name + '」仅余 ' + remain + goods.unit + '。', false); return; }
      // 计价
      const cost = priceOf(goods, n, payKind);
      const purse = deepGet(stat, '主角.私库.金银铜', { 黄金: 0, 白银: 0, 铜钱: 0 });
      const bal = pn(purse[cost.key], 0);
      if (bal + 1e-9 < cost.amount) { toast(cost.key + '不足。可先到钱庄兑换。', false); return; }
      // 扣钱
      purse[cost.key] = cost.key === '铜钱' ? Math.round(bal - cost.amount) : Math.round((bal - cost.amount) * 100) / 100;
      // 减库存
      deepSet(stat, '经济.市场._剩余库存.' + itemId, remain - n);
      // 加仓储
      const store = deepGet(stat, '经济.仓储', {});
      if (!(store[goods.name] && typeof store[goods.name] === 'object')) store[goods.name] = { 数量: 0, 单位: goods.unit };
      if (store[goods.name].单位 && store[goods.name].单位 !== goods.unit) {
        throw new Error('仓储中的「' + goods.name + '」单位为' + store[goods.name].单位 + '，无法入库');
      }
      store[goods.name].单位 = goods.unit;
      store[goods.name].数量 = Math.max(0, pn(store[goods.name].数量, 0)) + n;
      // 写回
      await mvu.replaceMvuData(msg, { type: 'message', message_id: 'latest' });
      toast('已购入「' + goods.name + '」' + n + goods.unit + '，支出 ' + Math.round(cost.amount * 100) / 100 + ' ' + cost.key + '。', true);
      refreshMoney();
    } catch (e) {
      toast('交易失败：' + (e && e.message ? e.message : '未知错误'), false);
    }
  }

  // 金银兑换
  async function doExchange(kind, amt) {
    const mvu = getMvu();
    if (!mvu) { toast('MVU 尚未初始化，无法兑换。', false); return; }
    const n = Math.floor(pn(amt, 0));
    if (!(n > 0)) { toast('兑换数量必须为正整数。', false); return; }
    try {
      const msg = await mvu.getMvuData({ type: 'message', message_id: 'latest' });
      const stat = deepGet(msg, 'stat_data', {});
      const market = deepGet(stat, '经济.市场', {});
      const purse = deepGet(stat, '主角.私库.金银铜', { 黄金: 0, 白银: 0, 铜钱: 0 });
      const rg = pn(deepGet(market, '汇率.一两黄金兑白银', 6), 6);
      const rs = pn(deepGet(market, '汇率.一两白银兑铜钱', 1200), 1200);
      purse.黄金 = pn(purse.黄金, 0); purse.白银 = pn(purse.白银, 0); purse.铜钱 = Math.round(pn(purse.铜钱, 0));
      let note = '';
      if (kind === 'sell-gold') {
        if (purse.黄金 + 1e-9 < n) throw new Error('黄金不足');
        const got = Math.round(n * rg * 0.97 * 100) / 100;
        purse.黄金 = Math.round((purse.黄金 - n) * 100) / 100;
        purse.白银 = Math.round((purse.白银 + got) * 100) / 100;
        note = n + ' 两黄金兑得 ' + got + ' 两白银';
      } else if (kind === 'buy-gold') {
        const need = Math.ceil(n * rg * 1.03 * 1000) / 1000;
        if (purse.白银 + 1e-9 < need) throw new Error('白银不足');
        purse.白银 = Math.round((purse.白银 - need) * 100) / 100;
        purse.黄金 = Math.round((purse.黄金 + n) * 100) / 100;
        note = '支出 ' + need + ' 两白银，购得 ' + n + ' 两黄金';
      } else if (kind === 'sell-silver') {
        if (purse.白银 + 1e-9 < n) throw new Error('白银不足');
        const got = Math.floor(n * rs * 0.97);
        purse.白银 = Math.round((purse.白银 - n) * 100) / 100;
        purse.铜钱 += got;
        note = n + ' 两白银兑得 ' + got + ' 文铜钱';
      } else if (kind === 'buy-silver') {
        const need = Math.ceil(n * rs * 1.03);
        if (purse.铜钱 < need) throw new Error('铜钱不足');
        purse.铜钱 -= need;
        purse.白银 = Math.round((purse.白银 + n) * 100) / 100;
        note = '支出 ' + need + ' 文铜钱，购得 ' + n + ' 两白银';
      } else {
        throw new Error('未知兑换方向');
      }
      await mvu.replaceMvuData(msg, { type: 'message', message_id: 'latest' });
      toast('钱庄兑付完成：' + note + '。', true);
      refreshMoney();
    } catch (e) {
      toast('兑换失败：' + (e && e.message ? e.message : '未知错误'), false);
    }
  }

  // 交易成功后重绘钱粮页面（重新读变量树渲染），并保留折叠展开状态
  function refreshMoney() {
    const mvu = getMvu();
    const container = document.querySelector('.jbw-money-root');
    if (!container) return;
    if (mvu && mvu.getMvuData) {
      // 重绘前记录已展开的折叠面板键（避免买入后页面被整个收起）
      const opened = [];
      container.querySelectorAll('details.jbw-fold[open]').forEach(function (d) {
        const key = d.getAttribute('data-fold');
        if (key) opened.push(key);
      });
      // 记录当前支付币种选择
      const paySel = container.querySelector('select[data-jbw-pay]');
      const payKind = paySel ? paySel.value : (window.JSBW._payKind || '白银');
      // 记录当前激活页签（账房/市集）
      const activeTabEl = container.querySelector('.jbw-money-tab.on');
      const activeTab = activeTabEl ? activeTabEl.getAttribute('data-money-tab') : 'market';

      mvu.getMvuData({ type: 'message', message_id: 'latest' }).then(function (msg) {
        const stat = deepGet(msg, 'stat_data', {});
        container.innerHTML = renderMoney(stat);
        // 恢复激活页签
        switchMoneyTab(activeTab);
        // 恢复展开的折叠面板
        opened.forEach(function (key) {
          const d = container.querySelector('details.jbw-fold[data-fold="' + key + '"]');
          if (d) d.setAttribute('open', '');
        });
        // 恢复支付币种
        const paySel2 = container.querySelector('select[data-jbw-pay]');
        if (paySel2) paySel2.value = payKind;
        window.JSBW._payKind = payKind;
        // 事件委托已在 document 上单例绑定，无需重绑
      }).catch(function () { /* 刷新失败则保持现状 */ });
    }
  }

  // 风月阁购买：读变量 → 校验点数 → 扣点 + 器物累加 → 写回
  async function doFengyueBuy(itemId) {
    const mvu = getMvu();
    if (!mvu) { toast('MVU 尚未初始化，无法购买。', false); return; }
    const item = fengyueFind(itemId);
    if (!item) return;
    try {
      const msg = await mvu.getMvuData({ type: 'message', message_id: 'latest' });
      const stat = deepGet(msg, 'stat_data', {});
      // 兜底：确保 风月阁 结构存在
      if (!(stat['风月阁'] && typeof stat['风月阁'] === 'object')) stat['风月阁'] = { 同房点数: 0, 器物: {} };
      if (!(stat['风月阁']['器物'] && typeof stat['风月阁']['器物'] === 'object')) stat['风月阁']['器物'] = {};
      const points = pn(stat['风月阁']['同房点数'], 0);
      if (points < item.price) {
        toast('同房点数不足，去和你的姑娘们多亲近亲近吧～', false);
        return;
      }
      stat['风月阁']['同房点数'] = points - item.price;
      const owned = stat['风月阁']['器物'];
      if (owned[item.name] && typeof owned[item.name] === 'object') {
        owned[item.name]['数量'] = (owned[item.name]['数量'] != null ? pn(owned[item.name]['数量'], 0) : 0) + 1;
      } else {
        owned[item.name] = { 简介: item.desc, 数量: 1 };
      }
      await mvu.replaceMvuData(msg, { type: 'message', message_id: 'latest' });
      toast('已购入「' + item.name + '」', true);
      refreshFengyue();
    } catch (e) {
      toast('购买失败：' + (e && e.message ? e.message : '未知错误'), false);
    }
  }

  // 风月阁购买/兑换后重绘页面（重新读变量树渲染），并保留折叠展开状态
  function refreshFengyue() {
    const mvu = getMvu();
    const container = document.querySelector('.jbw-fengyue-root');
    if (!container) return;
    if (mvu && mvu.getMvuData) {
      const opened = [];
      container.querySelectorAll('details.jbw-fold[open]').forEach(function (d) {
        const key = d.getAttribute('data-fold');
        if (key) opened.push(key);
      });
      mvu.getMvuData({ type: 'message', message_id: 'latest' }).then(function (msg) {
        const stat = deepGet(msg, 'stat_data', {});
        container.innerHTML = renderFengyue(stat);
        opened.forEach(function (key) {
          const d = container.querySelector('details.jbw-fold[data-fold="' + key + '"]');
          if (d) d.setAttribute('open', '');
        });
        // 事件委托已在 document 上单例绑定，无需重绑
      }).catch(function () { /* 刷新失败则保持现状 */ });
    }
  }

  // 打开势力档案弹窗
  function openPowerModal(name) {
    if (typeof document === 'undefined') return;
    const powers = window.JSBW._situationPowers || {};
    const p = powers[name];
    if (!p) return;
    // 移除旧弹窗
    closePowerModal();
    const holder = document.createElement('div');
    holder.className = 'jbw-modal-holder';
    holder.innerHTML = powerModal(name, p);
    document.body.appendChild(holder);
    // 弹窗自身绑定关闭（弹窗挂在 body，不在 .jbw 容器内，需独立监听）
    holder.addEventListener('click', function (e) {
      const xBtn = e.target.closest('.jbw-modal-x');
      const onMask = e.target.closest('.jbw-modal-mask') && !e.target.closest('.jbw-modal');
      if (xBtn || onMask) {
        closePowerModal();
      }
    });
  }

  // 关闭势力档案弹窗
  function closePowerModal() {
    if (typeof document === 'undefined') return;
    const holders = document.querySelectorAll('.jbw-modal-holder');
    holders.forEach(function (h) {
      if (h.parentNode) h.parentNode.removeChild(h);
    });
  }

  // 钱粮收支：账房/市集页签切换（无重绘，纯显隐切换）
  function switchMoneyTab(key) {
    if (typeof document === 'undefined') return;
    const root = document.querySelector('.jbw-money-root');
    if (!root) return;
    root.querySelectorAll('.jbw-money-tab').forEach(function (t) {
      t.classList.toggle('on', t.getAttribute('data-money-tab') === key);
    });
    root.querySelectorAll('.jbw-money-pane').forEach(function (p) {
      p.classList.toggle('on', p.getAttribute('data-money-pane') === key);
    });
  }

  // 事件委托：绑定买入 / 兑换 / 折叠 / 购买器物 / 弹窗 / 谱系交互
  // 关键设计：委托监听器只绑定在 document 上**一次**（单例），
  // 用 e.target.closest() 动态命中当前 DOM 里的按钮。
  // 这样无论 refreshXxx 如何替换 innerHTML，都不会产生重复监听器，
  // 从根源上杜绝「一次点击被多个监听器重复处理 → 重复扣点」的 bug。
  function bindInteractions(root) {
    // 兼容旧调用：root 参数忽略，统一用 document 单例委托
    if (typeof document === 'undefined') return;
    if (document.__jbwBound) return;
    document.__jbwBound = true;

    document.addEventListener('click', function (e) {
      // 悬浮窗：折叠按钮 / 收起 / 导航切换
      const fab = e.target.closest('[data-jbw-fab]');
      if (fab) {
        e.preventDefault();
        const act = fab.getAttribute('data-jbw-fab');
        if (act === 'toggle') toggleShell(true);
        else if (act === 'close') toggleShell(false);
        return;
      }
      const navItem = e.target.closest('[data-jbw-nav]');
      if (navItem) {
        e.preventDefault();
        switchPage(navItem.getAttribute('data-jbw-nav'));
        return;
      }
      // 钱粮收支：账房/市集页签切换
      const moneyTab = e.target.closest('[data-action="jbw-money-tab"]');
      if (moneyTab) {
        e.preventDefault();
        const key = moneyTab.getAttribute('data-money-tab');
        switchMoneyTab(key);
        return;
      }
      const buyBtn = e.target.closest('[data-action="jbw-buy"]');
      if (buyBtn) {
        e.preventDefault();
        const item = buyBtn.closest('.jbw-good');
        const qtyInput = item ? item.querySelector('[data-jbw-qty]') : null;
        const qty = qtyInput ? qtyInput.value : 1;
        const payKind = window.JSBW._payKind || '白银';
        doBuy(buyBtn.getAttribute('data-item-id'), qty, payKind);
        return;
      }
      const exBtn = e.target.closest('[data-action="jbw-ex"]');
      if (exBtn) {
        e.preventDefault();
        const kind = exBtn.getAttribute('data-kind');
        const row = exBtn.closest('.jbw-ex-row');
        const input = row ? row.querySelector('input') : null;
        doExchange(kind, input ? input.value : 0);
        return;
      }
      // 风月阁：购买器物
      const fyBuy = e.target.closest('[data-action="jbw-fy-buy"]');
      if (fyBuy) {
        e.preventDefault();
        doFengyueBuy(fyBuy.getAttribute('data-item-id'));
        return;
      }
      // 私帷角色：点卡片打开详情弹窗
      const pvOpen = e.target.closest('[data-action="jbw-private-open"]');
      if (pvOpen) {
        e.preventDefault();
        openPrivateModal(pvOpen.getAttribute('data-name'));
        return;
      }
      // 势力档案弹窗：点势力行打开（弹窗关闭由 openPowerModal 内部绑定处理）
      const openBtn = e.target.closest('[data-action="jbw-power-open"]');
      if (openBtn) {
        e.preventDefault();
        const name = openBtn.getAttribute('data-power');
        openPowerModal(name);
        return;
      }
      // 天下舆图：点势力打开详情弹窗
      const mapOpen = e.target.closest('[data-action="jbw-map-open"]');
      if (mapOpen) {
        e.preventDefault();
        openMapModal(mapOpen.getAttribute('data-region'));
        return;
      }
      // 人物谱系：搜索按钮
      const gsBtn = e.target.closest('[data-action="jbw-graph-search"]');
      if (gsBtn) {
        e.preventDefault();
        graphSearch();
        return;
      }
      // 人物谱系：关联人物跳转
      const gsel = e.target.closest('[data-action="jbw-graph-select"]');
      if (gsel) {
        e.preventDefault();
        graphSelect(gsel.getAttribute('data-node-id'));
        return;
      }
    });

    // 支付币种切换（同样单例委托）
    document.addEventListener('change', function (e) {
      if (e.target && e.target.matches('[data-jbw-pay]')) {
        window.JSBW._payKind = e.target.value;
      }
    });
  }

  // 挂载：在页面加载后自动绑定（演示页 + 酒馆卡内均可用）
  function autoBind() {
    if (typeof document === 'undefined') return;
    // 事件委托单例绑定在 document 上（内部有防重复保护）
    bindInteractions();
    // 人物谱系：若存在图谱容器则初始化 ECharts，并绑定搜索框回车
    var graphEl = document.getElementById('jbw-graph');
    if (graphEl) {
      initGraph();
      var input = document.getElementById('jbw-graph-search-input');
      if (input && !input.__jbwGraphBound) {
        input.__jbwGraphBound = true;
        input.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') { e.preventDefault(); graphSearch(); }
        });
      }
    }
  }
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', autoBind);
    } else {
      autoBind();
    }
  }

  // ---------- 导出渲染入口（供挂载逻辑调用） ----------
  if (typeof window !== 'undefined') {
    window.JSBW = window.JSBW || {};
    window.JSBW.renderShell = renderShell;
    window.JSBW.switchPage = switchPage;
    window.JSBW.toggleShell = toggleShell;
    window.JSBW.afterShell = afterShell;
    window.JSBW.renderOverview = renderOverview;
    window.JSBW.renderSelf = renderSelf;
    window.JSBW.renderMoney = renderMoney;
    window.JSBW.renderPeople = renderPeople;
    window.JSBW.renderPrivate = renderPrivate;
    window.JSBW.renderPortraits = renderPortraits;
    window.JSBW.renderMilitary = renderMilitary;
    window.JSBW.renderSituation = renderSituation;
    window.JSBW.renderTech = renderTech;
    window.JSBW.renderHistory = renderHistory;
    window.JSBW.renderGraph = renderGraph;
    window.JSBW.renderMap = renderMap;
    window.JSBW.renderFengyue = renderFengyue;
    window.JSBW.initGraph = initGraph;
    window.JSBW.initMap = initMap;
    window.JSBW.graphSearch = graphSearch;
    window.JSBW.graphSelect = graphSelect;
    window.JSBW.openPowerModal = openPowerModal;
    window.JSBW.closePowerModal = closePowerModal;
    window.JSBW.openPrivateModal = openPrivateModal;
    window.JSBW.openMapModal = openMapModal;
    window.JSBW.ln = ln;
    window.JSBW.clamp = clamp;
    window.JSBW.doBuy = doBuy;
    window.JSBW.doExchange = doExchange;
    window.JSBW.doFengyueBuy = doFengyueBuy;
    window.JSBW.switchMoneyTab = switchMoneyTab;
    window.JSBW.bindInteractions = bindInteractions;
    window.JSBW.refreshMoney = refreshMoney;
    window.JSBW.refreshFengyue = refreshFengyue;
  }

  // ============================================================
  // 自动挂载逻辑（脚本启用时执行，不依赖 AI 对话 / 正则触发）
  // 酒馆助手脚本在无沙盒 iframe 中运行，document 即酒馆宿主页面，
  // 直接向 document.body 注入悬浮窗按钮 + 面板，任何开局/页面都生效。
  // ============================================================
  function jbwInjectCss() {
    try {
      if (typeof document === 'undefined') return;
      if (document.getElementById('jbw-shell-css')) return;
      const css = typeof JBW_CSS !== 'undefined' ? JBW_CSS : '';
      if (!css) return;
      const st = document.createElement('style');
      st.id = 'jbw-shell-css';
      st.textContent = css;
      document.head.appendChild(st);
    } catch (e) { /* 吞异常 */ }
  }

  function jbwReadStat(cb) {
    // 优先从 MVU 插件读变量；失败则用内嵌初始数据兜底
    const finish = function (stat) {
      try { cb(stat || {}); } catch (e) {}
    };
    const readMvu = function () {
      try {
        const mvu = getMvu();
        if (mvu && mvu.getMvuData) {
          mvu.getMvuData({ type: 'message', message_id: 'latest' }).then(function (msg) {
            finish(deepGet(msg, 'stat_data', null));
          }).catch(function () { finish(null); });
          return;
        }
      } catch (e) {}
      finish(null);
    };
    // 若 MVU 尚未初始化，等它初始化完成再读
    try {
      if (typeof waitGlobalInitialized === 'function') {
        waitGlobalInitialized('Mvu').then(readMvu).catch(readMvu);
        // 超时兜底：2 秒后无论如何都尝试读一次
        setTimeout(function () { try { readMvu(); } catch (e) {} }, 2000);
        return;
      }
    } catch (e) {}
    readMvu();
  }

  function jbwMount() {
    try {
      if (typeof document === 'undefined' || !document.body) return;
      // 防止重复挂载
      if (document.querySelector('[data-jbw-fab]')) return;
      jbwInjectCss();
      const holder = document.createElement('div');
      holder.className = 'jbw-holder';
      // 先用兜底数据渲染外壳（按钮 + 面板），拿到变量后再刷新内容
      const html = renderShell(null);
      holder.innerHTML = html;
      document.body.appendChild(holder);
      // 绑定事件委托（单例，防重复）
      bindInteractions(document);
      // 异步读变量后刷新内容
      jbwReadStat(function (stat) {
        try {
          if (typeof window !== 'undefined') window.JSBW._stat = stat || null;
          const content = document.querySelector('[data-jbw-shell="content"]');
          if (content && window.JSBW && window.JSBW.renderOverview) {
            content.innerHTML = '';
            content.innerHTML = window.JSBW.renderOverview(stat || {});
          }
        } catch (e) {}
      });
    } catch (e) { /* 吞异常 */ }
  }

  // 监听变量更新事件，刷新悬浮窗内容
  // MVU 事件挂在 Mvu.events 上（Mvu.events.VARIABLE_UPDATE_ENDED）
  function jbwRefreshContent() {
    jbwReadStat(function (stat) {
      try {
        if (typeof window !== 'undefined') window.JSBW._stat = stat || null;
        const content = document.querySelector('[data-jbw-shell="content"]');
        if (!content) return;
        const panel = document.querySelector('[data-jbw-shell="panel"]');
        const page = (window.JSBW && window.JSBW._shellPage) || 'overview';
        // 面板收起时只更新内存数据，下次展开即最新
        if (panel && panel.style.display === 'none') return;
        const p = SHELL_PAGES.find(function (x) { return x.key === page; });
        if (!p) return;
        try { content.innerHTML = p.render(stat || {}); }
        catch (e) { content.innerHTML = '<div class="jbw-empty">此页渲染出错。</div>'; }
        if (page === 'map') setTimeout(function () { initMap(); }, 0);
        if (page === 'graph') setTimeout(function () { initGraph(); }, 0);
      } catch (e) {}
    });
  }
  function jbwBindEvents() {
    try {
      const mvu = getMvu();
      if (mvu && mvu.events) {
        // 优先用 Mvu.events 事件总线
        const evts = mvu.events;
        const bind = function (name) {
          try {
            if (typeof evts.on === 'function') { evts.on(name, jbwRefreshContent); return true; }
            if (typeof evts.addEventListener === 'function') { evts.addEventListener(name, jbwRefreshContent); return true; }
          } catch (e) {}
          return false;
        };
        bind('VARIABLE_UPDATE_ENDED');
      }
    } catch (e) {}
    // 兜底：宿主 window 上的同名事件
    try {
      const host = (typeof window !== 'undefined' && window.parent && window.parent !== window) ? window.parent : window;
      if (host && host.addEventListener) {
        host.addEventListener('VARIABLE_UPDATE_ENDED', jbwRefreshContent);
      }
    } catch (e) {}
    // 再兜底：Mvu 全局事件
    try {
      const g = (typeof window !== 'undefined' ? window : null) || (typeof globalThis !== 'undefined' ? globalThis : null);
      if (g && g.Mvu && g.Mvu.events) {
        const evts = g.Mvu.events;
        if (typeof evts.on === 'function') evts.on('VARIABLE_UPDATE_ENDED', jbwRefreshContent);
      }
    } catch (e) {}
  }

  // 自动启动：页面就绪后挂载（照搬原卡 $(()=>{ci()}) 的 jQuery ready 方式）
  function jbwStart() {
    jbwBindEvents();
    var tryMount = function () { try { jbwMount(); } catch (e) {} };
    // 优先用 jQuery ready（酒馆助手环境必有 jQuery，且确保宿主页面就绪）
    var mountedViaJq = false;
    try {
      if (typeof $ === 'function') {
        $(function () { mountedViaJq = true; tryMount(); });
      }
    } catch (e) {}
    // 兜底：原生 readyState
    try {
      if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', tryMount);
        } else {
          tryMount();
        }
      }
    } catch (e) {}
    // 多重兜底：延迟重试（防重复挂载由 jbwMount 内部 querySelector 判断保证）
    setTimeout(tryMount, 300);
    setTimeout(tryMount, 1000);
    setTimeout(tryMount, 2500);
  }
  jbwStart();
})();

