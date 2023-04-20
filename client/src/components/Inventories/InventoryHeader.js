import React from 'react';
import { Flex, Heading, Input, Button, Link, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Search } from '../../assets/modifiedIcons';

function InventoryHeader() {
    return (
        <Flex w="100%" px={{ base: '6', md: '8' }} py={8} flexDirection={{ base: 'column', md: 'row' }} gap={3}>
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
    );
}

export default InventoryHeader;
