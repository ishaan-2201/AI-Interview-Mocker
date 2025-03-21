"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from "./_components/QuestionsSection"
import RecordAnswersSection from "./_components/RecordAnswersSection"
import { LoaderCircle } from 'lucide-react';

const StartInterview = ({ params }) => {
    const [interviewData, setInterviewData] = useState(null);
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState(null);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    useEffect(() => {
        getInterviewDetails();
    }, [])

    const getInterviewDetails = async () => {
        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId));
        setMockInterviewQuestions(JSON.parse(result[0].jsonMockResp))
        console.log(JSON.parse(result[0].jsonMockResp))
        setInterviewData(result[0]);
    };
    return (
        <div>
            {interviewData ? (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                    {/* Questions */}
                    <QuestionsSection mockInterviewQuestions={mockInterviewQuestions} activeQuestionIndex={activeQuestionIndex} />

                    {/* Audio and Video recording of answers */}
                    <RecordAnswersSection mockInterviewQuestions={mockInterviewQuestions} activeQuestionIndex={activeQuestionIndex} interviewData={interviewData} />

                </div>) :
                <div className='flex justify-center items-center h-[100vh]'>
                    <LoaderCircle className='animate-spin' />
                </div>
            }
        </div>
    )
}

export default StartInterview