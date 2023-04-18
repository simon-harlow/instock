import React from 'react';
import { Box, Image, Stack, Button } from '@chakra-ui/react';
import Logo2 from '../../assets/Logo/InStock-Logo_2x.png';

function Header() {
    return (
        <Box
            bg ="$Graphite"
            width ="100%"
            height={{sm: "26vh"}}
            pb="20%"
            align= "center"
            display={{ sm: null, md: "flex", lg:"flex"}}
            justifyContent={{sm: "center", md: "center", lg: "space-between"}}
            px={{lg: "5%"}}
        >
            <Image 
            py={{sm: "5%", md: "5%"}}
            width ={{sm:"30%", md:"10%"}}
            src={Logo2} 
            />

            <Stack
                spacing ={2}
                direction = "row"
                align= {{sm: "center"}}
                justifyContent={{ sm: "space-evenly"}}
            >
                <Button
                    size ="sm"
                    width= "40%"
                    borderRadius="50"
                    bg="$InstockBlack"
                    color="white"
                    fontSize="mp3bodySmall"
                    lineHeight="mp3bodySmall"
                    fontWeight="400"
                    fontFamily="Titillium Web"
                >
                    Warehouse
                </Button>
                <Button
                    size ="sm"
                    width= "40%"
                    borderRadius="50"
                    bg="$InstockBlack"
                    color="white"
                    fontSize="mp3bodySmall"
                    lineHeight="mp3bodySmall"
                    fontWeight="400"
                    fontFamily="Titillium Web"
                >
                    Inventory
                </Button>
            </Stack>
        </Box>
    );
}

export default Header;
