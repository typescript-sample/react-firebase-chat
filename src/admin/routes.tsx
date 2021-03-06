import {AxiosInstance} from 'axios';
import * as H from 'history';
import * as React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {updateGlobalState} from 'redux-plus';
import {alert, authenticated, resource} from 'uione';
import {WithDefaultProps} from '../core/default';
import {RoleForm} from './component/role-form';
import RolesForm from './component/roles-form';
import {UserForm} from './component/user-form';
import {UsersForm} from './component/users-form';

interface AppProps {
  history: H.History;
  setGlobalState: (data: any) => void;
}

class StatelessApp extends React.Component<AppProps & RouteComponentProps<any>, {}> {
  render() {
    // if (authenticated()) {
      return (
        <React.Fragment>
          <Route path={this.props.match.url + 'users'} exact={true} component={WithDefaultProps(UsersForm)} />
          <Route path={this.props.match.url + 'users/add'} exact={true} component={WithDefaultProps(UserForm)} />
          <Route path={this.props.match.url + 'users/:id'} exact={true} component={WithDefaultProps(UserForm)} />

          <Route path={this.props.match.url + 'roles'} exact={true} component={WithDefaultProps(RolesForm)} />
          <Route path={this.props.match.url + 'roles/add'} exact={true} component={WithDefaultProps(RoleForm)} />
          <Route path={this.props.match.url + 'roles/:id'} exact={true} component={WithDefaultProps(RoleForm)} />

        </React.Fragment>
      );
      /*
    } else {
      const resourceService = resource();
      const title = resourceService.value('error_permission');
      const msg = resourceService.value('error_unauthorized');
      alert(msg, title);
      return <Redirect to={{ pathname: '/auth', state: { from: this.props.location } }} />;
    }*/
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGlobalState: (res) => dispatch(updateGlobalState(res))
  };
}

const withConnect = connect(null, mapDispatchToProps);

const adminRoutes = compose(
  withRouter,
  withConnect
)(StatelessApp);
export default adminRoutes;
