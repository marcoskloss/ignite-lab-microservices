import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';
import { Student } from '../models/Student';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  async students() {
    return this.studentsService.listAllStudents();
  }

  @ResolveField()
  async enrollments(@Parent() student: Student) {
    return this.enrollmentsService.listEnrollmentsByStudentId(student.id);
  }
}
