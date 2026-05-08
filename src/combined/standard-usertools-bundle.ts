import { CustomCSSWidgetPlugin } from "../custom-css-widget/custom-css-widget.jsx";
import { BetterEditorPlugin } from "../better-editor/better-editor.js";
import { AutoLocalizePlugin } from "../autolocalize/autolocalize.js";
import { UnfuckAllCSSPlugin } from "../unfuck-all-css/unfuck-all-css.user.js";
import { BetterCommentsViewPlugin } from "../better-comments-view/better-comments-view.user.js";
import { MinimalistEditorPlugin } from "../minimalist-editor/minimalist-editor.js";
import { MultisavePlugin } from "../multisave/multisave-main.js";
import { SmartHistoryPlugin } from "../smart-history/smart-history.js";
import { BetterForumViewPlugin } from "../better-forum/better-forum-view.js";
import { SandboxMirrorerPlugin } from "../sandbox-mirrorer/sandbox-mirrorer.js";
import { BetterUserInfoPlugin } from "../better-user-info/better-user-info.js";
import { CopyPageSourceToClipboardPlugin } from "./copy-page-source-to-clipboard.js";

export const STANDARD_USERTOOLS_BUNDLE = [
  BetterUserInfoPlugin,
  CustomCSSWidgetPlugin,
  BetterEditorPlugin,
  UnfuckAllCSSPlugin,
  // BetterCommentsViewPlugin,
  MinimalistEditorPlugin,
  MultisavePlugin,
  SmartHistoryPlugin,
  // BetterForumViewPlugin,
  CopyPageSourceToClipboardPlugin,
];

export const SCP_USERTOOLS_BUNDLE = [
  ...STANDARD_USERTOOLS_BUNDLE,
  AutoLocalizePlugin,
  SandboxMirrorerPlugin,
];
