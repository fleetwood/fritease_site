import { createStore } from "redux";
import rootReducer from "../reducers/Reducers";

const store = createStore(rootReducer);

export default store;