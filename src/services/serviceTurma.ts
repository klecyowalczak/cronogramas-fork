import Turma from "../databases/models/turma"
import { AppDataSource } from "../databases/connections/data-source"

const cursor = AppDataSource.getRepository(Turma)

type newTurmaRequest = {
    fk_curso: string
    data_inicio: Date
    data_fim: Date
    horas_aula_dia: number
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


export class ReadAllCursoService {}

export class ReadOneCursoService {}

export class UpdateCursoService {}

export class DeleteCursoService {}
