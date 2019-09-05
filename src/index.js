import React from 'react';
import ReactDOM from 'react-dom';
import Timeline from './Timeline';
import Navbar from './views/Navbar'
import LeftSidebar from './views/LeftSidebar'

ReactDOM.render(<Navbar />, document.getElementById('navbar'));
ReactDOM.render(<LeftSidebar />, document.getElementById('dashboard-left'));
ReactDOM.render(<Timeline />, document.getElementById('timeline'));
