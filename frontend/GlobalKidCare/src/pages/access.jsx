import { useState} from "react";
import { Form } from "./accessComponent";
import { Alert } from "./mainComponent";
import { accessVideo } from "../assets";

const Access = () => {
  const [message, setMessage] = useState({
    value: "",
    show: false,
  });

  const [allow, setAllow] = useState(true);
  return (
    <div className="relative w-full">
      <div
        className={`${
          message.show && "brightness-50 pointer-events-none"
        } w-full h-screen bg-primary flex items-center relative z-0`}
      >
        <div className="w-1/4 lg:block hidden"><video
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline
          className="w-full h-full"
        >
          <source src={accessVideo} type="video/mp4"/>
        </video></div>
        <Form
          setMsg={setMessage}
          msg={message}
          allow={allow}
          setAllow={setAllow}
        />
      </div>
      <Alert msg={message} setMsg={setMessage} />
    </div>
  );
};

export default Access;
