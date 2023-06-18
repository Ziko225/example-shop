import { useState } from "react";
import { ErrorElement, ExitButton, Header, ModalOutsideContainer, ModularInsideContainer, StyledCreateButton, StyledForm, StyledInput, Title } from "../common/styled";
import { createType } from "../../../../http/shopApi";

type Props = {
    toggleModal: () => void;
    refresh: () => void;
};

const CreateTypeModal = ({ toggleModal, refresh }: Props) => {
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [statusMsg, setStatusMsg] = useState("");

    const create = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            if (!name) {
                throw new Error("Choose a name!");
            }

            setStatus("");
            setStatusMsg("Loading...");

            const status = await createType(name);

            if (!status) {
                throw new Error("Something get wrong");
            }

            if (status instanceof Error) {
                throw status;
            }

            setStatus("ok");
            setStatusMsg(`Type ${name} added successfully`);
            setName("");
            refresh();
        } catch (error) {
            if (error instanceof Error) {
                setStatus("error");
                setStatusMsg(error.message);
            }
        }
    };

    return (
        <ModalOutsideContainer>
            <ModularInsideContainer>
                <Header>
                    <Title>Add type</Title>
                    <ExitButton onClick={toggleModal}>Close</ExitButton>
                </Header>
                <StyledForm onSubmit={create}>
                    <ErrorElement $isError={status === "error"} $isSuccess={status === "ok"}>{statusMsg}</ErrorElement>
                    <StyledInput value={name} onChange={(e) => setName(e.currentTarget.value)} placeholder="Type name" />
                    <StyledCreateButton>Add</StyledCreateButton>
                </StyledForm>
            </ModularInsideContainer>
        </ModalOutsideContainer>
    );
};

export default CreateTypeModal;