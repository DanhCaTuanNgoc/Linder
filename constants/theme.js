export const COLORS = {
   primary: '#8d39ec',
   secondary: '#ea80fc',
   tertiary: '#7827e6',
   lightPurple: '#c098e8',

   // Additional shades
   lightYellow: '#FFE169',
   paleOrange: '#FFBB5C',

   //gaytheme

   // Common colors
   white: '#FFFFFF',
   black: '#000000',
   border: '#ddd',
   backgroundContent: '#FFFAF0', // Light cream background
   backgroundButton: '#FFC629',
   textColor: '#333',

   //Alert colors
   alertSuccess: '#228B25',
   alertFail: '#FF0000',

   //Card
   heart: '#f64668',
}

export const SIZES = {
   xSmall: 10,
   small: 12,
   medium: 16,
   large: 20,
   xLarge: 24,
   xxLarge: 32,
}

export const FONTS = {
   regular: {
      fontFamily: 'System',
      fontWeight: '400',
   },
   medium: {
      fontFamily: 'System',
      fontWeight: '500',
   },
   bold: {
      fontFamily: 'System',
      fontWeight: '700',
   },
}

const theme = { COLORS, SIZES, FONTS }

export default theme
