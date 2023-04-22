import React, {useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Text, Input, Button, FormLabel, Select, Box, Stack, Radio, RadioGroup, Textarea, useMediaQuery} from '@chakra-ui/react';
import { ArrowBack } from '../../assets/modifiedIcons';
import { getInventory, getInventories } from '../axios';


function ItemForm() {
    const { inventoryId } = useParams();
    const [inventory, setInventory] = useState([]);
    const [value, setValue] = useState('1');
    const [tablet] = useMediaQuery('(min-width: 768px)');

    useEffect(() => {
        if (inventoryId === undefined) {
            getInventories().then(response => {
                setInventory(response.data[0]);
            });
        } else {
            getInventory(inventoryId)
                .then(response => {
                    setInventory(response.data);
                })
                .catch(_err => {});
        }
    }, [inventoryId]);
    
    if (!inventory) {
        return <h1 className="loading">Loading...</h1>;
      }
    
    return (
        <Flex w={{ xl: '1020px' }}
        mx={{ xl: 'auto' }}
        boxShadow="base"
        bg="$White"
        position="absolute"
        top={{ base: '136px', md: '92px' }}
        left={{ base: '4', md: '8' }}
        right={{ base: '4', md: '8' }}
        zIndex="1"
        borderRadius="5px">
            <Flex
                w={{ base: '100%', xl: '1020px' }}
                borderRadius={'3px'}
                boxShadow="md"
                rounded="md"
                bg="white"
                flexDirection={'column'}
                
                >

                <Flex  alignItems="center"
                    fontSize={{ base: 'mh1PageHeader', md: 'h1PageHeader' }}
                    lineHeight={{ base: 'mh1PageHeader', md: 'h1PageHeader' }}
                    fontWeight="bold" px={{sm:"28px"}} py={{sm:"32px"}}>
                    <ArrowBack paddingRight={{sm:"12px"}} color="$InstockIndigo" />
                    <Text fontSize={{ base: 'mh1PageHeader', md: 'h1PageHeader' }}
                    lineHeight={{ base: 'mh1PageHeader', md: 'h1PageHeader' }}
                            fontWeight="600">Edit Inventory Item
                    </Text>
                </Flex>
                <Flex display="flex" flexDirection={{sm:"column", md:"row"}}  >
                    { tablet ? (
                    <Flex display="flex" flexDirection="column"  bg="$White" borderRight="1px" borderRightColor="$Cloud"  width={{sm: null, md:"50%"}} pb="24px" px={{ base: '6', md: '8' }} py={{ base: '4', md: '8' }} >
                        <Text fontSize={{sm:"mh2PageHeader", md:"h2PageHeader"}}
                                    lineHeight={{sm:"mh2PageHeader", md:"h2PageHeader"}}
                                    fontWeight="600">Item Details</Text>
                        <FormLabel >Item Name</FormLabel>
                        <Input borderRadius="20" defaultValue={inventory.item_name} borderColor="$Cloud"></Input>
                        <FormLabel htmlFor='name'>Description</FormLabel>
                        <Textarea defaultValue={inventory.description} size='sm' borderRadius="20" borderColor="$Cloud"/>
                        <FormLabel >Category</FormLabel>
                        <Select value={inventory.category} borderRadius="20">
                            <option value='Accessories'>Accessories</option>
                            <option value='Apparel'>Apparel</option>
                            <option value='Electronics'>Electronics</option>
                            <option value='Gear'>Gear</option>
                            <option value='Health'>Health</option>
                        </Select>
                    </Flex>


                    ):(


                    <Flex display="flex" flexDirection="column"  bg="$White" borderBottom="1px" borderBottomColor="$Cloud"  width={{sm: null, md:"50%"}} pb="24px" px={{ base: '6', md: '8' }} py={{ base: '4', md: '8' }}>
                        <Text fontSize={{sm:"mh2PageHeader", md:"h2PageHeader"}}
                                    lineHeight={{sm:"mh2PageHeader", md:"h2PageHeader"}}
                                    fontWeight="600">Item Details</Text>
                        <FormLabel >Item Name</FormLabel>
                        <Input borderRadius="20" defaultValue={inventory.item_name} borderColor="$Cloud"></Input>
                        <FormLabel htmlFor='name'>Description</FormLabel>
                        <Textarea defaultValue={inventory.description} size='sm' borderRadius="20" borderColor="$Cloud"/>
                        <FormLabel >Category</FormLabel>
                        <Select value={inventory.category} borderRadius="20">
                            <option value='Accessories'>Accessories</option>
                            <option value='Apparel'>Apparel</option>
                            <option value='Electronics'>Electronics</option>
                            <option value='Gear'>Gear</option>
                            <option value='Health'>Health</option>
                        </Select>
                    </Flex>
                    
                    )}

                    <Flex display="flex" flexDirection="column" width={{sm: null, md:"50%"}} pb="24px" px={{ base: '6', md: '8' }} py={8}>
                        <Text fontSize={{sm:"mh2PageHeader", md:"h2PageHeader"}}
                                    lineHeight={{sm:"mh2PageHeader", md:"h2PageHeader"}}
                                    fontWeight="600">Item Availability</Text>
                        <FormLabel htmlFor='name'>Status</FormLabel>
                        <RadioGroup onChange={setValue} value={inventory.status}>
                            <Stack direction='row'>
                                <Radio value='In Stock' width={{sm: "50%"}}>In stock</Radio>
                                <Radio value='Out of Stock'>Out of stock</Radio>
                            </Stack>
                        </RadioGroup>
                        <FormLabel htmlFor='name'>Warehouse</FormLabel>
                        <Select value={inventory.warehouse_name} borderRadius="20">
                            <option value='Seattle'>Seattle</option>
                            <option value='Miami'>Miami</option>
                            <option value='SF'>SF</option>
                            <option value='Washington'>Washington</option>kkkkkkk
                            <option value='Manhattan'>Manhattan</option>
                        </Select>
                    </Flex>
                </Flex>
                <Stack spacing={2} direction='row' align='center' justifyContent="space-evenly" mt="30px">
                    <Button h={{sm:"7", md:"9", lg:"8"}}
                    width= {{sm:"125px", md: "110px", lg:"80px" }}
                    borderRadius="50"
                    bg="$InstockIndigo"
                    color="white"
                    fontSize={{sm: "mp3bodySmall", md: "p3bodySmall"}}
                    lineHeight={{sm: "mp3bodySmall", md: "p3bodySmall"}}
                    fontWeight="400"
                    fontFamily="Titillium Web">
                        Cancel
                    </Button>
                    <Button h={{sm:"7", md:"9", lg:"8"}}
                    width= {{sm:"125px", md: "110px", lg:"80px" }}
                    borderRadius="50"
                    bg="$InstockIndigo"
                    color="white"
                    fontSize={{sm: "mp3bodySmall", md: "p3bodySmall"}}
                    lineHeight={{sm: "mp3bodySmall", md: "p3bodySmall"}}
                    fontWeight="400"
                    fontFamily="Titillium Web">
                        Save
                    </Button>
                </Stack>
            </Flex>
        </Flex>
    );
}

export default ItemForm;