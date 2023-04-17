import React from 'react';
import { Flex, Image, Button, Stack, Box } from '@chakra-ui/react';
import Logo2 from '../../assets/Logo/InStock-Logo_2x.png';

function Header() {
    return (
        <Box 
            bg="$Graphite" 
            width='100%'
            height='100%'
            align='center'
            pb="20%"
        >
            <Image py="5%" src={Logo2} width='30%' />
            <Stack  direction='row' align='center' justifyContent="space-evenly">
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
        </Box>
    );
}

export default Header;
