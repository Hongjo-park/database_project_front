import React from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardContent, CardMedia, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const brandList = [
  { name: 'Wilson', logo: '/images/logos/wilson.png' },
  { name: 'Babolat', logo: '/images/logos/babolat.png' },
  { name: 'Head', logo: '/images/logos/head.png' },
  { name: 'Prince', logo: '/images/logos/prince.png' },
  { name: 'Yonex', logo: '/images/logos/yonex.png' },
];

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBrandClick = (brandName: string) => {
    navigate(`/racquet/${brandName.toLowerCase()}`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* brand 리스트 */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 200,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 200,
            boxSizing: 'border-box',
            top: 64, 
          },
        }}
      >
        <List>
          {brandList.map((brand) => (
            <ListItem key={brand.name} disablePadding>
              <ListItemButton onClick={() => handleBrandClick(brand.name)}>
                <ListItemText primary={brand.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* 메인 컨텐츠 */}
      <Box sx={{ flex: 1, textAlign: 'center', p: 10}}>
        <Typography variant="h4" sx={{ mb: 10, fontWeight: 'bold' }}>
          Racquets by Brand
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {brandList.map((brand) => (
            <Grid item key={brand.name} xs={6} sm={4} md={3} lg={2}>
              <Card>
                <CardActionArea onClick={() => handleBrandClick(brand.name)}>
                  <CardMedia
                    component="img"
                    image={brand.logo}
                    alt={brand.name}
                    sx={{ height: 160, objectFit: 'contain', p: 0 }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" textAlign="center">
                      {brand.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MainPage;