import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { API_ADDRESS, deleteWarehouseData } from '../axios';
import WarehouseMobile from './WarehouseMobile';
import WarehouseTabDesk from './WarehouseTabDesk';
import { Search, AddWhite, Sort } from '../../assets/modifiedIcons';

import { useMediaQuery } from '@chakra-ui/media-query';
import { Box, Flex, Heading, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

import { searchWarehouse } from '../axios';

function Warehouses() {
    const [isTablet] = useMediaQuery('(min-width: 768px)');
    const [warehouseData, setWarehouseData] = useState([]);
    const [sortOrder, setSortOrder] = useState({});
    const navigate = useNavigate();
    const searchKeyWord = useRef('');
    const handleEnter = event => {
        if (event.key === 'Enter') {
            searchAction(searchKeyWord.current.value);
        }
    };

    useEffect(() => {
        axios
            .get(`${API_ADDRESS}/api/warehouses`)
            .then(response => {
                setWarehouseData(response.data);
            })
            .catch((error) => {
                console.log(error)
            });
    }, [])

    const deleteWarehouse = warehouseId => {
        deleteWarehouseData(warehouseId)
            .then(() => {
                setWarehouseData(prev => {
                    const filteredWarehouses = prev.filter(warehouse => {
                        return warehouse.id !== warehouseId;
                    });
                    return filteredWarehouses;
                });
            })
            .catch(error => console.log(error));
    };

    const searchAction = keyWord => {
        searchWarehouse(keyWord).then(response => {
            if (response !== undefined) {
                setWarehouseData(response.data);
            }
        });
    };

    const handleClickNewWarehouse = () => navigate(`/warehouses/new`)

    const getSortedData = (sortBy, orderBy) => {
        axios
            .get(`${API_ADDRESS}/api/warehouses?sort_by=${sortBy}&order_by=${orderBy}`)
            .then((response) => {
                setWarehouseData(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleSortClick = (column) => {
        let newSortOrder = { ...sortOrder };
        let newOrderBy;
    
        if (sortOrder[column] === "asc") {
            newOrderBy = "desc";
            newSortOrder[column] = "desc";
        } else {
            newOrderBy = "asc";
            newSortOrder[column] = "asc";
        }
        // Call the API with new sorting order
        getSortedData(column, newOrderBy);
    
        setSortOrder(newSortOrder);
    }

    return (
        <Box
            w={{ xl: '1020px' }}
            mx={{ xl: 'auto' }}
            boxShadow="base"
            bg="$White"
            position="absolute"
            top={{ base: '136px', md: '80px' }}
            left={{ base: '4', md: '8' }}
            right={{ base: '4', md: '8' }}
            zIndex="1"
            borderRadius="5px"
        >
            <Flex
                direction={{ base: 'column', md: 'row' }}
                alignItems={{ base: 'flex-start' }}
                justify={{ base: 'flex-start', md: 'space-between' }}
                px="2rem"
                pt="2rem"
                pb="1rem"
            >
                <Heading
                    as="h1"
                    size="lg"
                    pb="1rem"
                    fontSize={{ base: 'mh1PageHeader', sm: 'mh1PageHeader', md: 'h1PageHeader' }}
                    lineHeight={{ base: 'mh1PageHeader', sm: 'mh1PageHeader', md: 'h1PageHeader' }}
                >
                    Warehouses
                </Heading>
                <InputGroup
                    pb="1rem"
                    w={{ base: '100%', md: '200px', xl: '274px' }}
                    ml={{ base: '0', md: 'auto' }}
                    mr={{ base: '0', md: '1rem' }}
                >
                    <InputRightElement
                        onClick={() => searchAction(searchKeyWord.current.value)}
                        children={<Search cursor="pointer" />}
                    />
                    <Input
                        placeholder="Search..."
                        ref={searchKeyWord}
                        onKeyDown={handleEnter}
                        borderRadius="20px"
                        focusBorderColor="$InstockIndigo"
                    />
                </InputGroup>
                <Button
                    onClick={handleClickNewWarehouse}
                    leftIcon={<AddWhite />}
                    bg="$InstockIndigo"
                    color="$White"
                    variant="solid"
                    borderRadius="20px"
                    _hover={{ bg: '$Graphite' }}
                    w={{ base: '100%', md: '200px' }}
                >
                    Add New Warehouse
                </Button>
            </Flex>
            {isTablet ? (
            <Box maxH={{ base: 'auto', md: '650px' }} overflowY="scroll" sx={{'::-webkit-scrollbar': {display: 'none'}}}>
                <Table variant="simple">
                    <Thead position="sticky" top="0" bg="$LightGrey" zIndex="1">
                    <Tr>
                        <Th color="$Slate" px="1rem">
                        <Button onClick={() => handleSortClick("warehouse_name")} rightIcon={<Sort />} variant="tab">WAREHOUSE</Button>
                        </Th>
                        <Th color="$Slate" px="1rem">
                        <Button onClick={() => handleSortClick("address,city,country")}rightIcon={<Sort />} variant="tab">ADDRESS</Button>
                        </Th>
                        <Th color="$Slate" px="1rem">
                        <Button onClick={() => handleSortClick("contact_name")} rightIcon={<Sort />} variant="tab">CONTACT NAME</Button>
                        </Th>
                        <Th color="$Slate" px="1rem">
                        <Button onClick={() => handleSortClick("contact_phone,contact_email")} rightIcon={<Sort />} variant="tab">CONTACT INFORMATION</Button>
                        </Th>
                        <Th color="$Slate" px="1rem">ACTIONS</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {warehouseData.length > 0 ? (
                        warehouseData.map(warehouse => (
                        <WarehouseTabDesk
                            key={warehouse.id}
                            warehouseData={warehouse}
                            deleteWarehouse={deleteWarehouse} />
                        ))
                    ) : (
                        <Tr>
                        <Td colSpan={5}>No data available</Td>
                        </Tr>
                    )}
                    </Tbody>
                </Table>
            </Box>
            ) : (
                <>
                    {warehouseData.map(warehouse => (
                        <WarehouseMobile
                            key={warehouse.id}
                            warehouseData={warehouse}
                            deleteWarehouse={deleteWarehouse}
                        />
                    ))}
                </>
            )}
        </Box>
    );
}

export default Warehouses;
