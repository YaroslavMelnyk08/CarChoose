import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import { Pagination } from 'react-bootstrap';

const Pages = observer(() => {
    const { ad } = useContext(Context);
    const pageTotalCount = Math.ceil(ad.totalCount / ad.limit);
    const pages = [];

    for (let i = 0; i < pageTotalCount; i++) {
        pages.push(i + 1);
    }

    return (
        <Pagination className="mt-5">
            {pages.map(page => 
                <Pagination.Item
                    key={page} // Adding a unique key prop
                    active={ad.page === page}
                    onClick={() => ad.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;
