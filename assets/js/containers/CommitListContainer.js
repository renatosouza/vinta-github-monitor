import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import CommitList from '../components/CommitList';
import ReactPaginate from 'react-paginate';
import { changeAuthorName, changeRepoName } from '../actions/FilterActions';

class CommitListContainer extends React.Component {
  state = {
    loading: false,
  }

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
    const { authorName, repoName } = this.props;
    this.setState({ loading: true });
    commitAPI.getCommits({ page: page, authorName: authorName, repoName: repoName }, () => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { commits, totalPages, currentPage } = this.props;
    return (
      <div className={this.state.loading? "loader-container" : ""}>
        {this.state.loading? (
          <span className="loader"></span>
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
});

export default connect(mapStateToProps)(CommitListContainer);
