import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { ClipLoader } from "react-spinners";

function ReviewAdd() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const axios = useAxios();

  const [isAddLoading, setAddLoading] = useState(false);
  const [image, setImage] = useState(null); // 이미지 파일 상태 추가

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && !file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      e.target.value = ""; // 입력 필드 초기화
      return;
    }

    if (file) {
      setImage(file); // 이미지 파일 상태 업데이트
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 여기에 submit 로직 추가
    setAddLoading(true);

    const formData = new FormData(); // FormData 객체 생성
    formData.append("review_title", title); // 제목 추가
    formData.append("review_content", content); // 내용 추가
    if (image) {
      formData.append("image", image); // 이미지 파일 추가
    }

    try {
      await axios.post("/reviews/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 멀티파트 헤더 설정
        },
      });
      await axios.patch("/users/write"); // 작성 후 사용자 정보 업데이트
    } catch (error) {
      console.log("에러 발생:", error);
    } finally {
      setAddLoading(false);
    }
    handleBack();
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <ReviewContainer>
      <Title>리뷰 작성</Title>
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
          <Label htmlFor="image">이미지 업로드</Label>
          <Input
            id="image"
            type="file"
            accept="image/*" // 이미지 파일만 선택 가능
            onChange={handleImageChange} // 파일 선택 이벤트 핸들러
          />
          {image && (
            <ImagePreview>
              <img src={URL.createObjectURL(image)} alt="미리보기" />
            </ImagePreview>
          )}
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
          <SubmitButton type="submit">작성완료</SubmitButton>
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

export default ReviewAdd;
