import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const sizes = {
    full: definePartsStyle({
        header: { fontSize: '28px', lineHeight: '36px', pt: '60px', px: '16px', pb: '0' },
        body: { fontSize: '15px', lineHeight: '26px', pt: '16px', px: '16px', pb: '0' },
        footer: { px: '16px', pb: '24px' },
    }),
    xl: definePartsStyle({
        header: { fontSize: '32px', lineHeight: '40px', pt: '40px', px: '64px', pb: '0' },
        body: { fontSize: '16px', lineHeight: '28px', pt: '16px', px: '64px', pb: '0' },
        footer: { pt: '32px', pb: '40px' },
        dialog: { maxWidth: '672px' },
    }),
};

export const modalTheme = defineMultiStyleConfig({
    sizes,
});
