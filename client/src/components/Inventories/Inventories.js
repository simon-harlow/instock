import React, { useState, useEffect } from 'react';
import { Flex, Heading, Input, Button, Link } from '@chakra-ui/react';
import { getInventories, deleteInventory } from '../axios';
import Inventory from './Inventory';
import { Sort } from '../../assets/modifiedIcons';

function Inventories() {
    const [inventories, setInventories] = useState([]);

    useEffect(() => {
        getInventories().then(response => {
            setInventories(response.data);
        });
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
        <Flex
            mx={{ base: '4', sm: '4', md: '8', xl: 'auto' }}
            w={{ xl: '1020px' }}
            borderRadius={'3px'}
            boxShadow="md"
            rounded="md"
            bg="white"
            flexDirection={'column'}
            // pos='absolute'
            top={{base: '64px', md: '94px'}}
        >
            <Flex
                w="100%"
                px={{ base: '6', sm: '6', md: '8' }}
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
                <Input
                    placeholder="Search..."
                    borderRadius={20}
                    h={10}
                    w={{ base: '100%', md: '185px', xl: '274px' }}
                />
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
                {inventories.map(item => {
                    return <Inventory key={item.id} info={item} delete={deleteListItem} />;
                })}
            </Flex>
        </Flex>
    );
}

export default Inventories;
