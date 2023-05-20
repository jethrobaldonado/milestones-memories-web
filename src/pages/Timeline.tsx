import {Box, Paper} from "@mui/material";
import {db, storage} from '../config/firebase';
import {useEffect, useState} from "react";
import {collection, doc, getDocs} from "firebase/firestore";
import Typography from "@mui/material/Typography";
import {ref} from "firebase/storage";
const Timeline = () => {
  const [milestones, setMilestones] = useState([]);
  const [images, setImages] = useState({});
  const [imagePaths, setImagePaths] = useState({});
  useEffect(() => {
    const getData = async () => {
      const snap = await getDocs(collection(db, 'milestones'));
      const documents = [];
      const imagePaths = {};
      snap.forEach((doc) => {
        const data = doc.data();
        console.log(data);
        documents.push({
          ...doc.data(),
          image: `https://storage.googleapis.com/${data.image}`
        });
        if (data.image) {
          imagePaths[doc.id] = data.image;
        }
      });
      console.log(imagePaths);
      setImagePaths(imagePaths);
      setMilestones(documents);
    };

    getData();
  }, []);

  useEffect(() => {
    if (imagePaths) {
      const getImage = async () => {
        const images = {};
        for (const id of Object.keys(imagePaths)) {
          const storageRef = ref(storage, imagePaths[id]);
          images
        }
      };
      getImage();
    }
  }, [imagePaths]);

  return (
    <Box paddingY={2}>
      {
        milestones && milestones.map(({id, title, description, date, image}, key) => (
          <Box marginY={2} key={`milestone-${date}-${key}`}>
            <Paper>
              <Box padding={2}>
                {image && <img src={image} />}
                <Typography variant={'h4'}>{title}</Typography>
                <Typography variant={'caption'}>{date}</Typography>
                <Box>
                  <Typography variant={'body1'}>{description}</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        ))
      }
    </Box>
  );
};

export default Timeline;