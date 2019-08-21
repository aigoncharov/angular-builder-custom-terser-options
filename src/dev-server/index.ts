import { createBuilder } from '@angular-devkit/architect'
import { executeDevServerBuilder } from '@angular-devkit/build-angular'
import { Schema as DevServerBuilderSchema } from '@angular-devkit/build-angular/src/dev-server/schema'
import { json } from '@angular-devkit/core'

import { decorateBuilder } from '../common'

export default createBuilder<json.JsonObject & DevServerBuilderSchema>(decorateBuilder(executeDevServerBuilder))
