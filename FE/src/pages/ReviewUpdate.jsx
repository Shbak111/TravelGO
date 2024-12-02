import { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { ClipLoader } from "react-spinners";

function ReviewUpdate() {
  const navigate = useNavigate();
  const location = useLocation();
  const axios = useAxios();
  const { detail } = location.state;
  const [title, setTitle] = useState(detail?.review_title);
  const [content, setContent] = useState(detail?.review_content);
  const [isAddLoading, setAddLoading] = useState(false);

  const [existingImage, setExistingImage] = useState(detail?.image_path || null); // 기존 이미지 경로
  const [isImageDeleted, setIsImageDeleted] = useState(false); // 기존 이미지 삭제 여부
  const [newImage, setNewImage] = useState(null); // 새 이미지

  // 기존 이미지 삭제 핸들러
  const handleDeleteExistingImage = () => {
    setExistingImage(null);
    setIsImageDeleted(true);
  };

  // 새 이미지 업로드 핸들러
  const handleNewImageUpload = (e) => {
    const file = e.target.files[0];

    if (file && !file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      e.target.value = ""; // 입력 필드 초기화
      return;
    }

    setIsImageDeleted(true);
    setNewImage(e.target.files[0]);
  };

  // 수정 요청
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 여기에 submit 로직 추가
    setAddLoading(true);

    const formData = new FormData();
    formData.append("review_id", detail.review_id);
    formData.append("review_title", title);
    formData.append("review_content", content);

    if (isImageDeleted) {
      formData.append("isImageDeleted", true); // 기존 이미지 삭제 플래그
    }

    if (newImage) {
      formData.append("newImage", newImage); // 새 이미지 파일
    }

    try {
      await axios.put("/reviews/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(-1, {
        replace: true,
      });
    } catch (error) {
      console.error("수정 실패:", error);
    } finally {
      setAddLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1, {
      replace: true,
    });
  };

  return (
    <ReviewContainer>
      <Title>리뷰 수정</Title>
      {isAddLoading ? <ClipLoader /> : null}
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>현재 이미지</Label>
          {existingImage ? (
            <div>
              <img
                src={`http://localhost:8080${existingImage}`} // 기존 이미지 경로 표시
                alt="현재 이미지"
                style={{ maxWidth: "200px" }}
              />
              <button onClick={handleDeleteExistingImage}>이미지 삭제</button>
            </div>
          ) : (
            <p>이미지가 없습니다.</p>
          )}
        </InputGroup>

        <InputGroup>
          <Label htmlFor="newImage">새 이미지 업로드</Label>
          {newImage && (
            <ImagePreview>
              <img src={URL.createObjectURL(newImage)} alt="미리보기" />
            </ImagePreview>
          )}
          <Input id="newImage" type="file" accept="image/*" onChange={handleNewImageUpload} />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="content">내용</Label>
          <TextArea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해주세요"
            required
          />
        </InputGroup>

        <ButtonGroup>
          <BackButton type="button" onClick={handleBack}>
            뒤로가기
          </BackButton>
          <SubmitButton type="submit">수정완료</SubmitButton>
        </ButtonGroup>
      </Form>
    </ReviewContainer>
  );
}

const ReviewContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #666;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 300px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
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

const SubmitButton = styled(Button)`
  background-color: #4a90e2;
  color: white;
  flex: 1;

  &:hover {
    background-color: #357abd;
  }
`;

const BackButton = styled(Button)`
  background-color: #e0e0e0;
  color: #666;

  &:hover {
    background-color: #d0d0d0;
  }
`;

const ImagePreview = styled.div`
  margin-top: 1rem;
  img {
    max-width: 100%;
    max-height: 300px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

export default ReviewUpdate;
