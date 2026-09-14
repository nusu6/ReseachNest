import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust path
// Import your Auth and Roles guards here

@Controller('api/v1/admin')
export class AdminController {
  constructor(private prisma: PrismaService) {}

  // Fetch all users from PostgreSQL
  @Get('users')
  async getAllUsers() {
    return this.prisma.user.findMany({
      select: { id: true, fullName: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Fetch quick database & system stats
  @Get('stats')
  async getSystemStats() {
    const userCount = await this.prisma.user.count();
   // const projectCount = await this.prisma.project.count(); // Adjust to your model name
    return { userCount };
  }
}