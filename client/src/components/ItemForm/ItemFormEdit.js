import React,{useState} from 'react';

import { Flex, Input, Button, FormLabel, Text, Box, Textarea, Select, Stack, RadioGroup, Radio} from '@chakra-ui/react';
import { Delete, Edit, ChevronRight } from '../../assets/modifiedIcons';
import { ArrowBack } from '../../assets/modifiedIcons';


function ItemFormEdit() {
    const [value, setValue] = useState('1')
    return (
        <Box mt="-20px" mx={{ base: '4', sm: '4', md: '8', xl: 'auto' } } >
            
                <Flex bg="$White" borderBottom='1px' borderColor='gray.200' pb="24px">
                    <Button leftIcon={<ArrowBack color="$InstockIndigo"/>}></Button>
                    <Text fontSize={{sm:"mh1PageHeader", md:"h1PageHeader"}}
                            lineHeight={{sm:"mh1PageHeader", md:"h1PageHeader"}}
                            fontWeight="600">
                        Edit Inventory Item
                    </Text>
                </Flex>
                <Text fontSize={{sm:"mh2PageHeader", md:"h2PageHeader"}}
                            lineHeight={{sm:"mh2PageHeader", md:"h2PageHeader"}}
                            fontWeight="600">Item Details</Text>
                <Flex display="flex" flexDirection="column" pb="7" bg="$White" borderBottom='1px' borderColor='gray.200'>
                    <FormLabel htmlFor='name'>Item Name</FormLabel>
                    <Input placeholder="name" borderRadius="20"/>
                    <FormLabel htmlFor='name'>Description</FormLabel>
                    <Textarea placeholder="name"  size='sm' borderRadius="20"/>
                    <FormLabel htmlFor='name'>Category</FormLabel>
                    <Select placeholder='Select option' borderRadius="20">
                        <option value='option1'  >Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                   
                </Flex>
                <Flex>
                    <Text>
                        Item Availability
                    </Text>
                </Flex>
                <Flex display="flex" flexDirection="column">
                    <FormLabel htmlFor='name'>Status</FormLabel>
                    <RadioGroup onChange={setValue} value={value}>
                        <Stack direction='row'>
                            <Radio value='1'>First</Radio>
                            <Radio value='2'>Second</Radio>
                            <Radio value='3'>Third</Radio>
                        </Stack>
                    </RadioGroup>
                    <FormLabel htmlFor='name'>Warehouse</FormLabel>
                    <Select placeholder='Select option' borderRadius="20">
                        <option value='option1'  >Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                   
                </Flex>
        </Box>
    );
}

export default ItemFormEdit;
