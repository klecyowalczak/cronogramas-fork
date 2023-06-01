import Turma from "../databases/models/turma"
import { AppDataSource } from "../databases/connections/data-source"

const cursor = AppDataSource.getRepository(Turma)

type newTurmaRequest = {
    fk_curso: string
    data_inicio: Date
    data_fim: Date
    horas_aula_dia: number
}

type findOneTurmaRequest = {
    fk_curso: string
}

export class CreateTurmaService {
    async execute({
        fk_curso,
        data_inicio,
        data_fim,
        horas_aula_dia,
    }: newTurmaRequest): Promise < Turma | Error > {
        if (await cursor.findOne({ where: { fk_curso } })) {
            return new Error("Turma já cadastrado!")
    }

const turma = cursor.create({
    fk_curso,
    data_inicio,
    data_fim,
    horas_aula_dia,
})

await cursor.save(turma)
return turma
    }
}

export class ReadAllTurmaService {
    async execute() {
        const turmas = await cursor.find()
        return turmas
    }
}

export class ReadOneTurmaService {
    async execute({ fk_curso }: findOneTurmaRequest) {
        const turma = await cursor.findOne({ where: { fk_curso } })
        if (!turma) {
            return new Error("Turma não encontrada!")
        }
    return turma
    }
}

export class UpdateCursoService {}

export class DeleteTurmaService {
    async execute({ fk_curso }: findOneTurmaRequest) {
        const turma = await cursor.findOne({ where: { fk_curso } })
        if (!turma) {
            return new Error("Turma não encontrada!")
        }
    await cursor.delete(turma.id_turma)
    return turma
    }
}
