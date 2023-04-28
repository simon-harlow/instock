import React, { useRef } from 'react';
import { Flex, Heading, Input, Button, Link, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Search } from '../../assets/modifiedIcons';

function InventoryHeader(props) {
    const searchKeyWord = useRef('');
    const handleEnter = event => {
        if (event.key === 'Enter') {
            props.search(searchKeyWord.current.value);
        }
    };

    return (
        <Flex
            w="100%"
            px={{ base: '6', md: '8', xl: '10' }}
            py={{ base: '6', md: '8' }}
            flexDirection={{ base: 'column', md: 'row' }}
            gap={4}
            h={{ md: '93px' }}
        >
            <Heading
                flex={1}
                fontSize={{ base: 'mh1PageHeader', md: 'h1PageHeader' }}
                lineHeight={{ base: 'mh1PageHeader', md: 'h1PageHeader' }}
            >
                Inventory
            </Heading>

            <InputGroup w={{ base: '100%', md: '185px', xl: '274px' }}>
                <Input placeholder="Search..." ref={searchKeyWord} onKeyDown={handleEnter} borderRadius={20} h={10} />
                <InputRightElement
                    onClick={() => props.search(searchKeyWord.current.value)}
                    children={<Search cursor="pointer" />}
                />
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
