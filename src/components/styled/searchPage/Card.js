import styled from 'styled-components';

export const CardWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 0 0 32px;
  margin: 18px auto 0;
  width: 250px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  background-color: #28405E;
`;

export const CardHeader = styled.h3`
  padding-top: 32px;
  padding-bottom: 32px;
`;
