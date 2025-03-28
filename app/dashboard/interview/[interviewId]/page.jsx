"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, LoaderCircle, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  useEffect(() => {
    console.log(params.interviewId);
    getInterviewDetails();
  }, []);

  const  getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    console.log(result);
    setInterviewData(result[0]);
  };
  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      {interviewData ?  (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col my-5 gap-5">
            <div className="flex flex-col gap-5 p-5 rounded-lg border">
              <h2 className="text-lg">
                <strong>Job Role/Job Position:</strong>
                {interviewData?.jobPosition}
              </h2>
              <h2 className="text-lg">
                <strong>Job Description/Tech Stack:</strong>
                {interviewData?.jobDesc}
              </h2>
              <h2 className="text-lg">
                <strong>Years of Experience:</strong>
                {interviewData?.jobExperience}
              </h2>
            </div>
            <div className="p-5 rounded-lg border border-yellow-300 bg-yellow-100">
              <h2 className="flex gap-2 items-center text-yellow-500"> <Lightbulb /><strong>Information</strong></h2>
              <h2 className="mt-3 text-yellow-500">Enable Video Web Cam and Microphone to Start your AI Generated Mock Interview, It Has 5 questions which you can answer and at the last you will get the report on the basis of your answer. NOTE: We never record your video, Web cam access you can disable at any time if you want.</h2>
            </div>
          </div>
          <div>
            {webCamEnabled ? (
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                mirrored={true}
                style={{ width: 300, height: 300 }}
              />
            ) : (
              <>
                <WebcamIcon className="h-72 w-full p-20 my-7 bg-secondary border rounded-lg" />
                <Button variant="ghost" className="w-full" onClick={() => setWebCamEnabled(true)}>
                  Enable Camera and Microphone
                </Button>
              </>
            )}
          </div>
        </div>
      ): <LoaderCircle className="animate-spin"/>}
      <div className="flex justify-end items-end">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
        <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
