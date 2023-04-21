import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

import { API_URL, deleteWarehouseData } from "../Utils/const";
import WarehouseMobile from './WarehouseMobile';
import WarehouseTabDesk from './WarehouseTabDesk';
import { Search, AddWhite, Sort } from '../../assets/modifiedIcons'

import { useMediaQuery } from '@chakra-ui/media-query';
import { Box, Flex, Heading, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";

function Warehouses() {

    const [isTablet] = useMediaQuery('(min-width: 768px)');
    const [warehouseData, setWarehouseData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${API_URL}/warehouses`)
            .then((response) => {
                setWarehouseData(response.data)
            })
            .catch((error) => console.log(error));
    }, [])

    const deleteWarehouse = (warehouseId) => {
        deleteWarehouseData(warehouseId)
            .then(() => {
                setWarehouseData((prev) => {
                    const filteredWarehouses = prev.filter((warehouse) => {
                        return warehouse.id !== warehouseId
                    })
                    return filteredWarehouses
                });
            })
            .catch((error) => console.log(error));
        };

    const handleClickNewWarehouse = () => navigate(`/warehouses/new`)

    return (
        <Box maxW="1020px" mx={{ base: '0', xl: 'auto' }} boxShadow='base' bg="$White" position="absolute" top="7rem" left={{ base: '4', sm: '4', md: '8', xl: '0' }} right={{ base: '4', sm: '4', md: '8', xl: '0' }} zIndex="2" borderRadius="5px">
            <Flex direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'flex-start' }} justify={{ base: 'flex-start', md: 'space-between' }} px={{ base: '2rem', md: '1rem' }} pt="2rem" pb="1rem">
                <Heading as="h1" size="lg" pb="1rem" fontSize={{ base: 'mh1PageHeader', sm: 'mh1PageHeader', md: 'h1PageHeader' }} lineHeight={{ base: 'mh1PageHeader', sm: 'mh1PageHeader', md: 'h1PageHeader' }}>
                    Warehouses
                </Heading>
                <InputGroup pb="1rem" w={{ base: '100%', md: '200px', xl: '274px' }} ml={{ base: '0', md: 'auto' }} mr={{ base: '0', md: '1rem' }}>
                    <InputRightElement children={<Search />} />
                    <Input placeholder="Search..." borderRadius="20px" />
                </InputGroup>
                <Button onClick={handleClickNewWarehouse} leftIcon={<AddWhite />} bg="$InstockIndigo" color="$White" variant='solid' borderRadius="20px" _hover={{ bg: '$Graphite' }} w={{ base: '100%', md: '200px' }}>
                Add New Warehouse
                </Button>
            </Flex>
            {isTablet ? (
            <Table variant="simple">
                <Thead>
                <Tr bg="$LightGrey">
                    <Th color="$Slate" px="1rem">WAREHOUSE <Sort color="$Cloud"/></Th>
                    <Th color="$Slate" px="1rem">ADDRESS <Sort color="$Cloud"/></Th>
                    <Th color="$Slate" px="1rem">CONTACT NAME <Sort color="$Cloud"/></Th>
                    <Th color="$Slate" px="1rem">CONTACT INFORMATION <Sort color="$Cloud"/></Th>
                    <Th color="$Slate" px="1rem">ACTIONS <Sort color="$Cloud"/></Th>
                </Tr>
                </Thead>
                <Tbody>
                {warehouseData.map(warehouse => (
                    <WarehouseTabDesk
                    key={warehouse.id}
                    warehouseData={warehouse}
                    deleteWarehouse={deleteWarehouse} />
                ))}
                </Tbody>
            </Table>
            ) : (
            <>
                {warehouseData.map(warehouse => (
                <WarehouseMobile
                    key={warehouse.id}
                    warehouseData={warehouse}
                    deleteWarehouse={deleteWarehouse} />
                ))}
            </>
            )}
        </Box>
    );
}

export default Warehouses;