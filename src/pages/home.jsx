import React from 'react';
import ReactDOM from 'react-dom';
import {
  f7,
  f7ready,
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Row,
  Col,
  Button
} from 'framework7-react';

import ImageCapture from '../components/ImageCapture';


const HomePage = () => {

  const imageCapture = React.useRef();

  return (
  <Page name="home">
    {/* Top Navbar */}
    <Navbar large sliding={false}>
      <NavLeft>
        <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
      </NavLeft>
      <NavTitle sliding>Vinlib UI</NavTitle>
      <NavRight>
        <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="right" />
      </NavRight>
      <NavTitleLarge>Vinlib UI</NavTitleLarge>
    </Navbar>
    {/* Toolbar */}
    <Toolbar bottom>
      <Link  onClick={() => imageCapture.current.openLastImage()}>Last photo</Link>
      <Button fill raised  onClick={() => imageCapture.current.captureImage()}>Capture photo</Button>
      <Link loginScreenOpen="#login-screen">Login</Link>
    </Toolbar>
    {/* Page content */}
    
    <ImageCapture  ref={imageCapture} />

    <List>
      <ListItem
        title="Dynamic (Component) Route"
        link="/dynamic-route/blog/45/post/125/?foo=bar#about"
      />
      <ListItem
        title="Default Route (404)"
        link="/load-something-that-doesnt-exist/"
      />
      <ListItem
        title="Request Data & Load"
        link="/request-and-load/user/123456/"
      />
    </List>

  </Page>
)};


export default HomePage;