export const DATA_PRODUCTS = [
  {
    name: 'Combo Tủ Quần Áo Cánh Kính MOHO ASTRO',
    description:
      'Bộ combo phòng ngủ gồm tủ quần áo cánh kính MOHO ASTRO, giường ngủ MOHO ASTRO, bàn trang điểm MOHO ASTRO và 2 đêm ngủ MOHO ASTRO. Thiết kế hiện đại, sang trọng với chất liệu gỗ tự nhiên cao cấp, mang đến không gian phòng ngủ tiện nghi và đẳng cấp.',

    categories: ['Phòng ngủ', 'Tủ & Kệ', 'Tủ quần áo'],

    images: [
      // {
      //   url: 'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_tu_quan_ao_canh_kinh_moho_astro_1_41aeaa0c20e3467c94a35eb78d164bec_master.png',
      //   isMain: true,
      // },
      // {
      //   url: 'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_tu_quan_ao_canh_kinh_moho_astro_2_676f8b823fb046449a5acbcda591febd_master.png',
      //   isMain: false,
      // },
    ],

    attributes: [
      {
        name: 'Color',
        values: ['Nâu', 'Xám'],
      },
      {
        name: 'Size',
        values: ['1m6', '1m8'],
      },
    ],

    variants: [
      {
        price: 27480000,
        stock: 10,
        combination: {
          Size: '1m6',
          Color: 'Nâu',
        },
        images: [
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_tu_quan_ao_canh_kinh_moho_astro_1_41aeaa0c20e3467c94a35eb78d164bec_master.png',
            isMain: true,
          },
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_tu_quan_ao_canh_kinh_moho_astro_2_676f8b823fb046449a5acbcda591febd_master.png',
            isMain: false,
          },
        ],
      },
      {
        price: 28480000,
        stock: 5,
        combination: {
          Size: '1m8',
          Color: 'Xám',
        },
        images: [
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_tu_quan_ao_canh_kinh_moho_astro_9_ccccf14252ce4697b2579b306909f7f8_master.png',
            isMain: true,
          },
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_tu_quan_ao_canh_kinh_moho_astro_7_bc4c831099694bf2bc4fd92163ef27da_master.png',
            isMain: false,
          },
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_tu_quan_ao_canh_kinh_moho_astro_4_30349c553833483b9d86f6870f32562a_master.png',
            isMain: false,
          },
        ],
      },
    ],
  },
];
