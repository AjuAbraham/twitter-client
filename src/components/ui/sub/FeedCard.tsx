import Image from "next/image";
import React from "react";
import { FaRegComment,FaRetweet,FaRegHeart,FaRegBookmark } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { Tweet } from "../../../../gql/graphql";
import Link from "next/link";

interface FeedCardProp {
  data: Tweet
}

const FeedCard: React.FC<FeedCardProp> = ({data}) => {
  return (
    <div className="border border-l-0 border-r-0 border-b-0 p-5 border-gray-600  hover:bg-zinc-900 transition-all cursor-pointer">
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
        <Link href={`/${data.author?.id}`}><p>{data.author?.firstName} {data.author?.lastName}</p></Link>
        <p className="text-sm">
          {data.content}
        </p>
        <div className="flex justify-between mt-5 text-lg text-slate-600">
          <div>
          <FaRegComment />
          </div>
          <div>
          <FaRetweet />
          </div>
          <div>
          <FaRegHeart />
          </div>
          {/* <div>
          <IoMdStats />
          </div> */}
          <div>
          <FaRegBookmark />
          </div>
          <div>
          <MdOutlineFileUpload />
          </div>
        </div>
      </div>
  
    </div>
    </div>
  );
};

export default FeedCard;
