import React, { useRef, useState } from "react";
import Popover from "@adamjanicki/ui-extended/components/Popover";
import type { IconType } from "@adamjanicki/ui/components/Icon/icons";
import { Box, Icon, IconButton, UnstyledButton } from "@adamjanicki/ui";

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
  const ref = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <>
      <IconButton
        {...buttonProps}
        onClick={() => setOpen(!open)}
        ref={ref}
        aria-label="toggle menu"
      />
      <Popover
        offset={4}
        open={open}
        triggerRef={ref}
        placement="bottom-end"
        onClose={closeMenu}
        vfx={{ axis: "y" }}
        returnFocusOnEscape={false}
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
              }}
              className="aui-autocomplete-option"
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
    </>
  );
}
