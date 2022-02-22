import { Text } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useTranslations } from "next-intl";
import React, { FC } from "react";

import { SimpleCard } from "../simple-card";
import { EventProps } from "./event.props";

export * from "./event.props";

export const EventCard: FC<EventProps> = ({ name, startAt }) => {
  const translate = useTranslations("events");

  return (
    <SimpleCard
      title={translate("Upcoming Event")}
      containerStyle={{
        width: { base: "fit-content", md: "initial" },
        justifyContent: "center",
      }}
      titleStyle={{
        textAlign: "center",
        fontSize: { base: 15, md: 30 },
      }}
    >
      <Text
        flexWrap="wrap"
        width={{ base: "fit-content", md: "initial" }}
        fontSize={{ base: 12, md: 16 }}
        textAlign="center"
        paddingX="10"
        paddingY="2"
      >{`${translate(name)} - ${startAt.toFormat("dd/MM/yyyy")}`}</Text>
    </SimpleCard>
  );
};
