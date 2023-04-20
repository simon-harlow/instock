import React, {useState, useEffect} from 'react';
import { Flex, Heading, Center, Button, Link, Text, Box } from '@chakra-ui/react';
import { getWarehouseDetails } from '../axios';
import { ArrowBack, Edit, ChevronRight } from '../../assets/modifiedIcons';

function WarehouseDetails() {
    const [ warehouseDetails, setWarehouseDetails] = useState([]);

    useEffect(() => {
        getWarehouseDetails().then(response => {
            setWarehouseDetails(response);
            console.log(response);
        });
    }, []);


    return(
        <Box  mt="-20px" mx={{ base: '4', sm: '4', md: '8', xl: 'auto' }} >
            <Flex display="block" bg="$White" borderBottom='1px' borderColor='gray.200'>
                <Flex>
                    <Button leftIcon={<ArrowBack/>}></Button>
                    <Text>
                        Washington
                    </Text>
                    <Button leftIcon={<Edit/>}></Button>
                </Flex>
            </Flex >
            <Flex display="block" borderBottom='1px' borderColor='gray.200'>
                <Flex flexDirection="column">
                    <Text fontSize={{sm: "mh4TableHeader", md: "h4TableHeader"}}>Warehouse Address:</Text>
                    <Text fontSize={{sm: "mp2bodyMedium", md: "p2bodyMedium"}}>Warehouse Address:</Text>
                    <Flex flexDirection="row">
                        <Flex width="500px" flexDirection="column">
                            <Text fontSize={{sm: "mh4TableHeader", md: "h4TableHeader"}} >Contact Name:</Text>
                            <Text fontSize={{sm: "mp2bodyMedium", md: "p2bodyMedium"}}>Warehouse Address:</Text>
                            <Text fontSize={{sm: "mp2bodyMedium", md: "p2bodyMedium"}}>Warehouse Address:</Text>
                        </Flex>
                        <Flex width="500px" flexDirection="column">
                            <Text fontSize={{sm: "mh4TableHeader", md: "h4TableHeader"}} >Contact Name:</Text>
                            <Text fontSize={{sm: "mp2bodyMedium", md: "p2bodyMedium"}}>Warehouse Address:</Text>
                            <Text fontSize={{sm: "mp2bodyMedium", md: "p2bodyMedium"}}>Warehouse Address:</Text>
                        </Flex>
                        
                    </Flex>
                </Flex>
                
            </Flex>
            
        </Box>
    );
}

export default WarehouseDetails;
