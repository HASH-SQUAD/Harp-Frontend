import { theme } from 'lib/utils/style/theme';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const PostDetail_Layout = styled.div<{ isRepliedComment: boolean }>`
  position: fixed;
  width: 100%;
  overflow-x: hidden;
  height: calc(
    100vh - ${(props) => (props.isRepliedComment ? '90px' : '60px')}
  );
`;

export const PostDetail_Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 0 20px;
  
  @media screen and (min-width: 768px) {
    max-width: 768px;
    margin: 0 auto;
    padding: 0 40px;
  }
`;

export const PostDetail_SapceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const PostDetail_TagBox = styled.div`
  border-radius: 5px;
  padding: 5px 8px;
  background-color: ${theme.sub[1]};
  color: ${theme.gray.black};
  font-size: 12px;
`;

export const PostDetial_Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: ${theme.gray.black};
  margin-top: 8px;

  @media screen and (min-width: 768px) {
    font-size: 28px;
    margin-top: 16px;
  }
`;

export const PostDetail_Info = styled.div`
  margin-top: 4px;
  font-size: 14px;
  color: ${theme.gray['3.5']};
`;

export const PostDetail_Description = styled.div`
  margin-top: 10px;
  font-size: 17px;
  color: ${theme.gray.black};

  @media screen and (min-width: 768px) {
    font-size: 19px;
    margin-top: 20px;
    line-height: 1.6;
  }
`;

export const PostDetail_Image = styled.div<{ backgroundImage: string }>`
  max-width: 500px;
  margin-top: 15px;
  position: relative;
  width: 50%;
  display: flex;
  justify-content: center;
  padding-bottom: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.backgroundImage});

  @media screen and (min-width: 768px) {
    width: 70%;
    max-width: 700px;
    margin: 24px auto;
  }
`;

export const PostDetail_Reaction = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  gap: 4px;
`;

export const PostDetail_LikeCount = styled.span`
  font-size: 16px;
  color: ${theme.gray.black};
`;

export const PostDetail_Line = styled.div`
  border: 2.5px solid ${theme.gray[0]};
  width: 100%;
  margin-top: 30px;
`;

export const PostDetail_CommentCount = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: ${theme.gray.black};
  padding: 32px 0 15px 0;
  padding: 11px 20px;
`;

export const PostDetail_Comments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px 20px 0;
`;

export const PostDetail_ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: pink;
  flex-shrink: 1;
  border: 1px solid ${theme.gray[1]};
`;

export const PostDetail_Bottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  background-color: ${theme.gray.white};

  @media screen and (min-width: 768px) {
    max-width: 768px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 1px solid ${theme.gray[1]};
    border-right: 1px solid ${theme.gray[1]};
  }
`;

export const PostDetail_Replying = styled.div`
  width: 100%;
  padding: 5px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.gray[0]};
  color: ${theme.gray['3.5']};
`;

export const PostDetail_TypingContainer = styled.div`
  width: 100%;
  padding: 12px 20px 52px;
  gap: 10px;
  height: max-content;
  position: relative;
  display: flex;
  align-items: center;
`;

export const PostDetail_TypingBox = styled.div`
  display: flex;
  width: 86%;
  height: auto;
  max-height: 120px;
  justify-content: space-between;
  border-radius: 40px;
  border: 1px solid ${theme.gray[1]};
  padding: 13px 24px;

  @media screen and (min-width: 768px) {
    width: 90%;
    padding: 16px 28px;
  }
`;

export const PostDetail_Textarea = styled.textarea`
  width: 88%;
  height: auto;
  max-height: 100px;
  border: none;
  outline: none;
  color: ${theme.gray.black};
  background-color: ${theme.gray.white};
  &::placeholder {
    color: ${theme.gray[2]};
  }
  font-size: 14px;
  font-weight: 400;
  resize: none;
  overflow-y: auto;
`;

export const PostDetail_SendIcon = styled.div`
  display: flex;
  align-items: center;
`;

export const PostDetail_ImageIndex = styled.div`
  text-align: center;
  font-size: 12px;
  color: ${theme.gray.white};
  display: flex;
  padding: 4px 8px;
  align-items: center;
  bottom: 10px;
  right: 10px;
  position: absolute;
  border-radius: 16px;
  background: rgba(102, 102, 102, 0.3);
`;

export const PostDetail_Message = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: ${theme.gray['2.5']};
`;
