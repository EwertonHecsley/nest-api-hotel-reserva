import { CreateEmployeeUseCase } from "@/domain/employee/use-case/create.employee";
import { EmployeePresenter } from "@/infra/presenters/employee.presenter";
import { BadRequestException, Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";

@Controller("/employee")
export class EmployeeController {
    constructor(private readonly createEmployee: CreateEmployeeUseCase) { }

    @Post()
    async handler(@Body() dataBody: any, @Res() response: Response) {
        const { name, email, password } = dataBody;

        const result = await this.createEmployee.handler(
            {
                name,
                email,
                password
            }
        )

        if (result.isLeft()) {
            throw new BadRequestException(result.value.message);
        }

        return EmployeePresenter.toHTTP(result.value);
    }
}