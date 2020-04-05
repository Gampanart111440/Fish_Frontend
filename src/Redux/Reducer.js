import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger';
import thunk from 'redux-thunk'
import axios from "axios";

const loginForm = {
    id: '',
    name: '',
    surname: '',
}

const fishForm = {
    local_name: '',
    common_name: '',
    scientific_name: '',
    image: ''
}

const getFish = {
    local_name: '',
    common_name: '',
    scientific_name: '',
    image: '',
    id: 0
}

const loadding = false

export const listAction = {
    psuLogin: (login) => async (dispatch) => {
        const result = await axios.post(`https://fish-specail.herokuapp.com/login`, { ...login });
        console.log(result.data.GetStudentDetailsResult);
        const [id, name, surname] = [...result.data.GetStudentDetailsResult.string]
        dispatch({ type: 'LOGIN', id: id, name: name, surname: surname })
    },
    psuLogout: () => async (dispatch) => {
        dispatch({ type: "LOGOUT" })
    },
    getFish: () => async (dispatch) => {
        const response = await axios.get(`https://fish-specail.herokuapp.com/datafish`)
        const responseBody = await response.data;
        dispatch({ type: "GET_FISH", data_fishs: responseBody });
    },
    addFish: (form) => async (dispatch) => {
        await axios.post(`https://fish-specail.herokuapp.com/fish/`, { ...form })
        dispatch({ type: "ADD_FISH", data_fish: { ...form } })
    },
    deleteFish: (index) => async (dispatch) => {
        await axios.delete(`https://fish-specail.herokuapp.com/delete/${index.id}`, index)
        dispatch({ type: "DELETE_FISH", id: index.id })
    },
    updateFish: (data_fish) => async (dispatch) => {
        await axios.put(`https://fish-specail.herokuapp.com/update/${data_fish.id}`, data_fish)
        dispatch({ type: 'UPDATE_FISH', data_fish: data_fish, id: data_fish.id })
    },
    showFish: (id) => async (dispatch) => {
        dispatch({ type: 'CHANGE_LOADDING' })
        axios
            .get(`https://fish-specail.herokuapp.com/datafish/${id}`)
            .then(res => {
                dispatch({ type: 'CHANGE_FISH', fish: res.data })
            })
            .finally(() => {
                dispatch({ type: 'CHANGE_LOADDING' })
            })
    },
    change_local_name: (s) => ({ type: 'CHANGE_LOCATION', local_name: s }),
    change_common_name: (s) => ({ type: 'CHANGE_COMMON', common_name: s }),
    change_scientific_name: (s) => ({ type: 'CHANGE_SCIENT', scientific_name: s }),
    change_image: (s) => ({ type: 'CHANGE_IMAGE', image: s }),
}

const loginReducer = (data = loginForm, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...data,
                id: action.id,
                name: action.name,
                surname: action.surname
            }
        case "LOGOUT":
            return {
                ...data,
                id: "",
                name: '',
                surname: ''
            }
        default:
            return data
    }
}

const fishReducer = (data = [], action) => {
    switch (action.type) {
        case "GET_FISH":
            return action.data_fishs
        case "ADD_FISH":
            return [...data, action.data_fish]
        case "DELETE_FISH":
            return data.filter(data_fish => +action.id !== +data_fish.id)
        case "UPDATE_FISH":
            return data.map(data_fish => {
                if (+data_fish.id === +action.id)
                    return action.data_fish
                else
                    return data_fish
            })
        default:
            return data
    }
}

const formReducer = (data = fishForm, action) => {
    switch (action.type) {
        case "CHANGE_LOCATION":
            return {
                ...data,
                activity: action.local_name
            }
        case "CHANGE_CHANGE_COMMON":
            return {
                ...data,
                address: action.common_name
            }
        case "CHANGE_CHANGE_SCIENT":
            return {
                ...data,
                date: action.scientific_name
            }
        case "CHANGE_IMAGE":
            return {
                ...data,
                name: action.image
            }
        default:
            return data
    }
}

const getFishReducer = (data = getFish, action) => {
    switch (action.type) {
        case "CHANGE_FISH":
            return {
                ...action.fish
            }
        default:
            return data
    }
}

const loaddingReducer = (data = loadding, action) => {
    switch (action.type) {
        case "CHANGE_LOADDING":
            return !data
        default:
            return data
    }
}

const rootReducer = combineReducers({
    psuPass: loginReducer,
    form: formReducer,
    fishReduc: fishReducer,
    getFish: getFishReducer,
    loadding: loaddingReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Reducer = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)))

export default Reducer