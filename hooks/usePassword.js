import {useState} from 'react';

export const usePassword = () => {
  const [value, setValue] = useState('');
  const numbers = /^[0-9]+$/;

  const onChangeText = value => {
    setValue(value);
  };

  const validationPassword = () => {
    if (value.length > 6 && value.match(numbers)) {
      return true;
    }
    return false;
  };

  return {
    value,
    setValue,
    validationPassword,
  };
};
