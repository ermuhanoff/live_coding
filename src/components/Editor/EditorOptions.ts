import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/matchtags";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/comment/comment";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/runmode/colorize";
import "codemirror/addon/search/match-highlighter";
import "codemirror/addon/selection/mark-selection";
import "codemirror/addon/selection/active-line";
import "codemirror/addon/lint/lint"
import "codemirror/addon/lint/javascript-lint";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/xml/xml";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/anyword-hint";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/theme/ayu-mirage.css";
import "codemirror/addon/dialog/dialog";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/scroll/simplescrollbars";
import "codemirror/addon/scroll/simplescrollbars.css";
import { JSHINT } from "jshint";
import { EditorConfiguration } from "codemirror";

(window as any).JSHINT = JSHINT;

export default {
    mode: { name: "javascript", json: true, globalVars: true },
    hintOptions: {
        jshint: { esversion: 6 }
    },
    theme: "ayu-mirage",
    lint: true,
    lineNumbers: true,
    // lineSeparator: "",
    indentUnit: 2,
    smartIndent: true, //
    tabSize: 2,
    indentWhithTabs: true,
    electricChars: true, //

    scrollbarStyle: "overlay",
    // specialChars: "",
    // specialCharPlaceholder: () -> {},
    direction: "ltr",
    // rtlMoveVisually: true, //
    keyMap: "default",
    configureMouse: function (cm: any, rp: any, ev: any) {
        return {
            moveOnDrag: true,
        };
    },
    lineWrapping: false,
    firstLineNumber: 1,
    lineNumberFormatter: function (n: any) {
        return n;
    },
    fixedGutter: true, //
    coverGutterNextToScrollbar: false, //
    readOnly: false,
    // screenReaderLabel: 'label',
    showCursorWhenSelecting: false,
    lineWiseCopyCut: true,
    pasteLinesPerSelection: true,
    selectionsMayTouch: true, //
    undoDepth: 200,
    historyEventDelay: 1250,
    tabindex: 1, //
    autofocus: false,
    dragDrop: true,
    // allowDropFileTypes: [],
    cursorBlinkRate: 530,
    cursorScrollMargin: 0, //
    cursorHeight: 1,
    singleCursorHeightPerLine: true,
    resetSelectionOnContextMenu: true,
    viewportMargin: Infinity,
    spellcheck: true,
    autocorrect: true,
    // addons
    matchBrackets: true,
    autoCloseBrackets: true,
    foldGutter: true,
    gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    foldOptions: {
        widget: (from: any, to: any) => "...",
    },
    matchTags: true,
    autoCloseTags: true,
    styleSelectedText: true,
    styleActiveLine: true,
    highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },

    extraKeys: {
        "Ctrl-Q": function (cm: any) {
            cm.foldCode(cm.getCursor());
        },
        "Ctrl-/": function (cm: any) {
            cm.toggleComment({ lineComment: "//" });
        },
        "Alt-Down": function (cm: any) {
            let pos = cm.getCursor(),
                lastLine = cm.lastLine(),
                curStr = cm.getLine(pos.line);

            if (pos.line === lastLine) return;

            let nextStr = cm.getLine(pos.line + 1);

            cm.replaceRange(
                curStr,
                { line: pos.line + 1, ch: 0 },
                { line: pos.line + 1, ch: nextStr.length }
            );
            cm.replaceRange(
                nextStr,
                { line: pos.line, ch: 0 },
                { line: pos.line, ch: curStr.length }
            );
            cm.setCursor({ line: pos.line + 1, ch: pos.ch });
        },
        "Alt-Up": function (cm: any) {
            let pos = cm.getCursor(),
                firstLine = cm.firstLine(),
                curStr = cm.getLine(pos.line);

            if (pos.line === firstLine) return;

            let prevStr = cm.getLine(pos.line - 1);

            cm.replaceRange(
                curStr,
                { line: pos.line - 1, ch: 0 },
                { line: pos.line - 1, ch: prevStr.length }
            );
            cm.replaceRange(
                prevStr,
                { line: pos.line, ch: 0 },
                { line: pos.line, ch: curStr.length }
            );
            cm.setCursor({ line: pos.line - 1, ch: pos.ch });
        },
        "Shift-Alt-Down": function (cm: any) {
            let pos = cm.getCursor(),
                curStr = cm.getLine(pos.line);
            cm.replaceRange(curStr + "\n", { line: pos.line + 1, ch: 0 });
            cm.setCursor({ line: pos.line + 1, ch: curStr.length });
        },
        "Ctrl-Space": "autocomplete"
    }
} as EditorConfiguration;