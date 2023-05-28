import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import CommitList from '../components/CommitList';
import ReactPaginate from 'react-paginate';
import { changeAuthorName, changeRepoName } from '../actions/FilterActions';
import { changeLoadingCommitListStatus } from '../actions/LoadingActions';

class CommitListContainer extends React.Component {
  componentDidMount() {
    this.fetchCommits(1);
  }

  componentDidUpdate(prevProps) {
    const { authorName, repoName } = this.props;
    if( prevProps.authorName !== authorName || prevProps.repoName !== repoName ) {
      this.fetchCommits(1);
    }
  }

  handleAuthorName = (authorName) => {
    const { dispatch } = this.props;
    dispatch(changeAuthorName(authorName));
  }

  handleRepoName = (repoName) => {
    const { dispatch } = this.props;
    dispatch(changeRepoName(repoName));
  }

  handlePageClick = (pageNumber) => {
    const pageClicked = pageNumber.selected + 1;
    this.fetchCommits(pageClicked);
  }

  fetchCommits = (page) => {
    const { dispatch, authorName, repoName } = this.props;
    dispatch(changeLoadingCommitListStatus(true));
    commitAPI.getCommits({ page: page, authorName: authorName, repoName: repoName });

  }

  render() {
    const { commits, totalPages, currentPage, loadingCommitList } = this.props;
    return (
      <div>
        {loadingCommitList? (
          <div className="loader-container loader-container-commit-list">
            <span className="loader loader-white-background"></span>
          </div>
        ) : (
          <CommitList
            commits={commits}
            onClickAuthorName={this.handleAuthorName}
            onClickRepoName={this.handleRepoName}
          />
        )}
        <ReactPaginate
          nextLabel="&raquo;"
          onPageChange={this.handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          forcePage={currentPage-1}
          pageCount={totalPages}
          previousLabel="&laquo;"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination pagination-sm justify-content-end"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    );
  }
}

CommitListContainer.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  commits: state.commitState.commits,
  currentPage: state.pageState.currentPage,
  totalPages: state.pageState.totalPages,
  authorName: state.filterState.authorName,
  repoName: state.filterState.repoName,
  loadingCommitList: state.loadingState.loadingCommitList,
});

export default connect(mapStateToProps)(CommitListContainer);
