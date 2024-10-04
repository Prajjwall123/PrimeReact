import { myAxios } from './helper';

// Register
export const Register = (user) => {
    return myAxios
        .post('/user/save', user)
        .then((response) => response.data);
};

//get all Roles
export const GetAllRoles =(roles) =>{
    return myAxios
        .get('/roles/getAll')
        .then((response) => response.data)
}

// RegisterRole
export const RegisterRole = (role) => {
    return myAxios
        .post('/roles/save', role)
        .then((response) => response.data);
};

// DeleteRole
export const DeleteRole = (name) => {
    return myAxios
        .delete(`/roles/deleteByName/${name}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error deleting role:", error);
            throw error;
        });
};


// UpdateRole
export const UpdateRole = (role, name) => {
    return myAxios
        .put(`/roles/updateByName/${name}`, role)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error updating role:", error);
            throw error;
        });
};

// RegisterAdmin
export const RegisterAdmin = (admin) => {
    return myAxios
        .post('/user/saveAdmin', admin)
        .then((response) => response.data);
};

// Login
export const Login = (credentials) => {
    return myAxios
        .post('/login', credentials)
        .then((response) => {
            const { token } = response.data;
            localStorage.setItem('token', token);
            return response.data;
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                throw new Error('Invalid login credentials');
            } else {
                throw error;
            }
        });
};
