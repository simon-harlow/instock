import React from 'react';
import { Flex, Image, Button, Stack, Box , useBreakpointValue, IconButton } from '@chakra-ui/react';
import Logo2 from '../../assets/Logo/InStock-Logo_2x.png';


function Header() {
    const isDesktop = useBreakpointValue({ md: false, lg: true });
    return (
        <Box 
            bg="$Graphite" 
            width='100%'
            height='100%'
            align='center'
            pb="20%"
            display={{ base: "none", md: "block" }}
        >
            <Image py="5%" src={Logo2} width='30%' />
            
            <Stack  direction='row' align='center' justifyContent="space-evenly" >
                <Button 
                size="sm"
                bg='$InstockBlack'
                borderRadius="50" 
                color='white' 
                fontSize='mp3bodySmall' 
                lineHeight="mp3bodySmall"
                px='13%' 
                fontWeight="400" 
                fontFamily='Titillium Web'
                >
                    Warehouses
                </Button>
                <Button 
                size="sm"
                bg='$InstockBlack'
                borderRadius="50" 
                color='white' 
                fontSize='mp3bodySmall' 
                lineHeight="mp3bodySmall"
                px='13%' 
                fontWeight="400" 
                fontFamily='Titillium Web'
                >
                    Inventory
                </Button>
                </Stack>
                
                    <IconButton
                variant="ghost"
                aria-label="Open Menu"
                bg="white"
              />
             
            
        </Box>
    );
}

export default Header;
