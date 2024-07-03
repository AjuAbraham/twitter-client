import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React, { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { FaRegEnvelope, FaXTwitter } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { GrHomeRounded, GrNotification } from "react-icons/gr";
import { IoBookmarkOutline, IoSearch } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";
import { graphQlClient } from "../../../../constants/api";
import { verifyUserGoogleTokenQuery } from "../../../../graphql/query/user";
import { useCurrentUser } from "../../../../hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { IoSendSharp } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
interface TwitterProp {
  children: React.ReactNode;
}
interface sideBarButton {
  title: string;
  icon: React.ReactNode;
  link: string
}
const TwitterLayout: React.FC<TwitterProp> = (props) => {
  const queryClient = useQueryClient();
  const { user } = useCurrentUser();

  const sideBarMenuItems: sideBarButton[] = useMemo(()=>[
    {
      title: "Home",
      icon: <GrHomeRounded />,
      link : "/"
    },
    {
      title: "Explore",
      icon: <IoSearch />,
      link : "/"
    },
    {
      title: "Notifications",
      icon: <GrNotification />,
      link : "/"
    },
    {
      title: "Messages",
      icon: <FaRegEnvelope />,
      link : "/"
    },
    {
      title: "Bookmark",
      icon: <IoBookmarkOutline />,
      link : "/"
    },
    {
      title: "Premium",
      icon: <FaXTwitter />,
      link : "/"
    },

    {
      title: "Profile",
      icon: <FiUser />,
      link : `/${user?.id}`
    },
    {
      title: "More",
      icon: <SlOptions />,
      link : "/"
    },
  ],[user?.id])
  const handleLoginWithGoogle = useCallback(
    async (credentials: CredentialResponse) => {
      const googleToken = credentials.credential;
      if (!googleToken) return toast.error(`Unable to get google credentials`);
      const { verifyGoogleToken } = await graphQlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );
      toast.success(`Verify Success`);
      if (verifyGoogleToken) {
        console.log(verifyGoogleToken);
        window.localStorage.setItem("token", verifyGoogleToken);
        await queryClient.invalidateQueries({ queryKey: ["current-user"] });
      }
    },
    [queryClient]
  );

  return user ? (
    <div className="grid grid-cols-12 lg:px-32 h-screen w-screen bg-black text-white">
      <div className="lg:col-span-3 col-span-2 pt-3 px-4  flex lg:justify-end md:ml-6 pr-4 relative">
        <div className="flex flex-col">
          <div className="hover:bg-slate-800 w-fit h-fit rounded-full p-2 transition-all cursor-pointer">
            <FaXTwitter className="text-3xl" />
          </div>
          <div className="mt-4   md:text-md pr-4">
            <ul>
              {sideBarMenuItems.map((item) => (
                <li
                  key={item.title}
                >
                  <Link href={item.link} className="flex gap-4 justify-start items-center hover:bg-slate-800 transition-all rounded-full w-fit px-3 py-2 cursor-pointer mt-2">
                  <span className="md:text-2xl text-xl">{item.icon}</span>
                  <span className="hidden lg:block">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <button className="bg-[#1c9bf1] hidden lg:block p-2 mt-4 w-full rounded-full text-lg font-semibold  hover:bg-[#1c9cf1c7]  transition-all">
              Post
            </button>
            <button className="bg-[#1c9bf1]  lg:hidden md:p-4 px-3 py-3  mt-5 rounded-full text-lg font-semibold  hover:bg-[#1c9cf1c7]  transition-all">
              <IoSendSharp />
            </button>
          </div>
          {user && (
            <div className="absolute lg:bottom-6 md:bottom-2 bottom-10 md:pl-1 flex justify-center gap-2 items-center lg:hover:bg-slate-800 px-3 min-w-16 ml-[-8px] py-2 rounded-full cursor-pointer">
              {user && user.avatarUrl && (
                <Image
                  className="rounded-full"
                  src={user?.avatarUrl}
                  alt="User Iamge"
                  width={50}
                  height={50}
                />
              )}
              <div>
                <h3 className="text-md hidden lg:block">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="md:col-span-7 col-span-10 border-r-[1px] border-l-[1px] h-screen overflow-scroll scrollbar-hide  border-gray-600">
        {props.children}
      </div>
    </div>
  ) : (
    <div className="col-span-3 p-5">
      <div className="bg-slate-700 p-5 rounded-lg">
        <h1 className="my-2 text-2xl">New On Twitter?</h1>
        <GoogleLogin onSuccess={handleLoginWithGoogle} />
      </div>
    </div>
  );
};

export default TwitterLayout;