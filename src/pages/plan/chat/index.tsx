// 라이브러리
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

// 파일
import * as _ from './style';
import Header from 'components/Header';
import Send from 'assets/image/Send';
import { theme } from 'lib/utils/style/theme';
import MessageBox from 'components/MessageBox';
import { initialQuestions } from 'data/InitialQuestions';
import { AIResponse } from 'types/aiResponse';
import { Plan_Chatting, Plan_Create, Plan_Result } from 'lib/apis/Plan';
import { formatSelectedDate } from 'lib/utils/formatSelectedDate';
import { useRecoilValue } from 'recoil';
import { selectedDaysState } from 'atoms/plan';
import PlanResult from 'components/PlanResult';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { ActivityComponentType } from '@stackflow/react';

const PLAN_IMAGE =
  'https://harp-back.hash-squad.kro.kr/common/CommonPlanImg.png';

interface ChatParams {
  id: string;
}

const Chat: ActivityComponentType<ChatParams> = ({ params }) => {
  const id = params.id;
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [sendImmediately, setSendImmediately] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [pendingMessage, setPendingMessage] = useState<AIResponse | null>(null);
  const [isWaitingForReply, setIsWaitingForReply] = useState(false);
  const [chatHistory, setChatHistory] = useState<AIResponse[]>([]);
  const [step, setStep] = useState<number>(0);
  const [planInfo, setPlanInfo] = useState<{ title: string; type: string }>({
    title: '',
    type: ''
  });
  const [planId, setPlanId] = useState('');
  const [isEnded, setIsEnded] = useState(false);
  const { start, end } = useRecoilValue(selectedDaysState);

  useEffect(() => {
    if (step < initialQuestions.length) {
      setIsWaitingForReply(true);

      const timer = setTimeout(() => {
        setChatHistory((prevChat) => [...prevChat, initialQuestions[step]]);
        setStep((prevStep) => prevStep + 1);
        setIsWaitingForReply(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleResponseSuccess = (response: any) => {
    if (response.data.Contents.category === undefined) {
      CreateMutation({
        planName: planInfo.title,
        mainImg: PLAN_IMAGE,
        startDate: formatSelectedDate(start, '/'),
        endDate: formatSelectedDate(end, '/'),
        data: response.data.Contents
      });
    } else {
      addChatToHistory(response.data.role, response.data.Contents);
      incrementStep();
    }
    setPendingMessage(null);
    setIsWaitingForReply(false);
  };

  const handleChatMutationError = (error: unknown) => {
    console.error('질문 받는 중 에러 발생: ', error);
    setPendingMessage(null);
    setIsWaitingForReply(false);
  };

  const { mutate: ChattingMutation } = useMutation(
    (userMessage: string) =>
      Plan_Chatting({
        id,
        subject: planInfo.type.includes('숙박') ? 'travel' : 'date',
        previousConversation: userMessage,
        step: step
      }),

    {
      onMutate: () => setIsWaitingForReply(true),
      onSuccess: handleResponseSuccess,
      onError: handleChatMutationError
    }
  );

  const { mutate: CreateMutation } = useMutation(Plan_Create, {
    onSuccess: (response) => setPlanId(response.data.planId),
    onError: (error) => console.error('Plan_Create 요청 중 에러 발생: ', error)
  });

  const { data: planResultData } = useQuery(
    ['planResult', planId],
    () => Plan_Result({ id: planId || '' }),
    {
      enabled: !!planId,
      onSuccess: (result) => {
        if (!isEnded) {
          setChatHistory((prevChat) => [
            ...prevChat,
            {
              role: 'assistant',
              Contents: {
                subject: '',
                category: 'result',
                question: `${result.data.PlanData.planName} 일정입니다.`,
                select: []
              }
            }
          ]);
          setIsEnded(true);
        }
      },
      onError: (error) => {
        console.error('Plan_Result 요청 중 에러 발생: ', error);
      }
    }
  );

  const addChatToHistory = useCallback((role: string, Contents: any) => {
    setChatHistory((prevChat) => [...prevChat, { role, Contents }]);
  }, []);

  const incrementStep = () => setStep((prevStep) => prevStep + 1);

  const nextStep = useCallback(
    (userMessage: string) => {
      if (step === 3) {
        setPlanInfo({ ...planInfo, title: userMessage });
        addChatToHistory('assistant', {
          subject: 'none',
          category: 'subject',
          question: '숙박 여행인가요, 당일치기 여행인가요?',
          select: ['숙박', '당일치기']
        });
        incrementStep();
      } else if (step === 4) {
        setPlanInfo({ ...planInfo, type: userMessage });
        setTimeout(() => {
          ChattingMutation('일정 짜줘');
        }, 100);
      } else if (step == 5) {
        ChattingMutation(userMessage);
      } else {
        ChattingMutation(userMessage);
      }
    },
    [step, planInfo, message, ChattingMutation]
  );

  const handleSendMessage = useCallback(() => {
    if (message.trim() && !isWaitingForReply) {
      setChatHistory((prevChat) => [
        ...prevChat,
        {
          role: 'user',
          Contents: {
            subject: 'none',
            category: 'none',
            question: message,
            select: []
          }
        }
      ]);
      nextStep(message);
      setMessage('');
    }
  }, [message, nextStep, isWaitingForReply]);

  const lastChat =
    chatHistory.length > 0 ? chatHistory[chatHistory.length - 1] : null;
  const selectOptions = lastChat?.Contents.select || [];
  const handleSelectOption = (option: string) => {
    setMessage(option);
    setSendImmediately(true);
  };

  useEffect(() => {
    if (sendImmediately && message.trim()) {
      handleSendMessage();
      setSendImmediately(false);
    }
  }, [message, sendImmediately, handleSendMessage]);

  const resizeHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
    setMessage(e.target.value);
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, pendingMessage]);

  return (
    <AppScreen>
      <_.Chat_Layout>
        <_.Chat_Container>
          <Header title="AI 디토" isOnChatting={true} />
          <_.Chat_Messages selectOptions={selectOptions}>
            {chatHistory.map((chat, index) =>
              chat && chat.Contents ? (
                <MessageBox
                  key={index}
                  message={chat.Contents.question}
                  role={chat.role}
                  isLoading={false}
                />
              ) : null
            )}

            {pendingMessage && (
              <MessageBox
                message={pendingMessage.Contents.question}
                role={pendingMessage.role}
                isLoading={false}
              />
            )}
            {isWaitingForReply && (
              <MessageBox message="" role="assistant" isLoading={true} />
            )}
            {planResultData && (
              <PlanResult
                id={planResultData.data.PlanData.planId}
                title={planResultData.data.PlanData.planName}
                img={planResultData.data.PlanData.mainImg}
                startDate={planResultData.data.PlanData.startDate}
                member="2"
              />
            )}
            {isEnded && (
              <_.Chat_EndMessage>대화가 종료되었습니다.</_.Chat_EndMessage>
            )}
            <div ref={messageEndRef} />
          </_.Chat_Messages>
          <_.Chat_Typing_Container>
            {selectOptions.length > 0 && (
              <_.Chat_SelectList>
                {selectOptions.map((option, index) => (
                  <_.Chat_SelectBox
                    onClick={() => {
                      handleSelectOption(option);
                    }}
                    key={index}
                  >
                    {option}
                  </_.Chat_SelectBox>
                ))}
              </_.Chat_SelectList>
            )}
            <_.Chat_Typing_Box>
              <_.Chat_Textarea
                value={message}
                placeholder="메시지 보내기..."
                rows={1}
                maxLength={50}
                ref={textareaRef}
                onChange={resizeHeight}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isWaitingForReply || isEnded || step === 1}
              />
              <_.Chat_SendIcon onClick={handleSendMessage}>
                <Send stroke={message ? theme.primary[7] : theme.gray[2]} />
              </_.Chat_SendIcon>
            </_.Chat_Typing_Box>
          </_.Chat_Typing_Container>
        </_.Chat_Container>
      </_.Chat_Layout>
    </AppScreen>
  );
};

export default Chat;
