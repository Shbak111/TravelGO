import styled from "styled-components";

export const BoardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const WriteButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const SearchSection = styled.div`
  display: flex;
  gap: 10px;

  select {
    padding: 6px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }

  input {
    padding: 6px;
    border-radius: 4px;
    border: 1px solid #ddd;
    width: 200px;
  }

  button {
    padding: 6px 12px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f8f9fa;
    font-weight: bold;
  }

  tr:hover {
    background-color: #f5f5f5;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;

  button {
    padding: 6px 12px;
    border: 1px solid #ddd;
    background-color: white;
    cursor: pointer;

    &.active {
      background-color: #007bff;
      color: white;
      border-color: #007bff;
    }

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;
