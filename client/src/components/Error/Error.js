import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Flex, Text, Button } from "@chakra-ui/react";

export default function Error() {
	const navigate = useNavigate();

	const handleClickHome = () => navigate(`/`);

	return (
        <Box
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
                className="not-found"
                justifyContent="center"
                alignItems="center"
                direction="column"
                p="5rem"
            >
                <Text
                    color="$InstockBlack"
                    pb="3rem"
                    fontSize={{
                        base: "mp2bodyMedium",
                        md: "p2bodyMedium",
                    }}
                    lineHeight={{
                        base: "mp2bodyMedium",
                        md: "p2bodyMedium",
                    }}
                    align="center"
                >
                    The Page your are looking for has not been found!<br></br> Click the button below to
                    return to the Homepage.
                </Text>
                <Button
                    onClick={handleClickHome}
                    bg="$InstockIndigo"
                    color="$White"
                    variant="solid"
                    borderRadius="20px"
                    _hover={{ bg: "$Graphite" }}
                    w={{ base: "100%", md: "200px" }}
                >
                    Home
                </Button>
            </Flex>
        </Box>
	);
}
