import { HTMLAttributes, PropsWithChildren } from "react";

import { cnMerge } from "@/utils/cnMerge";

type Props = HTMLAttributes<HTMLElement>;

export function PageLayout({
  children,
  className,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <main
      className={cnMerge(
        "container px-4 py-6 md:px-6 md:py-10 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
}
