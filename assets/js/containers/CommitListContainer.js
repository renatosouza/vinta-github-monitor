import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import CommitList from '../components/CommitList';
// import { updatePage } from './../actions/PageActions';
// import ReactPaginate from 'react-paginate';
// import Paginate from '../components/Paginate';

class CommitListContainer extends React.Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    // const { currentPage, totalPages } = this.props;
    // console.log(currentPage, totalPages);
    commitAPI.getCommits({page: 1}, () => {
      this.setState({loading: false});
    });
  }

  // componentDidUpdate(prevProps) {
  //   const { currentPage, totalPages } = this.props;
  //   console.log(currentPage, totalPages);
  //   if (currentPage !== prevProps.currentPage) {
  //     commitAPI.getCommits(currentPage);
  //   }
  // }

  handleAuthorName = (authorName) => {
    this.setState({loading: true});
    commitAPI.getCommits({page: 1, authorName: authorName}, () => {
      this.setState({loading: false});
    });
  }

  handleRepoName = (repoName) => {
    this.setState({loading: true});
    commitAPI.getCommits({page: 1, repoName: repoName}, () => {
      this.setState({loading: false});
    });
  }

  // handlePageClick(data) {
  //   const selectedPage = data.selected;
  //   store.dispatch(updatePage(selectedPage))
  // }

  render() {
    const {commits} = this.props;
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


        {/* <Paginate
          currentPage={currentPage}
          totalPages={totalPages}
        /> */}

        {/* <ReactPaginate
          pageCount={totalPages}
          forcePage={currentPage}
          onPageChange={handlePageClick}
        /> */}
      </div>
    );
  }
}

CommitListContainer.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = store => ({
  commits: store.commitState.commits,
  // currentPage: store.commitState.currentPage,
  // totalPages: store.commitState.totalPages,
});

export default connect(mapStateToProps)(CommitListContainer);
