import {
  Box,
  Icon,
  IconButton,
  Popover,
  UnstyledButton,
} from "@adamjanicki/ui";
import { IconType } from "@adamjanicki/ui/types/icon";
import React, { useState } from "react";

type Action = {
  onAction?: () => void;
  icon?: IconType;
  text: string;
};

type IconButtonProps = React.ComponentProps<typeof IconButton>;

type Props = {
  children: Action[];
  buttonProps: IconButtonProps;
};

export default function Menu({ buttonProps, children }: Props) {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <Popover
      anchor={
        <IconButton
          {...buttonProps}
          onClick={() => setOpen(!open)}
          aria-label="toggle menu"
        />
      }
      offset={4}
      open={open}
      placement="bottom-end"
      onClose={closeMenu}
      vfx={{ axis: "y" }}
    >
      {children.map((item, i) => {
        const { icon, text, onAction } = item;

        return (
          <UnstyledButton
            vfx={{
              axis: "x",
              align: "center",
              padding: "m",
              radius: "rounded",
              fontWeight: 5,
              hover: "shade",
            }}
            onClick={() => {
              onAction?.();
              closeMenu();
            }}
            key={i}
          >
            <Box vfx={{ axis: "x", align: "center", gap: "s" }}>
              {icon && <Icon icon={icon} />}
              {text}
            </Box>
          </UnstyledButton>
        );
      })}
    </Popover>
  );
}
