import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
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
    image: '',
    fish_detail: '',
    like: 0
}

const getFish = {
    local_name: '',
    common_name: '',
    scientific_name: '',
    image: '',
    fish_detail: '',
    id: 0,
    like: 0
}

const loading = false

export const listAction = {
    psuLogin: (login) => async (dispatch) => {
        const result = await axios.post(`https://fish-species.herokuapp.com/login`, { ...login });
        const [id, name, surname] = [...result.data.GetStudentDetailsResult.string]
        dispatch({ type: 'LOGIN', id: id, name: name, surname: surname })
    },
    psuLogout: () => async (dispatch) => {
        dispatch({ type: "LOGOUT" })
    },
    getFish: () => async (dispatch) => {
        dispatch({ type: 'CHANGE_LOADDING' })
        axios
            .get(`https://fish-species.herokuapp.com/datafish`)
            .then(res => {
                dispatch({ type: "GET_FISH", data_fishs: res.data });
            })
            .finally(() => {
                dispatch({ type: 'CHANGE_LOADDING' })
            })
    },
    addFish: (form) => async (dispatch) => {
        await axios.post(`https://fish-species.herokuapp.com/fish/`, { ...form })
        dispatch({ type: "ADD_FISH", data_fish: { ...form } })
    },
    deleteFish: (index) => async (dispatch) => {
        await axios.delete(`https://fish-species.herokuapp.com/delete/${index}`, index)
        dispatch({ type: "DELETE_FISH", id: index.id })
    },
    updateFish: (data_fish) => async (dispatch) => {
        await axios.put(`https://fish-species.herokuapp.com/update/${data_fish.id}`, data_fish)
        dispatch({ type: 'UPDATE_FISH', data_fish: data_fish, id: data_fish.id })
    },
    updateLike: (count) => async (dispatch) => {
        await axios.put(`https://fish-species.herokuapp.com/update/${count.id}`, count)
        dispatch({ type: 'UPDATE_LIKE', like: count })
    },
    change_local_name: (s) => ({ type: 'CHANGE_LOCATION', local_name: s }),
    change_common_name: (s) => ({ type: 'CHANGE_COMMON', common_name: s }),
    change_scientific_name: (s) => ({ type: 'CHANGE_SCIENT', scientific_name: s }),
    change_image: (s) => ({ type: 'CHANGE_IMAGE', image: s }),
    change_fish_detail: (s) => ({ type: 'CHANGE_DETAIL', fish_detail: s }),
    change_like: (s) => ({ type: 'CHANGE_LIKE', like: s })
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
            return data.filter(data_fish => + action.id !== + data_fish.id)
        case "UPDATE_FISH":
            return data.map(data_fish => {
                if (+data_fish.id === +action.id)
                    return action.data_fish
                else
                    return data_fish
            })
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
        case "CHANGE_DETAIL":
            return {
                ...data,
                name: action.fish_detail
            }
        case "CHANGE_LIKE":
            return {
                ...data,
                name: action.like
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

const loadingReducer = (data = loading, action) => {
    switch (action.type) {
        case "CHANGE_LOADDING":
            return !data
        default:
            return data
    }
}

const rootReducer = combineReducers({
    psuPass: loginReducer,
    formReduc: formReducer,
    fishReduc: fishReducer,
    getFish: getFishReducer,
    loading: loadingReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Reducer = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default Reducer