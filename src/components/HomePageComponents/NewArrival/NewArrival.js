import React from 'react';
import ProductCard from '../../ProductCard/ProductCard';
import { Typography, Box } from '@mui/material';
import { Button } from '@mui/material';
import { useProducts } from '../../../hooks/useAppAPIs';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LoadingProgress from '../../Loading/LoadingProgress';
import {sectionBox} from "./style";

const NewArrival = () => {
    const navigate = useNavigate();
    const { data: NewArrival, isLoading, isError } = useProducts('?limit=4&createdWithin=2023-11-13&offset=160');

    if (isLoading) {
        return <LoadingProgress />;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    return (
        <Box component="section"
             role="region"
             aria-label="New Arrivals Section"
             sx={{ margin: ['20px', '18px', '16px', '14px', '10px'], marginRight: '1rem', display: 'flex', flexDirection: 'column', alignSelf: 'center', width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: ['20px', '18px', '16px', '14px', '10px'], }}>
                <Typography sx={{ color: 'dark.main' }} variant="h2" component={'h3'}>
                    New Arrivals
                </Typography>
                <Button
                    style={{ textTransform: 'none', alignSelf: 'flex-end', fontSize: '16px' }}
                    aria-label="View all new arrivals"
                    onClick={() => navigate(`/products?createdWithin=2023-11-13`)}
                    endIcon={<ArrowForwardIosIcon />}
                >
                    View all
                </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignSelf: 'flex-start', marginTop: '1rem', justifyContent: 'space-between', width:'100%' }}>
                {NewArrival?.products.map((product, index) => (
                    <Box
                        key={index}
                        onClick={() => navigate(`/products/${product.id}`)}
                        sx={sectionBox}
                    >
                        <ProductCard
                            image={product.image}
                            item={product}
                            title={product.name}
                            description={product.highlight}
                            variant={{ title: 'h5', body: 'body2' }}
                            width={'100%'}
                        />

                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default NewArrival;
