import { AlertCircle } from "lucide-react";
import { Link, useRouteError } from "react-router-dom";
import { Link as LinkIcon } from "lucide-react";
export default function ErrorPage() {
    const error: any = useRouteError();
    console.log(error);

    return (
        <div
            id="error-page"
            className="w-full h-[100vh] flex justify-center items-center flex-col gap-2"
        >
            <AlertCircle className="h-12 w-12 text-red-600 mb-2" />
            <h1 className="text-2xl font-bold">Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <div className="flex flex-col items-center">
                <i className="text-red-600">
                    {error.statusText || error.message}
                </i>
                <i className="text-red-600 underline">{error.status}</i>
            </div>
            <div className="flex items-center gap-2">
                <Link
                    to={"/"}
                    className="text-zinc-400 hover:underline hover:text-zinc-700 transition"
                >
                    Go to home page
                </Link>
                <LinkIcon className="w-4 h-4" />
            </div>
        </div>
    );
}
