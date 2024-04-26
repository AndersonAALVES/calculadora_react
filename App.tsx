import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

interface State {
  displayValue: string;
  clearDisplay: boolean;
  operation: string | null;
  values: [number, number];
  current: number;
  usedDot: boolean;
}

const initialState: State = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
  usedDot: false
};

const App = () => {
  const [state, setState] = useState<State>({ ...initialState });

  const addDigit = (digit: string) => {
    if (digit === '.' && state.usedDot) {
      return;
    }

    const clearDisplay = state.displayValue === '0' || state.clearDisplay;
    const currentValue = clearDisplay ? '' : state.displayValue;
    const displayValue = currentValue + digit;

    setState(prevState => ({
      ...prevState,
      displayValue,
      clearDisplay: false,
      usedDot: digit === '.'
    }));

    if (digit !== '.') {
      const newValue = parseFloat(displayValue);
      const values = [...state.values];
      values[state.current] = newValue;
      setState(prevState => ({ ...prevState, values }));
    }
  };

  const clearDisplay = () => {
    setState(prevState => ({ ...prevState, displayValue: '0', clearDisplay: false, usedDot: false }));
  };

  const setOperation = (operation: string) => {
    if (state.current === 0) {
      setState(prevState => ({ ...prevState, operation, current: 1, clearDisplay: true }));
    } else {
      const equals = operation === '=';
      const values = [...state.values];
      try {
        values[0] = eval(`${values[0]} ${state.operation} ${values[1]}`);
      } catch (error) {
        console.error("Erro ao calcular:", error);
        values[0] = state.values[0];
      }

      values[1] = 0;

      setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: true,
        values,
        usedDot: false
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Display value={state.displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" triple onClick={clearDisplay} />
        <Button label="/" operation onClick={() => setOperation('/')} />
        <Button label="7" onClick={() => addDigit('7')} />
        <Button label="8" onClick={() => addDigit('8')} />
        <Button label="9" onClick={() => addDigit('9')} />
        <Button label="*" operation onClick={() => setOperation('*')} />
        <Button label="4" onClick={() => addDigit('4')} />
        <Button label="5" onClick={() => addDigit('5')} />
        <Button label="6" onClick={() => addDigit('6')} />
        <Button label="-" operation onClick={() => setOperation('-')} />
        <Button label="1" onClick={() => addDigit('1')} />
        <Button label="2" onClick={() => addDigit('2')} />
        <Button label="3" onClick={() => addDigit('3')} />
        <Button label="+" operation onClick={() => setOperation('+')} />
        <Button label="0" double onClick={() => addDigit('0')} />
        <Button label="." onClick={() => addDigit('.')} disabled={state.usedDot} />
        <Button label="=" operation onClick={() => setOperation('=')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default App;
