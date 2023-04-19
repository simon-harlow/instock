import React from 'react';
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios"

import { API_URL } from "../Utils/const";

import { Box, Flex, Text, Heading, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, } from "@chakra-ui/react";
import { Search, ChevronRight, AddWhite, Edit, Delete } from '../../assets/modifiedIcons'

function Warehouses() {
    const { isOpen, onOpen, onClose } = useDisclosure()
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

    return (
        <Box maxW="769px" mx="auto" boxShadow='base' bg="$White" position="absolute" top="7rem" left="1rem" right="1rem" zIndex="2" borderRadius="5px">
            <Flex alignItems="flexstart" direction="column" justify="flex-start" p="2rem">
                <Heading as="h1" size="lg" pb="1rem" fontSize={{ base: 'mh1PageHeader', sm: 'mh1PageHeader', md: 'h1PageHeader' }} lineHeight={{ base: 'mh1PageHeader', sm: 'mh1PageHeader', md: 'h1PageHeader' }}>
                    Warehouses
                </Heading>
                <InputGroup pb="1rem">
                    <InputRightElement children={<Search />} />
                    <Input placeholder="Search..." borderRadius="50px" />
                </InputGroup>
                <NavLink to={`/warehouses/new`}>
                    <Button leftIcon={<AddWhite />} bg="$InstockIndigo" color="$White" variant='solid' borderRadius="50px" w="100%">
                        Add New Warehouse
                    </Button>
                </NavLink>
            </Flex>
            {warehouse.map((warehouse) => (
                <Flex direction="column" alignItems="flex-start" borderTop="1px solid gray" pt="1rem" borderTopColor="$Cloud" key={warehouse.id}>
                    <Flex justifyContent="space-between" w="100%" direction="row" px="2rem">
                        <Flex direction="column" w="50%" mr="1rem">
                            <Box mb={4}>
                                <Heading color="$Slate" fontSize={{ base: 'mh4TableHeader', sm: 'mh4TableHeader', md: 'h4TableHeader' }} lineHeight={{ base: 'mh4TableHeader', sm: 'mh4TableHeader', md: 'h4TableHeader' }} as="h4" size="sm" mb={2} >
                                    WAREHOUSE
                                </Heading>
                                <NavLink to={`/warehouses/${warehouse.id}`}>
                                    <Button color={'$InstockIndigo'} bg={''} h={''} rightIcon={<ChevronRight color="$InstockIndigo" />} p={0} hover={{ bg: '$InstockBlack', textDecoration: 'underline' }} _active={{ bg: '' }} fontSize={{ base: 'mp2bodyMedium', sm: 'mp2bodyMedium', md: 'p2bodyMedium' }} lineHeight={{ base: 'mp2bodyMedium', sm: 'mp2bodyMedium', md: 'p2bodyMedium' }}>
                                        {warehouse.warehouse_name}
                                    </Button>
                                </NavLink>
                            </Box>
                            <Box mb={4}>
                                <Heading color="$Slate" fontSize={{ base: 'mh4TableHeader', sm: 'mh4TableHeader', md: 'h4TableHeader' }} lineHeight={{ base: 'mh4TableHeader', sm: 'mh4TableHeader', md: 'h4TableHeader' }} as="h4" size="sm" mb={2}>
                                    ADDRESS
                                </Heading>
                                <Text color="$InstockBlack" fontSize={{ base: 'mp2bodyMedium', sm: 'mp2bodyMedium', md: 'p2bodyMedium' }} lineHeight={{ base: 'mp2bodyMedium', sm: 'mp2bodyMedium', md: 'p2bodyMedium' }}>
                                    {warehouse.address}, {warehouse.city}, {warehouse.country}
                                </Text>
                            </Box>
                        </Flex>
                        <Flex direction="column" w="50%">
                            <Box mb={4}>
                                <Heading color="$Slate" fontSize={{ base: 'mh4TableHeader', sm: 'mh4TableHeader', md: 'h4TableHeader' }} lineHeight={{ base: 'mh4TableHeader', sm: 'mh4TableHeader', md: 'h4TableHeader' }} as="h4" size="sm" mb={2}>
                                    CONTACT NAME
                                </Heading>
                                <Text color="$InstockBlack" fontSize={{ base: 'mp2bodyMedium', sm: 'mp2bodyMedium', md: 'p2bodyMedium' }} lineHeight={{ base: 'mp2bodyMedium', sm: 'mp2bodyMedium', md: 'p2bodyMedium' }}>
                                    {warehouse.contact_name}
                                </Text>
                            </Box>
                            <Box mb={4}>
                                <Heading color="$Slate" fontSize={{ base: 'mh4TableHeader', sm: 'mh4TableHeader', md: 'h4TableHeader' }} lineHeight={{ base: 'mh4TableHeader', sm: 'mh4TableHeader', md: 'h4TableHeader' }} as="h4" size="sm" mb={2}>
                                    CONTACT INFORMATION
                                </Heading>
                                <Text color="$InstockBlack" fontSize={{ base: 'mp2bodyMedium', sm: 'mp2bodyMedium', md: 'p2bodyMedium' }} lineHeight={{ base: 'mp2bodyMedium', sm: 'mp2bodyMedium', md: 'p2bodyMedium' }}>
                                    {warehouse.contact_phone}
                                </Text>
                                <Text color="$InstockBlack" fontSize={{ base: 'mp2bodyMedium', sm: 'mp2bodyMedium', md: 'p2bodyMedium' }} lineHeight={{ base: 'mp2bodyMedium', sm: 'mp2bodyMedium', md: 'p2bodyMedium' }}>
                                    {warehouse.contact_email}
                                </Text>
                            </Box>
                        </Flex>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between" px="2rem" pb="1rem" w="100%">
                        <Delete cursor="pointer" boxSize={6} color="$Red" onClick={onOpen}/>
                        <Modal closeOnOverlayClick={false} onClose={onClose} size={'full'} isOpen={isOpen}>
                            <ModalOverlay />
                            <ModalContent>
                            <ModalHeader>Delete {warehouse.warehouse_name} warehouse?</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                Please confirm that you'd like to delete {warehouse.warehouse_name} from the list of warehouses. You
                            won't be able to undo this action.
                            </ModalBody>
                            <ModalFooter>
                                <Flex w="100%" gap={8}>
                                <Button flex="1" h="36px" borderRadius="20px" onClick={onClose} variant="outline" _hover={{ bg: '' }}>
                                    Close
                                </Button>
                                <Button flex="1" h="36px" borderRadius="20px" color="White" bg="$Red" _hover={{ bg: '' }} _active={{ bg: '' }}>
                                    Delete
                                </Button>
                                </Flex>
                            </ModalFooter>
                            </ModalContent>
                        </Modal>
                        <NavLink href={`/warehouses/${warehouse.id}/edit`}>
                            <Edit cursor="pointer" boxSize={6} color="$InstockIndigo" />
                        </NavLink>
                    </Flex>
                </Flex>
            ))}
        </Box>
    );
}

export default Warehouses;