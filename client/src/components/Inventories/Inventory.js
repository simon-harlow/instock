import React from 'react';
import { Flex, Box, Button, Icon, Spacer } from '@chakra-ui/react';
import { Delete, Edit, ChevronRight } from '../../assets/modifiedLogos';

function Inventory(props) {
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
            <Button
                w="150px"
                justifyContent="start"
                color={'$InstockIndigo'}
                rightIcon={<ChevronRight color="$InstockIndigo" />}
                bg={''}
                h={''}
                p={0}
                _hover={{ bg: '' }}
                _active={{ bg: '' }}
            >
                {props.info.item_name}
            </Button>
            <Box w="90px">{props.info.category}</Box>
            <Box w="75px">{props.info.status}</Box>
            <Box w="40px">{props.info.quantity}</Box>
            <Box w="85px">{props.info.warehouse_name}</Box>
            <Flex w="75px" gap={6}>
                <Delete boxSize={6} color="$Red" />
                <Edit boxSize={6} color="$InstockIndigo" />
            </Flex>
        </Flex>
    );
}

export default Inventory;
