import {
  Box,
  Container,
  Heading,
  useColorModeValue,
  VStack,
  Input,
  Button,
  Textarea
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: ""
  });
  const {createProduct} = useProductStore()
  const handleAddProduct = async() => {
    const {success,message} = await createProduct(newProduct)
    console.log("Success:",success);
    console.log("Message:",message);
  };

  return (
    <Container maxW="container.sm">
      <VStack spacing={8}>
        <Heading 
          as="h1" 
          size="2xl" 
          textAlign="center" 
          mb={8} 
          mt={10}
        >
          Create New Product
        </Heading>

        <Box
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          p={8}
          rounded="lg"
          shadow="lg"
        >
          <VStack spacing={5}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              size="lg"
              focusBorderColor="blue.400"
            />

            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              size="lg"
              focusBorderColor="blue.400"
            />

            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              size="lg"
              focusBorderColor="blue.400"
            />

            <Textarea
              placeholder="Description"
              name="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              size="lg"
              focusBorderColor="blue.400"
              rows={4}
            />

            <Button 
              colorScheme="blue" 
              size="lg"
              w="full" 
              onClick={handleAddProduct}
              _hover={{ transform: "translateY(-2px)", shadow: "xl" }}
              transition="all 0.2s"
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;