import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminTable from './Admin';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="" element={<AdminTable />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
