import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { makeInviteRequest } from 'services/employees';
import { showLoader } from 'utils/helpers/loader';
import { showToast } from 'utils/helpers/toast';

// importing components
import InviteForm from 'components/inviteForm';

/**
 * Login page component.
 */
export class Invite extends React.Component {
    /**
     * Constructor for the component.
     * @param {object} props - props object for the component.
     */
    constructor(props) {
        super(props);
        this.state = {};
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * function to submit invite request.
     */
    onSubmit = (email, firstName, lastName, designation) => {
        const { history } = this.props;

        // dispatch action to show loader
        showLoader(true);

        // call the service function
        makeInviteRequest(email, firstName, lastName, designation).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;
            if (response.status !== 200) {
                showToast('Invite failed');
                return;
            }

            showToast('Invite Sent');
        });
    };

    /**
     * function to render the component.
     */
    render() {
        return (
            <div className="profile-page">
                <div className="container">
                    <InviteForm onSubmit={this.onSubmit} />
                </div>
            </div>
        );
    }
}

Invite.propTypes = {
    history: PropTypes.object.isRequired,
};

Invite.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Invite);
