// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
    bgColor: string;
    cardColor: string;
    boardColor: string;
}
    export interface DarkTheme {
    color: string;
    backgroundColor: string;
    accentColor: string;
}
}