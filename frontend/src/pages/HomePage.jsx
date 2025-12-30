import {
  Container,
  VStack,
  Text,
  SimpleGrid,
  Box,
  Image,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

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
                rounded={"2xl"}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                shadow="md"
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
                  <Text color="gray.600">₹ {product.price}</Text>
                  <Text color="gray.500" fontSize="sm" noOfLines={2}>
                    {product.description}
                  </Text>
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
