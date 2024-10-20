import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminTable from './Admin';
import UserPage from './User';

const App = () => {

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="" element={<AdminTable />} />
                    <Route path="/users" element={<UserPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
