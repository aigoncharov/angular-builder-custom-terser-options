import { DevServerBuilder } from '@angular-devkit/build-angular'

import BrowserBuilder from '../browser'

export default class CustomizeTerserDevServerBuilder extends DevServerBuilder {
  public buildWebpackConfig(root: any, projectRoot: any, host: any, options: any) {
    const browserBuilder = new BrowserBuilder(this.context)
    const webpackConfig = browserBuilder.buildWebpackConfig(root, projectRoot, host, options)
    return webpackConfig
  }
}
