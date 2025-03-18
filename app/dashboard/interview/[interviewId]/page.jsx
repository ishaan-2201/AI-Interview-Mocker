"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  useEffect(() => {
    console.log(params.interviewId);
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    console.log(result);
    setInterviewData(result[0]);
  };
  return (
    <div className="my-10 flex flex-col justify-center items-center">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      {interviewData && (
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
            <div>
              <Lightbulb />
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
              <div className="flex flex-col items-center">
                <WebcamIcon className="h-72 w-full p-20 my-7 bg-secondary border rounded-lg" />
                <Button onClick={() => setWebCamEnabled(true)}>
                  Enable Camera and Microphone
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;
