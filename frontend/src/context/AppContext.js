import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { categoryService } from '../services/categoryService';
import { itemService } from '../services/itemService';
import { bookingService } from '../services/bookingService';
import { cashService } from '../services/cashService';

// Initial state
const initialState = {
  categories: [],
  items: [],
  bookings: [],
  cashTransactions: [],
  cashSummary: { cash_in: 0, cash_out: 0, net_cash: 0 },
  loading: false,
  error: null
};

// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CATEGORIES: 'SET_CATEGORIES',
  ADD_CATEGORY: 'ADD_CATEGORY',
  UPDATE_CATEGORY: 'UPDATE_CATEGORY',
  DELETE_CATEGORY: 'DELETE_CATEGORY',
  SET_ITEMS: 'SET_ITEMS',
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  SET_BOOKINGS: 'SET_BOOKINGS',
  ADD_BOOKING: 'ADD_BOOKING',
  UPDATE_BOOKING: 'UPDATE_BOOKING',
  DELETE_BOOKING: 'DELETE_BOOKING',
  SET_CASH_TRANSACTIONS: 'SET_CASH_TRANSACTIONS',
  ADD_CASH_TRANSACTION: 'ADD_CASH_TRANSACTION',
  UPDATE_CASH_TRANSACTION: 'UPDATE_CASH_TRANSACTION',
  DELETE_CASH_TRANSACTION: 'DELETE_CASH_TRANSACTION',
  SET_CASH_SUMMARY: 'SET_CASH_SUMMARY'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };

    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case actionTypes.SET_CATEGORIES:
      return { ...state, categories: action.payload, loading: false };

    case actionTypes.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        loading: false
      };

    case actionTypes.UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(cat =>
          cat.id === action.payload.id ? action.payload : cat
        ),
        loading: false
      };

    case actionTypes.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(cat => cat.id !== action.payload),
        loading: false
      };

    case actionTypes.SET_ITEMS:
      return { ...state, items: action.payload, loading: false };

    case actionTypes.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false
      };

    case actionTypes.SET_BOOKINGS:
      return { ...state, bookings: action.payload, loading: false };

    case actionTypes.ADD_BOOKING:
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
        loading: false
      };

    case actionTypes.SET_CASH_TRANSACTIONS:
      return { ...state, cashTransactions: action.payload, loading: false };

    case actionTypes.ADD_CASH_TRANSACTION:
      return {
        ...state,
        cashTransactions: [...state.cashTransactions, action.payload],
        loading: false
      };

    case actionTypes.SET_CASH_SUMMARY:
      return { ...state, cashSummary: action.payload };

    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Categories actions
  const loadCategories = async () => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      const categories = await categoryService.getAll();
      dispatch({ type: actionTypes.SET_CATEGORIES, payload: categories });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
    }
  };

  const createCategory = async (categoryData) => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      const newCategory = await categoryService.create(categoryData);
      dispatch({ type: actionTypes.ADD_CATEGORY, payload: newCategory });
      return newCategory;
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Items actions
  const loadItems = async () => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      const items = await itemService.getAll();
      dispatch({ type: actionTypes.SET_ITEMS, payload: items });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
    }
  };

  const createItem = async (itemData) => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      const newItem = await itemService.create(itemData);
      dispatch({ type: actionTypes.ADD_ITEM, payload: newItem });
      return newItem;
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Bookings actions
  const loadBookings = async () => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      const bookings = await bookingService.getAll();
      dispatch({ type: actionTypes.SET_BOOKINGS, payload: bookings });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
    }
  };

  const createBooking = async (bookingData) => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      const newBooking = await bookingService.create(bookingData);
      dispatch({ type: actionTypes.ADD_BOOKING, payload: newBooking });
      return newBooking;
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Cash actions
  const loadCashTransactions = async () => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      const transactions = await cashService.getAll();
      dispatch({ type: actionTypes.SET_CASH_TRANSACTIONS, payload: transactions });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
    }
  };

  const loadCashSummary = async () => {
    try {
      const summary = await cashService.getSummary();
      dispatch({ type: actionTypes.SET_CASH_SUMMARY, payload: summary });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
    }
  };

  const createCashTransaction = async (transactionData) => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      const newTransaction = await cashService.create(transactionData);
      dispatch({ type: actionTypes.ADD_CASH_TRANSACTION, payload: newTransaction });
      // Reload summary after adding transaction
      loadCashSummary();
      return newTransaction;
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  // Load initial data
  useEffect(() => {
    loadCategories();
    loadItems();
    loadBookings();
    loadCashTransactions();
    loadCashSummary();
  }, []);

  const value = {
    ...state,
    // Categories
    loadCategories,
    createCategory,
    // Items
    loadItems,
    createItem,
    // Bookings
    loadBookings,
    createBooking,
    // Cash
    loadCashTransactions,
    loadCashSummary,
    createCashTransaction
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;