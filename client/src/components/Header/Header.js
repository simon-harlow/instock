import React from 'react';
import { Box, Image, Stack, Button, Link} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import Logo2 from '../../assets/Logo/InStock-Logo_2x.png';

function Header() {
    return (
        <Box
            bg ="$Graphite"
            width ="100%"
            height={{sm: "200px", md: "186px"}}
            pb={{md: "90px"}}
            align="center"
            px={{sm: "4", md: "8", xl: "130px" }}
            display={{sm: null, md: "flex"}}
            justifyContent={{sm: "center", md: "space-between"}}
        >
            <Image 
            py={{sm: "6%", md:"revert"}}
            width={{sm: "128px", md:"128px", lg: "128px"}}
            objectFit="contain"
            src={Logo2} 
            />
            <Stack
                spacing ={2}
                direction = "row"
                align= {{sm: "center", md: null}}
                justifyContent={{ sm: "space-evenly",  md: "space-evenly", lg: "space-evenly"}}
            >
            <Link
                to="/warehouses/"
                as={NavLink}
                color="white"
                size="md"
                py="2"
                width={{sm: "164px", md:"107px"}}
                fontSize={{sm:"h3Labels"}}
                lineHeight={{sm:"h3Labels"}}
                borderRadius="20"
                _activeLink={{
                        bgColor:"$InstockBlack"

                        }}
            >
                Warehouses
            </Link>
            <Link
                to="/inventories/"
                as={NavLink}
                color="white"
                size="md"
                py="2"
                width={{sm: "164px", md:"107px"}}
                fontSize={{sm:"h3Labels"}}
                lineHeight={{sm:"h3Labels"}}
                borderRadius="20"
                _activeLink={{
                        bgColor:"$InstockBlack"

                        }}>
                Inventory
            </Link>
            </Stack>
        </Box>
    );
}

export default Header;
