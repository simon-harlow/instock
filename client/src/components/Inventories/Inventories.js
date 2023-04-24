import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Button } from '@chakra-ui/react';
import { getWarehouse, getInventories, deleteInventory, getWarehouseInventories, searchInventory } from '../axios';
import Inventory from './Inventory';
import InventoryHeader from './InventoryHeader';
import WarehouseDetail from './WarehouseDetail';
import { Sort } from '../../assets/modifiedIcons';

function Inventories() {
    const { warehouseId } = useParams();
    const [inventories, setInventories] = useState([]);
    const [warehouseInfo, setwarehouseInfo] = useState();

    useEffect(() => {
        if (warehouseId === undefined) {
            getInventories().then(response => {
                setInventories(response.data);
            });
        } else {
            getWarehouseInventories(warehouseId)
                .then(response => {
                    if (response !== undefined) {
                        setInventories(response.data);
                    } else {
                        setInventories([]);
                    }
                })
                .catch(_err => {});
            getWarehouse(warehouseId)
                .then(response => {
                    if (response !== undefined) {
                        setwarehouseInfo(response.data);
                    } else {
                        setwarehouseInfo({
                            id: '',
                            warehouse_name: 'N/A',
                            address: 'N/A',
                            city: 'N/A',
                            country: 'N/A',
                            contact_name: 'N/A',
                            contact_position: 'N/A',
                            contact_phone: 'N/A',
                            contact_email: 'N/A',
                        });
                    }
                })
                .catch(_err => {});
        }
    }, [warehouseId]);

    const deleteListItem = id => {
        deleteInventory(id).then(response => {
            if (response !== undefined) {
                const newInventories = inventories.filter(item => item.id !== id);
                setInventories(newInventories);
            }
        });
    };

    const searchAction = keyWord => {
        searchInventory(keyWord).then(response => {
            if (response !== undefined) {
                setInventories(response.data);
            }
        })
    }

    return (
        <Flex
            w={{ xl: '1020px' }}
            mx={{ xl: 'auto' }}
            boxShadow="base"
            bg="$White"
            position="absolute"
            top={{ base: '136px', md: '92px' }}
            left={{ base: '4', md: '8' }}
            right={{ base: '4', md: '8' }}
            zIndex="1"
            borderRadius="5px"
        >
            <Flex
                w={{ base: '100%', xl: '1020px' }}
                borderRadius={'3px'}
                boxShadow="md"
                rounded="md"
                bg="white"
                flexDirection={'column'}
            >
                {warehouseId === undefined ? (
                    <InventoryHeader search={searchAction}/>
                ) : warehouseInfo ? (
                    <WarehouseDetail warehouse={warehouseInfo} />
                ) : (
                    <></>
                )}

                <Flex
                    justifyContent="space-between"
                    px={{ base: '6', md: '8', xl: '10' }}
                    py={{ base: '4', md: '18px' }}
                    bg="$LightGrey"
                    display={{ base: 'none', md: 'flex' }}
                >
                    <Button w="150px" rightIcon={<Sort />} variant="tab">
                        Inventory Item
                    </Button>
                    <Button w="90px" rightIcon={<Sort />} variant="tab">
                        Category
                    </Button>
                    <Button w="95px" rightIcon={<Sort />} variant="tab">
                        Status
                    </Button>
                    <Button w="40px" rightIcon={<Sort />} variant="tab">
                        QTY
                    </Button>

                    {warehouseId === undefined ? (
                        <Button w="85px" rightIcon={<Sort />} variant="tab">
                            Warehouse
                        </Button>
                    ) : (
                        <></>
                    )}

                    <Button w="75px" justifyContent="end" variant="tab">
                        Actions
                    </Button>
                </Flex>
                <Flex
                    flexDirection="column"
                    borderTop="1px"
                    borderTopColor={{ base: '$Cloud', sm: '$Cloud', md: '$White' }}
                >
                    {inventories.map((item, index) => {
                        return (
                            <Inventory
                                key={item.id}
                                index={index}
                                warehouseId={warehouseId}
                                info={item}
                                delete={deleteListItem}
                            />
                        );
                    })}
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Inventories;
