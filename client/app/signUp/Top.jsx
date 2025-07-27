"use client";

import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Div from "../components/common/Div";
import Text from "../components/common/Text";

const Top = ({ children }) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Div className="md:p-10 py-5 flex gap-2 md:mx-24 mx-3 justify-between h-full items-center">
      <Div className="border w-fit rounded-full p-2 cursor-pointer hover:scale-125">
        <FaArrowLeftLong onClick={handleBackClick} className="text-xl" />
      </Div>
      <Text tag="h3" className="text-mg secondary">
        {children}
      </Text>
    </Div>
  );
};

export default Top;
