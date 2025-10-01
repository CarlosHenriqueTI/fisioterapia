module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@': '.',
            '@/components': './components',
            '@/app': './app',
            '@/assets': './assets',
            '@/hooks': './hooks',
            '@/services': './services',
            '@/stores': './stores',
            '@/types': './types',
            '@/utils': './utils',
            '@/theme': './theme',
          },
        },
      ],
      'react-native-worklets/plugin',
    ],
  };
};
