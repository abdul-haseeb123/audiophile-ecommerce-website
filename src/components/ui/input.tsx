import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        {
          "min-w-72 rounded-lg px-4 py-3 font-bold caret-beige-dark outline-double outline-2 outline-white-cloud placeholder:font-normal placeholder:caret-beige-dark focus:outline-beige-dark":
            props.type == "text",
        },
        className,
      )}
      {...props}
    />
  );
}
