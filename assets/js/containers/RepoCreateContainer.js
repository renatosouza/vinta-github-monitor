import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import Form from '../components/RepoCreateForm';

class RepoCreateContainer extends React.Component {
  submit = (values, dispatch) => {
    const token = document.getElementById('main').dataset.csrftoken;
    const name = values.name.split('/')[1];
    const v = {...values, name};
    return commitAPI.createRepository(v, {'X-CSRFToken': token}, dispatch);
  };

  render() {
    const { successMessage, errorMessage, errorFeedback } = this.props;
    return (
      <Form
        onSubmit={this.submit}
        successMessage={successMessage}
        errorMessage={errorMessage}
        errorFeedback={errorFeedback}
      />
    );
  }
}

RepoCreateContainer.propTypes = {
  successMessage: PropTypes.bool.isRequired,
  errorMessage: PropTypes.bool.isRequired,
  errorFeedback: PropTypes.string.isRequired,
};

const mapStateToProps = store => ({
  successMessage: store.commitState.successMessage,
  errorMessage: store.commitState.errorMessage,
  errorFeedback: store.commitState.errorFeedback,
});

export default connect(mapStateToProps)(RepoCreateContainer);
