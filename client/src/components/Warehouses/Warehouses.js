import React from 'react';
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios"

import { API_URL } from "../Utils/const";

import { Box, Flex, Spacer, Heading, Input, InputGroup, InputRightElement, Button, IconButton, Icon } from "@chakra-ui/react";
import { Search, Chevron_right, Add_white, Edit, Delete } from '../../assets/modifiedIcons'

function Warehouses() {

    const [warehouseData, setWarehouseData] = useState([]);

    useEffect(() => {
        axios
            .get(`${API_URL}/warehouses`)
            .then((response) => {
                setWarehouseData(response.data)
            })
            .catch((error) => console.log(error));
    }, [])

    const warehouse = warehouseData; 
    console.log(warehouse);

    return (
        <Box maxW="400px" mx="auto" boxShadow='base'>
            <Flex alignItems="flexstart" direction="column" justify="flex-start" p="2rem">
                <Heading as="h1" size="lg" pb="1rem">Warehouses</Heading>
                <InputGroup pb="1rem">
                    <InputRightElement children={<Search />} />
                    <Input placeholder="Search..." borderRadius="50px" />
                </InputGroup>
                <Button leftIcon={<Add_white />} bg="blue" color="white" variant='solid' borderRadius="50px">
                    Add New Warehouse
                </Button>
            </Flex>
            {warehouse.map((warehouse) => (
                <Flex direction="column" alignItems="flex-start" borderTop="1px solid gray" pt="1rem" borderTopColor="black" key={warehouse.id}>
                    <Flex justifyContent="space-between" w="100%" direction="row" px="2rem">
                        <Flex direction="column" w="50%">
                            <Box mb={4}>
                                <Heading as="h4" size="sm" mb={2}>Warehouse</Heading>
                                <NavLink to={`/warehouses/${warehouse.id}`}>
                                    {warehouse.warehouse_name}
                                    <Chevron_right />
                                </NavLink>
                            </Box>
                            <Box mb={4}>
                                <Heading as="h4" size="sm" mb={2}>Address</Heading>
                                <p>{warehouse.address}, {warehouse.city}, {warehouse.country}</p>
                            </Box>
                        </Flex>
                        <Flex direction="column" w="50%">
                            <Box mb={4}>
                                <Heading as="h4" size="sm" mb={2}>Contact Name</Heading>
                                <p>{warehouse.contact_name}</p>
                            </Box>
                            <Box mb={4}>
                                <Heading as="h4" size="sm" mb={2}>Contact Information</Heading>
                                <p>{warehouse.contact_phone}</p>
                                <p>{warehouse.contact_email}</p>
                            </Box>
                        </Flex>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between" px="2rem" w="100%">
                        <IconButton aria-label="Delete" icon={<Delete />} variant="outline" border="none"/>
                        <NavLink to={`/warehouses/${warehouse.id}/edit`}>
                            <IconButton aria-label="Edit" icon={<Edit />} variant="outline" border="none"/>
                        </NavLink>
                    </Flex>
                </Flex>
            ))}
        </Box>
    );
}

export default Warehouses;