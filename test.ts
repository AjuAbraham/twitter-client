"use client"
import React, { useCallback } from "react";
import {  FaXTwitter } from "react-icons/fa6";
import { GrHomeRounded,GrNotification } from "react-icons/gr";
import { FaRegEnvelope } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoSearch,IoBookmarkOutline } from "react-icons/io5";
import FeedCard from "@/components/ui/sub/FeedCard";
import { SlOptions } from "react-icons/sl";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { graphQlClient } from "../../constants/api";
import toast from "react-hot-toast";
import { verifyUserGoogleTokenQuery } from "../../graphql/query/user";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../../hooks/user";

export default function Home() {
  interface sideBarButton {
    title: string,
    icon: React.ReactNode
  }
  const queryClient = useQueryClient();
  const { user } = useCurrentUser();
  const handleLoginWithGoogle = useCallback(
    async (credentials: CredentialResponse) => {
      const googleToken = credentials.credential;
      if (!googleToken) return toast.error(`Unable to get google credentials`);
      const { verifyGoogleToken } = await graphQlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );
      if (verifyGoogleToken) {
        console.log(verifyGoogleToken);
        toast.success(`Verify Success`);
        window.localStorage.setItem("token",verifyGoogleToken);
        await queryClient.invalidateQueries({ queryKey: ["current-user"] });
      }
    },
    [queryClient]
  );
  const sideBarMenuItems: sideBarButton[]= [
    {
      title: "Home",
      icon: <GrHomeRounded />
    },
    {
      title: "Explore",
      icon: <IoSearch />
    },
    {
      title: "Notifications",
      icon: <GrNotification />
    },
    {
      title: "Messages",
      icon: <FaRegEnvelope />
    },
    {
      title: "Bookmark",
      icon: <IoBookmarkOutline />
    },
    {
      title: "Premium",
      icon: <FaXTwitter />
    },

    {
      title: "Profile",
      icon: < FiUser />
    },
    {
      title: "More",
      icon: <SlOptions />

    },
  ]
  return (
    <>
    <div className="grid grid-cols-12 px-32 h-screen w-screen bg-black text-white">
      <div className="col-span-3 pt-3 px-4">
      <div className="hover:bg-slate-800 w-fit h-fit rounded-full p-2 transition-all cursor-pointer">
      <FaXTwitter className="text-3xl"/>
      </div>
      <div className="mt-4   text-xl pr-4">
        <ul>
          {
            sideBarMenuItems.map(item=> (
            <li key={item.title} className="flex gap-4 justify-start items-center hover:bg-slate-800 transition-all rounded-full w-fit px-3 py-2 cursor-pointer mt-2">
             <span className="text-2xl">{item.icon}</span>
             <span>{item.title}</span>
            </li>
            ))
          }
        </ul>
        <button className="bg-[#1c9bf1] p-3 mt-5 w-full rounded-full text-lg font-semibold  hover:bg-[#1c9cf1c7]  transition-all">Post</button>
      </div>
      </div>
      <div className="col-span-6 border-r-[1px] border-l-[1px] h-screen overflow-scroll scrollbar-hide  border-gray-600">
    
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
      </div>
      <div className="col-span-3">
      <div className="bg-slate-700 p-5 rounded-lg">
        <h1 className="my-2 text-2xl">New On Twitter?</h1>
        <GoogleLogin onSuccess={handleLoginWithGoogle} />
      </div>
      </div>
    </div>
    </>
  );
}