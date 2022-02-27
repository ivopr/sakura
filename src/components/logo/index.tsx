import { GiPrayingMantis } from "react-icons/gi";

import { ButtonLink } from "../button-link";

export function Logo(): JSX.Element {
  return (
    <ButtonLink
      sx={{
        color: "#69DB7C",
        width: "auto",
      }}
      size="xl"
      href="/"
      compact
      leftIcon={<GiPrayingMantis size={26} />}
    >
      Mantis
    </ButtonLink>
  );
}
