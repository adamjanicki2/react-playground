import React from "react";
import { Popover } from "@adamjanicki/ui-extended";
import { useRef } from "react";
import { classNames } from "@adamjanicki/ui/utils/util";

type Props = {
  items: React.ReactNode[];
  trigger: React.ReactElement;
  className?: string;
  style?: React.CSSProperties;
};

const Menu = ({ items, trigger, className, style = {} }: Props) => {
  const triggerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {React.cloneElement(trigger, {
        ref: triggerRef,
        onClick: (e: MouseEvent) => {
          trigger.props.onClick?.(e);
          setOpen(!open);
        },
        className: classNames(trigger.props.className, className),
        style: { ...(trigger.props.style || {}), ...style },
      })}
      <Popover
        triggerRef={triggerRef}
        open={open}
        style={{
          backgroundColor: "white",
          zIndex: 1000,
        }}
        className="fade b--moon-gray ba corners--rounded pa1"
        onClose={() => setOpen(false)}
        returnFocusOnEscape={false}
        placement="bottom-start"
      >
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
          onClick={() => setOpen(false)}
        >
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </Popover>
    </>
  );
};

export default Menu;
