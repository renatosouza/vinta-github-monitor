import React from 'react';
import {
    Link, BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import CommitListContainer from './containers/CommitListContainer';
import RepoCreateContainer from './containers/RepoCreateContainer';
import RepoListBarContainer from './containers/RepoListBarContainer';
import TitleLink from './components/TitleLink';

export default (
    <Router>
        <div id="wrapper" className="toggled">

            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    <li className="sidebar-brand">
                        <TitleLink title="Github Monitor"/>
                    </li>
                    <RepoListBarContainer />
                </ul>
            </div>

            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <RepoCreateContainer />
                    <Switch>
                        <Route path="/" exact component={CommitListContainer} />
                    </Switch>
                </div>
            </div>

        </div>
    </Router>
);
