import React from 'react';
import { Flex, Box, Button, Center, Link } from '@chakra-ui/react';
import { Delete, Edit, ChevronRight } from '../../assets/modifiedLogos';

function Inventory(props) {
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
                                    alignItems="center"
                                    w="fit-content"
                                    h="24px"
                                    px={2}
                                    color="$Red"
                                    bg="rgba(201, 69, 21, 0.07)"
                                    borderRadius="20px"
                                >
                                    {props.info.status}
                                </Center>
                            ) : (
                                <Center
                                    alignItems="center"
                                    w="fit-content"
                                    h="24px"
                                    px={2}
                                    color="$Green"
                                    bg="rgba(21, 132, 99, 0.07)"
                                    borderRadius="20px"
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
                <Delete cursor="pointer" boxSize={6} color="$Red" />
                <Link href={`/inventories/edit/${props.info.id}`}>
                    <Edit cursor="pointer" boxSize={6} color="$InstockIndigo" />
                </Link>
            </Flex>
        </Flex>
    );
}

export default Inventory;
