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
import { graphQlClient } from "../../constants/api";
import { getSignedUrlForTweetQuery } from "../../graphql/query/tweet";
import axios from "axios";

export default function Home() {
  const { user } = useCurrentUser();
  const { tweets = [] } = useGetAllTweet();
  const { mutate } = useCreateTweet();
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (e: Event) => {
      e.preventDefault();
      const file:File|null|undefined = input.files?.item(0);
      if (!file) return;
      const { getSignedUrlForTweet } = await graphQlClient.request(
        getSignedUrlForTweetQuery,
        { imageType: file.type, imageName: file.name, size: file.size }
      );
      if (getSignedUrlForTweet) {
        toast.loading("Uploading...", { id: "upload" });
        await axios.put(getSignedUrlForTweet, file, {
          headers: { "Content-Type": file.type },
        });
        toast.success("Upload Complete", { id: "upload" });
        const url = new URL(getSignedUrlForTweet);
        const filePath = `${url.origin}${url.pathname}`;
        setImgUrl(filePath);
      }
    };

  }, []);
  const handleImageInput = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*,video/mp4");
    const handler = handleInputChangeFile(input);
    input.addEventListener("change", handler);
    input.click();
  }, [handleInputChangeFile]);

  const handleTweet = useCallback(() => {
    content === ""
      ? toast.error("Content is Empty")
      : mutate(
          {
            content,
            contentImage: imgUrl,
          },
          {
            onError: (error) => {
              console.log(error);
              toast.error("Failed to post tweet");
            },
          }
        );
    setContent("");
    setImgUrl("");
  }, [content, mutate, imgUrl]);
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
                  className="bg-transparent w-full text-lg border-b border-slate-800 mx-4 md:p-4 outline-none"
                  rows={3}
                  placeholder="What's Happening"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                {imgUrl && (imgUrl.endsWith("image")?<Image src={imgUrl} alt="Posted Image" width={300} height={300}/>:imgUrl&&<video src={imgUrl} controls/>)}
                <div className="flex justify-between items-center mt-2">
                  <FaRegImage
                    className="text-lg cursor-pointer"
                    onClick={handleImageInput}
                  />
                  <button
                    onClick={handleTweet}
                    className={` px-4 py-2 rounded-full text-sm font-medium  hover:bg-[#1c9cf1c7]  transition-all ${
                      content === ""
                        ? "bg-[#0f4e78] text-[#989898]"
                        : "bg-[#1c9bf1]"
                    } `}
                  >
                    Tweet
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        {tweets?.map((tweet) =>
          tweet ? <FeedCard key={tweet.id} data={tweet as Tweet}/> : null
        )}
      </TwitterLayout>
    </>
  );
}
