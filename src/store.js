import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./redux/user/reducer";
import postReducer from "./redux/post/reducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  users: userReducer,
  posts: postReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
