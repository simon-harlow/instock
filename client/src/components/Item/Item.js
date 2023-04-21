import React, {useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Text, Input, Button, FormLabel, Select, Box, Stack, Radio, RadioGroup, Textarea  } from '@chakra-ui/react';
import { ArrowBack } from '../../assets/modifiedIcons';
import { getInventory, getInventories } from '../axios';


function Item() {
    const { inventoryId } = useParams();
    const [inventory, setInventory] = useState([]);
    const [value, setValue] = useState('1');
    const inventoryInfo = useRef();

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
        <Box mt="-20px" mx={{ base: '4', sm: '4', md: '8', xl: 'auto' } } >

                <Flex bg="$White" borderBottom='1px' borderColor='gray.200' pb="24px">
                    <Button leftIcon={<ArrowBack color="$InstockIndigo"/>}></Button>
                    <Text fontSize={{sm:"mh1PageHeader", md:"h1PageHeader"}}
                            lineHeight={{sm:"mh1PageHeader", md:"h1PageHeader"}}
                            fontWeight="600">Edit Inventory Item
                    </Text>
                </Flex>
                <Text fontSize={{sm:"mh2PageHeader", md:"h2PageHeader"}}
                            lineHeight={{sm:"mh2PageHeader", md:"h2PageHeader"}}
                            fontWeight="600">Item Details</Text>
                <Flex display="flex" flexDirection="column" pb="7" bg="$White" borderBottom='1px' borderColor='gray.200'>
                    <FormLabel >Item Name</FormLabel>
                    <Input borderRadius="20" defaultValue={inventory.item_name}></Input>
                    <FormLabel htmlFor='name'>Description</FormLabel>
                    <Textarea defaultValue={inventory.description} size='sm' borderRadius="20"/>
                    <FormLabel >Category</FormLabel>
                    <Select value={inventory.category} borderRadius="20">
                        <option value='Accessoriess'>Accessories</option>
                        <option value='Apparelr'>Apparel</option>
                        <option value='Electronics'>Electronics</option>
                        <option value='Gear'>Gear</option>
                        <option value='Health'>Health</option>
                    </Select>
                </Flex>
                <Flex>
                    <Text>
                        Item Availability
                    </Text>
                </Flex>
                <Flex display="flex" flexDirection="column">
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
                        <option value='Washington'>Washington</option>
                        <option value='Manhattan'>Manhattan</option>
                    </Select>
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
        </Box>
    );
}

export default Item;
