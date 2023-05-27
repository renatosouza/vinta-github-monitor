import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const CommitList = (props) => {
  const { commits, onClickAuthorName, onClickRepoName } = props;

  const handleSelectAuthor = (authorName) => {
    onClickAuthorName(authorName);
  };

  const handleSelectRepository = (repoName) => {
    onClickRepoName(repoName);
  };

  return (
    <div>
      {commits.length !== 0 && (
        <div>
          <div className="card card-outline-secondary my-4">
            <div className="card-header">
              Commit List
            </div>

            <div className="card-body">
              {commits.map((commit, index) => (
                <div key={commit.sha}>
                  <div className="avatar">
                    <img alt={commit.author} className="img-author" src={commit.avatar} />
                  </div>
                  <div className="commit-details">
                    <p>
                      {commit.message}
                    </p>
                    <small className="text-muted">
                      <a
                        className="filter-property"
                        onClick={() => handleSelectAuthor(commit.author)}
                      >
                        {commit.author}
                      </a>
                      {' '}
                      authored
                      {' '}
                      on
                      {' '}
                      <a
                        className="filter-property"
                        onClick={() => handleSelectRepository(commit.repository)}
                      >
                        {commit.repository}
                      </a>
                      {' '}
                      at
                      {' '}
                      {commit.date}
                    </small>
                    {index !== commits.length - 1 && <hr />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CommitList.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommitList;
