import { cn } from "@/lib/utils";

interface AuthLayoutProps {
    className?: string;
    children: React.ReactNode;
}

const AuthLayout = ({ children, className }: AuthLayoutProps) => {
    return (
        <div
            className={cn(
                "w-full h-[100vh] flex justify-center items-center ",
                className,
            )}
        >
            {children}
        </div>
    );
};

export default AuthLayout;
