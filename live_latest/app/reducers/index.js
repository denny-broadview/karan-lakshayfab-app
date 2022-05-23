/*
 * combines all th existing reducers
 */
import * as loadingReducer from './loadingReducer';
import * as loginReducer from './loginReducer';
import * as themeReducer from './themeReducer';
import * as customerReducer from './customerReducer';
import  * as adminReducer from './adminReducer';
export default Object.assign(adminReducer,loginReducer, customerReducer,loadingReducer, themeReducer);

