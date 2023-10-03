import { Channel } from "@/types/type-models";
import ConversationBody from "./conversation-body";
import ConversationFooter from "./conversation-footer";
import ConversationHeader from "./conversation-header";
import { useState } from "react";
import { MessageWithMemberWithProfileWithUser } from "@/types/type-custom";

interface ConversationProps {
    channel: Channel;
}

const Conversation = ({ channel }: ConversationProps) => {
    const [message, setMessage] =
        useState<MessageWithMemberWithProfileWithUser>();

    return (
        <div className="flex flex-col h-full w-full">
            <ConversationHeader channel={channel} />
            <ConversationBody
                newMessage={message as MessageWithMemberWithProfileWithUser}
            />
            <ConversationFooter
                type="channel"
                name={channel?.name}
                setMessage={setMessage}
            />
        </div>
    );
};

export default Conversation;
