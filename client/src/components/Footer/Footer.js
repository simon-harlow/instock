import React from 'react';
import { Box, Text} from '@chakra-ui/react';

function Footer() {
    return <Box
            position="relative"
            bg="$White"
            width= "100%"
            height= "90vh"
            textAlign="center"
            
            >
                <Text
                    position="absolute"
                    fontSize={{sm:"mp3bodySmall", md:"p3bodySmall", lg:"p3bodySmall"}}
                    fontWeight={{sm:"400", md:"400", lg:"400"}}
                    lineHeight={{sm:"mp3bodySmall", md:"p3bodySmall", lg:"p3bodySmall"}}
                    bottom ="5%"
                    left = "0"
                    right = "0"
                    >@ InStock Inc. All Rights reserved.
                </Text>
            </Box>
}

export default Footer;
