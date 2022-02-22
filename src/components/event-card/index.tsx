import { Text } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useTranslations } from "next-intl";
import React, { FC } from "react";

import { SimpleCard } from "../simple-card";
import { EventProps } from "./event.props";

export * from "./event.props";

export const EventCard: FC<EventProps> = ({ name, startAt }) => {
  const translate = useTranslations("events");
  const startDate = DateTime.fromSeconds(startAt.getTime());

  return (
    <SimpleCard title={translate("Upcoming Event")}>
      <Text textAlign="center">{`${translate(name)} - ${startDate.toFormat("dd/MM/yyyy")}`}</Text>
    </SimpleCard>
  );
};
