import React from 'react';
import { Flex, Spacer, Heading, Input, Button } from '@chakra-ui/react';

function Inventories() {
    return (
        <Flex
            ml={4}
            mr={4}
            borderRadius={'3px'}
            boxShadow="md"
            rounded="md"
            bg="white"
            className="inventory-list"
        >
            <Flex w="100%" p={[8, 6, 8, 6]} flexDirection={'column'} gap={2} className="inventory-list__header">
                <Heading
                    fontSize={{ base: 'mh1PageHeader', sm: 'mh1PageHeader', md: 'h1PageHeader' }}
                    lineHeight={{ base: 'mh1PageHeader', sm: 'mh1PageHeader', md: 'h1PageHeader' }}
                >
                    Inventory
                </Heading>
                <Spacer />
                <Input placeholder="Search..." borderRadius={20} h={10} />
                <Spacer />
                <Button bg={'$InstockIndigo'} color={'white'} borderRadius={20} h={10} _hover={{ bg: '$Graphite' }}>
                    + Add New Item
                </Button>
            </Flex>
        </Flex>
    );
}

export default Inventories;
