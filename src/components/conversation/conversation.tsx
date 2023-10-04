import { Channel } from "@/types/type-models";
import ConversationBody from "./conversation-body";
import ConversationFooter from "./conversation-footer";
import ConversationHeader from "./conversation-header";
import { useState } from "react";
import { MessageWithMemberWithProfileWithUser } from "@/types/type-custom";
import { Socket } from "socket.io-client";
import { useSocket } from "../providers/socket-provider";
interface ConversationProps {
    channel: Channel;
}

const Conversation = ({ channel }: ConversationProps) => {
    const { socket } = useSocket();
    const [message, setMessage] =
        useState<MessageWithMemberWithProfileWithUser>();

    return (
        <div className="flex flex-col h-full w-full">
            <ConversationHeader channel={channel} />
            <ConversationBody
                newMessage={message as MessageWithMemberWithProfileWithUser}
            />
            <ConversationFooter
                socket={socket as Socket}
                type="channel"
                name={channel?.name}
                setMessage={setMessage}
            />
        </div>
    );
};

export default Conversation;
