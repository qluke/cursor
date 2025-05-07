import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image
          src="/images/logo/app-logo.svg"
          width={24}
          height={24}
          alt="Logo"
          style={{
            marginRight: 8,
            display: "inline-block",
            verticalAlign: "middle",
          }}
        />
        Cursor
      </>
    ),
  },
  links: [],
};
