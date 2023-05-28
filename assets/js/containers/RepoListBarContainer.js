import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as commitAPI from '../api/CommitAPI';
import { changeRepoName } from '../actions/FilterActions';
import { changeLoadingRepoListStatus } from '../actions/LoadingActions';

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

  render() {
    const { repositories, loadingRepoList } = this.props;

    return (
      <div>
        {loadingRepoList? (
          <div className="loader-container loader-container-repo-bar">
            <span className="loader loader-color-background"></span>
          </div>
        ) : (
          <ul className="nav flex-column">
            {repositories.map((repository, index) => (
              <li className="nav-item" key={index}>
                <Link
                  to="/"
                  className="nav-link"
                  onClick={() => this.handleSelectRepo(repository.name)}
                >
                  {repository.name}
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
