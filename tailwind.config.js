/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        'roboto-mono': ['"Roboto Mono"', 'monospace'],
        roboto: ['Roboto', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'space-mono': ['Space Mono', 'monospace']
      },
      spacing: {
        px: '1px',
        '-px': '-1px',
        px2: '2px',
        '-px2': '-2px',
        0: '0',
        0.5: '0.125rem',
        '-0.5': '-0.125rem',
        0.75: '0.1875rem',
        1: '0.25rem',
        '-1': '-0.25rem',
        1.5: '0.375rem',
        '-1.5': '-0.375rem',
        2: '0.5rem',
        2.5: '0.625rem',
        3: '0.75rem',
        3.5: '0.875rem',
        '-3.5': '-0.875rem',
        4: '1rem',
        '-4': '-1rem',
        4.5: '1.125rem',
        5: '1.25rem',
        '-6': '-1.5rem',
        6: '1.5rem',
        8: '2rem',
        8.5: '2.125rem',
        10: '2.5rem',
        10.5: '2.625rem',
        11: '2.75rem',
        11.5: '2.875rem',
        12: '3rem',
        12.5: '3.125rem',
        13: '3.25rem',
        13.5: '3.375rem',
        14: '3.5rem',
        16: '4rem',
        '-16': '-4rem',
        17: '4.25rem',
        18: '4.50rem',
        19: '4.75rem',
        20: '5rem',
        21: '5.25rem',
        22: '5.5rem',
        24: '6rem',
        25: '6.25rem',
        26: '6.5rem',
        30: '7.5rem',
        31: '7.75rem',
        32: '8rem',
        35: '8.75rem',
        38: '9.5rem',
        40: '10rem',
        41: '10.25rem',
        43: '10.75rem',
        46: '11.5rem',
        48: '12rem',
        50: '12.5rem',
        54: '13.5rem',
        54.5: '13.625rem',
        56: '14rem',
        62: '15.5rem',
        62.5: '15.625rem',
        64: '16rem',
        65: '16.75rem',
        70: '17.5rem',
        75: '18.75rem',
        80: '20rem',
        82: '20.5rem',
        85: '21.25rem',
        88: '22rem',
        90: '22.5rem',
        94: '23.5rem',
        94.5: '23.625rem',
        /**
         * @deprecated the actual value of 96 is 24 rem
         * Please use 96a instead of 96
         * Please use 104 instead of 96 is 26rem(416px)
         */
        96: '26rem',
        '96a': '24rem',
        97: '24.25rem',
        103: '25.75rem',
        104: '26rem',
        105: '26.25rem',
        106.5: '26.625rem',
        108: '27rem',
        /**
         * @deprecated the actual value of 112 is 28 rem (448px)
         * current value of 112 is 512px
         * Please use 112a instead of 112
         */
        112: '32rem',
        '112a': '28rem',
        114: '28.5rem',
        /**
         * @deprecated the actual value of 120 is 30 rem (480px)
         * current value of 120 is 576px
         * Please use 120a instead of 120
         */
        120: '36rem',
        '120a': '30rem',
        123.5: '30.875rem',
        126: '31.5rem',
        126.5: '31.625rem',
        /**
         * @deprecated the actual value of 128 is 32 rem (512px)
         * current value of 128 is 640px
         * Please use 128a instead of 128
         */
        128: '40rem',
        '128a': '32rem',
        131: '32.75rem',
        133: '33.25rem',
        135: '33.75rem',
        /**
         * @deprecated the actual value of 136 is 34 rem (544px)
         * current value of 136 is 672px
         * Please use 136a instead of 136
         */
        136: '42rem',
        '136a': '34rem',
        137: '34.25rem',
        /**
         * @deprecated the actual value of 140 is 35 rem (560px)
         * current value of 140 is 736px
         * Please use 140a instead of 140
         */
        140: '46rem',
        '140a': '35rem',
        141: '35.25rem',
        142: '35.5rem',
        143: '35.75rem',
        /**
         * @deprecated the actual value of 144 is 36 rem (576px)
         * current value of 144 is 768px
         * Please use 144a instead of 144
         */
        144: '48rem',
        '144a': '36rem',
        146: '36.5rem',
        146.5: '36.625rem',
        150: '37.5rem',
        155.5: '38.875rem',
        169.5: '42.375rem',
        170: '42.5rem',
        177: '44.25rem',
        180: '45rem',
        225: '56.25rem',
        247: '61.75rem',
        '-full': '-100%'
      },
      minHeight: {
        9: '2.25rem',
        10: '2.5rem',
        16: '4rem',
        18: '4.5rem',
        32: '8rem',
        41: '10.25rem',
        54.5: '13.625rem',
        106.5: '26.625rem',
        full: '100%'
      },
      zIndex: {
        1: 1,
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        100: 100,
        modal: 9999
      }
    },
  },
  plugins: [
    import('@tailwindcss/typography'),
  ],
}

