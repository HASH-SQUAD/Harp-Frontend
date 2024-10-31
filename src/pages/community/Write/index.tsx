// 라이브러리
import React from 'react';

//파일
import CategoryModal from 'components/community/CategoryModal';
import * as _ from './style'
import Header from 'components/Header';

const Write = () => {
  return (
    <_.Write_Layout>
        <Header title='글 쓰기' buttonState=''/>
      <_.Write_Container>
      <CategoryModal onClose={()=>{}} isOpen={true} onSelectCategory={()=>{}} />
      </_.Write_Container>
    </_.Write_Layout>
  );
};

export default Write;