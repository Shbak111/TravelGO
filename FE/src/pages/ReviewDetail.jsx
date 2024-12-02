import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";

function ReviewDetail() {
  const params = useParams();
  const axios = useAxios();
  const navigate = useNavigate();
  const [isDetailLoading, setDetailLoading] = useState(false);
  const [detail, setDetail] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [isLikedLoading, setIsLikedLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]); // 댓글 목록
  const [newComment, setNewComment] = useState(""); // 새 댓글 내용
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID
  const [editedComment, setEditedComment] = useState(""); // 수정된 댓글 내용

  const hideByUpdate = location.pathname.includes("/update");

  async function fetchDetail() {
    setDetailLoading(true);
    await axios
      .get(`/reviews/detail/${params.review_id}`)
      .then((res) => {
        console.log(res.data);

        setDetail(res.data);
        setLikeCount(res.data.hit);
      })
      .finally(() => {
        setDetailLoading(false);
      });
  }

  async function deleteReview() {
    await axios.delete(`/reviews/delete/${params.review_id}`);

    navigate(-1, {
      replace: true,
    });
  }

  async function checkLiked() {
    setIsLikedLoading(true);
    await axios
      .get(`/reviews/check/${params.review_id}`)
      .then((res) => {
        if (res.status === 204) {
          setIsLiked(false);
        } else {
          setIsLiked(true);
        }
      })
      .finally(() => {
        setIsLikedLoading(false);
      });
  }

  const onDelete = () => {
    deleteReview();
  };

  const onUpdate = () => {
    navigate(`/review/detail/${params.review_id}/update`, {
      state: {
        detail,
      },
    });
  };

  const onLikeClick = async () => {
    try {
      if (isLiked) {
        // 이미 좋아요를 눌렀다면 취소
        await axios.delete(`/reviews/hits/${params.review_id}`);
        await axios.patch(`/users/sub/like/${detail?.user_id}`);
        setLikeCount((prev) => prev - 1);
      } else {
        // 좋아요 추가
        await axios.post(`/reviews/hits/${params.review_id}`);
        await axios.patch(`/users/add/like/${detail?.user_id}`);
        setLikeCount((prev) => prev + 1);
      }
      setIsLiked(!isLiked); // 좋아요 상태 토글
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
      alert("좋아요 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 댓글 불러오기
  async function fetchComments() {
    try {
      const response = await axios.get(`/reviews/comment/${params.review_id}`);
      setComments(response.data); // 댓글 데이터 설정
    } catch (error) {
      console.error("댓글을 가져오는 중 오류 발생:", error);
    }
  }

  // 댓글 작성
  async function handleAddComment() {
    if (newComment.trim() === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await axios.post(`/reviews/comment`, {
        review_id: params.review_id,
        content: newComment,
      });
      setNewComment(""); // 입력 필드 초기화
      fetchComments(); // 댓글 목록 갱신
    } catch (error) {
      console.error("댓글 작성 중 오류 발생:", error);
      alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
    }
  }

  // 댓글 수정
  async function handleUpdateComment(commentId) {
    if (editedComment.trim() === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await axios.put(`/reviews/comment`, {
        comment_id: commentId,
        content: editedComment,
      });
      setEditingCommentId(null); // 수정 모드 종료
      setEditedComment(""); // 입력 필드 초기화
      fetchComments(); // 댓글 목록 갱신
    } catch (error) {
      console.error("댓글 수정 중 오류 발생:", error);
      alert("댓글 수정에 실패했습니다. 다시 시도해주세요.");
    }
  }

  // 댓글 수정 취소
  function handleCancelEdit() {
    setEditingCommentId(null); // 수정 모드 종료
    setEditedComment(""); // 입력 필드 초기화
  }

  // 댓글 삭제
  async function handleDeleteComment(commentId) {
    const confirmDelete = window.confirm("댓글을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/reviews/comment/${commentId}`);
      fetchComments(); // 댓글 목록 갱신
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
      alert("댓글 삭제에 실패했습니다.");
    }
  }

  useEffect(() => {
    checkLiked();
    fetchDetail();
    fetchComments();
  }, [isLiked, hideByUpdate]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      {hideByUpdate ? (
        <Outlet />
      ) : (
        <>
          {isDetailLoading ? (
            <ClipLoader />
          ) : (
            <ReviewDetailContainer>
              <HeaderSection>
                <ReviewTitle>{detail?.review_title}</ReviewTitle>
                <BackButton type="button" onClick={handleBack}>
                  뒤로가기
                </BackButton>
              </HeaderSection>
              <Divider />
              <ReviewMeta>
                <MetaItem>작성자: {detail?.user_name}</MetaItem>
                <MetaItem>작성일: {detail?.created_at}</MetaItem>
                <MetaItem>좋아요: {detail?.hit}</MetaItem>
              </ReviewMeta>
              {sessionStorage.getItem("UserId") === detail?.user_id ? (
                <PlanActions>
                  <EditButton type="button" onClick={onUpdate}>
                    수정하기
                  </EditButton>
                  <DeleteButton type="button" onClick={onDelete}>
                    삭제하기
                  </DeleteButton>
                </PlanActions>
              ) : null}
              <ReviewContent>
                {detail?.image_path && (
                  <ReviewImage src={`http://localhost:8080${detail?.image_path}`} alt="리뷰 이미지" />
                )}
                <ReviewParagraph>{detail?.review_content}</ReviewParagraph>
                <LikeButton onClick={onLikeClick}>
                  {isLiked ? "좋아요 취소👎" : "좋아요👍"}({likeCount})
                </LikeButton>
              </ReviewContent>
              <Divider />
              <CommentSection>
                <h3>댓글</h3>
                <CommentInputWrapper>
                  <CommentInput
                    type="text"
                    placeholder="댓글을 입력하세요..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <AddCommentButton onClick={handleAddComment}>작성</AddCommentButton>
                </CommentInputWrapper>
                <CommentList>
                  {comments.map((comment) => (
                    <CommentItem key={comment.comment_id}>
                      {editingCommentId === comment.comment_id ? (
                        // 수정 모드
                        <EditMode>
                          <EditCommentInput
                            type="text"
                            value={editedComment}
                            onChange={(e) => setEditedComment(e.target.value)}
                          />
                          <EditButtonWrapper>
                            <SaveEditButton onClick={() => handleUpdateComment(comment.comment_id)}>
                              저장
                            </SaveEditButton>
                            <CancelEditButton onClick={handleCancelEdit}>취소</CancelEditButton>
                          </EditButtonWrapper>
                        </EditMode>
                      ) : (
                        // 일반 모드
                        <>
                          <CommentHeader>
                            <CommentAuthor>작성자: {comment.user_name}</CommentAuthor>
                            <CommentDate>{comment.created_at}</CommentDate>
                          </CommentHeader>
                          <CommentContent>💬{comment.content}</CommentContent>
                          {comment.user_id === sessionStorage.getItem("UserId") ? (
                            <CommentActions>
                              <EditCommentButton
                                onClick={() => {
                                  setEditingCommentId(comment.comment_id); // 수정 모드 활성화
                                  setEditedComment(comment.content); // 기존 내용 설정
                                }}
                              >
                                수정
                              </EditCommentButton>
                              <DeleteCommentButton onClick={() => handleDeleteComment(comment.comment_id)}>
                                삭제
                              </DeleteCommentButton>
                            </CommentActions>
                          ) : null}
                        </>
                      )}
                    </CommentItem>
                  ))}
                </CommentList>
              </CommentSection>
            </ReviewDetailContainer>
          )}
        </>
      )}
    </>
  );
}

// styled-components로 스타일링
const ReviewDetailContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-family: "Arial", sans-serif;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ReviewTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%; /* 타이틀이 너무 길 경우를 대비해 폭 제한 */
`;

const BackButton = styled(Button)`
  background-color: #e0e0e0;
  color: #666;

  &:hover {
    background-color: #d0d0d0;
  }
`;

const PlanActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: flex-end;
`;

const EditButton = styled(Button)`
  background-color: #ffc107;
  color: #fff;

  &:hover {
    background-color: #e0a800;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  color: #fff;

  &:hover {
    background-color: #c82333;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid #ddd;
  margin: 15px 0;
`;

const ReviewMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: #555;
  margin-bottom: 20px;
`;

const MetaItem = styled.span`
  margin-right: 15px;
`;

const ReviewContent = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #333;
  position: relative;
`;

const ReviewParagraph = styled.p`
  white-space: pre-wrap;
  margin-bottom: 20px;
`;

const LikeButton = styled(Button)`
  background-color: #007bff;
  color: white;
  margin: 20px auto 0;
  display: block;

  &:hover {
    background-color: #0056b3;
  }
`;

const CommentSection = styled.div`
  margin-top: 30px;
`;

const CommentInputWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const AddCommentButton = styled(Button)`
  background-color: #28a745;
  color: white;

  &:hover {
    background-color: #218838;
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CommentItem = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CommentAuthor = styled.span`
  font-weight: bold;
  color: #333;
`;

const CommentDate = styled.span`
  font-size: 0.9rem;
  color: #777;
`;

const CommentContent = styled.p`
  font-size: 1rem;
  color: #555;
`;

const DeleteCommentButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    color: #c82333;
  }
`;

const EditMode = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EditCommentInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
`;

const EditButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const SaveEditButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const CancelEditButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const CommentActions = styled.div`
  display: flex;
  gap: 10px;
`;

const EditCommentButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

const ReviewImage = styled.img`
  max-width: 100%; /* 이미지가 컨테이너를 넘치지 않도록 설정 */
  height: auto; /* 비율 유지 */
  margin: 20px 0; /* 이미지와 텍스트 간격 추가 */
  border-radius: 8px; /* 모서리 둥글게 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
`;

export default ReviewDetail;
