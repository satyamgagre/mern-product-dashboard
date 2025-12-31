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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";

const HomePage = () => {
  const { fetchProducts, products, deleteProduct, updateProduct } =
    useProductStore();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const textColor = useColorModeValue("gray.800", "white");
  const bg = useColorModeValue("white", "gray.800");

  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    price: "",
    imageUrl: "",
    description: "",
  });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleEditClick = (product) => {
    setUpdatedProduct(product);
    onOpen();
  };

  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdate = async () => {
    const { success, message } = await updateProduct(
      updatedProduct._id,
      updatedProduct
    );

    toast({
      title: success ? "Updated" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });

    if (success) onClose();
  };

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
              <Text as="span" color="blue.500">
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
                  <Text fontWeight="bold">{product.name}</Text>
                  <Text color="gray.500">₹ {product.price}</Text>
                  <Text color="gray.400" noOfLines={2}>
                    {product.description}
                  </Text>

                  <HStack justify="flex-end" mt={3}>
                    <IconButton
                      icon={<EditIcon />}
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handleEditClick(product)}
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDeleteProduct(product._id)}
                    />
                  </HStack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </VStack>

      {/* UPDATE MODAL */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                value={updatedProduct.imageUrl}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    imageUrl: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Description"
                value={updatedProduct.description}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    description: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default HomePage;
