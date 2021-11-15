import React, { useState } from 'react';

import {
  f7,
  f7ready,
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter
} from 'framework7-react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  //useQuery,
  useMutation,
  gql
} from "@apollo/client";


import createUploadLink from 'apollo-upload-client/public/createUploadLink.js';

function customFetch(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open(opts.method || 'get', url)

    for (let k in opts.headers || {}) xhr.setRequestHeader(k, opts.headers[k])

    xhr.onload = e =>
      resolve({
        ok: true,
        text: () => Promise.resolve(e.target.responseText),
        json: () => Promise.resolve(JSON.parse(e.target.responseText))
      })

    xhr.onerror = reject

    if (xhr.upload)
      xhr.upload.onprogress = event =>
        console.log(`${event.loaded / event.total * 100}% uploaded`)

    xhr.send(opts.body)
  })
}




const apolloClient = new ApolloClient({
  //uri: 'http://localhost:5000/api/graphql',
  cache:  new InMemoryCache(),
  link: createUploadLink({
  //  uri: 'http://localhost:5000/api/graphql',
  uri: 'https://dev.tsier.com/api/graphql',
    fetch: typeof window === 'undefined' ? global.fetch : customFetch
  }),
});


import routes from '../js/routes';
import store from '../js/store';

const MyApp = () => {
  // Login screen demo data
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Framework7 Parameters
  const f7params = {
    name: 'Vinlib UI', // App name
      theme: 'auto', // Automatic theme detection

      // App store
      store: store,
      // App routes
      routes: routes,
  };
  const alertLoginData = () => {
    f7.dialog.alert('Username: ' + username + '<br>Password: ' + password, () => {
      f7.loginScreen.close();
    });
  }
  f7ready(() => {

    // Call F7 APIs here
  });

  return (
    <ApolloProvider client={apolloClient}>

    <App { ...f7params } >

        {/* Left panel with cover effect when hidden */}
        <Panel left cover themeDark visibleBreakpoint={960}>
          <View>
            <Page>
              <Navbar title="Left Panel"/>
              <BlockTitle>Left View Navigation</BlockTitle>
              <List>
                <ListItem link="/left-page-1/" title="Left Page 1"/>
                <ListItem link="/left-page-2/" title="Left Page 2"/>
              </List>
              <BlockTitle>Control Main View</BlockTitle>
              <List>
                <ListItem link="/about/" view=".view-main" panelClose title="About"/>
                <ListItem link="/form/" view=".view-main" panelClose title="Form"/>
                <ListItem link="#" view=".view-main" back panelClose title="Back in history"/>
              </List>
            </Page>
          </View>
        </Panel>


        {/* Right panel with reveal effect*/}
        <Panel right reveal themeDark>
          <View>
            <Page>
              <Navbar title="Right Panel"/>
              <Block>Right panel content goes here</Block>
            </Page>
          </View>
        </Panel>


        {/* Your main view, should have "view-main" class */}
        <View main className="safe-areas" url="/" />

  

      <LoginScreen id="my-login-screen">
        <View>
          <Page loginScreen>
            <LoginScreenTitle>Login</LoginScreenTitle>
            <List form>
              <ListInput
                type="text"
                name="username"
                placeholder="Your username"
                value={username}
                onInput={(e) => setUsername(e.target.value)}
              ></ListInput>
              <ListInput
                type="password"
                name="password"
                placeholder="Your password"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              ></ListInput>
            </List>
            <List>
              <ListButton title="Sign In" onClick={() => alertLoginData()} />
              <BlockFooter>
                Some text about login information.<br />Click "Sign In" to close Login Screen
              </BlockFooter>
            </List>
          </Page>
        </View>
      </LoginScreen>
    </App>
    </ApolloProvider> 
        
  )
}
export default MyApp;