import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// Login
// --------------------------------------------
export const login = async (userData) => {
    const { username, password } = userData
    try {
      const response = await api.post('/login', { username, password });
      return { status: response.status, data: response.data };
    } catch (error) {
      return { status: error.response.status, data: error.response.data };
    }
  };


// Register
// --------------------------------------------
export const register = async (userData) => {
    const { username, password } = userData
    try {
        const response = await api.post('/register', { username, password });
        return { status: response.status, data: response.data };
    } catch (error) {
        return { status: error.response.status, data: error.response.data };
    }
};

// Get All Todos
// --------------------------------------------
export const fetchTodos = async() => {
    try {
        const response = await api.get('/todolist');
        return { status: response.status, data: response.data };
    } catch (error) {
        return { status: error.response.status, data: error.response.data };
    }
}


// Edit Todo
// --------------------------------------------
export const editTodo = async(newTodo, id) => {
    try{
        const response = await api.put(`/edittodo/${id}`, newTodo);
        return { status: response.status, data: response.data };
    } catch (error) {
        return { status: error.response.status, data: error.response.data };
    }
}


// Add Todo
// --------------------------------------------
export const addTodo = async(newTodo) => {
    try{
        const response = await api.post('/addtodo', newTodo);
        console.log(response, newTodo)
        return { status: response.status, data: response.data };
    } catch (error) {
        return { status: error.response.status, message: error.response.data };
    }
}

// Delete Todo
// --------------------------------------------
export const deleteTodo = async(id) => {
    try{
        const response = await api.delete(`/deletetodo/${id}`);
        return { status: response.status, data: response.data };
    } catch (error) {
        return { status: error.response.status, message: error.response.data };
    }
}

