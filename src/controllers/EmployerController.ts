import { Repository } from 'typeorm'

import dataSource from '../data-source'
import { EmployerEntity } from '../entities'

export class EmployerController {
    private repository: Repository<EmployerEntity>

    constructor() {
        this.repository = dataSource.getRepository(EmployerEntity)
    }
}
