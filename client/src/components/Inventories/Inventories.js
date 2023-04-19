import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Heading, Input, Button, Link, Box, InputGroup, InputRightElement } from '@chakra-ui/react';
import { getInventories, deleteInventory, getWarehouseInventories } from '../axios';
import Inventory from './Inventory';
import { Sort, Search } from '../../assets/modifiedIcons';

function Inventories() {
    const { warehouseId } = useParams();
    const [inventories, setInventories] = useState([]);

    useEffect(() => {
        if (warehouseId === undefined) {
            getInventories().then(response => {
                setInventories(response.data);
            });
        } else {
            getWarehouseInventories(warehouseId)
                .then(response => {
                    setInventories(response.data);
                })
                .catch(_err => {});
        }
    }, []);

    const deleteListItem = id => {
        deleteInventory(id).then(response => {
            if (response.status === 200) {
                const newInventories = inventories.filter(item => item.id !== id);
                setInventories(newInventories);
            }
        });
    };

    return (
        <Box pos="relative">
            <Flex pos="absolute" w="100%" zIndex={1} top={{ base: '-64px', md: '-92px' }}>
                <Box bg="rgba(255,255,255,0)" w={{ base: '16px', md: '32px', xl: 'auto' }} flex={{ xl: 1 }}></Box>
                <Flex
                    w={{ base: '100%', xl: '1020px' }}
                    borderRadius={'3px'}
                    boxShadow="md"
                    rounded="md"
                    bg="white"
                    flexDirection={'column'}
                >
                    <Flex
                        w="100%"
                        px={{ base: '6', md: '8' }}
                        py={8}
                        flexDirection={{ base: 'column', md: 'row' }}
                        gap={3}
                    >
                        <Heading
                            flex={1}
                            fontSize={{ base: 'mh1PageHeader', md: 'h1PageHeader' }}
                            lineHeight={{ base: 'mh1PageHeader', md: 'h1PageHeader' }}
                        >
                            Inventory
                        </Heading>

                        <InputGroup w={{ base: '100%', md: '185px', xl: '274px' }}>
                            <Input placeholder="Search..." borderRadius={20} h={10} />
                            <InputRightElement children={<Search />} />
                        </InputGroup>

                        <Link href={'/inventories/new'}>
                            <Button
                                bg={'$InstockIndigo'}
                                color={'white'}
                                borderRadius={20}
                                h={10}
                                w={{ base: '100%', md: '128px' }}
                                _hover={{ bg: '$Graphite' }}
                            >
                                + Add New Item
                            </Button>
                        </Link>
                    </Flex>
                    <Flex
                        justifyContent="space-between"
                        px={{ base: '6', md: '8', xl: '10' }}
                        py={{ base: '4', md: '18px' }}
                        bg="$LightGrey"
                        display={{ base: 'none', md: 'flex' }}
                    >
                        <Button w="150px" rightIcon={<Sort />} variant="tab">
                            Inventory Item
                        </Button>
                        <Button w="90px" rightIcon={<Sort />} variant="tab">
                            Category
                        </Button>
                        <Button w="95px" rightIcon={<Sort />} variant="tab">
                            Status
                        </Button>
                        <Button w="40px" rightIcon={<Sort />} variant="tab">
                            QTY
                        </Button>
                        <Button w="85px" rightIcon={<Sort />} variant="tab">
                            Warehouse
                        </Button>
                        <Button w="75px" justifyContent="end" variant="tab">
                            Actions
                        </Button>
                    </Flex>
                    <Flex
                        flexDirection="column"
                        borderTop="1px"
                        borderTopColor={{ base: '$Cloud', sm: '$Cloud', md: '$White' }}
                    >
                        {inventories.map((item, index) => {
                            return <Inventory key={item.id} index={index} info={item} delete={deleteListItem} />;
                        })}
                    </Flex>
                </Flex>
                <Box bg="rgba(255,255,255,0)" w={{ base: '16px', md: '32px', xl: 'auto' }} flex={{ xl: 1 }}></Box>
            </Flex>
        </Box>
    );
}

export default Inventories;
