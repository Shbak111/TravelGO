import ReactDOM from "react-dom";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 400px;
  max-width: 90%;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Modal = ({ place, onClose }) => {
  if (!place) return null;

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContainer>
        <img
          src={place.first_image1 || "http://localhost:8080/assets/attraction_img.png"}
          alt={place.title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        />
        <h2>{place.title}</h2>
        <p>카테고리: {place.content_type_name || "정보 없음"}</p> {/* 카테고리 명 표시 */}
        <p>주소: {place.addr1}</p>
        <p>전화: {place.phone || "정보 없음"}</p>
        <p>위도: {place.latitude}</p> {/* 위도 표시 */}
        <p>경도: {place.longitude}</p> {/* 경도 표시 */}
        <button
          style={{
            marginTop: "16px",
            padding: "10px 16px",
            background: "#1A73E8",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          닫기
        </button>
      </ModalContainer>
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
