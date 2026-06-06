import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
}

interface AsButton extends BaseProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

interface AsLink extends BaseProps {
  href: string;
  external?: boolean;
}

type ButtonProps = AsButton | AsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent hover:bg-accent-hover text-white accent-glow",
  secondary: "bg-transparent text-white border-2 border-white hover:bg-white hover:text-bg-primary",
  ghost: "bg-transparent text-accent border-2 border-accent hover:bg-accent hover:text-bg-primary",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-xs px-4 py-2 tracking-widest",
  md: "text-sm px-6 py-3 tracking-widest",
  lg: "text-sm px-8 py-4 tracking-widest",
};

const BASE =
  "inline-flex items-center justify-center gap-2 font-body font-semibold uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(BASE, variantClasses[variant], sizeClasses[size], className);

  if (props.href !== undefined) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" aria-label={props["aria-label"]}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={props["aria-label"]}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
      aria-label={props["aria-label"]}
    >
      {children}
    </button>
  );
}
