import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

const QuestionsSection = ({ mockInterviewQuestions, activeQuestionIndex }) => {
    const textToSpeech = (text) => {
        if ("speechSynthesis" in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
        else {
            alert("Sorry, your browser does not support text to speech feature!")
        }
    }
    return (
        <div className='p-5 border rounded-lg my-10'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {mockInterviewQuestions.map((question, index) => (
                    <h2 className={`p-2  rounded-full text-xs md:text-sm text-center cursor-pointer ${index === activeQuestionIndex ? 'bg-primary text-white' : 'bg-secondary'}`}>Question #{index + 1}</h2>
                ))}
            </div>
            <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestions[activeQuestionIndex].question}</h2>
            <Volume2 className='cursor-pointer' onClick={() => textToSpeech(mockInterviewQuestions[activeQuestionIndex].question)} />
            <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
                <h2 className='flex gap-2 items-center text-primary'><Lightbulb />
                    <strong>Note:</strong>
                </h2>
                <h2 className='text-sm my-2 text-primary'>Click on Record Answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each of question and your answer to compare it.</h2>
            </div>
        </div>
    )
}

export default QuestionsSection