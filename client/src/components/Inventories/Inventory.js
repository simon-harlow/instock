import React from 'react';
import {
    Flex,
    Box,
    Button,
    Center,
    Link,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { Delete, Edit, ChevronRight } from '../../assets/modifiedIcons';

function Inventory(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    // const editListItem = id => {
    //     let post = {
  
    //         warehouse_id: "89898957-04ba-4bd0-9f5c-a7aea7447963",
    //         item_name: "Television OLED",
    //         description: "This 50\", 4K LED TV provides a crystal-clear picture and vivid colors.",
    //         category: "Electronics",
    //         status: "In Stock",
    //         quantity: 500
    //       }
    //     axios
    //             .post(`http://localhost:8080/inventories/${id}`, post)
    //             .then(response =>{       
    //                 }).catch(error =>{
    //                     console.log(error);
    //                 });


    // }

    return (
        <Flex
            justifyContent="space-between"
            px={{ base: '6', sm: '6', md: '8', xl: '10' }}
            py={{ base: '4', sm: '4', md: '18px' }}
            color="$Slate"
            fontWeight="bold"
            fontSize={{ base: 'mp2bodyMedium', sm: 'mp2bodyMedium', md: 'p2bodyMedium' }}
            lineHeight={{ base: 'mp2bodyMedium', sm: 'mp2bodyMedium', md: 'p2bodyMedium' }}
            borderBottom="1px"
            borderBottomColor="$Cloud"
        >
            <Link href={`/inventories/${props.info.id}`}>
                <Button
                    w="150px"
                    justifyContent="start"
                    color={'$InstockIndigo'}
                    rightIcon={<ChevronRight color="$InstockIndigo" />}
                    bg={''}
                    h={''}
                    p={0}
                    _hover={{ bg: '', textDecoration: 'underline' }}
                    _active={{ bg: '' }}
                >
                    {props.info.item_name}
                </Button>
            </Link>
            <Box w="90px">{props.info.category}</Box>
            <Box w="95px">
                {props.info.quantity === 0 ? (
                    <Center
                        w="fit-content"
                        h="26px"
                        px={2}
                        textTransform="uppercase"
                        color="$Red"
                        bg="rgba(201, 69, 21, 0.07)"
                        borderRadius="20px"
                        fontSize="p3bodySmall"
                    >
                        {props.info.status}
                    </Center>
                ) : (
                    <Center
                        w="fit-content"
                        h="26px"
                        px={2}
                        textTransform="uppercase"
                        color="$Green"
                        bg="rgba(21, 132, 99, 0.07)"
                        borderRadius="20px"
                        fontSize="p3bodySmall"
                    >
                        {props.info.status}
                    </Center>
                )}
            </Box>
            <Box w="40px">{props.info.quantity}</Box>
            <Box w="85px">{props.info.warehouse_name}</Box>
            <Flex w="75px" gap={6} justifyContent="end">
                <Delete cursor="pointer" boxSize={6} color="$Red" onClick={onOpen} />
                <Link href={`/inventories/edit/${props.info.id}`}>
                    <Edit cursor="pointer" boxSize={6} color="$InstockIndigo" />
                </Link>
            </Flex>
            <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
                <ModalOverlay bg="rgba(35, 41, 64, 0.8)" />
                <ModalContent>
                    <ModalHeader>Delete {props.info.item_name} inventory item?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Please confirm that you'd like to delete {props.info.item_name} from the inventory list. You
                        won't be able to undo this action.
                    </ModalBody>
                    <ModalFooter>
                        <Flex gap={4}>
                            <Button
                                flex="1"
                                h="36px"
                                borderRadius="20px"
                                onClick={onClose}
                                variant="outline"
                                _hover={{ bg: '' }}
                            >
                                Close
                            </Button>
                            <Button
                                flex="1"
                                h="36px"
                                borderRadius="20px"
                                color="White"
                                bg="$Red"
                                _hover={{ bg: '' }}
                                _active={{ bg: '' }}
                                onClick={() => {
                                    props.delete(props.info.id);
                                    onClose();
                                }}
                            >
                                Delete
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}

export default Inventory;
