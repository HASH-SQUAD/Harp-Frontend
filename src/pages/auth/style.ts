import styled from "styled-components";

export const Auth_Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #fbc7d4 0%, #9796f0 100%);
`;

export const Auth_Layout = styled.div<{ StatusBarSize?: string }>`
  padding: ${(props) => props.StatusBarSize || "54px"} 40px 52px 40px;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const Auth_Title_Layout = styled.div`
  padding-top: 48px;
`;

export const Auth_Title_Big = styled.p`
  white-space: pre-line;
  font-size: 48px;
  font-weight: 700;
  color: white;
`;

export const Auth_Title_Small = styled.p`
  color: white;
  padding-top: 10px;
  font-weight: 400;
`;

export const Auth_Button_Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 16px;
`;

export const Auth_Button_Ballon = styled.div`
  background-color: white;
  padding: 10px 16px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

export const Auth_Button_Ballon_Title = styled.p`
  color: #1a1e27;
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Auth_Button_Ballon_SVG = styled.div`
  position: absolute;
  top: 36px;
`;

export const Auth_Button_Hint = styled.p`
  color: #505866;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;