import styled from 'styled-components';

export const Position = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Container = styled.div`
  width: 100%;
  padding: 2%;
  border-bottom-style: outset;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2%;
  audio {
    width: 100%;
  }
`;

export default Position;
