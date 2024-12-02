import ReactDOM from "react-dom";

const PlanModal = ({ isOpen, onClose, onSubmit, title, setTitle, description, setDescription }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 999,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
          zIndex: 1000,
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "24px",
            height: "24px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>플랜 등록하기</h2>
        <input
          type="text"
          placeholder="플랜 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // 부모 상태 업데이트
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />
        <textarea
          placeholder="플랜 상세 설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // 부모 상태 업데이트
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
            resize: "none",
          }}
        />
        <button
          onClick={onSubmit}
          style={{
            padding: "10px 16px",
            background: "#1A73E8",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            display: "block",
            width: "100%",
          }}
        >
          등록하기
        </button>
      </div>
    </>,
    document.getElementById("modal-root")
  );
};

export default PlanModal;
