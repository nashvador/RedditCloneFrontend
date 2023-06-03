import { useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography, Box } from "@mui/material";
import axios from "axios";

// have post fetch the comments and then pass it as parameter

// const Comments = ({ comments }) => {
//   const newReplies = useState([])

//   return (<>
//     comments.map((comment) => {
//       <div for displaying comment />
//       // add reply button with onclick to update newReplies
//       <Comments comments={comment.replies} />
//     })
//     newReplies.map((reply) => {
//       <Comments comments={newReplies} />
//     }
//   </>)
// }

// const Post = ({ post }) => {
//   const comments = useEffect(...)

//   return (
//     <div for displaying post />
//     <Comments comments={comments} />
//   )
// }

const Comment = ({ comment }: { comment: any }) => {
  return (
    <Box>
      {comment.map((comment: any) => (
        <Box sx={{ p: 2, width: "30rem" }}>
          <Card>
            <CardContent>
              <Typography variant="h6">{comment.user.username}</Typography>
              <Typography variant="body1">{comment.commentText}</Typography>
              {<Comment comment={comment.replies} />}
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default Comment;
