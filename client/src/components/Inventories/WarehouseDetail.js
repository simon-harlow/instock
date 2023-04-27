import React from 'react';
import { Flex, Button, Link, Circle, Box, useMediaQuery } from '@chakra-ui/react';
import { ArrowBack, Edit } from '../../assets/modifiedIcons';

function WarehouseDetail(props) {
    const [tablet] = useMediaQuery('(min-width: 768px)');

    return (
        <Flex w="100%" flexDirection="column" gap={4}>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                w="100%"
                h="93px"
                px={{ base: '6', md: '8' }}
                borderBottom="1px"
                borderBottomColor="$Cloud"
            >
                <Link href="/warehouses" _hover={{}}>
                    <Flex
                        alignItems="center"
                        fontSize={{ base: 'mh1PageHeader', md: 'h1PageHeader' }}
                        lineHeight={{ base: 'mh1PageHeader', md: 'h1PageHeader' }}
                        fontWeight="bold"
                        gap={2}
                    >
                        <ArrowBack color="$InstockIndigo" />
                        {props.warehouse.warehouse_name}
                    </Flex>
                </Link>

                <Link href={`/warehouses/edit/${props.warehouse.id}`}>
                    {tablet ? (
                        <Button
                            bg={'$InstockIndigo'}
                            color={'white'}
                            leftIcon={<Edit />}
                            borderRadius={20}
                            w="81px"
                            h="38px"
                            p={0}
                            _hover={{ bg: '$Graphite' }}
                        >
                            Edit
                        </Button>
                    ) : (
                        <Circle bg={'$InstockIndigo'} color={'white'} size="36px">
                            <Edit />
                        </Circle>
                    )}
                </Link>
            </Flex>
            <Flex
                flexDirection={{ base: 'column', md: 'row' }}
                fontSize={{ base: 'mp2bodyMedium', md: 'p2bodyMedium' }}
                lineHeight={{ base: 'mp2bodyMedium', md: 'p2bodyMedium' }}
                px={{ base: '6', md: '8', xl: '10' }}
                py={{ base: '4', md: '6' }}
                gap={8}
            >
                <Flex flexDirection="column" flex={{ md: '45%' }}>
                    <Box textTransform="uppercase">Warehouse Address:</Box>
                    <Box color="$InstockBlack">
                        {props.warehouse.address + ', '}
                        {props.warehouse.city + ', '}
                        {props.warehouse.country}
                    </Box>
                </Flex>
                <Flex
                    flex={{ md: '55%' }}
                    pl={{ md: '10' }}
                    borderLeft={{ md: '1px' }}
                    borderLeftColor={{ md: '$Cloud' }}
                >
                    <Flex flexDirection="column" flex={1}>
                        <Box textTransform="uppercase">Contact Name:</Box>
                        <Box color="$InstockBlack">{props.warehouse.contact_name}</Box>
                        <Box color="$InstockBlack">{props.warehouse.contact_position}</Box>
                    </Flex>
                    <Flex flexDirection="column" flex={1}>
                        <Box textTransform="uppercase" whiteSpace="nowrap">
                            Contact Information:
                        </Box>
                        <Box color="$InstockBlack">{props.warehouse.contact_phone}</Box>
                        <Box color="$InstockBlack">{props.warehouse.contact_email}</Box>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default WarehouseDetail;
