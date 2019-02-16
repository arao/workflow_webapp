import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { showLoader } from 'utils/helpers/loader';
import { makeCreateCompanyRequest } from 'services/user';
import { showModal } from 'utils/helpers/modal';

// importing components
import SignupForm from 'components/signupForm';

/**
 * Login page component.
 */
export class CreateCompany extends React.Component {
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
     * function to submit login request.
     */
    onSubmit = (designation, companyName, companyAddress) => {
        // dispatch action to show loader
        showLoader(true);

        const data = {
            company: {
                name: companyName,
                address: companyAddress,
            },
            designation,
        };

        // call the service function
        makeCreateCompanyRequest(data).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;
            if (response.status !== 200) {
                showModal('Create Failed', 'Sorry, Company create request is failed.');
                return;
            }

            showModal('Create Successful', 'You company has been submitted for verification. Please check your mail.');
        });
    };

    /**
     * function to render the component.
     */
    render() {
        return (
            <div>
                <div className="container">
                    <SignupForm onSubmit={this.onSubmit} isNewUser={false} />
                </div>
            </div>
        );
    }
}

CreateCompany.propTypes = {};

CreateCompany.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateCompany);