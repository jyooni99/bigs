interface LabelProps {
  text: string;
  required?: boolean;
  htmlFor?: string;
}

export default function Label({ text, required = false, htmlFor }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
    >
      {text}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

