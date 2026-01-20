import { Alert as UIAlert, Icon } from "@adamjanicki/ui";
import {
  checkCircle,
  infoCircle,
  minusCircle,
  warningCircle,
  xCircle,
} from "@adamjanicki/ui/icons";

const TYPE_TO_ICON = {
  success: checkCircle,
  error: xCircle,
  warning: warningCircle,
  info: infoCircle,
  static: minusCircle,
} as const;

type Props = React.ComponentProps<typeof UIAlert>;

export default function Alert({ type, children, vfx, ...props }: Props) {
  return (
    <UIAlert
      type={type}
      vfx={{ ...vfx, axis: "x", align: "center", gap: "s", width: "max" }}
      {...props}
    >
      <Icon size="s" icon={TYPE_TO_ICON[type]} />
      {children}
    </UIAlert>
  );
}
