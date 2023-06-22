import { useState } from "react";
import Pagination from "../../components/Pagination";
import useDevices from "../../hooks/useDevices";
import CreateBrandModal from "./modals/CreateBrand";
import CreateDeviceModal from "./modals/CreateDevice";
import CreateTypeModal from "./modals/CreateType";
import { ButtonBlock, ErrorElement, Item, ItemsList, RemoveButton, StyledButton, StyledImg, StyledMain, TitleItems } from "./styled";
import { useToggle } from "./useToggle";
import { removeBrand, removeDevice, removeType } from "../../http/shopApi";
import { AxiosError } from "axios";

const Admin = () => {
  const [createBrandOpen, toggleCreateBrandOpen] = useToggle();
  const [createTypeOpen, toggleCreateTypeOpen] = useToggle();
  const [createDeviceOpen, toggleCreateDeviceOpen] = useToggle();

  const [selectedPage, setSelectedPage] = useState(1);

  const { devices, brands, types, pages, status, getTypes, getBrands, getDevices } = useDevices(selectedPage);

  const [errorMsg, setErrorMsg] = useState("");

  const url = process.env.REACT_APP_HOST_URL;

  const remove = async (id: number, name: string) => {
    if (!id) {
      return;
    }

    let status;

    name === "type" && (status = await removeType(id));
    name === "brand" && (status = await removeBrand(id));
    name === "device" && (status = await removeDevice(id));

    if (status instanceof AxiosError) {
      setErrorMsg(status.response?.data.message);
      window.scrollTo(0, 0);
      return;
    }
    setErrorMsg("");

    name === "type" && getTypes();
    name === "brand" && getBrands();
    name === "device" && getDevices();
  };

  return (
    <>
      {createBrandOpen && <CreateBrandModal refresh={getBrands} toggleModal={toggleCreateBrandOpen} />}
      {createTypeOpen && <CreateTypeModal refresh={getTypes} toggleModal={toggleCreateTypeOpen} />}
      {createDeviceOpen && <CreateDeviceModal refresh={getDevices} toggleModal={toggleCreateDeviceOpen} />}

      <StyledMain $modalActive={createDeviceOpen || createBrandOpen || createTypeOpen}>
        <ButtonBlock>
          <StyledButton $active={createBrandOpen} onClick={toggleCreateBrandOpen}>Add brand</StyledButton>
          <StyledButton $active={createTypeOpen} onClick={toggleCreateTypeOpen}>Add type</StyledButton>
          <StyledButton $active={createDeviceOpen} onClick={toggleCreateDeviceOpen}>Add device</StyledButton>
        </ButtonBlock>
        <ErrorElement>{errorMsg}</ErrorElement>
        <TitleItems>Brands ({brands?.length || 0})</TitleItems>
        <ItemsList>
          {brands && brands.map((brand) =>
            <Item key={brand.id}>
              {brand.name}
              <RemoveButton onClick={() => remove(brand.id, "brand")}>Remove</RemoveButton>
            </Item>
          )}
        </ItemsList>
        <TitleItems>Types ({types?.length || 0})</TitleItems>
        <ItemsList>
          {types && types.map((type) =>
            <Item key={type.id}>
              {type.name}
              <RemoveButton onClick={() => remove(type.id, "type")}>Remove</RemoveButton>
            </Item>
          )}
        </ItemsList>
        <TitleItems>Devices ({devices?.count || 0})</TitleItems>
        <ItemsList>
          {devices ? devices.rows.map((device) =>
            <Item key={device.id}>
              <StyledImg width="80px" src={`${url}/${device.img}`} />
              {device.name}
              <RemoveButton onClick={() => remove(device.id, "device")}>Remove</RemoveButton>
            </Item>
          ) : <h2>{status}</h2>}
        </ItemsList>
        <Pagination withoutScroll={true} pages={pages} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      </StyledMain>
    </>
  );
};

export default Admin;