import React from 'react';


export const initialState = {
    queue: [],
    isPaused: false,
    favorites: []
}
export const DispatchContext = React.createContext(null);
export const StateContext = React.createContext(null);