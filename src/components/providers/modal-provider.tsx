import { CreateChannelModal } from "../modals/create-channel-modal";
import CreateServerModal from "../modals/create-server-modal";
import { InviteModal } from "../modals/invite-modal";

const ModalProvider = () => {
    return (
        <>
            <CreateServerModal />
            <CreateChannelModal />
            <InviteModal />
        </>
    );
};

export default ModalProvider;
