import React, { useState, useEffect } from 'react';
import { Flex, Heading, Input, Button, Link } from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/media-query';
import { getInventories } from '../axios';
import Inventory from './Inventory';
import InventoryMobile from './InventoryMobile';
import { Sort } from '../../assets/modifiedLogos';

function Inventories() {
    const [inventories, setInventories] = useState([]);
    const [isTablet] = useMediaQuery('(min-width: 768px)');

    useEffect(() => {
        getInventories().then(response => {
            setInventories(response.data);
        });
    }, []);

    return (
        <Flex
            mx={{ base: '4', sm: '4', md: '8', xl: 'auto' }}
            w={{ xl: '1020px' }}
            borderRadius={'3px'}
            boxShadow="md"
            rounded="md"
            bg="white"
            flexDirection={'column'}
        >
            <Flex
                w="100%"
                px={{ base: '6', sm: '6', md: '8' }}
                py={8}
                flexDirection={{ base: 'column', sm: 'column', md: 'row' }}
                gap={3}
            >
                <Heading
                    flex={1}
                    fontSize={{ base: 'mh1PageHeader', sm: 'mh1PageHeader', md: 'h1PageHeader' }}
                    lineHeight={{ base: 'mh1PageHeader', sm: 'mh1PageHeader', md: 'h1PageHeader' }}
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
                px={{ base: '6', sm: '6', md: '8', xl: '10' }}
                py={{ base: '4', sm: '4', md: '18px' }}
                fontSize={'h4TableHeader'}
                lineHeight={'h4TableHeader'}
                bg="$LightGrey"
                color="$Slate"
                fontWeight="bold"
                textTransform="uppercase"
                display={{ base: 'none', sm: 'none', md: 'flex' }}
            >
                <Button
                    w="150px"
                    justifyContent="start"
                    rightIcon={<Sort />}
                    bg={''}
                    h={''}
                    p={0}
                    _hover={{ bg: '' }}
                    _active={{ bg: '' }}
                >
                    Inventory Item
                </Button>
                <Button
                    w="90px"
                    justifyContent="start"
                    rightIcon={<Sort />}
                    bg={''}
                    h={''}
                    p={0}
                    _hover={{ bg: '' }}
                    _active={{ bg: '' }}
                >
                    Category
                </Button>
                <Button
                    w="95px"
                    justifyContent="start"
                    rightIcon={<Sort />}
                    bg={''}
                    h={''}
                    p={0}
                    _hover={{ bg: '' }}
                    _active={{ bg: '' }}
                >
                    Status
                </Button>
                <Button
                    w="40px"
                    justifyContent="start"
                    rightIcon={<Sort />}
                    bg={''}
                    h={''}
                    p={0}
                    _hover={{ bg: '' }}
                    _active={{ bg: '' }}
                >
                    QTY
                </Button>
                <Button
                    w="85px"
                    justifyContent="start"
                    rightIcon={<Sort />}
                    bg={''}
                    h={''}
                    p={0}
                    _hover={{ bg: '' }}
                    _active={{ bg: '' }}
                >
                    Warehouse
                </Button>
                <Button
                    w="75px"
                    justifyContent="start"
                    rightIcon={<Sort />}
                    bg={''}
                    h={''}
                    p={0}
                    _hover={{ bg: '' }}
                    _active={{ bg: '' }}
                >
                    Actions
                </Button>
            </Flex>
            <Flex
                flexDirection="column"
                borderTop="1px"
                borderTopColor={{ base: '$Cloud', sm: '$Cloud', md: '$White' }}
            >
                {inventories.map(item => {
                    return isTablet ? (
                        <Inventory key={item.id} info={item} />
                    ) : (
                        <InventoryMobile key={item.id} info={item} />
                    );
                })}
            </Flex>
        </Flex>
    );
}

export default Inventories;
