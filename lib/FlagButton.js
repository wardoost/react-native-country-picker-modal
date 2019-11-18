import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, Platform, } from 'react-native';
import { Flag } from './Flag';
import { useContext } from './CountryContext';
import { CountryText } from './CountryText';
import { useTheme } from './CountryTheme';
const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    containerWithEmoji: {
        marginTop: 0,
    },
    containerWithoutEmoji: {
        marginTop: 5,
    },
    flagWithSomethingContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    something: { fontSize: 16 },
});
const FlagText = (props) => (React.createElement(CountryText, Object.assign({}, props, { style: styles.something })));
const FlagWithSomething = memo(({ countryCode, withEmoji, withCountryNameButton, withCurrencyButton, withCallingCodeButton, withFlagButton, flagSize, }) => {
    const { translation, getCountryNameAsync, getCountryCurrencyAsync, getCountryCallingCodeAsync, } = useContext();
    const [state, setState] = useState({
        countryName: '',
        currency: '',
        callingCode: '',
    });
    const { countryName, currency, callingCode } = state;
    useEffect(() => {
        if (withCountryNameButton) {
            getCountryNameAsync(countryCode, translation)
                .then((countryName) => setState({ ...state, countryName }))
                .catch(console.warn);
        }
        if (withCurrencyButton) {
            getCountryCurrencyAsync(countryCode)
                .then((currency) => setState({ ...state, currency }))
                .catch(console.warn);
        }
        if (withCallingCodeButton) {
            getCountryCallingCodeAsync(countryCode)
                .then((callingCode) => setState({ ...state, callingCode }))
                .catch(console.warn);
        }
    }, [withCountryNameButton, withCurrencyButton, withCallingCodeButton]);
    return (React.createElement(View, { style: styles.flagWithSomethingContainer },
        React.createElement(Flag, Object.assign({}, { withEmoji, countryCode, withFlagButton, flagSize: flagSize })),
        withCountryNameButton ? (React.createElement(FlagText, null, countryName + ' ')) : null,
        withCurrencyButton ? React.createElement(FlagText, null, `(${currency}) `) : null,
        withCallingCodeButton ? (React.createElement(FlagText, null, `+${callingCode}`)) : null));
});
export const FlagButton = ({ withEmoji, withCountryNameButton, withCallingCodeButton, withCurrencyButton, withFlagButton, countryCode, containerButtonStyle, onOpen, }) => {
    const { flagSizeButton: flagSize } = useTheme();
    return (React.createElement(TouchableOpacity, { activeOpacity: 0.7, onPress: onOpen },
        React.createElement(View, { style: [
                styles.container,
                withEmoji ? styles.containerWithEmoji : styles.containerWithoutEmoji,
                containerButtonStyle,
            ] },
            React.createElement(FlagWithSomething, Object.assign({}, {
                countryCode,
                withEmoji,
                withCountryNameButton,
                withCallingCodeButton,
                withCurrencyButton,
                withFlagButton,
                flagSize: flagSize,
            })))));
};
FlagButton.defaultProps = {
    withEmoji: Platform.OS === 'ios',
    withCountryNameButton: false,
    withCallingCodeButton: false,
    withCurrencyButton: false,
    withFlagButton: true,
};
//# sourceMappingURL=FlagButton.js.map