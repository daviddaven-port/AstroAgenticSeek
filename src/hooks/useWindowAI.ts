import { useProcesses } from "../contexts/process";
import { useSession } from "../contexts/session";
import { useCallback } from "react";
import { type ProcessArguments } from "../contexts/process/types";

export const useWindowAI = () => {
  const { open = () => {} } = useProcesses() || {};
  const { prependToStack = () => {} } = useSession() || {};

  const openAIChat = useCallback(() => {
    const aiArgs: ProcessArguments = {
      url: "/System/AI/Chat",
    };
    open("AIChat", aiArgs);
  }, [open]);

  return { openAIChat };
};
