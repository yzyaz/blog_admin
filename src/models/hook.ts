import {
  useSelector as usePreSelector,
  useDispatch as usePreDispatch,
  TypedUseSelectorHook,
} from 'react-redux';
import { Dispatch, RootState } from 'src/store';

export const useDispatch = () => usePreDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = usePreSelector;
