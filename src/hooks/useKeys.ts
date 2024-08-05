import { useEffect } from "react";

type Config = {
  keys: string | string[];
  keyEvent?: "keydown" | "keyup";
  callback: (event: KeyboardEvent) => void;
  preventDefault?: boolean;
};

const useKeys = (config: Config) => {
  const {
    keys,
    keyEvent = "keydown",
    callback,
    preventDefault = true,
  } = config;

  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      const keysToListen = Array.isArray(keys) ? keys : [keys];

      const keysPressed = keysToListen.filter((keyCombo) => {
        const keys = keyCombo.split("+");
        return keys.every((key) => {
          key = key.toLowerCase();
          switch (key) {
            case "control":
            case "ctrl":
              return event.ctrlKey;
            case "meta":
            case "command":
            case "cmd":
              return event.metaKey;
            case "shift":
              return event.shiftKey;
            case "alt":
              return event.altKey;
            default:
              return event.key.toLowerCase() === key.toLowerCase();
          }
        });
      });

      if (keysPressed.length) {
        if (preventDefault) {
          event.preventDefault();
        }
        callback(event);
      }
    };

    document.addEventListener(keyEvent, keyListener);
    return () => document.removeEventListener(keyEvent, keyListener);
  }, [keys, keyEvent, callback, preventDefault]);
};

export default useKeys;
