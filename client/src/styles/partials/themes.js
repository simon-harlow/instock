import { extendTheme } from '@chakra-ui/react';

export const newTheme = extendTheme({
    breakpoints: {
        sm: "320px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
    },
    colors: {
        $InstockBlack: '#13182C',
        $InstockIndigo: '#2e66e5',
        $White: '#FFFFFF',

        //Secondary Colors
        $Slate: '5C667E',
        $Cloud: 'BDC5D5',

        //Background Colors
        $Graphite: '232940',
        $LightGrey: 'f7f8f9',

        //Supporting Colors:
        $Green: '158463',
        $Red: 'C94515',
    },
    fonts: {
        regular: "Titillium Regular",
        semi: "Titillium Semi",
        bold: "Titillium Bold",
    },

    fontSizes: {
        h1PageHeader: '2rem',
        h2SubHeader: '1.5rem',
        h3Labels: '0.875rem',
        h4TableHeader: '0.75rem',
        p1BodyLarge: '1rem',
        p2bodyMedium: '0.875rem',
        p3bodySmall: '0.75rem',

        mh1PageHeader: '1.75rem',
        mh2SubHeader: '1.25rem',
        mh3Labels: '0.813rem',
        mh4TableHeader: '0.75rem',
        mp1BodyLarge: '0.9.38rem',
        mp2bodyMedium: '0.813rem',
        mp3bodySmall: '0.688rem',
    },
});