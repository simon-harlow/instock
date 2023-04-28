import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import { InputMask }  from "react-input-mask";

import { API_ADDRESS } from "../axios";
import { ArrowBack, AddWhite, Error, Edit } from '../../assets/modifiedIcons'

import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Box, Flex, Heading, Button } from '@chakra-ui/react'
import { useToast } from "@chakra-ui/react";

function WarehouseForm() {
	// check for existence of warehouseId, if true then render edit warehouse and not add new warehouse
	const { warehouseId } = useParams();
	const isEdit = !!warehouseId;

	// state for input fields
	const [warehouse_name, setWarehouseName] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [country, setCountry] = useState("");
	const [contact_name, setContactName] = useState("");
	const [contact_position, setContactPosition] = useState("");
	const [contact_phone, setContactPhoneNumber] = useState("");
	const [contact_email, setContactEmail] = useState("");

	const [phoneNumberInputActive, setPhoneNumberInputActive] = useState(false);
	const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");
	const [formErrors, setFormErrors] = useState();

	// navigation handlers
	const navigate = useNavigate();
	const formRedirect = () => navigate(`/warehouses`);
	const backPage = () => navigate(-1);
	// toast for successful post or put request - helpful for user to know its worked
	const toast = useToast();

	useEffect(() => {
		// Only get data if isEdit is true
		if (isEdit) {
			axios
				.get(`${API_ADDRESS}/api/warehouses/${warehouseId}`)
				.then((response) => {
					const data = response.data;
					console.log(data);
					setWarehouseName(data.warehouse_name);
					setAddress(data.address);
					setCity(data.city);
					setCountry(data.country);
					setContactName(data.contact_name);
					setContactPosition(data.contact_position);
					setContactPhoneNumber(data.contact_phone);
					setFormattedPhoneNumber(data.contact_phone);
					setContactEmail(data.contact_email);
				})
				.catch((error) => {
					console.error("Error fetching warehouse data:", error);
				});
		}
	}, [isEdit, warehouseId]);

	// input handlers
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
		setContactName(event.target.value);
	};

	const handleContactPositionChange = (event) => {
		setContactPosition(event.target.value);
	};

	const handleContactPhoneNumberChange = (event) => {
		const inputPhoneNumber = event.target.value;
		const formattedNumber = formatPhoneNumber(inputPhoneNumber);
		setFormattedPhoneNumber(formattedNumber);
		setContactPhoneNumber(inputPhoneNumber);
	};

	const handleContactEmailChange = (event) => {
		setContactEmail(event.target.value);
	};

	const handlePhoneNumberInputFocus = () => {
		setPhoneNumberInputActive(true);
	};

	const handlePhoneNumberInputBlur = () => {
		setPhoneNumberInputActive(false);
	};

	// phone number format checker
	const formatPhoneNumber = (phoneNumber) => {
		const cleaned = phoneNumber.replace(/\D/g, "");
		const match = cleaned.match(/^(\d{1})(\d{0,3})(\d{0,3})(\d{0,4})$/);
		if (match) {
			return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
		}
		return "";
	};

	// validators
	const isValidPhoneNumber = (phoneNumber) => {
		const phoneFormat = /^\+\d\s\(\d{3}\)\s\d{3}\-\d{4}$/;
		return phoneFormat.test(phoneNumber);
	};

	const isValidEmail = (email) => {
		const emailFormat =
			/^[a-zA-Z0-9]+([\.\-\_]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\.\-]?[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]{2,3})$/;
		return emailFormat.test(email);
	};

	const isFormValid = () => {
		const errors = [];

		if (!warehouse_name.trim()) {
			errors.push("Warehouse Name is required");
		}
		if (!address.trim()) {
			errors.push("Street Address is required");
		}
		if (!city.trim()) {
			errors.push("City is required");
		}
		if (!country.trim()) {
			errors.push("Country is required");
		}
		if (!contact_name.trim()) {
			errors.push("Contact Name is required");
		}
		if (!contact_position.trim()) {
			errors.push("Contact Position is required");
		}
		if (!isValidPhoneNumber(contact_phone)) {
			errors.push("Invalid phone number");
		}
		if (!isValidEmail(contact_email)) {
			errors.push("Invalid email address");
		}
		return errors;
	};

	// handler for adding new warehouse
	const handleFormSubmit = (event) => {
		event.preventDefault();
		const errors = isFormValid();

		if (errors.length === 0) {
			const data = {
				warehouse_name,
				address,
				city,
				country,
				contact_name,
				contact_position,
				contact_phone,
				contact_email,
			};

			const method = isEdit ? "put" : "post";
			const url = isEdit
				? `${API_ADDRESS}/api/warehouses/${warehouseId}`
				: `${API_ADDRESS}/api/warehouses`;

			axios[method](url, data)
				.then(() => {
					setFormErrors(null);
					setWarehouseName("");
					setAddress("");
					setCity("");
					setCountry("");
					setContactName("");
					setContactPosition("");
					setContactPhoneNumber("");
					setContactEmail("");
					formRedirect();
					if (isEdit) {
						toast({
							title: "Warehouse Updated!",
							description:
								"Warehouse has been successfully updated.",
							status: "success",
							duration: 5000,
							isClosable: true,
							bg: "$Green",
							color: "$White",
						});
					} else {
						toast({
							title: "Warehouse Added!",
							description:
								"Warehouse has been successfully added.",
							status: "success",
							duration: 5000,
							isClosable: true,
							bg: "$Green",
							color: "$White",
						});
					}
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			setFormErrors(errors);
		}
	};

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
			maxH={{ base: 'auto', md: '650px' }}
		>
			<Flex
				direction="row"
				alignItems={{ base: "baseline" }}
				justify={{ base: "flex-start", md: "flex-start" }}
				px={{ base: "1rem", md: "2rem" }}
				py="1rem"
				borderBottom="1px solid"
				borderBottomColor="$Cloud"
				h={{ md: '93px' }}
			>
				<ArrowBack
					onClick={backPage}
					cursor="pointer"
					boxSize={6}
					color="$InstockIndigo"
				/>
				<Heading
					as="h1"
					size="lg"
					pl="0.5rem"
					py="1rem"
					fontSize={{ base: "mh1PageHeader", md: "h1PageHeader" }}
					lineHeight={{ base: "mh1PageHeader", md: "h1PageHeader" }}
				>
					{isEdit ? "Edit Warehouse" : "Add New Warehouse"}
				</Heading>
			</Flex>
			<form onSubmit={handleFormSubmit}>
				<Flex
					flexDirection={{ base: "column", md: "row" }}
					justifyContent="space-between"
					alignItems="flex-start"
					flexWrap={{ base: "nowrap", md: "wrap" }}
					pt="1rem"
				>
					<Box
						flex="1"
						w={{ base: "100%" }}
						px={{ base: "1rem", md: "2rem" }}
						pb={{ base: "2rem", md: "1rem" }}
						borderBottom={{ base: "1px solid", md: "none" }}
						borderRight={{ base: "none", md: "1px solid" }}
						borderColor={{ base: "$Cloud", md: "$Cloud" }}
						width={{ base: "100%", md: "50%" }}
					>
						<Heading
							as="h2"
							size="lg"
							fontSize={{
								base: "mh2SubHeader",
								md: "h2SubHeader",
							}}
							lineHeight={{
								base: "mh2SubHeader",
								md: "h2SubHeader",
							}}
						>
							Warehouse Details
						</Heading>

						<FormControl
							isInvalid={
								formErrors &&
								formErrors.includes(
									"Warehouse Name is required"
								)
							}
							name="warehouse_name"
							id="warehouse_name"
							mt={4}
						>
							<FormLabel
								as="h3"
								fontSize={{ base: "mh3Labels", md: "h3Labels" }}
								lineHeight={{
									base: "mh3Labels",
									md: "h3Labels",
								}}
							>
								Warehouse Name
							</FormLabel>
							<Input
								onChange={handleWarehouseNameChange}
								maxLength={50}
								type="text"
								borderRadius="20px"
								focusBorderColor="$InstockIndigo"
								errorBorderColor="$Red"
								fontSize={{
									base: "mp2bodyMedium",
									md: "p2bodyMedium",
								}}
								lineHeight={{
									base: "mp2bodyMedium",
									md: "p2bodyMedium",
								}}
								placeholder="Warehouse Name"
								value={warehouse_name}
							/>
							<FormErrorMessage>
								<Error mr="1" />{" "}
								{formErrors &&
									formErrors.includes(
										"Warehouse Name is required"
									) &&
									"This field is required"}
							</FormErrorMessage>
						</FormControl>

						<FormControl
							isInvalid={
								formErrors &&
								formErrors.includes(
									"Street Address is required"
								)
							}
							name="address"
							id="address"
							mt={4}
						>
							<FormLabel
								as="h3"
								fontSize={{ base: "mh3Labels", md: "h3Labels" }}
								lineHeight={{
									base: "mh3Labels",
									md: "h3Labels",
								}}
							>
								Street Address
							</FormLabel>
							<Input
								onChange={handleAddressChange}
								maxLength={50}
								type="text"
								borderRadius="20px"
								focusBorderColor="$InstockIndigo"
								errorBorderColor="$Red"
								fontSize={{
									base: "mp2bodyMedium",
									md: "p2bodyMedium",
								}}
								lineHeight={{
									base: "mp2bodyMedium",
									md: "p2bodyMedium",
								}}
								placeholder="Street Address"
								value={address}
							/>
							<FormErrorMessage>
								<Error mr="1" />{" "}
								{formErrors &&
									formErrors.includes(
										"Street Address is required"
									) &&
									"This field is required"}
							</FormErrorMessage>
						</FormControl>

						<FormControl
							isInvalid={
								formErrors &&
								formErrors.includes("City is required")
							}
							name="city"
							id="city"
							mt={4}
						>
							<FormLabel
								as="h3"
								fontSize={{ base: "mh3Labels", md: "h3Labels" }}
								lineHeight={{
									base: "mh3Labels",
									md: "h3Labels",
								}}
							>
								City
							</FormLabel>
							<Input
								onChange={handleCityChange}
								maxLength={50}
								type="text"
								borderRadius="20px"
								focusBorderColor="$InstockIndigo"
								errorBorderColor="$Red"
								fontSize={{
									base: "mp2bodyMedium",
									md: "p2bodyMedium",
								}}
								lineHeight={{
									base: "mp2bodyMedium",
									md: "p2bodyMedium",
								}}
								placeholder="City"
								value={city}
							/>
							<FormErrorMessage>
								<Error mr="1" />{" "}
								{formErrors &&
									formErrors.includes("City is required") &&
									"This field is required"}
							</FormErrorMessage>
						</FormControl>

						<FormControl
							isInvalid={
								formErrors &&
								formErrors.includes("Country is required")
							}
							name="country"
							id="country"
							mt={4}
						>
							<FormLabel
								as="h3"
								fontSize={{ base: "mh3Labels", md: "h3Labels" }}
								lineHeight={{
									base: "mh3Labels",
									md: "h3Labels",
								}}
							>
								Country
							</FormLabel>
							<Input
								onChange={handleCountryChange}
								maxLength={50}
								type="text"
								borderRadius="20px"
								focusBorderColor="$InstockIndigo"
								errorBorderColor="$Red"
								fontSize={{
									base: "mp2bodyMedium",
									md: "p2bodyMedium",
								}}
								lineHeight={{
									base: "mp2bodyMedium",
									md: "p2bodyMedium",
								}}
								placeholder="Country"
								value={country}
							/>
							<FormErrorMessage>
								<Error mr="1" />{" "}
								{formErrors &&
									formErrors.includes(
										"Country is required"
									) &&
									"This field is required"}
							</FormErrorMessage>
						</FormControl>
					</Box>
					<Box
						flex="1"
						w="100%"
						px={{ base: "1rem", md: "2rem" }}
						pt={{ base: "2rem", md: "0" }}
						width={{ base: "100%", md: "50%" }}
					>
						<Heading
							as="h2"
							size="lg"
							fontSize={{
								base: "mh2SubHeader",
								sm: "mh2SubHeader",
								md: "h2SubHeader",
							}}
							lineHeight={{
								base: "mh2SubHeader",
								sm: "mh2SubHeader",
								md: "h2SubHeader",
							}}
						>
							Contact Details
						</Heading>

						<FormControl
							isInvalid={
								formErrors &&
								formErrors.includes("Contact Name is required")
							}
							name="contact_name"
							id="contact_name"
							mt={4}
						>
							<FormLabel
								as="h3"
								fontSize={{ base: "mh3Labels", md: "h3Labels" }}
								lineHeight={{
									base: "mh3Labels",
									md: "h3Labels",
								}}
							>
								Contact Name
							</FormLabel>
							<Input
								onChange={handleContactNameChange}
								maxLength={50}
								name="contact_name"
								id="contact_name"
								type="text"
								borderRadius="20px"
								focusBorderColor="$InstockIndigo"
								errorBorderColor="$Red"
								fontSize={{
									base: "mp2bodyMedium",
									md: "p2bodyMedium",
								}}
								lineHeight={{
									base: "mp2bodyMedium",
									md: "p2bodyMedium",
								}}
								placeholder="Contact Name"
								value={contact_name}
							/>
							<FormErrorMessage>
								<Error mr="1" />{" "}
								{formErrors &&
									formErrors.includes(
										"Contact Name is required"
									) &&
									"This field is required"}
							</FormErrorMessage>
						</FormControl>

						<FormControl
							isInvalid={
								formErrors &&
								formErrors.includes(
									"Contact Position is required"
								)
							}
							name="contact_position"
							id="contact_position"
							mt={4}
						>
							<FormLabel
								as="h3"
								fontSize={{ base: "mh3Labels", md: "h3Labels" }}
								lineHeight={{
									base: "mh3Labels",
									md: "h3Labels",
								}}
							>
								Position
							</FormLabel>
							<Input
								onChange={handleContactPositionChange}
								maxLength={50}
								type="text"
								borderRadius="20px"
								focusBorderColor="$InstockIndigo"
								errorBorderColor="$Red"
								fontSize={{
									base: "mp2bodyMedium",
									md: "p2bodyMedium",
								}}
								lineHeight={{
									base: "mp2bodyMedium",
									md: "p2bodyMedium",
								}}
								placeholder="Position"
								value={contact_position}
							/>
							<FormErrorMessage>
								<Error mr="1" />{" "}
								{formErrors &&
									formErrors.includes(
										"Contact Position is required"
									) &&
									"This field is required"}
							</FormErrorMessage>
						</FormControl>

						<FormControl
							isInvalid={
								formErrors &&
								formErrors.includes("Invalid phone number")
							}
							name="contact_phone"
							id="contact_phone"
							mt={4}
						>
							<FormLabel
								as="h3"
								fontSize={{ base: "mh3Labels", md: "h3Labels" }}
								lineHeight={{
									base: "mh3Labels",
									md: "h3Labels",
								}}
							>
								Phone Number
							</FormLabel>
							<Input
								onChange={handleContactPhoneNumberChange}
								onFocus={handlePhoneNumberInputFocus}
								onBlur={handlePhoneNumberInputBlur}
								as={InputMask}
								maxLength={17}
								borderRadius="20px"
								focusBorderColor="$InstockIndigo"
								errorBorderColor="$Red"
								fontSize={{
									base: "mp2bodyMedium",
									md: "p2bodyMedium",
								}}
								lineHeight={{
									base: "mp2bodyMedium",
									md: "p2bodyMedium",
								}}
								placeholder="Phone Number"
								value={formattedPhoneNumber}
							/>
							{phoneNumberInputActive && (
								<FormHelperText>
									<Edit mr="1" /> must be in format +1 (123)
									123-1234
								</FormHelperText>
							)}
							<FormErrorMessage>
								<Error mr="1" />{" "}
								{formErrors &&
									formErrors.includes(
										"Invalid phone number"
									) &&
									"Invalid phone number"}
							</FormErrorMessage>
						</FormControl>

						<FormControl
							isInvalid={
								formErrors &&
								formErrors.includes("Invalid email address")
							}
							name="contact_email"
							id="contact_email"
							mt={4}
						>
							<FormLabel
								as="h3"
								fontSize={{ base: "mh3Labels", md: "h3Labels" }}
								lineHeight={{
									base: "mh3Labels",
									md: "h3Labels",
								}}
							>
								Email
							</FormLabel>
							<Input
								onChange={handleContactEmailChange}
								maxLength={50}
								type="text"
								borderRadius="20px"
								focusBorderColor="$InstockIndigo"
								errorBorderColor="$Red"
								fontSize={{
									base: "mp2bodyMedium",
									md: "p2bodyMedium",
								}}
								lineHeight={{
									base: "mp2bodyMedium",
									md: "p2bodyMedium",
								}}
								placeholder="Email"
								value={contact_email}
							/>
							<FormErrorMessage>
								<Error mr="1" />{" "}
								{formErrors &&
									formErrors.includes(
										"Invalid email address"
									) &&
									"Invalid email address"}
							</FormErrorMessage>
						</FormControl>
					</Box>
					<Flex
						mt={8}
						gap={4}
						px={{ base: "1rem", md: "2rem" }}
						width="100%"
						bg="$LightGrey"
						justifyContent="flex-end"
						p="1rem"
						alignItems={{ base: "center" }}
						justify={{ base: "space-between", md: "flex-end" }}
					>
						<Button
							onClick={backPage}
							flex={{ base: "1", md: "none" }}
							h={{ base: "36px", md: "38px" }}
							borderRadius="20px"
							variant="outline"
							bg="$White"
							_hover={{
								color: "$InstockIndigo",
								borderColor: "$InstockIndigo",
							}}
						>
							Cancel
						</Button>
						{isEdit ? (
							<Button
								type="submit"
								flex={{ base: "1", md: "none" }}
								h={{ base: "36px", md: "38px" }}
								borderRadius="20px"
								variant="outline"
								bg="$InstockIndigo"
								color="$White"
								_hover={{ bg: "$InstockBlack" }}
							>
								Save
							</Button>
						) : (
							<Button
								leftIcon={<AddWhite />}
								type="submit"
								flex={{ base: "1", md: "none" }}
								h={{ base: "36px", md: "38px" }}
								borderRadius="20px"
								variant="outline"
								bg="$InstockIndigo"
								color="$White"
								_hover={{ bg: "$InstockBlack" }}
							>
								Add Warehouse
							</Button>
						)}
					</Flex>
				</Flex>
			</form>
		</Box>
	);
}

export default WarehouseForm;
