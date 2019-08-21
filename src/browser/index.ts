import { createBuilder } from '@angular-devkit/architect'
import { executeBrowserBuilder } from '@angular-devkit/build-angular'
import { Schema as BrowserBuilderSchema } from '@angular-devkit/build-angular/src/browser/schema'
import { json } from '@angular-devkit/core'

import { decorateBuilder } from '../common'

export default createBuilder<json.JsonObject & BrowserBuilderSchema>(decorateBuilder(executeBrowserBuilder))
