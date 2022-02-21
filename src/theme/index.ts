import { extendTheme, withDefaultColorScheme, withDefaultSize } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    colors: {
      primary: {
        100: "#D9E6FD",
        200: "#B4CBFC",
        300: "#8DACF6",
        400: "#6E91EC",
        500: "#4169E1",
        600: "#2F50C1",
        700: "#203AA2",
        800: "#142782",
        900: "#0C1A6C",
      },
    },
    components: {
      Alert: {
        baseStyle: {
          container: {
            borderRadius: "sm",
          },
        },
      },
      Button: {
        baseStyle: {
          borderRadius: "md",
        },
        defaultProps: {
          size: "lg",
        },
      },
      Input: {
        variants: {
          filled: {
            field: {
              _hover: {
                backgroundColor: "gray.900",
              },
              _focus: {
                backgroundColor: "gray.900",
                borderColor: "primary.500",
              },
              backgroundColor: "gray.900",
              borderRadius: "md",
              color: "gray.100",
            },
          },
        },
        defaultProps: {
          size: "lg",
          variant: "filled",
        },
      },
      Modal: {
        baseStyle: {
          closeButton: {
            borderRadius: "sm",
          },
          dialog: {
            backgroundColor: "gray.800",
            borderRadius: "sm",
            padding: 2.5,
            paddingX: 5,
          },
          body: {
            marginTop: 3.5,
            padding: 0,
          },
          footer: {
            padding: 0,
          },
          header: {
            fontSize: "2xl",
            padding: 0,
          },
        },
      },
      Select: {
        variants: {
          filled: {
            field: {
              _hover: {
                backgroundColor: "gray.900",
              },
              _focus: {
                backgroundColor: "gray.900",
                borderColor: "primary.500",
              },
              backgroundColor: "gray.900",
              color: "gray.100",
              rounded: "sm",
            },
          },
        },
        defaultProps: {
          size: "lg",
          variant: "filled",
        },
      },
    },
    config: {
      initialColorMode: "dark",
      useSystemColorMode: false,
    },
    fonts: {
      heading: "Poppins",
      body: "Poppins",
    },
    styles: {
      global: {
        body: {
          backgroundColor: "gray.800",
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "primary" }),
  withDefaultSize({ size: "lg" })
);
