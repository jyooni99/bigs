interface LabelProps {
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
}

export default function Label({ required = false, htmlFor, children }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

