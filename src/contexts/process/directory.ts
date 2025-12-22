import Browser from "../../components/apps/Browser";
import Telegraph from "../../components/apps/Telegraph";
import Docs from "../../components/apps/Docs";
import Ledger from "../../components/apps/Ledger";
import AIChat from "../../components/apps/AIChat";
import { type Processes } from "./types";

const directory: Processes = {
  Browser: {
    Component: Browser,
    backgroundColor: "#fff",
    defaultSize: {
      height: 600,
      width: 800,
    },
    icon: "🌐",
    title: "Wild West Browser",
  },
  Telegraph: {
    Component: Telegraph,
    backgroundColor: "#000",
    defaultSize: {
      height: 400,
      width: 600,
    },
    icon: "📠",
    title: "Telegraph",
  },
  Docs: {
    Component: Docs,
    backgroundColor: "#fff",
    defaultSize: {
      height: 450,
      width: 650,
    },
    icon: "💼",
    title: "Docs",
  },
  Ledger: {
    Component: Ledger,
    backgroundColor: "#1E1E1E",
    defaultSize: {
      height: 480,
      width: 544,
    },
    icon: "📓",
    title: "Ledger",
  },
  AIChat: {
    Component: AIChat,
    backgroundColor: "#1A1A1A",
    defaultSize: {
      height: 500,
      width: 400,
    },
    icon: "🤖",
    title: "AI Chat",
  }
};

export default directory;
