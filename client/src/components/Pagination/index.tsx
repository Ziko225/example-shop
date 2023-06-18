import { PaginationBlock, PaginationButton } from "./styled";

type Props = {
    pages: Array<number> | undefined;
    selectedPage: number;
    setSelectedPage: (page: number) => void;
    withoutScroll?: boolean;
};

const Pagination = ({ pages, selectedPage, setSelectedPage, withoutScroll }: Props) => {
    const setpage = (page: number) => {
        setSelectedPage(page);
        !withoutScroll && window.scrollTo(0, 0);
    };

    return (
        <PaginationBlock>
            {!pages || pages[1] && pages?.map((page) =>
                <PaginationButton onClick={() => setpage(page)} $active={page === selectedPage} key={page}>
                    {page}
                </PaginationButton>)}
        </PaginationBlock>
    );
};

export default Pagination;