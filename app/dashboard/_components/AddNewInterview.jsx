"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema.js";
import { db } from "@/utils/db.js";
import { chatSession } from "@/utils/geminiModel.js";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState(null);
  const [jobDescription, setJobDescription] = useState(null);
  const [jobExperience, setJobExperience] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const inputMessage = `For the following fields: Job Position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}, Based on this information, generate 5 interview questions in JSON format, give the questions and answers as fields in JSON`;
    const result = await chatSession.sendMessage(inputMessage);
    const jsonMockResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    // console.log(jsonMockResponse);
    console.log(JSON.parse(jsonMockResponse));
    setJsonResponse(jsonMockResponse);
    if (jsonMockResponse) {
      const response = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: jsonMockResponse,
          jobPosition: jobPosition,
          jobDesc: jobDescription,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({ mockId: MockInterview.mockId });
      if (response) {
        console.log("inserted entry", response);
        setOpenDialog(false);
        router.push(`/dashboard/interview/${response[0]?.mockId}`);
      }
    } else {
      console.log("Error occured!");
    }

    setLoading(false);
  };
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about the job you are interviewing for
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit}>
                <div>
                  <p>
                    Add Details about your job position/role, job description,
                    and years of experience
                  </p>
                  <div className="mt-7 my-3">
                    <label>Job Position/Job Role</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      onChange={(e) => setJobPosition(e.target.value)}
                      required
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description/Tech Stack(In Short)</label>
                    <Textarea
                      placeholder="Ex. React, NodeJs, Angular, SQL, etc."
                      onChange={(e) => setJobDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="my-3">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="Ex. 2"
                      type="number"
                      max={50}
                      onChange={(e) => setJobExperience(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating
                        from AI
                      </>
                    ) : (
                      " Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
