import { Channel, ChannelType } from "@/types/type-models";
import { Hash, Mic, Video } from "lucide-react";

interface ConversationHeaderProps {
    channel: Channel;
}

const ConversationHeader = ({ channel }: ConversationHeaderProps) => {
    return (
        <div className="flex flex-row items-center w-full p-[11px] border-b shadow-sm">
            {channel?.type === ChannelType.TEXT && <Hash className="h-5 w-5" />}
            {channel?.type === ChannelType.AUDIO && <Mic className="h-5 w-5" />}
            {channel?.type === ChannelType.VIDEO && (
                <Video className="h-5 w-5" />
            )}
            <p className="ml-2 font-semibold text-sm">{channel?.name}</p>
        </div>
    );
};

export default ConversationHeader;
