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
    <Box sx={{ p: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h6">{comment.user.username}</Typography>
          <Typography variant="body1">{comment.commentText}</Typography>
          {comment.replies && (
            <Grid container spacing={2}>
              {comment.replies.map((reply: any) => (
                <Grid item xs={12} key={reply.id}>
                  <Comment comment={reply} />
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

const Comments = () => {
  const [commentData, setCommentData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getFeedDataFromBackend = async (url: string): Promise<void> => {
      const feedDataFromBackend = await axios.get(
        process.env.REACT_APP_API_ENDPOINT! + url
      );
      console.log(feedDataFromBackend.data);
      setCommentData(feedDataFromBackend.data);
      setLoading(false);
    };
    getFeedDataFromBackend("api/comment/postId/1");
  }, []);

  return (
    <Box>
      <Card>
        {!loading && (
          <CardContent sx={{ mb: 2 }}>
            <Typography variant="h5" component="h2">
              Comments
            </Typography>
            {commentData.map((comment: any) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </CardContent>
        )}
      </Card>
    </Box>
  );
};

export default Comments;
