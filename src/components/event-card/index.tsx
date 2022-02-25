import { Text } from "@chakra-ui/react";
import React, { FC } from "react";

import { SimpleCard } from "../simple-card";
import { EventProps } from "./event.props";

export * from "./event.props";

export const EventCard: FC<EventProps> = ({ name, startAt }) => {
  return (
    <SimpleCard
      title="Upcoming Events"
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
      >{`${name} - ${startAt.toFormat("dd/MM/yyyy")}`}</Text>
    </SimpleCard>
  );
};
