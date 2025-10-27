"use client";

import { forwardRef, ComponentPropsWithoutRef, FC } from "react";
import Link from "next/link";
import {
  motion,
  Transition,
  useMotionValue,
  useSpring,
  useTransform, // ✅ اضافه شد
  MotionValue,
} from "framer-motion";

type MotionButtonProps = ComponentPropsWithoutRef<typeof motion.button>;

interface ButtonProps extends Omit<MotionButtonProps, "children"> {
  variant?: "primary" | "secondary" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
  loading?: boolean;
  children?: React.ReactNode;
}

// ✅ پس‌زمینه با دو لایه متصل به motion value
const BackgroundLayers: FC<{
  normal: string;
  hover: string;
  opacity: MotionValue<number>;
}> = ({ normal, hover, opacity }) => {
  // از useTransform برای تبدیل مقادیر به شفافیت برعکس استفاده می‌کنیم

  return (
    <>
      {/* Base background */}
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          background: normal,
        }}
      />

      {/* Hover background */}
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          background: hover,
          opacity,
        }}
      />
    </>
  );
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      loading = false,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    // 🧱 Base Tailwind styles
    const baseStyles =
      "relative overflow-hidden rounded-full font-yekan font-medium shadow-sm flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none select-none";

    const sizeStyles = {
      sm: "h-8 px-4 text-sm",
      md: "h-10 px-8 text-base",
      lg: "h-12 px-10 text-lg",
    } as const;

    const variantGradients = {
      primary: {
        normal:
          "linear-gradient(45deg, var(--color-primary), var(--color-secondary))",
        hover:
          "linear-gradient(45deg, var(--color-primary-hover), var(--color-secondary))",
        text: "text-white",
      },
      secondary: {
        normal:
          "linear-gradient(45deg, var(--color-secondary), var(--color-secondary-light))",
        hover:
          "linear-gradient(45deg, var(--color-secondary), var(--color-secondary))",
        text: "text-primary-text",
      },
      white: {
        normal: "linear-gradient(45deg, var(--color-surface), #f5f5f5)",
        hover: "linear-gradient(45deg, #f1f1f1, #e7e7e7)",
        text: "text-primary-text",
      },
    } as const;

    const { normal, hover, text } = variantGradients[variant];
    const sizeClass = sizeStyles[size];

    const transition: Transition = {
      duration: 0.45,
      ease: "easeInOut",
    };

    const combinedClass = `${baseStyles} ${sizeClass} ${text} ${className}`;

    // 🎛 کنترل motion value
    const hoverProgress = useMotionValue(0);
    const opacity = useSpring(hoverProgress, {
      stiffness: 180,
      damping: 20,
    });

    const handleHoverStart = () => hoverProgress.set(1);
    const handleHoverEnd = () => hoverProgress.set(0);

    // 🔄 Loader
    const Loader = (
      <span className="flex items-center gap-2">
        <svg
          className="animate-spin h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            strokeWidth="4"
            stroke="currentColor"
          />
        </svg>
        در حال بارگذاری...
      </span>
    );

    const ButtonContent = (
      <>
        <BackgroundLayers normal={normal} hover={hover} opacity={opacity} />
        <span className="relative z-10">{loading ? Loader : children}</span>
      </>
    );

    const motionProps = {
      onHoverStart: handleHoverStart,
      onHoverEnd: handleHoverEnd,
      whileHover: { scale: 1.04 },
      whileTap: { scale: 0.97 },
      transition,
    };

    if (href) {
      return (
        <Link href={href} className="inline-block">
          <motion.div {...motionProps} className={combinedClass}>
            {ButtonContent}
          </motion.div>
        </Link>
      );
    }

    return (
      <motion.button
        ref={ref}
        disabled={loading}
        {...motionProps}
        className={combinedClass}
        {...props}
      >
        {ButtonContent}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
