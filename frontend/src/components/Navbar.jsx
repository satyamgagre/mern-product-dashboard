import {
  Container, Flex, Text, Button, HStack,
  useColorMode, useColorModeValue} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { LuSun } from "react-icons/lu";
import { IoMoon } from "react-icons/io5";


const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Container 
      maxW="full" 
      p={8}
      bg={useColorModeValue("white", "gray.800")}
      rounded="lg"
      shadow="sm"
      mb={8}
    >
      <Flex
        h={15}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          <Link to="/">Quick Stock 🛒</Link>
        </Text>

        <HStack spacing={3}>
          <Link to="/create">
            <Button
              _hover={{ transform: "translateY(-2px)", shadow: "md" }}
              transition="all 0.2s"
            >
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button 
            onClick={toggleColorMode}
            _hover={{ transform: "translateY(-2px)", shadow: "md" }}
            transition="all 0.2s"
          >
            {colorMode === "light" ? <IoMoon size="20"/> : <LuSun size="20"/>}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;