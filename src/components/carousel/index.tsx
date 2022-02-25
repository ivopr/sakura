import { Heading, HStack, IconButton, Image, VStack } from "@chakra-ui/react";
import { useGetNewsImagesQuery } from "@sword/store/apis/news";
import React, { FC, useState } from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

import { CarouselProps } from "./carousel.props";

export const Carousel: FC<CarouselProps> = ({ perPage = 1 }) => {
  const { data } = useGetNewsImagesQuery(null);
  const [imageIndex, setImageIndex] = useState(0);

  const previousImage = (): void => {
    let nextIndex;
    if (data && imageIndex - 1 < 0) {
      nextIndex = data?.images.length - 1;
    } else {
      nextIndex = imageIndex - 1;
    }

    setImageIndex(nextIndex);
  };

  const nextImage = (): void => {
    let nextIndex;
    if (imageIndex + 1 === data?.images.length) {
      nextIndex = 0;
    } else {
      nextIndex = imageIndex + 1;
    }

    setImageIndex(nextIndex);
  };

  return (
    <VStack alignSelf="center">
      {data ? (
        <>
          <HStack>
            {data?.images.slice(imageIndex, perPage + imageIndex).map((image, index) => (
              <Image key={index} maxWidth="lg" maxHeight="xs" alt="A test image" src={image} />
            ))}
          </HStack>
          <HStack spacing="10">
            <IconButton
              aria-label="Previous image"
              icon={<BsChevronDoubleLeft />}
              onClick={previousImage}
            />
            <IconButton
              aria-label="Next image"
              icon={<BsChevronDoubleRight />}
              onClick={nextImage}
            />
          </HStack>
        </>
      ) : (
        <Heading>Sem novidades</Heading>
      )}
    </VStack>
  );
};
