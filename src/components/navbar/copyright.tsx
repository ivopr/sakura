import { Paper, Text } from "@mantine/core";
import dayjs from "dayjs";

export function Copyright(): JSX.Element {
  return (
    <Paper>
      <Text align="center" color="dimmed">
        &copy; {dayjs().get("year")} Mantis
      </Text>
    </Paper>
  );
}
