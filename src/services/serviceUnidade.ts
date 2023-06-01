import Unidade from "../databases/models/unidade"
import { AppDataSource } from "../databases/connections/data-source"

const cursor = AppDataSource.getRepository(Unidade)

type newUnidadeRequest = {
    fk_curso: string
    descricao_unidade: string
    carga_horaria_unidade: number
    ordem: number
}

type findOneUnidadeRequest = {
    fk_curso: string
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

export class ReadAllUnidadeService {
    async execute() {
        const unidades = await cursor.find()
        return unidades
    }
}

export class ReadOneUnidadeService {
    async execute({ fk_curso }: findOneUnidadeRequest) {
        const unidade = await cursor.findOne({ where: { fk_curso } })
        if (!unidade) {
            return new Error("Unidade não encontrada!")
        }
    return unidade
    }
}

export class UpdateCursoService {}

export class DeleteUnidadeService {
    async execute({ fk_curso }: findOneUnidadeRequest) {
        const unidade = await cursor.findOne({ where: { fk_curso } })
        if (!unidade) {
            return new Error("Unidade não encontrada!")
        }
    await cursor.delete(unidade)
    return unidade
    }
}