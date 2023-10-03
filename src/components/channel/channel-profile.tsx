import { MemberWithProfileWithUser } from "@/types/type-custom";
import { ActionTooltip } from "@/components/actions/action-tooltip";
import { Settings } from "lucide-react";

interface ChannelProfileProps {
    member: MemberWithProfileWithUser;
}
const ChannelProfile = ({ member }: ChannelProfileProps) => {
    return (
        <div className="w-full h-11 p-2 bg-zinc-300/20 flex items-center">
            <div className="flex flex-1 items-center gap-2 hover:bg-zinc-300 transition rounded-sm cursor-pointer">
                {!member?.profile.user.imageUrl ? (
                    <div className="border rounded-full h-8 w-8 bg-white flex items-center justify-center select-none ">
                        {member?.profile.user.name.substring(0, 2)}
                    </div>
                ) : (
                    <img
                        src={member?.profile.user.imageUrl}
                        className="rounded-full h-7 w-7 "
                    />
                )}

                <div className="flex flex-col">
                    <p className="text-sm font-semibold">
                        {member?.profile.user.name}
                    </p>
                    <p className="text-xs">Online</p>
                </div>
            </div>
            <div>
                <ActionTooltip label="User Settings ">
                    <div className=" cursor-pointer p-2 rounded-md hover:bg-zinc-300 transition">
                        <Settings className="h-4 w-4" />
                    </div>
                </ActionTooltip>
            </div>
        </div>
    );
};

export default ChannelProfile;
