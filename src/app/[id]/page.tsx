"use client";
import TwitterLayout from "@/components/ui/sub/TwitterLayout";
import type { NextPage } from "next";
import Image from "next/image";
import { FaArrowLeftLong } from "react-icons/fa6";
import FeedCard from "@/components/ui/sub/FeedCard";
import {useParams} from 'next/navigation'
import { useGetUserById } from "../../../hooks/user";
import { Tweet } from "../../../gql/graphql";
import  Link from 'next/link'



const UserProfile: NextPage = () => {

  const {id} = useParams();
  const userId = Array.isArray(id) ? id[0] : id;
  const {user,isRefetching,isLoading} = useGetUserById(userId);
 
  if(isRefetching||isLoading){
    return (
      <TwitterLayout>
        <div className="flex items-center justify-center h-screen">
         <div className="border-t-2 text-black rounded-l-full rounded-r-full w-20 h-20 animate-spin">
             1
         </div>
        </div>
      </TwitterLayout>
    );
  }
  return (
    <div>
      <TwitterLayout>
        <div>
          <nav className="flex items-center gap-3 p-3">
            <Link href={'/'}><FaArrowLeftLong className="text-xl cursor-pointer" /></Link>
            <div>
              <h1 className="text-2xl font-bold">
                {user?.firstName} {user?.lastName}
              </h1>
              <h4 className="text-slate-500 text-sm ">
               {user?.tweets?.length} Tweets
              </h4>
            </div>
          </nav>
          <div className="p-4 border-b border-slate-800">
             {user?.avatarUrl && (
              <Image
                className="rounded-full"
                src={user?.avatarUrl}
                alt="User Image"
                width={100}
                height={100}
              />
            )} 
            <h1 className="text-xl font-bold mt-5">{user?.firstName} {user?.lastName}</h1>
          </div>
          <div>
            {user?.tweets?.map((tweet) => (
              <FeedCard key={tweet?.id} data={tweet as Tweet} />
            ))}
          </div>
        </div>
      </TwitterLayout>
    </div>
  );
};

export default UserProfile;
