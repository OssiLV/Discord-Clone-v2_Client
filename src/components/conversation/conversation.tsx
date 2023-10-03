import { Channel } from "@/types/type-models";
import ConversationBody from "./conversation-body";
import ConversationFooter from "./conversation-footer";
import ConversationHeader from "./conversation-header";
import { useState } from "react";
import { MessageWithMemberWithProfileWithUser } from "@/types/type-custom";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
interface ConversationProps {
    channel: Channel;
}

const Conversation = ({ channel }: ConversationProps) => {
    const token = Cookies.get("access-token");

    const [message, setMessage] =
        useState<MessageWithMemberWithProfileWithUser>();
    const socket = io("ws://localhost:80/", {
        extraHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });

    return (
        <div className="flex flex-col h-full w-full">
            <ConversationHeader channel={channel} />
            <ConversationBody
                newMessage={message as MessageWithMemberWithProfileWithUser}
            />
            <ConversationFooter
                socket={socket}
                type="channel"
                name={channel?.name}
                setMessage={setMessage}
            />
        </div>
    );
};

export default Conversation;
