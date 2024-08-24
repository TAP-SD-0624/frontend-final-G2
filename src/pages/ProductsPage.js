import React, { useEffect, useState } from 'react';
import ProductsList from '../components/ProductsList/ProductsList';
import imghero from '../assets/images/black-friday.png';
import { StyledTitle } from "../themes/StyledPageTitle";

import { Box, Container, Button, CircularProgress } from '@mui/material'
import { useLocation } from 'react-router-dom';
import { useProducts } from '../hooks/useAppAPIs';
import { getQueryValue } from "../utils/getQueryValue";
import CustomBreadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Pagination } from "@mui/material";

const ProductsPage = () => {
    const [title, setTitle] = useState();
    const [page, setPage] = useState(1);
    const limit = 20;

    const offset = (page - 1) * limit;

    const location = useLocation();
    const queryString = location.search;

    const filter = `${queryString}&offset=${offset}&limit=${limit}`;

    const { error, data: products, isLoading } = useProducts(filter, page);
    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleNext = () => {
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        setTitle(getQueryValue(queryString))
        setPage(1)
    }, [queryString])

    const links = [
        {
            name: 'Home',
            path: '/'
        }
    ]

    if (isLoading) {
        return (
            <div>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
                    <CircularProgress />
                </Box>
            </div>
        );
    }


    return (
        <Container aria-label="Product Page" role="region" sx={{ marginTop: '2rem', display: 'flex', flexDirection: 'column' }} maxWidth='1780px'>
            <img alt={'pic'} src={imghero} width='100%' />
            <CustomBreadcrumbs links={links} label={title} />
            {title && (
                <StyledTitle role="heading" variant="h2" component={'h1'} >
                    {title}
                </StyledTitle>
            )}
            {error &&
                <>
                    <Typography component={'h2'} variant={'h2'}>Something went wrong. Please try again.</Typography>
                    <Button sx={{width: '180px'}} variant="contained" color="primary" onClick={() => window.location.reload()}>
                        Reload Page
                    </Button>
                </>
            }
            { products?.products.length > 0 ? <ProductsList products={products.products} /> : <Typography variant={'h3'} component={'h2'}>No Products Found :(</Typography>}
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4, gap: '20px' }}>
                {products && <Box sx={{ height: '36px', bgcolor: 'grey.main', borderRadius: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }} px={2}>
                    <Pagination aria-label="Page navigation" count={products.pagination.totalPages} page={page} onChange={handleChange} shape="rounded" color="primary" hidePrevButton hideNextButton />
                </Box>}
                {products?.pagination.totalPages !== products?.pagination.currentPage && <Button aria-label="Next page" onClick={handleNext} variant="contained" sx={{ color: 'TypeLowEmphasis.main', bgcolor: 'grey.main', height: '36px', width: '67px' }}>Next</Button>
                }
            </Box>
        </Container>
    );
};

export default ProductsPage;
