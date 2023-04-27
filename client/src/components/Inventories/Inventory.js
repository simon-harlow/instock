import React, {useState} from 'react';
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
    useMediaQuery
} from '@chakra-ui/react';
import { Delete, Edit, ChevronRight } from '../../assets/modifiedIcons';

function Inventory(props) {
    const { isOpen, onOpen, onClose } = useDisclosure(); 

    const [tablet] = useMediaQuery('(min-width: 768px)');

    const [isHovering, setHovering] = useState('');
    
    const handleMouseOver = () =>{
        setHovering(true);
    }

    const handleMouseExit = () =>{
        setHovering(false);
    }


    return (
        <Flex
            justifyContent="space-between"
            px={{ base: '6', md: '8', xl: '10' }}
            py={{ base: '4', md: '18px' }}
            color="$Slate"
            fontWeight="bold"
            fontSize={{ base: 'mp2bodyMedium', md: 'p2bodyMedium' }}
            lineHeight={{ base: 'mp2bodyMedium', md: 'p2bodyMedium' }}
            borderTop={props.index !== 0 ? '1px' : '0'}
            borderTopColor="$Cloud"
            flexWrap="wrap"
            rowGap={{ base: '5', md: '0' }}
        >
            <Flex flexDirection="column" gap={1} order={1} w={{ base: '50%', md: '150px' }}>
                <Box textTransform="uppercase" display={{ base: 'block', md: 'none' }}>
                    Inventory Item
                </Box>
                { tablet? 
                    <Link href={`/inventories/${props.info.id}`} onMouseEnter={handleMouseOver} onMouseLeave={ handleMouseExit}>
                    <Button
                        justifyContent="start"
                        color={'$InstockIndigo'}
                        rightIcon={<ChevronRight color="$InstockIndigo" style={{ transform: isHovering? 'translate(4px)': ''}}/>}
                        bg={''}
                        h={''}
                        p={0}
                        _hover={{ bg: '', textDecoration: 'underline' }}
                        _active={{ bg: '' }}
                    >
                        {props.info.item_name}
                    </Button>
                    </Link>:
                    <Link href={`/inventories/${props.info.id}`} >
                        <Button
                            justifyContent="start"
                            color={'$InstockIndigo'}
                            rightIcon={<ChevronRight color="$InstockIndigo" style={{ transform: isHovering? 'translate(4px)': ''}}/>}
                            bg={''}
                            h={''}
                            p={0}
                            _hover={{ bg: '', textDecoration: 'underline' }}
                            _active={{ bg: '' }}
                        >
                            {props.info.item_name}
                        </Button>
                    </Link>
                }
            </Flex>

            <Flex flexDirection="column" gap={1} order={{ base: '3', md: '2' }} w={{ base: '90px', md: '90px' }}>
                <Box textTransform="uppercase" display={{ base: 'block', md: 'none' }}>
                    Category
                </Box>
                <Box>{props.info.category}</Box>
            </Flex>

            <Box w="50%" order={5} display={{ base: 'block', md: 'none' }}></Box>

            <Flex flexDirection="column" gap={1} order={{ base: '2', md: '3' }} w={{ base: '50%', md: '95px' }}>
                <Box textTransform="uppercase" display={{ base: 'block', md: 'none' }}>
                    Status
                </Box>
                <Box>
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
            </Flex>

            <Flex flexDirection="column" gap={1} order={4} w={{ base: '50%', md: '40px' }}>
                <Box textTransform="uppercase" display={{ base: 'block', md: 'none' }}>
                    QTY
                </Box>
                <Box>{props.info.quantity}</Box>
            </Flex>

            {props.warehouseId === undefined ? (
                <Flex flexDirection="column" gap={1} order={6} w={{ base: '50%', md: '85px' }}>
                    <Box textTransform="uppercase" display={{ base: 'block', md: 'none' }}>
                        Warehouse
                    </Box>
                    <Box>{props.info.warehouse_name}</Box>
                </Flex>
            ) : (
                <></>
            )}

            <Flex
                w={{ base: '100%', md: '75px' }}
                gap={6}
                justifyContent={{ base: 'space-between', md: 'end' }}
                order={7}
            >
                <Delete cursor="pointer" boxSize={6} color="$Red" onClick={onOpen} />
                <Link href={`/inventories/edit/${props.info.id}`}>
                    <Edit cursor="pointer" boxSize={6} color="$InstockIndigo" />
                </Link>
            </Flex>

            <Modal onClose={onClose} size={{ base: 'full', md: 'xl' }} isOpen={isOpen}>
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
