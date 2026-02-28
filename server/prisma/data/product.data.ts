export const DATA_PRODUCTS = [
  {
    name: 'Combo Tủ Quần Áo Cánh Kính MOHO ASTRO',
    description:
      'Bộ combo phòng ngủ gồm tủ quần áo cánh kính MOHO ASTRO, giường ngủ MOHO ASTRO, bàn trang điểm MOHO ASTRO và 2 đêm ngủ MOHO ASTRO. Thiết kế hiện đại, sang trọng với chất liệu gỗ tự nhiên cao cấp, mang đến không gian phòng ngủ tiện nghi và đẳng cấp.',
    categories: ['Phòng ngủ', 'Tủ & Kệ', 'Tủ quần áo'],
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
        defaultVariant: true,
        combination: {
          Size: '1m6',
          Color: 'Nâu',
        },
        discount: {
          type: 'percentage',
          discountType: 'VARIANT',
          value: 26,
          startDate: new Date(),
          endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
          priority: 1,
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
        price: 27480000,
        stock: 15,
        defaultVariant: false,
        combination: {
          Size: '1m6',
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
      {
        price: 29480000,
        stock: 5,
        defaultVariant: false,
        combination: {
          Size: '1m8',
          Color: 'Nâu',
        },
        images: [
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_tu_quan_ao_canh_kinh_3_buong_moho_2_59b284d22dd546e09d7a518a058f0a6a_master.png',
            isMain: true,
          },
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_tu_quan_ao_canh_kinh_3_buong_moho_4_12cfb46cd29745248c6ead9ed3eabddb_master.png',
            isMain: false,
          },
        ],
      },
      {
        price: 29480000,
        stock: 15,
        defaultVariant: false,
        combination: {
          Size: '1m8',
          Color: 'Xám',
        },
        images: [
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_tu_quan_ao_canh_kinh_3_buong_moho_8_0d3f984816dc4cdf81efd4209d9547f4_master.png',
            isMain: true,
          },
        ],
      },
    ],
  },
  {
    name: 'Tủ Quần Áo Cánh Kính Cao Cấp 1m2 LUXHOUSE ASTRO',
    description:
      'Bộ combo phòng ngủ gồm tủ quần áo cánh kính LUXHOUSE ASTRO, giường ngủ LUXHOUSE ASTRO, bàn trang điểm LUXHOUSE ASTRO và 2 đêm ngủ LUXHOUSE ASTRO. Thiết kế hiện đại, sang trọng với chất liệu gỗ tự nhiên cao cấp, mang đến không gian phòng ngủ tiện nghi và đẳng cấp.',

    categories: ['Phòng ngủ', 'Tủ & Kệ', 'Tủ quần áo'],

    images: [],

    attributes: [
      {
        name: 'Color',
        values: ['Màu tự nhiên'],
      },
      {
        name: 'Size',
        values: ['1m2'],
      },
    ],

    variants: [
      {
        price: 16990000,
        stock: 100,
        defaultVariant: true,
        combination: {
          Size: '1m2',
          Color: 'Màu tự nhiên',
        },
        images: [
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_tu_quan_ao_canh_kinh_1m2_moho_astro_c9a5b849dac74d7493a38c5d429a747d_master.png',
            isMain: true,
          },
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_tu_quan_ao_canh_kinh_moho_astro_6d29f2110bb74f67bba4db0678f5f127_master.png',
            isMain: false,
          },
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_tu_quan_ao_canh_kinh_1m2_moho_astro_f599e0e503ef4eed94f39358c4af54ae_master.jpg',
            isMain: false,
          },
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_tu_quan_ao_canh_kinh_moho_astro_3_b8bf7a7620b04b9ba288fd54b3c2ce95_master.png',
            isMain: false,
          },
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_tu_quan_ao_canh_kinh_1m2_moho_astro_3_89d18f47483f4ab39d70a5e6ebe1f2a8_master.jpg',
            isMain: false,
          },
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_tu_quan_ao_canh_kinh_1m2_moho_astro_4_56fcd65e5f0d41e3ae9323b2833141e7_master.jpg',
            isMain: false,
          },
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_tu_quan_ao_canh_kinh_1m2_moho_astro_5_7e2d5bae39f9448da1c269d2849c11ce_master.jpg',
            isMain: false,
          },
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_mau_tu_nhien_tu_quan_ao_canh_kinh_1m2_moho_astro_6_680927319d4f4cef940561de9d5e123e_master.jpg',
            isMain: false,
          },
        ],
      },
    ],
  },
  {
    name: 'Giường Ngủ Bọc Da Cao Cấp Hiện Đại LUXHOUSE BLINK',
    description:
      'Bộ combo phòng ngủ gồm tủ quần áo cánh kính LUXHOUSE ASTRO, giường ngủ LUXHOUSE ASTRO, bàn trang điểm LUXHOUSE ASTRO và 2 đêm ngủ LUXHOUSE ASTRO. Thiết kế hiện đại, sang trọng với chất liệu gỗ tự nhiên cao cấp, mang đến không gian phòng ngủ tiện nghi và đẳng cấp.',

    categories: ['Phòng ngủ', 'Giường ngủ'],

    images: [],

    attributes: [
      {
        name: 'Color',
        values: ['Nâu'],
      },
      {
        name: 'Size',
        values: ['1m6', '1m8'],
      },
    ],

    variants: [
      {
        price: 17490000,
        stock: 10,
        defaultVariant: true,
        combination: {
          Size: '1m6',
          Color: 'Nâu',
        },
        images: [
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_nau_giuong_boc_da_cao_cap_moho_blink_4_370768cd6d554fdc913ddfc94e028319_master.png',
            isMain: true,
          },
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_nau_giuong_boc_da_cao_cap_moho_blink_5_f8a7fee410ad4882855e769f818e12fc_master.png',
            isMain: false,
          },
        ],
      },
      {
        price: 18490000,
        stock: 10,
        defaultVariant: false,
        combination: {
          Size: '1m8',
          Color: 'Nâu',
        },
        images: [
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_nau_giuong_boc_da_cao_cap_moho_blink_1_6d1e1915e9e240f1a72b50d21221495a_master.png',
            isMain: true,
          },
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_nau_giuong_boc_da_cao_cap_moho_blink_8be926544b054de9823e28539053ed97_master.png',
            isMain: false,
          },
          {
            url: 'https://cdn.hstatic.net/products/200000065946/pro_nau_giuong_boc_da_cao_cap_moho_blink_3_528e5bddbf3244a0a3dd9205ed27fc8c_master.png',
            isMain: false,
          },
        ],
      },
    ],
  },
];
