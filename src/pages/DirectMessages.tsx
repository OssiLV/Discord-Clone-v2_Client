import ChannelSidebar from "@/components/channel/channel-sidebar";
import Conversation from "@/components/conversation/conversation";
import ServerSideBar from "@/components/server/server-sidebar";
import { Channel } from "@/types/type-models";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DirectMessages = () => {
    const navigate = useNavigate();
    const { channelId } = useParams();

    const [channel, setChannel] = useState<Channel>();
    useEffect(() => {
        axios
            .get(`/channels/${channelId}`)
            .then((res) => setChannel(res.data))
            .catch(() => navigate("/sign-in"));
    }, [channelId]);

    return (
        <div className="h-[100vh] w-full flex flow-row">
            <ServerSideBar />
            <ChannelSidebar />
            <Conversation channel={channel as Channel} />
        </div>
    );
};

export default DirectMessages;
