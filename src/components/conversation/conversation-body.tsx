import { MessageWithMemberWithProfileWithUser } from "@/types/type-custom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import ConversationItem from "./conversation-item";

interface ConversationBodyProps {
    newMessage: MessageWithMemberWithProfileWithUser;
}

const ConversationBody = ({ newMessage }: ConversationBodyProps) => {
    const { channelId } = useParams();
    const [messages, setMessages] =
        useState<MessageWithMemberWithProfileWithUser[]>();
    useEffect(() => {
        axios.get(`messages/${channelId}`).then((res) => setMessages(res.data));
    }, [channelId]);

    useEffect(() => {
        if (messages) {
            setMessages((previous) => previous?.concat(newMessage));
        }
    }, [newMessage]);

    return (
        <ScrollArea className="flex-1">
            {messages?.map((message) => (
                <ConversationItem message={message} />
            ))}
        </ScrollArea>
    );
};

export default ConversationBody;
