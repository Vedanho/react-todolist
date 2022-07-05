import React from 'react';
import Header from '../Header/Header';
import List from '../List/List';
import { useSelector } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";

const HomePage = () => {
    const loading = useSelector((state) => state.todos.loading);

    return (
        <>
         <Header />
         {loading && ( <> <LinearProgress color="primary" /> </>)} 
         <List />   
        </>
    );
};

export default HomePage;