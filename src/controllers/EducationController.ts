import { Repository } from 'typeorm'

import dataSource from '../data-source'
import { EducationEntity } from '../entities'

export class EducationController {
    private repository: Repository<EducationEntity>

    constructor() {
        this.repository = dataSource.getRepository(EducationEntity)
    }
}
