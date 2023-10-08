import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import { CALULATE_TOTALS, CLEAR_CART, INCREASE_AMOUNT, DECREASE_AMOUNT, REMOVE_ITEM, FETCH_DATA } from "./actions";
import data from "./data";

const GlobalContext = createContext();
const url = 'https://www.course-api.com/react-useReducer-cart-project';


export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {

  const defaultState = {
    cart: [],
    total: 0
  };

  const [ state, dispatch ] =  useReducer(reducer, defaultState);

  const clearCart = () => {
    dispatch({type: CLEAR_CART});
    dispatch({type: CALULATE_TOTALS});
  } 

  const removeItem = (id) => {
    dispatch({type: REMOVE_ITEM, payload: {id}});
    dispatch({type: CALULATE_TOTALS});
  }

  const increaseAmount = (id) => {
    dispatch({type: INCREASE_AMOUNT, payload: {id}});
    dispatch({type: CALULATE_TOTALS});
  }

  const decreaseAmount = (id) => {
    dispatch({type: DECREASE_AMOUNT, payload: {id}})
    dispatch({type: CALULATE_TOTALS});
  }

  const calculateTotal = () => {
    dispatch({type: CALULATE_TOTALS});
  }

  const fetchData = () => {
      fetch(url)
    .then(response => response.json())
    .then(data => {dispatch({type: FETCH_DATA, payload: {data}}); dispatch({type: CALULATE_TOTALS});});
    
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GlobalContext.Provider value={{...state, clearCart, removeItem, increaseAmount, decreaseAmount}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
