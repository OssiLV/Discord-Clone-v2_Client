import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { Member, MemberRole, Server } from "@/types/type-models";
import {
    ChevronDown,
    Loader2,
    LogOut,
    PlusCircle,
    Settings,
    Trash,
    UserPlus,
    Users,
} from "lucide-react";

interface ChannelActionsProps {
    currentServer: Server;
    currentMember: Member;
}

const ChannelActions = ({
    currentServer,
    currentMember,
}: ChannelActionsProps) => {
    const { onOpen } = useModal();

    const isAdmin = currentMember?.role === MemberRole.ADMIN;
    const isModerator = isAdmin || currentMember?.role === MemberRole.MODERATOR;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="focus:outline-none px-[12px] py-[9px]"
                asChild
            >
                <button className="w-full text-md font-semibold flex items-center hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                    {!currentServer && (
                        <Loader2 className="h-4 w-4 text-zinc-500 animate-spin " />
                    )}
                    <p className="">{currentServer?.name}</p>

                    <ChevronDown className="h-5 w-5 ml-auto" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
                {isModerator && (
                    <DropdownMenuItem
                        onClick={() =>
                            onOpen("invite", { server: currentServer })
                        }
                        className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
                    >
                        Invite People
                        <UserPlus className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() =>
                            onOpen("editServer", { server: currentServer })
                        }
                        className="px-3 py-2 text-sm cursor-pointer"
                    >
                        Server Settings
                        <Settings className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() =>
                            onOpen("members", { server: currentServer })
                        }
                        className="px-3 py-2 text-sm cursor-pointer"
                    >
                        Manage Members
                        <Users className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuItem
                        onClick={() => onOpen("createChannel")}
                        className="px-3 py-2 text-sm cursor-pointer"
                    >
                        Create Channel
                        <PlusCircle className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isModerator && <DropdownMenuSeparator />}
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() =>
                            onOpen("deleteServer", { server: currentServer })
                        }
                        className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                    >
                        Delete Server
                        <Trash className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {!isAdmin && (
                    <DropdownMenuItem
                        onClick={() =>
                            onOpen("leaveServer", { server: currentServer })
                        }
                        className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                    >
                        Leave Server
                        <LogOut className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ChannelActions;
