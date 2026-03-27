import type { SystemStyleObject } from "@chakra-ui/react";
import { sharedAuthStyles } from "../auth.styles";

export const s = {
  ...sharedAuthStyles,
  successSpacer: {
    py: 4,
  },
} satisfies Record<string, SystemStyleObject>;
