import { MessageWithMemberWithProfileWithUser } from "@/types/type-custom";
import { format } from "date-fns";
interface ConversationItemProps {
    message: MessageWithMemberWithProfileWithUser;
}
const ConversationItem = ({ message }: ConversationItemProps) => {
    const date = format(new Date(message.createdAt), "K:m a");

    return (
        <div className="flex items-baseline gap-2">
            <p className="text-[9px]">{date}</p>
            <p className="text-xs cursor-pointer text-rose-400">
                {message.member.profile.user.name}
            </p>
            <p className="text-xs ml-1">{message.content}</p>
        </div>
    );
};

export default ConversationItem;
