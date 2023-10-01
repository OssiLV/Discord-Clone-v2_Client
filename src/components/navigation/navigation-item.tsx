import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/actions/action-tooltip";
import { useNavigate, useParams } from "react-router-dom";

interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
}

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
    const { serverId } = useParams();
    const navigate = useNavigate();

    return (
        <ActionTooltip side="right" align="center" label={name}>
            <button
                onClick={() => navigate(`/channels/${id}`)}
                className={cn("group relative flex items-center")}
            >
                <div
                    className={cn(
                        "absolute left-1 bg-primary rounded-r-full transition-all w-[4px] ",
                        serverId !== id && "group-hover:h-[20px]",
                        serverId === id && "h-[36px]",
                    )}
                />
                <div
                    className={cn(
                        "relative group flex justify-center items-center shadow-sm mx-3 h-[48px] w-[48px] rounded-[24px] bg-white group-hover:bg-indigo-500 group-hover:text-white group-hover:rounded-[16px] transition-all overflow-hidden",
                        serverId === id &&
                            imageUrl &&
                            "bg-primary/10 text-primary rounded-[16px]",
                        serverId === id &&
                            !imageUrl &&
                            "bg-indigo-500 text-white rounded-[16px] 0",
                    )}
                >
                    {imageUrl && <img src="https://github.com/shadcn.png" />}
                    {/* {imageUrl && <img src={imageUrl} />} */}
                    {!imageUrl && (
                        <p className="font-semibold first-letter:uppercase">
                            {name.substring(0, 2)}
                        </p>
                    )}
                </div>
            </button>
        </ActionTooltip>
    );
};
