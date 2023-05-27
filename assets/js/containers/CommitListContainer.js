import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import CommitList from '../components/CommitList';
import ReactPaginate from 'react-paginate';

class CommitListContainer extends React.Component {
  state = {
    loading: false,
    authorName: '',
    repoName: '',
  }

  componentDidMount() {
    this.fetchCommits(1);
  }

  handleAuthorName = (authorName) => {
    this.setState({ authorName: authorName, repoName: '' }, () => {
      this.fetchCommits(1);
    });
  }

  handleRepoName = (repoName) => {
    this.setState({ authorName: '', repoName: repoName }, () => {
      this.fetchCommits(1);
    });
  }

  handlePageClick = (pageNumber) => {
    const pageClicked = pageNumber.selected + 1;
    this.fetchCommits(pageClicked);
  }

  fetchCommits = (page) => {
    this.setState({ loading: true });
    commitAPI.getCommits({ page: page, authorName: this.state.authorName, repoName: this.state.repoName }, () => {
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
});

export default connect(mapStateToProps)(CommitListContainer);
