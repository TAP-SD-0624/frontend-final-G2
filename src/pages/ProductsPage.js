import React, { useEffect, useState } from 'react';
import imghero from '../assets/images/black-friday.png';
import { StyledTitle } from "../themes/StyledPageTitle";
import { Box, Container, Button, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { getQueryValue } from "../utils/getQueryValue";
import CustomBreadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import useBrands from "../hooks/useBrands";
import { Pagination } from "@mui/material";
import ProductsList from '../components/ProductsList/ProductsList';
import Typography from "@mui/material/Typography";
import useCategoryData from '../hooks/useCategoryData';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const ProductsPage = () => {
    const [title, setTitle] = useState();
    const [page, setPage] = useState(1);
    const limit = 20;
    const query = useQuery();
    const brandId = query.get('brandId');
    const brandName = query.get('brandName');
    const categoryID = query.get('categoryID');
    const categoryName = query.get('categoryName');
    const{ brandData}=useBrands(brandId);
    console.log(brandData);
    const{categoryData}=useCategoryData(categoryID);
    let name=brandName?brandName:categoryName;
    let data=brandId?brandData:categoryData;
    
    const offset = (page - 1) * limit;
    const location = useLocation();
    const queryString = location.search;   
    const filter = `${queryString}&offset=${offset}&limit=${limit}`;
    
    const handleNext = () => {
        setPage((prevPage) => prevPage + 1);
    };
    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        setTitle(getQueryValue(queryString));
        setPage(1);
    }, [queryString]);

    const links = [
        {
            name: 'Home',
            path: '/'
        }
    ];
      
    
    return (
        <Container aria-label="Product Page" role="region" sx={{ marginTop: '2rem', display: 'flex', flexDirection: 'column' }} maxWidth='1780px'>
            <img alt={'pic'} src={imghero} width='100%' />
            <CustomBreadcrumbs links={links} label={name} />
            {name && (
                <StyledTitle role="heading" variant="h2" component={'h1'}>
                    {name}
                </StyledTitle>
            )}
            { data?.length > 0 ? <ProductsList products={data} /> : <Typography variant={'h3'} component={'h2'}>No Products Found :(</Typography>}
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4, gap: '20px' }}>
                {data && <Box sx={{ height: '36px', bgcolor: 'grey.main', borderRadius: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }} px={2}>
                    <Pagination aria-label="Page navigation" count={data?.pagination?.totalPages || 1} page={page} onChange={handleChange} shape="rounded" color="primary" hidePrevButton hideNextButton />
                </Box>}
                {data?.pagination?.totalPages !== data?.pagination?.currentPage && <Button aria-label="Next page" onClick={handleNext} variant="contained" sx={{ color: 'TypeLowEmphasis.main', bgcolor: 'grey.main', height: '36px', width: '67px' }}>Next</Button>}
            </Box>

        </Container>
    );
};
export default ProductsPage;