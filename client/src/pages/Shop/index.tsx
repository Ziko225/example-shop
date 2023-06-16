import { useSearchParams } from "react-router-dom";
import useDevices from "../../hooks/useDevices/useDevices";
import useSelectId from "../../hooks/useSelectId/useSelectId";
import ItemCard from "./ItemCard";
import { FilterBlockBrands, FilterBlockTypes, ItemsBlock, StyledButton, StyledMain } from "./styled";
import useSetParams from "./useSetParams";

const Shop = () => {
  const { brands, devices, types, errorMsg } = useDevices();

  const [searchParams] = useSearchParams();

  const IDs = {
    typeId: searchParams.get("typeId") || 0,
    brandId: searchParams.get("brandId") || 0
  };

  const [brandId, setBrandId] = useSelectId(+IDs.brandId);
  const [typeId, setTypeId] = useSelectId(+IDs.typeId);

  useSetParams(brandId, typeId);

  return (
    <StyledMain>
      <FilterBlockBrands>
        {brands && brands.map((brand) =>
          <StyledButton
            key={brand.id}
            $active={brandId === brand.id}
            onClick={() => setBrandId(brand.id)}
          >
            {brand.name}
          </StyledButton>
        )}
      </FilterBlockBrands>
      <FilterBlockTypes>
        {types && types.map((type) =>
          <StyledButton
            key={type.id}
            $active={typeId === type.id}
            onClick={() => setTypeId(type.id)}
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
    </StyledMain>
  );
};

export default Shop;