import React from 'react';
import { Box, Flex, Text} from '@chakra-ui/react';

function Footer() {
    return <Flex
            position="fixed"
            bottom="0"
            bg="$White"
            width= "100%"
            textAlign="center"
            justifyContent="center"
            p="2rem"
            >
                <Text
                    fontSize={{sm:"mp3bodySmall", md:"p3bodySmall", lg:"p3bodySmall"}}
                    fontWeight={{sm:"400", md:"400", lg:"400"}}
                    lineHeight={{sm:"mp3bodySmall", md:"p3bodySmall", lg:"p3bodySmall"}}
                    >© InStock Inc. All Rights reserved.
                </Text>
            </Flex>
}

export default Footer;
