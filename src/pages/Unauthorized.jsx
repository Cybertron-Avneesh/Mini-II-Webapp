import { Box, Button, Heading, Link, Text } from '@chakra-ui/react';
const Unauthorized = () => {
  return (
    <Box textAlign="center" py={{ base: 40, md: 60 }} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, cyan.400, cyan.600)"
        backgroundClip="text"
      >
        Err 4xx
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        You are not authorized to access this page.
      </Text>
      <Text color={'gray.500'} mb={6}>
        Make sure you have connected the correct Wallet. Sorry for the inconvenience.
      </Text>

      <Button
        colorScheme="cyan"
        bgGradient="linear(to-r, cyan.400, cyan.500, cyan.600)"
        color="white"
        variant="solid"
        as={Link}
        href="/"
      >
        Go to Home
      </Button>
    </Box>
  );
};
export default Unauthorized;
