import Unidade from "../databases/models/unidade"
import { AppDataSource } from "../databases/connections/data-source"

const cursor = AppDataSource.getRepository(Unidade)

type newUnidadeRequest = {
    fk_curso: string
    descricao_unidade: string
    carga_horaria_unidade: number
    ordem: number
}

export class CreateUnidadeService {
    async execute({
        fk_curso,
        descricao_unidade,
        carga_horaria_unidade,
        ordem,
    }: newUnidadeRequest): Promise < Unidade | Error > {
        if (await cursor.findOne({ where: { fk_curso } })) {
            return new Error("Unidade já cadastrada!")
    }

const unidade = cursor.create({
    fk_curso,
    descricao_unidade,
    carga_horaria_unidade,
    ordem,
})

await cursor.save(unidade)
return unidade
    }
}


export class ReadAllCursoService {}

export class ReadOneCursoService {}

export class UpdateCursoService {}

export class DeleteCursoService {}
