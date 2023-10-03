import { Bot } from "lucide-react";
import { ActionTooltip } from "@/components/actions/action-tooltip";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

const ServerHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isCurrentPage = location.pathname === "/direct-messages/@me";

    return (
        <ActionTooltip side="right" align="center" label="Direct Messages">
            <button
                onClick={() => navigate("/direct-messages/@me")}
                className="group relative flex items-center"
            >
                <div
                    className={cn(
                        "absolute left-1 bg-primary rounded-r-full transition-all w-[4px]",
                        isCurrentPage && "group-hover:h-[20px]",
                        isCurrentPage && "h-[36px]",
                    )}
                />
                <div
                    className={cn(
                        "flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-indigo-500",
                        isCurrentPage && "bg-indigo-500",
                    )}
                >
                    <Bot
                        className={cn(
                            "group-hover:text-white transition text-zinc-900",
                            isCurrentPage && "text-white",
                        )}
                        size={25}
                    />
                </div>
            </button>
        </ActionTooltip>
    );
};

export default ServerHeader;
