"use client";

import { Box } from "@chakra-ui/react";
import type { Api } from "@zag-js/tour";

interface TourBackdropProps {
  api: Api;
}

export function TourBackdrop({ api }: TourBackdropProps) {
  return (
    <>
      {/* pointer-events: none ensures the tour overlay never blocks page interactions (modals, buttons) */}
      <Box {...api.getBackdropProps()} pointerEvents="none" />
      <Box {...api.getSpotlightProps()} />
    </>
  );
}
