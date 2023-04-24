import { useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import axios from "axios";

const Comment = ({ comment }: { comment: any }) => {
  return (
    <div>
      <Typography variant="h6">{comment.user.name}</Typography>
      <Typography variant="body1">{comment.commentText}</Typography>
      {comment.replies && (
        <Grid container spacing={2}>
          {comment.replies.map((reply: any) => (
            <Grid item xs={12} key={reply.id} sx={{ mb: 2, p: 2 }}>
              <Comment comment={reply} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

const Comments = () => {
  const [commentData, setCommentData] = useState<any>("");
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

  console.log(commentData);

  return (
    <Card>
      {loading ? null : (
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
  );
};

export default Comments;
