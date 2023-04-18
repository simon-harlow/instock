import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const md = defineStyle({
    fontSize: ['28px', '32px'],
});

const sm = defineStyle({
    h: '262px',
});

const sizes = {
    full: definePartsStyle({ header: {fontSize: '28px'}, dialog: sm }),
    md: definePartsStyle({ header: {fontSize: '32px'}, dialog: sm }),
};

export const modalTheme = defineMultiStyleConfig({
    sizes,
});
