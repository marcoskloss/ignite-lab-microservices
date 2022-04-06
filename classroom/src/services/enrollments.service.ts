import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface GetByCourseAndStudentIdParams {
  studentId: string;
  courseId: string;
}

interface CreateEnrollmentParams {
  studentId: string;
  courseId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async getByCourseAndStudentId({
    courseId,
    studentId,
  }: GetByCourseAndStudentIdParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        studentId,
        courseId,
        canceledAt: null,
      },
    });
  }

  async createEnrollment({ courseId, studentId }: CreateEnrollmentParams) {
    return this.prisma.enrollment.create({
      data: {
        studentId,
        courseId,
      },
    });
  }

  async listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: { canceledAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async listEnrollmentsByStudentId(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: { studentId, canceledAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }
}
