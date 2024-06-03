import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Context } from '..';
import { Pagination } from 'react-bootstrap';
import '../styles/PageBar.css';

const Pages = observer(() => {
    const { ad } = useContext(Context);
    const pageTotalCount = Math.ceil(ad.totalCount / ad.limit);
    const pages = [];

    for (let i = 0; i < pageTotalCount; i++) {
        pages.push(i + 1);
    }

    const handlePageClick = (page) => {
        ad.setPage(page);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [ad.page]);

    return (
        <Pagination className="mt-3 pageBar">
            {pages.map(page => 
                <Pagination.Item 
                    key={page}
                    active={ad.page === page}
                    onClick={() => handlePageClick(page)}
                    className='pageItem'
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;