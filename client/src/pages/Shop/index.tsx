import { useSearchParams } from "react-router-dom";
import useDevices from "../../hooks/useDevices";
import useSelectId from "../../hooks/useSelectId";
import ItemCard from "./deviceCart";
import { FilterBlockBrands, FilterBlockTypes, ItemsBlock, StyledButton, StyledMain } from "./styled";
import useSetParams from "./useSetParams";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";

const Shop = () => {
  const [searchParams] = useSearchParams();

  const IDs = {
    typeId: searchParams.get("typeId") || 0,
    brandId: searchParams.get("brandId") || 0
  };

  const [selectedBrandId, setSelectedBrandId] = useSelectId(+IDs.brandId);
  const [selectedTypeId, setSelectedTypeId] = useSelectId(+IDs.typeId);

  useEffect(() => {
    setSelectedPage(1);
  }, [searchParams]);

  const [selectedPage, setSelectedPage] = useState(1);

  const { brands, devices, types, status, pages } = useDevices(selectedPage);

  useSetParams(selectedBrandId, selectedTypeId);

  return (
    <StyledMain>
      <FilterBlockBrands>
        {brands && brands.map((brand) =>
          <StyledButton
            key={brand.id}
            $active={selectedBrandId === brand.id}
            onClick={() => setSelectedBrandId(brand.id)}
          >
            {brand.name}
          </StyledButton>
        )}
      </FilterBlockBrands>
      <FilterBlockTypes>
        {types && types.map((type) =>
          <StyledButton
            key={type.id}
            $active={selectedTypeId === type.id}
            onClick={() => setSelectedTypeId(type.id)}
          >
            {type.name}
          </StyledButton>
        )}
      </FilterBlockTypes>
      <ItemsBlock>
        {devices
          ? devices.rows.map((device) =>
            <ItemCard key={device.id} data={device} />
          )
          : <h2>{status}</h2>
        }
      </ItemsBlock>
      <Pagination pages={pages} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
    </StyledMain>
  );
};

export default Shop;