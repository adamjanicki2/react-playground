import { useRef } from "react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  onChange: (file: File) => void;
  ButtonElement: (props: any) => JSX.Element;
  ButtonProps: any;
};

const FileUpload = ({
  onChange,
  ButtonElement,
  ButtonProps,
  ...props
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            onChange(file);
          }
        }}
      />
      <ButtonElement
        onClick={() => inputRef.current?.click()}
        {...props}
        {...ButtonProps}
      >
        Upload File
      </ButtonElement>
    </>
  );
};

export default FileUpload;
