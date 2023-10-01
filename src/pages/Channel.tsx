import ChannelSidebar from "@/components/channel/channel-sidebar";
import ServerSideBar from "@/components/server/server-sidebar";

const Channel = () => {
    return (
        <div className="h-[100vh] w-full flex flow-row">
            <ServerSideBar />
            <ChannelSidebar />
        </div>
    );
};

export default Channel;
