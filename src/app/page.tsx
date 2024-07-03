"use client";
import React, { useState, useCallback } from "react";
import { FaRegImage } from "react-icons/fa6";
import FeedCard from "@/components/ui/sub/FeedCard";
import { useCurrentUser } from "../../hooks/user";
import { useCreateTweet, useGetAllTweet } from "../../hooks/tweet";
import { Tweet } from "../../gql/graphql";
import TwitterLayout from "@/components/ui/sub/TwitterLayout";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Home() {
  const { user } = useCurrentUser();
  const { tweets = [] } = useGetAllTweet();
  const { mutate } = useCreateTweet();
  const [content, setContent] = useState("");
  const handleImageInput = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  const handleTweet = useCallback(() => {
    content===""? toast.error("Content is Empty"):
    mutate({
      content,
    });
    setContent("");
  }, [content, mutate]);
  return (
    <>
      <TwitterLayout>
        <div>
          <div className="border border-l-0 border-r-0 border-b-0 p-5 border-gray-600   transition-all">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-1 min-w-10">
                {user?.avatarUrl && (
                  <Image
                    src={user?.avatarUrl}
                    alt="profile-img"
                    width={50}
                    className="rounded-full"
                    height={50}
                  />
                )}
              </div>
              <div className="col-span-11">
                <textarea
                  className="bg-transparent w-full text-lg border-b border-slate-800 mx-4 "
                  rows={3}
                  placeholder="What's Happening"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <div className="flex justify-between items-center mt-2">
                  <FaRegImage
                    className="text-lg cursor-pointer"
                    onClick={handleImageInput}
                  />
                  <button
                    onClick={handleTweet}
                    className={` px-4 py-2 rounded-full text-sm font-medium  hover:bg-[#1c9cf1c7]  transition-all ${content===""?"bg-[#0f4e78] text-[#989898]":"bg-[#1c9bf1]"} `}
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {tweets?.map((tweet) =>
          tweet ? <FeedCard key={tweet.id} data={tweet as Tweet} /> : null
        )}
      </TwitterLayout>
    </>
  );
}
