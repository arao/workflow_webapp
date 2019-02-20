import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

import userConstants from 'constants/user.js';
import PermissionsForm from 'components/permissionForm';
import { showToast } from 'utils/helpers/toast';

class Permissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setPermission = this.setPermission.bind(this);
        this.removePermission = this.removePermission.bind(this);
        this.addPermission = this.addPermission.bind(this);
        this.createUi = this.createUi.bind(this);
    }

    setPermission(id, value) {
        const { onChange, workflowPermissions: permissions } = this.props;
        permissions[id] = value;
        onChange(permissions);
    }

    addPermission() {
        const { employees, onChange, workflowPermissions: permissions } = this.props;
        if (employees.length === 0) {
            showToast('No active employees in company');
        } else {
            permissions[Object.keys(permissions).length] = {
                employee: Object.keys(employees)[0],
                permission: `${userConstants.PERMISSION.READ}`,
            };
            onChange(permissions);
        }
    }

    removePermission(key) {
        const { onChange, workflowPermissions: permissions } = this.props;
        delete permissions[key];
        onChange(permissions);
    }

    createUi() {
        const { employees, workflowPermissions: permissions } = this.props;

        // for (const permission in permissions) {
        //     if (Object.hasOwnProperty.call(permissions, permission)) {
        //         delete employees[permission.employee];
        //     }
        // }

        return Object.keys(permissions).map((permissionKey, idx) => (
            <PermissionsForm
                employees={employees}
                employee={permissions[permissionKey].employee}
                permissionIdentifier={permissionKey}
                permission={permissions[permissionKey].permission}
                removePermission={this.removePermission}
                key={`${Math.random()}-permission`}
                onChange={this.setPermission}
            />
        ));
    }

    render() {
        const { borderColor } = this.props;
        return (
            <div className={`border ${borderColor} p-2 mb-2 col-12`}>
                <Form.Row className="m-2">
                    <Form.Group>
                        <Button className="float-right" variant="primary" onClick={this.addPermission}>
                            {'Add Permission'}
                        </Button>
                    </Form.Group>
                </Form.Row>
                {this.createUi()}
            </div>
        );
    }
}

Permissions.propTypes = {
    employees: PropTypes.object.isRequired,
    borderColor: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    workflowPermissions: PropTypes.object,
};

Permissions.defaultProps = {
    borderColor: 'border-info',
    workflowPermissions: {},
};

export default Permissions;