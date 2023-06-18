import { useSearchParams } from "react-router-dom";
import useDevices from "../../hooks/useDevices/useDevices";
import useSelectId from "../../hooks/useSelectId/useSelectId";
import ItemCard from "./ItemCard";
import { FilterBlockBrands, FilterBlockTypes, ItemsBlock, Pagination, PaginationButton, StyledButton, StyledMain } from "./styled";
import useSetParams from "./useSetParams";

const Shop = () => {
  const [searchParams] = useSearchParams();

  const IDs = {
    typeId: searchParams.get("typeId") || 0,
    brandId: searchParams.get("brandId") || 0
  };

  const [selectedBrandId, setSelectedBrandId] = useSelectId(+IDs.brandId);
  const [selectedTypeId, setSelectedTypeId] = useSelectId(+IDs.typeId);
  const [selectedPage, setSelectedPage] = useSelectId(1);

  const { brands, devices, types, errorMsg, pages } = useDevices(selectedPage);

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
          : <h2>{errorMsg}</h2>
        }
      </ItemsBlock>
      <Pagination>
        {!pages || pages[1] && pages?.map((page) =>
          <PaginationButton onClick={() => setSelectedPage(page)} $active={page === selectedPage} key={page}>
            {page}
          </PaginationButton>)}
      </Pagination>
    </StyledMain>
  );
};

export default Shop;