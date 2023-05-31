import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as commitAPI from '../api/CommitAPI';
import { changeLoadingCommitListStatus } from '../actions/LoadingActions';
import { changeAuthorName, changeRepoName } from '../actions/FilterActions';
import store from "../store";

class TitleLink extends React.Component {
  handleTitleClicked = () => {
    store.dispatch(changeAuthorName(''));
    store.dispatch(changeRepoName(''));
    store.dispatch(changeLoadingCommitListStatus(true));
    commitAPI.getCommits();
  }

  render () {
    return (
      <Link
        to="/"
        onClick={() => this.handleTitleClicked()}
      >
        {this.props.title}
      </Link>
    );
  }
}

TitleLink.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TitleLink;
