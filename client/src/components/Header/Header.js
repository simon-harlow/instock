import React from 'react';
import { Box, Image, Stack, Button, Link} from '@chakra-ui/react';
import Logo2 from '../../assets/Logo/InStock-Logo_2x.png';

function Header() {
    return (
        <Box
            bg ="$Graphite"
            width ="100%"
            height={{sm: "200", md: "20vh"}}
            pb={{sm: "20%", md: "100px", lg: "120px"}}
            align="center"
            px={{sm: null, md: "5", lg: "90px" }}
            display={{sm: null, md: "flex"}}
            justifyContent={{sm: "center", md: "space-between", lg:  "space-between"}}
        >
            <Image 
            py={{sm: "5%", md:"revert"}}
            width={{sm: "100px", md:"125px", lg: "100px"}}
            objectFit="contain"
            src={Logo2} 
            />
            <Stack
                spacing ={2}
                direction = "row"
                align= {{sm: "center", md: null}}
                justifyContent={{ sm: "space-evenly",  md: "space-evenly", lg: "space-evenly"}}
            ><Link href={`/warehouses/`}>
                <Button
                    h={{sm:"7", md:"9", lg:"8"}}
                    width= {{sm:"125px", md: "110px", lg:"80px" }}
                    borderRadius="50"
                    bg="$InstockBlack"
                    color="white"
                    fontSize={{sm: "mp3bodySmall", md: "p3bodySmall"}}
                    lineHeight={{sm: "mp3bodySmall", md: "p3bodySmall"}}
                    fontWeight="400"
                    fontFamily="Titillium Web"
                >
                    Warehouses
                </Button>
            </Link>
            <Link href={`/inventories/`}>
                <Button
                    h={{sm:"7", md:"9",  lg:"8"}}
                    width= {{sm:"125px", md: "110px", lg: "80px"}}
                    borderRadius="50"
                    bg="$InstockBlack"
                    color="white"
                    fontSize={{sm: "mp3bodySmall", md: "p3bodySmall"}}
                    lineHeight={{sm: "mp3bodySmall", md: "p3bodySmall"}}
                    fontWeight="400"
                    fontFamily="Titillium Web"
                >
                    Inventory
                </Button>
                </Link>
            </Stack>
        </Box>
    );
}

export default Header;
