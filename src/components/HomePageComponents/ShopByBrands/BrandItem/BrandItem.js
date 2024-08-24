import React from 'react'
import {CardMedia} from "@mui/material";
import {BrandCard} from "./style";
import { useNavigate } from 'react-router-dom';

const BrandItem = ({brand}) => {

    const navigate = useNavigate();
    if (!brand) {
        return <></>
    }
    
  return (
    <div>
        <BrandCard>
            <CardMedia onClick={() => navigate(`/products?brandId=${brand.id}`)}
                component="img"
                image={brand.image}
                style={{ width: '80%', height: 'auto' }}
            />
        </BrandCard>

    </div>
  )
}

export default BrandItem
