import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as commitAPI from '../api/CommitAPI';
import { changeRepoName } from "../actions/FilterActions";

class RepoListBarContainer extends React.Component {
  componentDidMount() {
    commitAPI.getRepositories();
  }

  handleSelectRepo = (repoName) => {
    const { dispatch } = this.props;
    dispatch(changeRepoName(repoName));
  }

  render() {
    const { repositories } = this.props;

    return (
      <ul className="nav flex-column">
        {repositories.map((repository, index) => (
          <li className="nav-item" key={index}>
            <Link to="/" className="nav-link" onClick={() => this.handleSelectRepo(repository.name)}>
              {repository.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

RepoListBarContainer.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  repositories: state.commitState.repositories,
});

export default connect(mapStateToProps)(RepoListBarContainer);
