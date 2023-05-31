import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as commitAPI from '../api/CommitAPI';
import { changeRepoName } from '../actions/FilterActions';
import { changeLoadingRepoListStatus, changeLoadingCommitListStatus } from '../actions/LoadingActions';

class RepoListBarContainer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(changeLoadingRepoListStatus(true));
    commitAPI.getRepositories();
  }

  handleSelectRepo = (repoName) => {
    const { dispatch } = this.props;
    dispatch(changeRepoName(repoName));
  }

  handleDeleteRepo = (repoName) => {
    const { dispatch } = this.props;
    const token = document.getElementById('main').dataset.csrftoken;
    dispatch(changeLoadingRepoListStatus(true));
    dispatch(changeLoadingCommitListStatus(true));
    commitAPI.deleteRepository(repoName, {'X-CSRFToken': token});
  }

  render() {
    const { repositories, loadingRepoList } = this.props;

    return (
      <div>
        {loadingRepoList? (
          <div className="loader-container loader-container-repo-bar">
            <span className="loader loader-color-background"></span>
          </div>
        ) : (
          <ul className="sidebar-nav repo-bar-nav" id="repo-bar-nav">
            {repositories.map((repository, index) => (
              <li className="sidebar-brand" key={index}>
                <Link
                  to="/"
                  onClick={() => this.handleSelectRepo(repository.name)}
                >
                  {repository.name}
                </Link>
                <Link
                  to="/"
                  className="deleting"
                  onClick={() => this.handleDeleteRepo(repository.name)}
                >
                  x
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

RepoListBarContainer.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  repositories: state.commitState.repositories,
  loadingRepoList: state.loadingState.loadingRepoList,
});

export default connect(mapStateToProps)(RepoListBarContainer);
