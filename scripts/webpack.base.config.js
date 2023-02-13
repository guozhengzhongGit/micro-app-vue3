const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const Webpackbar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const projectDir = process.cwd();
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

// 与样式处理相关的 loader
const cssLoaders = function () {
  const styleLoader = { loader: 'style-loader' };
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          ['autoprefixer']
          // [
          //   'postcss-px-to-viewport-8',
          //   {
          //     unitToConvert: 'px', // 需要转换的单位，默认为"px"
          //     viewportWidth: 375, // 设计稿的视口宽度
          //     unitPrecision: 5, // 单位转换后保留的精度
          //     propList: ['*', '!font-size'], // 能转化为vw的属性列表,!font-size表示font-size后面的单位不会被转换
          //     viewportUnit: 'vw', // 希望使用的视口单位
          //     fontViewportUnit: 'vw', // 字体使用的视口单位
          //     // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
          //     // 下面配置表示类名中含有'keep-px'都不会被转换
          //     selectorBlackList: ['keep-px'],
          //     minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
          //     mediaQuery: false, // 媒体查询里的单位是否需要转换单位
          //     replace: true, //  是否直接更换属性值，而不添加备用属性
          //     //exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          //     //include: [/src/], // 如果设置了include，那将只有匹配到的文件才会被转换
          //     landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
          //     landscapeUnit: 'vw', // 横屏时使用的单位
          //     landscapeWidth: 1338 // 横屏时使用的视口宽度
          //   }
          // ]
        ]
      }
    }
  };

  // 根据支持的格式生成对应的样式 loader
  function generateStyleLoaders(loader, loaderOptions = {}) {
    const loadersRes = [postcssLoader];
    if (loader) {
      // 预处理器的资源
      loadersRes.unshift({
        loader: 'css-loader',
        options: { importLoaders: 2 }
      });
      const someLoader = `${loader}-loader`;
      const someOptions = Object.assign({}, loaderOptions);
      loadersRes.push({ loader: someLoader, options: someOptions });
    } else {
      // css 资源
      loadersRes.unshift({
        loader: 'css-loader',
        options: { importLoaders: 1 }
      });
    }
    if (isDevelopment) {
      loadersRes.unshift(styleLoader);
    }
    if (isProduction) {
      loadersRes.unshift({
        loader: MiniCssExtractPlugin.loader
      });
    }

    return loadersRes;
  }

  return {
    css: generateStyleLoaders(),
    less: generateStyleLoaders('less', {
      lessOptions: { modifyVars: {}, javascriptEnabled: true }
    }),
    sass: generateStyleLoaders('sass', {
      // 使用 dart-sass
      implementation: require('sass'),
      sassOptions: {
        charset: false
      }
    }),
    scss: generateStyleLoaders('sass', {
      // 使用 dart-sass
      implementation: require('sass'),
      sassOptions: {
        charset: false
      }
    })
  };
};

const styleModuleRules = () => {
  const res = [];
  const loaders = cssLoaders();
  for (const extension in loaders) {
    const loader = loaders[extension];
    // 生成对应的loader配置
    res.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    });
  }

  return res;
};

const styleRules = styleModuleRules();
const webpackBaseConfig = {
  target: 'web',
  stats: 'summary',
  entry: {
    index: path.join(projectDir, 'src/entry.js')
  },
  resolve: {
    alias: {
      '@': path.resolve(projectDir, 'src'),
      vue$: 'vue/dist/vue.esm-bundler.js'
    },
    extensions: ['.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js(\?.*)?$/,
        loader: 'babel-loader',
        include: path.resolve(projectDir, 'src'),
        options: {
          cacheDirectory: !isProduction
        }
      },
      {
        // 默认 8kb
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new Webpackbar({ color: '#f46a97' }),
    new HtmlWebpackPlugin({
      template: path.resolve(projectDir, 'index.html')
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      'process.env.buildTarget': JSON.stringify(process.env.BUILD_TARGET)
    })
  ]
};

webpackBaseConfig.module.rules.push(...styleRules);

module.exports = webpackBaseConfig;
