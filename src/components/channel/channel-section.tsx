import { ChannelType, MemberRole } from "@/types/type-models";
import { ActionTooltip } from "@/components/actions/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";
import { Plus, Settings } from "lucide-react";
import { ServerWithChannelsMembers } from "@/types/type-custom";

interface ChannelSectionProps {
    label: string;
    role?: MemberRole;
    sectionType: "channels" | "members";
    channelType?: ChannelType;
    server?: ServerWithChannelsMembers;
}
const ChannelSection = ({
    label,
    sectionType,
    channelType,
    role,
    server,
}: ChannelSectionProps) => {
    const { onOpen } = useModal();

    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                {label}
            </p>
            {role !== MemberRole.GUEST && sectionType === "channels" && (
                <ActionTooltip label="Create Channel" side="top">
                    <button
                        onClick={() =>
                            onOpen("createChannel", { channelType, server })
                        }
                        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </ActionTooltip>
            )}
            {role === MemberRole.ADMIN && sectionType === "members" && (
                <ActionTooltip label="Manage Members" side="top">
                    <button
                        onClick={() => onOpen("members", { server })}
                        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                    >
                        <Settings className="h-4 w-4" />
                    </button>
                </ActionTooltip>
            )}
        </div>
    );
};

export default ChannelSection;
