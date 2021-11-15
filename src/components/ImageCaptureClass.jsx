
import React from 'react';
import { f7, Popup, View, Page, Navbar, NavRight, Link, Button, Block, Col, Row } from 'framework7-react';

import Webcam from "react-webcam";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql
} from "@apollo/client";

const MUTATION_CREATE = gql`
   mutation UploadFile($file: Upload!) {
    createWine (
        data: { 
            title: "hey",
            photo : {
                  upload: $file
            }
        },
        ) {title}
    }
`;
const [mutate_create] = useMutation(MUTATION_CREATE);


class ImageCaptureClass extends React.Component {

  constructor(props) {
    super(props)
    this.state = { message: 'Waiting' };
    this.webcamRef = React.createRef();
    this.img = React.createRef();

  }
  
  openLastImage() {
    f7.popup.open("#last-photo-popup");
  }

  captureImage() {
    this.img.current.src = this.webcamRef.current.getScreenshot();
    this.openLastImage();
  }

  queryAppollo() {
    
    apolloClient.query({
        query: gql`
          query  {
            users {
                id
                name
                email
                winesCount
                wines {
                  title
                  
                }
              }
              tags {
                name
                id
              }
          }
        `
      })
      .then(result => console.log(result));
  }

 sendToAnalyse = () => {
    fetch(imgRef.current.src)
      .then((res) => {
        res.blob().then((b) => {
          var file = new File([b], "wine.jpg", { type: "image/jpeg" });
          console.log(file);
          mutate_create({ variables: { file } });
        })
      });
  }

  render() {
    const videoConstraints = {
      width: 1920,
      height: 1080,
      facingMode: "environment"
    };
      // Pass mutation to useMutation
  const [createWine, { data, loading, error }] = useMutation(CREATE_WINE);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

    return (
      <>
        <Webcam
          audio={false}
          height={0.5625 * (window.innerWidth)}
          ref={this.webcamRef}
          screenshotFormat="image/jpeg"
          width={window.innerWidth}
          videoConstraints={videoConstraints}
        />
        <Popup id="last-photo-popup">
          <View>
            <Page>
              <Navbar title="Last photo">
                <NavRight>
                  <Link popupClose>Close</Link>
                </NavRight>
              </Navbar>
              <img ref={this.img} />

              <Row>
                <Col width="10">
                </Col>
                <Col width="80">
                  <Button fill raised onClick={() => this.sendToAnalyse()}>Search this image</Button>
                </Col>
                <Col width="10">
                </Col>
              </Row>

            </Page>
          </View>
        </Popup>
      </>
    );
  }
};
export default ImageCaptureClass;