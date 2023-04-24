import React, {useState, useEffect, useRef} from 'react';
import { useNavigate, useParams, useNavigation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../Utils/const";
import { Flex, Text, Input, Button, FormLabel, Select, FormErrorMessage, Stack, Radio, RadioGroup, Textarea, useMediaQuery, FormControl} from '@chakra-ui/react';
import { AddWhite, ArrowBack } from '../../assets/modifiedIcons';

function ItemForm() {

    const {inventoryId} = useParams();
    const navigate = useNavigate();
    const isEdit = !!inventoryId;

    const [item_name, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [status , setStatus] = useState("");
    const [quantity , setQuantity] = useState("Accessories");
    const [warehouse_id , setWarehouse] = useState("");

    const [formErrors, setFormErrors] = useState();

    const [tablet] = useMediaQuery('(min-width: 768px)');

    const warehouseNameToId ={
        Seattle: "ade0a47b-cee6-4693-b4cd-a7e6cb25f4b7",
        Boston: "150a36cf-f38e-4f59-8e31-39974207372d",
        Miami: "bb1491eb-30e6-4728-a5fa-72f89feaf622",
        SantaMonica: "89898957-04ba-4bd0-9f5c-a7aea7447963",
        SF: "bfc9bea7-66f1-44e9-879b-4d363a888eb4",
        Jersey: "90ac3319-70d1-4a51-b91d-ba6c2464408c",                   
        Washington: "5bf7bd6c-2b16-4129-bddc-9d37ff8539e9",                   
        Manhatta: "2922c286-16cd-4d43-ab98-c79f698aeab0"                  
                            
    }

    useEffect(() => {
        if(isEdit){
            axios.get(API_URL+`/inventories/${inventoryId}`)
            .then(response => {
                const fetchedWarehouseID = warehouseNameToId[response.data.warehouse_name.trim()];
                setItemName(response.data.item_name);
                setDescription(response.data.description);
                setCategory(response.data.category);
                setStatus(response.data.status);
                setWarehouse(fetchedWarehouseID);
                setQuantity(response.data.quantity);
            })
            .catch((error) => {
                console.error("Error fetching warehouse data:", error);
            });
        }
    }, [isEdit, inventoryId]);
    


    const handleInventoryItemName = (event) => {
        setItemName(event.target.value);
    };

    const handleInventoryDescription = (event) => {
        setDescription(event.target.value);
    };

    const handleInventoryCategory = (event) =>{
        setCategory(event.target.value);
    };

    const handleInventoryStatus = (event) => {
        setStatus(event);
    };

    const handleInventoryQuantity = (event) => {
        setQuantity(event.target.value);
    };

    const handleInventoryWarehouse = (event) => {
        setWarehouse(event.target.value);
    };

    const goBack = () =>{
        navigate('/inventories/');
    }

    const isFormValid = () => {
        const errors = [];

        if (!warehouse_id) {
            errors.push("Warehouse name is required");
        }
        if (!description) {
            errors.push("Description is required");
        }
        if (!category) {
            errors.push("Category is required");
        }
        if (!status) {
            errors.push("Status is required");
        }
        if (!item_name) {
            errors.push("Item name is required");
        }
        if(status ==="In Stock"){
            if(!quantity){
                errors.push("Quanity is required");
            }
        }
        return errors;
    };

    const inStock = () =>{
        if(status === "In Stock") return true;
        else{
            return false;
        }
    }


    const handleFormSubmit = (event) => {
        event.preventDefault();
        const errors = isFormValid();
        if(status == "Out of Stock"){
            setQuantity(0);
        }

        const parsed = parseInt(quantity);

        if (errors.length === 0) {
            const newInventory = { 
                warehouse_id: warehouse_id,
                item_name,
                description,
                category,
                status,
                quantity: parsed
            };
            const editInventory = {
                    warehouse_id,
                    item_name,
                    description,
                    category,
                    status,
                    quantity: parsed
            };

            const method = isEdit ? 'put' : 'post';
            const url = isEdit ? `${API_URL}/inventories/${inventoryId}` : `${API_URL}/inventories`;
            const post = isEdit ? editInventory: newInventory;
            

            axios[method](url, post)
                .then(() => {
                    setFormErrors(null);
                    setItemName("");
                    setDescription("");
                    setCategory("Accessories");
                    setStatus("");
                    setQuantity("");
                    setWarehouse("");
                    goBack();
                })
                .catch((error) => {
                    console.error(error);
                });
                
        } else {
            setFormErrors(errors);
        }
    };
    
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

                <Flex 
                    fontSize={{ base: "mh1PageHeader", md: 'h1PageHeader' }}
                    lineHeight={{ base: 'mh1PageHeader', md: 'h1PageHeader' }}
                    fontWeight="bold" pl={{sm:"28px"}} pr={{sm:"6"}} pt={{sm:"8"}} pb={{sm:"6"}}
                    borderBottom= '1px'
                    borderColor="$Cloud"
                    
                    >
                    <ArrowBack paddingRight={{sm:"12px"}} color="$InstockIndigo" onClick={goBack} cursor="pointer"/>
                    <Text fontSize={{ base: 'mh1PageHeader', md: 'h1PageHeader' }}
                    lineHeight={{ base: 'mh1PageHeader', md: 'h1PageHeader' }}
                            fontWeight="600">{isEdit? "Edit Inventory Item": "Add New Inventory Item"}
                    </Text>
                </Flex>
                <form onSubmit={handleFormSubmit} >
                <Flex display="flex" flexDirection={{sm:"column", md:"row"}} >
                   
                    { tablet ? (
                    <Flex display="flex" flexDirection="column"  bg="$White" borderRight="1px" borderRightColor="$Cloud"  width={{sm: null, md:"50%"}}  px={{ base: '6', md: '8' }} my={{ base: '4', md: '6' }} >
                        <Text fontSize={{sm:"mh2PageHeader", md:"h2PageHeader"}}
                                    lineHeight={{sm:"mh2PageHeader", md:"h2PageHeader"}}
                                    fontWeight="600"
                                    mb={{md:"8"}}>Item Details</Text>

                        <FormControl isInvalid={formErrors && formErrors.includes("Item name is required")}  errorBorderColor='$Red' name="item_name">
                            <FormLabel 
                                fontSize={{sm:"mh3PageHeader", md:"h3PageHeader"}}
                                lineHeight={{sm:"mh3PageHeader", md:"h3PageHeader"}}
                            >Item Name</FormLabel>
                            <Input borderRadius="20"  borderColor="$Cloud" maxLength={50} type="text"  onChange={handleInventoryItemName} value={item_name}/>
                            <FormErrorMessage>
                                {formErrors && formErrors.includes("Item Name is required") && "This field is required"}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={formErrors && formErrors.includes("Description is required")}  errorBorderColor='$Red' name="description" >
                            <FormLabel htmlFor='name' mt={{md:"4"}} >Description</FormLabel>
                            <Textarea  size='sm' borderRadius="20" type="text" maxLength={100} borderColor="$Cloud" onChange={handleInventoryDescription} resize="none" value={description} height={{sm:"120px"}}/>
                            <FormErrorMessage>
                                {formErrors && formErrors.includes("Description is required") && "This field is required"}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={formErrors && formErrors.includes("Category is required")}  errorBorderColor='$Red' name="category">
                            <FormLabel mt={{md:"4"}}>Category</FormLabel>
                            <Select  borderRadius="20"  onChange={handleInventoryCategory} value={category} placeholder='Please select' >
                            <option value='Accessories'>Accessories</option>
                            <option value='Apparel'>Apparel</option>
                            <option value='Electronics'>Electronics</option>
                            <option value='Gear'>Gear</option>
                            <option value='Health'>Health</option>
                            </Select>
                            <FormErrorMessage>
                                {formErrors && formErrors.includes("Category is required") && "This field is required"}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    ):(
                    <Flex display="flex" flexDirection="column"  bg="$White" borderBottom="1px" borderBottomColor="$Cloud"  width={{sm: null, md:"50%"}} pb="24px" px={{ base: '6', md: '8' }} py={{ base: '4', md: '8' }}>
                        <Text fontSize={{sm:"mh2PageHeader", md:"h2PageHeader"}}
                                    lineHeight={{sm:"mh2PageHeader", md:"h2PageHeader"}}
                                    fontWeight="600"
                                    pb={{sm:"4"}}>Item Details</Text>
                        <FormControl isInvalid={formErrors && formErrors.includes("Item name is required")} maxLength={50} type="text" errorBorderColor='$Red' name="item_name">
                            <FormLabel  fontSize={{sm:"mh3PageHeader", md:"h2PageHeader"}}
                                    lineHeight={{sm:"mh3PageHeader", md:"h2PageHeader"}}
                                    fontWeight="400">Item Name</FormLabel>
                            <Input size="sm" borderRadius="20"  borderColor="$Cloud" placeholder="Item Name" onChange={handleInventoryItemName} value={item_name}></Input>
                            <FormErrorMessage>
                                {formErrors && formErrors.includes("Item name is required") && "This field is required"}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={formErrors && formErrors.includes("Description is required")}  errorBorderColor='$Red' name="description">
                            <FormLabel pt={{sm:"4"}} htmlFor='name'>Description</FormLabel>
                            <Textarea  size='sm' borderRadius="20" borderColor="$Cloud" maxLength={50} type="text" resize="none" rows="5" 
                                placeholder="Please enter a brief item description"
                                onChange={handleInventoryDescription}
                                value={description}/>
                                <FormErrorMessage>
                                {formErrors && formErrors.includes("Description is required") && "This field is required"}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={formErrors && formErrors.includes("Category is required")}  errorBorderColor='$Red' name="category">
                            <FormLabel pt={{sm:"4"}} >Category</FormLabel>
                            <Select size="sm"borderRadius="20" onChange={handleInventoryCategory} value={category} placeholder='Please select' >
                                <option value="Accessories">Accessories</option>
                                <option value="Apparel">Apparel</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Gear">Gear</option>
                                <option value="Health">Health</option>
                            </Select>
                            <FormErrorMessage>
                                {formErrors && formErrors.includes("Category is required") && "This field is required"}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    
                    )}

                    <Flex display="flex" flexDirection="column" width={{sm: null, md:"50%"}}  px={{ base: '6', md: '8' }} 
                    mt={{ base: '4', md: '6' }} mb={{sm:"4"}}>
                        <Text fontSize={{sm:"mh2PageHeader", md:"h2PageHeader"}}
                                    lineHeight={{sm:"mh2PageHeader", md:"h2PageHeader"}}
                                    fontWeight="600"
                                    mb={{sm:"4", md:"8"}}>Item Availability</Text>
                        <FormControl  isInvalid={formErrors && formErrors.includes("Status is required")}  errorBorderColor='$Red' name="status">
                            <FormLabel htmlFor='name'>Status</FormLabel>
                            <RadioGroup onChange={handleInventoryStatus} value={status}>
                                <Stack direction='row'>
                                    <Radio value='In Stock'>In stock</Radio>
                                    <Radio value='Out of Stock'>Out of stock</Radio>
                                </Stack>
                            </RadioGroup>
                            <FormErrorMessage>
                                {formErrors && formErrors.includes("Status is required") && "This field is required"}
                            </FormErrorMessage>
                        </FormControl>
                        
                        {inStock()? <FormControl isInvalid={formErrors && formErrors.includes("Quantity is required")}  errorBorderColor='$Red' name="quantity">
                                <FormLabel mt={{sm:"4", md:"6"}} htmlFor='name'>Quantity</FormLabel> 
                                <Input size='sm' min="1" max="65535" borderRadius="20" borderColor="$Cloud" type="number" onChange={handleInventoryQuantity}
                                    value={quantity}/></FormControl> 
                            : <FormControl><FormLabel pt={{sm:"4"}} htmlFor='name' display="none">Quantity</FormLabel> <Input size='sm' borderRadius="20" borderColor="$Cloud" onChange={handleInventoryQuantity}
                            value={quantity}  display="none"/></FormControl>
                        }
                        <FormControl  isInvalid={formErrors && formErrors.includes("Warehouse name is required")}  errorBorderColor='$Red' name="warehouse_id">
                        <FormLabel htmlFor='name' pt={{sm:"4"}}>Warehouse</FormLabel>
                        <Select size="sm" borderRadius="20" onChange={handleInventoryWarehouse} value={warehouse_id} placeholder='Please select' >
                            <option value='150a36cf-f38e-4f59-8e31-39974207372d'>Boston</option>
                            <option value='ade0a47b-cee6-4693-b4cd-a7e6cb25f4b7'>Seattle</option>
                            <option value='bb1491eb-30e6-4728-a5fa-72f89feaf622'>Miami</option>
                            <option value='89898957-04ba-4bd0-9f5c-a7aea7447963'>Santa Monica</option>
                            <option value='bfc9bea7-66f1-44e9-879b-4d363a888eb4'>SF</option>
                            <option value='90ac3319-70d1-4a51-b91d-ba6c2464408c'>Jersey</option>
                            <option value='5bf7bd6c-2b16-4129-bddc-9d37ff8539e9'>Washington</option>
                            <option value='2922c286-16cd-4d43-ab98-c79f698aeab0'>Manhattan</option>
                        </Select>
                        <FormErrorMessage>
                                {formErrors && formErrors.includes("Warehouse name is required") && "This field is required"}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>                   
                </Flex>
                <Stack spacing={2} direction='row' align='center' justifyContent={{sm: "space-around", md:"flex-end"}} py={{sm:"4"}} px={{sm:"6"}} bg="$LightGrey">
                    <Button h={{sm:"6", md:"9", lg:"8"}}
                    width= {{sm:"125px", md: "72px", lg:"72px" }}
                    borderRadius="50"
                    color="$Slate"
                    bg="white"
                    border= '1px solid #BDC5D5'
                    fontSize={{sm: "mp3bodySmall", md: "p3bodySmall"}}
                    lineHeight={{sm: "mp3bodySmall", md: "p3bodySmall"}}
                    fontWeight="400"
                    fontFamily="Titillium Web"
                    onClick={goBack}>
                        Cancel
                    </Button>
                   
                   {isEdit? 
                        <Button 
                            type="submit"
                            h={{sm:"6", md:"9", lg:"8"}}
                            width= {{sm:"125px", md: "98px", lg:"98px" }}
                            borderRadius="50"
                            bg="$InstockIndigo"
                            color="white"
                            fontSize={{sm: "mp3bodySmall", md: "p3bodySmall"}}
                            lineHeight={{sm: "mp3bodySmall", md: "p3bodySmall"}}
                            fontWeight="400"
                            fontFamily="Titillium Web"
                        >
                            Save
                        </Button> :
                        <Button 
                            type="submit"
                            h={{sm:"6", md:"9", lg:"8"}}
                            width= {{sm:"125px", md: "98px", lg:"98px" }}
                            borderRadius="50"
                            bg="$InstockIndigo"
                            color="white"
                            fontSize={{sm: "mp3bodySmall", md: "p3bodySmall"}}
                            lineHeight={{sm: "mp3bodySmall", md: "p3bodySmall"}}
                            fontWeight="400"
                            fontFamily="Titillium Web"
                        >
                            <AddWhite/> Add Item
                        </Button>
                    }
                </Stack>
                </form>
            </Flex>
        </Flex>
    );
}

export default ItemForm;