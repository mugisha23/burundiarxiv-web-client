import React, { ReactNode } from 'react';
import { datasets as database } from 'mock/datasets';
import { searchActionHandler } from './search.action';

/**
 * Types
 ************************************************/
export type Store = {
  datasets: typeof database;
  searchTerm: string;
};

interface Provider {
  children: ReactNode;
}

interface Action {
  name: string;
  payload?: any;
}

/**
 * Initial state/store
 ************************************************/
const initialStore: Store = { datasets: [...database], searchTerm: '' };

/**
 * Setup the reducer
 * @param state
 * @param action
 ************************************************/
const reducer = (store: Store, action: Action): Store => {
  switch (action.name) {
    case 'SEARCH':
      return searchActionHandler(action.payload);
    default:
      return store;
  }
};

/**
 * Create the context
 * and the store provider
 */
export const Context = React.createContext<Store | any>(initialStore);

export function StoreProvider({ children }: Provider): JSX.Element {
  const [store, dispatch] = React.useReducer(reducer, initialStore);

  return (
    <Context.Provider value={{ store, dispatch }}>{children}</Context.Provider>
  );
}
