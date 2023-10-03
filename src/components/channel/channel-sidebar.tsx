import { Separator } from "@/components/ui/separator";
import ChannelHeader from "./channel-header";
import { useEffect, useState } from "react";
import axios from "axios";
import {
    Channel,
    ChannelType,
    Member,
    MemberRole,
    Server,
} from "@/types/type-models";
import {
    MemberWithProfileWithUser,
    ServerWithChannelsMembers,
} from "@/types/type-custom";
import { useLocation, useParams } from "react-router-dom";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import ChannelSection from "./channel-section";
import ChannelItems from "./channel-items";
import { useDataState } from "@/hooks/use-state-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChannelProfile from "./channel-profile";

const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
    [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
    [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
};

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: (
        <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
    ),
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />,
};
type Response = {
    server: ServerWithChannelsMembers;
    currentMember: MemberWithProfileWithUser;
    anotherMembers: MemberWithProfileWithUser[];
};

const ChannelSidebar = () => {
    const { type, data, flush } = useDataState();
    const location = useLocation();
    const isServerPage = location.pathname !== "/direct-messages/@me";
    const { serverId } = useParams();
    const [server, setServer] = useState<ServerWithChannelsMembers>();
    const [textChannels, setTextChannels] = useState<Channel[]>();
    const [audioChannels, setAudioChannels] = useState<Channel[]>();
    const [videoChannels, setVideoChannels] = useState<Channel[]>();

    const [anotherMembers, setAnotherMembers] =
        useState<MemberWithProfileWithUser[]>();
    const [currentMember, setCurrentMembers] =
        useState<MemberWithProfileWithUser>();

    useEffect(() => {
        if (serverId) {
            axios
                .get(`/servers/server-channels-members/${serverId}`)
                .then((res) => {
                    const data = res.data as Response;
                    setServer(data.server);
                    setAnotherMembers(data.anotherMembers);
                    setCurrentMembers(data.currentMember);
                });
        }
    }, [serverId]);

    useEffect(() => {
        const textChannels = server?.channels.filter(
            (channel) => channel.type === ChannelType.TEXT,
        );
        setTextChannels(textChannels);

        const audioChannels = server?.channels.filter(
            (channel) => channel.type === ChannelType.AUDIO,
        );
        setAudioChannels(audioChannels);

        const videoChannels = server?.channels.filter(
            (channel) => channel.type === ChannelType.VIDEO,
        );
        setVideoChannels(videoChannels);
    }, [server]);

    useEffect(() => {
        if (type === "newChannel") {
            const newChannel = data as Channel;
            if (newChannel.type === ChannelType.TEXT) {
                if (textChannels) {
                    setTextChannels((previous) => previous?.concat(newChannel));
                }
            }
            if (newChannel.type === ChannelType.AUDIO) {
                if (audioChannels) {
                    setAudioChannels((previous) =>
                        previous?.concat(newChannel),
                    );
                }
            }
            if (newChannel.type === ChannelType.VIDEO) {
                if (videoChannels) {
                    setVideoChannels((previous) =>
                        previous?.concat(newChannel),
                    );
                }
            }
            flush();
        }
    }, [type, data]);

    return (
        <div className="dark:bg-[#2B2D31] bg-[#F2F3F5]  min-w-[218px] flex flex-col">
            <ChannelHeader
                typeSearch={isServerPage ? "SERVERS" : "DIRECT-MESSAGES"}
                currentServer={server as Server}
                currentMember={currentMember}
                dataSearch={[
                    {
                        label: "Text Channels",
                        type: "channel",
                        data: textChannels?.map((channel) => ({
                            id: channel.id,
                            name: channel.name,
                            icon: iconMap[channel.type],
                        })),
                    },
                    {
                        label: "Voice Channels",
                        type: "channel",
                        data: audioChannels?.map((channel) => ({
                            id: channel.id,
                            name: channel.name,
                            icon: iconMap[channel.type],
                        })),
                    },
                    {
                        label: "Video Channels",
                        type: "channel",
                        data: videoChannels?.map((channel) => ({
                            id: channel.id,
                            name: channel.name,
                            icon: iconMap[channel.type],
                        })),
                    },
                    {
                        label: "Members",
                        type: "member",
                        data: anotherMembers?.map((member) => ({
                            id: member.profile.id,
                            name: member.profile.user.name,
                            icon: roleIconMap[member.role],
                        })),
                    },
                ]}
            />
            <Separator className="shadow-2xl h-[1.3px]" />
            <div className="px-[12px] py-[9px] flex-1">
                <ScrollArea>
                    {!!textChannels?.length && (
                        <div className="mb-2">
                            <ChannelSection
                                sectionType="channels"
                                channelType={ChannelType.TEXT}
                                role={currentMember?.role}
                                label="Text Channels"
                                server={server}
                            />
                            <div className="space-y-[2px]">
                                {textChannels.map((channel) => (
                                    <ChannelItems
                                        key={channel.id}
                                        channel={channel}
                                        role={currentMember?.role}
                                        server={server as Server}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {!!audioChannels?.length && (
                        <div className="mb-2">
                            <ChannelSection
                                sectionType="channels"
                                channelType={ChannelType.AUDIO}
                                role={currentMember?.role}
                                label="Voice Channels"
                                server={server}
                            />
                            <div className="space-y-[2px]">
                                {audioChannels.map((channel) => (
                                    <ChannelItems
                                        key={channel.id}
                                        channel={channel}
                                        role={currentMember?.role}
                                        server={server as Server}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {!!videoChannels?.length && (
                        <div className="mb-2">
                            <ChannelSection
                                sectionType="channels"
                                channelType={ChannelType.VIDEO}
                                role={currentMember?.role}
                                label="Video Channels"
                                server={server}
                            />
                            <div className="space-y-[2px]">
                                {videoChannels.map((channel) => (
                                    <ChannelItems
                                        key={channel.id}
                                        channel={channel}
                                        role={currentMember?.role}
                                        server={server as Server}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {/* {!!anotherMembers?.length && (
                        <div className="mb-2">
                            <ChannelSection
                                sectionType="members"
                                role={currentMember?.role}
                                label="Members"
                                server={server}
                            />
                            <div className="space-y-[2px]">
                                {anotherMembers.map((member) => (
                                    <ChannelItems
                                        key={member.id}
                                        member={}
                                        server={server as Server}
                                    />
                                ))}
                            </div>
                        </div>
                    )} */}
                </ScrollArea>
            </div>
            <ChannelProfile
                member={currentMember as MemberWithProfileWithUser}
            />
        </div>
    );
};

export default ChannelSidebar;
