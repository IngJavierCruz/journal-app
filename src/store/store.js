import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import { notesReducer } from "../reducers/notesReducer";
import { authReducer } from './../reducers/authReducers';
import { uiReducer } from './../reducers/uiReducer';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});

export const store = createStore(
    reducers, 
    composeEnhancers(
        applyMiddleware( thunk )
    )
);