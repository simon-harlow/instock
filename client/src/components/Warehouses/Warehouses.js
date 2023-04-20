import React from 'react';
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios"

import { API_URL, deleteWarehouseData } from "../Utils/const";
import WarehouseMobile from './WarehouseMobile';
import WarehouseTabDesk from './WarehouseTabDesk';
import { Search, AddWhite } from '../../assets/modifiedIcons'

import { useMediaQuery } from '@chakra-ui/media-query';
import { Box, Flex, Heading, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";


function Warehouses() {

    const [isTablet] = useMediaQuery('(min-width: 768px)');

    const [warehouseData, setWarehouseData] = useState([]);

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
            .then(result => {
                const filteredWarehouses = warehouseData.filter((warehouse) => {
					return warehouse.id !== result.id
				})
                setWarehouseData([...filteredWarehouses]);
            })
            .catch((error) => console.log(error));
        };

    return (
        <Box  w={{ xl: '1280px' }} mx={{ base: '4', sm: '4', md: '8', xl: 'auto' }} boxShadow='base' bg="$White" position="absolute" top="7rem" left="1rem" right="1rem" zIndex="2" borderRadius="5px">
            <Flex direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'flex-start' }} justify={{ base: 'flex-start', md: 'space-between' }} px={{ base: '2rem', md: '1rem' }} pt="2rem" pb="1rem">
                <Heading as="h1" size="lg" pb="1rem" fontSize={{ base: 'mh1PageHeader', sm: 'mh1PageHeader', md: 'h1PageHeader' }} lineHeight={{ base: 'mh1PageHeader', sm: 'mh1PageHeader', md: 'h1PageHeader' }}>
                    Warehouses
                </Heading>
                    <InputGroup pb="1rem" w={{ base: '100%', md: '200px', xl: '274px' }} ml={{ base: '0', md: 'auto' }} mr={{ base: '0', md: '1rem' }}>
                        <InputRightElement children={<Search />} />
                        <Input placeholder="Search..." borderRadius="20px" />
                    </InputGroup>
                <NavLink to={`/warehouses/new`} >
                    <Button leftIcon={<AddWhite />} bg="$InstockIndigo" color="$White" variant='solid' borderRadius="20px" w={{ base: '100%', md: '200px' }} _hover={{ bg: '$Graphite' }}>
                    Add New Warehouse
                    </Button>
                </NavLink>
            </Flex>
            {isTablet ?
            <WarehouseTabDesk warehouseData={warehouseData} deleteWarehouse={deleteWarehouse}/>
            :
            <WarehouseMobile warehouseData={warehouseData} deleteWarehouse={deleteWarehouse}/>
            }
        </Box>
    );
}

export default Warehouses;