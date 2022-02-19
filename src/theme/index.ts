import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
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
        borderRadius: "sm",
      },
      variants: {
        solid: {
          _hover: {
            backgroundColor: "primary.400",
            _disabled: {
              backgroundColor: "primary.500",
            },
          },
          _focus: {
            backgroundColor: "primary.600",
            _focus: {
              backgroundColor: "primary.600",
            },
            _hover: {
              backgroundColor: "primary.600",
            },
            _disabled: {
              backgroundColor: "primary.500",
            },
          },
          backgroundColor: "primary.500",
          color: "white",
        },
      },
      defaultProps: {
        size: "lg",
        variant: "solid",
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
    Modal: {
      baseStyle: {
        closeButton: {
          borderRadius: "sm",
        },
      },
      variants: {
        main: {
          dialog: {
            backgroundColor: "gray.900",
            borderRadius: "sm",
          },
          close: {
            borderRadius: "sm",
          },
        },
      },
      defaultProps: {
        variant: "main",
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
});
