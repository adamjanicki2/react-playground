import Button from "@adamjanicki/ui/components/Button";
import { useRef } from "react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  onChange: (file: File) => void;
};

const FileUpload = ({ onChange, ...props }: Props) => {
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
      <Button
        onClick={() => inputRef.current?.click()}
        variant="secondary"
        {...props}
      >
        Upload File
      </Button>
    </>
  );
};

export default FileUpload;
