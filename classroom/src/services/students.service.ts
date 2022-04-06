import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateStudentParams {
  authUserId: string;
}
@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async getStudentByAuthId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: { authUserId },
    });
  }

  async listAllStudents() {
    return this.prisma.student.findMany();
  }

  async getStudentById(id: string) {
    return this.prisma.student.findUnique({ where: { id } });
  }

  async createStudent({ authUserId }: CreateStudentParams) {
    return this.prisma.student.create({
      data: { authUserId },
    });
  }
}
