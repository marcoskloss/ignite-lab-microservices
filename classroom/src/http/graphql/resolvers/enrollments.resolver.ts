import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { Course } from '../models/Course';
import { Enrollment } from '../models/Enrollment';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(private enrollmentsService: EnrollmentsService) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  async enrollments() {
    return this.enrollmentsService.listAllEnrollments();
  }
}
