import { CreateChannelModal } from "../modals/create-channel-modal";
import CreateServerModal from "../modals/create-server-modal";

const ModalProvider = () => {
    return (
        <>
            <CreateServerModal />
            <CreateChannelModal />
        </>
    );
};

export default ModalProvider;
