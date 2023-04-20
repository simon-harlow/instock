import React from 'react'
import { NavLink } from "react-router-dom";

import { Table, Thead, Tbody, Tr, Th, Td, Button, Flex } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, } from "@chakra-ui/react";
import { ChevronRight, Edit, Delete, Sort } from '../../assets/modifiedIcons'

function WarehouseTabDesk({ warehouseData, deleteWarehouse }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Table variant="simple">
            <Thead>
                <Tr bg="$LightGrey">
                    <Th color="$Slate" px="1rem">WAREHOUSE <Sort color="$Cloud"/></Th>
                    <Th color="$Slate" px="1rem">ADDRESS <Sort color="$Cloud"/></Th>
                    <Th color="$Slate" px="1rem">CONTACT NAME <Sort color="$Cloud"/></Th>
                    <Th color="$Slate" px="1rem">CONTACT INFORMATION <Sort color="$Cloud"/></Th>
                    <Th color="$Slate" px="1rem" >ACTIONS <Sort color="$Cloud"/></Th>
                </Tr>
            </Thead>
            <Tbody>
                {warehouseData.map((warehouse) => (
                    <Tr key={warehouse.id} bg="$White" _hover={{ bg: "$LightGrey"}}>
                        <Td px="1rem">
                        <NavLink to={`/warehouses/${warehouse.id}`}>
                            <Button color={"$InstockIndigo"} bg={""} h={""} rightIcon={<ChevronRight color="$InstockIndigo" />} p={0} _hover={{ bg: "", textDecoration: "underline" }} _active={{ bg: "" }} fontSize={{ base: "mp2bodyMedium", sm: "mp2bodyMedium", md: "p2bodyMedium"}} lineHeight={{ base: "mp2bodyMedium", sm: "mp2bodyMedium", md: "p2bodyMedium"}}>
                                {warehouse.warehouse_name}
                            </Button>
                        </NavLink>    
                        </Td>
                        <Td px="1rem">
                            {warehouse.address}, {warehouse.city}, {warehouse.country}
                        </Td>
                        <Td px="1rem">{warehouse.contact_name}</Td>
                        <Td px="1rem">
                            {warehouse.contact_phone}
                            <br />
                            {warehouse.contact_email}
                        </Td>
                        <Td px="1rem">
                            <Flex gap={2}>
                                <Delete cursor="pointer" boxSize={6} color="$Red" onClick={onOpen}/>
                                <Modal onClose={onClose} isOpen={isOpen}>
                                    <ModalOverlay backdropBlur='2px' bg='none' />
                                    <ModalContent>
                                        <ModalHeader>Delete {warehouse.warehouse_name} inventory item?</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            Please confirm that you'd like to delete {warehouse.warehouse_name} from the list of warehouses. You
                                            won't be able to undo this action.
                                        </ModalBody>
                                        <ModalFooter>
                                            <Flex gap={4}>
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
                                <NavLink to={`/warehouses/edit/${warehouse.id}`}>
                                    <Edit cursor="pointer" boxSize={6} color="$InstockIndigo" />
                                </NavLink>
                            </Flex>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}

export default WarehouseTabDesk;