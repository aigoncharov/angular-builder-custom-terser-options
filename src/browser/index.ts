import { BrowserBuilder } from '@angular-devkit/build-angular'
import TerserPlugin = require('terser-webpack-plugin')

export default class CustomizeTerserBrowserBuilder extends BrowserBuilder {
  public buildWebpackConfig(root: any, projectRoot: any, host: any, options: any) {
    const terserOptionsCustom = options.terserOptions
    const webpackConfig = super.buildWebpackConfig(root, projectRoot, host, options)
    if (
      terserOptionsCustom &&
      webpackConfig.optimization &&
      webpackConfig.optimization.minimizer &&
      Array.isArray(webpackConfig.optimization.minimizer)
    ) {
      const terserPlugin = (webpackConfig.optimization.minimizer as any[]).find(
        (minimizer) => minimizer instanceof TerserPlugin,
      )
      if (terserPlugin) {
        const terserOptionsOriginal = terserPlugin.options.terserOptions
        terserPlugin.options.terserOptions = {
          ...terserOptionsOriginal,
          ...terserOptionsCustom,
        }
      }
    }
    return webpackConfig
  }
}
