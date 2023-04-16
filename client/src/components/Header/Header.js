import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import Logo2 from '../../assets/Logo/InStock-Logo_2x.png';

function Header() {
    return (
        <Flex>
            <Image src={Logo2} />
        </Flex>
    );
}

export default Header;
