import React from 'react';
import { Button } from 'framework7-react';
import { gql, useMutation } from '@apollo/client';
/*
const MUTATION = gql`
  mutation ($file: Upload!){
    updateWine (
        where: { id: "ckusdtzgz0371xwwawr5rc1gl" }
            data: { 
                title: "hey",
                photo : {
                     upload: $file
                }
            },
        ) {title}
    }
`; */
const MUTATION = gql`
   mutation UploadFile($file: Upload!) {
    updateWine (
        where: { id: "ckusdtzgz0371xwwawr5rc1gl" }
            data: { 
                title: "hey",
                photo : {
                     upload: $file
                }
            },
        ) {title}
    }
`;

const UploadFile = ({imageFile}) => {

    const [mutate] = useMutation(MUTATION);

   // console.log(imageFile);

   // if("{}" != JSON.stringify(imageFile)) 
    
   // else console.log("empty file");
    
    function onChange({
        
        target: {
            validity,
            files: [file],
        },
    }) {
        
        if (validity.valid) {
          // mutate({ variables: { file } });
          console.log(imageFile);
           mutate({ variables: { imageFile } });

          //  if("{}" != JSON.stringify(file)) 
          //  mutate({ variables: { file } });
        }
        else console.log("file non valid");
    }

    return (
    <>
        <input type="file" required onChange={onChange} />
    </>
    );
}

export default UploadFile;