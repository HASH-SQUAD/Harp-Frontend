// 라이브러리
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { useQuery } from 'react-query';

// 파일
import * as _ from './style';
import Header from 'components/Header';
import KebabMenu from 'assets/Icon/KebabMenu';
import Heart from 'assets/image/Heart';
import Comment from 'components/community/Comment';
import Send from 'assets/image/Send';
import { theme } from 'lib/utils/style/theme';
import { getDayMinuteCounter } from 'lib/utils/getDayMinuteCounter';
import { slider } from 'config/slider';
import ImageDetail from 'components/community/ImageDetail';
import { Community_OnePost } from 'lib/apis/Community';
import { detailPost } from 'types/community';

const PostDetail = () => {
  const [post, setPost] = useState<detailPost | null>(null);
  const [message, setMessage] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const resizeHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
    setMessage(e.target.value);
  };

  const { id } = useParams<{ id: string }>();

  const { isLoading } = useQuery(
    ['getOnePost'],
    () => Community_OnePost(id ?? ''),
    {
      onSuccess: (response) => {
        setPost(response.data.post);
      },
      staleTime: 10000,
      cacheTime: 600000
    }
  );

  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleLikeClick = () => setIsLiked(!isLiked);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  if (!post || !id) {
    return <div>글이 삭제됐거나 이전되었습니다.</div>;
  }
  console.log(post, id);

  return (
    <_.PostDetail_Layout>
      <Header title="글 상세" />
      <_.PostDetail_Container>
        <_.PostDetail_SapceBetween>
          <_.PostDetail_TagBox>{post.tag}</_.PostDetail_TagBox>
          <KebabMenu onClick={() => {}} />
        </_.PostDetail_SapceBetween>
        <_.PostDetial_Title>{post.title}</_.PostDetial_Title>
        <_.PostDetail_Info>{` ${post['creator.nickname']} · ${getDayMinuteCounter(post.createdAt)}`}</_.PostDetail_Info>
        <_.PostDetail_Description>{post.des}</_.PostDetail_Description>
        <Slider {...slider}>
          {post.images?.map((image: string, index: number) => (
            <_.PostDetail_Image
              backgroundImage={image}
              key={index}
              onClick={() => openModal(image)}
            >
              <_.PostDetail_ImageIndex>
                {index + 1} / {post.images?.length}
              </_.PostDetail_ImageIndex>
            </_.PostDetail_Image>
          ))}
        </Slider>
        <_.PostDetail_Reaction>
          <Heart
            width="20"
            height="20"
            isFilled={isLiked}
            onClick={handleLikeClick}
          />
          <_.PostDetail_LikeCount>
            좋아요 {post.wishCount + (isLiked ? 1 : 0)}
          </_.PostDetail_LikeCount>
        </_.PostDetail_Reaction>
        <_.PostDetail_Line />
        <_.PostDetail_CommentCount>
          댓글 {post.comments.length}
        </_.PostDetail_CommentCount>
        <Comment />
      </_.PostDetail_Container>
      <_.PostDetail_TypingContainer>
        <_.PostDetail_ProfileImage />
        <_.PostDetail_TypingBox>
          <_.PostDetail_Textarea
            value={message}
            placeholder="댓글을 입력하세요..."
            rows={1}
            maxLength={50}
            ref={textareaRef}
            onChange={resizeHeight}
          />
          <_.PostDetail_SendIcon>
            <Send stroke={message ? theme.primary[7] : theme.gray[2]} />
          </_.PostDetail_SendIcon>
        </_.PostDetail_TypingBox>
      </_.PostDetail_TypingContainer>
      <ImageDetail
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        selectedImage={selectedImage}
      />
    </_.PostDetail_Layout>
  );
};

export default PostDetail;
