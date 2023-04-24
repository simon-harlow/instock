import React from 'react'
import { useNavigate } from "react-router-dom";

import { Box, Flex, Text, Heading, Button } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, } from "@chakra-ui/react";
import { ChevronRight, Edit, Delete } from '../../assets/modifiedIcons'

function WarehouseMobile({ id, warehouseData, deleteWarehouse }) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate();
    const warehouse = warehouseData

    const handleDelete = (warehouseId) => {
            deleteWarehouse(warehouseId);
        }

    const handleClickWarehouseName = () => navigate(`/warehouses/${warehouse.id}/inventories`);
    const handleClickEditWarehouse = () => navigate(`/warehouses/edit/${warehouse.id}`)

    return (
        <Flex key={id} direction="column" alignItems="flex-start" borderTop="1px solid" pt="1rem" borderTopColor="$Cloud">
            <Flex justifyContent="space-between" w="100%" direction="row" px="2rem">
                <Flex direction="column" w="50%" mr="1rem">
                    <Box mb={4}>
                        <Heading color="$Slate" fontSize="mh4TableHeader" lineHeight="mh4TableHeader" as="h4" size="sm" mb={2} >
                            WAREHOUSE
                        </Heading>
                        <Button onClick={handleClickWarehouseName} color={'$InstockIndigo'} bg={''} h={''} rightIcon={<ChevronRight color="$InstockIndigo" />} p={0} _hover={{ bg: '', textDecoration: 'underline' }} _active={{ bg: '' }} fontSize="mp2bodyMedium" lineHeight="mp2bodyMedium">
                            {warehouse.warehouse_name}
                        </Button>
                    </Box>
                    <Box mb={4}>
                        <Heading color="$Slate" fontSize="mh4TableHeader" lineHeight="mh4TableHeader" as="h4" size="sm" mb={2}>
                            ADDRESS
                        </Heading>
                        <Text color="$InstockBlack" fontSize="mp2bodyMedium" lineHeight="mp2bodyMedium">
                            {warehouse.address}, {warehouse.city}, {warehouse.country}
                        </Text>
                    </Box>
                </Flex>
                <Flex direction="column" w="50%">
                    <Box mb={4}>
                        <Heading color="$Slate" fontSize="mh4TableHeader" lineHeight="mh4TableHeader" as="h4" size="sm" mb={2}>
                            CONTACT NAME
                        </Heading>
                        <Text color="$InstockBlack" fontSize="mp2bodyMedium" lineHeight="mp2bodyMedium">
                            {warehouse.contact_name}
                        </Text>
                    </Box>
                    <Box mb={4}>
                        <Heading color="$Slate" fontSize="mh4TableHeader" lineHeight="mh4TableHeader" as="h4" size="sm" mb={2}>
                            CONTACT INFORMATION
                        </Heading>
                        <Text color="$InstockBlack" fontSize="mp2bodyMedium" lineHeight="mp2bodyMedium">
                            {warehouse.contact_phone}
                        </Text>
                        <Text color="$InstockBlack" fontSize="mp2bodyMedium" lineHeight="mp2bodyMedium">
                            {warehouse.contact_email}
                        </Text>
                    </Box>
                </Flex>
            </Flex>
            <Flex alignItems="center" justifyContent="space-between" px="2rem" pb="1rem" w="100%">
                <Delete cursor="pointer" boxSize={6} color="$Red" onClick={() => {onOpen()}}/>
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
                        <Button flex="1" h="36px" borderRadius="20px" onClick={onClose} variant="outline" _hover={{ color: '$InstockIndigo', borderColor: '$InstockIndigo' }}>
                            Close
                        </Button>
                        <Button flex="1" h="36px" borderRadius="20px" color="White" bg="$Red" _hover={{ bg: '$InstockBlack' }} _active={{ bg: '' }} onClick={() => {
                            handleDelete(warehouse.id);
                            onClose();
                        }}>
                            Delete
                        </Button>
                        </Flex>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
                <Edit onClick={handleClickEditWarehouse} cursor="pointer" boxSize={6} color="$InstockIndigo" />
            </Flex>
        </Flex> 
    )
}

export default WarehouseMobile