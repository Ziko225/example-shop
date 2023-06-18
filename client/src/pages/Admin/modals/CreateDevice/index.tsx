import { useState } from "react";
import useDevices from "../../../../hooks/useDevices/useDevices";
import useSelectId from "../../../../hooks/useSelectId/useSelectId";
import { ButtonBlock, StyledButton } from "../../styled";
import { Description, DescriptionBlock, DescriptionTitle, PriceInput, RemoveButton } from "./styled";
import {
    ErrorElement,
    ExitButton,
    Header, ModalOutsideContainer,
    ModularInsideContainer,
    StyledCreateButton,
    StyledInput,
    Title
} from "../common/styled";
import useCreateDevice from "./useCreateDevice";

type Props = {
    toggleModal: () => void;
    refresh: () => void;
};

const CreateDeviceModal = ({ toggleModal, refresh }: Props) => {
    const { brands, types } = useDevices(1);

    const [selectedBrandId, setSelectedBrandId] = useSelectId();
    const [selectedTypeId, setSelectedTypeId] = useSelectId();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const [file, setFile] = useState<HTMLInputElement["files"]>(null);

    const {
        addDevice,
        addDescription,
        removeDescription,
        information,
        status_addDevice,
        statusMsg_addDevice,
        statusMsg_addDescription } = useCreateDevice(title, description, selectedBrandId, selectedTypeId, name, price, file, refresh);

    return (
        <ModalOutsideContainer>
            <ModularInsideContainer>
                <Header id="header">
                    <Title >Add device</Title>
                    <ExitButton onClick={toggleModal}>Close</ExitButton>
                </Header>
                <ErrorElement $isError={status_addDevice === "error"} $isSuccess={status_addDevice === "ok"}>
                    {statusMsg_addDevice}
                </ErrorElement>
                <StyledInput onChange={(e) => setName(e.currentTarget.value)} placeholder="Device name" />
                <PriceInput onChange={(e) => setPrice(e.currentTarget.value)} placeholder="Price $" />
                <PriceInput onChange={(e) => setFile(e.target.files)} placeholder="Chose a foto" type="file" />
                <Title>Select brand:</Title>
                <ButtonBlock>
                    {brands && brands.map((brand) =>
                        <StyledButton
                            key={brand.id}
                            $active={selectedBrandId === brand.id}
                            onClick={() => setSelectedBrandId(brand.id)}
                        >
                            {brand.name}
                        </StyledButton>
                    )}
                </ButtonBlock>
                <Title>Select type:</Title>
                <ButtonBlock>
                    {types && types.map((type) =>
                        <StyledButton
                            key={type.id}
                            $active={selectedTypeId === type.id}
                            onClick={() => setSelectedTypeId(type.id)}
                        >
                            {type.name}
                        </StyledButton>
                    )}
                </ButtonBlock>
                <ErrorElement $isError={true}>{statusMsg_addDescription}</ErrorElement>
                <StyledInput onChange={(e) => setTitle(e.currentTarget.value)} placeholder="title" />
                <StyledInput onChange={(e) => setDescription(e.currentTarget.value)} placeholder="description" />
                <StyledButton onClick={addDescription}>Add information</StyledButton>
                {information[0] && information.map((element, index) =>
                    <DescriptionBlock key={element.title}>
                        <RemoveButton onClick={() => removeDescription(index)}>X</RemoveButton>
                        <DescriptionTitle>{element.title}</DescriptionTitle>
                        <Description>{element.description}</Description>
                    </DescriptionBlock>)}
                <StyledCreateButton onClick={addDevice}>Add device</StyledCreateButton>
            </ModularInsideContainer>
        </ModalOutsideContainer>
    );
};

export default CreateDeviceModal;