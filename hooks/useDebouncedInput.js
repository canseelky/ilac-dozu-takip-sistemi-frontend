import {useDebouncedCallback} from 'use-debounce';
import {useDispatch} from 'react-redux';
import {getSearchResult} from '../store/slices/SearchSlice';
import {useState} from 'react';
const useDebouncedInput = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const debouncedInputHandler = useDebouncedCallback(term => {
    setSearchTerm(term);
    dispatch(getSearchResult(searchTerm));
  }, 1000);
  return {searchTerm, setSearchTerm, debouncedInputHandler};
};

export default useDebouncedInput;
