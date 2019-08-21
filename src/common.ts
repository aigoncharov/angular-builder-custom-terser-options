import { BuilderContext } from '@angular-devkit/architect'
import { ExecutionTransformer } from '@angular-devkit/build-angular'
import TerserPlugin = require('terser-webpack-plugin')
import { Configuration } from 'webpack'

type BuilderCustom<Options> = (
  options: Options,
  context: BuilderContext,
  transforms?: {
    webpackConfiguration?: ExecutionTransformer<Configuration>
  },
) => any

export const decorateBuilder = <Options>(builder: BuilderCustom<Options>): BuilderCustom<Options> =>
  function buildeDecorated(options, context, transforms = {}) {
    const terserOptionsCustom = (options as any).terserOptions
    if (terserOptionsCustom) {
      const webpackConfigurationOriginalTransform = transforms.webpackConfiguration
      transforms.webpackConfiguration = async (webpackConfig) => {
        if (webpackConfigurationOriginalTransform) {
          webpackConfig = await webpackConfigurationOriginalTransform(webpackConfig)
        }
        if (
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

    return builder(options, context, transforms)
  }
