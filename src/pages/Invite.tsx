import { ServerWithChannels } from "@/types/type-custom";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Invite = () => {
    const navigate = useNavigate();
    const token = Cookies.get("access-token");
    const { inviteCode } = useParams();
    console.log(inviteCode);

    useEffect(() => {
        if (token) {
            axios
                .get("auth/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    axios
                        .patch(`servers/new-member/${inviteCode}`)
                        .then((res) => {
                            const serverWithChannels: ServerWithChannels =
                                res.data;
                            navigate(
                                `/servers/${serverWithChannels.id}/channels/${serverWithChannels.channels[0].id}`,
                            );
                        });
                })
                .catch(() => navigate("/sign-in"));
        } else {
            navigate("/sign-in");
        }
    }, []);
    return <div>invite</div>;
};

export default Invite;
