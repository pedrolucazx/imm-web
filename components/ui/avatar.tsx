"use client";

import { Avatar as ChakraAvatar, AvatarGroup as ChakraAvatarGroup } from "@chakra-ui/react";
import * as React from "react";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export interface AvatarProps extends ChakraAvatar.RootProps {
  name?: string;
  src?: string;
  srcSet?: string;
  loading?: ImageProps["loading"];
  icon?: React.ReactElement;
  fallback?: React.ReactNode;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(function Avatar(props, ref) {
  const { name, src, srcSet, loading, icon, fallback, children, ...rest } = props;
  return (
    <ChakraAvatar.Root
      ref={ref}
      borderWidth="2px"
      borderColor="black"
      borderRadius="0"
      boxShadow="2px 2px 0px 0px black"
      {...rest}
    >
      <ChakraAvatar.Fallback
        name={name}
        borderRadius="0"
        bg="primary"
        color="black"
        fontWeight="bold"
      >
        {icon || fallback}
      </ChakraAvatar.Fallback>
      <ChakraAvatar.Image src={src} srcSet={srcSet} loading={loading} borderRadius="0" />
      {children}
    </ChakraAvatar.Root>
  );
});

export const AvatarGroup = ChakraAvatarGroup;
