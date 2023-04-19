import { extendTheme } from '@chakra-ui/react';
import { modalTheme } from './modal';

export const themes = extendTheme({
    breakpoints: {
        sm: '320px',
        md: '768px',
        lg: '960px',
        xl: '1280px',
    },
    colors: {
        $InstockBlack: '#13182C',
        $InstockIndigo: '#2e66e5',
        $White: '#FFFFFF',

        //Secondary Colors
        $Slate: '#5C667E',
        $Cloud: '#BDC5D5',

        //Background Colors
        $Graphite: '#232940',
        $LightGrey: '#f7f8f9',

        //Supporting Colors:
        $Green: '#158463',
        $Red: '#C94515',
    },

    fonts: {
        heading: 'Titillium Web',
        body: 'Titillium Web',
        mono: 'Titillium Web',
    },
    fontWeights: {
        normal: 400,
        semibold: 600,
        bold: 700,
    },
    // textStyles: {              //code to refractor
    //     regularfont: {
    //         fontFamily: 'Titillium Web',
    //         fontWeight: 400
    //     },
    //     semifont: {
    //         fontFamily: 'Titillium Web',
    //         fontWeight: 'semibold'
    //     },
    //     boldfont: {
    //         fontFamily: 'Titillium Web',
    //         fontWeight: 'bold'
    //     }

    // },

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
    lineHeights: {
        h1PageHeader: '2.5rem',
        h2SubHeader: '2rem',
        h3Labels: '1.375rem',
        h4TableHeader: '1.125rem',
        p1BodyLarge: '1.75rem',
        p2bodyMedium: '1.375rem',
        p3bodySmall: '1.125rem',

        mh1PageHeader: '2.25rem',
        mh2SubHeader: '1.75rem',
        mh3Labels: '1.25rem',
        mh4TableHeader: '1.125rem',
        mp1BodyLarge: '1.625rem',
        mp2bodyMedium: '1.25rem',
        mp3bodySmall: '0.688rem',
    },
    components: {
        Heading: {
            baseStyle: {
                color: '$InstockBlack',
            },
        },
        Button: {
            variants: {
                tab: {
                    justifyContent: 'start',
                    textTransform: 'uppercase',
                    color: '$Slate',
                    fontWeight: 'bold',
                    fontSize: 'h4TableHeader',
                    lineHeight: 'h4TableHeader',
                    bg: '',
                    h: '',
                    p: '0',
                    _hover: {
                        bg: '',
                    },
                    _active: {
                        bg: '',
                    },
                },
            },
        },
        Modal: modalTheme,
    },
});
