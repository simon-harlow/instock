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

    return (
        <Flex
            justifyContent="space-between"
            flexDirection="column"
            flexWrap="wrap"
            px={{ base: '6', sm: '6', md: '8', xl: '10' }}
            py={{ base: '4', sm: '4', md: '18px' }}
            color="$Slate"
            fontWeight="bold"
            fontSize={{ base: 'mp2bodyMedium', sm: 'mp2bodyMedium', md: 'p2bodyMedium' }}
            lineHeight={{ base: 'mp2bodyMedium', sm: 'mp2bodyMedium', md: 'p2bodyMedium' }}
            borderBottom="1px"
            borderBottomColor="$Cloud"
        >
            <Flex justifyContent="space-between">
                <Flex flexDirection="column" w="50%" gap={5}>
                    <Flex flexDirection="column" gap={1}>
                        <Box textTransform="uppercase">Inventory Item</Box>
                        <Link href={`/inventories/${props.info.id}`}>
                            <Button
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
                    </Flex>
                    <Flex flexDirection="column" gap={1}>
                        <Box textTransform="uppercase">Category</Box>
                        <Box>{props.info.category}</Box>
                    </Flex>
                </Flex>
                <Flex flexDirection="column" w="50%" gap={5}>
                    <Flex flexDirection="column" gap={1}>
                        <Box textTransform="uppercase">Status</Box>
                        <Box>
                            {props.info.quantity === 0 ? (
                                <Center
                                    w="fit-content"
                                    h="24px"
                                    px={2}
                                    textTransform="uppercase"
                                    color="$Red"
                                    bg="rgba(201, 69, 21, 0.07)"
                                    borderRadius="20px"
                                    fontSize="mp3bodySmall"
                                >
                                    {props.info.status}
                                </Center>
                            ) : (
                                <Center
                                    w="fit-content"
                                    h="24px"
                                    px={2}
                                    textTransform="uppercase"
                                    color="$Green"
                                    bg="rgba(21, 132, 99, 0.07)"
                                    borderRadius="20px"
                                    fontSize="mp3bodySmall"
                                >
                                    {props.info.status}
                                </Center>
                            )}
                        </Box>
                    </Flex>
                    <Flex flexDirection="column" gap={1}>
                        <Box textTransform="uppercase">QTY</Box>
                        <Box>{props.info.quantity}</Box>
                    </Flex>
                    <Flex flexDirection="column" gap={1}>
                        <Box textTransform="uppercase">Warehouse</Box>
                        <Box>{props.info.warehouse_name}</Box>
                    </Flex>
                </Flex>
            </Flex>
            <Flex justifyContent="space-between">
                <Delete cursor="pointer" boxSize={6} color="$Red" onClick={onOpen} />
                <Link href={`/inventories/edit/${props.info.id}`}>
                    <Edit cursor="pointer" boxSize={6} color="$InstockIndigo" />
                </Link>
            </Flex>
            <Modal onClose={onClose} size={'full'} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete {props.info.item_name} inventory item?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Please confirm that you'd like to delete {props.info.item_name} from the inventory list. You
                        won't be able to undo this action.
                    </ModalBody>
                    <ModalFooter>
                        <Flex w="100%" gap={8}>
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
                            <Button flex="1" h="36px" borderRadius="20px" color="White" bg="$Red" _hover={{ bg: '' }}>
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
