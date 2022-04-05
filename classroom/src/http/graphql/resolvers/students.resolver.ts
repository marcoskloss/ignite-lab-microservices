import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { StudentsService } from 'src/services/students.service';
import { Student } from '../models/Student';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private studentsService: StudentsService) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  async students() {
    return this.studentsService.listAllStudents();
  }
}