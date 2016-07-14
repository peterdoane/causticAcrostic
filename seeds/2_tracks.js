'use strict'

exports.seed = function(knex) {
  return knex('tracks').del()
    .then(() => {
      return knex('tracks').insert([
    {
      id: 1,
      name: 'Armchair Generals',
      artist: 'Sublime Cadaveric Decomposition',
      preview_url: 'https://p.scdn.co/mp3-preview/8a94cb8bd106eb03405bebec40e5dd87c26f6478'
    },
    {
      id: 2,
      name: 'Be a Thorn to Power',
      artist: 'Blockheads',
      preview_url: 'https://p.scdn.co/mp3-preview/b78a7c14972525d504f58e77193883ee65adcbad'
    },
    {
      id: 3,
      name: 'Covered in Skin',
      artist: 'Goregast',
      preview_url: 'https://p.scdn.co/mp3-preview/f34ad12aa143ee1304a67e6579ce2b21b7fd0311'
    },
    {
      id: 4,
      name: 'Domestic Prison',
      artist: 'disrupt',
      preview_url: 'https://p.scdn.co/mp3-preview/38652496b5db2c40a64d897c380e27759dcff35e'
    },
    {
    id: 5,
    name: 'Eaten',
    artist: 'Bloodbath',
    preview_url: 'https://p.scdn.co/mp3-preview/68bc034b264410f6c140417e29c2eb3195b0d7bc'
    },
    {
    id: 6,
    name: 'Forlani',
    artist: 'Burnt By The Sun',
    preview_url: 'https://p.scdn.co/mp3-preview/bec43d6a93f9e8965bbc74ede8a91fbfcc3eff15'
    },
    {
    id: 7,
    name: 'Get it Off',
    artist: 'Disfear',
    preview_url: 'https://p.scdn.co/mp3-preview/cfcffb3b4b1f30cebc8b58563e9c68a6b48f8c50'
    },
    {
      id: 8,
      name: 'Horca',
      artist: 'Matchetazo',
      preview_url: 'https://p.scdn.co/mp3-preview/2dfa70cc3e7fae8cc2c1cd41c2e7b96ca50ab374'
    },
    {
      id: 9,
      name: "I'm Joe Biden",
      artist: 'Litmus Green',
      preview_url: 'https://p.scdn.co/mp3-preview/ce923ee752da7c0b94e2921405f0fb7fc179f866'
    },
    {
      id: 10,
      name: 'Judas Rising',
      artist: 'Judas Priest',
      preview_url: 'https://p.scdn.co/mp3-preview/12e9d604a7d1cb0b250781aad586465bf4cd6aa5'
    },
    {
      id: 11,
      name: 'Kill For God',
      artist: 'Matchetazo',
      preview_url: 'https://p.scdn.co/mp3-preview/95a066e5ba4548953be3decb3dbab9193c5bbaf8'
    },
    {
      id: 12,
      name: 'Love Destruction',
      artist: 'Warrior Soul',
      preview_url: 'https://p.scdn.co/mp3-preview/a8ff21b67184a8e6c408592a5422b9fade9d97ea'
    },
    {
      id: 13,
      name: 'Matando Gueros',
      artist: 'Brujeria',
      preview_url: 'https://p.scdn.co/mp3-preview/fa528b4f5f81a1c2420af49f4139706ac6661545'
    },
    {
     id: 14,
     name: 'Nucleon',
     artist: 'Wormed',
     preview_url: 'https://p.scdn.co/mp3-preview/96f2a54e38121c802b22574e45424f5b019e557b'
   },
    {
     id: 15,
     name: 'Ohrwurm',
     artist: 'Cephalic Carnage',
     preview_url: 'https://p.scdn.co/mp3-preview/ef82f8170ba2800de7df2cc8489144f867cd52dc'
    },
    {
     id: 16,
     name: 'Paradogma',
     artist: 'Hour of Penance',
     preview_url: 'https://p.scdn.co/mp3-preview/a03b374e6853401197ffd5d0f625bfe117571eb1'
    },
    {
     id: 17,
     name: 'Quad Damage',
     artist: 'Cadaveric Crematorium',
     preview_url: 'https://p.scdn.co/mp3-preview/ef59c8dd7b830cf989a393037c836d03de849f6d'
    },
    {
     id: 18,
     name: 'Ripped Off Face',
     artist: 'Uphill Battle',
     preview_url: 'https://p.scdn.co/mp3-preview/662fdedec0571b0f6fd872df26c856c8c4bb18ac'
    },
    {
     id: 19,
     name: 'Stand in Defeat',
     artist: 'Maruta',
     preview_url: 'https://p.scdn.co/mp3-preview/fe6d2488b0166b799d36d498d87012a82e01c3fa'
    },
    {
     id: 20,
     name: 'Theatric Symbolisation of Life',
     artist: 'Agathocles',
     preview_url: 'https://p.scdn.co/mp3-preview/47d0d6297961562a1e1c610b5d791f85a5865b99'
    },
    {
     id: 21,
     name: 'Unne Bonne Tablette',
     artist: 'Dahmer',
     preview_url: 'https://p.scdn.co/mp3-preview/59304b359a82d98173460962e66bf12d051c1b83'
    },
    {
     id: 22,
     name: 'Vampire',
     artist: 'Blood Feast',
     preview_url: 'https://p.scdn.co/mp3-preview/d93cae5951e971ebbf59d0a8a795bb2eb2f57b82'
    },
    {
     id: 23,
     name: 'Welcome To My Nightmare',
     artist: 'Ronnie James Dio (DIO)',
     preview_url: 'https://p.scdn.co/mp3-preview/8b9bc59a1a5c22783baa39b2911e01ae4bba3a86'
    },
    {
     id: 24,
     name: 'Xenophobic Hate Machine',
     artist: 'Bodies In the Geas of the Aparatus',
     preview_url: 'https://p.scdn.co/mp3-preview/d35e2c4fe11636eda7724c49167307d339c1d502'
    },
    {
     id: 25,
     name: 'You Must Fall',
     artist: 'Mayhem',
     preview_url: 'https://p.scdn.co/mp3-preview/9b47f1bcb7a40c40a79121f96be092beaa9e15e8'
    },

    {
     id: 26,
     name: 'Zos Kia Cultus',
     artist: 'Behemoth',
     preview_url: 'https://p.scdn.co/mp3-preview/e930ad3de68e1c082a5bc24abd3e2902fdebef1d'
    },
  ]);
 })
 .then(() => {
    return knex.raw(
      "SELECT setval('tracks_id_seq', (SELECT MAX(id) FROM tracks));"
    );
  });
};
