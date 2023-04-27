import React, {useEffect, useState}from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Flex, Text, Circle, useMediaQuery, Button, Center} from '@chakra-ui/react';
import { getInventories, getInventory } from '../axios';
import { ArrowBack, Edit } from '../../assets/modifiedIcons';


function Item() {
    const { inventoryId } = useParams();
    const [inventory, setInventory] = useState([]);
    const [tablet] = useMediaQuery('(min-width: 768px)');
    const navigate = useNavigate();

    const goBack = () =>{
        navigate('/inventories/');
    }

    const goEdit = () =>{
        navigate(`/inventories/edit/${inventoryId}`);
    }

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
                    px={{sm:"6", md:"8", lg:"10"}}
                    justifyContent="space-between"
                    alignItems="center"
                    pt={{sm:"8", md: "8"}}
                    pb={{sm:"6", md:"21px"}}
                    fontSize={{ base: 'mh1PageHeader', md: 'h1PageHeader' }}
                    lineHeight={{ base: 'mh1PageHeader', md: 'h1PageHeader' }}
                    fontWeight="bold"
                    borderBottom="1px"
                    borderBottomColor="$Cloud"
                > 
                    <Flex alignItems="center">
                        <ArrowBack color="$InstockIndigo"  onClick={goBack} cursor="pointer"/>
                        <Text 
                            fontSize={{ base: 'mh1PageHeader', md: 'h1PageHeader' }}
                            lineHeight={{ base: 'mh1PageHeader', md: 'h1PageHeader' }}
                            pl={{sm:"12px"}}
                            fontWeight="600">{inventory.item_name}
                        </Text>
                    </Flex>
                    
                    {tablet ? (
                        <Button
                            onClick={goEdit}
                            bg={'$InstockIndigo'}
                            color={'white'}
                            leftIcon={<Edit />}
                            borderRadius={20}
                            w="81px"
                            h="38px"
                            p={0}
                            _hover={{ bg: '$Graphite' }}
                        >
                            Edit
                        </Button>
                    ) : (
                        <Circle bg={'$InstockIndigo'} color={'white'} size="36px" onClick={goEdit}>
                            <Edit width={{sm:"15px"}}/>
                        </Circle>
                    )}
                </Flex>

                <Flex flexDirection={{sm:"column", md:"row"}} width="100%" 
                    mt={{sm:'4', md:'6'}}
                    mb={{sm:'6', md:'8'}}>
                    <Flex flexDirection={{sm:"column", md:"row"}} width="100%">
                        <Flex px={{ base: '6', md: '8', xl: '10' }}
                            flexDirection="column"
                            width={{sm:"100%"}}
                            borderRight={{ base: 'none', md: '1px solid' }} borderColor={{ base: '$Cloud', md: '$Cloud' }}
                            > 
                            <Text 
                                textTransform="uppercase" 
                                fontSize={{ base: 'mh3Labels', md: 'h3Labels' }} lineHeight={{ base: 'mh3Labels', md: 'h3Labels' }}
                                color="$Slate">
                                Item description:
                            </Text>
                            <Text 
                                pb={{sm: "4", md:"8"}}
                                fontSize={{ base: 'mp2bodyMedium', md: 'p2bodyMedium' }}
                                lineHeight={{ base: 'mp2bodyMedium', md: 'p2bodyMedium' }}
                                color="$Instock-Black">
                                {inventory.description}
                            </Text>
                            <Text
                                textTransform="uppercase" 
                                fontSize={{ base: 'mh3Labels', md: 'h3Labels' }} lineHeight={{ base: 'mh3Labels', md: 'h3Labels' }}
                                color="$Slate">
                                Category:
                            </Text>
                            <Text
                                pb={{sm: "4", md:"0"}}
                                fontSize={{ base: 'mp2bodyMedium', md: 'p2bodyMedium' }}
                                lineHeight={{ base: 'mp2bodyMedium', md: 'p2bodyMedium' }}
                                color="$Instock-Black">
                                {inventory.category}
                            </Text>
                        </Flex>

                        <Flex flexDirection="column" width={{sm:"100%"}}  px={{ base: '6', md: '8', xl: '10' }} >
                            <Flex
                                width="100%">
                                <Flex flexDirection="column"
                                    width="50%"
                                    >
                                    <Text 
                                        textTransform="uppercase" 
                                        fontSize={{ base: 'mh3Labels', md: 'h3Labels' }} lineHeight={{ base: 'mh3Labels', md: 'h3Labels' }}
                                        color="$Slate"
                                    >
                                        Status:
                                    </Text>
                                    {inventory.quantity === 0 ? (
                                            <Center
                                                w="fit-content"
                                                h="26px"
                                                px={2}
                                                textTransform="uppercase"
                                                color="$Red"
                                                bg="rgba(201, 69, 21, 0.07)"
                                                borderRadius="20px"
                                                fontSize="p3bodySmall"
                                                mb={{sm: "4", md:"8"}}
                                            >
                                                {inventory.status}
                                            </Center>
                                        ) : (
                                            <Center
                                                w="fit-content"
                                                h="26px"
                                                px={2}
                                                textTransform="uppercase"
                                                color="$Green"
                                                bg="rgba(21, 132, 99, 0.07)"
                                                borderRadius="20px"
                                                fontSize="p3bodySmall"
                                                mb={{sm: "4", md:"8"}}
                                            >
                                                {inventory.status}
                                            </Center>
                                        )}
                                </Flex>
                                <Flex 
                                    flexDirection="column" 
                                    width="50%"
                                >
                                    <Text 
                                        textTransform="uppercase" 
                                        fontSize={{ base: 'mh3Labels', md: 'h3Labels' }} lineHeight={{ base: 'mh3Labels', md: 'h3Labels' }}
                                        color="$Slate"
                                    >
                                        Quantity:
                                    </Text>
                                    <Text 
                                        fontSize={{ base: 'mp2bodyMedium', md: 'p2bodyMedium' }}
                                        lineHeight={{ base: 'mp2bodyMedium', md: 'p2bodyMedium' }}
                                    >
                                        {inventory.quantity}
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex 
                                
                                flexDirection="column">
                                <Text 
                                    textTransform="uppercase" 
                                    fontSize={{ base: 'mh3Labels', md: 'h3Labels' }} lineHeight={{ base: 'mh3Labels', md: 'h3Labels' }}
                                    color="$Slate"
                                >
                                    Warehouse:
                                </Text>
                                <Text 
                                    fontSize={{ base: 'mp2bodyMedium', md: 'p2bodyMedium' }}
                                    lineHeight={{ base: 'mp2bodyMedium', md: 'p2bodyMedium' }}
                                >
                                    {inventory.warehouse_name}
                                </Text>
                            </Flex>
                        </Flex>

                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    ) 
}

export default Item;
