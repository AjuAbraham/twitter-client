import Image from "next/image";
import React from "react";
import { FaRegComment,FaRetweet,FaRegHeart,FaRegBookmark } from "react-icons/fa";
import { Tweet } from "../../../../gql/graphql";
import Link from "next/link";

interface FeedCardProp {
  data: Tweet
}

const FeedCard: React.FC<FeedCardProp> = ({data}) => {
  return (
    <div className="border border-l-0 border-r-0 border-b-0 p-5 border-gray-600  hover:bg-[#000000c5] transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
      <div className="col-span-1 md:min-w-8 min-w-6 ">
        { data.author?.avatarUrl && <Image
          src={data.author.avatarUrl}
          alt="profile-img"
          width={50}
          className="rounded-full"
          height={50}
        />}
      </div>
      <div className="col-span-11 md:ml-2 ml-1">
        <Link href={`/${data.author?.id}`}><p className="hover:underline">{data.author?.firstName} {data.author?.lastName}</p></Link>
        <div>
        <p className="text-sm pb-4">
          {data.content}
          
        </p>
        {data.contentImage&&(
          
          <Link href={`${data.contentImage}`} target="_blank">
            {data.contentImage.endsWith("image")?<Image className="rounded-lg object-cover" src={data.contentImage} alt="content-img" width={300} height={300}/>:data.contentImage&&<video src={data.contentImage} controls width={300} height={300}/>}
          </Link>
        )}
        </div>
        <div className="flex justify-between mt-5 text-lg text-slate-600">
          <div className="hover:bg-[#0b171e] hover:text-[#1d94e6] w-8 h-8 flex items-center justify-center  rounded-full">
          <FaRegComment/>
          </div>
          <div className="hover:bg-[#061a15] hover:text-[#01b77b] w-8 h-8 flex items-center justify-center  rounded-full">
          <FaRetweet/>
          </div>
          <div className="hover:bg-[#210915] hover:text-[#ea1679] w-8 h-8 flex items-center justify-center  rounded-full">
          <FaRegHeart/>
          </div>
          {/* <div>
          <IoMdStats />
          </div> */}
          <div className="hover:bg-[#0b171e] hover:text-[#1d94e6] w-8 h-8 flex items-center justify-center  rounded-full">
          <FaRegBookmark />
          </div>
          
        </div>
      </div>
  
    </div>
    </div>
  );
};

export default FeedCard;
