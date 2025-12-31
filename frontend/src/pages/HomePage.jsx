import {
  Container,
  VStack,
  Text,
  SimpleGrid,
  Box,
  Image,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const HomePage = () => {
  const textColor = useColorModeValue("gray.800", "white");
  const bg = useColorModeValue("white", "gray.800");

  const { fetchProducts, products, deleteProduct } = useProductStore();
  const toast = useToast();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          Current Products
        </Text>

        {products.length === 0 && (
          <Text>
            No Products found{" "}
            <Link to="/create">
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a Product
              </Text>
            </Link>
          </Text>
        )}

        {products.length > 0 && (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} w="full">
            {products.map((product) => (
              <Box
                key={product._id}
                bg={bg}
                color={textColor}
                rounded="2xl"
                borderWidth="1px"
                overflow="hidden"
                shadow="md"
                transition="all 0.3s"
                _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
              >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  h="200px"
                  w="100%"
                  objectFit="cover"
                />

                <Box p={4}>
                  <Text fontWeight="bold" fontSize="lg">
                    {product.name}
                  </Text>

                  <Text color="gray.500">₹ {product.price}</Text>

                  <Text color="gray.400" fontSize="sm" noOfLines={2}>
                    {product.description}
                  </Text>

                  <HStack justify="flex-end" mt={3}>
                    <IconButton
                      icon={<EditIcon />}
                      colorScheme="blue"
                      size="sm"
                      aria-label="Edit Product"
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      size="sm"
                      aria-label="Delete Product"
                      onClick={() => handleDeleteProduct(product._id)}
                    />
                  </HStack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
