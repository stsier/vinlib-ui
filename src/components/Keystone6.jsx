import React from 'react';
import { Button, View, Page, Navbar, NavRight, Link, Block, Col, Row } from 'framework7-react';

import { gql, useMutation } from '@apollo/client';

const MUTATION_UPDATE = gql`
   mutation UploadFile($file: Upload!, $title:String){
    updateWine (
        where: { id: "ckusdtzgz0371xwwawr5rc1gl" },
        data: { 
            title: $title,
            photo : {
                  upload: $file
            }
        },
        ) {title}
    }
`;

const MUTATION_RENAME = gql`
   mutation Rename($title:String){
    updateWine (
        where: { id: "ckusdtzgz0371xwwawr5rc1gl" },
        data: { 
            title: $title,
        },
        ) {title}
    }
`;

const MUTATION_CREATE = gql`
   mutation UploadFile($file: Upload!, $title:String) {
    createWine (
        data: { 
            title: $title,
            photo : {
                  upload: $file
            }
        },
        ) {title}
    }
`;


const Keystone6 = ({ children, type, data, callback }) => {

    const [mutate_create] = useMutation(MUTATION_CREATE);
    const imgRef = React.useRef();

    function urltoFile(url, filename, mimeType) {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { console.log(buf); return new File([buf], filename, { type: mimeType }); })
        );
    }

    function onChange({
        target: {
            validity,
            files: [file],
        },
    }) {
        if (validity.valid) {

            var reader = new FileReader();

            reader.onload = function (event) {
                imgRef.current.src = data.image = event.target.result;
            };

            reader.readAsDataURL(file);

             mutate_create({ variables: { file } });
        }
        else console.log("file non valid");
    }
    const sendToAnalyse = () => {

        //console.log(imgRef.current.src);
        /*urltoFile(imgRef.current.src, "wine.jpg", "image/jpeg").then((file) => {
          mutate_create({ variables: { file } });
        });*/
        fetch(data.image)
            .then((res) => {
                res.blob().then((b) => {
                    var file = new File([b], data.title + ".jpg", { type: "image/jpeg" });
                    let title = data.title;
                    console.log(file);
                    //callback();
                     mutate_create({ variables: { file, title } }).then((r) => { 
                         console.log(r); 
                         imgRef.current.src = "https://lh3.googleusercontent.com/ogw/ADea4I46XbqO-PK1QDGlp0nuZgsv298S6RejdHsASlnL1A=s64-c-mo";
                        });
                });
            });
    }
    let elementToRender;
    if (type == "camera")
        elementToRender = <Button
            fill raised
            onClick={
                () => { sendToAnalyse(); }
            }
        >
            Send to analyse
        </Button>;
    else if(type == "browse")
        elementToRender = <input type="file" required onChange={(e) => { onChange(e); }} />;
    else 
        elementToRender = <></>;

    return (
        <View>
            <Page>
                <Navbar title={data.title}>
                    <NavRight>
                        <Link popupClose>Close</Link>
                    </NavRight>
                </Navbar>
                <img ref={imgRef} src={data.image} alt={data.title} width={window.innerWidth} />
                <Row>
                    <Col width="10">
                    </Col>
                    <Col width="80">
                        {elementToRender}
                        {children || 'Keystone6'}
                    </Col>
                    <Col width="10">
                    </Col>
                </Row>

            </Page>
        </View>
    );
}

export default Keystone6;