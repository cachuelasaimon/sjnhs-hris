import { Rating } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#282323',
  },
  '& .MuiRating-iconHover': {
    color: '#1c1a1a7',
  },
});

export default StyledRating;
