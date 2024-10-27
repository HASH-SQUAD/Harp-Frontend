import { theme } from 'lib/utils/style/theme';
import styled from 'styled-components';

export const Community_Layout = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Community_Header = styled.header`
  width: 100%;
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
  align-items: center;
`;

export const Community_Header_Title = styled.p`
  color: ${theme.gray.black};
  font-size: 19px;
  font-weight: 600;
`;

export const Community_CategoryList = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  padding: 0 20px 15px;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const Community_Category = styled.div<{ isSelected?: boolean }>`
  padding: 3px 14px;
  border-radius: 500px;
  background-color: ${(props) =>
    props.isSelected ? theme.primary[7] : theme.sub[1]};
  color: ${(props) => (props.isSelected ? theme.gray.white : theme.gray.black)};
  box-shadow: 0px 0px 3px 0px #f1f1f1;
  font-size: 16px;
  font-weight: 500;
`;

export const Community_NoticeList = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  padding: 0 20px 15px;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const Community_Notice = styled.div`
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${theme.primary[7]};
`;

export const Community_Notice_Title = styled.p`
  color: ${theme.gray.white};
  font-size: 12px;
  font-weight: 400;
`;

export const Community_Notice_Content = styled.p`
  color: ${theme.gray.white};
  font-size: 15px;
  font-weight: 500;
  min-width: 170px;
`;

export const Community_Notice_Date = styled.p`
  color: ${theme.gray.white};
  font-size: 10px;
  font-weight: 300;
`;