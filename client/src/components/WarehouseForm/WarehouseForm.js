import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

import { API_URL } from "../Utils/const";
import { ArrowBack, AddWhite } from '../../assets/modifiedIcons'

import { Form, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Box, Flex, Heading, Button } from '@chakra-ui/react'

function WarehouseForm() {

    const [warehouse_name, setWarehouseName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [contact_name, setContactName] = useState("");
    const [contact_position, setContactPosition] = useState("");
    const [contact_phone, setContactPhoneNumber] = useState("");
    const [contact_email, setContactEmail] = useState("");

    const navigate = useNavigate();
    const handleCancelClick = () => navigate(-1);

    const handleWarehouseNameChange = (event) => {
        setWarehouseName(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    const handleContactNameChange = (event) => {
        setContactName(event.target.value)
    };

    const handleContactPositionChange = (event) => {
        setContactPosition(event.target.value);
    };

    const handleContactPhoneNumberChange = (event) => {
        setContactPhoneNumber(event.target.value);
    };

    const handleContactEmailChange = (event) => {
        setContactEmail(event.target.value);
    }

    const isFormValid = () => {
        // TO DO: Check if the fields are all filled
        if (!warehouse_name ||
            !address ||
            !city ||
            !country ||
            !contact_name ||
            !contact_position ||
            !contact_phone ||
            !contact_email) {
            return false;
        }
        return true;
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (isFormValid()) {
            axios.post(
                `${API_URL}/warehouses`,
                {
                    warehouse_name,
                    address,
                    city,
                    country,
                    contact_name,
                    contact_position,
                    contact_phone,
                    contact_email
                }
            )
            .then(() => {
                setWarehouseName("");
                setAddress("");
                setCity("");
                setCountry("");
                setContactName("");
                setContactPosition("");
                setContactPhoneNumber("");
                setContactEmail("");
                // navigate back to warehouses
            })
            .catch((error) => {
                console.error(error);
            });
        } else {
            alert("Failed to sign up, you have errors in your form");
        }
    };

    return (
        <Box maxW="1020px" mx={{ base: '0', xl: 'auto' }} boxShadow='base' bg="$White" position="absolute" top="7rem" left={{ base: '4', sm: '4', md: '8', xl: '0' }} right={{ base: '4', sm: '4', md: '8', xl: '0' }} zIndex="2" borderRadius="5px">
            <Flex direction="row" alignItems={{ base: 'baseline' }} justify={{ base: 'flex-start', md: 'flex-start' }} px={{ base: '1rem', md: '1rem' }} py="1rem" borderBottom="1px solid" borderBottomColor="$Cloud">
                <ArrowBack onClick={handleCancelClick} cursor="pointer" boxSize={6} color="$InstockIndigo"/>
                <Heading as="h1" size="lg" pl="0.5rem" py="1rem" fontSize={{ base: 'mh1PageHeader', sm: 'mh1PageHeader', md: 'h1PageHeader' }} lineHeight={{ base: 'mh1PageHeader', sm: 'mh1PageHeader', md: 'h1PageHeader' }}>
                    Add New Warehouse
                </Heading>
            </Flex>
            <form onSubmit={handleFormSubmit}>
                {/* TODO: add ui error messages as per design
                    TODO: add styling to input labels
                    TODO: add other rules such as char limits
                     */}
                <Flex flexDirection={{base: "column"}} justifyContent="space-between" alignItems="flex-start" py="1rem">
                    <Box flex="1" w="100%" px="1rem" pb="2rem" borderBottom="1px solid" borderBottomColor="$Cloud">
                        <Heading as="h2" size="lg" fontSize={{ base: 'mh2SubHeader', sm: 'mh2SubHeader', md: 'h2SubHeader' }}>Warehouse Details</Heading>
                        <FormControl name="warehouse_name" id="warehouse_name" mt={4}>
                            <FormLabel>Warehouse Name</FormLabel>
                                <Input onChange={handleWarehouseNameChange} type="text" borderRadius="20px" placeholder='Warehouse Name'/>
                        </FormControl>
                        <FormControl name="address" id="address" mt={4}>
                            <FormLabel>Street Address</FormLabel>
                                <Input onChange={handleAddressChange} type="text" borderRadius="20px" placeholder='Street Address'/>
                        </FormControl>
                        <FormControl name="city" id="city" mt={4}>
                            <FormLabel>City</FormLabel>
                                <Input onChange={handleCityChange} type="text" borderRadius="20px" placeholder='City'/>
                        </FormControl>
                        <FormControl name="country" id="country" mt={4}>
                            <FormLabel>Country</FormLabel>
                                <Input onChange={handleCountryChange} type="text" borderRadius="20px" placeholder='Country'/>
                        </FormControl>
                    </Box>
                    <Box flex="1" w="100%" px="1rem" pt="2rem">
                        <Heading as="h2" size="lg" fontSize={{ base: 'mh2SubHeader', sm: 'mh2SubHeader', md: 'h2SubHeader' }}>Contact Details</Heading>
                        <FormControl name="contact_name" id="contact_name" mt={4}>
                            <FormLabel>Contact Name</FormLabel>
                                <Input onChange={handleContactNameChange} name="contact_name" id="contact_name" type="text" borderRadius="20px" placeholder='Contact Name'/>
                        </FormControl>
                        <FormControl name="contact_position" id="contact_position" mt={4}>
                            <FormLabel>Position</FormLabel>
                                <Input onChange={handleContactPositionChange} type="text" borderRadius="20px" placeholder='Position'/>
                        </FormControl>
                        <FormControl name="contact_phone" id="contact_phone" mt={4}>
                            <FormLabel>Phone Number</FormLabel>

                            {/* TODO: force phone number syntax */}
                                <Input onChange={handleContactPhoneNumberChange} type="text" borderRadius="20px" placeholder='Phone Number'/>
                        </FormControl>
                        <FormControl name="contact_email" mt={4}>
                            <FormLabel>Email</FormLabel>
                            {/* TODO: force email syntax */}
                                <Input onChange={handleContactEmailChange} type="email" borderRadius="20px" placeholder='Email'/>
                            <FormErrorMessage>
                                Email is required.
                            </FormErrorMessage>
                        </FormControl>
                    </Box>
                    <Flex mt={8} gap={4} width="100%" bg="$LightGrey" justifyContent="flex-end" p="1rem" alignItems={{ base: 'center' }} justify={{ base: 'space-between', md: 'flex-start' }}>
                        <Button onClick={handleCancelClick} flex="1" h="36px" borderRadius="20px" variant="outline" bg="$White" _hover={{ bg: '' }}>
                            Cancel
                        </Button>
                        <Button leftIcon={<AddWhite />} type="submit" flex="1" h="36px" borderRadius="20px" variant="outline" bg="$InstockIndigo" color="$White" _hover={{ bg: '' }}>
                            Add Warehouse
                        </Button>
                    </Flex>
                </Flex>
            </form>
        </Box>
    )
}

export default WarehouseForm;
