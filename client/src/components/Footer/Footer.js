import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

function Footer() {
    return (
        <Flex
            bg="$White"
            width="100%"
            textAlign="center"
            position="sticky"
            bottom="0"
            zIndex={0}
        >
            <Text
                fontSize={{ sm: 'mp3bodySmall', md: 'p3bodySmall', lg: 'p3bodySmall' }}
                fontWeight={{ sm: '400', md: '400', lg: '400' }}
                lineHeight={{ sm: 'mp3bodySmall', md: 'p3bodySmall', lg: 'p3bodySmall' }}
                margin="auto"
            >© InStock Inc. All Rights reserved.
            </Text>
        </Flex>
    );
}

export default Footer;
