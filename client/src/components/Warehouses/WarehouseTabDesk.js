import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

import { Tr, Td, Button, Flex } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, } from "@chakra-ui/react";
import { ChevronRight, Edit, Delete } from '../../assets/modifiedIcons'

function WarehouseTabDesk({ id, warehouseData, deleteWarehouse }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const warehouse = warehouseData

    const handleDelete = (warehouseId) => {
        deleteWarehouse(warehouseId);
    }

    const handleClickWarehouseName = () => navigate(`/warehouses/${warehouse.id}/inventories`);
    const handleClickEditWarehouse = () => navigate(`/warehouses/edit/${warehouse.id}`)

    const [isHovering, setHovering] = useState('');
    
    const handleMouseOver = () =>{
        setHovering(true);
    }

    const handleMouseExit = () =>{
        setHovering(false);
    }


    return (
        <Tr key={id} bg="$White" _hover={{ bg: "#2E66E512"}}>
            <Td px="1rem">
            <Button onMouseEnter={handleMouseOver} onMouseLeave={ handleMouseExit} onClick={handleClickWarehouseName} color={'$InstockIndigo'} bg={''} h={''} rightIcon={<ChevronRight color="$InstockIndigo" style={{ transform: isHovering? 'translate(4px)': ''}} />} _hover={{ bg: '', textDecoration: 'underline' }} _active={{ bg: '' }} fontSize="p2bodyMedium" lineHeight="p2bodyMedium">
                {warehouse.warehouse_name}
            </Button>   
            </Td>
            <Td px="1rem" fontSize="p2bodyMedium" lineHeight="p2bodyMedium">
                {warehouse.address}, {warehouse.city}, {warehouse.country}
            </Td>
            <Td px="1rem" fontSize="p2bodyMedium" lineHeight="p2bodyMedium">{warehouse.contact_name}</Td>
            <Td px="1rem" fontSize="p2bodyMedium" lineHeight="p2bodyMedium">
                {warehouse.contact_phone}
                <br />
                {warehouse.contact_email}
            </Td>
            <Td px="1rem">
                <Flex gap={2}>
                    <Delete cursor="pointer" boxSize={6} color="$Red" onClick={() => {onOpen()}} _hover={{ transform: 'scale(1.2)'}}/>
                    <Modal onClose={onClose} isOpen={isOpen} size="xl">
                        <ModalOverlay bg="rgba(35, 41, 64, 0.5)" />
                        <ModalContent>
                            <ModalHeader>Delete {warehouse.warehouse_name} warehouse?</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                Please confirm that you'd like to delete {warehouse.warehouse_name} from the list of warehouses. You
                                won't be able to undo this action.
                            </ModalBody>
                            <ModalFooter>
                                <Flex gap={4}>
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
                    <Edit onClick={handleClickEditWarehouse} cursor="pointer" boxSize={6} color="$InstockIndigo" _hover={{ transform: 'scale(1.2)'}}/>
                </Flex>
            </Td>
        </Tr>
    );
}

export default WarehouseTabDesk;