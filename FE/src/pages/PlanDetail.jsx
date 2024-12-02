import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";

function PlanDetail() {
  const params = useParams();
  const axios = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDetailLoading, setDetailLoading] = useState(false);
  const [detail, setDetail] = useState();
  const [isMyPlan, setIsMyPlan] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // 사용자가 좋아요를 눌렀는지 여부
  const [likeCount, setLikeCount] = useState(0); // 좋아요 개수
  const [comments, setComments] = useState([]); // 댓글 목록
  const [newComment, setNewComment] = useState(""); // 새 댓글 내용
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID
  const [editedComment, setEditedComment] = useState(""); // 수정된 댓글 내용

  async function fetchDetail() {
    setDetailLoading(true);
    await axios
      .get(`/plan-boards/detail/${params.plan_id}`)
      .then((res) => {
        setDetail(res.data);
        setLikeCount(res.data.hit); // 좋아요 수 설정
        res.data.user_id === sessionStorage.getItem("UserId") ? setIsMyPlan(true) : setIsMyPlan(false);
      })
      .finally(() => {
        setDetailLoading(false);
      });
  }

  async function fetchIsLiked() {
    setDetailLoading(true);
    await axios
      .get(`/plan-boards/hit/${params.plan_id}`)
      .then((res) => {
        if (res.status === 200) setIsLiked(true);
        else setIsLiked(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setDetailLoading(false);
      });
  }

  // 댓글 불러오기
  async function fetchComments() {
    try {
      const response = await axios.get(`/plan-boards/comment/${params.plan_id}`);
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
      await axios.post(`/plan-boards/comment`, {
        plan_id: params.plan_id,
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
      await axios.put(`/plan-boards/comment`, {
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
      await axios.delete(`/plan-boards/comment/${commentId}`);
      fetchComments(); // 댓글 목록 갱신
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
      alert("댓글 삭제에 실패했습니다.");
    }
  }

  useEffect(() => {
    fetchDetail();
    fetchComments();
    fetchIsLiked();
  }, []);

  const handleBack = () => {
    navigate(`/plan`, {
      state: {
        page: location.state.page,
        keyWord: location.state.keyWord,
        refresh: true,
      },
    });
  };

  const handleLike = async () => {
    try {
      if (isLiked) {
        // 이미 좋아요를 눌렀다면 취소
        await axios.delete(`/plan-boards/hit/${params.plan_id}`);
        await axios.patch(`/users/sub/like/${detail?.user_id}`);
        setLikeCount((prev) => prev - 1);
      } else {
        // 좋아요 추가
        await axios.post(`/plan-boards/hit/${params.plan_id}`);
        await axios.patch(`/users/add/like/${detail?.user_id}`);
        setLikeCount((prev) => prev + 1);
      }
      setIsLiked(!isLiked); // 좋아요 상태 토글
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
      alert("좋아요 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 삭제 핸들러
  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/plan-boards/${params.plan_id}`);
      alert("플랜이 성공적으로 삭제되었습니다.");
      navigate("/plan", {
        state: {
          page: location.state.page,
          keyWord: location.state.keyWord,
          refresh: true,
        },
      });
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 수정 핸들러
  const handleEdit = () => {
    navigate(`/plan/update/${params.plan_id}`, {
      state: {
        page: location.state.page,
        keyWord: location.state.keyWord,
        refresh: true,
      },
    });
  };

  return (
    <>
      {isDetailLoading ? (
        <LoaderWrapper>
          <ClipLoader />
        </LoaderWrapper>
      ) : (
        <PlanDetailContainer>
          <HeaderSection>
            <PlanTitle>{detail?.plan_title}</PlanTitle>
            <BackButton type="button" onClick={handleBack}>
              뒤로가기
            </BackButton>
          </HeaderSection>
          <Divider />
          <PlanMeta>
            <MetaItem>작성자: {detail?.user_name}</MetaItem>
            <MetaItem>작성일: {detail?.created_at}</MetaItem>
          </PlanMeta>

          {isMyPlan && (
            <PlanActions>
              <EditButton onClick={handleEdit}>수정</EditButton>
              <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
            </PlanActions>
          )}

          <PlanContent>
            <AttractionsContainer>
              <AttractionsTitle>방문할 장소</AttractionsTitle>
              <AttractionsGrid>
                {detail?.attractions?.map((attraction, index) => (
                  <AttractionCard key={attraction.no}>
                    <CardHeader>
                      <span>
                        {index + 1}. {attraction.title}
                      </span>
                      <ContentType>{attraction.content_type_name}</ContentType>
                    </CardHeader>
                    <CardImage
                      src={attraction.first_image1 || "http://localhost:8080/assets/attraction_img.png"}
                      alt={attraction.title}
                    />
                    <CardContent>
                      <p>
                        {attraction.sido_name}/{attraction.gugun_name}
                      </p>
                      <p>주소: {attraction.addr1}</p>
                    </CardContent>
                  </AttractionCard>
                ))}
              </AttractionsGrid>
            </AttractionsContainer>
            <Divider />
            <h3>총 거리: {detail?.distance}km</h3>
            <PlanParagraph>{detail?.plan_detail}</PlanParagraph>
            <LikeButton
              onClick={handleLike}
              liked={isLiked} // 스타일에 상태 반영
            >
              {isLiked ? "좋아요 취소👎" : "좋아요👍"} ({likeCount})
            </LikeButton>
          </PlanContent>
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
                        <SaveEditButton onClick={() => handleUpdateComment(comment.comment_id)}>저장</SaveEditButton>
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
        </PlanDetailContainer>
      )}
    </>
  );
}

// 스타일 컴포넌트
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const PlanDetailContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
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

const PlanTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
`;

const BackButton = styled(Button)`
  background-color: #e0e0e0;
  color: #666;

  &:hover {
    background-color: #d0d0d0;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid #ddd;
  margin: 15px 0;
`;

const PlanMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: #555;
  margin-bottom: 20px;
`;

const MetaItem = styled.span`
  margin-right: 15px;
`;

const PlanContent = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #333;
  position: relative;
`;

const PlanParagraph = styled.p`
  white-space: pre-wrap;
  margin-bottom: 20px;
`;

const AttractionsContainer = styled.div`
  margin-top: 30px;
`;

const AttractionsTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const AttractionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const AttractionCard = styled.div`
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: #f4f4f4;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #ddd;
`;

const ContentType = styled.span`
  font-size: 0.9rem;
  color: #777;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto; /* 자동 높이로 조정하여 잘리지 않게 함 */
  max-height: 200px; /* 최대 높이를 제한 */
  object-fit: contain; /* 이미지를 잘리지 않고 비율에 맞게 조정 */
  background-color: #f0f0f0; /* 비율에 맞지 않는 이미지를 대비해 배경색 추가 */
`;

const CardContent = styled.div`
  padding: 15px;
  font-size: 0.9rem;
  color: #555;
`;

const LikeButton = styled(Button)`
  background-color: ${(props) => (props.liked ? "#dc3545" : "#007bff")};
  color: white;
  margin: 20px auto 0;
  display: block;

  &:hover {
    background-color: ${(props) => (props.liked ? "#c82333" : "#0056b3")};
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

export default PlanDetail;
