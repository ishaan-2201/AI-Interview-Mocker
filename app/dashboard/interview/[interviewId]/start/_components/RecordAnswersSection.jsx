"use client";
import { Button } from '@/components/ui/button'
import { Mic } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text'
import Webcam from 'react-webcam'
import { chatSession } from "@/utils/geminiModel.js";
import { toast } from 'sonner';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

const RecordAnswersSection = ({ mockInterviewQuestions, activeQuestionIndex, interviewData }) => {
    const [userAnswer, setUserAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const user = useUser();
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results.map((result) => setUserAnswer((prevUserAnswer) => prevUserAnswer + result?.transcript))
    }, [results])

    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            updateUserAnswer();
        }
    }, [userAnswer])

    const startStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText();
        }
        else {
            startSpeechToText();
        }
    }

    const updateUserAnswer = async () => {
        setLoading(true);
        const feedbackPrompt = `For the following question: ${mockInterviewQuestions[activeQuestionIndex].question}, this is the user answer: ${userAnswer}, for this question and user answer, give the rating for the user answer and also the feedback as area of improvement, in just 3 to 5 lines for the user. Give the response in JSON format with rating field and feedback field.`
        const result = await chatSession.sendMessage(feedbackPrompt)
        const jsonMockResponse = result.response
            .text()
            .replace("```json", "")
            .replace("```", "");
        console.log(jsonMockResponse);
        const mockJsonResponse = JSON.parse(jsonMockResponse);
        const response = await db.insert(UserAnswer).values({
            mockIdRef: interviewData.mockId,
            question: mockInterviewQuestions[activeQuestionIndex].question,
            correctAns: mockInterviewQuestions[activeQuestionIndex].answer,
            userAns: userAnswer,
            feedback: mockJsonResponse?.feedback,
            rating: mockJsonResponse?.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-yyyy"),
        })
        if (response) {
            toast("User Answer recorded successfully!");
        }
        setUserAnswer("");
        setLoading(false);
    }
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-col justify-center items-center rounded-lg bg-black p-5 mt-20'>
                <Image src={"/webcam.png"} width={200} height={200} className='absolute' />
                <Webcam mirrored={true} style={{
                    height: 300,
                    width: "100%",
                    zIndex: 10
                }} />
            </div>
            <Button disabled={loading} variant='outline' className='my-10' onClick={startStopRecording}>
                {isRecording ? <h2 className='text-red-600 flex gap-2'>
                    <Mic />
                    Stop Recording
                </h2> :
                    <h2 className='text-primary flex gap-2'>
                        <Mic />
                        Record Answer
                    </h2>}
            </Button>
            <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button>
        </div>
    )
}

export default RecordAnswersSection