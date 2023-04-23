import React, {useState, useEffect, useRef} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../Utils/const";
import { Flex, Text, Input, Button, FormLabel, Select, Box, Stack, Radio, RadioGroup, Textarea, useMediaQuery} from '@chakra-ui/react';
import { ArrowBack } from '../../assets/modifiedIcons';
import { getInventory, getInventories } from '../axios';


function ItemForm() {

    const {inventoryId} = useParams();
    const isEdit = !!inventoryId;

    const [item_name, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [status , setStatus] = useState("");
    const [quantity , setQuantity] = useState("");
    const [warehouse_name , setWarehouse] = useState("");
    const [tablet] = useMediaQuery('(min-width: 768px)');
    const warehouseNameToId ={
        "Seattle": "ade0a47b-cee6-4693-b4cd-a7e6cb25f4b7",
        "Boston": "150a36cf-f38e-4f59-8e31-39974207372d",
        "Miami": "bb1491eb-30e6-4728-a5fa-72f89feaf622",
        "Santa Monica": "89898957-04ba-4bd0-9f5c-a7aea7447963",
        "SF": "bfc9bea7-66f1-44e9-879b-4d363a888eb4",
        "Jersey": "90ac3319-70d1-4a51-b91d-ba6c2464408c",                   
        "Washington": "5bf7bd6c-2b16-4129-bddc-9d37ff8539e9",                   
        "Manhattan": "2922c286-16cd-4d43-ab98-c79f698aeab0"                  
                            
    }

    useEffect(() => {
        if(isEdit){
            axios.get(API_URL+`/inventories/${inventoryId}`)
            .then(response => {
                console.log(response);
                setItemName(response.data.item_name);
                setDescription(response.data.description);
                setCategory(response.data.category);
                setStatus(response.data.status);
                setWarehouse(response.data.warehouse_name);
                setQuantity(response.data.quantity);
            })
            .catch(_err => {});
        }
    }, [isEdit, inventoryId]);
    


    const handleInventoryItemName = (event) => {
        console.log(event.target.value);
        setItemName(event.target.value);
    };

    const handleInventoryDescription = (event) => {
        console.log(event.target.value);
        setDescription(event.target.value);
        
    };

    const handleInventoryCategory = (event) =>{
        console.log(event.target.value);
        setCategory(event.target.value);
    }

    const handleInventoryStatus = (event) => {
        console.log(event);
        setStatus(event);
        
    };

    const handleInventoryQuantity = (event) => {
        let val = event.target.value;
        let stringToInt = parseInt(val);
        setQuantity(stringToInt);
    
    };

    const handleInventoryWarehouse = (event) => {
        setWarehouse(event.target.value);
    
    };


    const isFormValid = () => {
        if ( !item_name || !description || !category || !status || !quantity || !warehouse_name) {
            console.log("false");
            return false;
        }
        console.log("true");
        return true;
    };


    const handleFormSubmit = (event) => {
        event.preventDefault();
        const warehouse_id = warehouseNameToId[warehouse_name];
        if (isFormValid) {
            const newInventor =
            { 
                warehouse_name,
                item_name,
                description,
                category,
                status,
                quantity
            }

            const editInventor = {
                    warehouse_id: warehouse_id,
                    item_name,
                    description,
                    category,
                    status,
                    quantity


            }
            console.log(newInventor);
            const method = isEdit ? 'put' : 'post';
            const url = isEdit ? `${API_URL}/inventories/${inventoryId}` : `${API_URL}/inventories`;
            const post = isEdit ? editInventor: newInventor;
            axios[method](url, post)
            .then(() => {
                setItemName('');
                setDescription('');
                setCategory('');
                setStatus('');
                setQuantity('');
                setWarehouse('');
                
            })
            .catch((error) => {
                console.error(error);
            });
        } else {
            alert("Failed to sign up, you have errors in your form");
        }
    };
    
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

                <Flex 
                    fontSize={{ base: "mh1PageHeader", md: 'h1PageHeader' }}
                    lineHeight={{ base: 'mh1PageHeader', md: 'h1PageHeader' }}
                    fontWeight="bold" px={{sm:"28px"}} py={{sm:"32px"}}
                    borderBottom= '1px'
                    borderColor="$Cloud"
                    
                    >
                    <ArrowBack paddingRight={{sm:"12px"}} color="$InstockIndigo"/>
                    <Text fontSize={{ base: 'mh1PageHeader', md: 'h1PageHeader' }}
                    lineHeight={{ base: 'mh1PageHeader', md: 'h1PageHeader' }}
                            fontWeight="600">Add New Inventory Item
                    </Text>
                </Flex>
                <form onSubmit={handleFormSubmit} >
                <Flex display="flex" flexDirection={{sm:"column", md:"row"}}  >
                   
                    { tablet ? (
                    <Flex display="flex" flexDirection="column"  bg="$White" borderRight="1px" borderRightColor="$Cloud"  width={{sm: null, md:"50%"}} pb="24px" px={{ base: '6', md: '8' }} py={{ base: '4', md: '8' }} >
                        <Text fontSize={{sm:"mh2PageHeader", md:"h2PageHeader"}}
                                    lineHeight={{sm:"mh2PageHeader", md:"h2PageHeader"}}
                                    fontWeight="600">Item Details</Text>
                        <FormLabel >Item Name</FormLabel>
                        <Input borderRadius="20"  borderColor="$Cloud"  type="text" onChange={handleInventoryItemName} value={item_name}/>
                        <FormLabel htmlFor='name'>Description</FormLabel>
                        <Textarea  size='sm' borderRadius="20" type="text" borderColor="$Cloud" onChange={handleInventoryDescription} value={description}/>
                        <FormLabel >Category</FormLabel>
                        <Select  borderRadius="20"  onChange={handleInventoryCategory} value={category}>
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
                                    fontWeight="600"
                                    pb={{sm:"4"}}>Item Details</Text>
                        <FormLabel  fontSize={{sm:"mh3PageHeader", md:"h2PageHeader"}}
                                    lineHeight={{sm:"mh3PageHeader", md:"h2PageHeader"}}
                                    fontWeight="400">Item Name</FormLabel>
                        <Input size="sm" borderRadius="20"  borderColor="$Cloud" placeholder="Item Name" onChange={handleInventoryItemName} value={item_name}></Input>
                        <FormLabel pt={{sm:"4"}} htmlFor='name'>Description</FormLabel>
                        <Textarea  size='sm' borderRadius="20" borderColor="$Cloud" resize="none" rows="5" 
                            placeholder="Please enter a brief item description"
                            onChange={handleInventoryDescription}
                            value={description}/>
                        <FormLabel pt={{sm:"4"}} >Category</FormLabel>
                        <Select size="sm"borderRadius="20" onChange={handleInventoryCategory} value={category}>
                            <option value='Accessories'>Accessories</option>
                            <option value='Apparel'>Apparel</option>
                            <option value='Electronics'>Electronics</option>
                            <option value='Gear'>Gear</option>
                            <option value='Health'>Health</option>
                        </Select>
                    </Flex>
                    
                    )}

                    <Flex display="flex" flexDirection="column" width={{sm: null, md:"50%"}}  px={{ base: '6', md: '8' }} 
                    pt={{ base: '4', md: '8' }}>
                        <Text fontSize={{sm:"mh2PageHeader", md:"h2PageHeader"}}
                                    lineHeight={{sm:"mh2PageHeader", md:"h2PageHeader"}}
                                    fontWeight="600"
                                    pb={{sm:"4"}}>Item Availability</Text>
                        <FormLabel htmlFor='name'>Status</FormLabel>
                        <RadioGroup onChange={handleInventoryStatus} value={status}>
                            <Stack direction='row'>
                                <Radio value='In Stock'>In stock</Radio>
                                <Radio value='Out of Stock'>Out of stock</Radio>
                            </Stack>
                        </RadioGroup>
                        <FormLabel pt={{sm:"4"}} htmlFor='name'>Quantity</FormLabel>
                        <Input size='sm' borderRadius="20" borderColor="$Cloud" onChange={handleInventoryQuantity}
                            placeholder="0" value={quantity}/>
                        
                
                        <FormLabel htmlFor='name' pt={{sm:"4"}}>Warehouse</FormLabel>
                        <Select size="sm" borderRadius="20" onChange={handleInventoryWarehouse} value={warehouse_name}>
                            <option value='Boston'>Boston</option>
                            <option value='Seattle'>Seattle</option>
                            <option value='Miami'>Miami</option>
                            <option value='Santa Monica'>Santa Monica</option>
                            <option value='SF'>SF</option>
                            <option value='Jersey'>Jersey</option>
                            <option value='Washington'>Washington</option>
                            <option value='Manhattan'>Manhattan</option>
                        </Select>
                    </Flex>                   
                </Flex>
                <Stack spacing={2} direction='row' align='center' justifyContent="space-evenly" mt={{sm:"40px"}} px={{sm:"6"}}>
                    <Button h={{sm:"6", md:"9", lg:"8"}}
                    width= {{sm:"125px", md: "110px", lg:"80px" }}
                    borderRadius="50"
                    color="$Slate"
                    bg="white"
                    border= '1px solid #BDC5D5'
                    fontSize={{sm: "mp3bodySmall", md: "p3bodySmall"}}
                    lineHeight={{sm: "mp3bodySmall", md: "p3bodySmall"}}
                    fontWeight="400"
                    fontFamily="Titillium Web">
                        Cancel
                    </Button>
                    <Button 
                    type="submit"
                    h={{sm:"6", md:"9", lg:"8"}}
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
                </form>
            </Flex>
        </Flex>
    );
}

export default ItemForm;