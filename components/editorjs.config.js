import CheckList from "@editorjs/checklist";
import Code from "@editorjs/code";
import Embed from "@editorjs/embed";
import InlineCode from "@editorjs/inline-code";
import Hyperlink from "editorjs-hyperlink";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";

const EDITOR_CONFIG = {
  code: Code,

  header: {
    class: Header,
    config: {
      placeholder: "Enter a Heading",
      levels: [2, 3, 6],
      defaultLevel: 2,
    },
  },

  hyperlink: {
    class: Hyperlink,
    config: {
      shortcut: "CMD+L",
      target: "_blank",
      rel: "nofollow",
      availableTargets: ["_blank", "_self"],
      availableRels: ["author", "noreferrer"],
      validate: false,
    },
  },

  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },

  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: "http://localhost:4000/uploadFile", // Your file upload endpoint
        byUrl: "http://localhost:4000/fetchUrl", // Your URL-based image fetch endpoint
      },
    },
  },

  checklist: CheckList,

  embed: Embed,

  inlineCode: InlineCode,

  list: {
    class: List,
    inlineToolbar: true,
  },

  quote: Quote,
};

export { EDITOR_CONFIG };
