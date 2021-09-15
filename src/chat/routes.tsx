import * as H from 'history';
import * as React from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { WithDefaultProps } from '../core/default';
import Chat from './app';
interface AppProps {
  history: H.History;
  setGlobalState: (data: any) => void;
}

class StatelessApp extends React.Component<AppProps & RouteComponentProps<any>, {}> {
  render() {
    return (
      <React.Fragment>
        <Route path={this.props.match.url + '/'} exact={true} component={Chat} />
      </React.Fragment>
    );
  }
}

const ChatRoutes = compose(
  withRouter,
)(StatelessApp);
export default ChatRoutes;
