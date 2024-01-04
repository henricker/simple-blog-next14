import CommentShow from "@/components/comments/commentShow";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import { Suspense } from "react";

type CommentListProps = {
  postId: string
}

export default async function CommentList({ postId }: Readonly<CommentListProps>) {
  const comments = await fetchCommentsByPostId(postId);

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <Suspense key={comment.id}>
        <CommentShow
          commentId={comment.id}
          postId={postId}
        />
      </Suspense>

    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
