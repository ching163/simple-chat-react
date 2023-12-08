import { createStore, action, thunk } from 'easy-peasy';
import api from './api';

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export default createStore({
    apiError: '',
    setApiError: action((state, payload) => {
        state.apiError = payload;
    }),
    // for user login
    username: '',
    setUsername: action((state, payload) => {
        state.username = payload;
    }),
    password: '',
    setPassword: action((state, payload) => {
        state.password = payload;
    }),
    // for user registration
    regUsername: '',
    setRegUsername: action((state, payload) => {
        state.regUsername = payload;
    }),
    regPassword: '',
    setRegPassword: action((state, payload) => {
        state.regPassword = payload;
    }),
    // login
    userLogin: thunk(async (actions, payload, helpers) => {
        const { username } = helpers.getState();
        try {
            const result = await api.post('/login', payload);
            localStorage.setItem('token', result.data.accessToken);
            localStorage.setItem('loginUsername', username);
            actions.setUsername('');
            actions.setPassword('');
            actions.setApiError('');
            return true;
        } catch (err) {
            actions.setApiError(err.message);
            console.log(err.message);
            return false;
        }
    }),
    userLogout: thunk(async (actions) => {
        try {
            await api.get('/logout');
            localStorage.removeItem('token', '');
            localStorage.removeItem('loginUsername');
            actions.setApiError('');
        } catch (err) {
            actions.setApiError(err.message);
            console.log(err.message);
        }
    }),
    // add user
    addUser: thunk(async (actions, payload) => {
        try {
            await api.post('/register', payload);
            actions.setRegUsername('');
            actions.setRegPassword('');
            actions.setApiError('');
            return true;
        } catch (err) {
            actions.setApiError(err.message);
            console.log(`Error: ${err.message}`);
            return false;
        }
    }),
    foundUsers: [],
    setFoundUsers: action((state, payload) => {
        state.foundUsers = payload;
    }),
    searchUsers: thunk(async (actions, payload) => {
        try {
            const response = await api.get(`/users/${payload}`);
            actions.setFoundUsers(response.data);
            actions.setApiError('');
        } catch (err) {
            actions.setFoundUsers([]);
            actions.setApiError(err.message);
            console.log(`Error: ${err.message}`);
        }
    }),
    // user contact list
    contactList: [],
    setContactList: action((state, payload) => {
        state.contactList = payload;
    }),
    getContactList: thunk(async (actions) => {
        const loginUsername = localStorage.getItem('loginUsername') || '';
        try {
            const response = await api.get(`/messages/contacts/${loginUsername}`);
            actions.setContactList(response.data);
            actions.setApiError('');
        } catch (err) {
            actions.setContactList([]);
            actions.setApiError(err.message);
            console.log(`Error: ${err.message}`);
        }
    }),
    // message list between login user and selected contact user
    selectedContact: '',
    setSelectedContact: action((state, payload) => {
        state.selectedContact = payload;
    }),
    messageList: [],
    setMessageList: action((state, payload) => {
        state.messageList = payload;
    }),
    getMessageList: thunk(async (actions, payload, helpers) => {
        const { selectedContact } = helpers.getState();
        const loginUsername = localStorage.getItem('loginUsername') || '';
        try {
            const response = await api.get(`/messages/${loginUsername}&${selectedContact}`);
            actions.setMessageList(response.data);
            actions.setApiError('');
        } catch (err) {
            actions.setMessageList([]);
            actions.setApiError(err.message);
            console.log(`Error: ${err.message}`);
        }
    }),
    sendMessage: thunk(async (actions, payload) => {
        try {
            const response = await api.post(`/messages`, payload);
            console.log(response);
            actions.setApiError('');
        } catch (err) {
            actions.setApiError(err.message);
            console.log(`Error: ${err.message}`);
        }
    }),
})