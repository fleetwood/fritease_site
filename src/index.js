import React from 'react';
import ReactDOM from 'react-dom';
import Timeline from './Timeline';
import Navbar from './views/Navbar'
import LeftSidebar from './views/LeftSidebar'

const leftSideBar = {
    title: 'ToDos',
    items: require('./json/todos.json'),
    footer: 'Kepp on doin'
};

ReactDOM.render(<Navbar />, document.getElementById('navbar'));
ReactDOM.render(<LeftSidebar {...leftSideBar} />, document.getElementById('dashboard-left'));
ReactDOM.render(<Timeline />, document.getElementById('timeline'));
