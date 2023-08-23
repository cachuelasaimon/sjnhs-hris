import { FC } from 'react';

import { Box } from '@mui/material';

interface IProductViewerProps {
  picture: string;
  productName: string;
}

const ProductViewer: FC<IProductViewerProps> = ({ picture, productName }) => {
  const handleClick = () => {
    window.open(picture, '_blank');
  };
  return (
    <Box display='flex' width='100%'>
      <div
        style={{
          alignSelf: 'top',
          minWidth: '100%',
          backgroundSize: 'cover',
        }}
      >
        <img
          draggable={false}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={handleClick}
          alt={productName.toLowerCase().split(' ').join('-')}
          src={picture}
        />
      </div>
    </Box>
  );
};

export default ProductViewer;
