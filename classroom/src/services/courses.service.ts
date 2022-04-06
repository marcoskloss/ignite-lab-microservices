import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import slugify from 'slugify';

interface CreateCourseParams {
  title: string;
  slug?: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async listAllCourses() {
    return this.prisma.course.findMany();
  }

  async getCourseById(id: string) {
    return this.prisma.course.findUnique({ where: { id } });
  }

  async getCourseBySlug(slug: string) {
    return this.prisma.course.findUnique({ where: { slug } });
  }

  async createCourse({ title, slug }: CreateCourseParams) {
    const courseSlug = slug ?? slugify(title, { lower: true, trim: true });

    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: { slug: courseSlug },
    });

    if (courseAlreadyExists) {
      throw new Error('Course with same title already exists.');
    }

    return this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
